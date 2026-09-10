"""Model registry (local directory based)."""
from pathlib import Path


def registry_dir() -> Path:
    p = Path("models/registry")
    p.mkdir(parents=True, exist_ok=True)
    return p


def list_models() -> list[str]:
    return [p.name for p in registry_dir().iterdir() if p.is_file()]
