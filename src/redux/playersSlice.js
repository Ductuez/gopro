// slices/playersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: { data: [] },
  reducers: {
    setPlayers: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPlayers } = playersSlice.actions;
export default playersSlice.reducer;
