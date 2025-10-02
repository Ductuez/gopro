"use client"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchPlayerOfTheWeek } from "@/redux/playerOfTheWeekSlice"
import { getTeamUIConfig } from "@/config/teamConfig"
import { CrownIcon } from "@/config/crownConfig"
import Image from "next/image"

export default function PlayerOfTheWeek() {
  const dispatch = useDispatch()
  
  const { 
    topPlayer, 
    rankings, 
    loading, 
    error, 
    lastUpdated,
    source 
  } = useSelector(state => state.playerOfTheWeek)

  useEffect(() => {
    dispatch(fetchPlayerOfTheWeek())
  }, [dispatch])

  const TeamLogo = ({ team, teamLogo, size = "w-6 h-6" }) => {
    const teamInfo = getTeamUIConfig(team)
    const isLarge = size.includes('8') // Detect if this is the large size

    if (teamLogo) {
      return (
        <div className={`${size} relative overflow-hidden rounded-full`}>
          <Image
            src={teamLogo}
            alt={`${team} logo`}
            width={isLarge ? 32 : 24}
            height={isLarge ? 32 : 24}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className={`${size} ${teamInfo.bgColor} rounded-full items-center justify-center text-sm font-bold text-white shadow-lg hidden flex-col`}>
            <span className={isLarge ? 'text-lg' : 'text-xs'}>{teamInfo.icon}</span>
            {isLarge && teamInfo.icon !== 'FNC' && <span className="text-xs mt-0.5">{teamInfo.text}</span>}
          </div>
        </div>
      )
    }

    return (
      <div className={`${size} ${teamInfo.bgColor} rounded-full flex items-center justify-center font-bold text-white shadow-lg ${isLarge ? 'flex-col' : ''}`}>
        <span className={isLarge ? (teamInfo.icon === 'FNC' ? 'text-sm' : 'text-lg') : 'text-xs'}>{teamInfo.icon}</span>
        {isLarge && teamInfo.icon !== 'FNC' && <span className="text-xs mt-0.5">{teamInfo.text}</span>}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl p-5 bg-opacity-80">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    )
  }

  if (error && !topPlayer) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl p-5 bg-opacity-80">
        <div className="text-red-400 text-center py-4">
          <p className="text-sm">Unable to load player data</p>
          <p className="text-xs text-gray-400 mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl p-5 bg-opacity-80">
      {/* Title with refresh indicator */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-gray-300">PLAYER OF THE WEEK</h2>
        <div className="flex items-center space-x-2">
          {source === 'cache' && (
            <div className="w-2 h-2 bg-green-400 rounded-full" title="Using cached data"></div>
          )}
          {source === 'fallback' && (
            <div className="w-2 h-2 bg-yellow-400 rounded-full" title="Using fallback data"></div>
          )}
          <span className="text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Top 1 player */}
      {topPlayer && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <TeamLogo team={topPlayer.team} teamLogo={topPlayer.teamLogo} size="w-8 h-8" />
            <div>
              <h3 className="text-lg font-bold uppercase">{topPlayer.name}</h3>
              <p className="text-2xl font-extrabold">
                {topPlayer.score.toFixed(2)} <span className="text-gray-400 text-lg">/10</span>
              </p>
            </div>
          </div>
          <div className="relative">
            {topPlayer.avatar ? (
              <div className="w-20 h-20 relative">
                <Image
                  src={topPlayer.avatar}
                  alt={topPlayer.name}
                  fill
                  className="rounded-lg object-cover"
                  sizes="80px"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                {topPlayer.hasCrown && <CrownIcon isLarge={true} isFallback={false} />}
              </div>
            ) : (
              <div className="w-20 h-20 bg-gray-600 rounded-lg flex items-center justify-center text-2xl font-bold relative">
                {topPlayer.name.charAt(0)}
                {/* Crown for fallback avatar */}
                {topPlayer.hasCrown && <CrownIcon isLarge={false} isFallback={true} />}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rankings list */}
      {rankings && rankings.length > 0 && (
        <div className="space-y-2">
          {rankings.map((player) => (
            <div key={player.rank} className="flex items-center justify-between py-2 px-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 font-bold w-6">#{player.rank}</span>
                <TeamLogo team={player.team} teamLogo={player.teamLogo} size="w-6 h-6" />
                <div>
                  <p className="font-bold text-sm uppercase">{player.name}</p>
                  <p className="text-xs text-gray-400">{player.team}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">
                  {player.score.toFixed(2)} <span className="text-gray-400 text-sm">/10</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer with data source and timestamp */}
      {lastUpdated && (
        <div className="text-center mt-4 pt-3 border-t border-gray-600">
          <p className="text-xs text-gray-400">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
          {source && (
            <p className="text-xs text-gray-500 mt-1">
              Source: {source === 'cache' ? 'Cached Data' : source === 'fallback' ? 'Mock Data' : 'Live Data'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
