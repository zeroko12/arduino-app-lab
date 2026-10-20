# Arduino App Lab - Local Windows Build Helper Script
$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Building Arduino App Lab for Windows x64 " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Check prerequisites
Write-Host "`n[1/5] Checking tools..." -ForegroundColor Yellow
if (-not (Get-Command go -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Go is not installed or not in PATH. Please install Go 1.22+ from https://go.dev" -ForegroundColor Red
    exit 1
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Node.js is not installed. Please install Node.js 22+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# 2. Setup environment and dependencies
Write-Host "`n[2/5] Installing yarn packages..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    New-Item -ItemType File -Path ".env" -Force | Out-Null
}
yarn install

# 3. Check / Install Wails CLI
Write-Host "`n[3/5] Checking Wails CLI..." -ForegroundColor Yellow
if (-not (Get-Command wails -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Wails CLI v2.9.2..." -ForegroundColor Yellow
    go install github.com/wailsapp/wails/v2/cmd/wails@v2.9.2
}

# 4. Build Frontend
Write-Host "`n[4/5] Building Frontend..." -ForegroundColor Yellow
yarn workspace @bcmi-labs/app-lab-desktop build

# 5. Build Wails Desktop Application
Write-Host "`n[5/5] Building Desktop App with Wails..." -ForegroundColor Yellow
Push-Location "standalone-apps\app-lab-desktop"
try {
    wails build -platform windows/amd64
} finally {
    Pop-Location
}

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host " Build Finished Successfully! " -ForegroundColor Green
Write-Host " Output binary: standalone-apps\app-lab-desktop\build\bin\ArduinoAppLab.exe" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
