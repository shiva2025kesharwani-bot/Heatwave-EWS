"""CLI to download all raw data."""
from pathlib import Path
from src.data_ingestion.download_imd import download_imd_tmax


def main():
    out = Path("data/raw/meteorological")
    for y in range(2015, 2025):
        try:
            download_imd_tmax(y, out)
            print("ok", y)
        except Exception as e:
            print("fail", y, e)


if __name__ == "__main__":
    main()
