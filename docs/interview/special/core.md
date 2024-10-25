## ASPNET Core笔试题

### 如何在ASP.NET Core中激活Session功能？

::: details 解答
要在ASP.NET Core中激活Session功能，首先需要添加Session包，然后在`Startup`类的`ConfigureServices`方法中添加Session服务，最后在`Configure`方法中调用`UseSession`中间件。
:::

### 什么是中间件？

::: details 解答
中间件是ASP.NET Core中用于处理请求和响应的组件，它们通过多个委托嵌套形成一个请求处理管道。中间件可以执行任务如身份验证、授权、错误处理等，并可决定传递请求到下一个中间件或直接结束请求。
:::

### ApplicationBuilder的Use和Run方法有什么区别？

::: details 解答
`Use`方法用于添加中间件到应用程序的请求处理管道中，并且可以调用链中的下一个中间件。`Run`方法则是一个终结式的方法，用于指定当请求到达管道末端时执行的最终处理逻辑，它不调用下一个中间件。
:::

### 如何使TagHelper在元素这一层上失效？

::: details 解答
可以使用感叹号（`!`）语法来使TagHelper在特定元素上失效，这告诉ASP.NET Core忽略该元素的TagHelper。
:::

### 什么是ASP.NET Core？

::: details 解答
ASP.NET Core是一个跨平台、高性能、开源的Web框架，用于构建现代化的云基础Web应用程序。它提供了模块化的设计，支持依赖注入、中间件、配置注入等特性，并且可以运行在Windows、Linux和macOS上。
:::

### ASP.NET Core中AOP的支持有哪些？

::: details 解答
ASP.NET Core通过Filter支持面向切面编程（AOP），包括IResourceFilter、AuthorizeFilter、ActionFilter、ExceptionFilter和ResultFilter等类型，这些Filter也被称为拦截器。
:::

### ASP.NET Core Filter的注册方式有哪些？

::: details 解答
ASP.NET Core Filter可以通过以下方式注册：

- 方法注册：只对特定方法有效。
- 控制器注册：对控制器中的所有方法有效。
- 全局注册：对整个项目有效。
:::

### ASP.NET Core Filter如何支持依赖注入？

::: details 解答
ASP.NET Core Filter支持依赖注入，可以通过构造函数注入所需的服务，或者使用`TypeFilter`和`ServiceType`属性来实现依赖注入。
:::

### ASP.NET Core如何读取配置文件中的内容？

::: details 解答
ASP.NET Core可以通过`IConfiguration`接口读取配置文件内容，也可以定义与配置文件结构一致的实体对象，并通过依赖注入将配置绑定到对象中。
:::

### ASP.NET Core有哪些好的功能？

::: details 解答
ASP.NET Core的优点包括跨平台支持、无需依赖IIS运行、内置的中间件支持、配置灵活性、支持依赖注入、更好的性能和安全性、以及对RESTful API和Web Sockets的原生支持等。
:::

### ASP.NET Core跟ASP.NET比较有哪些更好的地方？

::: details 解答
与ASP.NET相比，ASP.NET Core提供了更好的性能和可扩展性，支持跨平台运行，具有更小的内存占用和更快的响应时间，同时提供了更简洁和模块化的API设计。
:::

### 什么是meta packages？

::: details 解答
Meta packages是指包含所有ASP.NET Core依赖的单一包，例如`Microsoft.AspNetCore`，它使得开发者可以方便地引入整个框架的依赖。
:::

### ASP.NET Core应用能够跟ASP.NET 4.x架构一起工作吗？

::: details 解答
是的，ASP.NET Core应用可以与ASP.NET 4.x架构一起工作，它们可以共存并利用ASP.NET Core的跨平台和模块化特性。
:::

### 什么是ASP.NET Core的Startup类？

::: details 解答
Startup类是ASP.NET Core应用的入口点，用于配置服务和定义应用程序如何响应HTTP请求。这个类的`ConfigureServices`方法用于配置依赖注入服务，而`Configure`方法用于配置请求处理管道。
:::

### Startup类的ConfigureServices方法有什么作用？

::: details 解答
`ConfigureServices`方法在Startup类中用于添加和配置应用程序的服务，这些服务可以通过依赖注入在应用程序中使用。
:::

### Startup类的Configure方法有什么作用？

::: details 解答
`Configure`方法在Startup类中用于定义整个应用程序如何响应HTTP请求，包括配置中间件来处理路径、验证和会话等。
:::

### ASP.NET Core管道里面的Map扩展有什么作用？

::: details 解答
`Map`扩展在ASP.NET Core管道中用于为特定的路径添加中间件，可以针对不同的路径配置不同的处理逻辑。
:::

