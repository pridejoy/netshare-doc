
# 基础试题2

### 1. Redis的默认端口号，支持的数据类型，默认多少个数据库，有哪些持久化方式和区别

::: details 解答
Redis的默认端口号是6379。

它支持多种数据类型，包括字符串（strings）、列表（lists）、集合（sets）、有序集合（sorted sets）、散列（hashes）、位图（bitmaps）、超日志（hyperloglogs）和地理空间（geospatial）索引。

默认情况下，Redis有16个数据库，通过`SELECT`命令可以切换数据库

Redis的持久化方式主要有RDB快照和AOF日志两种。RDB是定时快照，AOF是记录每次写操作的日志。

RDB恢复速度快，但可能会丢失最后一次快照后的数据；AOF恢复速度慢，但数据丢失的风险小。
:::

### 2. EF性能调优的方式，EF的生命周期

::: details 解答
EF性能调优的方式包括：

使用.AsNoTracking()以避免跟踪查询结果，适用于只读查询。
使用.Include()预加载导航属性，减少数据库查询次数。
利用.Select()明确指定查询字段，避免加载不必要的数据。
使用参数化查询来防止SQL注入，同时提高性能。
合理使用.Where()进行条件过滤，避免在应用层进行数据过滤
:::

### 3. foreach和Foreach的区别

::: details 解答
在C#中，foreach是一个关键字，用于遍历集合或数组中的元素。它是一个只读循环，不能用于修改集合。

Foreach不是C#中的关键字，这里可能是指LINQ的ForEach方法，它是一个扩展方法，允许对序列中的每个元素执行委托。与foreach不同，使用ForEach可以在循环中修改集合。
:::

### 4. 依赖注入的理解，使用过的依赖注入框架

::: details 解答
依赖注入是一种设计模式，用于实现控制反转，允许将组件的依赖项在外部创建并注入，而不是在组件内部创建。常见的依赖注入框架包括.NET Core的内置DI容器、Unity、Autofac、Ninject等。
:::

### 5. 了解的设计模式

::: details 解答
常见的设计模式包括单例模式、工厂模式、观察者模式、策略模式、装饰者模式、适配器模式、代理模式等。
:::

### 6. 字符串拼接的方式，String是否可以被继承

::: details 解答
字符串拼接可以通过`+`运算符、`StringBuilder`类、`String.Format`、`string.Concat`等方式实现。

`String`类在.NET中是密封的，不可以被继承。
:::

### 7. 异步编程的理解，读取项目配置文件，序列化

::: details 解答
异步编程允许程序在等待操作完成时继续执行其他任务，提高性能。读取项目配置文件通常使用配置管理器或环境变量。序列化是将对象状态转换为可存储或传输的格式的过程，.NET中可以使用`JsonConvert`等库进行序列化。
:::

### 8. .NET Core和Standard类库的区别

::: details 解答
.NET Core是.NET平台的一个跨平台、高性能的实现，而Standard类库是.NET Core的一部分，定义了一组跨平台的API，确保不同.NET实现之间的一致性。
:::

### 9. JWT的原理和格式

::: details 解答
JWT（JSON Web Token）是一种基于JSON的对象，用于在网络应用环境间传递声明（claims）。它由三部分组成：Header（头部）、Payload（负载）和Signature（签名），通常用点`.`分隔。
:::

### 10. JS的数据类型，let的作用，两个等于号和三个等于号的区别

::: details 解答
JS的数据类型包括原始类型（如Undefined、Null、Boolean、Number、BigInt、String、Symbol）和对象类型。`let`用于声明块作用域的变量。`==`是等于运算符，会进行类型转换；`===`是严格等于运算符，不会进行类型转换。
:::

### 11. JS获取元素的方式

::: details 解答
JS中获取元素的方式包括`document.getElementById()`、`document.getElementsByClassName()`、`document.getElementsByTagName()`、`document.querySelector()`和`document.querySelectorAll()`等。
:::

### 12. Vue使用过的指令

::: details 解答
Vue中的指令包括`v-bind`、`v-model`、`v-if`、`v-for`、`v-on`、`v-slot`、`v-else-if`、`v-else`等。
:::

### 13. 分布式和负载均衡，消息队列

::: details 解答
分布式系统是一组计算机协同工作，提供服务和应用。负载均衡是将工作负载分散到多个服务器或资源上。消息队列用于在分布式系统中异步传递消息。
:::

### 14. 数据库三大范式，触发器索引，设计索引，数据类型区别

::: details 解答
数据库三大范式包括第一范式（1NF）、第二范式（2NF）和第三范式（3NF），用于确保数据库表的结构合理。触发器是数据库的事件处理机制，索引用于提高查询效率。设计索引时需要考虑字段的选择性、索引的类型和索引的维护成本。`nvarchar`和`varchar`是可变长度的字符串类型，`char`是固定长度的字符串类型。
:::
