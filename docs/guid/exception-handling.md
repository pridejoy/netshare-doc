# 异常处理

## 全局异常处理

```
    /// <summary>
    /// 全局异常处理
    /// </summary>
    public class LogExceptionHandler : IGlobalExceptionHandler, ISingleton
    {
   
        public async Task OnExceptionAsync(ExceptionContext context)
        {
            var userContext = App.User;
            var ex =  new 
            {
                Account = userContext?.FindFirstValue(ClaimConst.CLAINM_ACCOUNT),
                Name = userContext?.FindFirstValue(ClaimConst.CLAINM_NAME),
                ClassName = context.Exception.TargetSite.DeclaringType?.FullName,
                MethodName = context.Exception.TargetSite.Name,
                ExceptionName = context.Exception.Message,
                ExceptionMsg = context.Exception.Message,
                ExceptionSource = context.Exception.Source,
                StackTrace = context.Exception.StackTrace,
                ParamsObj = context.Exception.TargetSite.GetParameters().ToString(),
                ExceptionTime = DateTime.Now
            }
            Log.Error(ex);
        }
    }
```