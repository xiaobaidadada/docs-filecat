

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
name: test  # Name ({{}} not supported)
run-name: Build Project # Name displayed in logs

# import-files: # Import multiple config files, used by `use-yml` in steps
#     - ./ok.yml

inputs: # Input parameters
  job:
    description: "Task parameter"
    required: true # Required
    default: build # Default value

env: # Define environment variables. These can be used in `run`, `cwd`, or `run-name` using {{}}. Use single quotes to wrap variables. Use {{{ }}} for raw output (Mustache.js style).
  version: 1
  cmd_install: npm install
  token: 123
  # Some variables are automatically added during execution:
  # filecat_user_id: 1
  # filecat_user_name: admin
  # filecat_user_note: Note

username: admin # Username to execute the script under
user_id: 1 # Overrides `username`; only users with specific permissions can be set here

# All jobs are executed in parallel by default
jobs:
  build-job1:
    if: 1==1 # Whether this job should run
    cwd: E:\test # Execution directory (must be absolute). Default is the directory of the YAML file. Clean-up must be done manually.
    name: Phase 1
    repl: false # Interactive execution. If the previous step hasn't finished and has output, the next one will run. Must be managed properly to avoid indefinite hanging.
    # need-job: build-job2 # Wait for another job to finish (must be within this file)
    sys-env: # These will be added to the shell environment during execution
      token: {{{token}}}
    env:
      temp: '{{token}}123' # Temporary variables
    steps:
      - use-yml: test2 # Use another YAML's `name`
        with-env:
          version: 18 # Pass environment variables to external YAML
      # - run: pip.exe install setuptools
      # - run: npm.cmd install
      # - run: ok1
      # - run: ls
      - run: npm run build
      # - run: npm publish

  build-job2:
    cwd: E:\test2
    name: Phase 2
    steps:
      - if: 1==2 # Conditional execution
        run: ls
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

