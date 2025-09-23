import TopLeagues from "@/components/TopLeague/TopLeague"
import TopSoloQTeams from "@/components/TopSoloQTeams/TopSoloQTeams"
import RosterChanges from "@/components/RosterChanges/RosterChanges"
import EsportsSchedule from "@/components/EsportsSchedule/EsportsSchedule"
import MatchCard from "@/components/MatchCard/MatchCard"
import PlayerOfTheWeek from "@/components/PlayerOfTheWeek/PlayerOfTheWeek"
import PredictGames from "@/components/PredictGames/PredictGames"
import CompareStats from "@/components/CompareStats/CompareStats"
import ReduxProvider from "@/app/ReduxProvider"
import { makeStore } from "@/store"

// placeholder cho các box khác

async function fetchLeague() {
  const res = await fetch("http://localhost:3000/api/leagues", {
    cache: "no-store",
  })

  return res.json()
}

async function fetchTournaments() {
  const res = await fetch("http://localhost:3000/api/tournaments", {
    cache: "no-store",
  })

  return res.json()
}

async function getMatchesToday() {
  const today = new Date().toISOString().split("T")[0] // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
  const endToday = today + "T23:59:59Z" // Kết thúc ngày hôm nay
  const res = await fetch(
    `http://localhost:3000/api/matches?begin_at=${today}`,
    {
      cache: "no-store",
    }
  )

  return res.json()
}

export default async function Page() {
  const dataLeague = await fetchLeague()
  const matchesToday = await getMatchesToday()

  // Khởi tạo store với preloadedState
  const preloadedState = {
    leagues: { data: dataLeague },
    matchesToday: { data: matchesToday },
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
