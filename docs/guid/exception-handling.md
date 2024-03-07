# 异常处理

全局异常处理

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
