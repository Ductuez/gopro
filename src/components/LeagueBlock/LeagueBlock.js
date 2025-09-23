import MatchItem from "@/components/MatchItem/MatchItem"

export default function LeagueBlock({ league, matches }) {
  console.log(matches, "games")

  return (
    <div>
      <h3 className="text-sm font-bold text-gray-300 mb-2">{league.name}</h3>
      <ul className="space-y-2">
        {matches.map((game, i) => (
          <MatchItem key={i} {...game} />
        ))}
      </ul>
    </div>
  )
}
