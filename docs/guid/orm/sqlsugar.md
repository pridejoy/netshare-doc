# SqlSugar

SqlSugar 是一个成熟、稳定且功能丰富的ORM框架，适合需要处理复杂数据库操作的.NET开发者使用。

- 零SQL ORM：提供完整的建表、索引和CRUD操作支持，允许开发者几乎不用编写SQL语句。
- 大数据支持：具备处理百万级数据写入、更新和查询的能力，提供分表等大数据解决方案。
- SAAS 应用支持：支持跨库查询、审计、租户分库分表以及数据隔离，适合多租户应用。
- 低代码+工作流：支持动态建类、建表，无实体多库兼容CRUD等，简化开发流程。
- 多种开发模式：支持DbFirst、CodeFirst和WebFirst三种开发模式，满足不同开发需求。
- 数据库兼容性：支持多种关系型数据库和时序数据库，包括MySQL、SQL Server、SQLite等，且易于切换数据库类型。
- 活跃社区：拥有活跃的线上论坛和技术支持，提供快速的问题解决和丰富的交流机会。
- 开源和免费：SqlSugar 承诺永久开源，文档免费，遵循MIT协议，适合商业项目使用。

 [文档地址：https://www.donet5.com](https://www.donet5.com/Home/Doc?typeId=1226)

## 简单使用

### 安装

 > <PackageReference Include="SqlSugarCore" Version="5.1.4.128" />

然后再在builder.Services中注入SqlsugarSetup。

使用的地方,先注入ISqlSugarClient，就按照文档方式直接实用就可以了

```csharp
public class MiniServiceController : ControllerBase
{
    private readonly ISqlSugarClient _db;

    public MiniServiceController(ISqlSugarClient db)
    {
        _db = db;
    }
}
```

## 注册服务

::: details 完整的注册服务代码

 ```csharp
// 添加sqlsugar
builder.Services.AddSqlsugarSetup();
```

完整的代码

```csharp
public static class SqlsugarSetup
{
    public static void AddSqlsugarSetup(this IServiceCollection services)
    {

        //注释这行，我是从本地文件读取的，下一行解除注释
        var ConnectionString = File.ReadAllText("D:\\db.txt");

        //数据库链接,修改配置里面的SqlServerConnection的字符串
        //var ConnectionString= AppSettings.GetValue("SqlServerConnection");

        var configConnection = new ConnectionConfig
        {
            DbType = SqlSugar.DbType.SqlServer,
            ConnectionString = ConnectionString,
            IsAutoCloseConnection = true,
            ConfigId = 1
        };

        Action<SqlSugarClient> sqlclient = db =>
        {
            // 文档地址：https://www.donet5.com/Home/Doc?typeId=1204
            db.Aop.OnLogExecuting = (sql, parameters) =>
            {
                var originColor = Console.ForegroundColor;
                if (sql.StartsWith("SELECT", StringComparison.OrdinalIgnoreCase))
                    Console.ForegroundColor = ConsoleColor.Green;
                if (sql.StartsWith("UPDATE", StringComparison.OrdinalIgnoreCase) || sql.StartsWith("INSERT", StringComparison.OrdinalIgnoreCase))
                    Console.ForegroundColor = ConsoleColor.Yellow;
                if (sql.StartsWith("DELETE", StringComparison.OrdinalIgnoreCase))
                    Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("【" + DateTime.Now + "——执行SQL】\r\n" + UtilMethods.GetSqlString(db.CurrentConnectionConfig.DbType, sql, parameters) + "\r\n");
                Console.ForegroundColor = originColor;               
            };
            db.Aop.OnError = ex =>
            {
                if (ex.Parametres == null) return;
                var originColor = Console.ForegroundColor;
                Console.ForegroundColor = ConsoleColor.DarkRed;
                var pars = db.Utilities.SerializeObject(((SugarParameter[])ex.Parametres).ToDictionary(it => it.ParameterName, it => it.Value));
                Console.ForegroundColor = originColor;
                Console.WriteLine("【" + DateTime.Now + "——执行SQL异常】\r\n" + pars +" \r\n");
            };         
        }; 
        //SqlSugarScope线程是安全的
        SqlSugarScope sqlSugar = new SqlSugarScope(configConnection, sqlclient);

        //这边是SqlSugarScope用AddSingleton
        services.AddSingleton<ISqlSugarClient>(sqlSugar);
    }

}
```

:::
