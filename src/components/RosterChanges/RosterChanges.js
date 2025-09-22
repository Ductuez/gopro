export default function RosterChanges() {
  const changes = [
    {
      date: "September 20",
      moves: [
        { type: "JOIN", player: "FOGZY", team: "BDG", logo: "/teams/bdg.png" },
        { type: "JOIN", player: "JOKI37", team: "BDG", logo: "/teams/bdg.png" },
        {
          type: "JOIN",
          player: "KAPLICA",
          team: "BDG",
          logo: "/teams/bdg.png",
        },
        {
          type: "LEAVE",
          player: "PAINFUL",
          team: "BDG",
          logo: "/teams/bdg.png",
        },
        {
          type: "LEAVE",
          player: "ARTANIS",
          team: "BDG",
          logo: "/teams/bdg.png",
        },
        {
          type: "LEAVE",
          player: "HESSZERO",
          team: "BDG",
          logo: "/teams/bdg.png",
        },
        {
          type: "LEAVE",
          player: "KAPLICA",
          team: "AOMA",
          logo: "/teams/aoma.png",
        },
        { type: "JOIN", player: "PEANUT", team: "HLE", logo: "/teams/hle.png" },
        {
          type: "LEAVE",
          player: "PEANUT",
          team: "HLE",
          logo: "/teams/hle.png",
        },
      ],
    },
    {
      date: "September 19",
      moves: [
        {
          type: "LEAVE",
          player: "CHAKROUN",
          team: "FOX",
          logo: "/teams/fox.png",
        },
      ],
    },
    {
      date: "September 18",
      moves: [
        {
          type: "LEAVE",
          player: "SYZYFEK",
          team: "RBT",
          logo: "/teams/rbt.png",
        },
        {
          type: "LEAVE",
          player: "AGRESIVOO",
          team: "B2TG",
          logo: "/teams/b2tg.png",
        },
      ],
    },
    // ... thêm dữ liệu cho các ngày khác
  ]

  const typeColors = {
    JOIN: "bg-blue-600",
    LEAVE: "bg-pink-600",
  }

  return (
    <div className="bg-gray-900 text-white rounded-xl p-4 w-80">
      <h2 className="text-center text-sm font-bold text-gray-300 mb-4">
        ROSTER CHANGES
      </h2>

      {changes.map((day, idx) => (
        <div key={idx} className="mb-6">
          {/* Date */}
          <h3 className="text-xs font-bold text-gray-400 mb-3">
            {day.date.toUpperCase()}
          </h3>

          {/* Moves */}
          <ul className="space-y-2">
            {day.moves.map((move, i) => (
              <li
                key={i}
                className="flex items-center justify-between text-sm font-medium"
              >
                {/* JOIN/LEAVE badge */}
                <span
                  className={`${
                    typeColors[move.type]
                  } text-white text-xs px-2 py-1 rounded font-bold`}
                >
                  {move.type}
                </span>

                {/* Player name */}
                <span className="flex-1 ml-3">{move.player}</span>

                {/* Team */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">{move.team}</span>
                  <img src={move.logo} alt={move.team} className="w-6 h-6" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