### ASP.NET Core里面的路径是如何处理的？

::: details 解答
ASP.NET Core中的路径处理用于为进入的请求寻找处理函数，可以通过常规路径处理或属性路径处理来实现，支持MapRoute和属性路由等方式。
:::

### ASP.NET Core工程里面有多少个工程文件？

::: details 解答
ASP.NET Core工程中通常包含多个文件，包括`Startup.cs`、`Program.cs`、`appsettings.json`、`launchSettings.json`等，具体数量取决于项目配置和需求。
:::

### 什么是ASP.NET Core里面的TagHelper

::: details 解答
TagHelper是ASP.NET Core中用于在服务器端使用Razor视图引擎创建HTML元素的语法，它们提供了一种声明式的方式来编写服务器端代码。
:::

### 说说.NET Core中_ViewImports文件的作用

::: details 解答
`_ViewImports.cshtml`文件在.NET Core中用于定义整个视图目录中所有视图共享的指令和命名空间，可以简化视图文件的内容。
:::

### 什么是Razor页面？

::: details 解答
Razor页面是ASP.NET Core中支持ASPX表格的一种开发模型，使用`@page`作为页面的起始标志，支持MVC模式和Razor语法。
:::

### 说说.NET Core中_ViewStart文件的作用

::: details 解答
`_ViewStart.cshtml`文件在.NET Core中用于定义视图的起始点，当控制器返回视图时，视图引擎会从`_ViewStart.cshtml`开始，以初始化视图页面。
:::

### 如何在Razor页面中实现数据模型绑定？

::: details 解答
在Razor页面中实现数据模型绑定，可以使用`@model`指令指定模型类型，然后在页面中使用`BindProperty`属性来绑定表单字段到模型属性。
:::

### 如何在Controller中注入service？

::: details 解答
在Controller中注入service，可以通过在Controller的构造函数中添加服务的依赖注入，然后通过构造函数参数的形式传入服务实例。
:::

### 描述一下依赖注入后的服务生命周期？

::: details 解答
ASP.NET Core中的依赖注入支持三种服务生命周期：单例（Singleton）、短暂（Transient）和作用域（Scoped）。单例在整个应用中只有一个实例，短暂每次请求都会创建新实例，作用域则是每个请求一个新实例。
:::

### 说说ASP.NET Core内置容器的特点

::: details 解答
ASP.NET Core内置容器`IServiceCollection`支持构造函数注入，提供三种生命周期管理：单例、瞬时和作用域。它是一个轻量级的依赖注入容器，用于管理服务的注册和解析。
:::

### ASP.NET Core中如何读取静态文件？

::: details 解答
ASP.NET Core中可以通过中间件`UseStaticFiles`来配置读取静态文件，通常在`Startup`类的`Configure`方法中进行配置。
:::

### ASP.NET Core项目如何设置IP地址和端口号？

::: details 解答
ASP.NET Core项目可以通过`launchSettings.json`配置文件来设置不同的启动方式和相应的IP地址及端口号。
:::

### ASP.NET Core项目中，wwwroot文件夹内包含什么内容？

::: details 解答
`wwwroot`文件夹通常包含静态文件，如CSS、JavaScript文件、字体文件和库文件等。
:::

### 谈谈对ASP.NET Core kestrel的理解

::: details 解答
Kestrel是一个跨平台的Web服务器，适用于ASP.NET Core，支持HTTP/2和WebSocket。它是ASP.NET Core项目模板中的默认Web服务器。
:::

### 谈谈对Autofac的理解

::: details 解答
Autofac是一个依赖注入容器，支持ASP.NET Core的依赖注入系统，允许配置组件和服务的映射关系，并支持AOP扩展定制。
:::

### ASP.NET Core 如何支持Log4Net扩展？

::: details 解答
ASP.NET Core支持Log4Net扩展，可以通过NuGet引入Log4Net程序集，然后在`Startup`类的`Configure`方法中配置日志服务。
:::

### 说说脚本启动ASP.NET Core Web项目

::: details 解答
可以通过命令行工具启动ASP.NET Core Web项目，使用`dotnet run`命令或`dotnet <dll文件> --urls=http://ip地址：端口号`命令。
:::

### 说说Core WebApi的Swagger

::: details 解答
Swagger是一个API文档生成和测试工具，可以在ASP.NET Core Web API项目中集成Swagger，以生成和展示API文档，支持API测试。
:::

### 说说Core WebApi特性路由

::: details 解答
特性路由是ASP.NET Core Web API中的一种路由方式，通过在控制器或动作上使用路由特性来定义路由模板，实现更灵活的路由配置。
:::

### 说说RESTful是什么

