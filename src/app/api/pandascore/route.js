import { NextResponse } from "next/server"
import { z } from "zod"

// Cache để tránh gọi quá nhiều API
const cache = new Map()
const CACHE_DURATION = 60 * 1000 // 1 phút cache
const RATE_LIMIT = new Map() // Rate limiting per IP
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 phút
const RATE_LIMIT_MAX_REQUESTS = 30 // Max 30 requests per minute per IP

const ALLOWED_ENDPOINTS = [
  'lol/players',
  'lol/teams', 
  'lol/tournaments',
  'lol/leagues',
  'lol/matches',
  'lol/games'
]

const proxySchema = z.object({
  endpoint: z.string().min(1),
  params: z.record(z.string()).optional()
})

/**
 * Rate limiting check
 */
function checkRateLimit(ip) {
  const now = Date.now()
  const userRequests = RATE_LIMIT.get(ip) || []
  const validRequests = userRequests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW)
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }
  
  validRequests.push(now)
  RATE_LIMIT.set(ip, validRequests)
  return true
}

/**
 * Get from cache or return null
 */
function getCache(key) {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

/**
 * Set cache
 */
function setCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const endpoint = searchParams.get('endpoint')
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Max 30 requests per minute.' },
        { status: 429 }
      )
    }

    const validation = proxySchema.safeParse({
      endpoint,
      params: Object.fromEntries(searchParams.entries())
    })

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request parameters', details: validation.error.issues },
        { status: 400 }
      )
    }

    const isAllowed = ALLOWED_ENDPOINTS.some(allowed => endpoint.startsWith(allowed))
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Endpoint not allowed', allowedEndpoints: ALLOWED_ENDPOINTS },
        { status: 403 }
      )
    }

    const TOKEN_PANDASCORE = process.env.PANDASCORE_API_KEY
    if (!TOKEN_PANDASCORE) {
      return NextResponse.json(
        { error: 'Pandascore API key not configured' },
        { status: 500 }
      )
    }

    const cacheKey = `${endpoint}:${searchParams.toString()}`
    const cachedData = getCache(cacheKey)
    if (cachedData) {
      return new Response(JSON.stringify(cachedData), {
        headers: { 
          'content-type': 'application/json',
          'x-cache': 'HIT',
          'cache-control': 'public, max-age=60'
        }
      })
    }

    const pandascoreUrl = new URL(`https://api.pandascore.co/${endpoint}`)
    
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'endpoint') {
        pandascoreUrl.searchParams.set(key, value)
      }
    }

    console.log(`Proxying to Pandascore: ${pandascoreUrl.toString()}`)

    const response = await fetch(pandascoreUrl.toString(), {
      headers: {
        'Authorization': `Bearer ${TOKEN_PANDASCORE}`,
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0'
      },
      next: { revalidate: 60 }
    })

    if (!response.ok) {
      console.error(`Pandascore API error: ${response.status} ${response.statusText}`)
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Pandascore rate limit exceeded', retryAfter: response.headers.get('retry-after') },
          { status: 429 }
        )
      } else if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid Pandascore API key' },
          { status: 500 }
        )
      } else {
        return NextResponse.json(
          { error: `Pandascore API error: ${response.status} ${response.statusText}` },
          { status: response.status }
        )
      }
    }

    const data = await response.json()
    
    setCache(cacheKey, data)

    return new Response(JSON.stringify(data), {
      headers: {
        'content-type': 'application/json',
        'x-cache': 'MISS',
        'cache-control': 'public, max-age=60'
      }
    })

  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { error: 'Internal proxy error', message: error.message },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  return NextResponse.json(
    { error: 'Method not allowed. Use GET requests.' },
    { status: 405 }
  )
}
