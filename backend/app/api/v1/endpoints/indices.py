"""Indices endpoints with sample UTCI/WBGT data and city list."""
import math, random
from datetime import datetime, timedelta
from fastapi import APIRouter, Query

router = APIRouter()

CITIES = [
    {"id": "delhi",     "name": "Delhi",     "lat": 28.6139, "lon": 77.2090},
    {"id": "mumbai",    "name": "Mumbai",    "lat": 19.0760, "lon": 72.8777},
    {"id": "chennai",   "name": "Chennai",   "lat": 13.0827, "lon": 80.2707},
    {"id": "kolkata",   "name": "Kolkata",   "lat": 22.5726, "lon": 88.3639},
    {"id": "bangalore", "name": "Bangalore", "lat": 12.9716, "lon": 77.5946},
    {"id": "hyderabad", "name": "Hyderabad", "lat": 17.3850, "lon": 78.4867},
    {"id": "pune",      "name": "Pune",      "lat": 18.5204, "lon": 73.8567},
    {"id": "ahmedabad", "name": "Ahmedabad", "lat": 23.0225, "lon": 72.5714},
    {"id": "jaipur",    "name": "Jaipur",    "lat": 26.9124, "lon": 75.7873},
    {"id": "lucknow",   "name": "Lucknow",   "lat": 26.8467, "lon": 80.9462},
]


def _utci_series(lat: float, lon: float, days: int = 14):
    random.seed(int(abs(lat * 1000 + lon * 1000)))
    base = 30.0 + (25 - abs(lat - 20)) * 0.4
    today = datetime.utcnow().date()
    out = []
    for i in range(days):
        d = today - timedelta(days=days - 1 - i)
        val = base + 4 * math.sin(i / 2.0) + random.uniform(-1.5, 1.5)
        out.append({
            "lat": lat,
            "lon": lon,
            "time": datetime.combine(d, datetime.min.time()).isoformat(),
            "value": round(val, 1),
            "index": "UTCI",
        })
    return out


@router.get("/cities")
def list_cities():
    return CITIES


@router.get("/utci")
def get_utci(lat: float = Query(...), lon: float = Query(...), days: int = 14):
    return _utci_series(lat, lon, days)


@router.get("/wbgt")
def get_wbgt(lat: float = Query(...), lon: float = Query(...)):
    series = _utci_series(lat, lon, 14)
    for row in series:
        row["index"] = "WBGT"
        row["value"] = round(row["value"] - 2.5, 1)
    return series
