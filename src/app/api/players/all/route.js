// https://api.pandascore.co/lol/players

import { NextResponse } from "next/server"

export async function GET(request) {
  const TOKEN_PANDASCORE = process.env.PANDASCORE_API_KEY
  
  if (!TOKEN_PANDASCORE) {
    return NextResponse.json(
      { error: "PANDASCORE_API_KEY is not configured" },
      { status: 500 }
    )
  }

  const { searchParams } = new URL(request.url)

  try {
    const res = await fetch(`https://api.pandascore.co/lol/players`, {
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
    return NextResponse.json({ status: res.status, data })
  } catch (error) {
    console.error("Error fetching players:", error)
    return NextResponse.json(
      { error: "Failed to fetch players", details: error.message },
      { status: 500 }
    )
  }
}
