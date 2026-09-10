"""Population exposure to thermal stress."""
import xarray as xr


def population_exposure(utci: xr.DataArray,
                        pop: xr.DataArray,
                        threshold: float = 32.0) -> xr.DataArray:
    """Number of people exposed to UTCI above threshold."""
    mask = (utci > threshold).astype(float)
    return (mask * pop).rename("exposed_population")


def vulnerable_population(utci: xr.DataArray,
                          pop: xr.DataArray,
                          elderly_frac: xr.DataArray,
                          threshold: float = 32.0) -> xr.DataArray:
    mask = (utci > threshold).astype(float)
    return (mask * pop * elderly_frac).rename("exposed_elderly")
