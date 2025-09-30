// slices/matchesTodaySlice.js
import { createSlice } from "@reduxjs/toolkit";

const matchesTodaySlice = createSlice({
  name: "matchesToday",
  initialState: { data: [] },
  reducers: {
    setMatchesToday: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setMatchesToday } = matchesTodaySlice.actions;
export default matchesTodaySlice.reducer;
