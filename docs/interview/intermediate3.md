# 某公司.NET面试题

这些试题覆盖了从基础语法到设计模式、数据库操作、前端和后端开发等多个方面.

### 1. 简述 `Func` 与 `Action` 的区别？

::: details 解答
`Func` 和 `Action` 都是C#中的委托类型，但它们有一些关键的区别：

- `Action` 是一个不带返回值的委托，用于定义一个方法的签名，可以有多个参数。它主要用于表示一个操作或行为，例如：`Action<string>` 表示一个接受一个字符串参数的操作。

- `Func` 是一个带有返回值的委托，同样用于定义方法的签名，可以有多个参数，并且返回一个值。它类似于C#中的普通函数，例如：`Func<int, int, int>` 表示一个接受两个整数参数并返回一个整数的函数。
:::

### 2. 当使用 `new BB()` 创建 `BB` 的实例时，产生什么输出？

- 涉及构造函数、继承和多态性。

```csharp
public class AA
{
    public AA()
    {
        PrintFields();
    }
    public virtual void PrintFields()
    {
    }
}
public class BB : AA
{
    int x = 1;
    int y;
    public BB()
    {
        y = -1;
    }
    public override void PrintFields()
    {
        Console.WriteLine($"x={x},y={y}");
    }
}
```

::: details 解答

1. `BB` 类的构造函数 `BB()` 被调用。
2. 由于 `BB` 继承自 `AA`，它首先会调用基类 `AA` 的构造函数 `AA()`。
3. 在 `AA` 的构造函数中，调用 `PrintFields()` 方法。由于 `AA` 类中的 `PrintFields()` 是虚方法，它将调用 `BB` 类中重写的 `PrintFields()` 方法（即使 `AA` 的构造函数中没有明确地调用 `BB.PrintFields()`）。
4. `BB.PrintFields()` 方法执行，输出当前实例的字段 `x` 和 `y` 的值。

在这个例子中，`BB` 类的构造函数设置了 `y` 的值为 `-1`，而字段 `x` 被隐式初始化为 `0`（因为在 `BB` 类中没有对 `x` 的初始化）。因此，输出将是：

```
x=0,y=-1
```

:::

### 3. 以下代码输出什么？

```csharp
string str1 = "123" + "abc";
int a = 123;
string str2 = a + "abc";
string str3 = "123abc";
Console.WriteLine(str1 == str2);
Console.WriteLine(str1.Equals(str2));
Console.WriteLine(System.Object.ReferenceEquals(str1, str2));
Console.WriteLine(System.Object.ReferenceEquals(str1, str3));
```

::: details 解答
True
True
False
False
:::  

### 4. 写出 SQL 语句：取出表 A 中第 21 到第 30 记录 (SQL Server，以自动增长的 ID 作为主键，注意：ID 可能不是连续的)

::: details 解答

```sql
WITH RankedRecords AS (
    SELECT
        *,
        ROW_NUMBER() OVER (ORDER BY ID) AS RowNum
    FROM
        A
)
SELECT
    *
FROM
    RankedRecords
WHERE
    RowNum BETWEEN 21 AND 30;
```

这里的 `WITH` 语句定义了一个名为 `RankedRecords` 的公用表表达式（CTE），它为表 A 中的每条记录添加了一个行号。`ROW_NUMBER() OVER (ORDER BY ID)` 表示按照 ID 排序后为每行分配一个唯一的序号。然后外层的 `SELECT` 语句从这个 CTE 中选择序号在 21 到 30 之间的记录。

请注意，如果 ID 不是连续的，这种方法仍然有效，因为它依赖于行的顺序而不是 ID 的数值。如果您知道 ID 的范围或有其他排序要求，可以根据需要调整 `ORDER BY` 子句。
:::

### 5. 生成下列结果的 SQL 语句

- 涉及 SQL 的分组和条件计数。

```
2005-05-09 胜
2005-05-09 胜
2005-05-09 负
2005-05-09 负
2005-05-10 胜
2005-05-10 负
2005-05-10 负
如果要生成下列结果，该如何写sql语句？
胜 负
2005-05-09 2 2
2005-05-10 1 2
```

::: details 解答
SELECT
    DateField,
    SUM(CASE WHEN Result = '胜' THEN 1 ELSE 0 END) AS 胜,
    SUM(CASE WHEN Result = '负' THEN 1 ELSE 0 END) AS 负
FROM
    TableName
GROUP BY
    DateField
ORDER BY
    MIN(YourOtherField); -- 这里假设有一个其他字段用于排序，如果没有可以去掉 MIN 和 YourOtherField
:::

### 6. 简述 JavaScript 中的 `=`、`==`、`===` 的区别？

::: details 解答
在 JavaScript 中，赋值操作符和相等性比较操作符有不同的行为：

- `=`（单等号）是赋值操作符。它将右侧的值赋给左侧的变量。例如，`a = 5` 将变量 `a` 的值设置为 `5`。

- `==`（双等号）是抽象相等操作符。它比较两个值是否相等，但在比较之前会进行类型转换（如果需要）。这意味着如果两个值在转换为相同类型后内容相同，则 `==` 会返回 `true`。例如，`'5' == 5` 返回 `true`，因为字符串 `'5'` 被转换为了数字 `5`。

- `===`（三等号）是严格相等操作符。它比较两个值是否严格相等，包括它们的类型。如果两个值的类型不同或内容不同，则 `===` 返回 `false`。例如，`'5' === 5` 返回 `false`，因为一个是字符串类型，另一个是数字类型。

