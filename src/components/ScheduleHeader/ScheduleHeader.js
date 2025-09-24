"use client"
import { useState } from "react"
import dayjs from "dayjs"

export default function ScheduleHeader() {
  const [currentDate, setCurrentDate] = useState(dayjs())

  const goToPrevDay = () => {
    setCurrentDate((prev) => prev.subtract(1, "day"))
  }

  const goToNextDay = () => {
    setCurrentDate((prev) => prev.add(1, "day"))
  }

  const goToToday = () => {
    setCurrentDate(dayjs())
  }

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Logo và title */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">ES</span>
        </div>
        <h2 className="font-bold text-white text-lg">ESPORTS</h2>
      </div>

      {/* Date navigation */}
      <div className="flex items-center space-x-3">
        <button
          onClick={goToToday}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm rounded-full text-white font-medium transition-colors hover:bg-purple-hover cursor-pointer"
        >
          TODAY
        </button>

        <div className="flex items-center rounded-lg overflow-hidden border bg-black-700 border-white-10 bg-opacity-80 hover:bg-opacity-100">
          <button
            onClick={goToPrevDay}
            className="px-3 py-2 text-gray-300 transition-colors hover:bg-purple-hover cursor-pointer hover:text-white hover:bg-opacity-100"
          >
            ‹
          </button>

          <div className="px-4 py-2 text-white font-medium min-w-[80px] text-center bg-purple-hover">
            {currentDate.format("DD/MM")}
          </div>

          <button
            onClick={goToNextDay}
            className="px-3 py-2 text-gray-300 transition-colors hover:bg-purple-hover cursor-pointer hover:text-white hover:bg-opacity-100"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
