"""NOAA Heat Index (Rothfusz regression)."""
import numpy as np
import xarray as xr


def heat_index(t2m_f: xr.DataArray, rh_pct: xr.DataArray) -> xr.DataArray:
    T = t2m_f
    R = rh_pct
    HI = (-42.379
          + 2.04901523 * T
          + 10.14333127 * R
          - 0.22475541 * T * R
          - 0.00683783 * T * T
          - 0.05481717 * R * R
          + 0.00122874 * T * T * R
          + 0.00085282 * T * R * R
          - 0.00000199 * T * T * R * R)
    return HI.rename("heat_index_f")
