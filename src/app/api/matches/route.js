// Next.js App Router API route (server-only)
import { NextResponse } from "next/server"

// GET request
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const begin = searchParams.get("begin_at") // 👈 lấy param begin
  const end = searchParams.get("end_at") // 👈 lấy param end

  const TOKEN_PANDASCORE = process.env.PANDASCORE_API_KEY
  
  if (!TOKEN_PANDASCORE) {
    return NextResponse.json(
      { error: "PANDASCORE_API_KEY is not configured" },
      { status: 500 }
    )
  }

  const urlEndpoint = `https://api.pandascore.co/lol/matches?filter[begin_at]=${begin}&sort=begin_at`

  try {
    const res = await fetch(urlEndpoint, {
      headers: {
        Authorization: `Bearer ${TOKEN_PANDASCORE}`,
      },
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `PandaScore API error: ${res.status} ${res.statusText}` },
        { status: res.status }
      )
    }

    const matches = await res.json()

    if (!Array.isArray(matches)) {
      console.log("PandaScore API response:", matches)
      return NextResponse.json(
        { error: "Invalid response format from PandaScore API", data: [] },
        { status: 500 }
      )
    }

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
  } catch (error) {
    console.error("Error fetching matches:", error)
    return NextResponse.json(
      { error: "Failed to fetch matches", details: error.message },
      { status: 500 }
    )
  }
}

// POST request
