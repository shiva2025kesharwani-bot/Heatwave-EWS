"""Regrid datasets onto a common grid."""
import xarray as xr


def regrid_to(ds: xr.Dataset, target: xr.Dataset,
              method: str = "linear") -> xr.Dataset:
    """Interpolate ds onto target lat/lon."""
    return ds.interp(lat=target.lat, lon=target.lon, method=method)


def to_daily_max(ds: xr.Dataset, var: str = "t2m_c") -> xr.Dataset:
    return ds.resample(time="1D").max().rename({var: f"{var}_daily_max"})
