"""U-Net downscaling stub for LST / Tmax."""
try:
    import torch
    import torch.nn as nn
except Exception:
    torch = None


if torch is not None:
    class UNetDownscale(nn.Module):
        def __init__(self, in_ch=3, out_ch=1, base=32):
            super().__init__()
            self.enc = nn.Sequential(
                nn.Conv2d(in_ch, base, 3, padding=1), nn.ReLU(),
                nn.Conv2d(base, base * 2, 3, padding=1), nn.ReLU(),
            )
            self.dec = nn.Conv2d(base * 2, out_ch, 3, padding=1)

        def forward(self, x):
            return self.dec(self.enc(x))
