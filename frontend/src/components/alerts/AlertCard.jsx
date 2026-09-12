const COLORS = {
  GREEN:  { border: "border-green-500",  bg: "bg-green-500/10",  text: "text-green-400",  emoji: "🟢" },
  YELLOW: { border: "border-yellow-400", bg: "bg-yellow-400/10", text: "text-yellow-300", emoji: "🟡" },
  ORANGE: { border: "border-orange-500", bg: "bg-orange-500/10", text: "text-orange-400", emoji: "🟠" },
  RED:    { border: "border-red-600",    bg: "bg-red-600/10",    text: "text-red-400",    emoji: "🔴" },
};

export default function AlertCard({ alert }) {
  const c = COLORS[alert.level] || COLORS.YELLOW;
  return (
    <div
      className={
        "animate-fade bg-[#1a1d24] rounded-xl p-4 sm:p-5 border-l-4 " +
        c.border +
        " hover:scale-[1.02] hover:shadow-xl transition-all duration-200 cursor-pointer"
      }
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg text-white">{alert.region}</h3>
          <span className={"text-sm font-bold " + c.text}>
            {c.emoji} {alert.level}
          </span>
        </div>
        <span className={"text-3xl font-bold " + c.text}>
          {alert.utci_max}°
        </span>
      </div>
      <div className="mt-3 text-xs text-gray-400">
        Max UTCI · {new Date(alert.issued_at).toLocaleString()}
      </div>
    </div>
  );
}
