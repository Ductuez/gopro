#!/usr/bin/env node

/**
 * Weekly Player of the Week Update Script
 * 
 * This script should be run every Monday to update player data
 * Usage: node scripts/update-player-of-the-week.js [date]
 * 
 * Example:
 * - node scripts/update-player-of-the-week.js (uses current week)
 * - node scripts/update-player-of-the-week.js 1-10 (specific date)
 */

const axios = require('axios')
const fs = require('fs/promises')
const path = require('path')

class WeeklyPlayerUpdater {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    this.apiEndpoint = `${this.baseUrl}/api/players/week`
    
    this.axiosConfig = {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Player-Update-Cronjob/1.0'
      }
    }
  }

  /**
   * Get current week date in d-m format
   */
  getCurrentWeekDate() {
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth() + 1
    return `${day}-${month}`
  }

  /**
   * Update player data via API
   * @param {string} date - Date in d-m format
   */
  async updatePlayerData(date) {
    try {
      console.log(`🔄 Updating player of the week data for ${date}...`)
      
      const response = await axios.post(this.apiEndpoint, {
        date: date,
        forceUpdate: true
      }, this.axiosConfig)

      if (response.data.success) {
        console.log('✅ Player data updated successfully!')
        console.log(`📁 Data cached to: ${response.data.cachedTo}`)
        console.log(`⏰ Last updated: ${response.data.lastUpdated}`)
        
        if (response.data.data?.topPlayer) {
          const top = response.data.data.topPlayer
          console.log(`🏆 Top player: ${top.name} (${top.team}) - Score: ${top.score}`)
        }
        
        return response.data
      } else {
        throw new Error(response.data.error || 'Update failed')
      }
    } catch (error) {
      console.error('❌ Error updating player data:', error.message)
      
      if (error.response?.status) {
        console.error(`HTTP Status: ${error.response.status}`)
      }
      
      if (error.response?.data) {
        console.error('Response data:', error.response.data)
      }
      
      throw error
    }
  }

  /**
   * Verify data was updated correctly
   * @param {string} date - Date to verify
   */
  async verifyUpdate(date) {
    try {
      console.log(`🔍 Verifying data for ${date}...`)
      
      const response = await axios.get(`${this.apiEndpoint}?date=${date}`, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Player-Update-Cronjob/1.0'
        }
      })

      if (response.data.success) {
        const { data, source, lastUpdated } = response.data
        console.log(`✅ Verification successful!`)
        console.log(`📡 Data source: ${source}`)
        console.log(`⏰ Last updated: ${lastUpdated}`)
        console.log(`👥 Total rankings: ${data.rankings?.length || 0}`)
        
        return true
      } else {
        console.error('❌ Verification failed:', response.data.error)
        return false
      }
    } catch (error) {
      console.error('❌ Error during verification:', error.message)
      return false
    }
  }

  /**
   * Clean old cache files (keep last 4 weeks)
   */
  async cleanOldCache() {
    try {
      console.log('🧹 Cleaning old cache files...')
      
      const cacheDir = path.join(process.cwd(), 'data', 'weekly-players')
      
      try {
        await fs.access(cacheDir)
      } catch {
        console.log('📁 No cache directory found, skipping cleanup')
        return
      }
      
      const files = await fs.readdir(cacheDir)
      const playerFiles = files.filter(file => file.startsWith('players-') && file.endsWith('.json'))
      
      const fileStats = await Promise.all(
        playerFiles.map(async file => {
          const filePath = path.join(cacheDir, file)
          const stats = await fs.stat(filePath)
          return { file, filePath, mtime: stats.mtime }
        })
      )
      
      fileStats.sort((a, b) => b.mtime - a.mtime)
      const filesToDelete = fileStats.slice(4)
      
      for (const fileInfo of filesToDelete) {
        await fs.unlink(fileInfo.filePath)
        console.log(`🗑️ Deleted old cache file: ${fileInfo.file}`)
      }
      
      console.log(`✅ Cleanup complete. Kept ${Math.min(4, fileStats.length)} files.`)
      
    } catch (error) {
      console.error('❌ Error cleaning cache:', error.message)
    }
  }

  /**
   * Send notification (placeholder for future integration)
   * @param {Object} data - Updated player data
   */
  async sendNotification(data) {
    console.log('📢 Notification: Player data updated successfully')
    
    if (data?.data?.topPlayer) {
      const top = data.data.topPlayer
      console.log(`🏆 This week's top player: ${top.name} from ${top.team}`)
    }
  }

  /**
   * Main execution function
   * @param {string} date - Optional date override
   */
  async run(date) {
    const targetDate = date || this.getCurrentWeekDate()
    
    console.log('🚀 Starting weekly player update process...')
    console.log(`📅 Target date: ${targetDate}`)
    console.log(`🌐 API endpoint: ${this.apiEndpoint}`)
    
    try {
      const updateResult = await this.updatePlayerData(targetDate)
      const verified = await this.verifyUpdate(targetDate)
      
      if (!verified) {
        throw new Error('Data verification failed')
      }
      
      await this.cleanOldCache()
      await this.sendNotification(updateResult)
      
      console.log('🎉 Weekly player update completed successfully!')
      
      return {
        success: true,
        date: targetDate,
        data: updateResult
      }
      
    } catch (error) {
      console.error('💥 Weekly player update failed:', error.message)
      process.exit(1)
    }
  }
}

if (require.main === module) {
  const updater = new WeeklyPlayerUpdater()
  const dateArg = process.argv[2]
  
  updater.run(dateArg)
    .then(result => {
      console.log('✅ Script completed successfully')
      process.exit(0)
    })
    .catch(error => {
      console.error('❌ Script failed:', error.message)
      process.exit(1)
    })
}

module.exports = WeeklyPlayerUpdater
