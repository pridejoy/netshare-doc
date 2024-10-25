# 在Windox上使用IIS部署Dotnet应用

在win上部署Iis网站

## 服务器安装环境

先要确保你服务器上的IIS环境要安装好，确保IIS安装好了后，还需要安装.net core的运行时。

运行时的程序文件可以在[官网](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)下载最新版本安装。

.net core项目不是由iis工作进程（w3wp.exe）托管，需要先下载 runtime-aspnetcore-8.0.10-windows-hosting-bundle-installer

![运行时](/images/net8_runtime.png)

安装好后,在模块可以看到`AspNetCoreModuleV2`
![模块](/images/7e7186bbce3878fdf53dc6a9eba619d6.png)
![AspNetCoreModuleV2](/images/639e1a9477f087d4377d039afd7f42d0.png)

## 2.以文件的形式发布.NETCORE程序到指定目录

在项目右键选择发布

![](/images/0ebdb5cc4aa17bdb11206d958527b87f.png)
![](/images/db155234087819ff3faec4e676651ded.png)

## 3.IIS上面建立网站并配置好网站设置

新建一个站点进行绑定
![](/images/d5b22f5d45dca0e96a33ebd4dc7341a5.png)

发布好的配置
![](/images/187415b3aacc6fb228163bd25fde2006.png)

发布好后重启站点即可通过IP+端口进行访问

## 部署失败注意

- 是否安装了.net core Sdk
- Windows Server 上安装.NET Core Hosting Bundle
- Windows Server 上安装RunTime
- 检查ASPNETCOREmODULEV2的模块
- 检查进程内外托管
- 尝试独立发布
- 检查文件夹权限
- url重写工具的安装
- iis的配置

## 解决方案

比较好的参考方案

- [方案一](<https://blog.csdn.net/hqwest/article/details/129904395>)
- [方案二](<https://blog.csdn.net/zgscwxd/article/details/133838112>)
- [方案三](<https://blog.csdn.net/ZhouJinXuan24/article/details/128740877>)
