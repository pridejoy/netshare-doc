# 日志管理

记录日志能够有效的帮组我们调试代码，排查bug。

## 日志作用

简单来说，系统日志记录是记录系统（程序）的允许状态。为什么要记录日志呢？一般有下面几个方法的需求：

- 记录用户操作的审计日志，甚至有的时候就是监管部门的要求。
- 快速定位问题的根源
- 追踪程序执行的过程。
- 追踪数据的变化
- 数据统计和性能分析
- 采集运行环境数据

一般在程序上线之后，一旦发生异常，第一件事就是要弄清楚当时发生了什么。用户当时做了什么操作，环境有无影响，数据有什么变化，是不是反复发生等，然后再进一步的确定大致是哪个方面的问题。确定是程序的问题之后再交由开发人员去重现、研究、提出解决方案。

这时，日志就排上用场了。

## 日志分类

- 系统（程序）运行日志
- 业务处理日志
- 代码调试日志
- 审计日志
- 目前除了审计日志功能还未实现，其余的在框架内部都可正常使用。

## 内置的日志程序

日志记录提供程序存储日志， Console 使用比较方便，EventLog：仅限 Windows，Azure Application Insights 仅限 Azure  。

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
//或者
var builder = WebApplication.CreateBuilder();
builder.Host.ConfigureLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
});
```

记录日志

```csharp
public class AboutModel : PageModel
{
    private readonly ILogger _logger;

    public AboutModel(ILogger<AboutModel> logger)
    {
        _logger = logger;
    }
    public void OnGet()
    {
        _logger.LogInformation("About page visited at {DT}", 
            DateTime.UtcNow.ToLongTimeString());
    }
}

```

更多日志详情见可查看[官方文档](https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/logging/)。

## Malus系统的日志

Malus系统将日志分为三种类型，系统的访问日志，操作日志，异常日志，几乎能包含所有的使用场景，日志存放在数据库中，并且分表按月来处理。也有易用的静态放来来记录日志。

- 系统的访问日志（[RequestActionFilter](https://gitee.com/Pridejoy/MalusAdmin/blob/master/MalusApi/Wechat.WebApi/Filter/)）：记录了所有的接口请求
- 操作日志（ISysLogService.AddLog）：记录了所有的接口请求
- 异常日志（[globalExceptionFilter](https://gitee.com/Pridejoy/MalusAdmin/blob/master/MalusApi/Wechat.WebApi/Filter/GlobalExceptionFilter.cs)）：记录了所有的异常
- 文本日志：`await WriteAsync("文件名", "Hello World");`  [方法](../article/log.md)
