/* Prefetch script to warm Redis cache for today's matches

Usage:
  REDIS_URL=redis://localhost:6379 PANDASCORE_API_KEY=... node scripts/prefetch_matches.js

This script uses the same cache key format as the API route: `${begin}|${end}|${perPage}`
It sets the Redis key with PX TTL matching CACHE_TTL_MS + STALE_WINDOW_MS or defaults.
*/

import Redis from 'redis'

const REDIS_URL = process.env.REDIS_URL
const TOKEN = process.env.PANDASCORE_API_KEY
const PER_PAGE = Number(process.env.PREFETCH_PER_PAGE || 50)
const MAX_PAGES = Number(process.env.MAX_PAGES || 5)
const CACHE_TTL_MS = Number(process.env.CACHE_TTL_MS || 300000)
const STALE_WINDOW_MS = Number(process.env.STALE_WINDOW_MS || 60000)

if (!TOKEN) {
  console.error('PANDASCORE_API_KEY is required for prefetch')
  process.exit(1)
}

if (!REDIS_URL) {
  console.error('REDIS_URL is required to write cache')
  process.exit(1)
}

function getTodayUTC7() {
  const now = new Date()
  const utc7 = new Date(now.getTime() + 7 * 60 * 60 * 1000)
  return utc7.toISOString().split('T')[0]
}

function buildKey(begin, end, perPage) {
  return `${begin}|${end}|${perPage}`
}

async function fetchAllMatches(begin, end, perPage) {
  let page = 1
  const all = new Map()
  while (page <= MAX_PAGES) {
    const url = `https://api.pandascore.co/lol/matches?filter[begin_at]=${encodeURIComponent(`${begin},${end}`)}&sort=begin_at&page=${page}&per_page=${perPage}`
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } })
    if (!res.ok) {
      console.error('PandaScore fetch error', res.status, await res.text())
      break
    }
    const matches = await res.json()
    if (!Array.isArray(matches) || matches.length === 0) break
    matches.forEach(m => all.set(m.id, m))
    if (matches.length < perPage) break
    page += 1
  }
  return Array.from(all.values())
}

async function main() {
  const today = getTodayUTC7()
  const begin = `${today}T00:00:00+07:00`
  const end = `${today}T23:59:59+07:00`
  const key = buildKey(begin, end, PER_PAGE)

  console.log('Prefetching matches for', begin, end)
  const matches = await fetchAllMatches(begin, end, PER_PAGE)
  const grouped = {}
  matches.forEach(match => {
    const lid = match.league?.id || 'unknown'
    if (!grouped[lid]) grouped[lid] = { league: match.league || { id: lid, name: 'Unknown' }, matches: [], begin_at: match.begin_at }
    grouped[lid].matches.push(match)
  })
  const groupedArr = Object.values(grouped)

  // connect redis and set
  const client = Redis.createClient({ url: REDIS_URL })
  client.on('error', (err) => console.error('Redis client error', err))
  await client.connect()

  const ttl = CACHE_TTL_MS + STALE_WINDOW_MS
  await client.set(key, JSON.stringify({ data: groupedArr, fetchedAt: Date.now() }), { PX: ttl })
  console.log(`Wrote ${groupedArr.length} league blocks to Redis key ${key} with TTL ${ttl}ms`)
  await client.disconnect()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
