// slices/leaguesSlice.js
import { createSlice } from "@reduxjs/toolkit"

const leagueSlice = createSlice({
  name: "leagues",
  initialState: { data: [] },
  reducers: {
    setLeagues: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { setLeagues } = leagueSlice.actions
export default leagueSlice.reducer
