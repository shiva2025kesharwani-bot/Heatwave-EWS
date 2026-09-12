import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://heatwave-ews.onrender.com/api/v1";

const client = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

export const api = {
  getAlerts: (region) =>
    client.get("/alerts", { params: { region } }).then((r) => r.data),
  postAlert: (payload) =>
    client.post("/alerts", payload).then((r) => r.data),
  getCities: () =>
    client.get("/indices/cities").then((r) => r.data),
  getUTCI: (lat, lon) =>
    client.get("/indices/utci", { params: { lat, lon } }).then((r) => r.data),
  getWBGT: (lat, lon) =>
    client.get("/indices/wbgt", { params: { lat, lon } }).then((r) => r.data),
  getHeatwave: (region = "india") =>
    client.get("/heatwave", { params: { region } }).then((r) => r.data),
};
