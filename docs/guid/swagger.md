# swagger

在新建webapi项目的时候勾选支持`OpenAPI`选项后就默认的启用了swagger

看代码高亮的地点

更多

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

```