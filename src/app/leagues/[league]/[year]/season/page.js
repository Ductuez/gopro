import LeagueHeader from "@/components/LeagueHeader/LeagueHeader"
import UpcomingMatchCard from "@/components/UpcomingMatchCard/UpcomingMatchCard"

import { fetchLeagueDetail } from "@/action/leaguesDetail"

export default async function Page({ params }) {
  const { league = "", year = "" } = params

  const dataLeague = await fetchLeagueDetail({
    id: 294,
    params: `filter[year]=${year}`,
  })

  return (
    <div className="min-h-screen flex h-full grow flex-col">
      <div className="flex align-center justify-center w-full">
        <LeagueHeader />
      </div>
      <div className="flex flex-col grow">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-4 gap-y-4 w-full max-w-7xl mx-auto px-16 lg:px-0 py-8">
          {/* Left sidebar */}
          <aside className="lg:col-span-2 hidden lg:flex flex-col gap-4"></aside>

          {/* Center content */}
          <section className="lg:col-span-5">{/* Nội dung chính */}</section>

          {/* Right sidebar */}
          <aside className="lg:col-span-3 hidden lg:flex flex-col gap-4">
            <UpcomingMatchCard />
          </aside>
        </div>
      </div>
    </div>
  )
}
