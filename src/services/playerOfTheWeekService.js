import axios from 'axios'
import { TEAM_MAPPING, getTeamLogoUrl } from '@/config/teamConfig'
import { getMockPlayerData, getPlayerAvatarUrl } from '@/config/mockPlayerData'
import { 
  CRAWLING_CONFIG, 
  USER_AGENTS, 
  CRAWLING_HEADERS, 
  PLAYER_SELECTORS, 
  IMAGE_SELECTORS, 
  PARSING_CONFIG 
} from '@/config/crawlingConfig'

class PlayerOfTheWeekService {
  constructor() {
    this.baseUrl = CRAWLING_CONFIG.baseUrl
  }

  /**
   * Generate team logo URL based on DPM pattern
   * @param {string} teamName - Team name (e.g., "G2", "Fnatic", "Team Vitality")
   * @returns {string} Team logo URL
   */
  getTeamLogoUrl(teamName) {
    const logoUrl = getTeamLogoUrl(teamName)
    console.log(`Generated team logo URL for "${teamName}":`, logoUrl)
    return logoUrl
  }

  /**
   * Generate player avatar URL based on DPM pattern
   * @param {string} playerName - Player name (e.g., "skewmond")
   * @returns {string} Player avatar URL
   */
  getPlayerAvatarUrl(playerName) {
    const avatarUrl = getPlayerAvatarUrl(playerName)
    console.log(`Generated player avatar URL for "${playerName}":`, avatarUrl)
    return avatarUrl
  }

  /**
   * Generate player avatar URL based on DPM pattern
   * @param {string} playerName - Player name (e.g., "skewmond")
   * @returns {string} Player avatar URL
   */
  getPlayerAvatarUrl(playerName) {
    if (!playerName) return null
    
    // Use the exact DPM player pattern: https://dpm.lol/esport/players/skewmond.webp
    const playerNameLower = playerName.toLowerCase()
    const avatarUrl = `https://dpm.lol/esport/players/${playerNameLower}.webp`
    
    console.log(`Generated player avatar URL for "${playerName}":`, avatarUrl)
    return avatarUrl
  }

  /**
   * Resolve relative URLs to absolute URLs specifically for DPM
   * @param {string} url - Image URL
   * @returns {string} Resolved URL
   */
  resolveImageUrl(url) {
    if (!url) return null
    
    console.log('Resolving image URL:', url)
    
    // Already absolute URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      console.log('Already absolute:', url)
      return url
    }
    
    // Relative URL starting with /
    if (url.startsWith('/')) {
      const resolved = `${this.baseUrl}${url}`
      console.log('Resolved relative URL:', resolved)
      return resolved
    }
    
    // Data URLs or other protocols
    if (url.startsWith('data:') || url.startsWith('blob:')) {
      return url
    }
    
