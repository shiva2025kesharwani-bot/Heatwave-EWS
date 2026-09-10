"""Notification service (SMS / email / webhook)."""
import requests
from backend.app.core.config import settings
from backend.app.core.logging import setup_logging
import logging

setup_logging()
log = logging.getLogger(__name__)


def send_webhook(url: str, payload: dict) -> int:
    try:
        r = requests.post(url, json=payload, timeout=10)
        return r.status_code
    except Exception as e:
        log.warning("webhook failed: %s", e)
        return -1


def send_console(region: str, level: str, utci_max: float) -> None:
    log.warning("ALERT [%s] %s UTCI=%.1f", level, region, utci_max)
