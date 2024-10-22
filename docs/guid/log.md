# 日志


## 1.全局日志中间件


::: details   全局日志中间件

注册中间件
``` csharp
builder.Services.AddControllers(options => {
    options.Filters.Add<RequestActionFilter>();
)
```

中间件
```csharp
using NetTaste;

using System.Diagnostics;

/// <summary>
/// 禁用请求记录过滤器
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class DisabledRequestRecordAttribute : Attribute { }

/// <summary>
/// 请求日志拦截
/// </summary>
public class RequestActionFilter : IAsyncActionFilter
{

    //private readonly IEventPublisher _publisher;
    //private readonly ICurrentUserService _currentUser; 

    //public RequestActionFilter(IEventPublisher publisher, ICurrentUserService currentUser)
    //{
    //    _publisher = publisher;
    //    _currentUser = currentUser;
    //}

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        bool isSkipRecord = false;
        var httpContext = context.HttpContext;
        var httpRequest = httpContext.Request;

        var sw = new Stopwatch();
        sw.Start();
        var actionContext = await next();
        sw.Stop();

        var actionDescriptor = context.ActionDescriptor as ControllerActionDescriptor;


        // 判断是否需要跳过
        //if (!AppSettings.RecordRequest.IsEnabled) isSkipRecord = true;
        if (actionDescriptor == null) isSkipRecord = true;
        //if (AppSettings.RecordRequest.IsSkipGetMethod && request.Method.ToUpper() == "GET") isSkipRecord = true;

        foreach (var metadata in actionDescriptor!.EndpointMetadata)
        {
            if (metadata is DisabledRequestRecordAttribute)
            {
                isSkipRecord = true;
            }
        }

        // 进入管道的下一个过滤器，并跳过剩下动作
        if (isSkipRecord)
        {
            await next();
            return;
        }

        //判断是否请求成功（没有异常就是请求成功）
        var isRequestSucceed = actionContext.Exception == null;
        var headers = httpRequest.Headers;
        var clientInfo = headers.ContainsKey("User-Agent")
            ? Parser.GetDefault().Parse(headers["User-Agent"])
            : null;


        var entity = new bs_log_op()
        {
            //Name = httpContext.User?.FindFirstValue(ClaimConst.CLAINM_NAME),
            //Account = httpContext.User?.FindFirstValue(ClaimConst.CLAINM_ACCOUNT)??0,
            Success = true,
            Ip = httpContext.GetRequestIPv4(),
            Location = httpRequest.GetRequestUrlAddress(),
            Browser = clientInfo?.UA.Family + clientInfo?.UA.Major,
            Os = clientInfo?.OS.Family + clientInfo?.OS.Major,
            Url = httpRequest.Path,
            ClassName = context.Controller.ToString(),
            MethodName = actionDescriptor?.ActionName,
            ReqMethod = httpRequest.Method,
            Param = context.ActionArguments.Count < 1 ? "" : context.ActionArguments.ToJson(),
            // Result = JSON.Serialize(actionContext.Result), // 序列化异常，比如验证码
            ElapsedTime = sw.ElapsedMilliseconds,
            OpTime = DateTime.Now,

        };

        await Console.Out.WriteLineAsync(entity.ToJson());
        //发送到队列或者直接添加到数据库
        //await _eventPublisher.PublishAsync(new ChannelEventSource("Create:OpLog", ));
    }
}
```
:::


 

## 2.轻便的静态日志

- [静态方法](../article/log.md)

使用方法：

```csharp
//文件名，日志内容
await WriteAsync("file", "Hello World");
```

## 3.Serilog

### 使用

Serilog 是一个功能强大且易于使用的日志记录库，广泛应用于 .NET 应用程序中。它提供了简洁的 API 和灵活的日志配置选项，能够将日志输出到多种目标（称为接收器），如控制台、文件、数据库等。下面是一个基本的 Serilog 使用教程，涵盖了设置、配置和日志记录的基本步骤。

#### 安装 Serilog

首先，你需要在你的项目中安装 Serilog 以及你想要输出日志的接收器的 NuGet 包。如果你使用的是命令行，可以运行以下命令：

```bash
dotnet add package Serilog
dotnet add package Serilog.Sinks.Console
dotnet add package Serilog.Sinks.File
```

这会安装 Serilog 核心库、控制台接收器和文件接收器。

#### 配置 Serilog

接下来，你需要在应用程序的入口点（例如 `Program.cs`）配置 Serilog：

```csharp
using Serilog;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug() // 设置最小的日志级别
    .WriteTo.Console() // 输出日志到控制台
    .WriteTo.File("logs/myapp.txt", rollingInterval: RollingInterval.Day) // 每天滚动一个新文件
    .CreateLogger();
```

这段代码配置了 Serilog，使其能够同时向控制台和文件输出日志。文件日志会保存在 "logs/myapp.txt"，并且每天滚动一个新文件。

#### 记录日志

一旦配置了 Serilog，你就可以在应用程序的任何位置使用它来记录日志了：

```csharp
Log.Information("这是一条信息级别的日志");
Log.Warning("这是一条警告级别的日志");
Log.Error("这是一条错误级别的日志");
```

Serilog 支持多种日志级别（Verbose、Debug、Information、Warning、Error、Fatal），你可以根据需要选择合适的级别来记录不同重要性的日志。

#### 关闭

为了确保所有挂起的日志消息都被写入目标，在应用程序关闭之前，你应该优雅地关闭 Serilog：

```csharp
Log.CloseAndFlush();
```

这通常放在应用程序的退出点或在处理完所有工作后执行。

#### 额外配置

Serilog 提供了丰富的配置选项和接收器，支持结构化数据日志记录、过滤、日志分割等高级特性。你可以通过阅读 [Serilog 文档](https://serilog.net/) 来了解更多高级用法和配置技巧。


##### 常见的包

```
核心的包是 Serilog 和 Serilog.AspNetCore
建议安装 Serilog.AspNetCore，几乎包含了Serilog常用的所有包
异步写入 Serilog.Sinks.Async
写入MSSQL Serilog.Sinks.MSSqlServer
```

##### 日志方法 等级最高的是Fatal
```
log.Information("info");
log.Debug("debug");
log.Warning("warning");
log.Error("err");
log.Fatal("fatal");
```
##### 常见的接收器

```
Console 输出到控制台
Debug 输出到VS的Debug窗口
Trace 输出到VS的控制台
File 输出到文件
Rolling File
MongoDB 输出到MongoDB
LiteDB 输出到文件数据库LiteDB
SQLite 输出到文件数据库SQLite
SignalR 输出为SignalR服务
HTTP 输出到REST服务 

```




翻译:

https://blog.csdn.net/weixin_38582851/article/details/122067753

https://docs.sentry.io/

https://blog.csdn.net/qq_39569480/article/details/121969937