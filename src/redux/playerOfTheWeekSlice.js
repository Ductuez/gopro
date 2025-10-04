// slices/playerOfTheWeekSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchPlayerOfTheWeek = createAsyncThunk(
  'playerOfTheWeek/fetchData',
  async (params = {}) => {
    const { date, force = false } = params
    const searchParams = new URLSearchParams()
    
    if (date) searchParams.append('date', date)
    if (force) searchParams.append('force', 'true')
    
    const url = `/api/players/week${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    
    const response = await fetch(url)
    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch player data')
    }
    
    return result
  }
)

const playerOfTheWeekSlice = createSlice({
  name: "playerOfTheWeek",
  initialState: { 
    topPlayer: null,
    rankings: [],
    loading: false,
    error: null,
    lastUpdated: null,
    source: null
  },
  reducers: {
    setPlayerOfTheWeek: (state, action) => {
      const { topPlayer, rankings, lastUpdated } = action.payload
      state.topPlayer = topPlayer
      state.rankings = rankings
      state.lastUpdated = lastUpdated
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayerOfTheWeek.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPlayerOfTheWeek.fulfilled, (state, action) => {
        state.loading = false
        const { data, source, lastUpdated } = action.payload
        
        state.topPlayer = data.topPlayer
        state.rankings = data.rankings
        state.lastUpdated = lastUpdated
        state.source = source
        state.error = null
      })
      .addCase(fetchPlayerOfTheWeek.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { setPlayerOfTheWeek, clearError, setLoading } = playerOfTheWeekSlice.actions
export default playerOfTheWeekSlice.reducer
