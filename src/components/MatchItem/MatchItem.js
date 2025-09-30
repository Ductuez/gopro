import dayjs from "dayjs"
import Image from "next/image"

export default function MatchItem({
  begin_at,
  opponents,
  games,
  winner_id,
  status,
}) {
  const team1 = opponents?.[0]?.opponent
  const team2 = opponents?.[1]?.opponent

  const team1Name = team1?.acronym || team1?.name || "Team 1"
  const team2Name = team2?.acronym || team2?.name || "Team 2"

  function countWins(games, teamId) {
    return (
      games?.filter((g) => g.status === "finished" && g.winner?.id === teamId)
        .length || 0
    )
  }

  const scoreTeam1 = countWins(games, team1?.id)
  const scoreTeam2 = countWins(games, team2?.id)

  const isTeam1Winner = winner_id === team1?.id
  const isTeam2Winner = winner_id === team2?.id
  const isMatchFinished = status === "finished"

  const matchTime = dayjs(begin_at).format("HH:mm A")
  const matchDate = dayjs(begin_at).format("M/DD")

  return (
    <li className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer border transition-colors bg-black-700 border-white-10 hover:bg-purple-hover hover:bg-opacity-80">
      <div className="flex items-center space-x-3">
        {/* Time Display */}
        <div className="text-sm font-semibold text-gray-400 w-12 text-center">
          <div>{matchDate}</div>
          <div>{matchTime}</div>
        </div>

        {/* Separator */}
        <div className="text-gray-600">|</div>

        {/* Teams */}
        <div className="flex flex-col space-y-1">
          {/* Team 1 */}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded overflow-hidden bg-gray-700 flex-shrink-0">
              {team1?.image_url ? (
                <Image
                  src={team1.image_url}
                  alt={team1Name}
                  width={16}
                  height={16}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                  <span className="text-xs text-white">
                    {team1Name.slice(0, 1)}
                  </span>
                </div>
              )}
            </div>
            <span
              className={`text-sm ${
                isTeam1Winner && isMatchFinished
                  ? "text-white font-semibold"
                  : "text-gray-300"
              }`}
            >
              {team1Name}
            </span>
          </div>

          {/* Team 2 */}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded overflow-hidden bg-gray-700 flex-shrink-0">
              {team2?.image_url ? (
                <Image
                  src={team2.image_url}
                  alt={team2Name}
                  width={16}
                  height={16}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                  <span className="text-xs text-white">
                    {team2Name.slice(0, 1)}
                  </span>
                </div>
              )}
            </div>
            <span
              className={`text-sm ${
                isTeam2Winner && isMatchFinished
                  ? "text-white font-semibold"
                  : "text-gray-300"
              }`}
            >
              {team2Name}
            </span>
          </div>
        </div>
      </div>

      {/* Scores */}
      <div className="flex flex-col items-end space-y-1">
        <span
          className={`text-sm font-bold ${
            isTeam1Winner && isMatchFinished ? "text-white" : "text-gray-400"
          }`}
        >
          {isMatchFinished ? scoreTeam1 : "-"}
        </span>
        <span
          className={`text-sm font-bold ${
            isTeam2Winner && isMatchFinished ? "text-white" : "text-gray-400"
          }`}
        >
          {isMatchFinished ? scoreTeam2 : "-"}
        </span>
      </div>
    </li>
  )
}
