"""Matplotlib plots for fields and time series."""
from pathlib import Path
import matplotlib.pyplot as plt
import xarray as xr


def plot_field(da: xr.DataArray, title: str = "",
               cmap: str = "RdYlBu_r",
               out_path: str | None = None) -> None:
    fig, ax = plt.subplots(figsize=(9, 6))
    da.plot(ax=ax, cmap=cmap)
    ax.set_title(title)
    fig.tight_layout()
    if out_path:
        Path(out_path).parent.mkdir(parents=True, exist_ok=True)
        fig.savefig(out_path, dpi=150)
    plt.close(fig)


def plot_timeseries(da: xr.DataArray, title: str = "",
                    out_path: str | None = None) -> None:
    fig, ax = plt.subplots(figsize=(10, 4))
    da.plot(ax=ax)
    ax.set_title(title)
    fig.tight_layout()
    if out_path:
        Path(out_path).parent.mkdir(parents=True, exist_ok=True)
        fig.savefig(out_path, dpi=150)
    plt.close(fig)
