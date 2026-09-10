import AlertCard from "./AlertCard";

export default function AlertList({ alerts = [] }) {
  if (!alerts.length) return <p className="opacity-60">No active alerts.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {alerts.map((a, i) => <AlertCard key={i} alert={a} />)}
    </div>
  );
}
