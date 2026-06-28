# PowerShell script to restart the backend server
# Run: .\restart-backend.ps1

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🔄 Backend Server Restart Script" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Find process on port 5000
Write-Host "🔍 Checking for existing server on port 5000..." -ForegroundColor Yellow
$port5000 = netstat -ano | Select-String ":5000.*LISTENING"

if ($port5000) {
    # Extract PID
    $pidMatch = $port5000 -match '\s+(\d+)\s*$'
    if ($pidMatch) {
        $pid = $matches[1]
        Write-Host "   Found process: PID $pid" -ForegroundColor Green
        
        # Kill the process
        Write-Host "   Stopping old server..." -ForegroundColor Yellow
        try {
            Stop-Process -Id $pid -Force -ErrorAction Stop
            Write-Host "   ✅ Old server stopped" -ForegroundColor Green
            Start-Sleep -Seconds 2
        } catch {
            Write-Host "   ⚠️  Could not stop process: $_" -ForegroundColor Red
            Write-Host "   Please manually stop the backend server (Ctrl+C in terminal)" -ForegroundColor Yellow
            exit 1
        }
    }
} else {
    Write-Host "   No server found on port 5000" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Starting backend server..." -ForegroundColor Yellow
Write-Host "   Location: bharti-clinic/backend" -ForegroundColor Gray
Write-Host "   Command: npm run dev" -ForegroundColor Gray
Write-Host ""

# Change to backend directory and start server
Set-Location -Path "bharti-clinic/backend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Start the server
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Starting server... (Press Ctrl+C to stop)" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

npm run dev
