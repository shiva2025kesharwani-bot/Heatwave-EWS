import { useEffect, useState } from "react";
import AlertList from "../components/alerts/AlertList";
import UTCIChart from "../components/charts/UTCIChart";
import { api } from "../services/api";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    api.getAlerts().then(setAlerts).catch(() => {});
    api.getUTCI(28.6, 77.2, new Date().toISOString().slice(0, 10))
      .then((pts) => setSeries(pts.map((p) => ({
        time: new Date(p.time).toLocaleDateString(),
        value: p.value,
      }))))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-3">Active Alerts</h2>
        <AlertList alerts={alerts} />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-3">UTCI (Delhi)</h2>
        <UTCIChart data={series} />
      </section>
    </div>
  );
}
