const NOMINATIM = "https://nominatim.openstreetmap.org/reverse";

const cache = new Map();

export async function reverseGeocode(lat, lon) {
  const key = lat.toFixed(3) + "," + lon.toFixed(3);
  if (cache.has(key)) return cache.get(key);

  const url = NOMINATIM + "?format=json&zoom=10&addressdetails=1&lat=" + lat + "&lon=" + lon;
  try {
    const res = await fetch(url, {
      headers: { "Accept-Language": "en" },
    });
    if (!res.ok) throw new Error("geocode failed");
    const data = await res.json();
    const a = data.address || {};
    const name =
      a.city ||
      a.town ||
      a.village ||
      a.county ||
      a.state_district ||
      a.state ||
      data.display_name ||
      "Your Location";
    const region = a.state || a.country || "";
    const result = { name, region, full: data.display_name || name };
    cache.set(key, result);
    return result;
  } catch (e) {
    return { name: "Your Location", region: "", full: "" };
  }
}
