// slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit"

const playersSlice = createSlice({
  name: "players",
  initialState: { data: [] },
  reducers: {},
})

export default playersSlice.reducer
