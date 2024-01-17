 
# 依赖注入/控制反转

## 依赖注入（Dependency Injection，简称DI）

### 什么是依赖注入

**依赖注入（Dependency Injection，简称DI）是一种软件设计模式**，用于将对象之间的依赖关系从代码中解耦和管理。在传统的编程模型中，对象通常通过直接创建或者使用全局变量进行实例化和获取其他对象的引用。而在依赖注入中，对象不再负责主动创建或获取依赖的对象，而是由外部的容器（例如依赖注入框架）来负责创建和提供所需的依赖。

依赖注入的核心思想是通过构造函数、方法参数或者属性的方式将依赖的对象注入到目标对象中。这样，目标对象就可以专注于自身的功能实现，而不需要关心依赖对象的创建和维护。依赖注入有助于提高代码的可维护性、可测试性和可扩展性，同时也降低了代码之间的耦合度。

依赖注入可以分为三种主要的类型：
1. 构造函数注入（Constructor Injection）：通过目标对象的构造函数来接收依赖对象的实例。
2. 方法注入（Method Injection）：通过目标对象的方法来接收依赖对象的实例。
3. 属性注入（Property Injection）：通过目标对象的属性来接收依赖对象的实例。

使用依赖注入的好处包括：
- 代码解耦：依赖关系由容器管理，目标对象不需要知道如何创建和获取依赖对象。
- 可测试性：依赖对象可以被模拟或替代，方便进行单元测试和集成测试。
- 可扩展性：通过配置依赖关系，可以方便地替换或添加新的依赖对象。
- 可维护性：代码结构清晰，易于理解和修改。

依赖注入是一种常见的设计原则和实践。


## 控制反转（Inversion of Control，简称IoC）

### 什么是控制反转？
**控制反转（Inversion of Control，简称IoC）**是一种软件设计模式，也是依赖注入的基础。在传统的编程模型中，程序的流程通常是由程序员自己控制和管理的，而在控制反转中，程序的控制权被反转，流程由外部的容器（例如IoC容器）来控制和管理。

控制反转的思想是将应用程序的控制流程交给一个容器，由容器来实现对象的创建、对象之间依赖关系的管理和调用。这样，应用程序的各个部分之间可以松耦合地进行交互，从而提高了代码的灵活性和可维护性。

控制反转有两种主要的实现方式：
1. 依赖查找（Dependency Lookup）：在程序运行时，通过容器暴露的接口来获取所需的依赖对象。
2. 依赖注入（Dependency Injection）：在程序构建时，通过构造函数、方法参数或属性等方式将依赖对象注入到目标对象中。

控制反转和依赖注入密切相关，可以说依赖注入是控制反转的一种具体实现方式。控制反转是一个更加广泛的概念，它强调的是将控制权反转给容器，而不是程序员手动控制。依赖注入是控制反转的一种具体方式，它实现了将依赖对象注入到目标对象中的功能。


## 简单的使用

自带的IOC容器是通过依赖注入（Dependency Injection）来实现控制反转的机制。

在Net中，自带的IOC容器被称为IServiceProvider

IServiceProvider接口定义了IOC容器的基本功能，它提供了以下几个重要的方法：

https://learn.microsoft.com/zh-cn/dotnet/api/system.iserviceprovider?view=net-8.0

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

## 实现自自动注册程序集内以 Service 结尾的服务
 
> 安装 Microsoft.Extensions.DependencyInjection.Abstractions
    
在程序入口启动注册服务 
 ```
  // 自动添加服务层
  builder.Services.AddAutoServices("Wallpaper.Net.Servers");
```
在使用的地方就可以通过构造来使用服务，AddAutoServices类代码如下 
```
 /// <summary>
 /// 自动注册程序集内以 Service 结尾的服务
 /// </summary>
 /// <param name="services"></param>
 /// <param name="dllNames"></param>
 /// <returns></returns>
 public static IServiceCollection AddAutoServices(this IServiceCollection services, params string[] dllNames)
 {
     // 根据名称获取程序集
     var assemblies = AssemblyHelper.GetAssemblies(dllNames);

     // 获取程序集内名称以 Service 结尾的 class
     var serviceTypes = assemblies.SelectMany(a => a.GetTypes())
                                  .Where(t => t.Name.EndsWith("Service") && t.IsClass && !t.IsAbstract)
                                  .Distinct();

     // 遍历，将服务默认注册为瞬态服务（生命周期：Transient）
     foreach (var serviceType in serviceTypes)
     {
         // 注册自身
         RegistrationType(services, serviceType, serviceType);

         // 注册所有实现的实例（!Problem：子类也会实现父类的接口，可能导致父类对接口的实现被覆盖）
         var serviceInterfaces = serviceType.GetInterfaces();
         foreach (var serviceInterface in serviceInterfaces)
         {
             RegistrationType(services, serviceInterface, serviceType);
         }
     }

     return services;

     // AddAutoServices() 内部静态函数
     static void RegistrationType(IServiceCollection services, Type serviceType, Type implementationType)
     {
         // 设置默认生命周期为 Transient
         var lifecyleType = ServiceLifetime.Transient;

         // 获取服务自动注入标签（AutoInject）
         var autoInjection = serviceType.GetCustomAttribute<AutoInjectionAttribute>();
         if (autoInjection != null)
         {
             if (!autoInjection.AutoRegister)
             {
                 return;
             }
             lifecyleType = autoInjection.Lifecycle;
         }

         // 注册服务
         switch (lifecyleType)
         {
             case ServiceLifetime.Singleton:
                 services.AddSingleton(serviceType, implementationType);
                 break;
             case ServiceLifetime.Scoped:
                 services.AddScoped(serviceType, implementationType);
                 break;
             case ServiceLifetime.Transient:
             default:
                 services.AddTransient(serviceType, implementationType);
                 break;
         }
     }
 }

```