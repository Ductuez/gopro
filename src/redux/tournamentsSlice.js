// slices/tournamentsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const tournamentsSlice = createSlice({
  name: "tournaments",
  initialState: { data: [] },
  reducers: {
    setTournaments: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setTournaments } = tournamentsSlice.actions;
export default tournamentsSlice.reducer;
