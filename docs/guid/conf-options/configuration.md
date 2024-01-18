

## 配置

更多详情:https://learn.microsoft.com/zh-cn/dotnet/core/extensions/configuration


.NET 中的配置是使用一个或多个配置提供程序执行的。 配置提供程序使用各种配置源从键值对读取配置数据：
- 设置文件，例如 appsettings.json
- 环境变量
- 命令行参数
 
- Microsoft.Extensions.Configuration.Binder：将对象与 Configuration 的配置提供程序中的数据绑定的功能。
- Microsoft.Extensions.Configuration.Json： JSON 配置提供程序实现。
- Microsoft.Extensions.Configuration.EnvironmentVariables：环境变量配置提供程序实现。


## 简单使用


