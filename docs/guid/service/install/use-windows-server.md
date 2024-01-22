# 微软服务

为什么说是微软服务，下面的方式是微软自家的安装服务功能支持Windows服务和Linux服务


### 安装
 

需要win上安装在 Windows服务

请安装 `Microsoft.Extensions.Hosting.WindowsServices ` Nuget包

需要在linux上安装 Linux服务

请安装` Microsoft.Extensions.Hosting.Systemd` Nuget包

 
修改 Program.cs 文件，添加 UseWindowsService() 方法调用，测试的项目为WebApi项目


## 快捷的命令




### 优秀的参考文章

https://www.cnblogs.com/qtiger/p/14283390.html