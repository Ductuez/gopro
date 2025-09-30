import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import Redis from "redis";
import { z } from "zod";
import { fetchAndAggregateMatches } from "./service";

const cacheMap = new Map();
const inflightRefresh = new Map();
const cacheTimeouts = new Map();
let redisClient = null;
const REDIS_URL = process.env.REDIS_URL || null;
if (REDIS_URL) {
  try {
    redisClient = Redis.createClient({ url: REDIS_URL });
    redisClient
      .connect()
      .catch((e) => console.warn("Redis connect failed:", e));
  } catch (e) {
    console.warn("Failed to initialize Redis client:", e);
    redisClient = null;
  }
}

const DEFAULT_TTL = Number(process.env.CACHE_TTL_MS || 300000);
const STALE_WHILE_REVALIDATE = Number(process.env.STALE_WINDOW_MS || 60000);
const DEFAULT_MAX_PAGES = Number(process.env.MAX_PAGES || 5);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const begin = searchParams.get("begin_at");
  const end = searchParams.get("end_at");
  const forceMock =
    searchParams.get("mock") === "1" || searchParams.get("fixture") === "1";
  const perPageRaw = searchParams.get("per_page");
  const perPage = perPageRaw ? Number(perPageRaw) : 50;

  const now = new Date();
  const todayStart = `${now.toISOString().split("T")[0]}T00:00:00Z`;
  const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const thirtyDaysEnd = `${thirtyDaysLater.toISOString().split("T")[0]}T23:59:59Z`;

  const defaultBegin = begin || todayStart;
  const defaultEnd = end || thirtyDaysEnd;

  const paramsSchema = z.object({
    begin_at: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
      message: "begin_at must be valid ISO datetime",
    }),
    end_at: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
      message: "end_at must be valid ISO datetime",
    }),
    per_page: z.number().int().min(1).max(100).optional(),
  });

  const parsed = paramsSchema.safeParse({
    begin_at: defaultBegin,
    end_at: defaultEnd,
    per_page: perPage,
  });
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.message).join(", ");
    return NextResponse.json(
      { error: message, details: parsed.error.issues },
      { status: 400 },
    );
  }

  if (Date.parse(defaultBegin) > Date.parse(defaultEnd)) {
    return NextResponse.json(
      { error: "begin_at must be before or equal to end_at" },
      { status: 400 },
    );
  }

  const TOKEN_PANDASCORE = process.env.PANDASCORE_API_KEY;

  if (!TOKEN_PANDASCORE || forceMock) {
    try {
      const fixturePath = path.resolve(
        process.cwd(),
        "src/app/api/matches/sample-fixtures/matches-fixture.json",
      );
      const data = fs.readFileSync(fixturePath, "utf-8");
      const matches = JSON.parse(data);
      const grouped = groupByLeague(matches);
      return NextResponse.json(normalizeGrouped(grouped));
    } catch (err) {
      console.error("Failed to load fixture matches:", err);
      return NextResponse.json(
        { error: "fixture load failed" },
        { status: 500 },
      );
    }
  }

  try {
    const cacheKey = `${defaultBegin}|${defaultEnd}|${perPage}`;

    const cached = await getCached(cacheKey);
    const now = Date.now();
    if (cached) {
      const age = now - cached.fetchedAt;
      if (age < DEFAULT_TTL) {
        return new Response(JSON.stringify(cached.data), {
          headers: { "content-type": "application/json", "x-cache": "HIT" },
        });
      }

      if (age < DEFAULT_TTL + STALE_WHILE_REVALIDATE) {
        triggerBackgroundRefresh(cacheKey, defaultBegin, defaultEnd, perPage);
        return new Response(JSON.stringify(cached.data), {
          headers: { "content-type": "application/json", "x-cache": "STALE" },
        });
      }
    }

    const grouped = await fetchAndAggregateMatches({
      begin: defaultBegin,
      end: defaultEnd,
      perPage,
      maxPages: DEFAULT_MAX_PAGES,
      token: TOKEN_PANDASCORE,
    });

    try {
      const normalized = normalizeGrouped(grouped);
      await setCached(cacheKey, { data: normalized, fetchedAt: Date.now() });
      return NextResponse.json(normalized);
    } catch (e) {
      console.warn("Failed to cache matches:", e);
      return NextResponse.json(normalizeGrouped(grouped));
    }
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches", details: error.message },
      { status: 500 },
    );
  }
}

function groupByLeague(matches) {
  const grouped = matches.reduce((acc, match) => {
    const leagueId = match.league?.id || "unknown";
    if (!acc[leagueId]) {
      acc[leagueId] = {
        league: match.league || { id: leagueId, name: "Unknown" },
        matches: [],
        begin_at: match.begin_at,
      };
    }
    acc[leagueId].matches.push(match);
    return acc;
  }, {});

  return Object.values(grouped);
}

