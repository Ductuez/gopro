"use client"
import { useState, useEffect, useRef } from "react"
import dayjs from "dayjs"

export default function ScheduleHeader({ onDateChange }) {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarViewDate, setCalendarViewDate] = useState(dayjs())
  const calendarRef = useRef(null)

  const goToPrevDay = () => {
    const newDate = currentDate.subtract(1, "day")
    setCurrentDate(newDate)
    setCalendarViewDate(newDate)
    onDateChange?.(newDate)
  }

  const goToNextDay = () => {
    const newDate = currentDate.add(1, "day")
    setCurrentDate(newDate)
    setCalendarViewDate(newDate)
    onDateChange?.(newDate)
  }

  const goToToday = () => {
    const today = dayjs()
    setCurrentDate(today)
    setCalendarViewDate(today)
    onDateChange?.(today)
  }

  const handleDateSelect = (date) => {
    setCurrentDate(date)
    onDateChange?.(date)
    setShowCalendar(false)
  }

  const goToPrevMonth = () => {
    setCalendarViewDate(prev => prev.subtract(1, 'month'))
  }

  const goToNextMonth = () => {
    setCalendarViewDate(prev => prev.add(1, 'month'))
  }

  const getDaysInMonth = () => {
    const startOfMonth = calendarViewDate.startOf('month')
    const endOfMonth = calendarViewDate.endOf('month')
    const startOfWeek = startOfMonth.startOf('week')
    const endOfWeek = endOfMonth.endOf('week')
    
    const days = []
    let current = startOfWeek
    
    while (current.isBefore(endOfWeek) || current.isSame(endOfWeek, 'day')) {
      days.push(current)
      current = current.add(1, 'day')
    }
    
    return days
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false)
      }
    }

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCalendar])

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
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm rounded-full text-white font-medium transition-colors"
        >
          TODAY
        </button>

        <div className="flex items-center rounded-lg border bg-gray-800 border-gray-600 relative">
          <button
            onClick={goToPrevDay}
            className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <div className="relative" ref={calendarRef}>
            <button
              onClick={() => {
                console.log('Calendar button clicked, current showCalendar:', showCalendar)
                setCalendarViewDate(currentDate)
                setShowCalendar(!showCalendar)
              }}
              className="flex items-center px-4 py-2 text-white font-medium hover:bg-gray-700 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              {currentDate.format("DD/MM")}
            </button>
            {showCalendar && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-[9999] mt-2 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl w-80" style={{zIndex: 9999}}>
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={goToPrevMonth}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  
                  <div className="text-white font-medium text-lg">
                    {calendarViewDate.format('MMMM YYYY')}
                  </div>
                  
                  <button 
                    onClick={goToNextMonth}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                  </button>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-gray-400 text-xs py-1 font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth().map((date, index) => {
                    const isCurrentMonth = date.month() === calendarViewDate.month()
                    const isSelected = date.isSame(currentDate, 'day')
                    const isToday = date.isSame(dayjs(), 'day')
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(date)}
                        className={`
                          h-8 w-8 text-sm rounded-md transition-colors relative flex items-center justify-center
                          ${isCurrentMonth 
                            ? isSelected 
                              ? 'bg-blue-600 text-white font-bold' 
                              : isToday
                                ? 'bg-gray-700 text-white font-medium'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                            : 'text-gray-600 hover:text-gray-400'
                          }
                        `}
                      >
                        {date.date()}
                      </button>
                    )
                  })}
                </div>

                {/* Calendar Footer */}
                <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between">
                  <button 
                    onClick={() => {
                      const today = dayjs()
                      setCurrentDate(today)
                      setCalendarViewDate(today)
                      onDateChange?.(today)
                      setShowCalendar(false)
                    }}
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                  >
                    Today
                  </button>
                  <button 
                    onClick={() => setShowCalendar(false)}
                    className="text-gray-400 hover:text-gray-300 transition-colors text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={goToNextDay}
            className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
