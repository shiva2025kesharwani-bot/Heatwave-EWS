import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceLine,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const v = payload[0].value;
  let labelTxt = "No stress";
  let col = "#4caf50";
  if (v >= 46) { labelTxt = "Extreme";     col = "#e53935"; }
  else if (v >= 38) { labelTxt = "Very strong"; col = "#ff7b54"; }
  else if (v >= 32) { labelTxt = "Strong";      col = "#ffc107"; }
  else if (v >= 26) { labelTxt = "Moderate";    col = "#facc15"; }
  return (
    <div className="bg-[#1a1d24] border border-gray-700 rounded-lg p-2 text-xs">
      <div className="text-gray-400">{label}</div>
      <div className="font-bold" style={{ color: col }}>{v} °C</div>
      <div style={{ color: col }}>{labelTxt}</div>
    </div>
  );
};

export default function UTCIChart({ data = [], loading = false }) {
  if (loading) {
    return (
      <div className="h-[280px] flex items-center justify-center text-gray-400">
        Loading UTCI data...
      </div>
    );
  }
  if (!data.length) {
    return (
      <div className="h-[280px] flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2b2f3a" />
        <XAxis dataKey="time" stroke="#9ca3af" fontSize={11} />
        <YAxis stroke="#9ca3af" fontSize={11} domain={["auto", "auto"]} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={26} stroke="#facc15" strokeDasharray="4 4" />
        <ReferenceLine y={32} stroke="#ff7b54" strokeDasharray="4 4" />
        <ReferenceLine y={38} stroke="#e53935" strokeDasharray="4 4" />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#ff7b54"
          strokeWidth={2}
          dot={{ r: 3, fill: "#ff7b54" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
