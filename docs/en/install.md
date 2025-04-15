

Currently, macOS is **not officially supported**, but you can run FileCat on macOS using **Docker**. Some features are implemented in **C**, making them non-cross-platform. Since I don't have a Mac to test with, it most likely won't install or run successfully on macOS natively.

### 1. Demo Experience
URL: [http://demo.filecat.xiaobaidadada.fun:5569/](http://demo.filecat.xiaobaidadada.fun:5569/)
- Username / Password: `admin` / `admin`

### 2. Run via NPM
- If your server already has **Node.js** and **npm** installed, you can install FileCat globally using:  
  `npm install filecat -g`  
  Then run it with the `filecat` command.  
  Alternatively, install it locally with `npm install filecat`, then run it via:  
  `npx filecat`
- If your network is slow, consider using the Taobao mirror:  
  `npm config set registry https://registry.npmmirror.com`  
  Or install directly using the mirror:  
  `npm install -g filecat --registry https://registry.npmmirror.com`
- Some dependencies are prebuilt and hosted on GitHub (supports Node.js versions 16, 18, 20, 22).  
  If GitHub is slow or inaccessible, you may need to compile locally. Check the error messages and install missing dependencies, such as:  
  `npm -g install node-addon-api`  
  If GitHub access is completely unavailable, you can use the **binary** or **Docker** methods instead.  
  For Windows build issues, see this article:  
  [https://blog.csdn.net/jjocwc/article/details/134152602](https://blog.csdn.net/jjocwc/article/details/134152602)

### 3. Run via Binary
Download the [latest release](https://github.com/xiaobaidadada/filecat/releases)  
Extract the archive for your platform. It includes all resources and a `node.exe`, along with a startup script.

- Only x64 builds are provided; if you're on ARM, you need to build it yourself.
- Run the script:  
  `run.cmd --port 5567 --base_folder /home`  
  (On Linux: `run.sh`)  
  If `username` is not set, default credentials will be `admin/admin`.

- To use a config file:  
  `run.sh --env ./env`  
  On Linux, you may need to run `sudo chmod +x ./run.sh` to make it executable.

### 4. Run as a systemd service (Linux only)
This method installs FileCat as a **background service** via `systemd`, which requires **root privileges**.  
Recommended for Linux users.

- Download the latest `filecat-linux` binary
- Make it executable:  
  `chmod +x filecat-linux`
- Install with:  
  `./filecat-linux --install linux`  
  If you've installed FileCat via npm, you can also run:  
  `filecat --install linux`

### 5. Run via Docker
Use the following command to run FileCat in Docker:
```bash
docker run -d --name filecat --restart=always --net=host -v /home:/home ghcr.io/xiaobaidadada/filecat:latest --port 5567 --base_folder /home
```

### 6. Run from Git Clone
Clone the repository, then run:
```bash
npm run dev
node build/main.js
```

