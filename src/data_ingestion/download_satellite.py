"""Placeholder for satellite (MODIS LST) ingestion."""
from pathlib import Path
from src.utils.logger import get_logger

log = get_logger(__name__)


def download_modis_lst(start_date: str, end_date: str, out_dir: Path) -> None:
    """
    Hook for MODIS / VIIRS LST. Use earthaccess or AppEEARS in production.
    """
    log.info("MODIS LST %s -> %s (stub)", start_date, end_date)
    out_dir.mkdir(parents=True, exist_ok=True)


if __name__ == "__main__":
    download_modis_lst("2024-05-01", "2024-05-31", Path("data/raw/satellite"))
