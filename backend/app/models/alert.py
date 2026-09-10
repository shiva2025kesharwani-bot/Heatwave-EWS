from datetime import datetime
from sqlalchemy import String, DateTime, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column
from backend.app.db.session import Base


class AlertRecord(Base):
    __tablename__ = "alerts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    region: Mapped[str] = mapped_column(String(128), index=True)
    level: Mapped[str] = mapped_column(String(16))
    utci_max: Mapped[float] = mapped_column(Float)
    issued_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
