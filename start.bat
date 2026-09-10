@echo off
cd /d "%~dp0"
start "Heatwave Backend" cmd /k "cd /d %~dp0 && call .venv\Scripts\activate.bat && uvicorn backend.app.main:app --reload --port 8000"
timeout /t 3 /nobreak >nul
start "Heatwave Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"
timeout /t 8 /nobreak >nul
start http://localhost:5173
