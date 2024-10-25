## Topshelf服务的安装

  Topshelf 是一个用来部署基于.NET Framework 开发的服务的框架。简化服务创建于部署过程，并且支持控制台应用程序部署为服务。本文基于 .net core 控制台应用程序部署为服务（.net Framework 可用）。

### 第一步：通过 Nuget 安装 Topshelf 包

> Topshelf

### 第二步：Toshelf 配置

```csharp
using System;
using Topshelf;

namespace TopshelfDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {  
                // 配置和运行宿主服务
                HostFactory.Run(x =>                                 //1
                {
                    x.Service<Service>(s =>                        //2
                    {
                        // 指定服务类型。这里设置为 Service
                        s.ConstructUsing(name => new Service());     //3

                        // 当服务启动后执行什么
                        s.WhenStarted(tc => tc.Start());              //4

                        // 当服务停止后执行什么
                        s.WhenStopped(tc => tc.Stop());               //5
                    });

                    // 服务用本地系统账号来运行
                    x.RunAsLocalSystem();                            //6

                    // 服务描述信息
                    x.SetDescription("我的项目服务");        //7
                    // 服务显示名称
                    x.SetDisplayName("MyProjectServiceShowName");                       //8
                    // 服务名称
                    x.SetServiceName("MyProjectService");                       //9 
                }); 
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }

    public class Service
    { 
        public void Start() {
            //To do something
        }
        public void Stop() {
            //To do something
        }
    }
}
```

### 第四步：安装服务

　　确保项目正常生成，然后通过管理员权限打开 cmd 命令窗口，找到项目所在的 Debug 目录，输入命令：`TopshelfDemo.exe install` 或者双击文件

也可以通过` sc delete MyProjectService `进行删除

后面可以搭配`Quartz`实现任务调度

![](https://img-blog.csdnimg.cn/20210718132626731.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNzMyMzM2,size_16,color_FFFFFF,t_70#pic_center)

<https://blog.csdn.net/qq_40732336/article/details/118635391>
