

# 欢迎

这里是 FileCat 的官方文档，这里可以找到详细的使用说明，使用场景等内容。

[english-page](/en/home.md)

- FileCat 用于帮助开发者搭建一个文件服务器，并提供众多与程序开发人员相关的必备功能。包括带有权限的远程终端(支持rdp桌面、终端命令拦截)、SSH代理、文件在线浏览\编辑\解压缩、白板绘图、自动化构建、系统监控、docker管理、超大日志实时读取等功能(目前可以运行在linux与windows系统下，不支持mac os系统)。
- 它是一个服务程序，使用web访问。可以使用npm执行`npm install filecat -g`全局安装命令，然后执行 `filecat`命令运行，使用参数`filecat --help`可以获取更多参数说明。也支持**二进制**方式直接运行，更多使用方式与参数请参考下文。
- [github 地址](https://github.com/xiaobaidadada/filecat)
- [npm 地址](https://www.npmjs.com/package/filecat)

# 命令参数 
```text
1. update 升级(npm方式升级)
2. remove 移除(从npm)
3. version 版本
4. help 帮助信息
5. install 安装到systemd（只支持linux)
6. uninstall 从systemd卸载（只支持linux)
7  restart 重启systemd服务（只支持linux)
8. stop 停止运行systemd服务(支持linux)
// 以下参数都需要额外的参数输入 例如"filecat --port 8080 "端口参数 用于控制程序运行。
9. port 需要端口参数 
10. env 输入环境配置文件
11. work_dir 工作目录，软件执行需要生成一些数据，会放到这个目录下，默认是启动软件所在的目录下的data文件夹
12. base_folder 软件管理的文件夹默认根路径，默认是启动软件所在的目录
13. username 登录账号 默认是admin (截止到1.0.5目前没有权限功能)
14. password 登录密码 默认是admin
15. reset_root_username 重新生成管理员的账号 (启动完请删除这个参数下次要再使用，下面的密码也是)
16. reset_root_password
17. base_url 路由前缀
```
