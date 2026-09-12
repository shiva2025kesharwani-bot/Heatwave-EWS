const LEVELS = [
  {
    range: "< 9 °C",
    label: "Cold Stress",
    desc: "Slight to strong cold discomfort",
    color: "bg-blue-600",
    text: "text-blue-300",
    emoji: "🥶",
    band: "border-blue-600",
  },
  {
    range: "9 – 26 °C",
    label: "No Stress",
    desc: "Comfortable / decent conditions",
    color: "bg-green-600",
    text: "text-green-300",
    emoji: "🟢",
    band: "border-green-600",
  },
  {
    range: "26 – 32 °C",
    label: "Moderate Stress",
    desc: "Warm, mild discomfort",
    color: "bg-yellow-500",
    text: "text-yellow-200",
    emoji: "🟡",
    band: "border-yellow-500",
  },
  {
    range: "32 – 38 °C",
    label: "Strong Stress",
    desc: "Hot, significant discomfort",
    color: "bg-amber-500",
    text: "text-amber-200",
    emoji: "🟠",
    band: "border-amber-500",
  },
  {
    range: "38 – 46 °C",
    label: "Very Strong Stress",
    desc: "Very hot, health risk",
    color: "bg-orange-600",
    text: "text-orange-300",
    emoji: "🔴",
    band: "border-orange-600",
  },
  {
    range: "> 46 °C",
    label: "Extreme Stress",
    desc: "Dangerous heat, emergency",
    color: "bg-red-700",
    text: "text-red-300",
    emoji: "🔥",
    band: "border-red-700",
  },
];

function activeLevel(utci) {
  if (utci == null) return -1;
  if (utci < 9) return 0;
  if (utci < 26) return 1;
  if (utci < 32) return 2;
  if (utci < 38) return 3;
  if (utci < 46) return 4;
  return 5;
}

export default function ThermalStressScale({ current = null }) {
  const active = activeLevel(current);

  return (
    <div className="bg-[#1a1d24] rounded-xl p-5 animate-fade">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🎨 Thermal Stress Scale</h3>
        {current != null && (
          <span className="text-xs text-gray-500">
            Your value: <span className="font-bold text-white">{current} °C</span>
          </span>
        )}
      </div>

      <p className="text-xs text-gray-400 mb-4">
        UTCI (Universal Thermal Climate Index) — higher values mean more dangerous heat.
      </p>

      <div className="space-y-2">
        {LEVELS.map((lvl, i) => {
          const isActive = i === active;
          return (
            <div
              key={i}
              className={
                "flex items-center gap-3 p-2.5 rounded-lg border-l-4 transition-all " +
                lvl.band +
                (isActive
                  ? " bg-white/10 scale-[1.02] ring-2 ring-white/30"
                  : " bg-[#0f1115] hover:bg-white/5")
              }
            >
              <span className="text-2xl">{lvl.emoji}</span>
              <div className={"w-4 h-4 rounded-full " + lvl.color}></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-gray-400">
                    {lvl.range}
                  </span>
                  <span className={"text-sm font-semibold " + lvl.text}>
                    {lvl.label}
                  </span>
                  {isActive && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">
                      YOU
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 truncate">
                  {lvl.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-800">
        <div className="flex justify-between text-[10px] text-gray-500 mb-2">
          <span>Decent ✅</span>
          <span>Extreme 🔥</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden flex">
          <div className="flex-1 bg-blue-600"></div>
          <div className="flex-1 bg-green-600"></div>
          <div className="flex-1 bg-yellow-500"></div>
          <div className="flex-1 bg-amber-500"></div>
          <div className="flex-1 bg-orange-600"></div>
          <div className="flex-1 bg-red-700"></div>
        </div>
      </div>
    </div>
  );
}
