import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import MapPage from "../pages/MapPage";
import AlertsPage from "../pages/AlertsPage";
import About from "../pages/About";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/alerts" element={<AlertsPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
