import dayjs from "dayjs"
import Image from "next/image"

export default function MatchItem({ begin_at, opponents, games, winner_id }) {
  const team1 = opponents?.[0]?.opponent?.acronym || "Team 1"
  const team2 = opponents?.[1]?.opponent?.acronym || "Team 2"

  function countWins(games, teamId) {
    return games.filter(
      (g) => g.status === "finished" && g.winner?.id === teamId
    ).length
  }

  const scoreTeam1 = countWins(games, opponents?.[0]?.opponent?.id)
  const scoreTeam2 = countWins(games, opponents?.[1]?.opponent?.id)
  const winTeam1 = winner_id === opponents?.[0]?.opponent?.id ? team1 : null
  const winTeam2 = winner_id === opponents?.[1]?.opponent?.id ? team2 : null
  const urlImgTeam1 = opponents?.[0]?.opponent?.image_url
  const urlImgTeam2 = opponents?.[1]?.opponent?.image_url

  return (
    <li className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-700">
      <div className="flex items-center space-x-3">
        <div className="text-sm font-semibold text-gray-400 w-10">
          {dayjs(begin_at).format("DD/MM HH:mm")}
        </div>
        <div className=" ">
          <p
            className={`${
              winTeam1 === team1 ? " font-bold" : "text-gray-400"
            } flex flex-1 w-90 justify-between`}
          >
            <span className="flex items-center gap-1">
              <Image src={urlImgTeam1} width={20} height={20} alt="" />
              {team1}
            </span>{" "}
            <span>{scoreTeam1}</span>{" "}
          </p>
          <p
            className={` ${
              winTeam2 === team2 ? " font-bold" : "text-gray-400"
            } flex flex-1 w-90 justify-between`}
          >
            <span className="flex items-center gap-1">
              <Image src={urlImgTeam2} width={20} height={20} alt="" /> {team2}
            </span>{" "}
            <span>{scoreTeam2}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="text-gray-400 hover:text-yellow-400">☆</button>
      </div>
    </li>
  )
}
