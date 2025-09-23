// Next.js App Router API route (server-only)
import { NextResponse } from "next/server"

// GET request
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const begin = searchParams.get("begin_at") // 👈 lấy param begin
  const end = searchParams.get("end_at") // 👈 lấy param end

  const TOKEN_PANDASCORE = process.env.PANDASCORE_API_KEY
  const urlEndpoint = `https://api.pandascore.co/lol/matches?filter[begin_at]=${begin}&sort=begin_at`

  const res = await fetch(urlEndpoint, {
    headers: {
      Authorization: `Bearer ${TOKEN_PANDASCORE}`,
    },
  })

  const matches = await res.json()

  const grouped = matches.reduce((acc, match) => {
    const leagueId = match.league.id
    if (!acc[leagueId]) {
      acc[leagueId] = {
        league: match.league,
        matches: [],
        begin_at: match.begin_at,
      }
    }
    acc[leagueId].matches.push(match)
    return acc
  }, {})

  // Convert sang array
  const groupedLeagues = Object.values(grouped)

  return NextResponse.json({ status: res.status, data: groupedLeagues })
}

// POST request
