# DotNet

### 官方资料

在windos上安装:<https://learn.microsoft.com/zh-cn/dotnet/core/install/windows>

在Centos上安装：<https://learn.microsoft.com/zh-cn/dotnet/core/install/linux-centos>

在Ubantu上面的安装方式

<https://learn.microsoft.com/zh-cn/dotnet/core/install/linux-ubuntu-install?tabs=dotnet8&pivots=os-linux-ubuntu-2404>

## 在Centos上安装

以下为Centos上面的安装步骤，可能在其他系统或版本上安装方式不同。

#### 1. 将 Microsoft 包签名密钥添加到受信任密钥列表，并添加 Microsoft 包存储库

   ```bash
   sudo rpm -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
   ```

#### 2. 安装 SDK

   ```bash
   sudo yum install dotnet-sdk-7.0
   ```

#### 3. 安装运行时

   ```bash
   sudo yum install aspnetcore-runtime-7.0
   ```

## 常用主要命令

## 常用命令

- `dotnet --list-sdks`：列出当前安装在系统上的所有 .NET SDK（软件开发工具包）版本。

- `dotnet --list-runtimes`：列出当前安装在系统上的所有 .NET 运行时版本。

#### 1. 项目相关命令

- `dotnet new <template>`：创建一个新的项目，可以使用不同的模板（例如 console、webapi、classlib 等）。
- `dotnet restore`：还原项目依赖项。
- `dotnet build`：构建项目。
- `dotnet publish`：发布项目，生成可执行文件或部署包。
- `dotnet clean`：清理项目的构建输出。

#### 2. 运行项目命令

- `dotnet run`：运行当前项目。
- `dotnet run <project-name>`：运行指定的项目。

#### 3. 测试相关命令

- `dotnet test`：运行项目的单元测试。

#### 4. 包管理命令

- `dotnet add package <package-name>`：添加一个 NuGet 包引用。
- `dotnet remove package <package-name>`：移除一个 NuGet 包引用。
- `dotnet list package`：列出当前项目所引用的所有 NuGet 包。

#### 5. 工具命令

- `dotnet tool install <tool-name>`：安装一个全局工具。
- `dotnet tool update <tool-name>`：更新一个全局工具。
- `dotnet tool uninstall <tool-name>`：卸载一个全局工具。

#### 6. 其他命令

- `dotnet --version`：显示安装的 .NET Core 版本。
- `dotnet new --list`：列出可用的项目模板。
- `dotnet help`：显示帮助信息，查看更多命令和选项。
