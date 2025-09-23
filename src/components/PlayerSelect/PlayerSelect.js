"use client"
import Select from "react-select"

// Custom option hiển thị icon + text
const Option = (props) => (
  <div
    {...props.innerProps}
    className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${
      props.isFocused ? "bg-gray-700 text-white" : "bg-black text-gray-200"
    }`}
  >
    <img src={props.data.icon} alt="" className="w-6 h-6 rounded" />
    <span>{props.data.label}</span>
  </div>
)

// Custom hiển thị khi chọn
const SingleValue = ({ data }) => (
  <div className="flex items-center gap-2">
    <img src={data.icon} alt="" className="w-6 h-6 rounded" />
    <span className="text-white">{data.label}</span>
  </div>
)

export default function PlayerSelect({ players }) {
  const mapPlayers = players.data.map((player) => ({
    value: player.id,
    label: player.name,
    icon: player.image_url,
  }))

  return (
    <div className="w-64">
      <label className="block mb-2 text-sm text-gray-400 uppercase">
        Compare Stats
      </label>
      <Select
        options={mapPlayers}
        components={{ Option, SingleValue, IndicatorSeparator: () => null }}
        placeholder="Select or search player"
        className="text-sm"
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "44px",
            backgroundColor: "#000",
            border: "1px solid #333",
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "0 8px",
          }),
          input: (base) => ({
            ...base,
            margin: 0, // xoá margin dư
            padding: 0, // xoá padding dư
          }),
          indicatorsContainer: (base) => ({
            ...base,
            padding: "0 4px",
          }),
        }}
      />
    </div>
  )
}
