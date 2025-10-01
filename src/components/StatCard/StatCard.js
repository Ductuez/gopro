const StatCard = ({ title, children }) => (
  <div className="bg-[#181a20] rounded-xl p-5 text-white flex-1 min-w-[250px]">
    <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2 mb-4">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/3/3d/League_of_Legends_Champions_Korea_logo.png"
        alt="LCK"
        className="w-5"
      />
      {title}
    </h2>
    {children}
  </div>
)
export default StatCard
