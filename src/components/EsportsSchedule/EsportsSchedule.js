"use client"
import { useState } from "react"
import ScheduleHeader from "@/components/ScheduleHeader/ScheduleHeader"
import ScheduleTabs from "@/components/ScheduleTabs/ScheduleTabs"
import LeagueBlock from "@/components/LeagueBlock/LeagueBlock"

export default function EsportsSchedule() {
  const [tab, setTab] = useState("all")

  const matches = [
    {
      league: "LTA",
      games: [
        {
          date: "22/9",
          time: "03:00",
          team1: "100 Thieves",
          team2: "RED Canids",
          score: "3-0",
        },
      ],
    },
    {
      league: "LCKCL",
      games: [
        {
          date: "22/9",
          time: "12:00",
          team1: "KT Rolster Challengers",
          team2: "DN Freecs Challengers",
          score: "3-1",
        },
        {
          date: "22/9",
          time: "15:00",
          team1: "T1 Esports Academy",
          team2: "DRX Challengers",
          score: "3-1",
        },
      ],
    },
  ]

  return (
    <div className="bg-gray-900 text-white rounded-xl p-4 w-[500px]">
      <ScheduleHeader />
      <ScheduleTabs tab={tab} setTab={setTab} />
      <div className="space-y-6">
        {matches.map((block, i) => (
          <LeagueBlock key={i} league={block.league} games={block.games} />
        ))}
      </div>
    </div>
  )
}
