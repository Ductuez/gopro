// app/ReduxProvider.jsx
"use client"

import { Provider } from "react-redux"
import { makeStore } from "@/store"

export default function ReduxProvider({ children, preloadedState }) {
  const store = makeStore({ preloadedState })
  return <Provider store={store}>{children}</Provider>
}
