$repo = Get-Location

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " AUTO PUSH GITHUB - MIS AL MUHAJIRIN" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Folder : $repo"
Write-Host "Menunggu perubahan..."
Write-Host ""

$lastSignature = ""

while ($true) {

    Start-Sleep -Seconds 5

    $status = git status --porcelain

    if ($status) {

        $signature = ($status | Out-String)

        if ($signature -ne $lastSignature) {

            $lastSignature = $signature

            Write-Host ""
            Write-Host "Perubahan terdeteksi..." -ForegroundColor Yellow
            Write-Host "Menyiapkan commit..." -ForegroundColor Yellow

            git add .

            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

            git commit -m "Auto update: $timestamp"

            if ($LASTEXITCODE -eq 0) {

                Write-Host "Commit berhasil." -ForegroundColor Green
                Write-Host "Mengirim ke GitHub..." -ForegroundColor Yellow

                git push

                if ($LASTEXITCODE -eq 0) {
                    Write-Host "Push GitHub berhasil." -ForegroundColor Green
                }
                else {
                    Write-Host "Push GitHub gagal." -ForegroundColor Red
                }

            }

            Write-Host ""
            Write-Host "Menunggu perubahan berikutnya..."
        }
    }
}