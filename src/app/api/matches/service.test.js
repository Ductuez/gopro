import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchAndAggregateMatches, groupByLeague } from './service'

// Simple fetch mock
let originalFetch
beforeEach(() => {
  originalFetch = global.fetch
})
afterEach(() => {
  global.fetch = originalFetch
  vi.restoreAllMocks()
})

describe('fetchAndAggregateMatches', () => {
  it('fetches multiple pages, dedupes and groups', async () => {
    const page1 = [
      { id: 1, league: { id: 10, name: 'L1' }, begin_at: '2025-09-25T01:00:00Z' },
      { id: 2, league: { id: 10, name: 'L1' }, begin_at: '2025-09-25T02:00:00Z' },
    ]
    const page2 = [
      { id: 2, league: { id: 10, name: 'L1' }, begin_at: '2025-09-25T02:00:00Z' },
      { id: 3, league: { id: 20, name: 'L2' }, begin_at: '2025-09-25T03:00:00Z' },
    ]

    const mockFetch = vi.fn()
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => page1 })
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => page2 })
  // Return an empty page to signal end of pagination
  mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] })

    global.fetch = mockFetch

    const grouped = await fetchAndAggregateMatches({ begin: '2025-09-25T00:00:00+07:00', end: '2025-09-25T23:59:59+07:00', perPage: 2, maxPages: 5, token: 'test' })

    // Expect two league groups
    expect(grouped.length).toBe(2)
    const l1 = grouped.find(g => g.league.id === 10)
    const l2 = grouped.find(g => g.league.id === 20)
    expect(l1.matches.length).toBe(2) // ids 1 and 2
    expect(l2.matches.length).toBe(1) // id 3
  })
})
