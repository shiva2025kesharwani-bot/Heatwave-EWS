"""ML inference wrapper."""
from pathlib import Path


def load_model(path: str | Path):
    import joblib
    return joblib.load(path)


def predict(model, features) -> list[float]:
    return list(model.predict(features))
