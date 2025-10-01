"use client"
import React from "react"

const LCKOverview = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-[#0f1117] p-4 rounded-xl text-white">
      <div className="flex-1 bg-[#181a20] rounded-xl p-6 flex flex-col gap-6">
        <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg"
            alt="KR"
            className="w-5 h-4"
          />
          LCK 2025 OVERVIEW
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold">61</p>
            <p className="text-gray-400 text-sm">Games</p>
          </div>
          <div>
            <p className="text-xl font-bold">
              <span className="text-blue-400">44%</span> /
              <span className="text-red-400"> 56%</span>
            </p>
            <p className="text-gray-400 text-sm">Side WR</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">97</p>
            <p className="text-gray-400 text-sm">Unique Champs</p>
          </div>
          <div>
            <p className="text-2xl font-bold">31:54</p>
            <p className="text-gray-400 text-sm">Game Time</p>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/3/3d/League_of_Legends_Champions_Korea_logo.png"
            alt="LCK"
            className="w-24 opacity-80"
          />
        </div>
      </div>
    </div>
  )
}

export default LCKOverview
