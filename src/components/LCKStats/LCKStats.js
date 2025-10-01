import React from "react"

import { StatCard, RankList, BanRate } from "@/components"

const LCKStats = () => {
  const killsData = [
    { player: "Smash", teamLogo: "/t1.png", value: 13 },
    { player: "Ruler", teamLogo: "/gen.png", value: 13 },
    { player: "Viper", teamLogo: "/hle.png", value: 12 },
    { player: "Viper", teamLogo: "/hle.png", value: 12 },
    { player: "Viper", teamLogo: "/hle.png", value: 12 },
    { player: "Smash", teamLogo: "/t1.png", value: 11 },
  ]

  const csData = [
    { player: "Smash", teamLogo: "/t1.png", value: 9.81 },
    { player: "Gumayusi", teamLogo: "/t1.png", value: 9.77 },
    { player: "Ruler", teamLogo: "/gen.png", value: 9.71 },
    { player: "Berserker", teamLogo: "/c9.png", value: 9.42 },
    { player: "Diable", teamLogo: "/lsb.png", value: 9.4 },
    { player: "Aiming", teamLogo: "/kt.png", value: 9.38 },
  ]

  const kdaData = [
    { player: "Viper", teamLogo: "/hle.png", value: 5.15 },
    { player: "GIDEON", teamLogo: "/kt.png", value: 4.94 },
    { player: "Zeka", teamLogo: "/hle.png", value: 4.43 },
    { player: "Jiwoo", teamLogo: "/kt.png", value: 3.9 },
    { player: "Peanut", teamLogo: "/gen.png", value: 3.84 },
    { player: "Delight", teamLogo: "/hle.png", value: 3.63 },
  ]

  const redSide = [
    { name: "Samira", img: "/samira.png", rate: 83 },
    { name: "Kalista", img: "/kalista.png", rate: 77 },
    { name: "Vi", img: "/vi.png", rate: 20 },
    { name: "Azir", img: "/azir.png", rate: 17 },
  ]

  const blueSide = [
    { name: "Jhin", img: "/jhin.png", rate: 27 },
    { name: "Ahri", img: "/ahri.png", rate: 23 },
    { name: "Lucian", img: "/lucian.png", rate: 19 },
    { name: "Sett", img: "/sett.png", rate: 17 },
  ]

  return (
    <div className="flex flex-wrap gap-4">
      <StatCard title="LCK CHAMPIONS BANRATE Cup 2025">
        <BanRate redSide={redSide} blueSide={blueSide} />
      </StatCard>

      <StatCard title="LCK MOST KILLS IN 1 GAME Cup 2025">
        <RankList data={killsData} />
      </StatCard>

      <StatCard title="LCK HIGHEST CS/MIN Cup 2025">
        <RankList data={csData} />
      </StatCard>

      <StatCard title="LCK BEST KDA Cup 2025">
        <RankList data={kdaData} />
      </StatCard>
    </div>
  )
}

export default LCKStats
