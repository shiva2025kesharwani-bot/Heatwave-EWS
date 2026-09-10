"""Gradient-boosted baseline Tmax forecast."""
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.model_selection import train_test_split


def build_features(df: pd.DataFrame, lags=(1, 2, 3, 5, 7)) -> pd.DataFrame:
    out = df.copy()
    for lag in lags:
        out[f"lag{lag}"] = out["tmax"].shift(lag)
    return out.dropna()


def train(df: pd.DataFrame) -> dict:
    feat = build_features(df)
    X = feat.drop(columns=["tmax"]).values
    y = feat["tmax"].values
    Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, shuffle=False)

    model = GradientBoostingRegressor(random_state=0)
    model.fit(Xtr, ytr)
    pred = model.predict(Xte)

    return {
        "model": model,
        "mae": float(mean_absolute_error(yte, pred)),
        "rmse": float(mean_squared_error(yte, pred) ** 0.5),
    }
