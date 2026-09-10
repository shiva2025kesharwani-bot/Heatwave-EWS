"""Download IMD gridded max temperature (.bin)."""
from pathlib import Path
import requests
from src.utils.logger import get_logger

log = get_logger(__name__)
IMD_BASE = "https://www.imdpune.gov.in/cmpg/Griddata/Max_Temp"


def download_imd_tmax(year: int, out_dir: Path) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    url = f"{IMD_BASE}/Max_Temp_{year}.bin"
    target = out_dir / f"imd_tmax_{year}.bin"
    log.info("GET %s", url)
    with requests.get(url, stream=True, timeout=120) as r:
        r.raise_for_status()
        with open(target, "wb") as f:
            for chunk in r.iter_content(chunk_size=1 << 15):
                f.write(chunk)
    return target


if __name__ == "__main__":
    for y in range(2015, 2025):
        try:
            download_imd_tmax(y, Path("data/raw/meteorological"))
        except Exception as e:
            log.error("failed %s: %s", y, e)
