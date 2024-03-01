# 选项

https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/configuration/options?view=aspnetcore-8.0

选项（Options）是一个类，用于封装应用程序的配置信息。通过定义选项类，你可以将相关配置项组织在一起，并在需要时轻松地注入到应用程序的其他组件中。
 

### 添加配置节点
```json
"Position": {
    "Title": "Editor",
    "Name": "Joe Smith"
  }
```

### 创建 PositionOptions 的配置选项类

```csharp
public class PositionOptions
{
    public const string Position = "Position";
    public string Title { get; set; } = String.Empty;
    public string Name { get; set; } = String.Empty;
}
```

### 创建一个中间件

所有强类型的的绑定都可以在这里进项绑定


```csharp
public static class Configure
{
    public static IServiceCollection AddConfigureSetup(this IServiceCollection services,IConfiguration config)
    { 
        services.Configure<PositionOptions>(config.GetSection(PositionOptions.Position));
        //等其他选项
        return services;
    }
}

```

### 注册服务

```csharp
//进行选项注册
builder.Services.AddConfigureSetup(builder.Configuration);
```

### 读取配置

- `IOptions<TOptions>`适用于在应用启动时读取配置数据，并且选项不会在应用程序生命周期内更改。它注册为单一实例并且可以注入到任何服务生存期中。

- `IOptionsSnapshot<TOptions>`适用于在每次请求时重新计算选项的方案中有用。这意味着它可以读取已更新的配置数据。它不能注册为单一实例，而是注册为范围内，因此无法注入到单一实例服务中。此外，它还支持命名选项。

- `IOptionsMonitor<TOptions>`是一种实时监视配置更改的接口。它是在`IOptionsSnapshot<TOptions>`基础上开发的，可以实时检测配置更改并提供通知。在每个请求中，它都会返回最新的配置选项。与`IOptionsSnapshot<TOptions>`类似，它也支持命名选项。
 

```csharp{5,7,12,18}
    public class WeatherForecastController : ControllerBase
    {  
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IConfiguration _configuration;
        public readonly PositionOptions _PositionOptions;
        public WeatherForecastController(ILogger<WeatherForecastController> logger,
            IOptions<PositionOptions> optionsSnapshot,
            IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _PositionOptions = optionsSnapshot.Value;
        }
          
        [HttpGet("GetWeatherForecast")]
        public string GetSetting()
        { 
            return _PositionOptions.Title;
        }
    }
```



