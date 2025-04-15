目前是不支持mac系统的，但是可以用docker方式在mac上运行，因为有一些子功能是c写的并不跨平台，我没有mac电脑没有测试过，大概率是无法安装和运行的。
### 1. 体验
url: http://demo.filecat.xiaobaidadada.fun:5569/
- 账号密码: `admin`/`admin`
### 2. npm 方式运行
- 如果你的服务器上已经安装了node和npm，使用 `npm install filecat -g`全局安装，后然后使用`filecat`命令即可运行，或者`npm install filecat`安装到本项目下，使用`npx filecat `运行；
- 如果网络比较差，可以使用淘宝镜像源`npm config set registry https://registry.npmmirror.com`。或者，安装的时候临时使用淘宝镜像源`npm install -g filecat --registry https://registry.npmmirror.com`。
- 许多依赖是预构建放在github上的(支持node 16、18、20、22)，如果主机环境访问github很慢(多尝试几下也许就好了)，需要编译，查看报错后安装诸如`npm -g install node-addon-api`的依赖。实在访问不了github导致安装不了也可以使用下面的二进制或者docker运行。在windwos上编译可能遇到的问题可以查看这个链接 https://blog.csdn.net/jjocwc/article/details/134152602
### 3. 二进制文件方式运行
下载[最新release](https://github.com/xiaobaidadada/filecat/releases)
然后使用各个平台的解压缩包，里面包含了所有资源以及一个node.exe，然后使用里面使用的run脚本执行;目前只有x64架构的，arm需要自己构建;
1. 执行命令`run.cmd --port 5567 --base_folder /home ` 在linux下是`run.sh`； 不设置username的话，账号密码默认是admin
2. 使用例子中的配置文件，执行命令`run.sh --env ./env`；linux下也许需要执行`sudo chmod +x ./run.sh`获得执行权限
### 4. linux下安装到systemd后台运行
这里的安装是安装到systemd作为后台进程，默认需要使用root权限，对于Linux系统现在提供自动安装功能，推荐使用这种systemd方式运行;只需要下载最新版本的`filecat-linux`可执行程序后，给与它chod可执行权限，然后运行 `./filecat-linux --install linux`;如果你使用npm安装了filecat，可以直接使用`filecat --install linux`来安装到systemd。
### 5. docker 方式运行
使用`docker run -d --name filecat --restart=always --net=host -v /home:/home ghcr.io/xiaobaidadada/filecat:latest --port 5567 --base_folder /home`命令直接运行。
### 6. git clone 项目
克隆项目后执行 `npm run dev` 然后执行  `node build/main.js`运行。
