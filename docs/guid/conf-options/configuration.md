# 配置

https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/configuration/?view=aspnetcore-8.0

https://learn.microsoft.com/zh-cn/dotnet/core/extensions/configuration


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


## 封装的方法

完整读取静态配置的方法见下方代码

进行注册服务

```
// 添加静态文件读取
builder.Services.AddSingleton(new AppSettings(builder.Configuration));
```
在需要读取静态文件的地方直接调用`AppSettings.xx`即可



```
public class AppSettings
{
    public static IConfiguration Configuration { get; set; }
    static string contentPath { get; set; }

    public AppSettings(string contentPath)
    {
        string Path = "appsettings.json";

        //如果你把配置文件 是 根据环境变量来分开了，可以这样写
        //Path = $"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json";

        Configuration = new ConfigurationBuilder()
            .SetBasePath(contentPath)
            .Add(new JsonConfigurationSource
            {
                Path = Path,
                Optional = false,
                ReloadOnChange = true
            }) //这样的话，可以直接读目录里的json文件，而不是 bin 文件夹下的，所以不用修改复制属性
        .Build();
    }

    public AppSettings(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    /// <summary>
    /// 封装要操作的字符
    /// </summary>
    /// <param name="sections">节点配置</param>
    /// <returns></returns>
    public static string app(params string[] sections)
    {
        try
        {
            if (sections.Any())
            {
                return Configuration[string.Join(":", sections)];
            }
        }
        catch (Exception)
        {
        }

        return "";
    }

    /// <summary>
    /// 递归获取配置信息数组
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="sections"></param>
    /// <returns></returns>
    public static List<T> app<T>(params string[] sections)
    {
        List<T> list = new List<T>();
        // 引用 Microsoft.Extensions.Configuration.Binder 包
        Configuration.Bind(string.Join(":", sections), list);
        return list;
    }


    /// <summary>
    /// 根据路径  configuration["App:Name"];
    /// </summary>
    /// <param name="sectionsPath"></param>
    /// <returns></returns>
    public static string GetValue(string sectionsPath)
    {
        try
        {
            return Configuration[sectionsPath];
        }
        catch (Exception)
        {
        }

        return "";
    }





    #region 以下存放的全部都是静态配置
    /// <summary>
    /// 允许跨域请求列表
    /// </summary>
    public static string[] AllowCors => Configuration.GetSection("AllowCors").Get<string[]>();

    /// <summary>
    /// Jwt 配置
    /// </summary>
    public static class Jwt
    {
        public static string SecretKey => Configuration["Jwt:SecretKey"];
        public static string Issuer => Configuration["Jwt:Issuer"];
        public static string Audience => Configuration["Jwt:Audience"];
    }
    #endregion


}
```
