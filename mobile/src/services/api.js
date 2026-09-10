import axios from "axios";

const BASE = "http://10.0.2.2:8000/api/v1";

export const api = {
  getAlerts: () => axios.get(`${BASE}/alerts`).then((r) => r.data),
};
