"""Wet Bulb Globe Temperature (WBGT) - simplified outdoor."""
import numpy as np
import xarray as xr


def wet_bulb_stull(t2m_c: xr.DataArray, rh_pct: xr.DataArray) -> xr.DataArray:
    """Stull (2011) wet bulb temperature approximation."""
    tw = (t2m_c * np.arctan(0.151977 * np.sqrt(rh_pct + 8.313659))
          + np.arctan(t2m_c + rh_pct)
          - np.arctan(rh_pct - 1.676331)
          + 0.00391838 * (rh_pct ** 1.5) * np.arctan(0.023101 * rh_pct)
          - 4.686035)
    return tw.rename("tw")


def wbgt_outdoor(t2m_c: xr.DataArray,
                 rh_pct: xr.DataArray,
                 solar_wm2: xr.DataArray | None = None) -> xr.DataArray:
    """
    Simplified outdoor WBGT (shade). If solar is given, apply a correction.
    """
    tw = wet_bulb_stull(t2m_c, rh_pct)
    wbgt = 0.7 * tw + 0.3 * t2m_c
    if solar_wm2 is not None:
        wbgt = wbgt + 0.02 * solar_wm2  # crude solar adjustment
    return wbgt.rename("wbgt")
