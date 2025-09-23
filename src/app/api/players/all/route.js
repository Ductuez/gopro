// https://api.pandascore.co/lol/players

import { NextResponse } from "next/server"

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const res = await fetch(`https://api.pandascore.co/lol/players`, {
    headers: {
      Authorization: `Bearer ${process.env.PANDASCORE_API_KEY}`,
    },
  })
  const data = await res.json()
  return NextResponse.json({ status: res.status, data })
}
