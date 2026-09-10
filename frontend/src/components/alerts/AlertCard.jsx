export default function AlertCard({ alert }) {
  const colors = {
    GREEN: "border-green-500",
    YELLOW: "border-yellow-400",
    ORANGE: "border-orange-500",
    RED: "border-red-600",
  };
  return (
    <div className={`bg-[#1a1d24] rounded-xl p-4 border-l-4 ${colors[alert.level] || "border-gray-500"}`}>
      <h3 className="font-semibold">{alert.region}</h3>
      <p className="font-bold">{alert.level}</p>
      <p className="text-sm">Max UTCI: {alert.utci_max} °C</p>
      <p className="text-xs opacity-60">
        {new Date(alert.issued_at).toLocaleString()}
      </p>
    </div>
  );
}
