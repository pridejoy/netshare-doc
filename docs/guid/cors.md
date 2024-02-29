# Core跨域

https://learn.microsoft.com/zh-cn/aspnet/core/security/cors


跨域问题是由浏览器的同源策略引起的。同源策略是一种安全机制，它限制了一个域下的网页脚本只能访问与其来源相同的资源。目的是保护用户的信息安全和隐私，防止恶意网站获取到其他网站的数据。具体来说，当一个网页尝试通过XMLHttpRequest或fetch等方式请求另一个域下的资源时，浏览器会对该请求进行限制，如果请求的目标域与当前域不同，则会出现跨域问题。
 

要解决跨域问题，常用的方法有以下几种：
1. JSONP：通过动态创建`<script>`标签，利用`src`属性实现跨域请求，但只支持GET请求。
2. CORS（跨域资源共享）：服务器端设置响应头中的Access-Control-Allow-Origin字段，允许指定的域进行跨域请求。
3. 代理服务器：在服务器端设置一个代理，将前端请求转发给目标域，而不是直接从浏览器发送跨域请求。
4. WebSocket：使用WebSocket协议进行通信，WebSocket协议并没有同源策略的限制。
5. Nginx <Badge type="danger" text="推荐" /> 




::: info
跨域问题只存在于浏览器环境中，对于服务器端来说不存在跨域问题。
:::

## 默认策略和中间件的CORS

```ts{21,3-11}
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

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

## 具有命名策略和中间件的 CORS



通常，在 UseCors 之前调用 UseStaticFiles。 使用 JavaScript 跨站点检索静态文件的应用必须在 UseStaticFiles 之前调用 UseCors。

## 使用属性启用 CORS

将不同的策略应用于具有 [EnableCors] 属性的控制器、页面模型或操作方法。 如果将 [EnableCors] 属性应用于控制器、页面模型或操作方法，并且在中间件中启用了 CORS，则会应用两种策略。 建议不要合并策略。 使用 [EnableCors]属性或中间件，两者不能位于同一应用中。



[DisableCors] 属性不会**禁用终结点路由**已启用的 CORS。