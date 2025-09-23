import dateJs from "date.js"
import dayjs from "dayjs"

export default function MatchItem({ begin_at, opponents, games }) {
  const team1 = opponents?.[0]?.opponent?.acronym || "Team 1"
  const team2 = opponents?.[1]?.opponent?.acronym || "Team 2"

  function countWins(games, teamId) {
    return games.filter(
      (g) => g.status === "finished" && g.winner?.id === teamId
    ).length
  }

  const scoreTeam1 = countWins(games, opponents?.[0]?.opponent?.id)
  const scoreTeam2 = countWins(games, opponents?.[1]?.opponent?.id)

  return (
    <li className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-md">
      <div className="flex items-center space-x-3">
        <div className="text-sm font-semibold text-gray-400 w-10">
          {dayjs(begin_at).format("DD/MM HH:mm")}
        </div>
        <div className=" ">
          <p className="font-bold flex flex-1 w-90 justify-between">
            <span>{team1}</span> <span>{scoreTeam1}</span>{" "}
          </p>
          <p className="text-gray-400 flex flex-1 w-90 justify-between">
            <span>{team2}</span> <span>{scoreTeam2}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="text-gray-400 hover:text-yellow-400">☆</button>
      </div>
    </li>
  )
}
