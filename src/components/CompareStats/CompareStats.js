"use client"

import { useSelector } from "react-redux"
import PlayerSelect from "@/components/PlayerSelect/PlayerSelect"

function CompareStats() {
  const players = useSelector((state) => state.players.data || [])

  return (
    <div className="bg-gray-900 bg-opacity-80 rounded-xl p-4 flex flex-col gap-2 items-center">
      <h2 className="flex items-center justify-between text-sm font-bold text-gray-300 mb-2">
        COMPARE STATS <span className="text-gray-400">?</span>
      </h2>
      <PlayerSelect players={players} />
      <div className="text-center text-gray-400 text-xs ">VS</div>
      <PlayerSelect players={players} />
    </div>
  )
}

export default CompareStats
