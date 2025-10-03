# Pandascore Proxy API Documentation

## Overview
Secure server-side proxy for Pandascore API calls that protects API keys and provides caching, rate limiting, and error handling.

## Endpoints

### Direct Proxy
```
GET /api/pandascore?endpoint={pandascore_endpoint}&{query_params}
```

### Demo/Test
```
GET /api/pandascore/demo
```

## Security Features

- ✅ **API Key Protection**: API key stays on server, never exposed to client
- ✅ **Rate Limiting**: 30 requests/minute per IP
- ✅ **Endpoint Whitelisting**: Only allowed Pandascore endpoints
- ✅ **Input Validation**: Parameter validation with Zod
- ✅ **Caching**: 1-minute cache to reduce API calls
- ✅ **Error Handling**: Proper error responses and logging

## Usage Examples

### 1. Direct API Call
```javascript
// ❌ OLD - Direct call (exposes API key)
const response = await fetch(`https://api.pandascore.co/lol/players?per_page=10`, {
  headers: { 'Authorization': `Bearer ${process.env.PANDASCORE_API_KEY}` }
})

// ✅ NEW - Through proxy (secure)
const response = await fetch('/api/pandascore?endpoint=lol/players&per_page=10')
```

### 2. Using Service Helper
```javascript
import { pandascoreService } from '@/services/pandascoreService'

// Get players
const players = await pandascoreService.getPlayers({ per_page: 50 })

// Get teams  
const teams = await pandascoreService.getTeams({ per_page: 20 })

// Get matches with date filter
const matches = await pandascoreService.getMatches({
  begin_at: '2025-10-01T00:00:00Z',
  end_at: '2025-10-02T23:59:59Z'
})

// Get running tournaments
const tournaments = await pandascoreService.getRunningTournaments()
```

### 3. Component Usage
```javascript
// In a React component
const [players, setPlayers] = useState([])

useEffect(() => {
  const fetchPlayers = async () => {
    try {
      const data = await pandascoreService.getPlayers({ per_page: 100 })
      setPlayers(data)
    } catch (error) {
      console.error('Error fetching players:', error)
      // Handle fallback data
    }
  }
  
  fetchPlayers()
}, [])
```

## Allowed Endpoints

- `lol/players` - Get League of Legends players
- `lol/teams` - Get League of Legends teams  
- `lol/tournaments` - Get tournaments
- `lol/leagues` - Get leagues
- `lol/matches` - Get matches
- `lol/games` - Get games

## Response Headers

- `x-cache: HIT|MISS` - Indicates if response came from cache
- `cache-control: public, max-age=60` - Browser caching directive

## Error Responses

```javascript
// Rate limit exceeded
{
  "error": "Rate limit exceeded. Max 30 requests per minute."
}

// Invalid endpoint
{
  "error": "Endpoint not allowed",
  "allowedEndpoints": ["lol/players", "lol/teams", ...]
}

// Pandascore API error
{
  "error": "Pandascore API error: 429 Too Many Requests",
  "retryAfter": "60"
}
```

## Migration Guide

### Step 1: Replace Direct API Calls
```javascript
// Before
const response = await fetch(`https://api.pandascore.co/lol/players`, {
  headers: { Authorization: `Bearer ${process.env.PANDASCORE_API_KEY}` }
})

// After  
const response = await fetch('/api/pandascore?endpoint=lol/players')
```

### Step 2: Use Service Helper (Recommended)
```javascript
import { pandascoreService } from '@/services/pandascoreService'

const players = await pandascoreService.getPlayers()
```

### Step 3: Update Environment Variables
Ensure `PANDASCORE_API_KEY` is set on your host:
```bash
PANDASCORE_API_KEY=your_api_key_here
```

## Benefits

1. **Security**: API key never exposed to browser
2. **Performance**: Built-in caching reduces API calls  
3. **Reliability**: Rate limiting and error handling
4. **Monitoring**: Server-side logging for debugging
5. **Compliance**: Easier to audit and maintain API usage

## Testing

Visit `/api/pandascore/demo` to test the proxy functionality.
