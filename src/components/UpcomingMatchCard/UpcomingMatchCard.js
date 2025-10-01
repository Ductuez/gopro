import React from "react"

import LeagueMark from "@/components/LeagueMark/LeagueMark"
import TeamBlock from "@/components/TeamBlock/TeamBlock"

/**
 * UpcomingMatchCard (Plain JS + Tailwind)
 *
 * This version avoids TypeScript syntax and advanced props typing.
 */
export default function UpcomingMatchCard(props) {
  const {
    league = "LCK",
    status = "UPCOMING MATCH",
    leftTeam = { code: "KT", name: "KT Rolster", logoSrc: "" },
    rightTeam = { code: "GENG", name: "Gen.G", logoSrc: "" },
    dateLabel = "TOMORROW",
    time = "12:00 PM",
  } = props

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex items-center justify-center p-6">
      <div className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 shadow-2xl overflow-hidden">
        {/* Glow accents */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

        {/* Header */}
        <div className="mb-6 flex items-center justify-between text-xs tracking-widest">
          <div className="flex items-center gap-2 text-white/70">
            <LeagueMark />
            <span className="font-semibold">{league}</span>
          </div>
          <span className="text-white/60">{status}</span>
        </div>

        {/* Body */}
        <div className="grid grid-cols-3 items-center">
          <TeamBlock align="left" team={leftTeam} />

          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-white/60">
              {dateLabel}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {time}
            </div>
          </div>

          <TeamBlock align="right" team={rightTeam} />
        </div>
      </div>
    </div>
  )
}