:::

### 7. 下面 JavaScript 代码输出什么？

```javascript
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func: this.foo=" + this.foo);
        console.log("outer func: self.foo=" + self.foo);
        var fn = function() {
            console.log("inner func: this.foo=" + this.foo);
            console.log("inner func: self.foo=" + self.foo);
        }
        var obj = { foo: "xyz" };
        fn.call(obj);
    }
};
myObject.func();
```

::: details 解答
这段代码定义了一个名为 `myObject` 的对象，它有两个属性：`foo` 和一个名为 `func` 的函数。`func` 函数内部定义了一个变量 `self` 引用 `this`（指向 `myObject`），然后输出 `this.foo` 和 `self.foo` 的值。接着定义了一个名为 `fn` 的内联函数，用来输出 `this.foo` 和 `self.foo` 的值。最后，创建了一个新对象 `obj` 并调用其上的 `fn` 函数，使用 `.call(obj)` 将 `obj` 设置为 `fn` 函数中的 `this` 上下文。

```
outer func: this.foo=bar  // this 指向 myObject，输出 myObject.foo 的值
outer func: self.foo=bar   // self 引用了 myObject，输出 myObject.foo 的值
inner func: this.foo=xyz   // 在 fn.call(obj) 中，this 被设置为 obj，输出 obj.foo 的值
inner func: self.foo=bar   // self 引用了 myObject，与 outer func 中的 self 相同，输出 myObject.foo 的值
```

:::

### 8. 简述 ASP.NET MVC 中的 `ViewData`, `ViewBag`, `TempData`, `Model`

::: details 解答
在 ASP.NET MVC 中，这些是用于在控制器和视图之间传递数据的机制：

- `ViewData`: 是一个字典对象，允许你存储键值对数据，可以在视图中访问这些数据。`ViewData` 的生命周期仅限于一次请求。

- `ViewBag`: 是 `ViewData` 的一个属性，它提供了一个动态类型的方式访问 `ViewData`。`ViewBag` 的属性可以通过表达式在视图中访问。

- `TempData`: 用于存储临时数据，通常用于在一个请求中设置数据并在下一个请求中使用。`TempData` 可以跨请求传递数据，但仅一次。

- `Model`: 是强类型的方式传递数据给视图。控制器将模型对象传递给视图，视图可以使用模型对象的属性和方法。
:::

### 9. 写一个 C# 单例模式创建的例子，考虑多线程访问

::: details 解答
在 C# 中，可以使用静态初始化或锁来创建线程安全的单例模式：

```csharp
public class Singleton
{
    private static Singleton instance;
    private static readonly object padlock = new object();

    private Singleton() { }

    public static Singleton Instance
    {
        get
        {
            if (instance == null)
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new Singleton();
                    }
                }
            }
            return instance;
        }
    }
}
```

在这个例子中，`Singleton` 类使用双重检查锁定模式来确保多线程环境下只创建一个实例。
:::

### 10. C# 中常数和只读变量的区别？

::: details 解答
C# 中的常数（使用 `const` 关键字）和只读变量（使用 `readonly` 关键字）都用于设置不可变的数据：

- `const`: 常数在编译时就已经确定，并且不能被修改。它们必须在声明时初始化。

- `readonly`: 只读变量在运行时初始化，可以在声明时或构造函数中设置，但之后不能被修改。
:::

### 11. 简述接口和抽象类的区别和应用场景？

::: details 解答
接口和抽象类都用于定义可以被子类实现或继承的契约：

- 接口定义了一组没有实现的方法和属性，它可以被任何类实现，一个类可以实现多个接口。

- 抽象类包含部分实现的方法和一定量的抽象成员，它用于定义一个类的基础框架，一个类只能继承一个抽象类。

接口适用于定义服务或行为的契约，而抽象类适用于定义一个家族类的共同特征。
:::

### 12. 什么是 C# 的静态扩展方法？可用代码举例说明

::: details 解答
静态扩展方法是在 C# 3.0 中引入的一个特性，允许为现有类型添加新的方法而不需要继承或修改原始类型：

```csharp
public static class StringExtensions
{
    public static int WordCount(this string str)
    {
        return str.Split(new char[] { ' ', '\t', '\n' }, StringSplitOptions.RemoveEmptyEntries).Length;
    }
}

// 使用扩展方法
int count = "Hello World".WordCount();
```

在这个例子中，`WordCount` 是一个扩展方法，它为 `string` 类型添加了一个新的方法来计算单词数量。
:::

### 13. 简述 .NET 的反射用途？

::: details 解答
反射是 .NET 框架提供的一个强大的机制，它允许程序在运行时查询和操作对象的类型信息：

- 动态创建类型的对象。
- 访问类型的属性和方法。
- 获取类型的成员信息，如字段、属性、构造函数等。
- 修改私有成员的访问权限。

反射广泛应用于序列化、反序列化、依赖注入框架、动态代理等场景。
:::

### 14. 什么是分布式系统中的幂等性？

::: details 解答
幂等性是指在分布式系统中，一个操作无论执行多少次，其结果都是相同的。换句话说，重复请求同一项操作不会对系统产生副作用。幂等性对于保证分布式系统的一致性和可靠性至关重要，特别是在网络请求可能会因为各种原因被重复发送的情况下。

例如，一个幂等的 HTTP GET 请求意味着多次请求相同的资源，服务器应该返回相同的响应，而不会导致资源状态的改变。
:::

<https://mp.weixin.qq.com/s/0wW8EwXaVr_h7rdRtiV7fg>
