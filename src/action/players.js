import instance from "@/services/axios"

async function fetchPlayers(page = 1, perPage = 150, sort = "name") {
  const res = await fetch(`${instance.defaults.baseURL}/players/all`, {
    cache: "no-store",
  })

  return res.json()
}

export { fetchPlayers }
