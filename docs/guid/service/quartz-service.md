# Quartz 定时任务




1. 创建任务调度器。调度器通常在应用程序启动时创建，一个应用程序实例通常只需要一个调度器即可。
2. 创建Job和JobDetail。Job是作业的类型，描述了作业是如何执行的，这个类是由我们定义的；JobDetail是Quartz对作业的封装，它包含Job类型，以及Job在执行时用到的数据，还包括是否要持久化、是否覆盖已存在的作业等选项。
3. 创建触发器。触发器描述了在何时执行作业。
4. 添加调度。

### 触发器
Trigger是触发器，用来定制执行作业。Trigger有两种类型：SampleTrigger和CronTrigger，我们分别进行说明。

#### SampleTrigger
- 重复执行：WithRepeatCount()/RepeatForever()
- 设置间隔时间：WithInterval()
- 定时执行：StartAt()/StartNow()
- 设定优先级：WithPriority()，默认为5
注意：当Trigger到达StartAt指定的时间时会执行一次，这一次执行是不包含在WithRepeatCount中的。在我们上面的例子中可以看出，添加调度后会立即执行一次，然后重复三次，最终执行了四次。

#### CronTrigger

CronTrigger是通过Cron表达式来完成调度的。Cron表达式非常灵活，可以实现几乎各种定时场景的需要。

在线Cron表达式生成器- https://cron.qqe2.com

## 项目中的使用
>安装 Quartz.Extensions.DependencyInjection

在项目的QuartzJob文件夹下进行添加定时任务

封装好的项目在：https://gitee.com/Pridejoy/wallpaper.net 

里面单独的站点[Wallpaper.Net.Service]单独使用项目容易解耦

项目里面Orm使用sqlsugar，配置了安装服务。

使用的话，就在QuartzJob文件夹下，创建类进行实现接口IJob

> 简易的日志 FileHelper.Write(ex.Message, "error");



```
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

## 相关文章


官网： https://www.quartz-scheduler.net

超级详细:https://www.cnblogs.com/youring2/p/quartz_net.html
   