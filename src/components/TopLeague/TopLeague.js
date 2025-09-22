"use client"

import { useSelector } from "react-redux"

export default function TopLeagues() {
  const leagues = useSelector((state) => state.leagues.data || [])

  console.log(leagues)

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl p-4 w-64">
      <h2 className="text-center text-sm font-bold text-gray-300 mb-4">
        TOP LEAGUES
      </h2>

      <ul className="space-y-3">
        {/* {leagues.map((league, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={league.logo} alt={league.name} className="w-6 h-6" />
              <span className="font-semibold">{league.name}</span>
            </div>
            <img src={league.flag} alt="flag" className="w-6 h-4 rounded-sm" />
          </li>
        ))} */}
      </ul>

      <div className="flex justify-center mt-4">
        <button className="text-gray-300 text-sm font-semibold flex items-center hover:text-white">
          MORE
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.25 7.5l4.5 4.5 4.5-4.5H5.25z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
