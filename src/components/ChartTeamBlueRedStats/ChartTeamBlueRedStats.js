import React from "react"

const ChartTeamBlueRedStats = () => {
  return (
    <div className="bg-[#111827] rounded-xl p-4 text-white shadow-md h-full">
      <div className="flex items-center gap-2 mb-4">
        <img src="/lck_logo.png" alt="LCK" className="h-6" />
        <h2 className="text-lg font-semibold">LCK Blue/Red Stats</h2>
        <span className="text-gray-400 text-sm ml-auto">Season 2025</span>
      </div>

      {/* Placeholder biểu đồ */}
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        Biểu đồ (Bar chart) ở đây
      </div>
    </div>
  )
}

export default ChartTeamBlueRedStats
