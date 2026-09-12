import { useEffect, useState } from "react";
import { reverseGeocode } from "../../services/geocode";

const QUICK_CITIES = [
  { name: "Delhi", lat: 28.6139, lon: 77.2090 },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
  { name: "Pune", lat: 18.5204, lon: 73.8567 },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
];

export default function LocationBanner({ location, loading, error, source, accuracy, onRequest, notifications, onManual }) {
  const [place, setPlace] = useState(null);
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    if (!location) return;
    if (location.manualLabel) {
      setPlace({ name: location.manualLabel, region: "manual" });
    } else if (location.ipCity) {
      setPlace({ name: location.ipCity, region: location.ipRegion || "" });
    } else {
      reverseGeocode(location.lat, location.lon).then(setPlace);
    }
  }, [location]);

  const notifEnabled = notifications && notifications.enabled && notifications.permission === "granted";
  const accuracyText = accuracy == null ? "" :
    accuracy < 100 ? "±" + accuracy + "m (precise)" :
    accuracy < 5000 ? "±" + Math.round(accuracy / 1000) + "km" :
    "approximate";

  return (
    <div className="space-y-2">
      {loading && (
        <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-4 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
          <span className="text-sm text-blue-200">Locking GPS signal... (may take 5–10 sec)</span>
        </div>
      )}

      {!loading && location && (
        <div className="bg-gradient-to-r from-emerald-900/40 to-blue-900/40 border border-emerald-700/50 rounded-xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-2xl">📍</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white truncate">
                  {place ? place.name : "Your Location"}
                  {place && place.region && place.region !== "manual" && (
                    <span className="text-gray-400 font-normal">, {place.region}</span>
                  )}
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  {location.lat.toFixed(4)}°, {location.lon.toFixed(4)}°
                  <span className="ml-2 text-gray-500">
                    · {source === "gps" ? "GPS" : source === "manual" ? "Manual" : "IP"} {accuracyText}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={onRequest} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold">↻ GPS</button>
              <button onClick={() => setShowManual(!showManual)} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold">🏙 City</button>
              {!notifEnabled ? (
                <button onClick={() => notifications.requestPermission()} className="px-3 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-bold">🔔 Alerts</button>
              ) : (
                <button onClick={notifications.disable} className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold">🔔 ON</button>
              )}
            </div>
          </div>

          {showManual && (
            <div className="pt-3 border-t border-emerald-800/50">
              <div className="text-xs text-gray-400 mb-2">Pick your city manually:</div>
              <div className="flex flex-wrap gap-2">
                {QUICK_CITIES.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => { onManual(c.lat, c.lon, c.name); setShowManual(false); }}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-orange-500 hover:text-black text-white text-xs font-semibold transition"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && !location && (
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <div className="text-sm font-semibold text-yellow-200">Location access needed</div>
              <div className="text-xs text-yellow-300/70">{error || "Enable to see your exact heat stress"}</div>
            </div>
          </div>
          <button onClick={onRequest} className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm">
            Allow Location
          </button>
        </div>
      )}
    </div>
  );
}
