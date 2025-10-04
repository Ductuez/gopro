import { NextResponse } from "next/server"
import { pandascoreService } from '@/services/pandascoreService'

// GET request
export async function GET() {
  try {
    const tournaments = await pandascoreService.getRunningTournaments()

    return NextResponse.json({ 
      status: 200,
      data: tournaments,
      source: 'pandascore-proxy'
    })
  } catch (error) {
    console.error("Error fetching tournaments through proxy:", error)
    
    if (error.message.includes('Rate limit exceeded')) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
    
    if (error.message.includes('Proxy error: 401')) {
      return NextResponse.json(
        { error: 'Pandascore API authentication failed' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: "Failed to fetch tournaments", details: error.message },
      { status: 500 }
    )
  }
}

// POST request
