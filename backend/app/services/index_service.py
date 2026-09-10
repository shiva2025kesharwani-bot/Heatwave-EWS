"""Index query service."""
from sqlalchemy.orm import Session
from backend.app.models.index_record import IndexRecord


def query_indices(db: Session, index: str, lat: float, lon: float,
                  tolerance: float = 0.5, limit: int = 100):
    return (db.query(IndexRecord)
            .filter(IndexRecord.index == index)
            .filter(IndexRecord.lat.between(lat - tolerance, lat + tolerance))
            .filter(IndexRecord.lon.between(lon - tolerance, lon + tolerance))
            .order_by(IndexRecord.time.desc())
            .limit(limit).all())
