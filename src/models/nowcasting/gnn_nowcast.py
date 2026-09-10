"""Graph neural network nowcasting stub."""
try:
    import torch
    import torch.nn as nn
except Exception:
    torch = None


if torch is not None:
    class GNNNowcast(nn.Module):
        def __init__(self, in_dim: int, hidden: int = 64):
            super().__init__()
            self.fc1 = nn.Linear(in_dim, hidden)
            self.fc2 = nn.Linear(hidden, 1)

        def forward(self, x):
            import torch.nn.functional as F
            return self.fc2(F.relu(self.fc1(x))).squeeze(-1)
