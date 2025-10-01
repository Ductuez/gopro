import {
  UpcomingMatchCard,
  LCKOverview,
  LastMatch,
  LCKChampionsTable,
  TeamStats,
  ChartTeamBlueRedStats,
  LeagueHeader,
  LCKStats,
} from "@/components"

import { fetchLeagueDetail } from "@/action/leaguesDetail"

export default async function Page({ params }) {
  const { league = "", year = "" } = params

  const dataLeague = await fetchLeagueDetail({
    id: 294,
    params: `filter[year]=${year}`,
  })

  return (
    <div className="min-h-screen flex h-full grow flex-col">
      <div className="flex justify-center w-full">
        <LeagueHeader />
      </div>
      <div className="flex flex-col grow bg-[#0e0e0e] text-gray-300 font-medium my-4 border border-gray-800 rounded-lg px-2 w-full max-w-7xl mx-auto gap-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="basis-3/5">
            <LCKOverview />
          </div>
          <div className="basis-2/5">
            <LastMatch />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 py-8 px-4">
          <aside className=" flex flex-col gap-4 basis-5/12">
            <LCKChampionsTable />
          </aside>

          <section className="basis-4/12 flex flex-col">
            <ChartTeamBlueRedStats />
          </section>
          <div className="basis-3/12 flex flex-col">
            <TeamStats />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 py-8 px-4">
          <LCKStats />
        </div>

        <aside className="hidden lg:flex flex-col gap-4 basis-2/6">
          <UpcomingMatchCard />
        </aside>
      </div>
    </div>
  )
}
