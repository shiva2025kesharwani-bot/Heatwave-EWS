import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LEVEL_COLOR = {
  GREEN: "#4caf50",
  YELLOW: "#facc15",
  ORANGE: "#ff7b54",
  RED: "#e53935",
};

function Recenter({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function HeatMap({ center = [22.5, 78.9], zoom = 5, markers = [] }) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter center={center} zoom={zoom} />
      {markers.map((m, i) => {
        const color = LEVEL_COLOR[m.level] || "#888";
        return (
          <div key={i}>
            <Circle
              center={[m.lat, m.lon]}
              radius={Math.max(m.utci * 1200, 40000)}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.35 }}
            />
            <Marker position={[m.lat, m.lon]}>
              <Popup>
                <div style={{ minWidth: 140 }}>
                  <strong>{m.name}</strong>
                  <div>Level: <b style={{ color }}>{m.level}</b></div>
                  <div>UTCI: <b>{m.utci} °C</b></div>
                </div>
              </Popup>
            </Marker>
          </div>
        );
      })}
    </MapContainer>
  );
}