async function triggerBackgroundRefresh(cacheKey, begin, end, perPage) {
  if (inflightRefresh.get(cacheKey)) return;
  inflightRefresh.set(cacheKey, true);
  try {
    let page = 1;
    const maxPages = DEFAULT_MAX_PAGES;
    const allMatchesMap = new Map();
    const TOKEN_PANDASCORE = process.env.PANDASCORE_API_KEY;
    while (page <= maxPages) {
      const url = `https://api.pandascore.co/lol/matches?filter[begin_at]=${encodeURIComponent(
        `${begin},${end}`,
      )}&sort=begin_at&page=${page}&per_page=${perPage}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${TOKEN_PANDASCORE}` },
      });

      if (!res.ok) break;
      const matches = await res.json();
      if (!Array.isArray(matches) || matches.length === 0) break;
      matches.forEach((m) => allMatchesMap.set(m.id, m));
      if (matches.length < perPage) break;
      page += 1;
    }

    const allMatches = Array.from(allMatchesMap.values());
    const grouped = groupByLeague(allMatches);
    const normalized = normalizeGrouped(grouped);
    await setCached(cacheKey, { data: normalized, fetchedAt: Date.now() });
  } catch (err) {
    console.error("Background refresh failed:", err);
  } finally {
    inflightRefresh.delete(cacheKey);
  }
}

function normalizeMatch(m) {
  const opponents = Array.isArray(m.opponents)
    ? m.opponents.map((o) => ({
        opponent: {
          id: o?.opponent?.id ?? o?.id ?? null,
          name: o?.opponent?.name ?? o?.name ?? null,
          acronym: o?.opponent?.acronym ?? o?.acronym ?? null,
          image_url: o?.opponent?.image_url ?? o?.image_url ?? null,
        },
      }))
    : [];

  const games = Array.isArray(m.games) ? m.games : [];

  let winner_id = m.winner_id ?? null;
  if (!winner_id && Array.isArray(games)) {
    const lastFinished = [...games]
      .reverse()
      .find((g) => g?.status === "finished" && g?.winner?.id);
    if (lastFinished) winner_id = lastFinished.winner.id;
  }

  const league = m.league || {
    id: m.league_id ?? "unknown",
    name: m.league_name ?? "Unknown",
    image_url: m.league_image_url ?? null,
  };

  function countWinsForTeam(teamId) {
    return (
      games?.filter((g) => g?.status === "finished" && g?.winner?.id === teamId)
        .length || 0
    );
  }

  const team1 = opponents?.[0]?.opponent;
  const team2 = opponents?.[1]?.opponent;
  const scoreTeam1 = team1?.id ? countWinsForTeam(team1.id) : 0;
  const scoreTeam2 = team2?.id ? countWinsForTeam(team2.id) : 0;

  const isTeam1Winner = winner_id === team1?.id;
  const isTeam2Winner = winner_id === team2?.id;
  const isMatchFinished = (m.status ?? "unknown") === "finished";

  const is_live =
    m.status === "running" || m.status === "live" || m.is_live === true;
  const ui_status = is_live
    ? "live"
    : isMatchFinished
      ? "finished"
      : "upcoming";
  const best_of = m.number_of_games ?? m.best_of ?? null;
  const round = m.tournament_round ?? m.round ?? null;
  const match_url = m.url ?? m.match_url ?? null;
  const stream_url = m.stream_url ?? m.streams?.[0]?.url ?? null;

  return {
    id: m.id ?? null,
    begin_at: m.begin_at ?? m.scheduled_at ?? null,
    opponents,
    games,
    winner_id,
    status: m.status ?? "unknown",
    league,
    scores: { team1: scoreTeam1, team2: scoreTeam2 },
    is_live,
    ui_status,
    best_of,
    round,
    match_url,
    stream_url,
    isTeam1Winner,
    isTeam2Winner,
    isMatchFinished,
  };
}

function normalizeGrouped(groups) {
  if (!Array.isArray(groups)) return groups;
  return groups.map((g) => ({
    league: {
      id: g.league?.id ?? null,
      name: g.league?.name ?? "Unknown",
      image_url: g.league?.image_url ?? g.league?.image ?? null,
    },
    matches: Array.isArray(g.matches) ? g.matches.map(normalizeMatch) : [],
    begin_at: g.begin_at ?? g.matches?.[0]?.begin_at ?? null,
  }));
}

async function getCached(key) {
  if (redisClient) {
    try {
      const v = await redisClient.get(key);
      if (!v) return null;
      return JSON.parse(v);
    } catch (e) {
      console.warn("Redis get failed, falling back to memory cache:", e);
    }
  }
  return cacheMap.get(key) || null;
}

async function setCached(key, value) {
  if (redisClient) {
    try {
      await redisClient.set(key, JSON.stringify(value), {
        PX: DEFAULT_TTL + STALE_WHILE_REVALIDATE,
      });
      return;
    } catch (e) {
      console.warn("Redis set failed, falling back to memory cache:", e);
    }
  }
  cacheMap.set(key, value);
  try {
    const prev = cacheTimeouts.get(key);
    if (prev) clearTimeout(prev);
  } catch (_e) {}
  const ttl = DEFAULT_TTL + STALE_WHILE_REVALIDATE;
  const t = setTimeout(() => {
    cacheMap.delete(key);
    cacheTimeouts.delete(key);
  }, ttl);
  cacheTimeouts.set(key, t);
}
