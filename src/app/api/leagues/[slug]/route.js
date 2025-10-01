import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  const TOKEN_PANDASCORE = process.env.PANDASCORE_API_KEY

  const urlEndpoint = `https://api.pandascore.co/lol/leagues`

  try {
    const res = await fetch(urlEndpoint, {
      headers: {
        Authorization: `Bearer ${TOKEN_PANDASCORE}`,
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `PandaScore API error: ${res.status} ${res.statusText}` },
        { status: res.status }
      )
    }

    const data = await res.json()

    return NextResponse.json({ status: res.status, data: data })
  } catch (error) {
    console.error("Error fetching leagues:", error)
    return NextResponse.json(
      { error: "Failed to fetch leagues", details: error.message },
      { status: 500 }
    )
  }
}
