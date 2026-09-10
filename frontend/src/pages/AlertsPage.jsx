import { useEffect, useState } from "react";
import AlertList from "../components/alerts/AlertList";
import { api } from "../services/api";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => { api.getAlerts().then(setAlerts).catch(() => {}); }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">All Alerts</h2>
      <AlertList alerts={alerts} />
    </div>
  );
}
