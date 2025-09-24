import instance from "@/services/axios"

async function fetchTournaments() {
  try {
    const res = await fetch(`${instance.defaults.baseURL}/tournaments`, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error("Failed to fetch tournaments:", res.status, res.statusText)
      return { error: "Failed to fetch tournaments", data: [] }
    }

    const result = await res.json()
    return result
  } catch (error) {
    console.error("Error fetching tournaments:", error)
    return { error: "Failed to fetch tournaments", data: [] }
  }
}
export { fetchTournaments }
