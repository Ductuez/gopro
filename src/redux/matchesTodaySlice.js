// slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "matchesToday",
  initialState: { data: [] },
  reducers: {},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