    // Relative path without leading slash
    const resolved = `${this.baseUrl}/${url}`
    console.log('Resolved relative path:', resolved)
    return resolved
  }

  /**
   * Crawl player of the week data from DPM website
   * @param {string} date - Date in format 'MM-DD' 
   * @returns {Promise<Object>} Player data with top player and rankings
   */
  async crawlPlayerOfTheWeek(date = '1-10') {
    try {
      console.log('Attempting to crawl DPM for date:', date)
      
      const strategies = [
        async () => {
          for (const userAgent of USER_AGENTS) {
            try {
              const url = `${this.baseUrl}/esport/?date=${date}`
              console.log(`Trying to fetch: ${url}`)
              
              const response = await axios.get(url, { 
                headers: {
                  'User-Agent': userAgent,
                  ...CRAWLING_HEADERS
                },
                timeout: CRAWLING_CONFIG.timeout,
                maxRedirects: CRAWLING_CONFIG.maxRedirects
              })
              
              if (response.data && !response.data.includes('challenge-platform') && !response.data.includes('Just a moment')) {
                console.log('Got HTML content, parsing...')
                console.log('HTML length:', response.data.length)
                console.log('HTML preview:', response.data.substring(0, 500))
                
                const cheerio = await import('cheerio')
                const $ = cheerio.load(response.data)
                
                // Log all images found
                const allImages = $('img').map((i, el) => $(el).attr('src')).get()
                console.log('All images found:', allImages)
                
                return this.parsePlayerData($, response.data)
              }
            } catch (error) {
              console.log(`User agent ${userAgent} failed:`, error.message)
              continue
            }
          }
          return null
        }
      ]
      
      for (const strategy of strategies) {
        try {
          const result = await strategy()
          if (result && (result.topPlayer || result.rankings.length > 0)) {
            console.log('Successfully extracted real DPM data!')
            return result
          }
        } catch (error) {
          console.log('Strategy failed:', error.message)
        }
      }
      
      console.log('All crawling strategies failed, using mock data')
      return getMockPlayerData()
      
    } catch (error) {
      console.error('Error crawling DPM website:', error.message)
      console.log('Falling back to mock data')
      return getMockPlayerData()
    }
  }

  /**
   * Parse HTML to extract player data
   * @param {CheerioAPI} $ - Cheerio instance  
   * @param {string} html - Raw HTML for debugging
   * @returns {Object} Parsed player data
   */
  parsePlayerData($, html = '') {
    const playerData = {
      topPlayer: null,
      rankings: [],
      lastUpdated: new Date().toISOString()
    }

    try {
      console.log('Parsing HTML for player data...')
      
      const title = $('title').text()
      console.log('Page title:', title)
      console.log('Looking for Compare Stats container...')
      const compareStatsContainer = $('.flex.flex-col.gap-4.items-center.justify-center.rounded-lg')
      console.log('Compare Stats container found:', compareStatsContainer.length > 0)
      const playerSelectors = PLAYER_SELECTORS.playerRanking
      
      let foundPlayers = false
      for (const selector of playerSelectors) {
        const playerElements = $(selector)
        if (playerElements.length > 0) {
          console.log(`Found ${playerElements.length} players with selector: ${selector}`)
          
          playerElements.each((index, element) => {
            if (index >= PARSING_CONFIG.maxPlayers) return false
            
            const player = this.extractPlayerInfo($, $(element), index + 1)
            if (player) {
              foundPlayers = true
              if (index === 0) {
                playerData.topPlayer = player
              } else {
                playerData.rankings.push(player)
              }
            }
          })
          
          if (foundPlayers) break
        }
      }

      if (!playerData.topPlayer && playerData.rankings.length === 0) {
        return getMockPlayerData()
      }

      return playerData
    } catch (error) {
      console.error('Error parsing player data:', error)
      return getMockPlayerData()
    }
  }

  /**
   * Extract top player information
   * @param {CheerioAPI} $ - Cheerio instance
   * @param {Cheerio} section - Player section element
   * @returns {Object} Top player data
   */
  extractTopPlayer($, section) {
    try {
      const name = section.find(PLAYER_SELECTORS.playerName.join(', ')).first().text().trim()
      const scoreText = section.find(PLAYER_SELECTORS.playerScore.join(', ')).first().text().trim()
      const score = this.extractScore(scoreText)
      const team = section.find(PLAYER_SELECTORS.playerTeam.join(', ')).first().text().trim()
      const avatar = section.find('img[src*="player"], img[alt*="player"], img').first().attr('src')
      
      let teamLogo = null
      let playerAvatar = null
      let hasCrown = false
      
      const crownElement = section.find(PLAYER_SELECTORS.crown.join(', '))
      if (crownElement.length > 0) {
        hasCrown = true
        console.log('Found crown icon - this is Player of the Week!')
      }
      
      for (const selector of IMAGE_SELECTORS.playerImages) {
        const img = section.find(selector).first().attr('src')
        if (img) {
          playerAvatar = img
          console.log('Found player image:', img)
          break
        }
      }
      
      for (const selector of IMAGE_SELECTORS.teamLogos) {
        const logo = section.find(selector).first().attr('src')
        if (logo && logo !== playerAvatar) {
          teamLogo = logo
          console.log('Found team logo:', logo)
          break
        }
      }
      
      if (playerAvatar) {
        avatar = playerAvatar
      }

      console.log('Extracted player data:', { name, team, score, avatar, teamLogo })
      const finalAvatar = avatar ? this.resolveImageUrl(avatar) : this.getPlayerAvatarUrl(name || 'SKEWMOND')
      const finalTeamLogo = teamLogo ? this.resolveImageUrl(teamLogo) : this.getTeamLogoUrl(team || 'G2')

      return {
        rank: 1,
        name: name || 'SKEWMOND',
        team: team || 'G2',
        score: score || 9.85,
        avatar: finalAvatar,
        teamLogo: finalTeamLogo,
        hasCrown: hasCrown
      }
    } catch (error) {
      console.error('Error extracting top player:', error)
      return null
    }
  }

  /**
   * Extract rankings list
   * @param {CheerioAPI} $ - Cheerio instance
   * @param {Cheerio} section - Player section element
   * @returns {Array} Rankings array
   */
  extractRankings($, section) {
    const rankings = []
    
    try {
      const rankingItems = section.find('[class*="ranking"], .ranking-item, li').slice(1, 6) // Top 5 excluding #1
      
      rankingItems.each((index, element) => {
        const player = this.extractPlayerInfo($, $(element), index + 2)
        if (player) {
          rankings.push(player)
        }
      })

      return rankings
    } catch (error) {
      console.error('Error extracting rankings:', error)
      return []
    }
  }

  /**
   * Extract individual player information from element
   * @param {CheerioAPI} $ - Cheerio instance
   * @param {Cheerio} element - Player element
   * @param {number} rank - Player rank
   * @returns {Object} Player data
   */
  extractPlayerInfo($, element, rank) {
    try {
      const name = element.find(PLAYER_SELECTORS.playerName.join(', ')).first().text().trim()
      const scoreText = element.find(PLAYER_SELECTORS.playerScore.join(', ')).first().text().trim()
      const score = this.extractScore(scoreText)
      const team = element.find(PLAYER_SELECTORS.playerTeam.join(', ')).first().text().trim()
      
      let teamLogo = null
      let playerAvatar = null
      
      for (const selector of IMAGE_SELECTORS.playerImages) {
        const img = element.find(selector).first().attr('src')
        if (img) {
          playerAvatar = img
          console.log(`Rank ${rank} player image:`, img)
          break
        }
      }
      
      for (const selector of IMAGE_SELECTORS.teamLogos) {
        const logo = element.find(selector).first().attr('src')
        if (logo && logo !== playerAvatar) {
          teamLogo = logo
          console.log(`Rank ${rank} team logo:`, logo)
          break
        }
      }

      if (!name) return null

      console.log('Extracted ranking player:', { rank, name, team, score, teamLogo })

      const finalTeamLogo = teamLogo ? this.resolveImageUrl(teamLogo) : this.getTeamLogoUrl(team || 'Unknown')

      return {
        rank,
        name,
        team: team || 'Unknown',
        score: score || (10 - rank * 0.2),
        teamLogo: finalTeamLogo
      }
    } catch (error) {
      console.error('Error extracting player info:', error)
      return null
    }
  }

  /**
   * Extract numeric score from text
   * @param {string} scoreText - Score text
   * @returns {number} Numeric score
   */
  extractScore(scoreText) {
    if (!scoreText) return null
    
    const match = scoreText.match(PARSING_CONFIG.scoreRegex);
    return match ? parseFloat(match[1]) : null
  }

  /**
   * Resolve relative image URLs
   * @param {string} url - Image URL
   * @returns {string} Resolved URL
   */
  resolveImageUrl(url) {
    if (!url) return null
    if (url.startsWith('http')) return url
    if (url.startsWith('/')) return `${this.baseUrl}${url}`
    return url
  }



  /**
   * Cache player data to file system or database
   * @param {Object} data - Player data to cache
   * @param {string} date - Date identifier
   */
  async cachePlayerData(data, date) {
    try {
      const fs = await import('fs/promises')
      const path = await import('path')
      
      const cacheDir = path.join(process.cwd(), 'data', 'weekly-players')
      await fs.mkdir(cacheDir, { recursive: true })
      
      const fileName = `players-${date}.json`
      const filePath = path.join(cacheDir, fileName)
      
      await fs.writeFile(filePath, JSON.stringify(data, null, 2))
      console.log(`Player data cached to ${filePath}`)
      
      return filePath
    } catch (error) {
      console.error('Error caching player data:', error)
      throw error
    }
  }

  /**
   * Load cached player data
   * @param {string} date - Date identifier
   * @returns {Object|null} Cached player data or null if not found
   */
  async loadCachedPlayerData(date) {
    try {
      const fs = await import('fs/promises')
      const path = await import('path')
      
      const cacheDir = path.join(process.cwd(), 'data', 'weekly-players')
      const fileName = `players-${date}.json`
      const filePath = path.join(cacheDir, fileName)
      
      const data = await fs.readFile(filePath, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      return null
    }
  }

  /**
   * Get current week's date identifier
   * @returns {string} Date identifier in 'd-m' format
   */
  getCurrentWeekDate() {
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth() + 1
    return `${day}-${month}`
  }
}

export default PlayerOfTheWeekService
