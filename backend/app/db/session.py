"""SQLAlchemy engine + session (lazy — DB optional at startup)."""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from backend.app.core.config import settings

_engine = None
SessionLocal = None


class Base(DeclarativeBase):
    pass


def get_engine():
    global _engine
    if _engine is None:
        try:
            _engine = create_engine(
                settings.DATABASE_URL, pool_pre_ping=True, future=True
            )
        except Exception as e:
            print("DB not available:", e)
            _engine = None
    return _engine


def get_session_factory():
    global SessionLocal
    if SessionLocal is None:
        eng = get_engine()
        if eng is None:
            return None
        SessionLocal = sessionmaker(bind=eng, autoflush=False, autocommit=False)
    return SessionLocal


def get_db():
    factory = get_session_factory()
    if factory is None:
        yield None
        return
    db = factory()
    try:
        yield db
    finally:
        db.close()
