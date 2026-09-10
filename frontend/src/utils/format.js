export const fmtTemp = (v) => (v == null ? "–" : `${Number(v).toFixed(1)} °C`);
export const fmtDate = (d) => new Date(d).toLocaleString();
