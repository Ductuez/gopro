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
    <div className="bg-gray-900 text-white rounded-xl p-4 w-[500px]">
      <ScheduleHeader />
      <ScheduleTabs tab={tab} setTab={setTab} />
      <div className="space-y-6">
        {Array.isArray(matchesToday) ? matchesToday.map((block, i) => (
          <LeagueBlock key={i} {...block} />
        )) : null}
      </div>
    </div>
  )
}
