
这是一个工作流功能，采用github的workflow语法（yaml格式），对任意一个文件创建设置后缀为 act，然后右键这个文件就会有一个选择执行选项。

# 使用场景
- 个人或者公司内部的自动化构建工具，类似jenkins
- 配合权限功能，还可以控制不同身份的人员的编辑控制能力
# 使用步骤
1. 创建一个act文件
2. 编写 `name`,`job` 等步骤
3. 右键执行，实时查看进度
4. 某个文件执行后，当前菜单栏会出现一个历史查看按钮
5. 在设置中，还可以设置远程触发的 api，可以用于git钩子自动触发构建功能。
# 语法
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

## 语法核心
1. 每个文件肯定要给与一个 name
2. env 可以提供一些环境变量
3. jobs 就是编写多个具体的job任务，每个任务都是一个命令集合，命令任务会有顺序的从上往下执行，且每个job都在一个终端环境中执行，可以使用cd做相对目录切换，一个命令失败后，整个任务就会失败

## 高级语法
1. job任务，命令都是可以使用 if 做判断是否执行
2. `import-files`关键字可以导入其它 文件，并在命令中使用`use-yml`来引用
3. `inputs`也是 环境变量，这里设置的变量变量可以在文件右键的时候 直接填入，会覆盖env中的同名环境变量
4. 一个 job如果`repl`设置为true，所有 的命令会全部输入到终端中，举个例子，第一个命令是 `ssh aaa@www` ，剩下 的命令都是参数，这样就会自动输入账号密码。
5. 一个job可以使用`need-job`等待其它job完成后再执行，默认job是并行的。
