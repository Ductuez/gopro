import instance from "@/services/axios";

async function fetchLeague() {
  try {
    const res = await fetch(`${instance.defaults.baseURL}/leagues`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.error("Failed to fetch leagues:", res.status, res.statusText);
      return { error: "Failed to fetch leagues", data: [] };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching leagues:", error);
    return { error: "Failed to fetch leagues", data: [] };
  }
}

export { fetchLeague };
