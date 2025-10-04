/**
 * Mock player data configuration
 * Using the correct DPM image URL patterns
 */

export const MOCK_PLAYER_DATA = {
  topPlayer: {
    rank: 1,
    name: 'SKEWMOND',
    team: 'G2',
    score: 9.85,
    avatar: 'https://dpm.lol/esport/players/skewmond.webp',
    teamLogo: 'https://dpm.lol/esport/teams/G2.webp',
    hasCrown: true // Player of the Week crown indicator
  },
  rankings: [
    {
      rank: 2,
      name: 'Labrov',
      team: 'G2',
      score: 9.70,
      teamLogo: 'https://dpm.lol/esport/teams/G2.webp'
    },
    {
      rank: 3,
      name: 'Oscarinin',
      team: 'Fnatic',
      score: 9.48,
      teamLogo: 'https://dpm.lol/esport/teams/FNC.webp' // Correct Fnatic URL
    },
    {
      rank: 4,
      name: 'Hans Sama',
      team: 'G2',
      score: 9.14,
      teamLogo: 'https://dpm.lol/esport/teams/G2.webp'
    },
    {
      rank: 5,
      name: 'Elyoya',
      team: 'Team Vitality',
      score: 9.09,
      teamLogo: 'https://dpm.lol/esport/teams/VIT.webp'
    }
  ],
  lastUpdated: new Date().toISOString()
}

/**
 * Get mock data with current timestamp
 * @returns {Object} Mock player data with updated timestamp
 */
export function getMockPlayerData() {
  return {
    ...MOCK_PLAYER_DATA,
    lastUpdated: new Date().toISOString()
  }
}

/**
 * Generate player avatar URL based on DPM pattern
 * @param {string} playerName - Player name (e.g., "skewmond")
 * @returns {string} Player avatar URL
 */
export function getPlayerAvatarUrl(playerName) {
  if (!playerName) return null
  
  // Use the exact DPM player pattern: https://dpm.lol/esport/players/skewmond.webp
  const playerNameLower = playerName.toLowerCase()
  return `https://dpm.lol/esport/players/${playerNameLower}.webp`
}
