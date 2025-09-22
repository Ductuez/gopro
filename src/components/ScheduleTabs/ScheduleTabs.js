export default function ScheduleTabs({ tab, setTab }) {
  return (
    <div className="flex mb-4">
      <button
        onClick={() => setTab("all")}
        className={`flex-1 py-2 rounded-l-md ${
          tab === "all" ? "bg-gray-700 font-bold" : "bg-gray-800 text-gray-400"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setTab("favorites")}
        className={`flex-1 py-2 rounded-r-md ${
          tab === "favorites"
            ? "bg-gray-700 font-bold"
            : "bg-gray-800 text-gray-400"
        }`}
      >
        ★ Favorites
      </button>
    </div>
  )
}
