"""Download ERA5 single-level reanalysis from Copernicus CDS."""
from pathlib import Path
from src.utils.config import load_config
from src.utils.logger import get_logger

log = get_logger(__name__)


def download_era5(variables: list[str], years: list[int],
                  area: list[float], out_dir: Path) -> None:
    """
    area = [north, west, south, east]
    Requires ~/.cdsapirc with CDS API key.
    """
    import cdsapi
    out_dir.mkdir(parents=True, exist_ok=True)
    client = cdsapi.Client()

    for year in years:
        target = out_dir / f"era5_{year}.nc"
        if target.exists():
            log.info("skip %s", target)
            continue
        log.info("downloading ERA5 %s -> %s", year, target)
        client.retrieve(
            "reanalysis-era5-single-levels",
            {
                "product_type": "reanalysis",
                "variable": variables,
                "year": str(year),
                "month": [f"{m:02d}" for m in range(1, 13)],
                "day": [f"{d:02d}" for d in range(1, 32)],
                "time": [f"{h:02d}:00" for h in range(24)],
                "area": area,
                "format": "netcdf",
            },
            str(target),
        )


if __name__ == "__main__":
    cfg = load_config()
    download_era5(
        variables=["2m_temperature", "2m_dewpoint_temperature", "10m_wind_speed"],
        years=[2020, 2021, 2022, 2023],
        area=[37.5, 68.0, 6.5, 97.5],
        out_dir=Path(cfg["paths"]["raw_data"]) / "reanalysis",
    )
