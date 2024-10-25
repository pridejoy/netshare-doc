# 异常处理

正确的处理异常和管理异常信息是后续问题追踪的好帮手。

## 关于异常

异常一般是指运行期（此处特指Exception类）会发生的导致程序意外中止的问题，是一种对问题的描述后的封装对象。

在过去开发中，通常异常由系统运行时出错抛出，但现在的开发过程中，我们应在程序开发中合理的抛出异常，比如更新一条不存在的实体，或查询一个不存在的数据等等。

## 异常处理几种方式

- 不处理，直接中断程序执行（不推荐）
- 通过 try catch finally 处理（不推荐）
- 全局统一处理，并记录异常信息（推荐）
- 异常注解方式处理（推荐）

## 全局异常处理

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
