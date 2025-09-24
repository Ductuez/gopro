// Next.js App Router API route (server-only)
import { NextResponse } from "next/server"

// GET request
export async function GET() {
  const TOKEN_PANDASCORE = process.env.PANDASCORE_API_KEY
  
  if (!TOKEN_PANDASCORE) {
    return NextResponse.json(
      { error: "PANDASCORE_API_KEY is not configured" },
      { status: 500 }
    )
  }

  const urlEndpoint = "https://api.pandascore.co/lol/tournaments/running"

  try {
    const res = await fetch(urlEndpoint, {
      headers: {
        Authorization: `Bearer ${TOKEN_PANDASCORE}`,
      },
      next: { revalidate: 86400 },
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
    console.error("Error fetching tournaments:", error)
    return NextResponse.json(
      { error: "Failed to fetch tournaments", details: error.message },
      { status: 500 }
    )
  }
}

// POST request
