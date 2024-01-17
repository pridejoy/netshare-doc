# 选项


## 使用

依赖注入容器中注册服务
```
// 添加静态文件读取
builder.Services.AddSingleton(new AppSettings(builder.Configuration));
```

在全局使用读取的静态文件

```
AppSettings.AllowCors
```



## AppSettings方法

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