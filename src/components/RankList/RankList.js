const RankList = ({ data }) => (
  <ul className="space-y-2">
    {data.map((item, idx) => (
      <li key={idx} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-6 text-center font-bold text-yellow-400">
            {idx + 1}
          </span>
          <img src={item.teamLogo} alt="team" className="w-5 h-5" />
          <span>{item.player}</span>
        </div>
        <span className="font-bold">{item.value}</span>
      </li>
    ))}
  </ul>
)

export default RankList
