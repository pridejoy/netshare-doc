# 统一规范化接口处理/swagger

## 统一规范化接口处理

更新中

## swagger

在新建webapi项目的时候勾选支持`OpenAPI`选项后就默认的启用了swagger

> 安装 Swashbuckle.AspNetCore

```ts{10,17-18}
public static void Main(string[] args)
{
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
}
```

## swagger完整注入

[Swagger与容易忽视的属性](https://mp.weixin.qq.com/s/Xke2EyUHuxR_RdHbSXP5Ew)

```
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