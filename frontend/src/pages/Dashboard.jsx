import { useEffect, useState, useCallback } from "react";
import AlertList from "../components/alerts/AlertList";
import RiskRanking from "../components/alerts/RiskRanking";
import ThermalStressScale from "../components/alerts/ThermalStressScale";
import LocationBanner from "../components/common/LocationBanner";
import AlertToast from "../components/common/AlertToast";
import UTCIChart from "../components/charts/UTCIChart";
import { api } from "../services/api";
import useGeoLocation from "../hooks/useGeoLocation";
import useNotifications from "../hooks/useNotifications";
import { reverseGeocode } from "../services/geocode";

const FALLBACK = { lat: 28.6139, lon: 77.2090, name: "Delhi" };

function categorize(v) {
  if (v == null) return { label: "N/A", color: "text-gray-400", bg: "bg-gray-700" };
  if (v >= 46) return { label: "Extreme",     color: "text-red-300",    bg: "bg-red-700"    };
  if (v >= 38) return { label: "Very Strong", color: "text-orange-200", bg: "bg-orange-600" };
  if (v >= 32) return { label: "Strong",      color: "text-amber-100",  bg: "bg-amber-500"  };
  if (v >= 26) return { label: "Moderate",    color: "text-yellow-100", bg: "bg-yellow-500" };
  return { label: "No Stress", color: "text-green-100", bg: "bg-green-600" };
}

export default function Dashboard() {
  const geo = useGeoLocation();
  const notif = useNotifications();
  const [placeName, setPlaceName] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [toast, setToast] = useState(null);

  const coords = geo.location ? { lat: geo.location.lat, lon: geo.location.lon } : FALLBACK;

  useEffect(() => {
    if (!geo.location) { setPlaceName(null); return; }
    if (geo.location.manualLabel) { setPlaceName(geo.location.manualLabel); return; }
    if (geo.location.ipCity) { setPlaceName(geo.location.ipCity); return; }
    reverseGeocode(geo.location.lat, geo.location.lon).then((p) =>
      setPlaceName(p.name + (p.region ? ", " + p.region : ""))
    );
  }, [geo.location]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [a, u] = await Promise.all([
        api.getAlerts(),
        api.getUTCI(coords.lat, coords.lon),
      ]);
      setAlerts(a);
      setSeries(u.map((p) => ({
        time: new Date(p.time).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        value: p.value,
      })));
      setLastUpdate(new Date());

      const latest = u.length ? u[u.length - 1].value : null;
      const name = placeName || "your location";
      const result = notif.checkAndNotify(latest, name);
      if (result) setToast(result);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [coords.lat, coords.lon, placeName, notif]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const id = setInterval(load, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, [load]);

  const current = series.length ? series[series.length - 1].value : null;
  const cat = categorize(current);
  const usingReal = !!geo.location;
  const displayName = placeName || (usingReal ? "Your Location" : "Delhi (default)");

  return (
    <div className="space-y-6">
      <AlertToast toast={toast} onClose={() => setToast(null)} />

      <LocationBanner
        location={geo.location}
        loading={geo.loading}
        error={geo.error}
        source={geo.source}
        accuracy={geo.accuracy}
        onRequest={geo.request}
        onManual={geo.setManual}
        notifications={notif}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold">Live Dashboard</h2>
          <p className="text-sm text-gray-400">
            {usingReal ? "📍 Based on your location" : "📍 Showing default location"}
            {lastUpdate && " · Updated " + lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <button onClick={load} className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm">
          ↻ Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={"rounded-xl p-5 " + cat.bg + " text-white"}>
          <div className="text-xs uppercase tracking-wide opacity-80">UTCI · {displayName}</div>
          <div className="text-5xl font-bold mt-1">
            {current != null ? current : "--"}<span className="text-2xl opacity-70"> °C</span>
          </div>
          <div className="mt-2 text-sm font-semibold">{cat.label}</div>
        </div>
        <div className="bg-[#1a1d24] rounded-xl p-5">
          <div className="text-xs uppercase tracking-wide text-gray-400">Active Alerts</div>
          <div className="text-4xl font-bold text-orange-400 mt-1">{alerts.length}</div>
          <div className="text-xs text-gray-500 mt-2">
            {alerts.filter((a) => a.level === "RED").length} red · {alerts.filter((a) => a.level === "ORANGE").length} orange
          </div>
        </div>
        <div className="bg-[#1a1d24] rounded-xl p-5">
          <div className="text-xs uppercase tracking-wide text-gray-400">Peak UTCI (14d)</div>
          <div className="text-4xl font-bold text-red-400 mt-1">
            {series.length ? Math.max(...series.map((s) => s.value)) : "--"} °C
          </div>
          <div className="text-xs text-gray-500 mt-2">Over past 14 days</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h3 className="text-lg font-semibold mb-3">Active Alerts</h3>
          <AlertList alerts={alerts} />
        </section>
        <section><RiskRanking /></section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h3 className="text-lg font-semibold mb-3">UTCI Trend · {displayName}</h3>
          <div className="bg-[#1a1d24] rounded-xl p-4">
            <UTCIChart data={series} loading={loading} />
          </div>
        </section>
        <section><ThermalStressScale current={current} /></section>
      </div>
    </div>
  );
}
