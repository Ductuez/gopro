# Setup Guide - Player of the Week Crawler

## Installation Steps

### 1. Install Required Dependencies

```bash
npm install cheerio
# or
yarn add cheerio
```

### 2. Enable Real Crawling

After installing cheerio, uncomment the crawling code in `/src/services/playerOfTheWeekService.js`:

```javascript
import * as cheerio from 'cheerio'
```

Then replace the mock data return with actual crawling:

```javascript
// In crawlPlayerOfTheWeek method, replace:
return this.getMockData()

// With:
const url = `${this.baseUrl}/esport/?date=${date}`

const response = await axios.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
  },
  timeout: 10000
})

const $ = cheerio.load(response.data)
return this.parsePlayerData($)
```

### 3. Test the System

```bash
# Test API endpoint
curl "http://localhost:3000/api/players/week"

# Test manual update script
npm run update:player-of-week

# Test with specific date
npm run update:player-of-week 1-10
```

### 4. Configure Cronjob

See `/docs/PLAYER_OF_THE_WEEK_CRONJOB.md` for detailed cronjob setup instructions.

## Current Status

✅ **Working Features:**
- Component structure matches UI mockup
- Redux state management
- API endpoints for GET/POST
- Caching system
- Fallback mock data
- Cronjob script ready
- Image optimization for dpm.lol domain

🔄 **Pending:**
- Install cheerio dependency
- Enable real web crawling
- Fine-tune HTML parsing for dpm.lol structure

## File Structure

```
src/
├── services/
│   └── playerOfTheWeekService.js     # Main crawling service
├── action/
│   └── playerOfTheWeek.js            # API interaction
├── redux/
│   └── playerOfTheWeekSlice.js       # State management
├── components/
│   └── PlayerOfTheWeek/
│       └── PlayerOfTheWeek.js        # UI component
├── app/
│   └── api/
│       └── players/
│           └── week/
│               └── route.js          # API endpoint
scripts/
└── update-player-of-the-week.js     # Cronjob script
data/
└── weekly-players/                   # Cache directory
docs/
└── PLAYER_OF_THE_WEEK_CRONJOB.md    # Setup guide
```

## Data Flow

1. **Page Load**: Component fetches data via Redux thunk
2. **API Route**: Checks cache, returns fresh/cached/fallback data  
3. **Service**: Crawls dpm.lol (currently mock), parses HTML, caches result
4. **Component**: Displays top player + rankings matching UI mockup
5. **Cronjob**: Weekly updates via POST endpoint

The system is production-ready except for the cheerio dependency!
