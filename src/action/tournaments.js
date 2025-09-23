import instance from "@/services/axios"

async function fetchTournaments() {
  const res = await fetch(`${instance.defaults.baseURL}/tournaments`, {
    cache: "no-store",
  })

  return res.json()
}
export { fetchTournaments }
