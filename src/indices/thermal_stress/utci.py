"""
Universal Thermal Climate Index (UTCI) - simplified polynomial.

For full UTCI (Brode et al. 2012), replace with the 6th-order approximation.
"""
import numpy as np
import xarray as xr


def utci(t2m_c: xr.DataArray,
         wind_ms: xr.DataArray,
         rh_pct: xr.DataArray,
         mrt_c: xr.DataArray) -> xr.DataArray:
    """
    Simplified UTCI (Celsius).

    Inputs
    ------
    t2m_c  : 2 m air temperature (C)
    wind_ms: 10 m wind speed (m/s)
    rh_pct : relative humidity (%)
    mrt_c  : mean radiant temperature (C)
    """
    ta = t2m_c
    tr = mrt_c
    va = wind_ms
    pa = (rh_pct / 100.0) * 6.105 * np.exp(17.27 * ta / (237.7 + ta))  # hPa

    u = (ta
         + 0.607562052 * (tr - ta)
         - 0.100743845 * va
         + 0.003184223 * pa)
    return u.rename("utci")


def utci_category(u: xr.DataArray) -> xr.DataArray:
    """Return integer class 0..4 (no/slight..extreme stress)."""
    cat = xr.zeros_like(u, dtype=int)
    cat = xr.where(u > 26, 1, cat)   # moderate
    cat = xr.where(u > 32, 2, cat)   # strong
    cat = xr.where(u > 38, 3, cat)   # very strong
    cat = xr.where(u > 46, 4, cat)   # extreme
    return cat.rename("utci_class")
