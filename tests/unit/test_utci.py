"""Test UTCI calculation."""
import xarray as xr
from src.indices.thermal_stress.utci import utci, utci_category


def test_utci_runs_and_categorizes():
    t = xr.DataArray(35.0)
    w = xr.DataArray(2.0)
    rh = xr.DataArray(60.0)
    mrt = xr.DataArray(40.0)
    out = utci(t, w, rh, mrt)
    cat = utci_category(out)
    assert float(out) > 30
    assert int(cat) >= 1
