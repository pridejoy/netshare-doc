
# 依赖注入/控制反转

在现代化的应用程序中，依赖注入/控制反转已经成为框架底层不可或缺的组件/模式。

## 依赖注入（Dependency Injection，简称DI）

通俗来说，就是把有依赖关系的类放到容器中，然后在我们需要这些类时，容器自动解析出这些类的实例，这就是依赖注入。也就是程序员无需自己创建一个服务对象类，而是将该服务对象类以某种锲约（通常时接口）配置到容器中，然后容器根据这些锲约定位到对象类并创建出来。

依赖注入最大的好处时实现类的解耦，利于程序拓展、单元测试、自动化模拟测试等。

## 控制反转（Inversion of Control，简称IoC）

控制反转只是一个概念，也就是将创建对象实例的控制权（原本是程序员）从代码控制权剥离到 IOC容器中控制。也就是上面 依赖注入（IOC）创建对象的过程描述。

要想接口实现构造函数注入方式创建对象，则实例类需继承或间接继承 ITransientDependency 接口，

## 生命周期

在依赖注入（Dependency Injection，简称 DI）中，生命周期指定了对象的创建和销毁方式。

- **单例 Singleton**：依赖项注入容器对服务实现的每个后续请求都使用相同的实例。
- **作用域 Scoped**：对于Web应用程序，作用域范围内的生存期表示每个客户端请求（连接）都会创建一次服务。
- **瞬时（暂时）Transient**：每次从服务容器中请求时，都会创建瞬态生存期服务。

示例:

将MySingletonService，MyScopedService，MyTransientService注册到服务容器中。

```csharp
services.AddSingleton<MySingletonService, MySingletonService>();
services.AddScoped<MyScopedService, MyScopedService>();
services.AddTransient<MyTransientService, MyTransientService>();

[Route("ServiceLifetime")]
[HttpGet]
public List<string> GetServiceLifetime([FromServices] MySingletonService singleton1,
    [FromServices] MySingletonService singleton2,
    [FromServices] MyScopedService scoped1,
    [FromServices] MyScopedService scoped2,
    [FromServices] MyTransientService transient1,
    [FromServices] MyTransientService transient2)
{
    var s = new List<string>();
    s.Add($"singleton1:{singleton1.GetHashCode()}");
    s.Add($"singleton2:{singleton2.GetHashCode()}");
    s.Add($"scoped1:{scoped1.GetHashCode()}");
    s.Add($"scoped2:{scoped2.GetHashCode()}");
    s.Add($"transient1:{transient1.GetHashCode()}");
    s.Add($"transient2:{transient2.GetHashCode()}");
    return s;
}
--代码来自:https://www.cnblogs.com/zcqiand/p/14257661.html

```

启动调试，执行两遍，让我们来看看输出结果:
第一遍：

```json
[
  "singleton1:65122748",
  "singleton2:65122748",
  "scoped1:52786977",
  "scoped2:52786977",
  "transient1:16782441",
  "transient2:16991442"
]
```

第二遍：

```json
[
  "singleton1:65122748",
  "singleton2:65122748",
  "scoped1:56140151",
  "scoped2:56140151",
  "transient1:1997173",
  "transient2:54718731"
]
```

从结果我们发现：

单例 Singleton：两次的 HashCode 没有变化
作用域 Scoped：每个请求内 HashCode 是相同的，不同的请求的 HashCode 是不同的
瞬时（暂时）Transient：每次的 HashCode 都不同

## 简单的使用

自带的IOC容器是通过依赖注入（Dependency Injection）来实现控制反转的机制。

在Net中，自带的IOC容器被称为IServiceProvider

IServiceProvider接口定义了IOC容器的基本功能，它提供了以下几个重要的方法：

<https://learn.microsoft.com/zh-cn/dotnet/api/system.iserviceprovider?view=net-8.0>

```
// 创建一个服务类
public interface IMyService
{
    void DoSomething();
}
public class MyService : IMyService
{
    public void DoSomething()
    {
        Console.WriteLine("Doing something...");
    }
}

// 注册服务到IOC容器 
services.AddSingleton<IMyService, MyService>();
// 构建容器
var serviceProvider = services.BuildServiceProvider();
// 解析服务并使用
var myService = serviceProvider.GetService<IMyService>();
myService.DoSomething();
```

## Malus

Malus已经实现自动注册程序集内以`Service` 结尾的服务,[实现方式见](https://gitee.com/Pridejoy/MalusAdmin/blob/master/MalusApi/MalusAdmin.Common/Components/DependencyInjection/InjectionServiceCollectionExtensions.cs),

更多关于资料可查阅[官方文档](https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-8.0)。
