"""Spatial features: neighborhood means, gradients."""
import numpy as np
import xarray as xr


def spatial_mean(da: xr.DataArray, window: int = 3) -> xr.DataArray:
    return da.rolling(lat=window, lon=window, center=True,
                      min_periods=1).mean()


def gradient(da: xr.DataArray) -> tuple[xr.DataArray, xr.DataArray]:
    dlat = da.differentiate("lat")
    dlon = da.differentiate("lon")
    return dlat, dlon


def elevation_adjust(t2m_c: xr.DataArray, elev_m: xr.DataArray,
                     lapse_rate: float = -0.0065) -> xr.DataArray:
    """Apply lapse-rate correction to sea level."""
    return t2m_c + lapse_rate * elev_m
