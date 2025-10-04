import { NextResponse } from "next/server"
import { pandascoreService } from '@/services/pandascoreService'

// GET request
export async function GET(request) {
  const { searchParams } = new URL(request.url)

  try {
    const leagues = await pandascoreService.getLeagues(null, {
      per_page: searchParams.get('per_page') || 50,
      sort: searchParams.get('sort') || '-modified_at',
      ...Object.fromEntries(searchParams.entries())
    })

    return NextResponse.json({ 
      status: 200,
      data: leagues,
      source: 'pandascore-proxy'
    })
  } catch (error) {
    console.error("Error fetching leagues through proxy:", error)
    
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
      { error: "Failed to fetch leagues", details: error.message },
      { status: 500 }
    )
  }
}

// POST request
