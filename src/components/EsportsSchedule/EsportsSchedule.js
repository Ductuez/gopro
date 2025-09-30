"use client"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import dayjs from "dayjs"

import ScheduleHeader from "@/components/ScheduleHeader/ScheduleHeader"
import ScheduleTabs from "@/components/ScheduleTabs/ScheduleTabs"
import LeagueBlock from "@/components/LeagueBlock/LeagueBlock"

export default function EsportsSchedule() {
  const [tab, setTab] = useState("all")
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const matchesTodayFromStore = useSelector((state) => state.matchesToday.data || [])

  const [matches, setMatches] = useState(matchesTodayFromStore)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cacheBadge, setCacheBadge] = useState(null)

  const fetchMatches = async (date = selectedDate) => {
    setLoading(true)
    setError(null)
    try {
      const dateStr = date.format('YYYY-MM-DD')
      const begin = `${dateStr}T00:00:00+07:00`
      const end = `${dateStr}T23:59:59+07:00`
      const res = await fetch(`/api/matches?begin_at=${encodeURIComponent(begin)}&end_at=${encodeURIComponent(end)}`)
      const body = await res.json()
      if (!res.ok) {
        setError(body?.error || `Server returned ${res.status}`)
        setLoading(false)
        return
      }
      setMatches(Array.isArray(body) ? body : [])
      const cacheHeader = res.headers.get && res.headers.get('x-cache')
      if (cacheHeader) {
        setCacheBadge(cacheHeader)
        setTimeout(() => setCacheBadge(null), 2000)
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch matches')
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate)
    fetchMatches(newDate)
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  return (
    <div className="text-white rounded-xl p-6 w-full shadow-2xl border bg-black-700 border-white-10 bg-opacity-80">
      <ScheduleHeader onDateChange={handleDateChange} />
      <ScheduleTabs tab={tab} setTab={setTab} />

      {/* Error banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-600 bg-opacity-20 border border-red-700 rounded text-red-200">
          <div className="flex items-center justify-between">
            <div>Failed to load matches: {error}</div>
            <button onClick={fetchMatches} className="ml-4 px-2 py-1 bg-red-700 rounded">Retry</button>
          </div>
        </div>
      )}

      {cacheBadge && (
        <div className="mb-3 text-xs text-gray-300">Cache: <span className="font-medium">{cacheBadge}</span></div>
      )}

      <div className="space-y-4">
        {loading ? (
          // simple skeleton
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse h-12 bg-gray-800 rounded" />
            ))}
          </div>
        ) : Array.isArray(matches) && matches.length > 0 ? (
          matches.map((block, i) => <LeagueBlock key={i} {...block} />)
        ) : (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📅</div>
            <div className="text-lg font-medium mb-1">No matches found</div>
            <div className="text-sm">Try changing the date range or check back later.</div>
          </div>
        )}
      </div>
    </div>
  )
}
