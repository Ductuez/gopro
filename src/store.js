// store.js
import { configureStore } from "@reduxjs/toolkit";
import matchesTodayReducer from "@/redux/matchesTodaySlice";
import playerOfTheWeekReducer from "@/redux/playerOfTheWeekSlice";
import playersReducer from "@/redux/playersSlice";
import topLeagueReducer from "@/redux/topLeagueSlice"; // import reducer mới
import topTournamentReducer from "@/redux/tournamentsSlice"; // import reducer mới
import userReducer from "@/redux/userSlice";

export const makeStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      user: userReducer,
      leagues: topLeagueReducer,
      tournaments: topTournamentReducer,
      matchesToday: matchesTodayReducer,
      playerOfTheWeek: playerOfTheWeekReducer,
      players: playersReducer,
    },
    preloadedState, // quan trọng để preload
  });
