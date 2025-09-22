"use client"

import { useSelector } from "react-redux"

function CompareStats() {
  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h2 className="flex items-center justify-between text-sm font-bold text-gray-300 mb-2">
        COMPARE STATS <span className="text-gray-400">?</span>
      </h2>
      <input
        type="text"
        placeholder="Search for a player..."
        className="w-full mb-2 px-3 py-2 rounded bg-gray-800 text-sm text-white"
      />
      <div className="text-center text-gray-400 text-xs mb-2">VS</div>
      <input
        type="text"
        placeholder="Search for a player..."
        className="w-full px-3 py-2 rounded bg-gray-800 text-sm text-white"
      />
    </div>
  )
}

export default CompareStats
