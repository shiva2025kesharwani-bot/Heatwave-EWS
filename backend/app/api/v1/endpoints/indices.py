from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.schemas.indices import IndexPoint
from backend.app.services.index_service import query_indices

router = APIRouter()


@router.get("/utci", response_model=list[IndexPoint])
def get_utci(
    lat: float = Query(..., ge=-90, le=90),
    lon: float = Query(..., ge=-180, le=180),
    date: str = Query(...),
    db: Session = Depends(get_db),
):
    rows = query_indices(db, "UTCI", lat, lon, tolerance=1.0, limit=50)
    return [
        IndexPoint(lat=r.lat, lon=r.lon, time=r.time,
                   value=r.value, index=r.index)
        for r in rows
    ]


@router.get("/wbgt", response_model=list[IndexPoint])
def get_wbgt(lat: float, lon: float, db: Session = Depends(get_db)):
    rows = query_indices(db, "WBGT", lat, lon, tolerance=1.0, limit=50)
    return [
        IndexPoint(lat=r.lat, lon=r.lon, time=r.time,
                   value=r.value, index=r.index)
        for r in rows
    ]
