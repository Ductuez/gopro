import { NextResponse } from "next/server"
import { pandascoreService } from '@/services/pandascoreService'

export async function GET(req, { params }) {
  try {
    const { slug } = params
    
    if (!slug) {
      return NextResponse.json(
        { error: "League slug is required" },
        { status: 400 }
      )
    }

    const league = await pandascoreService.getLeagueBySlug(slug)

    return NextResponse.json({ 
      status: 200,
      data: league,
      source: 'pandascore-proxy'
    })
  } catch (error) {
    console.error(`Error fetching league ${params?.slug} through proxy:`, error)
    
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

    return NextResponse.json({ 
      status: 500,
      error: "Failed to fetch league",
      details: error.message
    })
  }
}
