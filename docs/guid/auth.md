# 安全鉴权

https://learn.microsoft.com/zh-cn/aspnet/core/security/?view=aspnetcore-8.0

### 身份验证 vs授权
身份验证是这样一个过程：由用户提供凭据，然后将其与存储在操作系统、数据库、应用或资源中的凭据进行比较。 在授权过程中，如果凭据匹配，则用户身份验证成功，可执行已向其授权的操作。 授权指判断允许用户执行的操作的过程。

也可以将身份验证理解为进入空间（例如服务器、数据库、应用或资源）的一种方式，而授权是用户可以对该空间（服务器、数据库或应用）内的哪些对象执行哪些操作。

::: tip
身份验证是确定用户身份的过程。 授权是确定用户是否有权访问资源的过程。
:::


在 ASP.NET Core 中，身份验证由身份验证服务 IAuthenticationService 负责，而它供身份验证中间件使用。 身份验证服务会使用已注册的身份验证处理程序来完成与身份验证相关的操作。 与身份验证相关的操作示例包括：

## jwt身份验证

JWT（JSON Web Token）是一种开放标准（RFC 7519），定义了一种简洁但自包含的方式，用于在各方之间传递信息。JWT通常用于在用户和服务器之间传递身份信息，以便进行认证和授权。

JWT由三部分组成：头部（Header）、载荷（Payload）和签名（Signature）。头部通常包含了令牌的类型（即JWT）和所使用的加密算法。载荷包含了要传输的信息，比如用户ID、角色等。签名则由头部、载荷以及一个密钥生成，用于验证令牌的完整性和真实性。

### 1.开启swagger中JWT服务
 
关于Swagger设置具体可参考 [开启JWT](./swagger.html#swaggersetup)的步骤，里面有详细步骤注释。

### 2.添加JWT认证的服务注册并启用
 
 ```csharp{2,4}
 var builder = WebApplication.CreateBuilder(args);
 builder.Services.AddJwtSetup();
 var app = builder.Build();
 app.UseAuthorization();
 app.MapControllers();
 app.Run();
 ```

当控制器或者api有`[Authorize]`特性的时候，就需要获取使用token进行验证。
`[AllowAnonymous]`特性可取消身份验证

 ::: details AddJwtSetup 完整的注册服务代码
 ```csharp
 using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text; 

public static class JwtSetup
{
    /// <summary>
    /// 添加jwt认证
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentNullException"></exception>
    public static IServiceCollection AddJwtSetup(this IServiceCollection services)
    {
        if (services == null) throw new ArgumentNullException(nameof(services));

        // 读取配置
        var symmetricKeyAsBase64 = AppSettings.Jwt.SecretKey;
        var issuer = AppSettings.Jwt.Issuer;
        var audience = AppSettings.Jwt.Audience;

        // 获取密钥
        var keyByteArray = Encoding.UTF8.GetBytes(symmetricKeyAsBase64);
        var signingKey = new SymmetricSecurityKey(keyByteArray);
        var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        // 令牌验证参数
        var tokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuerSigningKey = true, // 是否验证SecurityKey 
            ValidateIssuer = true, // 是否验证Issuer 
            ValidateAudience = true, // 是否验证Audience
            ValidateLifetime = true, // 是否验证失效时间
            ClockSkew = TimeSpan.FromSeconds(30), // 过期时间容错值，解决服务器端时间不同步问题（秒）
            RequireExpirationTime = true,
            IssuerSigningKey = signingKey, // 拿到SecurityKey  指定用于签名验证的密钥
            ValidIssuer = issuer, // 发行人Issuer  指定发行者
            ValidAudience = audience, // 订阅人Audience 指定受众
        };

        // events
        var jwtBearerEvents = new JwtBearerEvents()
        {
            OnChallenge = async context =>
            {
                // refresh token

                // 
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync("401");

                // 标识处理了响应
                context.HandleResponse();

            },
            OnForbidden = async context =>
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync("403");
            }
        };

        //添加身份验证
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).
        AddJwtBearer(options =>
        {
            options.TokenValidationParameters = tokenValidationParameters;
            options.Events = jwtBearerEvents;
        });

        return services;
    }
}
```
:::

## 鉴权
上面的角色授权的缺点在哪里呢，最大的缺点就是角色要提前写死到方法上，如果要修改只能改代码，明显很麻烦，实际项目中权限都是根据配置修改的，

所以就要用到自定义策略授权了。



### 自定义策略授权



## 补充说明

概念解释:[老张的哲学博客](https://www.cnblogs.com/laozhang-is-phi/p/9511869.html)
[鉴权的正确方式](https://www.cnblogs.com/wei325/p/15575141.html)