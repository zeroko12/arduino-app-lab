# Windows Local Build Script for Arduino App Lab
$ErrorActionPreference = "Stop"

$RootDir = "d:\project\ArduinoAppLab"
$GoDir = Join-Path $RootDir "tools\go"
$GoBin = Join-Path $GoDir "bin"
$UserGoBin = Join-Path $env:USERPROFILE "go\bin"

Write-Host "=== Setting up Go Environment ===" -ForegroundColor Cyan
$env:PATH = "$GoBin;$UserGoBin;$env:PATH"
$env:GOPROXY = "https://goproxy.cn,direct"

& "$GoBin\go.exe" version
if ($LASTEXITCODE -ne 0) {
    Write-Error "Go not available at $GoBin\go.exe"
}

Write-Host "`n=== Checking / Installing Wails CLI ===" -ForegroundColor Cyan
$WailsExe = Join-Path $UserGoBin "wails.exe"
if (-not (Test-Path $WailsExe)) {
    Write-Host "Installing Wails CLI v2.9.2 via goproxy.cn..." -ForegroundColor Yellow
    & "$GoBin\go.exe" install github.com/wailsapp/wails/v2/cmd/wails@v2.9.2
}
& $WailsExe version

Write-Host "`n=== Preparing Embedded Resources ===" -ForegroundColor Cyan
$DesktopDir = Join-Path $RootDir "standalone-apps\app-lab-desktop"

$LearnAssets = Join-Path $DesktopDir "internal\learn\assets"
New-Item -ItemType Directory -Force -Path $LearnAssets | Out-Null
New-Item -ItemType File -Force -Path (Join-Path $LearnAssets ".gitkeep") | Out-Null

$EmojiAssets = Join-Path $DesktopDir "internal\emoji\assets"
New-Item -ItemType Directory -Force -Path $EmojiAssets | Out-Null
New-Item -ItemType File -Force -Path (Join-Path $EmojiAssets ".gitkeep") | Out-Null

$BoardRes = Join-Path $DesktopDir "internal\board\resources_windows_amd64"
New-Item -ItemType Directory -Force -Path $BoardRes | Out-Null
New-Item -ItemType File -Force -Path (Join-Path $BoardRes ".gitkeep") | Out-Null

$BoardIndex = Join-Path $DesktopDir "internal\board\resources_index"
New-Item -ItemType Directory -Force -Path $BoardIndex | Out-Null
$PkgIndex = Join-Path $BoardIndex "package_index.tar.bz2"
if (-not (Test-Path $PkgIndex)) {
    Write-Host "Downloading package_index.tar.bz2..." -ForegroundColor Yellow
    curl.exe -sL -o $PkgIndex https://downloads.arduino.cc/packages/package_index.tar.bz2
}

$LspRes = Join-Path $DesktopDir "internal\lsp\artifacts\resources\windows_amd64"
New-Item -ItemType Directory -Force -Path $LspRes | Out-Null
New-Item -ItemType File -Force -Path (Join-Path $LspRes ".gitkeep") | Out-Null

Write-Host "`n=== Compiling Arduino App Lab Windows Executable ===" -ForegroundColor Cyan
Set-Location $DesktopDir
& $WailsExe build -s -skipbindings -m -platform windows/amd64

$OutputExe = Join-Path $DesktopDir "build\bin\ArduinoAppLab.exe"
if (Test-Path $OutputExe) {
    Write-Host "`n========================================================" -ForegroundColor Green
    Write-Host " SUCCESS! Compiled Windows executable is ready:" -ForegroundColor Green
    Write-Host " $OutputExe" -ForegroundColor Green
    Write-Host "========================================================" -ForegroundColor Green
} else {
    Write-Error "Build finished but output binary was not found at $OutputExe"
}
