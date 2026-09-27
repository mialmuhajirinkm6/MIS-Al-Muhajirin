$repoRoot = (git rev-parse --show-toplevel).Trim()

if (-not $repoRoot) {
    Write-Host "Repository Git tidak ditemukan." -ForegroundColor Red
    exit
}

Set-Location $repoRoot

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " AUTO PUSH GITHUB - MIS AL MUHAJIRIN" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repository : $repoRoot"
Write-Host "Menunggu perubahan..."
Write-Host ""

$lastStatus = ""

while ($true) {

    Start-Sleep -Seconds 3

    $status = git status --porcelain

    if (-not $status) {
        $lastStatus = ""
        continue
    }

    $currentStatus = ($status | Out-String).Trim()

    if ($currentStatus -eq $lastStatus) {
        continue
    }

    # Tunggu sampai proses penyimpanan file benar-benar selesai
    Start-Sleep -Seconds 3

    $statusCheck = git status --porcelain

    if (-not $statusCheck) {
        $lastStatus = ""
        continue
    }

    $stableStatus = ($statusCheck | Out-String).Trim()

    if ($stableStatus -ne $currentStatus) {
        continue
    }

    $lastStatus = $stableStatus

    Write-Host ""
    Write-Host "Perubahan terdeteksi:" -ForegroundColor Yellow
    git status --short

    Write-Host ""
    Write-Host "Menyiapkan commit..." -ForegroundColor Yellow

    git add -A

    # Pastikan memang ada perubahan yang sudah di-stage
    $staged = git diff --cached --name-only

    if (-not $staged) {
        Write-Host "Tidak ada perubahan yang siap di-commit." -ForegroundColor DarkYellow
        continue
    }

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

    git commit -m "Auto update: $timestamp"

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Commit gagal." -ForegroundColor Red
        continue
    }

    Write-Host "Commit berhasil." -ForegroundColor Green
    Write-Host "Mengirim ke GitHub..." -ForegroundColor Yellow

    git push

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Push GitHub berhasil." -ForegroundColor Green
    }
    else {
        Write-Host "Push GitHub gagal." -ForegroundColor Red
    }

    Write-Host ""
    Write-Host "Menunggu perubahan berikutnya..."
}