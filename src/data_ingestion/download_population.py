"""Population raster ingestion (WorldPop / GPW)."""
from pathlib import Path
import requests
from src.utils.logger import get_logger

log = get_logger(__name__)


def download_worldpop(url: str, out_dir: Path) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    target = out_dir / Path(url).name
    log.info("GET %s", url)
    with requests.get(url, stream=True, timeout=300) as r:
        r.raise_for_status()
        with open(target, "wb") as f:
            for chunk in r.iter_content(chunk_size=1 << 20):
                f.write(chunk)
    return target


if __name__ == "__main__":
    download_worldpop(
        "https://data.worldpop.org/GIS/Population/Global_2000_2020/2020/IND/ind_ppp_2020.tif",
        Path("data/raw/population"),
    )
