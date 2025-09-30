import instance from "@/services/axios"

async function fetchPlayers(page = 1, perPage = 150, sort = "name") {
  try {
    const res = await fetch(`${instance.defaults.baseURL}/players/all`, {
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      console.error("Failed to fetch players:", res.status, res.statusText)
      return { error: "Failed to fetch players", data: [] }
    }

    const result = await res.json()
    return result
  } catch (error) {
    console.error("Error fetching players:", error)
    return { error: "Failed to fetch players", data: [] }
  }
}

export { fetchPlayers }
