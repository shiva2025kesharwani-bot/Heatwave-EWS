"""Heatwave severity indices: HWMId, magnitude, duration."""
import numpy as np
import xarray as xr


def magnitude(tmax: xr.DataArray, threshold: xr.DataArray,
              heatwave_mask: xr.DataArray) -> xr.DataArray:
    """Sum of excess temperature on heatwave days."""
    excess = (tmax - threshold).where(heatwave_mask, 0.0)
    return excess.resample(time="1YE").sum().rename("hw_magnitude")


def duration_days(heatwave_mask: xr.DataArray) -> xr.DataArray:
    return heatwave_mask.resample(time="1YE").sum().rename("hw_days")


def hwmid(tmax: xr.DataArray,
          threshold_90: xr.DataArray,
          threshold_75: xr.DataArray,
          min_days: int = 3) -> xr.DataArray:
    """
    Heat Wave Magnitude Index daily (simplified).
    """
    excess = (tmax - threshold_75).clip(min=0)
    mask = (tmax > threshold_90).astype(int)
    rolling = mask.rolling(time=min_days, min_periods=min_days).sum()
    events = (rolling >= min_days)
    mag = excess.where(events).resample(time="1YE").sum()
    return mag.rename("hwmid")
