# 缓存 
https://learn.microsoft.com/zh-cn/aspnet/core/performance/caching/distributed?view=aspnetcore-8.0

## 内存缓存

简单的使用

使用依赖关系注入容器注册 **MyMemoryCache**
```ts{2,6}
//引入命名空间
using Microsoft.Extensions.Caching.Memory;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddSingleton<MyMemoryCache>();
```

 在该控制器的构造函数中注入 `MemoryCache` 对象。例如：

```ts
public class MyController : ControllerBase
{
    private readonly MemoryCache _cache;

    public MyController(MemoryCache cache)
    {
        _cache = cache;
    }

    public IActionResult MyAction()
    {
        // 使用 _cache 对象进行缓存操作，比如添加数据到缓存、从缓存中获取数据等
        string cachedData = _cache.Get("key1") as string;
        if (cachedData != null)
        {
            // 缓存命中，直接使用缓存中的数据
            return Ok("Data from cache: " + cachedData);
        }
        else
        {
            // 缓存未命中，需要从数据源中获取数据并添加到缓存
            string newData = "new data";
            _cache.Set("key1", newData, DateTimeOffset.Now.AddMinutes(5));
            return Ok("Data from data source: " + newData);
        }
    }
}
```


## 分布式缓存


### 分布式 Redis 缓存

### 分布式内存缓存

### 分布式 NCache 缓存


## IDistributedCache 扩展封装