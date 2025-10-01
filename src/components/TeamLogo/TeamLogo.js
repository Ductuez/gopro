function TeamLogo({ team }) {
  if (team.logoSrc) {
    return (
      <div className="size-12 sm:size-14 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center overflow-hidden">
        <img
          src={team.logoSrc}
          alt={`${team.code} logo`}
          className="h-10 w-10 object-contain"
        />
      </div>
    )
  }
  return (
    <div className="size-12 sm:size-14 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
      <span className="text-lg sm:text-xl font-extrabold text-white/80">
        {team.code.slice(0, 2)}
      </span>
    </div>
  )
}

export default TeamLogo
