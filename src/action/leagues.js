import instance from "@/services/axios"

async function fetchLeague() {
  const res = await fetch(`${instance.defaults.baseURL}/leagues`, {
    cache: "no-store",
  })

  return res.json()
}

export { fetchLeague }
