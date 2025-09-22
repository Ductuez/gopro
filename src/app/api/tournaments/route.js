// Next.js App Router API route (server-only)
import { NextResponse } from "next/server"

// GET request
export async function GET() {
  const TOKEN_PANDASCORE = process.env.PANDASCORE_API_KEY
  const urlEndpoint = "https://api.pandascore.co/lol/tournaments/running"

  const res = await fetch(urlEndpoint, {
    headers: {
      Authorization: `Bearer ${TOKEN_PANDASCORE}`,
    },
  })

  const data = await res.json()

  return NextResponse.json({ status: res.status, data: data })
}

// POST request
