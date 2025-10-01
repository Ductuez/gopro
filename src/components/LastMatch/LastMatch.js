import React from "react"

const LastMatch = () => {
  return (
    <div className="flex-1 bg-[#0f1117] w-full h-full rounded-xl p-4 flex flex-col items-center justify-center rounded-xl text-white">
      <div className="flex-1 bg-[#181a20] rounded-xl p-6  w-full  items-center flex flex-col">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">LAST MATCH</h2>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/7/7c/Hanwha_Life_Esports_logo.png"
              alt="HLE"
              className="w-14 mx-auto"
            />
            <p className="mt-2 font-semibold">HLE</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">
              1 <span className="text-gray-400">-</span> 3
            </p>
            <p className="text-gray-400 text-sm mt-2">28/9/2025 - 12:00</p>
          </div>

          <div className="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Gen.G_logo.svg/512px-Gen.G_logo.svg.png"
              alt="GEN"
              className="w-14 mx-auto"
            />
            <p className="mt-2 font-semibold">GEN</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LastMatch
