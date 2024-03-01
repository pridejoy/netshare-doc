# 缓存 
https://learn.microsoft.com/zh-cn/aspnet/core/performance/caching/distributed?view=aspnetcore-8.0

## 分布式缓存

###  IDistributedCache方式

微软自带的方式，IDistributedCache方式实现的方法比较少，但是够用，可以进行扩展
- 分布式 Redis 缓存
- 分布式内存缓存
- 分布式 SQL Server 缓存
- 分布式 NCache 缓存
- 分布式 Azure CosmosDB 缓存


#### 配置文件如下
```json
   "Redis": {
    "Enabled": false, // 是否启用 Redis 缓存
    "Instance": "Simple",
    "ConnectionString": "127.0.0.1:6379,password=123456,DefaultDatabase=6"
  }
```


#### 注册缓存服务

::: details  AddCacheSetup

```csharp
builder.Services.AddCacheSetup();
```
进行中间件注册

``` csharp
public static class CacheSetup
{ 
    public static IServiceCollection AddCacheSetup(this IServiceCollection services)
    {
        // 根据情况，启用 Redis 或 DistributedMemoryCache
        if (AppSettings.Redis.Enabled)
        {
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = AppSettings.Redis.ConnectionString;
                options.InstanceName = AppSettings.Redis.Instance;
            });
        }
        else
        {
            services.AddDistributedMemoryCache();
        }
        //更多的缓存实现方式
        

        //
        var cache = services.BuildServiceProvider().GetService<IDistributedCache>();
        if (cache != null) CacheHelper.Configure(cache);
        return services;
    }

}
```
:::
#### CacheHelper 缓存帮助类

::: details  CacheHelper

```csharp
/// <summary>
/// 缓存帮助类
/// </summary>
public static class CacheHelper
{
    private static IDistributedCache? _cache;

 
    private static IDistributedCache Cache
    {
        get
        {
            if (_cache == null) throw new NullReferenceException(nameof(Cache));
            return _cache;
        }
    }

    public const string KeySetCacheKey = "key_set";

    public static void Configure(IDistributedCache? cache)
    {
        if (_cache != null)
        {
            throw new Exception($"{nameof(Cache)}不可修改！");
        }
        _cache = cache ?? throw new ArgumentNullException(nameof(cache));
    }

    #region 缓存操作方法

    /// <summary>
    /// 异步获取缓存
    /// </summary>
    /// <param name="key"></param>
    /// <returns></returns>
    public static async Task<string?> GetAsync(string key)
    {
        var data = await Cache.GetAsync(key);
        return data != null ? Encoding.Unicode.GetString(data) : null;
    }


    /// <summary>
    /// 异步获取缓存
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="key"></param>
    /// <returns></returns>
    public static async Task<T?> GetObjectAsync<T>(string key)
    {
        var data = await Cache.GetAsync(key);
        if (data == null) return default;

        var json = Encoding.UTF8.GetString(data);
        return JsonConvert.DeserializeObject<T>(json);
    }


    /// <summary>
    /// 异步设置缓存
    /// </summary>
    /// <param name="key"></param>
    /// <param name="value"></param>
    /// <param name="options">各种设置，如过期时间、滑动过期时间等</param>
    /// <returns></returns>
    public static async Task SetAsync(string key, string value, DistributedCacheEntryOptions options=null)
    {
        var bytes = Encoding.Unicode.GetBytes(value);
        await Cache.SetAsync(key, bytes, options??new DistributedCacheEntryOptions()); 
    }


    /// <summary>
    /// 异步设置缓存
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="key"></param>
    /// <param name="value"></param>
    /// <param name="options"></param>
    /// <returns></returns>
    public static async Task SetObjectAsync<T>(string key, T value, DistributedCacheEntryOptions options =null)
    {
        var json = JsonConvert.SerializeObject(value);
        var bytes = Encoding.UTF8.GetBytes(json);
        await Cache.SetAsync(key, bytes, options??new DistributedCacheEntryOptions());
         
    }
 
    /// <summary>
    /// 异步删除缓存
    /// </summary>
    /// <param name="key"></param>
    /// <returns></returns>
    public static async Task RemoveAsync(string key)
    {
        await Cache.RemoveAsync(key);

        // 更新键集
        var keySet = await GetObjectAsync<HashSet<string>>(KeySetCacheKey);
        if (keySet != null && keySet.Remove(key))
        {
            await SetObjectAsync(KeySetCacheKey, keySet, new DistributedCacheEntryOptions());
        }
    }
     

 
    #endregion



    /// <summary>
    /// 示例，无作用
    /// </summary>
    /// <returns></returns>
    public static DistributedCacheEntryOptions GetDefaultCacheEntryOptions()
    {
        // 创建一个新的DistributedCacheEntryOptions实例
        var options = new DistributedCacheEntryOptions();

        // 设置绝对过期时间为1小时后
        options.SetAbsoluteExpiration(TimeSpan.FromHours(1));

        // 设置滑动过期时间为30分钟
        // 滑动过期时间是指如果在此时间间隔内访问了缓存项，则过期时间将重置
        options.SetSlidingExpiration(TimeSpan.FromMinutes(30));

        // 返回配置好的缓存项选项
        return options;
    }
}
```
:::

 

#### 使用示例

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

### 自定义接口方式

扩展比较方便，可以更好的使用第三方扩展包，更改的时候比较方便，可以支持更高级的功能
比如说获取全部缓存，获取指定前缀的key，可以方便的使用分布式锁，等等等



使用的缓存是内存缓存，redis缓存，用的是FreeRedis: https://github.com/2881099/FreeRedis

#### 配置文件
```
{
   "CacheConfigs": {
   "CacheType": "Redis", // Redis OR Memory 
   "RedisConnectionConfigs": [
     {
       "Host": "127.0.0.1:6379",
       "Ssl": false,
       "User": null,
       "Password": "123123",
       "Database": 4,
       "Prefix": "zhonghai.dev:"
     }
   ]
 }, 
}
```



中间件的注册
 
```csharp  

```

 


```csharp
 public void ConfigureServices(IServiceCollection services)
 {
     services.AddConfigurableOptions<CacheConfigsOptions>();// 注册配置选项
    
     var options = App.GetConfig<CacheConfigsOptions>("CacheConfigs");
     if (options != null && options.CacheType == "Redis")
     {
         services.AddSingleton(op =>
         {
             FreeRedis.RedisClient redisClient;

             if (options.RedisConnectionConfigs.Length == 1)
             {
                 redisClient = new FreeRedis.RedisClient(options.RedisConnectionConfigs[0]);
             }
             else
             {
                 redisClient = new FreeRedis.RedisClient(options.RedisConnectionConfigs);
             }

             redisClient.Serialize = obj => JsonConvert.SerializeObject(obj);
             redisClient.Deserialize = (json, type) => JsonConvert.DeserializeObject(json, type);
             //redisClient.Notice += (s, e) => Trace.WriteLine(e.Log);
             return redisClient;
         });
         services.AddSingleton<ICache, RedisCache>();
     }
     else
     {
         services.AddMemoryCache();
         services.AddSingleton<ICache, MemoryCache>();
     }
```


