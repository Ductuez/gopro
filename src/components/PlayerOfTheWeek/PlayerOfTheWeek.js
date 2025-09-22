export default function PlayerOfTheWeek() {
  const players = [
    { rank: 2, name: "Oner", team: "T1", score: 9.49, logo: "/teams/t1.png" },
    {
      rank: 3,
      name: "Delight",
      team: "HLE",
      score: 9.36,
      logo: "/teams/hle.png",
    },
    {
      rank: 4,
      name: "Peanut",
      team: "HLE",
      score: 9.18,
      logo: "/teams/hle.png",
    },
    { rank: 5, name: "Zeka", team: "HLE", score: 8.83, logo: "/teams/hle.png" },
  ]

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl p-5 ">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-gray-300">PLAYER OF THE WEEK</h2>
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

      {/* Top 1 player */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img src="/teams/hle.png" alt="HLE" className="w-6 h-6" />
          <div>
            <h3 className="text-lg font-bold">VIPER</h3>
            <p className="text-2xl font-extrabold">
              10.00 <span className="text-gray-400 text-lg">/10</span>
            </p>
          </div>
        </div>
        <img
          src="/players/viper.png"
          alt="Viper"
          className="w-20 h-20 rounded-lg object-cover"
        />
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* Other players */}
      <ul className="space-y-3">
        {players.map((p) => (
          <li key={p.rank} className="flex items-center justify-between">
            {/* Rank */}
            <div className="w-7 h-7 bg-gray-700 flex items-center justify-center rounded-md text-sm font-bold">
              {p.rank}
            </div>

            {/* Name */}
            <div className="flex items-center space-x-2 flex-1 ml-3">
              <img src={p.logo} alt={p.team} className="w-6 h-6" />
              <span>{p.name}</span>
            </div>

            {/* Score */}
            <span className="font-bold">
              {p.score.toFixed(2)}{" "}
              <span className="text-gray-400 text-xs">/10</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