::: details 解答
RESTful是一种设计风格，用于构建网络应用，它使用标准的HTTP方法，如GET、POST、PUT、DELETE等，来执行资源的操作，强调无状态、统一接口和可缓存。
:::

### 说说脚本在请求Web CoreApi的时候，为什么会发生跨域问题？

::: details 解答
跨域问题是由于浏览器的同源策略导致的，当请求的协议、域名或端口与当前页面不同，浏览器会阻止请求以保护用户安全。
:::

### 如何解决跨域问题？

::: details 解答
解决跨域问题的方法包括：

1. 使用JSONP技术，通过script标签发起请求。
2. 使用CORS（Cross-Origin Resource Sharing）策略，服务器端设置响应头`Access-Control-Allow-Origin`。
3. 使用代理服务器，将请求转发到目标服务器。
4. 使用PostMessage进行跨文档通信。
:::

### 说说你了解到的鉴权授权技术

::: details 解答
鉴权授权技术包括传统的基于Session和Cookie的鉴权，以及基于Token的鉴权，如JWT（JSON Web Tokens）和OAuth。这些技术用于验证用户身份并控制用户对资源的访问权限。
:::

### 请问对gRPC有了解吗，说说gRPC

::: details 解答
gRPC是一个高性能、开源和通用的RPC框架，由Google开发，面向移动和HTTP/2设计。它支持多种语言，包括C、Java、Go、C#等。
:::

### gRPC有几种模式？

::: details 解答
gRPC有四种模式：

1. 简单模式：使用参数和返回值进行服务器与客户端的数据传递。
2. 客户端流模式：客户端向服务器发送数据流。
3. 服务器端流模式：服务器向客户端返回数据流。
4. 双向流模式：客户端和服务器可以同时发送和接收数据流。
:::

### 说说如何使用C#实现简单模式gRPC

::: details 解答
使用C#实现简单模式gRPC，需要：

1. 定义.proto文件，描述服务和消息结构。
2. 使用gRPC工具生成C#类文件。
3. 创建服务端和客户端代码，实现或调用gRPC方法。
:::

### 说说gRPC的拦截器有哪些？

::: details 解答
gRPC的拦截器包括：

- 客户端拦截器：BlockingUnaryCall、AsyncUnaryCall、AsyncClientStreamingCall、AsyncServerStreamingCall、AsyncDuplexStreamingCall。
- 服务端拦截器：UnaryServerHandler、ClientStreamingServerHandler、ServerStreamingServerHandler、DuplexStreamingServerHandler。
:::

### gRPC作为一种被调用的服务，有什么保护安全的措施吗？

::: details 解答
gRPC支持多种安全措施，包括：

- 使用SSL/TLS进行加密传输。
- 支持JWT和OAuth 2.0等认证机制。
- 可以使用API密钥进行请求验证。
- 支持mTLS（双向TLS）进行服务端和客户端的身份验证。
:::

### 请问对EFCore有了解吗？

::: details 解答
EF Core（Entity Framework Core）是一个适用于.NET的轻量级、跨平台的ORM框架，支持LINQ查询、变更追踪、更新以及结构描述转移。
:::

### 说说EFCore查询的性能调优小技巧

::: details 解答
EF Core查询性能调优技巧包括：

- 使用AsNoTracking()方法，避免在内存中创建对象副本。
- 多使用Find()方法，利用内存缓存提高查询效率。
- 避免在查询中使用Select()方法加载不必要的数据。
- 使用Include()方法预先加载相关数据，避免N+1查询问题。
- 使用索引提高数据库查询效率。
:::

### EFCore 如何通过数据生成实体和DbContext?

::: details 解答
EF Core可以通过以下步骤通过数据生成实体和DbContext：

1. 使用Scaffold-DbContext命令，指定数据库连接字符串和要使用的提供者。
2. 指定输出目录和DbContext类名。
3. 执行命令，EF Core将根据数据库表生成对应的实体类和DbContext类。
:::

### 说说对SaveChanges的理解

::: details 解答
SaveChanges是EF Core中用于将更改提交到数据库的方法。它将跟踪的实体的添加、修改和删除操作一次性应用到数据库中。
:::

### 说说对EFCore中EntityState的理解

::: details 解答
EntityState是EF Core中用于跟踪实体状态的枚举，包括：

- Detached：未被跟踪。
- Unchanged：被跟踪且未修改。
- Modified：被跟踪且已修改。
- Added：被跟踪且新添加。
- Deleted：被跟踪且标记为删除。
:::

### 说说什么是导航属性和引用属性

::: details 解答
导航属性是EF Core中用于在两个实体之间导航关系的方法。引用属性（EntityReference）用于一对一或零或一关系，而导航属性（EntityCollection）用于一对多或多对多关系。
:::
