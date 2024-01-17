# 在Windox上使用IIS部署Dotnet应用

[官网教程](https://learn.microsoft.com/zh-cn/aspnet/core/tutorials/publish-to-iis?view=aspnetcore-8.0&tabs=visual-studio)

https://blog.csdn.net/hqwest/article/details/129904395

https://blog.csdn.net/zgscwxd/article/details/133838112

https://blog.csdn.net/ZhouJinXuan24/article/details/128740877

可以参考下官网，也可以参考下其他的优质文章，上面已经放出来文章直达链接了

部署失败一般要注意以为几点
- 是否安装了.net core Sdk
- Windows Server 上安装.NET Core Hosting Bundle
- Windows Server 上安装RunTime
- 检查ASPNETCOREmODULEV2的模块
- 检查进程内外托管
- 尝试独立发布
- 检查文件夹权限
- url重写工具的安装
- iis的配置