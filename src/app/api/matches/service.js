// Service helpers for fetching and grouping PandaScore matches
export async function fetchAndAggregateMatches({ begin, end, perPage = 50, maxPages = 5, token }) {
  let page = 1
  const allMatchesMap = new Map()

  if (!token) {
    throw new Error('PANDASCORE_API_KEY required')
  }

  while (page <= maxPages) {
    const url = `https://api.pandascore.co/lol/matches?range[begin_at]=${encodeURIComponent(begin)},${encodeURIComponent(end)}&sort=begin_at&page=${page}&per_page=${perPage}`

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) {
      if (page === 1) throw new Error(`PandaScore API error: ${res.status}`)
      break
    }

    const matches = await res.json()
    if (!Array.isArray(matches) || matches.length === 0) break

    matches.forEach((m) => allMatchesMap.set(m.id, m))
    if (matches.length < perPage) break
    page += 1
  }

  const allMatches = Array.from(allMatchesMap.values())
  return groupByLeague(allMatches)
}

export function groupByLeague(matches) {
  const grouped = matches.reduce((acc, match) => {
    const leagueId = match.league?.id || 'unknown'
    if (!acc[leagueId]) {
      acc[leagueId] = {
        league: match.league || { id: leagueId, name: 'Unknown' },
        matches: [],
        begin_at: match.begin_at,
      }
    }
    acc[leagueId].matches.push(match)
    return acc
  }, {})

  return Object.values(grouped)
}
