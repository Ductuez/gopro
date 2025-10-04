/**
 * Team mapping configuration
 * Maps team display names to DPM URL identifiers and UI configurations
 */

export const TEAM_MAPPING = {
  'G2': 'G2',
  'Fnatic': 'FNC', 
  'Team Vitality': 'VIT',
  'T1': 'T1',
  'HLE': 'HLE'
}

/**
 * Team UI configuration for fallback displays
 * Used when team logos fail to load or for enhanced designs
 */
export const TEAM_UI_CONFIG = {
  'G2': { 
    icon: '🐺',
    color: 'from-gray-800 to-black',
    text: 'G2',
    bgColor: 'bg-gray-800'
  },
  'Fnatic': { 
    icon: 'FNC',
    color: 'from-orange-600 to-orange-500',
    text: 'FNC',
    bgColor: 'bg-orange-600'
  },
  'Team Vitality': { 
    icon: '🐝',
    color: 'from-purple-600 to-purple-500',
    text: 'VIT',
    bgColor: 'bg-purple-600'
  },
  'T1': { 
    icon: '👑', 
    color: 'from-blue-500 to-indigo-600', 
    text: 'T1', 
    bgColor: 'bg-blue-600' 
  },
  'HLE': { 
    icon: '⚡', 
    color: 'from-purple-500 to-pink-500', 
    text: 'HLE', 
    bgColor: 'bg-purple-500' 
  }
}

/**
 * Default team configuration for unknown teams
 */
export const DEFAULT_TEAM_CONFIG = {
  icon: '🎮', 
  color: 'from-gray-500 to-gray-600', 
  text: 'ESC', 
  bgColor: 'bg-gray-500'
}

/**
 * Get team logo URL based on DPM pattern
 * @param {string} teamName - Team name (e.g., "G2", "Fnatic", "Team Vitality")
 * @returns {string} Team logo URL
 */
export function getTeamLogoUrl(teamName) {
  if (!teamName) return null
  
  const dmpTeamName = TEAM_MAPPING[teamName] || teamName
  return `https://dpm.lol/esport/teams/${dmpTeamName}.webp`
}

/**
 * Get team UI configuration
 * @param {string} teamName - Team name
 * @returns {Object} Team UI configuration
 */
export function getTeamUIConfig(teamName) {
  return TEAM_UI_CONFIG[teamName] || DEFAULT_TEAM_CONFIG
}
