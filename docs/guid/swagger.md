# 统一规范化接口处理/swagger

## 统一规范化接口处理

RESTful API：REST（Representational State Transfer）是一种基于 HTTP 协议的网络应用程序的架构风格。RESTful API 是一种设计风格，用于创建具有统一接口的 Web 服务。通过定义资源（资源的 URL）、操作（HTTP 方法）和表示（数据格式），RESTful API 提供了一种简单而有效的方法来处理接口请求。

### 方式一

使用方式: https://www.cnblogs.com/wucy/p/16124449.html


::: details  ApiResult
 

```csharp
 /// <summary>
/// 统一返回结果处理
/// </summary>
public class ApiResult<T>
{
    /// <summary>
    /// 状态结果
    /// </summary>
    public ResultCode Status { get; set; } = ResultCode.Success;


    private string? _msg;

    /// <summary>
    /// 消息描述
    /// </summary>
    public string? Message
    {
        get
        {
            return !string.IsNullOrEmpty(_msg) ? _msg : EnumHelper.GetDescription(Status);
        }
        set
        {
            _msg = value;
        }
    }

    /// <summary>
    /// 返回结果
    /// </summary>
    public T Data { get; set; }


    /// <summary>
    /// 成功状态返回结果
    /// </summary>
    /// <param name="result">返回的数据</param>
    /// <returns></returns>
    public static ApiResult<T> SuccessResult(T data)
    {
        return new ApiResult<T> { Status = ResultCode.Success, Data = data };
    }

    /// <summary>
    /// 失败状态返回结果
    /// </summary>
    /// <param name="code">状态码</param>
    /// <param name="msg">失败信息</param>
    /// <returns></returns>
    public static ApiResult<T> FailResult(string? msg = null)
    {
        return new ApiResult<T> { Status = ResultCode.Fail, Message = msg };
    }

    /// <summary>
    /// 异常状态返回结果
    /// </summary>
    /// <param name="code">状态码</param>
    /// <param name="msg">异常信息</param>
    /// <returns></returns>
    public static ApiResult<T> ErrorResult(string? msg = null)
    {
        return new ApiResult<T> { Status = ResultCode.Error, Message = msg };
    }

    /// <summary>
    /// 自定义状态返回结果
    /// </summary>
    /// <param name="status"></param>
    /// <param name="result"></param>
    /// <returns></returns>
    public static ApiResult<T> Result(ResultCode status, T data, string? msg = null)
    {
        return new ApiResult<T> { Status = status, Data = data, Message = msg };
    }
}

/// <summary>
/// 定义具体的返回状态码
/// </summary>
public enum ResultCode
{
    [Description("请求成功")]
    Success = 1,
    [Description("请求失败")]
    Fail = 0,
    [Description("请求异常")]
    Error = -1
}
```  
:::


::: details   ApiControllerBase
 
所有的接口继承ApiControllerBase
```csharp
 [ApiController]
[Route("api/[controller]")]
[Authorize]
public class ApiControllerBase : ControllerBase
{

    /// <summary>
    /// 成功状态返回结果
    /// </summary>
    /// <param name="result">返回的数据</param>
    /// <returns></returns>
    protected ApiResult<T> SuccessResult<T>(T result)
    {
        return ApiResult<T>.SuccessResult(result);
    }

    /// <summary>
    /// 失败状态返回结果
    /// </summary>
    /// <param name="code">状态码</param>
    /// <param name="msg">失败信息</param>
    /// <returns></returns>
    protected ApiResult<T> FailResult<T>(string? msg = null)
    {
        return ApiResult<T>.FailResult(msg);
    }

    /// <summary>
    /// 异常状态返回结果
    /// </summary>
    /// <param name="code">状态码</param>
    /// <param name="msg">异常信息</param>
    /// <returns></returns>
    protected ApiResult<T> ErrorResult<T>(string? msg = null)
    {
        return ApiResult<T>.ErrorResult(msg);
    }

    /// <summary>
    /// 自定义状态返回结果
    /// </summary>
    /// <param name="status"></param>
    /// <param name="result"></param>
    /// <returns></returns>
    protected ApiResult<T> Result<T>(ResultCode status, T result, string? msg = null)
    {
        return ApiResult<T>.Result(status, result, msg);
    }
}
```  
:::

::: details   调用的方式

```csharp
 public class WeatherForecastController : ApiControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };
 
    [HttpGet("getall")]
    public ApiResult<IEnumerable<WeatherForecast>> GetAll2()
    {
        var datas = Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        });
        return SuccessResult(datas);
    }

    [HttpGet("error")]
    public async Task<ApiResult<string>> GetAll23()
    {
        return ErrorResult<string>("shibai11");
    }
}
```
:::

::: details   异常的处理

注册中间件
``` csharp
builder.Services.AddControllers(options => {
          options.Filters.Add<GlobalExceptionFilter>();
)
```

