"""Dispatch alerts via SMS / email / webhooks."""
from datetime import datetime, timezone
from src.utils.logger import get_logger

log = get_logger(__name__)


def build_message(region: str, level: str, utci_max: float) -> str:
    return (f"[{level}] Heatwave alert for {region}: "
            f"UTCI max {utci_max:.1f}C. Take precautions.")


def dispatch_console(region: str, level: str, utci_max: float) -> dict:
    msg = build_message(region, level, utci_max)
    log.warning("ALERT: %s", msg)
    return {
        "region": region,
        "level": level,
        "utci_max": utci_max,
        "issued_at": datetime.now(timezone.utc).isoformat(),
    }


def dispatch_webhook(url: str, payload: dict) -> int:
    import requests
    r = requests.post(url, json=payload, timeout=10)
    return r.status_code
