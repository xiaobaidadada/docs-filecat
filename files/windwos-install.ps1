# =========================
# Filecat Auto Installer
# =========================

$ErrorActionPreference = "Stop"

# 1. 配置下载地址
$tarUrl = "https://github.com/xiaobaidadada/filecat/releases/latest/download/filecat-win-x64.tar.gz"

# 2. 当前目录
$workDir = Get-Location
$tarFile = Join-Path $workDir "filecat.tar.gz"
$extractDir = Join-Path $workDir "filecat"

Write-Host "📦 下载文件中..." -ForegroundColor Cyan

# 3. 下载 tar.gz
Invoke-WebRequest -Uri $tarUrl -OutFile $tarFile

Write-Host "📥 下载完成: $tarFile"

# 4. 解压 tar.gz（Windows 10+ 自带 tar）
Write-Host "📂 解压中..."

if (Test-Path $extractDir) {
    Remove-Item $extractDir -Recurse -Force
}

New-Item -ItemType Directory -Path $extractDir | Out-Null

tar -xzf $tarFile -C $extractDir

Write-Host "✅ 解压完成: $extractDir"

# 5. 进入目录
Set-Location $extractDir

Write-Host "🚀 执行安装脚本..."

# 6. 执行 cmd 安装脚本
Start-Process -FilePath "cmd.exe" -ArgumentList "/c filecat-install.cmd" -Wait -NoNewWindow

Write-Host "🎉 安装完成"

# 1. 可能需要提前执行 Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
# 2. irm https://filecat.xiaobaidadada.fun/files/windwos-install.ps1 | iex

# powershell -ExecutionPolicy Bypass -File install.ps1 做个.bat文件内容写这个也可以直接执行