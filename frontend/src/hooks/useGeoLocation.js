import { useEffect, useState, useCallback } from "react";

const CACHE_KEY = "heatwave_user_location";
const CACHE_TTL = 10 * 60 * 1000;

async function getLocationFromIP() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return null;
    const data = await res.json();
    if (data.latitude && data.longitude) {
      return {
        lat: data.latitude,
        lon: data.longitude,
        accuracy: 50000,
        source: "ip",
        ipCity: data.city || "",
        ipRegion: data.region || "",
        timestamp: Date.now(),
      };
    }
  } catch (e) { console.warn("IP geo failed", e); }
  return null;
}

function getGPSPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("No geolocation API"));
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    });
  });
}

export default function useGeoLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  const request = useCallback(async () => {
    setLoading(true);
    setError(null);

    let lastErr = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const pos = await getGPSPosition();
        const acc = Math.round(pos.coords.accuracy);
        const loc = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: acc,
          source: "gps",
          timestamp: Date.now(),
        };
        setLocation(loc);
        setSource("gps");
        setAccuracy(acc);
        setLoading(false);
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(loc)); } catch (e) {}
        return;
      } catch (err) {
        lastErr = err;
        console.warn("GPS attempt " + attempt + " failed:", err.message);
        if (err.code === 1) break;
        await new Promise((r) => setTimeout(r, 1500));
      }
    }

    const fallback = await getLocationFromIP();
    if (fallback) {
      setLocation(fallback);
      setSource("ip");
      setAccuracy(50000);
      setError("GPS blocked. Using approximate location (~50 km).");
    } else {
      setError(lastErr ? lastErr.message : "Could not get location");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          setLocation(parsed);
          setSource(parsed.source || "gps");
          setAccuracy(parsed.accuracy || null);
          return;
        }
      }
    } catch (e) {}
    request();
  }, [request]);

  const setManual = useCallback((lat, lon, label) => {
    const loc = { lat, lon, accuracy: 10, source: "manual", manualLabel: label, timestamp: Date.now() };
    setLocation(loc);
    setSource("manual");
    setAccuracy(10);
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(loc)); } catch (e) {}
  }, []);

  return { location, loading, error, request, source, accuracy, setManual };
}
