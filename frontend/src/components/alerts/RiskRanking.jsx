import { useEffect, useState } from "react";
import { api } from "../../services/api";

const CITIES = [
  { id: "delhi",     name: "Delhi",     lat: 28.6139, lon: 77.2090 },
  { id: "mumbai",    name: "Mumbai",    lat: 19.0760, lon: 72.8777 },
  { id: "chennai",   name: "Chennai",   lat: 13.0827, lon: 80.2707 },
  { id: "kolkata",   name: "Kolkata",   lat: 22.5726, lon: 88.3639 },
  { id: "bangalore", name: "Bangalore", lat: 12.9716, lon: 77.5946 },
  { id: "hyderabad", name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
];

function categorize(v) {
  if (v >= 46) return { label: "Extreme",     emoji: "🔴", color: "text-red-400",    bar: "bg-red-600"    };
  if (v >= 38) return { label: "Very Strong", emoji: "🟠", color: "text-orange-400", bar: "bg-orange-500" };
  if (v >= 32) return { label: "Strong",      emoji: "🟡", color: "text-amber-300",  bar: "bg-amber-500"  };
  if (v >= 26) return { label: "Moderate",    emoji: "🟨", color: "text-yellow-200", bar: "bg-yellow-500" };
  return { label: "No Stress", emoji: "🟢", color: "text-green-400", bar: "bg-green-500" };
}

export default function RiskRanking() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const results = await Promise.all(
          CITIES.map(async (c) => {
            const series = await api.getUTCI(c.lat, c.lon);
            const current = series.length ? series[series.length - 1].value : 0;
            const peak = series.length ? Math.max(...series.map((s) => s.value)) : 0;
            return { ...c, current, peak };
          })
        );
        if (!active) return;
        results.sort((a, b) => b.current - a.current);
        setRows(results);
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <div className="bg-[#1a1d24] rounded-xl p-6 text-center text-gray-400">
        Calculating risk across cities...
      </div>
    );
  }

  const max = Math.max(...rows.map((r) => r.current), 1);

  return (
    <div className="bg-[#1a1d24] rounded-xl p-5 animate-fade">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🔥 City Risk Ranking</h3>
        <span className="text-xs text-gray-500">Live UTCI</span>
      </div>

      {rows[0] && (
        <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-red-900/40 to-orange-900/30 border border-orange-700/40">
          <div className="text-xs text-orange-300 uppercase tracking-wide">
            Highest Risk Right Now
          </div>
          <div className="text-2xl font-bold mt-1">
            {rows[0].name}
            <span className="text-orange-400 ml-3">
              {rows[0].current} °C
            </span>
          </div>
          <div className="text-sm text-gray-300 mt-1">
            {categorize(rows[0].current).emoji}
            {" "}
            {categorize(rows[0].current).label} thermal stress
          </div>
        </div>
      )}

      <div className="space-y-3">
        {rows.map((r, i) => {
          const c = categorize(r.current);
          const pct = Math.round((r.current / max) * 100);
          return (
            <div key={r.id}>
              <div className="flex items-center justify-between text-sm mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 w-5 text-right">{i + 1}.</span>
                  <span className="font-medium">{r.name}</span>
                  <span className={"text-xs " + c.color}>{c.emoji} {c.label}</span>
                </div>
                <div className="font-mono text-sm">
                  <span className={c.color}>{r.current} °C</span>
                </div>
              </div>
              <div className="h-2 bg-[#0f1115] rounded-full overflow-hidden">
                <div
                  className={"h-full rounded-full transition-all duration-700 " + c.bar}
                  style={{ width: pct + "%" }}
                />
              </div>
              <div className="text-[10px] text-gray-500 mt-1 ml-7">
                Peak (14d): {r.peak} °C
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
