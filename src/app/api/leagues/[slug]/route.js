// app/api/league/route.js
import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")

    const TOKEN_PANDASCORE = process.env.PANDASCORE_API_KEY
    const urlEndpoint = `https://api.pandascore.co/lol/leagues/${slug}`

    const response = await fetch(urlEndpoint, {
      headers: {
        Authorization: `Bearer ${TOKEN_PANDASCORE}`,
      },
    })

    const data = await response.json()

    return NextResponse.json({ status: response.status, data })
  } catch (error) {
    return NextResponse.json({ status: 500, error: error.message })
  }
}
