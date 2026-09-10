"""Background tasks (Celery)."""
from celery import Celery
from backend.app.core.config import settings

celery_app = Celery("heatwave", broker=settings.REDIS_URL,
                    backend=settings.REDIS_URL)


@celery_app.task
def refresh_alerts():
    return "alerts refreshed"
