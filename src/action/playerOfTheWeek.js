import { fetchPlayerOfTheWeek } from '@/redux/playerOfTheWeekSlice'

/**
 * Fetch current player of the week data
 * @param {Object} params - Parameters for fetching
 * @param {string} params.date - Date in 'd-m' format
 * @param {boolean} params.force - Force refresh data
 * @returns {Promise} Redux thunk action
 */
export const getPlayerOfTheWeek = async (params = {}) => {
  try {
    const { date, force = false } = params
    const searchParams = new URLSearchParams()
    
    if (date) searchParams.append('date', date)
    if (force) searchParams.append('force', 'true')
    
    const queryString = searchParams.toString()
    const baseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:3000'
    const url = `${baseUrl}/api/players/week${queryString ? `?${queryString}` : ''}`
    
    const response = await fetch(url)
    const result = await response.json()
    
    if (!result.success) {
      console.error('Error fetching player of the week:', result.error)
      return result
    }
    
    return result
  } catch (error) {
    console.error('Network error fetching player of the week:', error)
    
    return {
      success: true,
      data: {
        topPlayer: {
          rank: 1,
          name: 'SKEWMOND',
          team: 'G2',
          score: 9.85,
          avatar: null,
          teamLogo: null
        },
        rankings: [
          { rank: 2, name: 'Labrov', team: 'G2', score: 9.70, teamLogo: null },
          { rank: 3, name: 'Oscarinin', team: 'Fnatic', score: 9.48, teamLogo: null },
          { rank: 4, name: 'Hans Sama', team: 'G2', score: 9.14, teamLogo: null },
          { rank: 5, name: 'Klin', team: 'Team Vitality', score: 9.08, teamLogo: null }
        ],
        lastUpdated: new Date().toISOString()
      },
      source: 'fallback'
    }
  }
}

/**
 * Update player of the week data via POST (for manual refresh/cronjob)
 * @param {Object} params - Parameters for updating
 * @param {string} params.date - Date in 'd-m' format
 * @returns {Promise} Updated data
 */
export const updatePlayerOfTheWeek = async (params = {}) => {
  try {
    const response = await fetch('/api/players/week', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    
    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to update player data')
    }
    
    return result
  } catch (error) {
    console.error('Error updating player of the week:', error)
    throw error
  }
}
