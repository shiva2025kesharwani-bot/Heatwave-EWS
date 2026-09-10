"""Train forecast model entry point."""
from pathlib import Path
import pandas as pd
from src.models.forecasting.sk_forecast import train


def main(csv_path: str):
    df = pd.read_csv(csv_path, parse_dates=["time"])
    result = train(df)
    print("MAE:", result["mae"], "RMSE:", result["rmse"])


if __name__ == "__main__":
    main("data/processed/tmax_timeseries.csv")
