# 使用Supervisor守护dotnet应用程序

是的，Supervisor可以用于守护和管理dotnet应用程序。Supervisor是一个通用的进程管理器，可以监控并自动重启任何类型的进程，包括dotnet应用程序。

## 基本步骤：

1. 安装Supervisor：在Linux系统中，可以使用包管理器来安装Supervisor。例如，在Ubuntu上，可以使用以下命令来安装Supervisor：

   ```
   sudo apt-get update
   sudo apt-get install supervisor
   ```

2. 创建Supervisor配置文件：创建一个新的Supervisor配置文件，其中包括您要守护的dotnet应用程序的相关信息。例如，可以创建一个名为`myapp.conf`的新文件，并将以下内容添加到其中：

   ```
   [program:myapp]
   command=/usr/bin/dotnet /path/to/myapp.dll
   directory=/path/to/myapp
   autostart=true
   autorestart=true
   stderr_logfile=/var/log/myapp.err.log
   stdout_logfile=/var/log/myapp.out.log
   ```

   其中`command`参数指定要运行的dotnet应用程序的路径和名称，`directory`参数指定应用程序的工作目录，`autostart`和`autorestart`参数分别指定在机器启动时自动启动应用程序，并在应用程序退出时自动重启应用程序。`stderr_logfile`和`stdout_logfile`参数分别用于指定应用程序的错误日志和输出日志文件的路径和名称。

3. 将配置文件复制到Supervisor配置目录：将上述创建的`myapp.conf`文件复制到Supervisor的配置目录中。在Ubuntu系统上，配置文件通常位于`/etc/supervisor/conf.d/`目录下。

4. 重新加载Supervisor配置：使用以下命令重新加载Supervisor配置：

   ```
   sudo supervisorctl reread
   sudo supervisorctl update
   ```

5. 启动dotnet应用程序：最后，使用以下命令启动dotnet应用程序：

   ```
   sudo supervisorctl start myapp
   ```

   此时，Supervisor将开始监控并守护您的dotnet应用程序。如果应用程序崩溃或异常退出，Supervisor将自动重启应用程序，并将错误信息记录到相应的日志文件中。 