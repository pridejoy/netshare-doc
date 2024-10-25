将.nuget文件夹从C盘移到其它盘，再也不用担心的C盘爆红了
命令

```
查看缓存文件夹的具体路径
dotnet nuget locals all --list
```

## 第一步

在文件资源管理器输入`%AppData%\NuGet\NuGet.Config`，默认存放NuGet.Config的路径，具体情况可能根据你的电脑来操作。

## 增加配置

```
 <config>
  <add key="globalPackagesFolder" value="D:\Develop\nuget\.nuget\packages" />
 </config>

```

![](https://img-blog.csdnimg.cn/img_convert/f3bffe5deeb9f57821057f6793faf26a.png)

## 效果

![](https://img-blog.csdnimg.cn/img_convert/03654ec61eec699d54d2f6ae459accc7.png)
移动之前
![](https://img-blog.csdnimg.cn/img_convert/72c0a3fdf7b82265a6c000624bd8cd25.png)
已经将C盘的缓存移动到D盘了
![](https://img-blog.csdnimg.cn/img_convert/84520e51bed0524c98bca20b61a5e56f.png)

打开文件夹查看确实已经全部都在

欢迎关注我的公众号`Net分享`

一键三连呦！，感谢大佬的支持，您的支持就是我的动力!
