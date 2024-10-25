
# 进程(后台)服务（Daemon）

通过系统进程服务可以方便快捷的创建系统服务，如Windows服务，Linux守护进程等。

## 系统服务

进程服务使你能够创建在它们自己的 操作系统（如Windows/Linux） 会话中可长时间运行的可执行应用程序。

这些服务可以在计算机启动时自动启动，可以暂停和重新启动而且不显示任何用户界面。

这种服务非常适合在服务器上使用，或任何时候，为了不影响在同一台计算机上工作的其他用户，需要长时间运行功能时使用。还可以在不同于登录用户的特定用户帐户或默认计算机帐户的安全上下文中运行服务。

## Quartz.Net

一个基于 .NET 的可扩展作业调度框架

如何使用

1. 创建任务调度器。调度器通常在应用程序启动时创建，一个应用程序实例通常只需要一个调度器即可。
2. 创建Job和JobDetail。Job是作业的类型，描述了作业是如何执行的，这个类是由我们定义的；JobDetail是Quartz对作业的封装，它包含Job类型，以及Job在执行时用到的数据，还包括是否要持久化、是否覆盖已存在的作业等选项。
3. 创建触发器。触发器描述了在何时执行作业。
4. 添加调度。

Trigger是触发器，用来定制执行作业。Trigger有两种类型：SampleTrigger和CronTrigger，我们分别进行说明。

SampleTrigger

- 重复执行：WithRepeatCount()/RepeatForever()
- 设置间隔时间：WithInterval()
- 定时执行：StartAt()/StartNow()
- 设定优先级：WithPriority()，默认为5
注意：当Trigger到达StartAt指定的时间时会执行一次，这一次执行是不包含在WithRepeatCount中的。在我们上面的例子中可以看出，添加调度后会立即执行一次，然后重复三次，最终执行了四次。

CronTrigger 是通过Cron表达式来完成调度的。Cron表达式非常灵活，可以实现几乎各种定时场景的需要。

在线Cron表达式生成器- <https://cron.qqe2.com>

## Malus中的使用

封装好的项目在：<https://gitee.com/Pridejoy/MalusAdmin/tree/master/MalusApi/MalusAdmin.BackUpServices>

项目里面Orm使用sqlsugar，配置了安装服务。

使用的话，就在QuartzJob文件夹下，创建类进行继承接口IJob，即可

单独的做成一个控制台服务，为了解耦更好的处理任务

```csharp
使用案例
public class HelloQuartzJob : IJob
{
    /// <summary>
    /// 当前任务执行的Core表达式
    /// </summary>
    public static string Cron = "*/1 * * * * ?";


    public async Task Execute(IJobExecutionContext context)
    {
        try
        {
            //业务处理逻辑
            Console.WriteLine("111111111111111");

            // 查询数据库表
            var date = await Sqlsugar.db.Queryable<bs_gallery>()
                .Where(x => x.IsDelete == false)
                .OrderBy(x => SqlFunc.GetRandom())
                .FirstAsync();

            Console.WriteLine(JsonConvert.SerializeObject(date));
        }
        catch (Exception ex)
        {
            FileHelper.Write(ex.Message, "error");
        }
    }
}
```

## 项目解析

:::

#### `Program`主要注册服务，启用服务

```
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            //指定项目可以部署为Windows服务
            builder.Host.UseWindowsService();
            //指定项目可以部署为Linux服务,可以和 UseWindowsService() 共存
            builder.Host.UseSystemd(); 

            builder.Services.AddSingleton<JobService>();
             
            var app = builder.Build();
            //获取任务服务
            var jobService= app.Services.GetService<JobService>();
            //开始执行
            await jobService.StartAll();

            FileHelper.Write("任务开始了", "run");
            app.Run();
        }
```

#### `JobService`任务的启动的主要代码，通过反射获取所有实现IJob的类型，然后通过反射获取Cron表达式，进行开始任务

```
public class JobService
{
    private readonly IScheduler scheduler;

    public JobService()
    {
        scheduler = new StdSchedulerFactory().GetScheduler().GetAwaiter().GetResult();
    }

    /// <summary>
    /// 开始执行所有的job
    /// </summary>
    /// <returns></returns>
    public async Task StartAll()
    {
        var jobTypes = GetJobTypes(); // 获取所有实现了 IJob 接口的类型
        foreach (var type in jobTypes)
        {
            var jobDetail = JobBuilder.Create(type).Build();
            var trigger = TriggerBuilder.Create().WithCronSchedule(GetCronExpression(type)).Build();
            await scheduler.ScheduleJob(jobDetail, trigger);
        }
        await scheduler.Start();
    }

    private IEnumerable<Type> GetJobTypes()
    {
        return Assembly.GetExecutingAssembly().GetTypes().Where(type => typeof(IJob).IsAssignableFrom(type));
    }


    private string GetCronExpression(Type type)
    {
        // 可以根据需要自定义获取 cron 表达式的逻辑
        return (string)type.GetField("Cron", BindingFlags.Static | BindingFlags.Public)?.GetValue(null);
    }
}
```

#### `Sqlsugar`提供数据库操作

```
public static class Sqlsugar
{
    //创建数据库对象
    public static SqlSugarClient db = new SqlSugarClient(new ConnectionConfig()
    {
        ConnectionString = File.ReadAllText("D:\\db.txt"),
        DbType = DbType.SqlServer,
        IsAutoCloseConnection = true
    });
}
```

#### 相关文章

官网： <https://www.quartz-scheduler.net>

超级详细:<https://www.cnblogs.com/youring2/p/quartz_net.html>

## BackgroundService

BackgroundService 是 .NET Core 2.1 及更高版本中引入的一个抽象基类，
它实现了 IHostedService 接口，用于简化长时间运行的后台服务的实现。

**优点**：

1. **简化实现**：提供了一个抽象基类，简化了后台服务的实现。
2. **自动生命周期管理**：与应用程序的启动和停止生命周期集成，自动管理服务的启动和停止。
3. **取消令牌支持**：提供了取消令牌，以便在应用程序关闭时优雅地停止后台任务。

**缺点**：

1. **资源竞争**：在与主应用程序共享同一进程时，可能会竞争 CPU 和内存资源。
2. **扩展性问题**：在水平扩展的 Web 应用中，可能会遇到任务的幂等性问题。
3. **系统依赖**：依赖操作系统的后台任务功能，可能受到不同系统版本和设置的影响。
4. **性能开销**：频繁的后台任务执行可能影响设备性能和电池寿命。
5. **异常处理限制**：在早期的 .NET 版本中，异常处理可能导致服务成为僵尸进程或突然停止。

#### 简单使用

创建`TaskAndOrderService` 类，继承 `BackgroundService` ,实现接口

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

更多相关知识可查看[官方文档](https://learn.microsoft.com/zh-cn/dotnet/core/extensions/windows-service)。
