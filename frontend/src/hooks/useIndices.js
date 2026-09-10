import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function useIndices(lat, lon, date) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (lat == null) return;
    api.getUTCI(lat, lon, date).then(setData).catch(() => {});
  }, [lat, lon, date]);
  return data;
}
