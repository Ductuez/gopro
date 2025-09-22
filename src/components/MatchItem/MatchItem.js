export default function MatchItem({ date, time, team1, team2, score }) {
  return (
    <li className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-md">
      {/* Left: time & teams */}
      <div className="flex items-center space-x-3">
        <div className="text-sm font-semibold text-gray-400">
          {date} {time}
        </div>
        <div>
          <p className="font-bold">{team1}</p>
          <p className="text-gray-400">{team2}</p>
        </div>
      </div>

      {/* Right: score + favorite */}
      <div className="flex items-center space-x-3">
        <span className="font-bold">{score}</span>
        <button className="text-gray-400 hover:text-yellow-400">☆</button>
      </div>
    </li>
  )
}
