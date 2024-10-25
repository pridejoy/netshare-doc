# 安全授权鉴权

资源授权访问是针对特定人群提供优质服务的最佳保障。

## 关于授权

授权是指确定用户可执行的操作的过程。 例如，允许管理用户创建文档库、添加文档、编辑文档和删除文档。 使用库的非管理用户仅获得读取文档的权限。

## 关于身份验证

身份验证是确定用户身份的过程。 授权是确定用户是否有权访问资源的过程。

授权与身份验证相互独立。 但是，授权需要一种身份验证机制。 身份验证是认定用户的过程。 身份验证可为当前用户创建一个或多个标识。

## 授权几种方式

不同的应用系统中，授权方式也有不同的方式，但无外乎以下几种：

- HTTP Basic Authentication 。
- 基于角色授权，资源和角色绑定，角色和用户绑定。
- 基于策略授权，通过配置策略对资源进行控制
- 基于令牌的授权, 通过令牌（如JWT）进行身份验证和权限验证，适合分布式系统。
- OAuth（开放授权）,主流的方式
- 自定义授权方式(GUID Token)

## BA简单授权

asp.net core 中的AuthorizeAttribute授权通过属性及其各种参数进行控制。

最简单的情况是， AuthorizeAttribute将属性应用于控制器或操作会将控制器或操作的访问权限限制为任何经过身份验证的用户。

例如，以下代码将访问权限限制为任何AccountController经过身份验证的用户。

```csharp
[Authorize]
public class AccountController : Controller
{
    [AllowAnonymous]
    public ActionResult Login()
    {
    }

    [Authorize]
    public ActionResult Logout()
    {
    }
}

```

## 角色授权

角色授权目前是应用系统中最为常用的一种方式，将资源和角色绑定到一起，然后为用户分配特定的角色，这样用户就可以访问他所拥有的角色的资源权限了。

RBAC（Role-Based Access Control，基于角色的访问控制），就是用户通过角色与权限进行关联。简单地说，一个用户拥有若干角色，每一个角色拥有若干权限。这样，就构造成“用户-角色-权限”的授权模型。

>在这种模型中，用户与角色之间，角色与权限之间，一般都是多对多的关系。

::: tip
`[AllowAnonymous]`跳过所有授权语句。 如果组合 `[AllowAnonymous]`和任何` [Authorize] `属性，则 `[Authorize]`忽略属性。 例如，如果在控制器`[AllowAnonymous]`级别应用，则会忽略 `[Authorize]` 同一控制器（或其中的任何操作）上的任何属性。
:::

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

### 3.使用jwt获取用户信息

```
HttpContext?.User.FindFirst("asd").Value.ToString()
```

上面的角色授权的缺点在哪里呢，最大的缺点就是角色要提前写死到方法上，如果要修改只能改代码，明显很麻烦，实际项目中权限都是根据配置修改的，

所以就要用到自定义策略授权了。

### 自定义策略授权

更新中....

### GuidToken认证

更新中....

## 补充说明

概念解释:[老张的哲学博客](https://www.cnblogs.com/laozhang-is-phi/p/9511869.html)
[鉴权的正确方式](https://www.cnblogs.com/wei325/p/15575141.html)


更多相关资料可查阅[官方文档](https://learn.microsoft.com/zh-cn/aspnet/core/security/?view=aspnetcore-8.0)。
