@echo off
chcp 65001 >nul
title Knowlytics Hub
cd /d "%~dp0"

echo.
echo  ================================================
echo       Knowlytics Hub - Starting Up
echo  ================================================
echo.

echo Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Install Node.js from https://nodejs.org
    pause
    exit /b
)

echo.
if not exist "node_modules\" (
    echo Installing packages... wait 2-5 minutes...
    echo.
    npm install --legacy-peer-deps
    echo.
    echo Done installing!
) else (
    echo Packages already installed!
)

echo.
echo Starting Knowlytics Hub...
echo Open: http://localhost:3000
echo Press Ctrl+C to stop
echo.

start http://localhost:3000
npm run dev

pause
