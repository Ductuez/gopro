import React from "react"
import { Star } from "lucide-react" // For the star icon, you can swap with any icon library

export default function HeaderTeam() {
  return (
    <div className="bg-black text-white px-6 py-4">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">LCK</h1>
          <Star className="w-5 h-5 text-blue-400" />
          <img
            src="https://flagcdn.com/w20/kr.png"
            alt="Korean Flag"
            className="w-6 h-4"
          />
        </div>

        {/* Dropdown Placeholder */}
        <button className="bg-neutral-800 text-sm px-3 py-1 rounded">
          LEAGUES ▾
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-700 my-4"></div>

      {/* Season & Split Navigation */}
      <div className="flex items-center justify-between text-neutral-400 text-sm">
        {/* Years */}
        <div className="flex gap-4">
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
          ].map((season, idx) => (
            <span
              key={idx}
              className={`cursor-pointer hover:text-white ${
                season === "S13" ? "font-bold text-white" : ""
              }`}
            >
              {season}
            </span>
          ))}
        </div>

        {/* Splits */}
        <div className="flex gap-6">
          {["Spring", "Summer", "Regional Finals", "ALL"].map((split, idx) => (
            <span
              key={idx}
              className={`cursor-pointer hover:text-white ${
                split === "ALL" ? "font-bold text-white" : ""
              }`}
            >
              {split}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-700 my-4"></div>

      {/* Bottom Navigation */}
      <div className="flex items-center gap-8 text-neutral-300 text-sm">
        {[
          "LCK",
          "Matches",
          "Standings",
          "Teams",
          "Players",
          "Champions",
          "Winners",
          "SoloQ",
        ].map((item, idx) => (
          <span
            key={idx}
            className="cursor-pointer hover:text-white transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
