$repoRoot = "C:\Users\ACER\Downloads\MIS AL MUHAJIRIN"

Set-Location $repoRoot

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $repoRoot
$watcher.IncludeSubdirectories = $true
$watcher.NotifyFilter = `
    [System.IO.NotifyFilters]::FileName -bor
    [System.IO.NotifyFilters]::LastWrite -bor
    [System.IO.NotifyFilters]::DirectoryName

$watcher.EnableRaisingEvents = $true

$action = {
    $path = $Event.SourceEventArgs.FullPath

    if (
        $path -notlike "$repoRoot\.git\*" -and
        $path -notlike "$repoRoot\Website MI Al-Muhajirin\*"
    ) {
        Set-Variable -Name "ChangeDetected" -Value $true -Scope Global
    }
}

Register-ObjectEvent $watcher Changed -Action $action | Out-Null
Register-ObjectEvent $watcher Created -Action $action | Out-Null
Register-ObjectEvent $watcher Deleted -Action $action | Out-Null
Register-ObjectEvent $watcher Renamed -Action $action | Out-Null

$global:ChangeDetected = $false

while ($true) {

    Wait-Event -Timeout 2 | Out-Null

    if ($global:ChangeDetected) {

        $global:ChangeDetected = $false

        Start-Sleep -Seconds 3

        git add -A

        $staged = git diff --cached --name-only

        if ($staged) {

            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

            git commit -m "Auto update: $timestamp" | Out-Null

            if ($LASTEXITCODE -eq 0) {
                git push | Out-Null
            }
        }

        Get-Event | Remove-Event -ErrorAction SilentlyContinue
    }
}