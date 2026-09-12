@echo off
title Heatwave EWS Launcher
cd /d "%~dp0"
echo.
echo ==========================================
echo   HEATWAVE EARLY WARNING SYSTEM
echo ==========================================
echo.
echo Starting backend...
start "Heatwave Backend" cmd /k "cd /d %~dp0 && call .venv\Scripts\activate.bat && uvicorn backend.app.main:app --reload --port 8000"
timeout /t 5 /nobreak >nul
echo Starting frontend...
start "Heatwave Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"
timeout /t 10 /nobreak >nul
echo.
echo ==========================================
echo   READY!
echo   Backend:  http://localhost:8000/docs
echo   Frontend: http://localhost:5173
echo ==========================================
echo.
start http://localhost:5173
pause
