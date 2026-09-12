import { Link, useLocation } from "react-router-dom";

const NAV = [
  { to: "/",        label: "Dashboard" },
  { to: "/map",     label: "Map" },
  { to: "/alerts",  label: "Alerts" },
  { to: "/about",   label: "About" },
];

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Link to="/" className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              🌡️ Heatwave Early Warning
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-0.5">
              Human Thermal Stress Dashboard
            </p>
          </Link>
          <nav className="flex justify-center sm:justify-end gap-1 sm:gap-2 text-sm">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    "px-3 py-1.5 rounded-lg transition font-medium " +
                    (active
                      ? "bg-white/20 text-white"
                      : "text-blue-100 hover:bg-white/10 hover:text-white")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
