import React from "react"

const TeamStats = () => {
  return (
    <div className="bg-[#111827] rounded-xl p-4 text-white shadow-md h-full">
      <div className="flex items-center gap-2 mb-4">
        <img src="/lck_logo.png" alt="LCK" className="h-6" />
        <h2 className="text-lg font-semibold">LCK Team Stats</h2>
        <span className="text-gray-400 text-sm ml-auto">Season 2025</span>
      </div>

      {/* Stats List */}
      <div className="space-y-6 text-sm">
        <div>
          <p className="text-gray-400 mb-1 flex items-center gap-1">
            <span>⏱</span> Average gold lead
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>5.5K</li>
            <li>4.0K</li>
            <li>653</li>
          </ol>
        </div>

        <div>
          <p className="text-gray-400 mb-1">⏰ Average game time</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>28:10</li>
            <li>30:26</li>
            <li>31:03</li>
          </ol>
        </div>

        <div>
          <p className="text-gray-400 mb-1">⚡ Unique champions played</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>73</li>
            <li>54</li>
            <li>50</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default TeamStats
