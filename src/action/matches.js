import instance from "@/services/axios";

import { getTodayUTC7 } from "@/ultils/common";

async function getMatchesToday() {
  const today = getTodayUTC7();
  const endToday = `${today}T23:59:59+07:00`; // kết thúc ngày hôm nay theo UTC+7

  try {
    const res = await fetch(
      `${instance.defaults.baseURL}/matches?begin_at=${today}&end_at=${endToday}`,
      {
        next: { revalidate: 86400 },
      },
    );

    if (!res.ok) {
      console.error("Failed to fetch matches:", res.status, res.statusText);
      return { error: "Failed to fetch matches", data: [] };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching matches:", error);
    return { error: "Failed to fetch matches", data: [] };
  }
}

export { getMatchesToday };
