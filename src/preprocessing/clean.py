"""Clean and standardize meteorological data."""
import numpy as np
import xarray as xr
from src.utils.logger import get_logger

log = get_logger(__name__)


def standardize(ds: xr.Dataset) -> xr.Dataset:
    rename = {"t2m": "t2m_k", "latitude": "lat", "longitude": "lon",
              "valid_time": "time", "expver": "expver"}
    ds = ds.rename({k: v for k, v in rename.items() if k in ds})
    for v in list(ds.data_vars):
        if v.endswith("_k"):
            ds[v.replace("_k", "_c")] = ds[v] - 273.15
    return ds


def clip_region(ds: xr.Dataset, bbox: list[float]) -> xr.Dataset:
    """bbox = [west, east, south, north]"""
    w, e, s, n = bbox
    return ds.sel(lon=slice(w, e), lat=slice(s, n))


def drop_outliers(da: xr.DataArray, z: float = 6.0) -> xr.DataArray:
    mean = da.mean()
    std = da.std()
    return da.where(np.abs(da - mean) < z * std)
