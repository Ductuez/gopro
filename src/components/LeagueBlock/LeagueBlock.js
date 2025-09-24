"use client"
import { useState } from "react"
import Image from "next/image"
import MatchItem from "@/components/MatchItem/MatchItem"

export default function LeagueBlock({ league, matches }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="mb-6">
      {/* League Header */}
      <div className="flex items-center justify-between mb-3 p-3 rounded-lg border bg-black-700 border-white-10 bg-opacity-80">
        <div className="flex items-center space-x-3">
          {/* League Logo */}
          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
            {league?.image_url ? (
              <Image
                src={league.image_url}
                alt={league.name}
                width={32}
                height={32}
                className="rounded-lg"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {league?.name?.slice(0, 2)?.toUpperCase() || "LE"}
                </span>
              </div>
            )}
          </div>

          {/* League Name */}
          <h3 className="text-lg font-bold text-white">
            {league?.name || "Unknown League"}
          </h3>
        </div>

        {/* Favorite Star */}
        <button
          onClick={toggleFavorite}
          className={`text-2xl transition-colors ${
            isFavorite
              ? "text-yellow-400 hover:text-yellow-300"
              : "text-gray-500 hover:text-yellow-400"
          }`}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      {/* Matches List */}
      <div className="space-y-1">
        {matches?.map((game, i) => <MatchItem key={i} {...game} />) || (
          <div className="text-gray-400 text-center py-4">
            No matches available
          </div>
        )}
      </div>
    </div>
  )
}
