export default function ScheduleHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-bold">ESPORTS</h2>
      <div className="flex items-center space-x-2">
        <button className="bg-blue-600 px-3 py-1 text-sm rounded-full">
          TODAY
        </button>
        <div className="flex items-center bg-gray-800 px-3 py-1 rounded-md cursor-pointer">
          <span className="text-sm">22/09</span>
        </div>
      </div>
    </div>
  )
}
