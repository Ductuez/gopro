import PlayerOfTheWeekService from '@/services/playerOfTheWeekService'

const playerService = new PlayerOfTheWeekService()

function getLastWeekRange() {
  const now = new Date()
  now.setDate(now.getDate() - 7)

  const monday = new Date(now)
  const day = monday.getDay()
  const diff = (day === 0 ? -6 : 1) - day
  monday.setDate(monday.getDate() + diff)
  monday.setUTCHours(0, 0, 0, 0)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setUTCHours(23, 59, 59, 999)

  return { start: monday.toISOString(), end: sunday.toISOString() }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') || playerService.getCurrentWeekDate()
    const forceUpdate = searchParams.get('force') === 'true'

    let playerData = null
    if (!forceUpdate) {
      playerData = await playerService.loadCachedPlayerData(date)
      
      if (playerData && playerData.lastUpdated) {
        const lastUpdate = new Date(playerData.lastUpdated)
        const now = new Date()
        const hoursSinceUpdate = (now - lastUpdate) / (1000 * 60 * 60)
        
        if (hoursSinceUpdate < 24) {
          console.log(`Using cached player data for ${date}`)
          return Response.json({
            success: true,
            data: playerData,
            source: 'cache',
            lastUpdated: playerData.lastUpdated
          })
        }
      }
    }

    console.log(`Fetching fresh player data for ${date}`)
    playerData = await playerService.crawlPlayerOfTheWeek(date)
    await playerService.cachePlayerData(playerData, date)

    return Response.json({
      success: true,
      data: playerData,
      source: 'fresh',
      lastUpdated: playerData.lastUpdated
    })

  } catch (error) {
    console.error('Error in player of the week API:', error)
    
    const mockData = playerService.getMockData()
    
    return Response.json({
      success: false,
      error: error.message,
      data: mockData,
      source: 'fallback'
    }, { status: 200 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { date, forceUpdate = true } = body
    const targetDate = date || playerService.getCurrentWeekDate()
    
    console.log(`Manual update requested for player data: ${targetDate}`)
    
    const playerData = await playerService.crawlPlayerOfTheWeek(targetDate)
    const cacheFile = await playerService.cachePlayerData(playerData, targetDate)

    return Response.json({
      success: true,
      message: 'Player data updated successfully',
      data: playerData,
      cachedTo: cacheFile,
      lastUpdated: playerData.lastUpdated
    })

  } catch (error) {
    console.error('Error updating player data:', error)
    
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
