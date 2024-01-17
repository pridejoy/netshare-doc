 
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
## 简单Demo使用

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
![](https://oss.hunji.xyz/blogoss/202310/503816bd-60cf-4f1e-9ca9-68e92ed019a8ff578b0522264e0ea721dbc92eeae656.png)