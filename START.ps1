$host.UI.RawUI.WindowTitle = "Knowlytics Hub"
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "  ================================================" -ForegroundColor Cyan
Write-Host "          Knowlytics Hub - Starting Up" -ForegroundColor Cyan
Write-Host "  ================================================" -ForegroundColor Cyan
Write-Host ""

# Move to project folder
Set-Location $PSScriptRoot

# Step 1: Check Node.js
Write-Host "[1/4] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "  OK - Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ERROR: Node.js not found!" -ForegroundColor Red
    Write-Host "  Download from: https://nodejs.org (choose LTS)" -ForegroundColor White
    Read-Host "`n  Press Enter to exit"
    exit 1
}

# Step 2: Install packages
Write-Host ""
Write-Host "[2/4] Checking node_modules..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "  Installing packages (this takes 2-5 minutes)..." -ForegroundColor White
    Write-Host ""
    npm install --legacy-peer-deps
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "  Retrying with standard install..." -ForegroundColor Yellow
        npm install
    }
    Write-Host ""
    Write-Host "  OK - Packages installed!" -ForegroundColor Green
} else {
    Write-Host "  OK - node_modules already exists, skipping install" -ForegroundColor Green
}

# Step 3: Check .env.local
Write-Host ""
Write-Host "[3/4] Checking .env.local..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    Write-Host "  OK - .env.local found" -ForegroundColor Green
} else {
    Write-Host "  WARNING: .env.local missing, copying from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "  OK - Created .env.local" -ForegroundColor Green
}

# Step 4: Start dev server
Write-Host ""
Write-Host "[4/4] Starting dev server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  ================================================" -ForegroundColor Green
Write-Host "   Site is running at: http://localhost:3000" -ForegroundColor Green
Write-Host "   Press Ctrl+C to stop" -ForegroundColor Green
Write-Host "  ================================================" -ForegroundColor Green
Write-Host ""

Start-Sleep -Seconds 2
Start-Process "http://localhost:3000"

npm run dev
