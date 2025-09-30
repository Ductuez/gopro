import { fetchLeague } from "@/action/leagues";
import { getMatchesToday } from "@/action/matches";
import { fetchPlayers } from "@/action/players";
import ReduxProvider from "@/app/ReduxProvider";
import CompareStats from "@/components/CompareStats/CompareStats";
import EsportsSchedule from "@/components/EsportsSchedule/EsportsSchedule";
import MatchCard from "@/components/MatchCard/MatchCard";
import PlayerOfTheWeek from "@/components/PlayerOfTheWeek/PlayerOfTheWeek";
import PredictGames from "@/components/PredictGames/PredictGames";
import RosterChanges from "@/components/RosterChanges/RosterChanges";
import TopLeagues from "@/components/TopLeague/TopLeague";
import TopSoloQTeams from "@/components/TopSoloQTeams/TopSoloQTeams";

export default async function Page() {
  const [dataLeague, matchesToday, players] = await Promise.all([
    fetchLeague(),
    getMatchesToday(),
    fetchPlayers(),
  ]);

  const preloadedState = {
    leagues: { data: dataLeague?.data || [] },
    matchesToday: { data: matchesToday?.data || [] },
    players: { data: players?.data || [] },
  };

  return (
    <ReduxProvider preloadedState={preloadedState}>
      <div className="min-h-screen flex h-full grow flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 gap-y-4 w-full max-w-7xl mx-auto px-16 lg:px-0 py-8">
          {/* Left sidebar */}
          <aside className="lg:col-span-3 hidden lg:flex flex-col gap-4">
            <TopLeagues />
            <TopSoloQTeams />
            <RosterChanges />
          </aside>

          {/* Center content */}
          <section className="lg:col-span-6">
            <EsportsSchedule />
          </section>

          {/* Right sidebar */}
          <aside className="lg:col-span-3 hidden lg:flex flex-col gap-4">
            <MatchCard />
            <PredictGames />
            <CompareStats />
            <PlayerOfTheWeek />
          </aside>
        </div>
      </div>
    </ReduxProvider>
  );
}
