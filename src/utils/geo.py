"""Geospatial helpers."""
from math import asin, cos, radians, sin, sqrt
import numpy as np


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    return 2 * R * asin(sqrt(a))


def bbox_mask(lat, lon, bbox):
    """bbox = [west, east, south, north]"""
    w, e, s, n = bbox
    return (lon >= w) & (lon <= e) & (lat >= s) & (lat <= n)


def find_nearest_index(arr: np.ndarray, value: float) -> int:
    return int(np.abs(arr - value).argmin())
