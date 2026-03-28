#!/usr/bin/env bash

set -e

echo "🚀 start install  filecat..."

# -------------------------
# 🧠 架构检测
# -------------------------
ARCH=$(uname -m)

echo "🖥 当前架构: $ARCH"

if [ "$ARCH" != "x86_64" ]; then
    echo "❌ 不支持的架构，目前仅支持 x86_64"
    exit 1
fi

# -------------------------
# 安装目录
# -------------------------
TARGET_DIR="$HOME/.filecat"

mkdir -p "$TARGET_DIR"

# -------------------------
# 下载文件
# -------------------------
echo "⬇️ 下载文件..."

curl -L -o "$TARGET_DIR/filecat.tar.gz" "https://github.com/xiaobaidadada/filecat/releases/latest/download/filecat-linux-x64.tar.gz"

# -------------------------
# 解压
# -------------------------
echo "📦 解压文件..."

tar -xzf "$TARGET_DIR/filecat.tar.gz" -C "$TARGET_DIR"

# rm -f "$TARGET_DIR/filecat.tar.gz"

# -------------------------
# 执行安装脚本
# -------------------------
if [ -f "$TARGET_DIR/filecat-install.sh" ]; then
    echo "⚙️ 执行安装脚本..."
    chmod +x "$TARGET_DIR/filecat-install.sh"
    bash "$TARGET_DIR/filecat-install.sh"
else
    echo "❌ 未找到 filecat-install.sh"
    exit 1
fi

echo "✅ 安装完成"