# SqlServer

## Windows 安装和配置

<https://learn.microsoft.com/zh-cn/sql/sql-server/?view=sql-server-ver16>

下载 SQL Server Management Studio (SSMS):<https://learn.microsoft.com/zh-cn/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16>

## Ubantu 安装和配置

注意Ubantu的版本

<https://learn.microsoft.com/zh-cn/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-ver16&tabs=ubuntu2004>

## Centos安装和配置

在 CentOS Linux 上安装 SQL Server 并配置常用命令，同时设置开机自启可以按照以下步骤进行：

#### 1. 添加 Microsoft SQL Server 的软件仓库

   ```bash
   # 导入 Microsoft 的 GPG 公钥
   sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc 
   # 添加 Microsoft 的软件仓库
   curl -o /etc/yum.repos.d/mssql-server.repo https://packages.microsoft.com/config/rhel/7/mssql-server-2019.repo
   ```

#### 2. 安装 SQL Server

   ```bash
   # 更新软件包列表
   sudo yum update

   # 安装 SQL Server
   sudo yum install -y mssql-server
   ```

#### 3. 配置 SQL Server

   ```bash
   # 运行配置向导
   sudo /opt/mssql/bin/mssql-conf setup
   ```

   在配置向导中，你需要接受许可协议、设置 SA 用户的密码，并可选择是否启用 Telemetry 数据收集。

#### 4. 启动 SQL Server 服务

   ```bash
   # 启动 SQL Server 服务
   sudo systemctl start mssql-server

   # 检查 SQL Server 服务状态
   sudo systemctl status mssql-server
   ```

   如果服务正常运行，将显示服务状态信息。

#### 5. 设置 SQL Server 开机自启

   ```bash
   # 设置 SQL Server 服务开机自启
   sudo systemctl enable mssql-server
   ```

#### 6. 检查 SQL Server 是否正常连接

   ```bash
   # 使用 SQL Server 命令行工具（sqlcmd）连接到本地 SQL Server 实例
   sqlcmd -S localhost -U SA -P <YourPassword>
   ```
