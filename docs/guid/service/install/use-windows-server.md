# 微软服务

下面的方式是微软自家的安装服务功能支持Windows服务和Linux服务

 

## 1.简单的使用
 

需要win上安装在 Windows服务

请安装 `Microsoft.Extensions.Hosting.WindowsServices ` Nuget包

需要在linux上安装 Linux服务

请安装` Microsoft.Extensions.Hosting.Systemd` Nuget包

 
修改 Program.cs 文件，添加 UseWindowsService() 方法调用，测试的项目为WebApi项目


修改 Program.cs 文件，添加 UseWindowsService() 方法调用，测试的项目为WebApi项目

 

```ts{4-7}
public static void Main(string[] args)
{
    var builder = WebApplication.CreateBuilder(args);
    //指定项目可以部署为Windows服务
    builder.Host.UseWindowsService();
    //指定项目可以部署为Linux服务,可以和 UseWindowsService() 共存
    builder.Host.UseSystemd();
    var app = builder.Build();  
    app.Run();
}
```


## 2.安装

### 3. Windows安装
sc.exe是帮助开发部署 WindowsNT 服务的工具，路径： C:\Windows\System32\sc.exe。
1.项目发布到服务器上
2.使用管理员权限运行PowerShell
3.部署的相关命令：ServiceName 是自定义的服务名称，可以自行修改

```
## 创建服务
sc.exe create ServiceName  BinPath=C:\xx\ClearFontService\ClearFontService.exe

## 启动服务
sc.exe start ServiceName

## 停止服务
sc.exe stop ServiceName

## 删除服务
sc.exe delete ServiceName


## 添加服务描述
sc description ServiceName "描述"

## 改变服务的启动方式 手动/自动/禁用 
sc.exe config ServiceName start= demand/auto/disabled
```
####  脚本

安装服务脚本install.bat
```
set serviceName=ServiceName
set serviceFilePath=C:\xx\ClearFontService\ClearFontService.exe
set serviceDescription=服务描述
sc.exe create %serviceName%  BinPath=%serviceFilePath%
sc.exe config %serviceName%    start=auto  
sc.exe description %serviceName%  %serviceDescription%
sc.exe start  %serviceName%
pause
```
卸载服务脚本unstall.bat
```
set serviceName=ServiceName
sc.exe stop   %serviceName% 
sc.exe delete %serviceName% 
pause
```


### 3.2 Linux安装 

[环境安装参考](/command/dotnet.md)

[Linux上使用Systemd守护Dotnet应用](/guid/deployment/linux-systemd-deployment.md)

#### 优秀的参考文章

https://www.cnblogs.com/qtiger/p/14283390.html