export default function MatchCard() {
  return (
    <div className="bg-gray-900 text-white rounded-xl px-4 py-3 w-full max-w-sm bg-opacity-80">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-gray-300">TOMORROW</span>
        <span className="text-xs text-gray-400">4:00 PM</span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">TES</span>
          </div>
          <span className="text-sm font-semibold">TES</span>
        </div>

        <span className="text-xs text-gray-400">VS</span>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">IG</span>
          <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">IG</span>
          </div>
        </div>
      </div>

      {/* Voting section */}
      <div className="text-center">
        <p className="text-xs text-gray-400 mb-2">
          You need to be logged in to vote on this match
        </p>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-xs font-bold">WHO WILL WIN?</span>
          <span className="text-yellow-400">⚡</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>TES</span>
          <span>IG</span>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>3-0</span>
          <span>3-1</span>
          <span>3-2</span>
        </div>
      </div>
    </div>
  );
}
