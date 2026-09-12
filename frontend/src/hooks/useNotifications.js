import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "heatwave_notify_enabled";

function categorize(v) {
  if (v == null) return { level: "UNKNOWN", rank: -1, emoji: "❔", color: "#888" };
  if (v >= 46) return { level: "EXTREME HEAT",     rank: 5, emoji: "🔥", color: "#e53935" };
  if (v >= 38) return { level: "VERY STRONG HEAT", rank: 4, emoji: "🔴", color: "#ff5722" };
  if (v >= 32) return { level: "STRONG HEAT",      rank: 3, emoji: "🟠", color: "#ff7b54" };
  if (v >= 26) return { level: "MODERATE HEAT",    rank: 2, emoji: "🟡", color: "#facc15" };
  if (v >= 9)  return { level: "COMFORTABLE",      rank: 1, emoji: "🟢", color: "#4caf50" };
  return { level: "COOL", rank: 0, emoji: "🔵", color: "#3b82f6" };
}

function buildMessage(rank, level, utci, cityName) {
  const city = cityName || "your location";
  if (rank >= 3) {
    return {
      title: "🔥 Heatwave Alert",
      body: level + " in " + city + ". Current UTCI: " + utci + "°C. Stay hydrated, avoid sun 12–4pm.",
      type: "warning",
    };
  }
  if (rank === 2) {
    return {
      title: "🟡 Heat Advisory",
      body: "Moderate heat stress in " + city + ". UTCI: " + utci + "°C. Take breaks in shade.",
      type: "advisory",
    };
  }
  return {
    title: "🟢 Weather is Good to Go",
    body: "Comfortable conditions in " + city + ". UTCI: " + utci + "°C. Enjoy your day!",
    type: "good",
  };
}

export default function useNotifications() {
  const [enabled, setEnabled] = useState(false);
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
      setEnabled(localStorage.getItem(STORAGE_KEY) === "true");
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) return false;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") {
      localStorage.setItem(STORAGE_KEY, "true");
      setEnabled(true);
      new Notification("✅ Heat Alerts Enabled", {
        body: "You will now receive heatwave warnings and daily all-clear updates.",
        icon: "/favicon.ico",
      });
      return true;
    }
    return false;
  }, []);

  const disable = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "false");
    setEnabled(false);
  }, []);

  const notify = useCallback((title, body, type) => {
    if (!enabled || permission !== "granted") return;
    try {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        tag: "heatwave-" + (type || "info"),
        requireInteraction: type === "warning",
      });
    } catch (e) { console.error("Notify failed:", e); }
  }, [enabled, permission]);

  const checkAndNotify = useCallback((utci, cityName) => {
    if (utci == null || !enabled || permission !== "granted") return null;
    const cat = categorize(utci);
    const msg = buildMessage(cat.rank, cat.level, utci, cityName);

    const key = "heatwave_last_notify_" + msg.type + "_" + (cityName || "loc");
    const last = localStorage.getItem(key);
    const now = Date.now();
    const cooldown = msg.type === "good" ? 6 * 60 * 60 * 1000 : 60 * 60 * 1000;
    if (last && now - parseInt(last) < cooldown) return null;

    localStorage.setItem(key, String(now));
    notify(msg.title, msg.body, msg.type);
    return msg;
  }, [enabled, permission, notify]);

  return { enabled, permission, requestPermission, disable, notify, checkAndNotify, categorize };
}
