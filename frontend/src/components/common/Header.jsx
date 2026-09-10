export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-900 to-blue-700 p-6 text-center">
      <h1 className="text-2xl font-bold">🌡️ Heatwave Early Warning</h1>
      <p className="opacity-80 text-sm">Human Thermal Stress Dashboard</p>
      <nav className="mt-3 flex justify-center gap-4 text-sm">
        <a href="/" className="hover:underline">Dashboard</a>
        <a href="/map" className="hover:underline">Map</a>
        <a href="/alerts" className="hover:underline">Alerts</a>
        <a href="/about" className="hover:underline">About</a>
      </nav>
    </header>
  );
}
