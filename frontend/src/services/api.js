import axios from "axios";

const client = axios.create({
  baseURL: "/api/v1",
  timeout: 15000,
});

export const api = {
  getAlerts: (region) =>
    client.get("/alerts", { params: { region } }).then((r) => r.data),

  postAlert: (payload) =>
    client.post("/alerts", payload).then((r) => r.data),

  getUTCI: (lat, lon, date) =>
    client.get("/indices/utci", { params: { lat, lon, date } }).then((r) => r.data),

  getHeatwave: (region = "india") =>
    client.get("/heatwave", { params: { region } }).then((r) => r.data),
};
