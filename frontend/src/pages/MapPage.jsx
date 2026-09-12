import { useEffect, useState } from "react";
import HeatMap from "../components/maps/HeatMap";
import { api } from "../services/api";

const CITIES = [
  { id: "india",     name: "All India", lat: 22.5,   lon: 78.9 },
  { id: "delhi",     name: "Delhi",     lat: 28.6139, lon: 77.2090 },
  { id: "mumbai",    name: "Mumbai",    lat: 19.0760, lon: 72.8777 },
  { id: "chennai",   name: "Chennai",   lat: 13.0827, lon: 80.2707 },
  { id: "kolkata",   name: "Kolkata",   lat: 22.5726, lon: 88.3639 },
  { id: "bangalore", name: "Bangalore", lat: 12.9716, lon: 77.5946 },
  { id: "hyderabad", name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
];

export default function MapPage() {
  const [city, setCity] = useState(CITIES[0]);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geoMsg, setGeoMsg] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .getAlerts()
      .then((alerts) => {
        if (!active) return;
        const enriched = alerts.map((a) => {
          const c = CITIES.find(
            (x) => x.name.toLowerCase() === a.region.toLowerCase()
          );
          return {
            name: a.region,
            level: a.level,
            utci: a.utci_max,
            lat: c ? c.lat : 22.5 + Math.random() * 5,
            lon: c ? c.lon : 78.9 + Math.random() * 5,
          };
        });
        setMarkers(enriched);
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoMsg("Geolocation not supported");
      return;
    }
    setGeoMsg("Locating...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCity({
          id: "me",
          name: "My Location",
          lat: latitude,
          lon: longitude,
        });
        setGeoMsg("Found you! Lat " + latitude.toFixed(2) + ", Lon " + longitude.toFixed(2));
      },
      (err) => setGeoMsg("Permission denied: " + err.message),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold">Heatwave Map</h2>
        <div className="flex flex-wrap gap-2">
          <select
            value={city.id}
            onChange={(e) =>
              setCity(CITIES.find((c) => c.id === e.target.value))
            }
            className="bg-[#1a1d24] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
          >
            {CITIES.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={useMyLocation}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
          >
            📍 Use my location
          </button>
        </div>
      </div>

      {geoMsg && (
        <div className="text-xs text-blue-300 bg-blue-900/20 border border-blue-800 rounded-lg px-3 py-2">
          {geoMsg}
        </div>
      )}

      <div className="rounded-xl overflow-hidden border border-gray-800" style={{ height: "70vh" }}>
        <HeatMap
          center={[city.lat, city.lon]}
          zoom={city.id === "india" ? 5 : 10}
          markers={markers}
        />
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          Green
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
          Yellow
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span>
          Orange
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-600 inline-block"></span>
          Red
        </span>
      </div>

      {loading && <div className="text-sm text-gray-500">Loading markers...</div>}
    </div>
  );
}
