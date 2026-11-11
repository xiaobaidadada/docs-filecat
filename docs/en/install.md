

## 💻 Platform Support

| Platform | Status |
| --- | --- |
| **Linux** | Fully supported, with a one-line install script and systemd/pm2 keep-alive |
| **Windows** | Fully supported, the binary package includes `filecat-run.cmd` |
| **macOS** | Supported, the binary package includes `filecat-run.sh` |

> A few submodules (such as `node-process-watcher`) are written in C++/C and download prebuilt artifacts from GitHub at install time. If GitHub is unreachable, they are compiled locally, so a build toolchain is required.

---

## 🚀 Installing & Running Filecat

### 2.1 Using npm

#### 1. Global Installation

```bash
npm install -g filecat
```

If you're in China, use a faster mirror:

```bash
npm install -g filecat --registry https://registry.npmmirror.com
```

#### 2. Run Filecat

```bash
filecat --port 5567
```

#### 3. Open in Browser

Go to: [http://localhost:5567](http://localhost:5567)  
Default username/password: `admin` / `admin`

#### ⚠️ Notes:

- Some native modules are prebuilt and hosted on GitHub (supported Node.js versions: 16, 18, 20, 22).
- If GitHub is slow or blocked, installation may fail. You can try installing dependencies manually.

- If installing via npm fails due to GitHub issues, please use the **binary release** or **Docker** method below.
- For Windows build issues, see this article: [CSDN Blog](https://blog.csdn.net/jjocwc/article/details/134152602)

---

### 2.2 Binary Release

1. Download the latest [release](https://github.com/xiaobaidadada/filecat/releases).
2. Extract and run using the included `run.cmd` (Windows) or `run.sh` (Linux).

Example:

```bash
run.cmd --port 5567 --base_folder /home
```

> Default credentials: `admin` / `admin`

To use a config file:

```bash
run.sh --env ./env
```

> On Linux, make sure `run.sh` is executable:

```bash
chmod +x run.sh
```

> Only x64 builds are provided. For ARM, please build from source.

---

### 2.3 Docker

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

## 🛠️ Running Filecat as a System Service

### 3.1 Linux (systemd)

1. Run the install command (currently only available in Chinese):

```bash
sudo filecat --install linux
```

2. Start the service:

```bash
sudo systemctl start filecat
```

3. Stop the service:

```bash
sudo systemctl stop filecat
```

---

### 3.2 Windows (NSSM)

Use [NSSM](https://nssm.cc/download) to install Filecat as a Windows service:

1. Download NSSM and add its directory to your system PATH.
2. Create a startup script `start.bat` and an `env` config file:

```bat
filecat --env ./env
```

3. Open a Command Prompt as **Administrator**, then run:

```bash
nssm install filecat
```

4. A GUI window will appear — set the path to `start.bat`.

5. Start the service:

```bash
net start filecat
```

6. Stop the service:

```bash
net stop filecat
```
