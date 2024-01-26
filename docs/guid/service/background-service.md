 
 # 基于 IHostedService 实现后台定时任务

https://learn.microsoft.com/zh-cn/dotnet/core/extensions/windows-service
 

### 第一步：首先继承 BackgroundService 实现一个 TimedBackgroundService

```csharp
 class TimedBackgroundService : BackgroundService
    {
        private readonly ILogger _logger;
        private Timer _timer;

        public TimedBackgroundService(ILogger<TimedBackgroundService> logger)
        {
            _logger = logger;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));
            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            _logger.LogInformation($"Hello World! - {DateTime.Now}");
        }

        public override void Dispose()
        {
            base.Dispose();
            _timer?.Dispose();
        }

    }
```

### 第二步：在 ASP.NET Core Web 程序中执行这个后台定时任务只需在 Startup 的 ConfigureServices 注册 TimedBackgroundService 即可：

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddHostedService<TimedBackgroundService>();
}
```

### 简单使用

创建`TaskAndOrderService` 类，继承 `: BackgroundService` ,实现接口

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

## 配合Core 表达式使用

https://www.bejson.com/othertools/cron/

NCrontab 库来解析 Core 表达式，以计算下一次任务执行的时间。在 while 循环中，我们先计算出下一次任务执行的时间，然后根据当前时间与下一次执行时间之间的差值，在 Task.Delay 中设置等待的时间间隔，以保证任务能够准时执行。

><PackageReference Include="NCrontab" Version="3.3.3" />

```
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using NCrontab;

public class MyBackgroundService : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var schedule = CrontabSchedule.Parse("0 6 * * *"); // 每天早上 6 点执行任务

        while (!stoppingToken.IsCancellationRequested)
        {
            var nextRunTime = schedule.GetNextOccurrence(DateTime.Now);
            var delayTime = nextRunTime - DateTime.Now;

            await Task.Delay(delayTime, stoppingToken);

            // 在此处编写你的定时任务逻辑
            Console.WriteLine("执行定时任务：" + DateTime.Now);
        }
    }
}

```

 安装成windos服务