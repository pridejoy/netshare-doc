
# 随机试题1

### 笔试题

#### ASP.NET Core 中AOP的支持有哪些?

::: details 解答
AOP（面向切面编程）在ASP.NET Core中主要通过以下机制实现：

- **中间件（Middleware）**：用于处理HTTP请求和响应的管道。
- **过滤器（Filters）**：用于拦截控制器和操作的执行。
- **Action Invoker**：用于在执行Action之前或之后执行额外的逻辑。
:::

#### startup类的configservice方法有什么作用?

::: details 解答
`Startup` 类中的 `ConfigureServices` 方法用于配置应用程序的服务容器，可以注册应用程序所需的服务，并指定它们的生命周期。
:::

#### startup 类的configure方法有什么作用?

::: details 解答
`Startup` 类中的 `Configure` 方法用于设置请求处理管道，定义应用程序如何响应传入的HTTP请求，可以添加中间件组件，配置错误处理等。
:::

#### 依赖注入的服务生命周期有多少种，分别是?

::: details 解答
依赖注入的服务生命周期有三种，分别是：

- **瞬时（Transient）**：每次请求都会创建一个新的服务实例。
- **作用域（Scoped）**：在一个请求的作用域内，只创建一个服务实例。
- **单例（Singleton）**：在整个应用程序生命周期内，只创建一个服务实例。
:::

#### C#中什么是值类型与引用类型?

::: details 解答
C#中的值类型（Value Types）和引用类型（Reference Types）定义如下：

- **值类型**：存储在栈上，存储实际数据，包括简单类型（如 `int`, `float`）和结构体（`struct`）。
- **引用类型**：存储在堆上，存储对数据的引用，包括类（`class`）、接口（`interface`）、数组等。
:::

#### C#中参数传递ref与out 的区别?

::: details 解答
C#中的 `ref` 和 `out` 关键字用于按引用传递参数，它们的区别包括：

- `ref` 要求在传递之前变量必须被初始化。
- `out` 允许在传递之前变量未被初始化，并且在方法内部必须赋值。
:::

#### 分析下面代码，a、b的值是多少?

```csharp
string strTmp="al某某某";
int a = System.Text.Encoding.Default.GetBytes(strTmp).Length;
int b = strTmp.Length;
```

::: details 解答
变量 `a` 的值是字符串 `strTmp` 转换为字节数组的长度，取决于使用的编码。变量 `b` 的值是字符串 `strTmp` 的长度，即字符的数量。
:::

#### 什么是虚函数?什么是抽象函数?

::: details 解答

- **虚函数（Virtual Function）**：允许在派生类中被重写，使用 `virtual` 关键字声明。
- **抽象函数（Abstract Function）**：在抽象类中声明，没有实现，必须在派生类中实现，使用 `abstract` 关键字声明。
:::

#### 简述Func与Action 的区别?

::: details 解答

- `Func` 是一个泛型委托，可以有返回值。
- `Action` 也是一个泛型委托，但没有返回值。
:::

#### Redis支持哪几种数据类型?

::: details 解答
Redis 支持的数据类型包括：

- 字符串（String）
- 列表（List）
- 集合（Set）
- 有序集合（Sorted Set）
- 哈希（Hash）
- 位图（Bitmaps）
- 超日志（HyperLogLogs）
- 地理空间（Geospatial）
:::

#### 简单说RabbitMQ有哪些角色

::: details 解答
RabbitMQ 中的角色包括：

- **生产者（Producer）**：发送消息到交换机。
- **消费者（Consumer）**：从队列接收消息。
- **交换机（Exchange）**：根据路由规则将消息路由到队列。
- **队列（Queue）**：存储消息，等待消费者接收。
- **绑定（Binding）**：定义交换机和队列之间的关系。
:::

### 数据库SqlServer

#### 说说 drop、truncate、delete 区别

::: details 解答

- `DROP`：删除表结构及其数据，不可恢复。
- `TRUNCATE`：快速删除表中的所有行，保留表结构，通常用于带有外键的表。
- `DELETE`：删除表中满足条件的行，保留表结构，支持事务回滚。
:::

#### 试用SQL查询语句表达下列对教学数据库中三个基本表S、sC、C的查询

S(sno,sname,SAGE,SSEX)各字段表示学号，姓名，年龄，性别

Sc(sno,cno,grade)各字段表示学号，课程号，成绩、

C(cno,cname，TEACHER)各字段表示课程号，课程名和教怖名。其中SAGE、grade 是数值型，其他均为字符型。

##### 求年龄大于所有女同学年龄的男学生姓名和年龄

::: details 解答

```sql
SELECT sname, SAGE
FROM S
WHERE SSEX = '男' AND SAGE > (SELECT MAX(SAGE) FROM S WHERE SSEX = '女');
```

:::

##### 统计有学生选修的课程门数

::: details 解答

```sql
SELECT COUNT(DISTINCT cno)
FROM Sc;
```

:::

##### 在基本表SC中删除尚无成绩的选课元组

::: details 解答

```sql
DELETE FROM Sc
WHERE grade IS NULL;
```

:::
