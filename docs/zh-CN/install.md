

## 💻 平台支持

| 平台 | 支持情况 |
| --- | --- |
| **Linux** | 完整支持，提供一键脚本、systemd/pm2 保活 |
| **Windows** | 完整支持，二进制包内含 `filecat-run.cmd` |
| **macOS** | 支持，二进制包内含 `filecat-run.sh` |

> 部分子功能（如 `node-process-watcher`）由 C++/C 实现，安装时会从 GitHub 拉取预构建产物；网络不通时需要本地编译，请确保具备构建环境。

---


## 🚀 安装与运行 Filecat

### 2.1 使用 npm 安装

#### 1. 全局安装

```bash
npm install -g filecat
```

中国地区建议使用国内镜像源：

```bash
npm install -g filecat --registry https://registry.npmmirror.com
```

#### 2. 启动服务

```bash
filecat --port 5567
```

#### 3. 访问页面

打开浏览器访问：[http://localhost:5567](http://localhost:5567)  
默认账号密码均为：`admin`

#### ⚠️ 注意事项：

- 部分依赖为 C++ 原生模块，已预构建发布至 GitHub（支持 Node.js 16、18、20、22）。
- 如果访问 GitHub 速度较慢，安装过程中可能会报错。可根据提示手动安装相关报错依赖。
- 如果实在无法访问 GitHub 安装失败，推荐使用下方的 **二进制包** 或 **Docker 镜像** 方式安装。
- Windows 下编译相关问题可参考这篇文章：[点击查看](https://blog.csdn.net/jjocwc/article/details/134152602)

---

### 2.2 使用二进制运行

1. 前往 [Releases 页面](https://github.com/xiaobaidadada/filecat/releases) 下载最新版本。
2. 解压后，使用其中的 `run.cmd`（Windows）或 `run.sh`（Linux）启动。

示例：

```bash
run.cmd --port 5567 --base_folder /home
```

> 默认账号密码为 `admin`

你也可以使用配置文件：

```bash
run.sh --env ./env
```

> Linux 下请确保 `run.sh` 有执行权限：
```bash
chmod +x run.sh
```

> 目前仅提供 x64 架构的二进制包，ARM 架构请自行构建。

---

### 2.3 使用 Docker 运行

```bash
docker run -d \
  --name filecat \
  --restart=always \
  --net=host \
  -v /home:/home \
  ghcr.io/xiaobaidadada/filecat:latest \
  --port 5567 --base_folder /home
```

---

## 🛠️ 安装为系统服务（支持开机自启动）

### 3.1 Linux：使用 systemd

1. 安装服务（目前安装向导仅支持中文）：

```bash
sudo filecat --install linux
```

2. 启动服务：

```bash
sudo systemctl start filecat
```

3. 停止服务：

```bash
sudo systemctl stop filecat
```

---

### 3.2 Windows：使用 NSSM 安装为服务

1. 下载 [NSSM](https://nssm.cc/download)，并将其路径加入系统环境变量。

2. 创建启动脚本 `start.bat` 和配置文件 `env`，示例内容：

```bat
filecat --env ./env
```

3. 以管理员身份运行命令：

```bash
nssm install filecat
```

4. 在弹出的窗口中设置 `start.bat` 脚本路径。

5. 启动服务：

```bash
net start filecat
```

6. 停止服务：

```bash
net stop filecat
```

