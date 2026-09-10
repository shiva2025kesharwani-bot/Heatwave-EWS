"""I/O helpers for NetCDF, Zarr, Parquet."""
from pathlib import Path
import xarray as xr
import pandas as pd


def save_netcdf(ds: xr.Dataset, path: str | Path) -> None:
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    ds.to_netcdf(path)


def load_netcdf(path: str | Path) -> xr.Dataset:
    return xr.open_dataset(path)


def save_parquet(df: pd.DataFrame, path: str | Path) -> None:
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    df.to_parquet(path, index=False)


def load_parquet(path: str | Path) -> pd.DataFrame:
    return pd.read_parquet(path)
