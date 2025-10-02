/**
 * Crawling configuration and selectors
 * Contains all selectors, user agents, and crawling strategies
 */

export const CRAWLING_CONFIG = {
  baseUrl: 'https://dpm.lol',
  timeout: 10000,
  maxRedirects: 3
}

/**
 * User agents for crawling rotation
 */
export const USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
]

/**
 * HTTP headers for crawling requests
 */
export const CRAWLING_HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache'
}

/**
 * CSS selectors for player data extraction
 */
export const PLAYER_SELECTORS = {
  // Player ranking selectors
  playerRanking: [
    '.player-ranking-item',
    '.player-card',
    '[data-player-rank]',
    'div[class*="player"]',
    'div[class*="ranking"]',
    'div:has(img[src*="players"])',
    'div:has(img[src*="skewmond"])',
    'div:has(img[src*=".webp"])'
  ],
  
  // Player info selectors
  playerName: [
    '[class*="name"]',
    '[class*="player"]',
    '.player-name',
    'h1', 'h2', 'h3'
  ],
  
  playerScore: [
    '[class*="score"]',
    '[class*="rating"]',
    '[class*="point"]',
    '.score',
    '.rating'
  ],
  
  playerTeam: [
    '[class*="team"]',
    '.team-name',
    '[data-team]'
  ],
  
  // Crown icon selectors (Player of the Week indicator)
  crown: [
    'svg.lucide-crown',
    '[class*="crown"]',
    '.absolute.top-2.right-0'
  ]
}

/**
 * Image selectors for DPM-specific patterns
 */
export const IMAGE_SELECTORS = {
  // Player avatar selectors
  playerImages: [
    'img[src*="/esport/players/"]', // Matches DPM pattern: /esport/players/skewmond.webp
    'img[src*="players/"]',
    'img[src$=".webp"]',
    'img[src$=".png"]',
    'img[src$=".jpg"]'
  ],
  
  // Team logo selectors
  teamLogos: [
    'img[src*="/teams/"]',
    'img[src*="team"]', 
    'img[alt*="team"]',
    'img[src*="logo"]',
    'img[src*="g2"]',
    'img[src*="fnatic"]', 
    'img[src*="vitality"]'
  ]
}

/**
 * Parsing configuration
 */
export const PARSING_CONFIG = {
  maxPlayers: 5, // Only get top 5 players
  scoreRegex: /(\d+\.?\d*)/, // Extract numeric scores
  retryAttempts: 3
}
