
# .Net知识技能大全

> [!TIP]
> 涵盖了C#语言基础，包括运算符、语句块、类修饰符、预处理指令，深入探讨了委托、泛型、Linq、迭代器、反射等高级特性，同时覆盖了常用类和接口、数据访问技术如ADO.NET、ORM框架、异步编程、多线程处理、数据结构与算法，以及ASP.NET Mvc框架、AOP、元数据、验证、过滤器等Web开发核心概念，还包括数据库技术、面向服务架构、RESTful服务、微服务、JSON-RPC、面向对象编程、设计模式、软件架构、前端技术、信息安全、代码管理、分布式系统、Web安全、日志记录、搜索引擎、工作流引擎等多个领域的知识点，是一个全面的.Net开发技能资源库。

### C#常见运算符

- 一元运算符（+、-、!、~、++、--）
- 算术运算符（*、/、%、+、 – ）
- 移位运算符（<< 、>> ）
- 关系和类型测试运算符（==、!=、<、>、<=、>=、is 和 as）
- 逻辑运算符（&、^ 和 | ）
- 条件逻辑运算符（&& 和 || ）
- 空合并运算符（??）条件运算符（它也称为三元运算符，?: ）
- 赋值运算符（=、+=、-=、!=、/=、&=、|=）

### C#常见语句块

- Try（用于捕捉在块的执行期间发生的各种异常）
- Checked 语句和 Unchecked（用于控制整型算术运算和转换的溢出检查上下文）
- Lock（获取某个给定对象的互斥锁，执行一个语句，然后释放该锁）
- Using(获取一个或多个资源，执行一个语句，然后释放该资源)

### C#常见类修饰符

- abstract抽象类
- sealed密封类
- static静态类
- partial分部修饰
- 访问修饰符（public、protected、internal 和 private ）

### C#常用预处理指令

- `#region`：指定一个可展开或折叠的代码块
- `#endregion`：它标识着 #region 块的结束
- `#define`： 它用于定义一系列成为符号的字符
- `#undef`：它用于取消定义符号
- `#if`、`#else`、`#elif`、`#endif`：用于创建复合条件指令

### 委托

- Delegate、Lambda、Action、Func、Predicate、事件EventArgs

### 泛型

- 泛型类、泛型方法、泛型约束、泛型接口、逆变与协变

### Linq

- Linq to sql / Linq to DataSet / Linq to Object / Linq to Xml
- 迭代器yield与懒加载Lazy

### 反射

- 反射拼接SQL语句、反射转换Json/Datatable...、序列化反序列化（ISerializable）、反射动态调用dll、反射动态配置扩展

### 常用类

- IO类、Json.NET、Http辅助类（HttpClient、Restsharp、WebClient、WebRequest）、爬虫类、文件压缩类、条形码 、金额、时间、Assembly等类的实现

### 常用接口掌握

- IEnumerable
- IEnumerator
  - 实现Foreach

- ICollection
- IList
  - 集合

- IComparable
- IComparer
  - 实现比较方法

- IDictionary
  - 键值对

- IDisposable
  - 释放非托管资源

### 数据层

- 原生的ADO.NET
  - Connections. 用于连接和管理针对数据库的事务。
  - Commands. 用于发出针对数据库的SQL指令。
  - DataReaders. 用于从SQL Server数据源读取只进流的数据记录。
  - DataSets. 用于针对结构型数据，XML数据和关系型数据的存储，远程处理和编程。
  - DataAdapters. 用于推送数据到DataSet，并针对数据库协调数据。
  - ...

- ORM框架
  - EF
  - Dapper：最常见的轻量级ORM框架（开源）
  - Nhibernate：最常见的重量级ORM框架
  - ...

### 异步和多线程

- Thread/ThreadPool/Task/Await/Async/Parallel...
  - 多线程
    - 多线程中的同步、并发、异常等处理
    - ...

  - TPL异步
    - 异步编程模型(APM)
    - 基于事件的异步模式(EAP)
    - ...

### 数据结构

- 算法
- 线性表
- 二叉树
- 栈与队列
- ...

### ASP.NET Mvc框架

- Routing路由
- Binding模型绑定
  - new ChildActionValueProviderFactory(),
  - new FormValueProviderFactory(),
  - new JsonValueProviderFactory(),
  - new RouteDataValueProviderFactory(),
  - new QueryStringValueProviderFactory(),
  - new HttpFileCollectionValueProviderFactory()
  - ...

