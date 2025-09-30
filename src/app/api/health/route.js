import { NextResponse } from "next/server";
import Redis from "redis";

export async function GET() {
  const status = { ok: true, details: {} };

  // PandaScore check
  const pandascoreKey = process.env.PANDASCORE_API_KEY;
  if (!pandascoreKey) {
    status.ok = false;
    status.details.pandascore = {
      ok: false,
      reason: "PANDASCORE_API_KEY missing",
    };
  } else {
    try {
      const res = await fetch(
        "https://api.pandascore.co/lol/matches?per_page=1",
        {
          headers: { Authorization: `Bearer ${pandascoreKey}` },
        },
      );
      status.details.pandascore = { ok: res.ok, status: res.status };
      if (!res.ok) status.ok = false;
    } catch (err) {
      status.ok = false;
      status.details.pandascore = { ok: false, error: err.message };
    }
  }

  // Redis check
  const REDIS_URL = process.env.REDIS_URL;
  if (REDIS_URL) {
    try {
      const client = Redis.createClient({ url: REDIS_URL });
      await client.connect();
      await client.ping();
      await client.disconnect();
      status.details.redis = { ok: true };
    } catch (err) {
      status.ok = false;
      status.details.redis = { ok: false, error: err.message };
    }
  } else {
    status.details.redis = {
      ok: false,
      reason: "REDIS_URL not set (optional)",
    };
  }

  return NextResponse.json(status);
}
