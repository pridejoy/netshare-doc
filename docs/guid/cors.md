# 跨域处理

如果系统之间需要交互通常需要进行特殊的配置才能够通讯。

## 什么是跨域

浏览器安全性可防止网页向不处理网页的域发送请求。 此限制称为同域策略 。 同域策略可防止恶意站点从另一站点读取敏感数据。 有时，你可能想要允许其他站点对你的应用进行跨域请求。这就是跨域。

## 怎么解决跨域

要解决跨域问题，常用的方法有以下几种：

- JSONP：通过动态创建`<script>`标签，利用`src`属性实现跨域请求，但只支持GET请求。
- CORS（跨域资源共享）：服务器端设置响应头中的Access-Control-Allow-Origin字段，允许指定的域进行跨域请求。
- 代理服务器：在服务器端设置一个代理，将前端请求转发给目标域，而不是直接从浏览器发送跨域请求。
- WebSocket：使用WebSocket协议进行通信，WebSocket协议并没有同源策略的限制。
- Nginx <Badge type="danger" text="推荐" />

::: info
跨域问题只存在于浏览器环境中，对于服务器端来说不存在跨域问题。
:::

## 在AspNetCore中解决

### 启用默认策略和中间件的CORS

```csharp{18-19,3-11}
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins("http://example.com", "http://www.contoso.com")
                  .AllowAnyHeader()
                  .AllowAnyMethod();;
        });
});

builder.Services.AddControllers();
//启用服务
var app = builder.Build(); 
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(); 
app.UseAuthorization(); 
app.MapControllers(); 
app.Run();
```

通常，在 UseCors 之前调用 UseStaticFiles。

使用 JavaScript 跨站点检索静态文件的应用必须在 UseStaticFiles 之前调用 UseCors。

## 使用属性启用 CORS

将不同的策略应用于具有 [EnableCors] 属性的控制器、页面模型或操作方法。 如果将 [EnableCors] 属性应用于控制器、页面模型或操作方法，并且在中间件中启用了 CORS，则会应用两种策略。 建议不要合并策略。 使用 [EnableCors]属性或中间件，两者不能位于同一应用中。

[DisableCors] 属性不会**禁用终结点路由**已启用的 CORS。

更多跨域相关知识可查看[官方文档](https://learn.microsoft.com/zh-cn/aspnet/core/security/cors)。
