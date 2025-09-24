"use client"

import { useSelector } from "react-redux"

export default function TopLeagues() {
  const leagesArray = [
    {
      name: "LCK",
      id: 293,
      slug: "lck",
      image_url: "https://dpm.lol/esport/leagues/LCK.webp",
      country: "KR",
      img_flag: "/esport/flags/KR.webp",
    },
    {
      name: "LCS",
      id: 294,
      slug: "lcs",
      image_url: "https://dpm.lol/esport/leagues/LCS.webp",
      country: "US",
      img_flag: "/esport/flags/US.webp",
    },
    {
      name: "LPL",
      id: 295,
      slug: "lpl",
      image_url: "https://dpm.lol/esport/leagues/LPL.webp",
      country: "CN",
      img_flag: "/esport/flags/CN.webp",
    },
    {
      name: "LEC",
      id: 296,
      slug: "lec",
      image_url: "https://dpm.lol/esport/leagues/LEC.webp",
      country: "EU",
      img_flag: "/esport/flags/EU.webp",
    },
    {
      name: "LCP",
      id: 297,
      slug: "lcp",
      image_url: "https://dpm.lol/esport/leagues/LCP.webp",
      country: "US",
      img_flag: "/esport/flags/US.webp",
    },
  ]

  const leagues = useSelector((state) => state.leagues.data || [])

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl p-4 w-full max-w-sm bg-opacity-80">
      <h2 className="text-center text-sm font-bold text-gray-300 mb-4">
        TOP LEAGUES
      </h2>

      <ul className="space-y-3">
        {leagesArray.map((league, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition duration-200 "
          >
            <div className="flex items-center space-x-2">
              <img
                src={league.image_url}
                alt={league.name}
                className="w-6 h-6"
              />
              <span className="font-semibold">{league.name}</span>
            </div>
            <img
              src={league.image_url}
              alt="flag"
              className="w-6 h-4 rounded-sm"
            />
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-4">
        <button className="text-gray-300 cursor-pointer text-sm font-semibold flex items-center hover:text-white">
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
