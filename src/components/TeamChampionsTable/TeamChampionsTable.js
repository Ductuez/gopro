"use client"
import React from "react"

const LCKChampionsTable = (props) => {
  const data = [
    {
      name: "Alistar",
      icon: "/champions/Alistar.png",
      games: 15,
      winrate: 47,
      playedBy: 8,
    },
    {
      name: "Ambessa",
      icon: "/champions/Ambessa.png",
      games: 15,
      winrate: 40,
      playedBy: 7,
    },
    {
      name: "Xin Zhao",
      icon: "/champions/XinZhao.png",
      games: 15,
      winrate: 53,
      playedBy: 8,
    },
    {
      name: "Corki",
      icon: "/champions/Corki.png",
      games: 14,
      winrate: 50,
      playedBy: 8,
    },
    {
      name: "Jarvan IV",
      icon: "/champions/JarvanIV.png",
      games: 14,
      winrate: 64,
      playedBy: 7,
    },
    {
      name: "Ryze",
      icon: "/champions/Ryze.png",
      games: 14,
      winrate: 71,
      playedBy: 7,
    },
    {
      name: "Sion",
      icon: "/champions/Sion.png",
      games: 14,
      winrate: 43,
      playedBy: 6,
    },
    {
      name: "Annie",
      icon: "/champions/Annie.png",
      games: 13,
      winrate: 31,
      playedBy: 7,
    },
    {
      name: "Leona",
      icon: "/champions/Leona.png",
      games: 13,
      winrate: 46,
      playedBy: 7,
    },
    {
      name: "Neeko",
      icon: "/champions/Neeko.png",
      games: 13,
      winrate: 38,
      playedBy: 7,
    },
    {
      name: "Orianna",
      icon: "/champions/Orianna.png",
      games: 13,
      winrate: 54,
      playedBy: 7,
    },
  ]
  // hàm helper để set màu winrate
  const getWinrateColor = (winrate) => {
    if (winrate >= 60) return "text-green-400" // winrate cao
    if (winrate >= 50) return "text-yellow-400" // trung bình
    if (winrate < 40) return "text-red-400" // thấp
    return "text-gray-200"
  }

  return (
    <div className="bg-[#111827] rounded-xl p-4 text-white w-full shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <img src="/lck_logo.png" alt="LCK" className="h-6" />
        <h2 className="text-lg font-semibold">LCK Champions Played</h2>
        <span className="text-gray-400 text-sm ml-auto">Season 2025</span>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2 text-left">Champion</th>
            <th className="py-2 text-center">Games</th>
            <th className="py-2 text-center">Winrate</th>
            <th className="py-2 text-center">Played by</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {data.map((champ, i) => (
            <tr
              key={i}
              className="hover:bg-gray-800/40 transition-colors duration-150"
            >
              {/* Champion name + icon */}
              <td className="py-2 flex items-center gap-2">
                <img
                  src={champ.icon}
                  alt={champ.name}
                  className="w-6 h-6 rounded"
                />
                {champ.name}
              </td>
              <td className="text-center">{champ.games}</td>
              <td
                className={`text-center font-semibold ${getWinrateColor(
                  champ.winrate
                )}`}
              >
                {champ.winrate}%
              </td>
              <td className="text-center">{champ.playedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LCKChampionsTable
