#!/usr/bin/env bash
set -e
echo "Setting up environment..."
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements/dev.txt
echo "Done."
