"use client"
import { useState, useEffect } from "react"

export default function TopSoloQTeams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/teams/top')
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        
        const data = await response.json()
        setTeams(data.teams || [])
        setError(null)
      } catch (error) {
        console.error('Error fetching teams:', error)
        setTeams([
          { rank: 1, name: "KC", logo: "https://cdn.pandascore.co/images/team/image/128918/karmine_corp.png", lp: "8.003" },
          { rank: 2, name: "G2", logo: "https://cdn.pandascore.co/images/team/image/3/g2_esports.png", lp: "7.814" },
          { rank: 3, name: "VIT", logo: "https://cdn.pandascore.co/images/team/image/127/team_vitality.png", lp: "7.323" },
          { rank: 4, name: "DRX.C", logo: "https://cdn.pandascore.co/images/team/image/126/drx.png", lp: "7.258" },
          { rank: 5, name: "T1A", logo: "https://cdn.pandascore.co/images/team/image/125/t1.png", lp: "6.967" },
          { rank: 6, name: "VKS.A", logo: "https://cdn.pandascore.co/images/team/image/130/vivo_keyd.png", lp: "6.954" },
          { rank: 7, name: "GX", logo: "https://cdn.pandascore.co/images/team/image/128920/gentle_mates.png", lp: "6.879" },
          { rank: 8, name: "A7", logo: "https://cdn.pandascore.co/images/team/image/131/aurora.png", lp: "6.848" },
          { rank: 9, name: "HLE", logo: "https://cdn.pandascore.co/images/team/image/129/hanwha_life_esports.png", lp: "6.716" },
          { rank: 10, name: "C9", logo: "https://cdn.pandascore.co/images/team/image/124/cloud9.png", lp: "6.707" },
        ])
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  const rankColors = {
    1: "bg-yellow-500",
    2: "bg-gray-400",
    3: "bg-yellow-700",
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl p-4 w-full max-w-sm bg-opacity-80">
        <h2 className="text-center text-sm font-bold text-gray-300 mb-4">
          TOP SOLOQ TEAMS
        </h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-2 text-gray-400 text-xs">Loading teams...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl p-4 w-full max-w-sm bg-opacity-80">
      <h2 className="text-center text-sm font-bold text-gray-300 mb-4">
        TOP SOLOQ TEAMS
      </h2>

      <ul className="space-y-3">
        {teams.map((team) => (
          <li
            key={team.rank}
            className="flex items-center justify-between text-sm font-semibold"
          >
            {/* Rank Box */}
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-md 
              ${rankColors[team.rank] || "bg-gray-700"}`}
            >
              {team.rank}
            </div>

            {/* Logo + Name */}
            <div className="flex items-center space-x-2 flex-1 ml-3">
              <img 
                src={team.logo} 
                alt={team.name} 
                className="w-6 h-6 object-cover rounded"
                onError={(e) => {
                  e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`
                }}
              />
              <span>{team.name}</span>
            </div>

            {/* LP Points */}
            <span className="text-right text-gray-200">
              {team.lp} <span className="text-xs text-gray-400">LP</span>
            </span>
          </li>
        ))}
      </ul>
      
      {error && (
        <div className="mt-4 p-2 bg-red-900/20 border border-red-500/20 rounded text-red-400 text-xs">
          Using fallback data: {error}
        </div>
      )}
    </div>
  )
}
