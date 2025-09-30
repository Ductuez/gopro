"use client"
import { useState, useEffect } from "react"

const getRoleIcon = (playerName) => {
  const roles = {
    top: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 2L6 10L8 18L10 14L12 6L10 2H8Z M12 4L10 12L12 20L14 16L16 8L14 4H12Z M16 6L14 14L16 22L18 18L20 10L18 6H16Z"/>
      </svg>
    ),
    jungle: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 20H6V16L4 14V12L6 10V8L4 6V4H6L8 6L10 4H12L14 6L16 4H18L20 6V8L18 10V12L20 14V16H18V20H16V18L14 16L12 18V20H10V18L8 16L6 18V20H4Z"/>
      </svg>
    ),
    mid: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14 6L18 4L20 8L16 10L18 12L20 16L16 18L14 16L12 20L10 16L8 18L4 16L6 12L8 10L4 8L6 4L10 6L12 2Z"/>
        <path d="M10 8L12 10L14 8L12 6L10 8Z M10 14L12 16L14 14L12 12L10 14Z"/>
      </svg>
    ),
    bot: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4V20H20V4H4Z M6 6H18V18H6V6Z"/>
        <path d="M8 8L16 16H12L8 12V8Z M16 8V12L12 8H16Z"/>
      </svg>
    ),
    support: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4V12H8V16H12V20H20V12H16V8H12V4H4Z M6 6H10V10H14V14H18V18H14V12H10V8H6V6Z"/>
      </svg>
    )
  }
  
  const hash = playerName.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  const roleKeys = Object.keys(roles)
  const roleIndex = hash % roleKeys.length
  return roles[roleKeys[roleIndex]]
}

export default function RosterChanges() {
  const [changes, setChanges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRosterChanges = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/roster/changes')
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        
        const data = await response.json()
        setChanges(data.changes || [])
        setError(null)
      } catch (error) {
        console.error('Error fetching roster changes:', error)
        setChanges([
          {
            date: "September 20",
            moves: [
              { type: "JOIN", player: "FOGZY", team: "BDG", logo: "https://cdn.pandascore.co/images/team/image/128919/bdg_esports.png" },
              { type: "JOIN", player: "JOKI37", team: "BDG", logo: "https://cdn.pandascore.co/images/team/image/128919/bdg_esports.png" },
              { type: "JOIN", player: "KAPLICA", team: "BDG", logo: "https://cdn.pandascore.co/images/team/image/128919/bdg_esports.png" },
              { type: "LEAVE", player: "PAINFUL", team: "BDG", logo: "https://cdn.pandascore.co/images/team/image/128919/bdg_esports.png" },
              { type: "LEAVE", player: "ARTANIS", team: "BDG", logo: "https://cdn.pandascore.co/images/team/image/128919/bdg_esports.png" },
              { type: "LEAVE", player: "HESSZERO", team: "BDG", logo: "https://cdn.pandascore.co/images/team/image/128919/bdg_esports.png" },
              { type: "LEAVE", player: "KAPLICA", team: "AOMA", logo: "https://cdn.pandascore.co/images/team/image/130115/aurora.png" },
              { type: "JOIN", player: "PEANUT", team: "HLE", logo: "https://cdn.pandascore.co/images/team/image/129/hanwha_life_esports.png" },
            ],
          },
          {
            date: "September 19",
            moves: [
              { type: "LEAVE", player: "CHAKROUN", team: "FOX", logo: "https://cdn.pandascore.co/images/team/image/128921/fox_esports.png" },
            ],
          },
          {
            date: "September 18",
            moves: [
              { type: "LEAVE", player: "SYZYFEK", team: "RBT", logo: "https://cdn.pandascore.co/images/team/image/128922/rabbit_esports.png" },
              { type: "LEAVE", player: "AGRESIVOO", team: "B2TG", logo: "https://cdn.pandascore.co/images/team/image/128923/b2tg_esports.png" },
            ],
          },
        ])
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRosterChanges()
  }, [])

  const typeColors = {
    JOIN: "bg-blue-600",
    LEAVE: "bg-pink-600",
  }

  if (loading) {
    return (
      <div className="bg-gray-900 text-white rounded-xl p-3 w-full max-w-sm bg-opacity-80">
        <h2 className="text-center text-xs font-bold text-gray-300 mb-3">
          ROSTER CHANGES
        </h2>
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400 mx-auto"></div>
          <p className="mt-2 text-gray-400 text-xs">Loading roster changes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 text-white rounded-xl p-3 w-full max-w-sm bg-opacity-80">
      <h2 className="text-center text-xs font-bold text-gray-300 mb-3">
        ROSTER CHANGES
      </h2>

      {changes.map((day, idx) => (
        <div key={idx} className="mb-4">
          {/* Date */}
          <h3 className="text-xs font-bold text-white mb-2">
            {day.date.toUpperCase()}
          </h3>

          {/* Moves */}
          <ul className="space-y-2">
            {day.moves.map((move, i) => (
              <li
                key={i}
                className="flex items-center text-xs font-medium"
              >
                {/* Action Type Button */}
                <span
                  className={`${
                    typeColors[move.type]
                  } text-white text-[10px] py-1 px-2 rounded font-bold min-w-[45px] text-center`}
                >
                  {move.type}
                </span>

                {/* Role Icon */}
                <div className="mx-2 text-gray-400">
                  <div className="w-3 h-3">{getRoleIcon(move.player)}</div>
                </div>

                {/* Player name */}
                <span className="text-white font-bold flex-1 text-xs">{move.player}</span>

                {/* Team */}
                <div className="flex items-center space-x-1 ml-auto">
                  <span className="text-gray-300 font-medium text-xs">{move.team}</span>
                  <img 
                    src={move.logo} 
                    alt={move.team} 
                    className="w-6 h-6 object-contain rounded"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      {error && (
        <div className="mt-4 p-2 bg-red-900/20 border border-red-500/20 rounded text-red-400 text-xs">
          Using fallback data: {error}
        </div>
      )}
    </div>
  )
}
