from datetime import datetime
from pydantic import BaseModel


class IndexPoint(BaseModel):
    lat: float
    lon: float
    time: datetime
    value: float
    index: str


class IndexQuery(BaseModel):
    lat: float
    lon: float
    date: str
    index: str = "UTCI"