- AOP面向切面（常用特性(Attribute)及自定义特性）
  - 元数据
  - 验证基类System.ComponentModel.DataAnnotations.ValidationAttribute
    - System.ComponentModel.DataAnnotations.CompareAttribute
    - System.ComponentModel.DataAnnotations.CustomValidationAttribute
    - System.ComponentModel.DataAnnotations.DataTypeAttribute
    - System.ComponentModel.DataAnnotations.MaxLengthAttribute
    - System.ComponentModel.DataAnnotations.MinLengthAttribute
    - System.ComponentModel.DataAnnotations.RangeAttribute
    - System.ComponentModel.DataAnnotations.RegularExpressionAttribute
    - System.ComponentModel.DataAnnotations.RequiredAttribute
    - System.ComponentModel.DataAnnotations.StringLengthAttribute
    - System.Web.Security.MembershipPasswordAttribute

  - Filter
    - IAuthenticationFilter(验证过滤器 MVC5)验证是否合理请求，是否合理用户
    - IAuthorizationFilter(授权过滤器)
      - AuthorizeAttribute
      - RequireHttpsAttribute
      - ValidateAntiForgeryTokenAttribute
      - ChildActionOnlyAttribute
      - ...
    - IActionFilter(动作过滤器-前-后)
      - ActionFilterAttribute
      - ...
    - IResultFilter(结果过滤器-前-后)
      - ActionFilterAttribute
      - ...
    - IExceptionFilter(例外过滤器)
      - HandleErrorAttribute(在FilterConfig就已被注册)
      - ...

- RazorViewEngine视图引擎
- WebApi

### 数据库技术

- 数据库服务端、客户端、图形界面管理工具、数据库语言（PL-sql,T-sql,sql）、数据库安全等概念
- 视图、存储过程、游标、中间表、触发器、计划任务等常用技术
- 数据库分库、拆表、分布式、集群、备份、故障调控等方案
- 数据库三大范式与反范式
- RBAC（Role-Based Access Control，基于角色的访问控制）权限模型
- 数据库机制
  - 索引
  - 存储引擎
  - 事务
    - 四大特性(ACID)
      - 原子性 Atomicity
      - 一致性 Consistency
      - 隔离性 Isolation
      - 持续性 Durability
    - 并发产生的问题
      - 脏读
      - 幻读
      - 不可重复读
      - ...
    - 解决方案—隔离级别
      - 读未提交Read uncommitted
      - 读已提交Read committed (mssql、oracle)
      - 可重复读Repeatable read（mysql）
      - 串行化Serializable
  - 锁机制
    - 种类
    - 粒度
    - 加锁方式
    - ...

- 数据库辅助工具：Power Designer、EZDML、ER Studio、Rose、Microsoft Visio...

### 关系型数据库

- Oracle
  - 最贵，功能最多，不开源，最安全...

- Mysql
  - 免费，功能一般，开源，相对不安全...

- MsSql(SqlServer)
  - 中等贵，支持平台最少，不开源，使用最方便...

- PostgreSQL
  - 与其他关系型数据库相比，PostgreSQL独特的地方是它支持高度需要的、完整的面向对象以及关系型数据库的功能

- Sqlite
  - 一个自包含的、基于文件的数据库，可移植性非常好

- ...

### 非关系型数据库(Nosql-Not Only Sql)

- MongoDb：是一个基于分布式文件存储的数据库
- Hbase：属于hadoop(分布式系统)生态圈的组件，能存储海量数据
- Cassandra：优异的列式存储NoSQL
- Redis：基于内存的数据存储系统，支持多种类型存储，适用于高并发场合
- Memcache：基于内存的数据存储系统，高性能分布式内存缓存服务，适用于高并发场合
- ...

### 面向服务架构SOA

- 通过服务整合来解决系统集成的一种思想
- WSDL
  - Web Services Description Language是一个用来描述Web服务和说明如何与Web服务通信的XML语言。为用户提供详细的接口说明书

- UDDI
  - Universal Description，Discovery and Integration统一描述、发现和集成, 提供一种发布和查找服务描述的方法。UDDI 数据实体提供对定义业务和服务信息的支持。

- SOAP
  - Simple Object AccessProtocol，简单对象访问协议，基于XML 和 HTTP 用于在应用程序之间进行通信的一种通信协议
    - Web Services：基于SOAP协议，数据格式是XML
    - Wcf/Wcf Rest：可以不依赖于IIS，基于SOAP，支持多种通信协议，但配置繁琐
  - 测试工具：SoapUI...

