import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => { api.getAlerts().then(setAlerts).catch(() => {}); }, []);
  return alerts;
}
