

# Welcome

This is the official documentation for **FileCat**, where you can find detailed usage instructions, use cases, and more.

- **FileCat** is designed to help developers build a file server with a wide range of essential features tailored for programming and system management. These features include remote terminal with permission control (supporting RDP desktop and command interception), SSH proxy, online file browsing/editing/decompression, whiteboard drawing, automated build processes, system monitoring, Docker management, and real-time reading of large logs. (Currently supported on **Linux** and **Windows**; **macOS is not supported**.)

- It runs as a service and is accessed via the web. You can install it globally using npm:
  ```bash
  npm install filecat -g
  ```  
  Then run it with the command `filecat`. Use `filecat --help` for more command-line options.  
  **Binary execution** is also supported. For more usage methods and parameters, please refer to the sections below.

- [GitHub repository](https://github.com/xiaobaidadada/filecat)
- [NPM package](https://www.npmjs.com/package/filecat)



# Command-Line Options

```text
1. update      Upgrade (npm-based upgrade)
2. remove      Remove (from npm)
3. version     Show current version
4. help        Display help information
5. install     Install as a systemd service (Linux only)
6. uninstall   Uninstall from systemd (Linux only)
7. restart     Restart the systemd service (Linux only)
8. stop        Stop the systemd service (Linux only)

// The following options require additional arguments, e.g., "filecat --port 8080"
9. port                  Specify the port
10. env                  Specify environment config file
11. work_dir             Working directory for runtime data (default: ./data in the current directory)
12. base_folder          Root folder to manage files (default: current directory)
13. username             Login username (default: admin)  
                         *(As of v1.0.5, there is no permission system yet)*
14. password             Login password (default: admin)
15. reset_root_username Reset admin username (remove this after first use)
16. reset_root_password Reset admin password (remove this after first use)
17. base_url             Route prefix
```


