"""Alert business logic."""
from sqlalchemy.orm import Session
from backend.app.models.alert import AlertRecord
from backend.app.schemas.alert import AlertCreate


def create_alert(db: Session, payload: AlertCreate) -> AlertRecord:
    rec = AlertRecord(**payload.model_dump())
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return rec


def list_alerts(db: Session, region: str | None = None, limit: int = 100):
    q = db.query(AlertRecord)
    if region:
        q = q.filter(AlertRecord.region == region)
    return q.order_by(AlertRecord.issued_at.desc()).limit(limit).all()
