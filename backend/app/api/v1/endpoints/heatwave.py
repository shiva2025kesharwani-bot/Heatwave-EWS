from fastapi import APIRouter

router = APIRouter()


@router.get("")
def heatwave_status(region: str = "india"):
    return {"region": region, "active": False, "days": 0}