异常的中间件
```csharp


  public class GlobalExceptionFilter : IExceptionFilter
 {
     private readonly ILogger<GlobalExceptionFilter> _logger;
     public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger)
     {
         _logger = logger;
     }

     public void OnException(ExceptionContext context)
     {
         //异常返回结果包装
         var rspResult = ApiResult<object>.ErrorResult(context.Exception.Message);
         //日志记录
         _logger.LogError(context.Exception, context.Exception.Message);
         context.ExceptionHandled = true;
         context.Result = new InternalServerErrorObjectResult(rspResult);
     }

     public class InternalServerErrorObjectResult : ObjectResult
     {
         public InternalServerErrorObjectResult(object value) : base(value)
         {
             StatusCode = StatusCodes.Status500InternalServerError;
         }
     }
 }
```
:::

 
### 方式二

## SwaggerSetup

::: details SwaggerSetup 完整的注入方式

还需要再管道中添加`builder.Services.AddSwaggerSetup();`

SwaggerSetup的主要作用是swagger显示文档注释，显示小锁，以及接入Jwt认证,将token传递到后台。

```csharp
public static IServiceCollection AddSwaggerSetup(this IServiceCollection services)
{

    // 默认配置
    Action<SwaggerGenOptions> defaultSetupAction = options =>
    {
        var basePath = AppContext.BaseDirectory;

        options.SwaggerDoc("v1",
            new OpenApiInfo
            {
                Title = "在线接口文档",
                Version = "v1"
            });

        // 获取根目录下，所有 xml 完整路径（注：并不会获取二级目录下的文件）
        var directoryInfo = new DirectoryInfo(basePath);
        List<string> xmls = directoryInfo
            .GetFiles()
            .Where(f => f.Name.ToLower().EndsWith(".xml"))
            .Select(f => f.FullName)
            .ToList();

        // 添加注释文档
        foreach (var xml in xmls)
        {
            options.IncludeXmlComments(xml, true);
        }

        //在 Swagger UI 中显示相应的安全要求信息（api有"Authorize" 特性，加上小锁）
        options.OperationFilter<SecurityRequirementsOperationFilter>();

        // api有"Authorize" 特性， header中添加 token 传递到后台
        options.OperationFilter<AuthenticationOperationFilter>();

        // 接入Jwt认证，swagger右上角加上手动可以添加token的按钮
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Scheme = "Bearer",
            BearerFormat = "JWT",
            Description = "在下面输入框输入Token,不用输入Bearer[空格] ",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http
        });


    };

    // 注册 Swagger 并添加默认配置
    services.AddSwaggerGen(defaultSetupAction);

    // 如果有自定义配置
    //if (setupAction != null) services.Configure(setupAction);

    return services;
}
```

:::


::: details 完整的AuthenticationOperationFilter

代码的主要作用就是将所有api或者控制器带有 "Authorize" 特性 ，讲token添加到header中

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

public class AuthenticationOperationFilter : IOperationFilter
{ 
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var actionAttributes = context.MethodInfo.GetCustomAttributes(true);
        var declaringTypeAttributes = context.MethodInfo.DeclaringType?.GetCustomAttributes(true);

        if (declaringTypeAttributes != null)
        {
            actionAttributes = actionAttributes.Concat(declaringTypeAttributes).ToArray();
        }

        var authorizeAttributes = actionAttributes.OfType<AuthorizeAttribute>();
        //
        if (authorizeAttributes.Any())
        {
            //operation.Responses.Add("401", new OpenApiResponse { Description = "Unauthorized" });
            //operation.Responses.Add("403", new OpenApiResponse { Description = "Forbidden" });
            var bearerScheme = new OpenApiSecurityScheme
            {
                Scheme = "Bearer",
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            };
            operation.Security = new List<OpenApiSecurityRequirement>
            {
                new OpenApiSecurityRequirement()
                {
                    [ bearerScheme ] = Array.Empty<string>()
                }
            };
        }
    }
}
```
:::

## Other

[Swagger与容易忽视的属性](https://mp.weixin.qq.com/s/Xke2EyUHuxR_RdHbSXP5Ew)

 
::: details UseSwaggerUI其他属性
 
 
```csharp
app.UseSwaggerUI(c =>
{
    //指定Swagger JSON文件的终结点，用于加载和显示API文档。
    //需要提供JSON文件的URL和一个可识别的名称
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    //指定swagger文档的启动目录 。默认为swagger
    //可以通过设置为空字符串来让Swagger UI直接在根路径下进行访问
    //c.RoutePrefix = string.Empty;

    //设置默认的接口文档展开方式，可选值包括None、List和Full。
    //默认值为None，表示不展开接口文档；
    //List表示只展开接口列表；
    //Full表示展开所有接口详情
    c.DocExpansion(DocExpansion.None); // 设置为完整模式 
    c.DisplayRequestDuration();   // 显示请求耗时
    c.EnablePersistAuthorization(); // 记住授权信息

});
```
:::