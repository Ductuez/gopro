// slices/playerOfTheWeekSlice.js
import { createSlice } from "@reduxjs/toolkit";

const playerOfTheWeekSlice = createSlice({
  name: "playerOfTheWeek",
  initialState: { data: [] },
  reducers: {
    setPlayerOfTheWeek: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPlayerOfTheWeek } = playerOfTheWeekSlice.actions;
export default playerOfTheWeekSlice.reducer;
