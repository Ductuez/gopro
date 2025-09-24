"use client"
import { useState } from "react"
import { useSelector } from "react-redux"

import ScheduleHeader from "@/components/ScheduleHeader/ScheduleHeader"
import ScheduleTabs from "@/components/ScheduleTabs/ScheduleTabs"
import LeagueBlock from "@/components/LeagueBlock/LeagueBlock"

export default function EsportsSchedule() {
  const [tab, setTab] = useState("all")
  const matchesToday = useSelector((state) => state.matchesToday.data || [])

  return (
    <div className="text-white rounded-xl p-6 w-full shadow-2xl border bg-black-700 border-white-10" style={{ opacity: 0.8 }}>
      <ScheduleHeader />
      <ScheduleTabs tab={tab} setTab={setTab} />
      <div className="space-y-4">
        {Array.isArray(matchesToday) && matchesToday.length > 0 ? (
          matchesToday.map((block, i) => (
            <LeagueBlock key={i} {...block} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📅</div>
            <div className="text-lg font-medium mb-1">No matches today</div>
            <div className="text-sm">Check back later for upcoming matches</div>
          </div>
        )}
      </div>
    </div>
  )
}
