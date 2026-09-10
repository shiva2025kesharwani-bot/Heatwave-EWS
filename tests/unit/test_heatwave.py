"""Test heatwave detection."""
import numpy as np
import pandas as pd
import xarray as xr
from src.indices.heatwave.heatwave import detect_heatwave


def test_detect_heatwave_basic():
    times = pd.date_range("2020-01-01", periods=10, freq="D")
    data = np.array([30, 31, 32, 40, 41, 42, 30, 30, 30, 30], dtype=float)
    da = xr.DataArray(data, coords={"time": times}, dims="time")
    threshold = xr.DataArray(35.0)
    mask = detect_heatwave(da, threshold, min_days=3)
    assert int(mask.sum()) >= 1
