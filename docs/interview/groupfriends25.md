# 群友25k面试题

### 1. 聊下你对GC的理解

::: details 解答
GC 是垃圾回收的简称，它是自动内存管理的一部分，用于回收程序不再使用的对象所占用的内存。在.NET中，GC通过跟踪对象的引用来确定哪些对象是不再被需要的，并在适当的时候释放这些对象。GC有多个代，新创建的对象首先被分配到第0代，随着时间的推移，如果对象仍然存活，它们会被提升到更高的代。
:::

### 2. 聊下CLR

::: details 解答
CLR 是.NET框架的核心，它提供了一个运行时环境，用于执行代码并提供内存管理、异常处理、安全性、垃圾回收等服务。CLR允许不同语言编写的代码在同一个运行时环境中运行，实现了语言的互操作性。
:::

### 3. 谈谈你做的项目的整体架构

::: details 解答
项目架构一般包括前端展示层、后端逻辑层、数据访问层、服务层、API层等，以及可能的微服务架构、容器化部署等现代架构模式。
:::

### 4. 常用的.NET Core中间件

::: details 解答
中间件是.NET Core中处理HTTP请求和响应的组件。常见的中间件有：

- 身份验证中间件：用于处理用户认证。
- 路由中间件：用于URL路由。
- 异常处理中间件：用于全局异常处理。
- 静态文件中间件：用于提供静态文件服务。
- 请求日志中间件：用于记录请求信息。
:::

### 5. MySQL的索引结构及索引优化

::: details 解答
MySQL使用B树和B+树作为索引结构，其中B+树是最常见的索引结构。优化索引通常包括：

- 选择合适的索引类型（如主键索引、唯一索引、全文索引等）。
- 避免冗余索引。
- 使用合适的数据类型。
- 定期维护索引（如重建索引）。
:::

### 6. 谈下RabbitMQ的优缺点，以及常见的问题，怎么处理的？

::: details 解答

- **优点**：高可靠性、支持多种消息协议、易于扩展、社区活跃。
- **缺点**：消息队列管理复杂、资源消耗较大。
- **常见问题**：消息丢失、死信问题、性能瓶颈。
- **处理**：确保消息持久化、使用死信交换器处理无法路由的消息、优化配置提高性能。
:::

### 7. 谈谈Redis常用的数据结构以及使用场景

::: details 解答
Redis支持多种数据结构，包括：

- 字符串：常用于缓存。
- 列表：用于消息队列。
- 集合：用于存储唯一元素集合。
- 哈希：用于存储对象。
- 有序集合：用于排行榜等场景。
- 位图：用于大型数据集的快速查找。
:::

### 8. 读过Dapper的源码吗？聊聊源码的底层实现

::: details 解答
Dapper是一个.NET的ORM工具，它通过使用表达式树来生成SQL语句，从而提高性能。Dapper的底层实现通常涉及动态SQL生成、参数化查询和结果集映射。
:::

### 9. 工作之余有学习的习惯吗？有的话说说你最近学习的哪块的技术

::: details 解答
自行回答
:::

### 10. 说下反射的优缺点

::: details 解答

- **优点**：提供了动态加载和使用程序集、模块和类型的功能，增加了程序的灵活性。
- **缺点**：性能开销较大，滥用可能导致代码难以理解和维护。
:::

### 11. 聊聊泛型的优缺点

::: details 解答

- **优点**：提供了类型安全，避免了装箱和拆箱的性能损耗，提高了代码的重用性。
- **缺点**：增加了编译时的复杂性，不支持所有类型（如接口和抽象类）。
:::

### 12. 谈下装箱和拆箱

::: details 解答
装箱是将值类型转换为引用类型的过程，拆箱是相反的过程。装箱和拆箱可能导致性能问题，因为它们涉及到内存分配和垃圾回收。
:::

### 13. 聊聊Kafka

::: details 解答
Kafka是一个分布式流处理平台，常用于构建实时数据管道和流应用。它具有高吞吐量、持久性、容错性等特点。
:::

### 14. 说下对Elasticsearch的了解，以及应用场景

::: details 解答
Elasticsearch是一个基于Lucene的搜索引擎，用于全文搜索和分析。它广泛应用于日志分析、监控、搜索引擎等领域。Elasticsearch提供了分布式多用户能力，支持PB级数据，具有高可扩展性、高可用性。
:::
