# 缓存管理

将一些不经常改变的数据缓存起来能够大大提高系统的吞吐量。

## 概念

所谓的缓存，就是将程序或系统经常要调用的对象存在内存中，使其使用时可以快速调用，不必再去创建新的重复的实例。这样做可以减少系统开销，提高系统效率。

## 缓存类型

- 内存缓存IMemoryCache：也就是创建一个静态内存区域，将数据存储进去，例如我们B/S架构的将数据存储在Application中或者存储在一个静态Map中
- 本地内存缓存：就是把数据缓存在本机的内存中
- 分布式缓存机制：可能存在跨进程，跨域访问缓存数据。对于分布式的缓存，此时因为缓存的数据是放在缓存服务器中的，或者说，此时应用程序需要跨进程的去访问分布式缓存服务器。
- Redis 缓存
- 内存缓存
- SQL Server 缓存
- NCache 缓存
- Azure CosmosDB 缓存

### 内存中的缓存

使用

```
public class HomeController : Controller
{
    private IMemoryCache _cache;

    public HomeController(IMemoryCache memoryCache)
    {
        _cache = memoryCache;
    }
}
```

更多内存中的缓存可查看[官方文档](https://learn.microsoft.com/zh-cn/aspnet/core/performance/caching/memory)。

### 分布式缓存

分布式缓存通常由两种，一种是不跨服务器但跨应用的缓存，另外一种是跨服务器的缓存。前者一般简称分布式内存缓存，后者统称是分布式缓存。

Maslus默认使用的缓存是redis缓存，可无缝切换内存缓存，

Redis缓存使用的组件用的是FreeRedis: <https://github.com/2881099/FreeRedis>

malus中的使用示例

```csharp
    public class WeatherForecastController : ControllerBase
    { 
        private readonly IDistributedCache _cache;
        public WeatherForecastController( IDistributedCache cache  )
        { 
            _cache = cache;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetWeatherForecast")] 
        public bool  Get()
        { 
          await CacheHelper.SetAsync("123", "456");
          var a = await CacheHelper.GetAsync("123");
          var b = new Student { name="张三",sex="男" };
          await CacheHelper.SetObjectAsync("z", b);
          var c=await CacheHelper.GetObjectAsync<Student>("z"); 
        }

        /// <summary>
        /// 缓存测试类
        /// </summary>
        public class Student { 
        
            public string name { get;set; }
            public string sex { get;set; }
        }
}
```

更多内存中的分布式缓存可查看[官方文档](https://learn.microsoft.com/zh-cn/aspnet/core/performance/caching/distributed?view=aspnetcore-8.0)。
