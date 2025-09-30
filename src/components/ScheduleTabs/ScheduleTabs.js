export default function ScheduleTabs({ tab, setTab }) {
  return (
    <div className="flex mb-6 rounded-lg p-1 gap-1 bg-black-700 border border-white-10 bg-opacity-80">
      <button
        onClick={() => setTab("all")}
        className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
          tab === "all"
            ? "text-white shadow-sm bg-purple-hover"
            : "text-gray-400 hover:text-gray-300"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setTab("favorites")}
        className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
          tab === "favorites"
            ? "text-white shadow-sm bg-purple-hover"
            : "text-gray-400 hover:text-gray-300"
        }`}
      >
        <span className="text-yellow-400">★</span>
        <span>Favorites</span>
      </button>
    </div>
  );
}
