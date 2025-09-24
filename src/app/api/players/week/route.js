// app/api/player-of-week/route.js
import { NextResponse } from "next/server"

function getLastWeekRange() {
  const now = new Date()
  now.setDate(now.getDate() - 7)

  const monday = new Date(now)
  const day = monday.getDay()
  const diff = (day === 0 ? -6 : 1) - day
  monday.setDate(monday.getDate() + diff)
  monday.setUTCHours(0, 0, 0, 0)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setUTCHours(23, 59, 59, 999)

  return { start: monday.toISOString(), end: sunday.toISOString() }
}

export async function GET() {
  const { start, end } = getLastWeekRange()
  const token = process.env.PANDASCORE_API_KEY

  if (!token) {
    return NextResponse.json(
      { error: "PANDASCORE_API_KEY is not configured" },
      { status: 500 }
    )
  }

  try {
    // 1. Lấy matches trong tuần
    const res = await fetch(
      `https://api.pandascore.co/lol/matches?range[begin_at]=${start},${end}&filter[league_id]=293&page[size]=50`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: `PandaScore API error: ${res.status} ${res.statusText}` },
        { status: res.status }
      )
    }

    const matches = await res.json()

  const playerStats = {}

  // 2. Lặp qua games trong mỗi match
  for (const match of matches) {
    for (const g of match.games || []) {
      try {
        const gRes = await fetch(
          `https://api.pandascore.co/lol/games/${g.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (!gRes.ok) continue
        const game = await gRes.json()

        // 3. Gom stats players
        for (const p of game.players || []) {
          if (!playerStats[p.id]) {
            playerStats[p.id] = {
              id: p.id,
              name: p.name,
              team: p.current_team?.name,
              team_logo: p.current_team?.image_url,
              kills: 0,
              deaths: 0,
              assists: 0,
              games: 0,
            }
          }
          playerStats[p.id].kills += p.stats.kills || 0
          playerStats[p.id].deaths += p.stats.deaths || 0
          playerStats[p.id].assists += p.stats.assists || 0
          playerStats[p.id].games += 1
        }
      } catch (e) {
        console.error("Fetch game error", e)
      }
    }
  }

  // 4. Tính KDA & sort
  const players = Object.values(playerStats).map((p) => ({
    ...p,
    kda: (p.kills + p.assists) / Math.max(1, p.deaths),
  }))

  players.sort((a, b) => b.kda - a.kda)

    return NextResponse.json({
      weekRange: { start, end },
      top5: players.slice(0, 5),
    })
  } catch (error) {
    console.error("Error fetching player of the week:", error)
    return NextResponse.json(
      { error: "Failed to fetch player of the week", details: error.message },
      { status: 500 }
    )
  }
}
