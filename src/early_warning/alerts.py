"""Alert levels derived from thermal stress index."""
from enum import IntEnum
import xarray as xr


class AlertLevel(IntEnum):
    GREEN = 0
    YELLOW = 1
    ORANGE = 2
    RED = 3


DEFAULT_THRESHOLDS = {
    "yellow": 26.0,
    "orange": 32.0,
    "red":   38.0,
}


def classify(utci: xr.DataArray, thresholds: dict | None = None) -> xr.DataArray:
    t = thresholds or DEFAULT_THRESHOLDS
    level = xr.zeros_like(utci, dtype=int)
    level = xr.where(utci > t["yellow"], int(AlertLevel.YELLOW), level)
    level = xr.where(utci > t["orange"], int(AlertLevel.ORANGE), level)
    level = xr.where(utci > t["red"],    int(AlertLevel.RED),    level)
    return level.rename("alert_level")


def alert_name(level: int) -> str:
    return {
        0: "GREEN", 1: "YELLOW", 2: "ORANGE", 3: "RED"
    }.get(int(level), "UNKNOWN")
