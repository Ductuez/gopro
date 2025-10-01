import TeamLogo from "@/components/TeamLogo/TeamLogo"

function TeamBlock({ team, align }) {
  return (
    <div
      className={
        "flex items-center gap-3 sm:gap-4 " +
        (align === "right" ? "justify-end" : "justify-start")
      }
    >
      {align === "left" && <TeamLogo team={team} />}

      <div className={align === "right" ? "text-right" : "text-left"}>
        <div className="text-sm sm:text-base font-semibold text-white/90 leading-tight">
          {team.code}
        </div>
        {team.name && (
          <div className="text-[10px] sm:text-xs text-white/50 leading-tight mt-0.5">
            {team.name}
          </div>
        )}
      </div>

      {align === "right" && <TeamLogo team={team} />}
    </div>
  )
}

export default TeamBlock
