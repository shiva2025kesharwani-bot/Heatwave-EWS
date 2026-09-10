"""Heatwave detection (percentile + duration based)."""
import numpy as np
import xarray as xr


def percentile_threshold(tmax: xr.DataArray,
                         pct: float = 90,
                         baseline: slice | None = None) -> xr.DataArray:
    """
    Compute percentile threshold per grid cell.
    baseline: optional slice of time, e.g. slice("1981","2010")
    """
    if baseline is not None:
        tmax = tmax.sel(time=baseline)
    return tmax.quantile(pct / 100.0, dim="time")


def detect_heatwave(tmax: xr.DataArray,
                    threshold: xr.DataArray,
                    min_days: int = 3) -> xr.DataArray:
    """
    Boolean mask where tmax exceeds threshold for >= min_days consecutively.
    """
    excess = (tmax > threshold).astype(int)
    rolling = excess.rolling(time=min_days, min_periods=min_days).sum()
    return (rolling >= min_days).rename("heatwave")


def heatwave_frequency(heatwave: xr.DataArray,
                       freq: str = "1YE") -> xr.DataArray:
    return heatwave.resample(time=freq).sum().rename("heatwave_days")