- REST
  - REpresentational State Transfer ，表现层状态转移，是一种架构风格，提供了设计概念原则和约束。
  - RESTful
    - 满足这些原则和条件的就称RESTful架构
    - Web API：RESTful的实现，一个用于构建HTTP服务的框架 - 测试工具：Fiddler、Postman、Jmeter...

- 微服务
  - 是SOA的一种实现，更侧重于组件化和服务化

- JSON-RPC
  - Remote Procedure Call Protocol，远程过程调用协议，高性能二进制协议，比RESTful要高效（类似于Web Services的使用风格）

### 面向对象OOP

- 三大基本特性
  - 继承，封装，多态
    - 抽象类abstract和接口interface的各种用法及实现
    - Virtual、abstract、override、New、extern等关键字的含义及用法
    - 设计模式的应用
    - ...

- 六大基本原则（高内聚，低耦合）
  - 单一职责原则SRP(Single Responsibility Principle)
  - 开放封闭原则OCP(Open－Close Principle)
  - 里式替换原则LSP(the Liskov Substitution Principle)
  - 依赖倒置原则DIP(the Dependency Inversion Principle)
  - 接口分离原则ISP(the Interface Segregation Principle)
  - 最少知识原则（Least Knowledge Principle）（也称：迪米特原则）

- 23种设计模式
  - 创建型
  - 结构型

### 存储

- 浏览器自身缓存技术(cache control,与服务器约定,js /css等缓存)
- Session(SessionId)(会话,为了弥补http协议的无状态特性)
- Cookie(浏览器存储,为了弥补http协议的无状态特性)
- Localstorage(Html5新特性 浏览器本地存储,为了弥补Cookie存储不足)
- Application(服务器全局变量)
- Static(依赖于IIS，进程回收会丢失)
- Cache(服务器缓存)

### 软件架构

- MVC
  - ASP.NET MVC

- MVP
  - 事件模型
    - ASP.NET Web form
      - System.UI.Page
      - ViewState
      - ...

    - Winform

- MVVM
  - 在.Net中(主要应用于WPF、Silverlight、WP7)
    - Prism - Brian Lagunas微软产品经理，微软MVP,一个跨平台的桌面和移动MVVM开发框架，开源。
    - Catel - Catel是一个专注于MVVM（WPF，Silverlight，Windows Phone和WinRT）和MVC（ASP.NET MVC）的应用程序开发平台。 Catel的核心包含一个IoC容器，模型，验证，纪念，消息中介，参数检查等。

  - 在前端中
    - Angular
    - Vue
    - Knockout
    - React
    - ...

### 平台

- MONO

- .Net Core
  - CoreCLR
  - CoreRT for .NET Core
  - .NET Core Base Class Library
  - ...

- .Net Framework
  - .NET Framework Base Class Library(BCL基类库)

### Http协议

- OSI网络通信
  - 物理层
    - 以二进制数据形式在物理媒体上传输数据

### 域名解析

- DNS解析流程
- 常见 域名解析记录
  - A记录：用来指定域名或子域名对应的IP地址记录，保证域名指向对应的主机
  - CNAME记录：别名记录，该记录允许你为自己的主机设置别名
  - MX记录：邮件路由记录，当发送邮件时，Mail 服务器先对域名进行解析，查找mx记录
  - TXT记录：是域名系统(DNS)中由域名托管服务商存储的一种资源记录，其作用是防止垃圾邮件滥用行为
  - AAAA记录：指定网站域名对应的IPv6地址记录
  - NS记录：Name Server，用于指定域名是由那个DNS服务器来进行域名解析
  - ...

### 网站优化

- JavaScript和Css模块化
- CSS Sprites：将一个页面涉及到的所有零星图片都包含到一张大图中去，这样一来，将N次请求变成一次请求
- 划分资源域
- 合理运用缓存技术
  - 静态文件（图片、css、js、html ）缓存： cdn技术、squid缓存服务器、浏览器(客户端)缓存
  - HTML5 application cahce API离线缓存
  - 应用层缓存：Cache、Redis缓存数据库、memcache缓存数据库
  - 数据库缓存：数据库本身的缓存机制
  - ...

### 默认隐藏段（拒绝客户端访问）

