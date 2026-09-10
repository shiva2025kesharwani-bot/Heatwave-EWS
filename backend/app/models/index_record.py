from datetime import datetime
from sqlalchemy import String, DateTime, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column
from backend.app.db.session import Base


class IndexRecord(Base):
    __tablename__ = "index_records"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    index: Mapped[str] = mapped_column(String(16))      # UTCI / WBGT / HI
    lat: Mapped[float] = mapped_column(Float)
    lon: Mapped[float] = mapped_column(Float)
    value: Mapped[float] = mapped_column(Float)
    time: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
