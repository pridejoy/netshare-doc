 
 # 基于 IHostedService 实现后台定时任务

https://learn.microsoft.com/zh-cn/dotnet/core/extensions/windows-service
 

 BackgroundService 是一种简单、高效、可靠的实现常驻后台服务的方式,适合 间隔时间来执行后台任务。

 也可以使用**Quartz**来执行更复杂的任务

## 使用


创建`TaskAndOrderService` 类，继承 ` BackgroundService` ,实现接口

```csharp
/// <summary>
    /// 任务订单处理自动开始结束
    /// </summary>
    public class TaskAndOrderService : BackgroundService
    {

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
           
            while (!stoppingToken.IsCancellationRequested)
            {
                 //doto (处理业务)
                 Console.WriteLine($"{DateTime.Now}-你好");
           
                await Task.Delay(5000, stoppingToken);
            }
        }

    }
```
然后在server中注册

```csharp
 //设置任务自动开始后者任务结束
services.AddHostedService<TaskAndOrderService>();
```
