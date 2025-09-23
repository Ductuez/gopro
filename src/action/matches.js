import instance from "@/services/axios"

import { getTodayUTC7 } from "@/ultils/common"

async function getMatchesToday() {
  const today = getTodayUTC7()
  const endToday = today + "T23:59:59+07:00" // kết thúc ngày hôm nay theo UTC+7

  const res = await fetch(
    `${instance.defaults.baseURL}/matches?begin_at=${today}&end_at=${endToday}`,
    {
      cache: "no-store",
    }
  )

  return res.json()
}

export { getMatchesToday }
