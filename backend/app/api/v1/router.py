from fastapi import APIRouter
from backend.app.api.v1.endpoints import (
    alerts, indices, heatwave, auth, users, health,
)

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(indices.router, prefix="/indices", tags=["indices"])
api_router.include_router(heatwave.router, prefix="/heatwave", tags=["heatwave"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
