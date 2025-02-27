
# 在Linux上使用Systemd守护Dotnet应用

Systemd 是一个系统和服务管理器，可以自动化和简化 Linux 系统的管理和维护，包括启动、停止和管理后台服务。

[相关Dotnet环境安装](/command/dotnet.md)

### 进程守护步骤

1. 创建一个 .service 文件在 /etc/systemd/system/ 目录下创建一个名为 myapp.service 的文件，使用文本编辑器打开并添加以下内容：

```
[Unit]
Description=My .NET 6 Web API Application
After=network.target

[Service]
WorkingDirectory=/path/to/your/app
ExecStart=/usr/bin/dotnet /path/to/your/app/MyApp.dll
Restart=always
# Use the following line if you want to limit the resources used by the app
# MemoryLimit=1G

[Install]
WantedBy=multi-user.target
```

将 WorkingDirectory 和 ExecStart 中的路径替换为您的应用程序的路径。

2. 启用和启动服务    使用以下命令启用和启动服务：

```
sudo systemctl enable myapp.service
sudo systemctl start myapp.service
```

这将启用并启动您的应用程序服务，使其在系统重启后自动启动。

3. 检查服务状态    使用以下命令检查服务状态：

```
sudo systemctl status myapp.service
```

如果一切正常，您应该看到服务已经在运行并且没有出现错误。

### 解释

`[Unit]` 部分：

- `Description` 提供服务的简要描述。
- `After` 指定服务应在网络目标达成后启动。

`[Service]` 部分：

- `WorkingDirectory` 设置服务的工作目录为应用程序的位置。
- `ExecStart` 指定要运行以启动应用程序的命令。
- `Restart` 将服务设置为在失败或停止时自动重新启动。
- `MemoryLimit`（在此示例中被注释掉）限制服务可以使用的内存量。

`[Install]` 部分：

- `WantedBy` 指定此服务应该与哪个目标一起启动。

要使用此 unit 文件，您需要将其保存为 .service 扩展名，并将其放置在 /etc/systemd/system 目录下，然后运行 `systemctl daemon-reload` 命令使 systemd 意识到新服务。然后可以使用 `systemctl start <service_name>` 命令启动服务，其中 `<service_name>` 是不带 .service 扩展名的 unit 文件的名称。

### 常用命令

要停止一个使用 systemd 守护的 .NET 应用程序，您可以使用以下命令：

```
--重载
sudo systemctl daemon-reload

--开始
sudo systemctl status miniapi.service
--停止
sudo systemctl stop miniapi.service
--禁用 [此命令将停止应用程序的进程并停止服务。如果您希望在下次系统启动时保持应用程序不再运行]
sudo systemctl disable miniapi.service
--重启 
sudo systemctl restart miniapi.service
```

公众号“**Net分享**”点个关注不迷路，帮你拾起碎片化的Dotnet知识 。

<img src="/images/20210430134609740.png"  alt="Netshare">
