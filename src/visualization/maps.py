"""Interactive / geographic map helpers."""
from pathlib import Path


def make_leaflet_html(center=(22.5, 78.9), zoom=5, out="map.html") -> str:
    html = f"""<!DOCTYPE html>
<html><head>
<meta charset='utf-8'/>
<title>Heatwave Map</title>
<link rel='stylesheet' href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'/>
<style>html,body,#map{{height:100%;margin:0}}</style>
</head><body>
<div id='map'></div>
<script src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'></script>
<script>
const map = L.map('map').setView([{center[0]}, {center[1]}], {zoom});
L.tileLayer('https://{{s}}.tile.openstreetmap.org/{{z}}/{{x}}/{{y}}.png').addTo(map);
L.circle([28.6, 77.2], {{radius: 50000, color: 'red'}}).addTo(map).bindPopup('Delhi');
</script>
</body></html>"""
    Path(out).write_text(html, encoding="utf-8")
    return out
