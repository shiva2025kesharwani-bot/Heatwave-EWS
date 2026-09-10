"""Temporal features."""
import pandas as pd
import xarray as xr


def add_time_features(df: pd.DataFrame, time_col: str = "time") -> pd.DataFrame:
    df = df.copy()
    df[time_col] = pd.to_datetime(df[time_col])
    df["doy"] = df[time_col].dt.dayofyear
    df["month"] = df[time_col].dt.month
    df["year"] = df[time_col].dt.year
    df["is_summer"] = df["month"].isin([4, 5, 6]).astype(int)
    return df


def lag_features(df: pd.DataFrame, col: str, lags=(1, 2, 3, 5, 7)) -> pd.DataFrame:
    out = df.copy()
    for lag in lags:
        out[f"{col}_lag{lag}"] = out[col].shift(lag)
    return out


def rolling_features(df: pd.DataFrame, col: str,
                     windows=(3, 7, 14)) -> pd.DataFrame:
    out = df.copy()
    for w in windows:
        out[f"{col}_roll{w}_mean"] = out[col].rolling(w).mean()
        out[f"{col}_roll{w}_max"] = out[col].rolling(w).max()
    return out
