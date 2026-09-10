from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.schemas.alert import AlertOut, AlertCreate

router = APIRouter()

SAMPLE_ALERTS = [
    {"id": 1, "region": "Delhi",   "level": "ORANGE", "utci_max": 35.2, "issued_at": "2026-09-10T09:00:00"},
    {"id": 2, "region": "Mumbai",  "level": "YELLOW", "utci_max": 28.1, "issued_at": "2026-09-10T09:00:00"},
    {"id": 3, "region": "Chennai", "level": "RED",    "utci_max": 42.5, "issued_at": "2026-09-10T09:00:00"},
]


@router.get("", response_model=list[AlertOut])
def get_alerts(region: str | None = None, db: Session = Depends(get_db)):
    data = SAMPLE_ALERTS
    if region:
        data = [a for a in data if a["region"].lower() == region.lower()]
    return data


@router.post("", response_model=AlertOut)
def post_alert(payload: AlertCreate, db: Session = Depends(get_db)):
    return {"id": 99, "region": payload.region, "level": payload.level, "utci_max": payload.utci_max, "issued_at": "2026-09-10T09:00:00"}
