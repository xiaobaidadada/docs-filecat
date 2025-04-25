

This is a workflow feature that uses GitHub-style workflow syntax (YAML format). You can create a file with the `.act` extension, then right-click the file to see an execution option.

# Use Cases
- Personal or internal automation build tools, similar to Jenkins
- With permission controls, editing and execution rights can be assigned based on user roles

# How to Use
1. Create a `.act` file
2. Define `name`, `job`, and other steps
3. Right-click to execute and monitor real-time progress
4. After execution, a history button will appear in the current menu bar
5. In settings, you can also configure a remote trigger API, which can be used for Git hooks to trigger automatic builds

# Syntax
```yaml

name: test  # 名字 不支持 {{}}
run-name: 构建项目 # 用于日志显示的名字

# import-files: # 导入多个文件的配置 用于下面的 use-yml 指令
#     - ./ok.yml
inputs:
  job: # 输入参数的 key 子字段只是为了修饰 调用的时候 使用  {{{job}}} 会添加并覆盖到 env 中的值
    description: "任务参数"
    required: true # 是否必须
    default: build # 默认值

env: # 定义一些环境变量 这些 环境变量可以在 run 或者 cwd 中 或者 run-name 中使用  {{}} 来表达 使用的时候 必须要用 '' 字符串括起来，不然会被处理成变量 {{{ }}} 是非转义方式 采用 Mustache js
  version: 1
  cmd_install: npm install
  token: 123
  # 有几个参数是每次执行自动添加的
#  filecat_user_id: 1 # 用户id
#  filecat_user_name: admin # 用户名字
#  filecat_user_note: 备注 #用户备注

username: admin # 需要执行用户的账号 该脚本需要运行在某个用户下
user_id: 1 # 会覆盖 username 对应的用户 id 只允许特定设置的用户在这里可以被设置 运行

# 所有的jobs下的任务都会被并行执行
jobs:
  build-job1:
    if: 1==1 # 判断这个job要不要执行
    cwd: E:\test # 需要一个实际的执行目录 默认是当前的yml所在目录 目录内的文件清理需要自己使用命令操作 必须是绝对路径
    name: 第一阶段执行
    repl: false # 交互式运行 当上一个step 运行没有结束 有输出的时候 就执行下一个 step 默认是 false 必须要自己设置好流程 避免出现一直等待 那么只能手动关闭了，使用repl 无法使用 use-yml if process_exit 等特殊 指令
    # need-job: build-job2 # 需要别的job先完成 只能是本文件内的
    sys-env: # 这里的token 会在执行的添加到shell的环境变量中
      token: {{{token}}}
    env:
      temp: '{{token}}123' # 用于设置一些临时变量
    steps: # 这些脚本会按顺序执行
      - use-yml: test2 # 使用其它 yml 文件中的 name
        with-env:
          version: 18 # 使用其它文件的时候 给一些环境变量参数
      #   - run: pip.exe install setuptools
      #   - run: npm.cmd install
      #   - run: ok1
      #   - run: ls
      - run: npm run build
    #   - run: npm publish # 执行一些脚本
  build-job2:
    cwd: E:\test2
    name: 第二阶段
    steps:
      - if: 1==2 # 判断这个step要不要执行
        run: ls
        process_exit: 0  # 程序 退出 输入数字  0 -1



```

## Core Syntax
1. Each file must have a `name`
2. `env` can be used to provide environment variables
3. `jobs` defines multiple job tasks, each of which is a set of sequential commands. All commands in a job run within a single shell environment. You can use `cd` for relative path switching. If one command fails, the entire job fails.

## Advanced Syntax
1. Each job and command can be conditionally executed using `if`
2. `import-files` allows importing other YAML files, and `use-yml` can reference them
3. `inputs` also serves as environment variables, which can be filled in from the UI when right-clicking the file; these override `env` variables with the same name
4. If a job's `repl` is set to true, all commands are sent to the terminal as one session. For example, if the first command is `ssh aaa@www`, the remaining commands will be input as if typed into the shell (e.g., password)
5. A job can use `need-job` to wait for another job to finish before running; by default, all jobs run in parallel

