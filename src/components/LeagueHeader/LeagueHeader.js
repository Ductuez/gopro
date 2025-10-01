import React from "react"
import { ChevronDown, Star } from "lucide-react"

export default function LeagueHeader() {
  return (
    <div className="bg-[#0e0e0e] text-gray-300 font-medium my-4 border border-gray-800 rounded-lg px-2 w-full grid-cols-1 lg:grid-cols-10 gap-x-4 gap-y-4 max-w-7xl mx-auto">
      {/* Row 1: Logo + Dropdown */}
      <div className="flex items-center gap-3 px-6 py-3 w-full border-b border-[#2a2a2a]">
        <h1 className="text-2xl font-bold text-white">LCK</h1>
        <Star className="w-5 h-5 text-blue-400" />
        <img
          src="https://flagcdn.com/w20/kr.png"
          alt="KR Flag"
          className="w-6 h-4 rounded-sm"
        />
        <button className="flex items-center gap-1 text-sm bg-[#1a1a1a] hover:bg-[#252525] px-3 py-1 rounded ml-3">
          LEAGUES <ChevronDown size={14} />
        </button>
      </div>

      {/* Row 2: Year + Split */}
      <div className="flex items-end justify-between border-t border-b border-[#2a2a2a] px-6 py-3 text-sm">
        {/* LEFT: labels YEAR / SPLIT */}
        <div className="flex flex-col gap-2 text-xs text-gray-400">
          <span className="uppercase">Year</span>
          <span className="uppercase">Split</span>
        </div>

        {/* RIGHT: seasons + splits */}
        <div className="flex flex-col items-end gap-2">
          {/* years */}
          <div className="flex gap-4 text-gray-400">
            {[
              "S6",
              "S7",
              "S8",
              "S9",
              "S10",
              "S11",
              "S12",
              "S13",
              "S14",
              "S15",
            ].map((s) => (
              <span
                key={s}
                className={`cursor-pointer hover:text-white ${
                  s === "S13" ? "text-white font-bold" : ""
                }`}
              >
                {s}
              </span>
            ))}
          </div>
          {/* splits */}
          <div className="flex gap-6 text-gray-400">
            {["Spring", "Summer", "Regional Finals", "ALL"].map((split) => (
              <span
                key={split}
                className={`cursor-pointer hover:text-white ${
                  split === "ALL" ? "text-white font-bold" : ""
                }`}
              >
                {split}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Bottom Navigation */}
      <div className="flex items-center gap-8 px-6 py-3 text-sm">
        {[
          "LCK",
          "Matches",
          "Standings",
          "Teams",
          "Players",
          "Champions",
          "Winners",
          "SoloQ",
        ].map((item) => (
          <span
            key={item}
            className="cursor-pointer hover:text-white transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
