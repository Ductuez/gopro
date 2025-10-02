# Player of the Week - Cronjob Setup

This document explains how to set up and use the weekly player data update system.

## Overview

The system automatically crawls player performance data from `dpm.lol/esport/?date=1-10` and updates the Player of the Week component with:

- Top performing player with avatar and score
- Rankings of top 5 players
- Automatic caching system
- Fallback data for reliability

## Manual Usage

### Update Player Data
```bash
# Update current week
npm run update:player-of-week

# Update specific date
npm run update:player-of-week 1-10

# Or run directly
node scripts/update-player-of-the-week.js
node scripts/update-player-of-the-week.js 1-10
```

### API Endpoints

#### GET `/api/players/week`
Fetch player data (with caching)

Parameters:
- `date` (optional): Date in 'd-m' format (e.g., '1-10')
- `force` (optional): Set to 'true' to bypass cache

```bash
# Get current week data
curl "http://localhost:3000/api/players/week"

# Get specific date
curl "http://localhost:3000/api/players/week?date=1-10"

# Force refresh
curl "http://localhost:3000/api/players/week?force=true"
```

#### POST `/api/players/week`
Manually update player data

```bash
curl -X POST "http://localhost:3000/api/players/week" \
  -H "Content-Type: application/json" \
  -d '{"date":"1-10","forceUpdate":true}'
```

## Cronjob Setup

### 1. Linux/macOS Cron

Add to crontab (`crontab -e`):

```bash
# Update every Monday at 2 AM
0 2 * * 1 cd /path/to/your/project && npm run update:player-of-week >> /var/log/player-update.log 2>&1

# Update every Monday at 2 AM with specific Node version
0 2 * * 1 /usr/local/bin/node /path/to/your/project/scripts/update-player-of-the-week.js >> /var/log/player-update.log 2>&1
```

### 2. GitHub Actions (CI/CD)

Create `.github/workflows/update-players.yml`:

```yaml
name: Update Player of the Week

on:
  schedule:
    # Every Monday at 02:00 UTC
    - cron: '0 2 * * 1'
  workflow_dispatch: # Allow manual trigger

jobs:
  update-players:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Update player data
      run: npm run update:player-of-week
      env:
        NEXT_PUBLIC_API_URL: ${{ secrets.PRODUCTION_URL }}
    
    - name: Commit updated data
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add data/weekly-players/
        git commit -m "Update player of the week data" || exit 0
        git push
```

### 3. Vercel Cron Jobs

Create `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/players/week",
      "schedule": "0 2 * * 1"
    }
  ]
}
```

### 4. Railway/Heroku Scheduler

Add to your deployment platform's scheduler:

```bash
# Command to run
npm run update:player-of-week

# Schedule: Every Monday at 02:00
```

## Data Structure

### API Response Format
```json
{
  "success": true,
  "data": {
    "topPlayer": {
      "rank": 1,
      "name": "SKEWMOND",
      "team": "G2",
      "score": 9.85,
      "avatar": "https://dpm.lol/esport/players/skewmond.webp",
      "teamLogo": "https://dpm.lol/esport/leagues/G2.webp"
    },
    "rankings": [
      {
        "rank": 2,
        "name": "Labrov",
        "team": "G2", 
        "score": 9.70,
        "teamLogo": "https://dpm.lol/esport/leagues/G2.webp"
      }
    ],
    "lastUpdated": "2025-10-01T15:30:00.000Z"
  },
  "source": "fresh|cache|fallback",
  "lastUpdated": "2025-10-01T15:30:00.000Z"
}
```

### Cache Files
Data is cached in `data/weekly-players/players-{date}.json`

Example: `data/weekly-players/players-1-10.json`

## Configuration

### Environment Variables
```bash
# Optional: API base URL for cronjob script
NEXT_PUBLIC_API_URL=http://localhost:3000

# Required: Next.js image domains (already configured)
# next.config.mjs includes dpm.lol hostname
```

### Customization

#### Update Frequency
Modify the cron schedule:
- Daily: `0 2 * * *`
- Twice weekly: `0 2 * * 1,4` (Monday & Thursday)
- Monthly: `0 2 1 * *`

#### Data Source
To change the data source, modify:
- `src/services/playerOfTheWeekService.js` - Update `baseUrl` and parsing logic
- Update the `crawlPlayerOfTheWeek()` method for different data structure

#### Caching Duration
Modify cache validity in `src/app/api/players/week/route.js`:
```javascript
// Current: 24 hours
const hoursSinceUpdate = (now - lastUpdate) / (1000 * 60 * 60)
if (hoursSinceUpdate < 24) // Change this value
```

## Monitoring

### Logs
- Manual updates: Check console output
- Cronjob: Check log files specified in cron command
- API requests: Check Next.js logs

### Health Check
Test the system:
```bash
# Check if API is working
curl "http://localhost:3000/api/players/week"

# Verify data freshness
curl "http://localhost:3000/api/players/week?force=true"

# Test script directly
npm run update:player-of-week
```

### Troubleshooting

1. **Script fails**: Check Node.js version and dependencies
2. **API timeout**: Increase timeout in service config
3. **Parsing errors**: Website structure may have changed
4. **Image loading issues**: Verify Next.js image domains configuration

## Development

### Testing the Service
```javascript
import PlayerOfTheWeekService from './src/services/playerOfTheWeekService.js'

const service = new PlayerOfTheWeekService()
const data = await service.crawlPlayerOfTheWeek('1-10')
console.log(data)
```

### Mock Data
The service includes fallback mock data that matches the UI structure for development and error scenarios.

---

**Note**: Remember to test the cronjob in a staging environment before deploying to production.
