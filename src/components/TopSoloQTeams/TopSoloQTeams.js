export default function TopSoloQTeams() {
  const teams = [
    { rank: 1, name: "KC", logo: "/logos/kc.png", lp: "8.003" },
    { rank: 2, name: "G2", logo: "/logos/g2.png", lp: "7.814" },
    { rank: 3, name: "VIT", logo: "/logos/vit.png", lp: "7.323" },
    { rank: 4, name: "DRX.C", logo: "/logos/drx.png", lp: "7.258" },
    { rank: 5, name: "T1A", logo: "/logos/t1.png", lp: "6.967" },
    { rank: 6, name: "VKS.A", logo: "/logos/vks.png", lp: "6.954" },
    { rank: 7, name: "GX", logo: "/logos/gx.png", lp: "6.879" },
    { rank: 8, name: "A7", logo: "/logos/a7.png", lp: "6.848" },
    { rank: 9, name: "HLE", logo: "/logos/hle.png", lp: "6.716" },
    { rank: 10, name: "C9", logo: "/logos/c9.png", lp: "6.707" },
  ]

  const rankColors = {
    1: "bg-yellow-500",
    2: "bg-gray-400",
    3: "bg-yellow-700",
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
              <img src={team.logo} alt={team.name} className="w-6 h-6" />
              <span>{team.name}</span>
            </div>

            {/* LP Points */}
            <span className="text-right text-gray-200">
              {team.lp} <span className="text-xs text-gray-400">LP</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
