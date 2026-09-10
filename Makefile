.PHONY: help install backend frontend all test lint clean

help:
@echo "make install    - install all deps"
@echo "make backend    - run FastAPI"
@echo "make frontend   - run Vite dev server"
@echo "make all        - run backend + frontend"
@echo "make test       - run all tests"
@echo "make lint       - run linters"

install:
pip install -r backend/requirements/dev.txt
cd frontend && npm install

backend:
uvicorn backend.app.main:app --reload --port 8000

frontend:
cd frontend && npm run dev

test:
pytest tests/ backend/tests/ -v
cd frontend && npm test

lint:
ruff check src/ backend/ ml_pipelines/
cd frontend && npm run lint

clean:
find . -type d -name __pycache__ -exec rm -rf {} +
find . -type f -name "*.pyc" -delete
