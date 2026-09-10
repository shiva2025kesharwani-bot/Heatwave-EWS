"""QA/QC checks for gridded temperature."""
import numpy as np
import xarray as xr


def flag_physically_impossible(da: xr.DataArray,
                               low: float = -50,
                               high: float = 60) -> xr.DataArray:
    return (da < low) | (da > high)


def flag_flatlines(da: xr.DataArray, window: int = 6) -> xr.DataArray:
    """Flag where value is constant over N time steps."""
    rolled = da.rolling(time=window, min_periods=window).std()
    return rolled == 0


def quality_report(da: xr.DataArray) -> dict:
    total = int(da.size)
    nan = int(np.isnan(da).sum())
    return {
        "total": total,
        "nan": nan,
        "nan_pct": 100.0 * nan / max(total, 1),
        "min": float(np.nanmin(da)),
        "max": float(np.nanmax(da)),
        "mean": float(np.nanmean(da)),
    }
