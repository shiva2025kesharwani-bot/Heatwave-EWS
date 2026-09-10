import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function HeatMap({ center = [22.5, 78.9], zoom = 5, points = [] }) {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: 420 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {points.map((p, i) => (
        <Circle key={i} center={[p.lat, p.lon]} radius={50000} color={p.color || "#ff7b54"} />
      ))}
    </MapContainer>
  );
}
