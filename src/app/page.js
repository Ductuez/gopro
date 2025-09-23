import TopLeagues from "@/components/TopLeague/TopLeague"
import TopSoloQTeams from "@/components/TopSoloQTeams/TopSoloQTeams"
import RosterChanges from "@/components/RosterChanges/RosterChanges"
import EsportsSchedule from "@/components/EsportsSchedule/EsportsSchedule"
import MatchCard from "@/components/MatchCard/MatchCard"
import PlayerOfTheWeek from "@/components/PlayerOfTheWeek/PlayerOfTheWeek"
import PredictGames from "@/components/PredictGames/PredictGames"
import CompareStats from "@/components/CompareStats/CompareStats"
import ReduxProvider from "@/app/ReduxProvider"
import { fetchLeague } from "@/action/leagues"
import { getMatchesToday } from "@/action/matches"
import { fetchPlayers } from "@/action/players"

export default async function Page() {
  const [dataLeague, matchesToday, players] = await Promise.all([
    fetchLeague(),
    getMatchesToday(),
    fetchPlayers(),
  ])

  const preloadedState = {
    leagues: { data: dataLeague },
    matchesToday: { data: matchesToday },
    players: { data: players },
  }

  return (
    <ReduxProvider preloadedState={preloadedState}>
      <div className="bg-black flex h-full grow flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-24 gap-y-12 w-full max-w-7xl mx-auto px-16 lg:px-0">
          {/* Left sidebar */}
          <aside className="lg:col-span-3 hidden lg:flex flex-col gap-20">
            <TopLeagues />
            <TopSoloQTeams />
            <RosterChanges />
          </aside>

          {/* Center content */}
          <section className="lg:col-span-4">
            <EsportsSchedule />
          </section>

          {/* Right sidebar */}
          <aside className="lg:col-span-3 hidden lg:flex flex-col gap-20">
            <MatchCard />
            <PredictGames />
            <CompareStats />
            <PlayerOfTheWeek />
          </aside>
        </div>
      </div>
    </ReduxProvider>
  )
}
