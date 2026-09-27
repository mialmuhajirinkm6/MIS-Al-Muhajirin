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

    # Tunggu sampai perubahan file benar-benar selesai
    Start-Sleep -Seconds 3

    $status2 = git status --porcelain

    if (-not $status2) {
        $lastStatus = ""
        continue
    }

    $stableStatus = ($status2 | Out-String).Trim()

    if ($stableStatus -ne $currentStatus) {
        continue
    }

    Write-Host ""
    Write-Host "Perubahan terdeteksi:" -ForegroundColor Yellow
    git status --short

    # Stage semua perubahan
    git add -A

    # Tunggu sebentar untuk menangkap perubahan terakhir
    Start-Sleep -Seconds 2

    # Stage ulang untuk memastikan perubahan terbaru ikut
    git add -A

    # Cek apakah masih ada perubahan yang belum di-stage
    $unstaged = git diff --name-only

    if ($unstaged) {
        Write-Host "Masih ada perubahan terbaru, menunggu..." -ForegroundColor DarkYellow
        $lastStatus = ""
        continue
    }

    # Cek apakah ada file yang benar-benar sudah di-stage
    $staged = git diff --cached --name-only

    if (-not $staged) {
        $lastStatus = ""
        continue
    }

    Write-Host ""
    Write-Host "Membuat commit..." -ForegroundColor Yellow

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

    git commit -m "Auto update: $timestamp"

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Commit gagal." -ForegroundColor Red
        $lastStatus = ""
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

    $lastStatus = ""
}