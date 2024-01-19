# SqlSugar



文档地址:https://www.donet5.com/Home/Doc

## 简单使用

### 安装

 > <PackageReference Include="SqlSugarCore" Version="5.1.4.128" />

然后再在builder.Services中注入SqlsugarSetup。

使用的地方,先注入ISqlSugarClient，就按照文档方式直接实用就可以了

```
public class MiniServiceController : ControllerBase
{
    private readonly ISqlSugarClient _db;

    public MiniServiceController(ISqlSugarClient db)
    {
        _db = db;
    }
}
```

## SqlsugarSetup
```
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

后续会添加EF或者其他Orm的文档