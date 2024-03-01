# 统一规范化接口处理/swagger

## 统一规范化接口处理

更新中

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