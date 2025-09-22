export default function MatchCard() {
  return (
    <div className="bg-gray-900 text-white rounded-xl px-6 py-4 flex items-center justify-between ">
      {/* Left team */}
      <div className="flex items-center space-x-3">
        <button className="text-gray-400 hover:text-yellow-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.062 6.348h6.688c.969 0 1.371 1.24.588 1.81l-5.409 3.93 2.062 6.348c.3.921-.755 1.688-1.538 1.118l-5.409-3.93-5.409 3.93c-.783.57-1.838-.197-1.538-1.118l2.062-6.348-5.409-3.93c-.783-.57-.38-1.81.588-1.81h6.688l2.062-6.348z"
            />
          </svg>
        </button>
        <img src="/teams/g2.png" alt="G2" className="w-10 h-10" />
        <span className="font-semibold text-lg">G2</span>
      </div>

      {/* Center info */}
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-400">28/9</span>
        <span className="text-xl font-bold">22:00</span>
        <span className="text-xs font-bold text-gray-300">BO5</span>
      </div>

      {/* Right team */}
      <div className="flex items-center space-x-3">
        <span className="font-semibold text-lg">TBD</span>
        <img src="/teams/tbd.png" alt="TBD" className="w-10 h-10 opacity-60" />
        <button className="text-gray-400 hover:text-yellow-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.062 6.348h6.688c.969 0 1.371 1.24.588 1.81l-5.409 3.93 2.062 6.348c.3.921-.755 1.688-1.538 1.118l-5.409-3.93-5.409 3.93c-.783.57-1.838-.197-1.538-1.118l2.062-6.348-5.409-3.93c-.783-.57-.38-1.81.588-1.81h6.688l2.062-6.348z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
