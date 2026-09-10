import { useState } from "react";
import HeatMap from "../components/maps/HeatMap";
import RegionSelector from "../components/maps/RegionSelector";

const centers = {
  india:   [22.5, 78.9],
  delhi:   [28.6, 77.2],
  mumbai:  [19.07, 72.87],
  chennai: [13.08, 80.27],
};

export default function MapPage() {
  const [region, setRegion] = useState("india");
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Heatwave Map</h2>
        <RegionSelector value={region} onChange={setRegion} />
      </div>
      <HeatMap center={centers[region]} zoom={region === "india" ? 5 : 8} />
    </div>
  );
}
