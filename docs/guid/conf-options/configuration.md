## 官方文档

https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/configuration/?view=aspnetcore-8.0


https://learn.microsoft.com/zh-cn/dotnet/core/extensions/configuration

## 配置

 ASP.NET Core 中的应用程序配置是使用一个或多个配置提供程序执行的。 配置提供程序使用各种配置源从键值对读取配置数据：

- 设置文件，例如 appsettings.json,xml,ini,etc.等
- 环境变量
- Azure Key Vault
- Azure 应用配置
- 命令行参数
- 已安装或已创建的自定义提供程序
- 目录文件
- 内存中的 .NET 对象

在创建的 ASP.NET Core Web 应用会生成以下代码


`var builder = WebApplication.CreateBuilder(args);`

WebApplication.CreateBuilder(args) 方法默认创建的 WebApplication 实例会包含一个 IConfiguration 对象。在创建 WebApplication 实例时，会自动加载应用程序的配置文件并构建 IConfiguration 对象

按照以下顺序为应用提供默认配置（从最高优先级到最低优先级）：
1. 使用命令行配置提供程序通过命令行参数提供。
2. 使用非前缀环境变量配置提供程序通过非前缀环境变量提供。
3. 应用在 Development 环境中运行时的用户机密。
4. 使用 JSON 配置提供程序通过 appsettings.{Environment}.json 提供。 例如，appsettings.Production.json 和 Development。
5. 使用 JSON 配置提供程序通过 appsettings.json 提供。
6. 回退到下一部分所述的主机配置。

## 简单使用

在本地appsettings.Development.json 文件中更改

本地开发环境 例如，appsettings.Development..json  ，优先于appsettings.json 

```
{
  "Position": {
    "Title": "Editor",
    "Name": "Joe Smith"
  },
  "MyKey": "My appsettings.json Value",
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*"
}

```
在构造的时候接受一个 IConfiguration 对象作为参数，并将其赋值给 _configuration 变量，

然后就可以使用 `_configuration["MyKey"]`来获取配置MyKey的值。

多节点使用 `_configuration["Position:Title"]` 来获取配置Position:Title的值。

```ts {6,8,11,17-20}
    [ApiController]
    [Route("[controller]/[action]")]
    public class WeatherForecastController : ControllerBase
    {  
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IConfiguration _configuration;
        public WeatherForecastController(ILogger<WeatherForecastController> logger, 
            IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }
          
        [HttpGet("GetWeatherForecast")]
        public string GetSetting()
        { 
            var myKeyValue = _configuration["MyKey"];
            var title = _configuration["Position:Title"];
            var name = _configuration["Position:Name"];
            var defaultLogLevel = _configuration["Logging:LogLevel:Default"];
            return name;
        }
    }
```


