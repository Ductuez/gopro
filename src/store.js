// store.js
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "@/redux/userSlice"
import topLeagueReducer from "@/redux/topLeagueSlice" // import reducer mới
import topTournamentReducer from "@/redux/tournamentsSlice" // import reducer mới
import matchesTodayReducer from "@/redux/matchesTodaySlice"
import playerOfTheWeekReducer from "@/redux/playerOfTheWeekSlice"

export const makeStore = (options = {}) =>
  configureStore({
    reducer: {
      user: userReducer,
      leagues: topLeagueReducer,
      tournaments: topTournamentReducer,
      matchesToday: matchesTodayReducer,
      playerOfTheWeek: playerOfTheWeekReducer,
    },
    preloadedState: options.preloadedState, // quan trọng để preload
  })