- App\_Browsers：包含浏览器定义(.browser文件),ASP.NET会使用这些文件来识别个别浏览器并判断它们的功能
- App\_Code：包含用于公用程序和商务对象(Business Object) , (例如, .cs ; .vb和.jsl文件)的程序源代码,要将它编译为应用程序的一部分
- App\_Data：包含应用程序数据文件.包括MDF文件,XML文件与其他数据库文件
- App\_GlobalResources：包含资源(.resx和.resources文件),这些资源会编译成具有全局范围的组件
- App\_LocalResources：包含资源(.resx和.resources文件),这些资源会与特定的页面,拥护控件或应用程序的主页面(MasterPage)相关联
- App\_WebReferences：包含参考合约文件(.wsdl文件),结构描述(.xsd文件)和探索文件(.disco和.discomap文件),可定义Web应用以用语应用程序
- Bin：包含空间,组件或你要在应用程序中应用其他程序代码的已编译组件(.dll文件).在\[Bin\]文件夹中以程序代码表示的任何类, 都会自动在应用程序中应用到
- Web.config：用来储存Asp.net Web应用程序的配置信息，通过继承关系，每个Web.config将配置设置应用到它所在的目录及虚拟子目录下
- ...

### 特殊目录

- Bin：是二进制binary的英文缩写,用来存放编译的结果

### 需要掌握的前端知识

- Html5+Css3
- JQuery插件语法
- Js实现封装-继承-多态
- 实现一个简单的MVVM框架
- 实现一个简单的js模板引擎
- Angular
  - 路由、模块化、控制器、指令、作用域、模板、链式函数、过滤器、服务、依赖注入...

### 信息加密技术

- 单向散列加密（杂凑函数、Hash函数）
  - 把任意长的输入消息串变化成固定长的输出串且由输出串难以得到输入串的一种函数，用于产生消息摘要，密钥加密
  - MD5，SHA，MAC，CRC...

### SSL

- Secure Socket Layer，安全套接字层,保护Web通讯,以实现客户端和服务器之间的安全通讯
- HTTPS：是在HTTP上建立SSL加密层，并对传输数据进行加密，是HTTP协议的安全版

### TLS

- Transport Layer Security，安全传输层协议，用于在两个通信应用程序之间提供保密性和数据完整性，建立在SSL 3.0协议规范之上，是SSL 3.0的后续版本

### Web安全

- 渗透注入
  - Sql注入、命令表达式注入、SSRF注入、XSS注入、CSRF注入、XXE注入...

### Web认证

- 第三方认证
  - Oauth2.0
  - SSO单点登录

### 解决方案

- 代码管理
  - Git：免费、开源的分布式版本控制系统，用的人最多
  - Svn：集中式的版本控制系统，一个强大的备份服务器
  - TFS：微软源代码管理工具

### 分布式

- 负载均衡
  - 什么时候才会负载均衡（什么是负载均衡）
  - 负载均衡的几种实现

### C#脚本引擎

- CS-Script：可做源码式插件开发，规则引擎，流程引擎...

### 插件开发

- Mvc Area插件开发
- OSGi.NET

### 消息队列

- 消息队列 \\- Message Queue(MQ)，是一种应用程序之间的通信机制，将部分无需立即回调获取结果，并且耗时的操作，使用异步处理的方式提高服务器的吞吐量及性能.如秒杀活动，上传任务，日志记录等

### 依赖倒置框架

- 基于面向对象6大原则之 - 依赖倒置原则DIP - 工厂模式实现
- IOC - inversion of control 控制反转，调用者不再创建被调用者的实例，由框架(容器)创建

### 任务调度

- Quartz

### 日志记录

- Log4net
- Nlog

### 搜索引擎

- Lucene.net
- ElasticSearch

### 工作流引擎(Workflow - WF)

- Business Process Management - BPM 业务流程管理
- Windows Workflow Foundation - WWF

### .Net常用工具及插件

- Colorful-IDE：可以更换VS的壁纸
- ReAttach：可以快速附加到进程（开源）
- C# Outline：VS代码块折叠插件
- Reshaper：即时分析代码质量，消除错误，安全地更改代码库等
- OzCode：VS调试时候的辅助插件
- LINQ Pad：用来测试Linq查询的插件
- Rextester：在线测试C#代码
- SmartAssembly：.Net加密混淆工具
- ConfuserEx：.Net加密混淆工具
- ILSpy：.Net反编译工具
- Reflector ：.Net反编译工具

>转自:<https://www.cnblogs.com/wyx8891/p/9929695.html>

<img src="/images/20210430134609740.png"  alt="Netshare">

欢迎关注
