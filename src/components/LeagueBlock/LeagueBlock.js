import MatchItem from "@/components/MatchItem/MatchItem"

export default function LeagueBlock({ league, games }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-300 mb-2">{league}</h3>
      <ul className="space-y-2">
        {games.map((game, i) => (
          <MatchItem key={i} {...game} />
        ))}
      </ul>
    </div>
  )
}
