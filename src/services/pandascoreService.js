/**
 * Pandascore Proxy Service
 * Provides a clean interface to call Pandascore API through our proxy
 */

import instance from './axios'

class PandascoreService {
  constructor() {
    this.baseUrl = '/api/pandascore'
  }

  /**
   * Generic method to call any Pandascore endpoint through proxy
   * @param {string} endpoint - The Pandascore endpoint (e.g., 'lol/players')
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} API response
   */
  async call(endpoint, params = {}) {
    try {
      const searchParams = new URLSearchParams({
        endpoint,
        ...params
      })

      const response = await fetch(`${instance.defaults.baseURL}/pandascore?${searchParams}`, {
        next: { revalidate: 60 }
      })

      if (!response.ok) {
        throw new Error(`Proxy error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Pandascore service error:', error)
      throw error
    }
  }

  /**
   * Get League of Legends players
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Players array
   */
  async getPlayers(options = {}) {
    const defaultOptions = {
      per_page: 50,
      sort: '-modified_at',
      ...options
    }
    return this.call('lol/players', defaultOptions)
  }

  /**
   * Get League of Legends teams
   * @param {Object} options - Query options  
   * @returns {Promise<Array>} Teams array
   */
  async getTeams(options = {}) {
    const defaultOptions = {
      per_page: 50,
      ...options
    }
    return this.call('lol/teams', defaultOptions)
  }

  /**
   * Get League of Legends tournaments
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Tournaments array
   */
  async getTournaments(options = {}) {
    const defaultOptions = {
      per_page: 50,
      ...options
    }
    return this.call('lol/tournaments', defaultOptions)
  }

  /**
   * Get League of Legends leagues
   * @param {string|number} leagueId - League ID (optional)
   * @param {Object} options - Query options
   * @returns {Promise<Object|Array>} League data
   */
  async getLeagues(leagueId = null, options = {}) {
    const endpoint = leagueId ? `lol/leagues/${leagueId}` : 'lol/leagues'
    const defaultOptions = {
      per_page: 50,
      ...options
    }
    return this.call(endpoint, defaultOptions)
  }

  /**
   * Get League of Legends matches
   * @param {Object} options - Query options (begin_at, end_at, etc.)
   * @returns {Promise<Array>} Matches array
   */
  async getMatches(options = {}) {
    const defaultOptions = {
      per_page: 50,
      ...options
    }
    return this.call('lol/matches', defaultOptions)
  }

  /**
   * Get running tournaments (commonly used)
   * @returns {Promise<Array>} Running tournaments
   */
  async getRunningTournaments() {
    return this.call('lol/tournaments/running')
  }

  /**
   * Get specific league by slug
   * @param {string} slug - League slug
   * @returns {Promise<Object>} League data
   */
  async getLeagueBySlug(slug) {
    return this.call(`lol/leagues/${slug}`)
  }
}

// Export singleton instance
export const pandascoreService = new PandascoreService()

// Export class for custom instances if needed
export { PandascoreService }

export const {
  getPlayers,
  getTeams,
  getTournaments,
  getLeagues,
  getMatches,
  getRunningTournaments,
  getLeagueBySlug
} = pandascoreService
