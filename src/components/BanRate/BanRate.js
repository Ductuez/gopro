const BanRate = ({ redSide, blueSide }) => (
  <div className="flex flex-col gap-4">
    <div>
      <h3 className="text-red-400 font-semibold mb-2">RED SIDE</h3>
      <div className="flex gap-4 flex-wrap">
        {redSide.map((champ, idx) => (
          <div key={idx} className="text-center">
            <img
              src={champ.img}
              alt={champ.name}
              className="w-12 h-12 rounded mx-auto"
            />
            <p className="text-sm mt-1">{champ.rate}%</p>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-blue-400 font-semibold mb-2">BLUE SIDE</h3>
      <div className="flex gap-4 flex-wrap">
        {blueSide.map((champ, idx) => (
          <div key={idx} className="text-center">
            <img
              src={champ.img}
              alt={champ.name}
              className="w-12 h-12 rounded mx-auto"
            />
            <p className="text-sm mt-1">{champ.rate}%</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)
export default BanRate
