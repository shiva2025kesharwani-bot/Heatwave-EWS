from datetime import datetime
from pydantic import BaseModel


class AlertOut(BaseModel):
    id: int | None = None
    region: str
    level: str
    utci_max: float
    issued_at: datetime


class AlertCreate(BaseModel):
    region: str
    level: str
    utci_max: float
