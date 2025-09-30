"use client"
import { useState } from "react"

function CompareStats() {
  const [player1, setPlayer1] = useState("")
  const [player2, setPlayer2] = useState("")

  return (
    <div className="bg-gray-900 bg-opacity-80 rounded-xl p-6 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <h2 className="text-white font-bold text-base tracking-wide">
          COMPARE STATS
        </h2>
        <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center">
          <span className="text-gray-400 text-sm font-bold">?</span>
        </div>
      </div>

      {/* Player 1 Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a player..."
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-gray-750 transition-colors"
        />
      </div>

      <div className="text-center mb-4">
        <span className="text-white font-bold text-lg tracking-wider">VS</span>
      </div>

      {/* Player 2 Search */}
      <div>
        <input
          type="text"
          placeholder="Search for a player..."
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-gray-750 transition-colors"
        />
      </div>
    </div>
  )
}

export default CompareStats
