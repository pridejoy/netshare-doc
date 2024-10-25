# 对象关系映射

将一个对象的值批量映射到另一个对象中，支持自定义映射规则。

## 传统模式

假设有两个类型：Student 和 StudentDto，现在需要将 Student 对象赋值给 StudentDto

Student

```csharp
var student = new Student() 
{
    FirstName = "Monk",
    LastName = "Soul",
    Age = 27,
    Address = "广东省珠海市香洲区吉大路",
    Gender = "男"
};
// 赋值
var studentDto = new StudentDto()
{
    FullName = student.FirstName + student.LastName,
    Age = student.Age,
    Gender = student.Gender
}
```

确实，这样的代码咋看没什么不妥，但是有几个漏洞：

- 如果字段繁多，这赋值操作相当耗时间且容易出错
- 如果多次需要将 Student映射到 StudentDto中，则这样的代码散落在很大地方，给维护带来了极大的困扰
- 这样的赋值操作实际上污染了业务逻辑代码，不利于后续的统一管理
- 这样的赋值操作实在是多，无意增加了项目包的大小，开发效率也会低下

所以，我们迫切需要一种更加灵活、简易的对象赋值（映射）方式。

## 对象映射组件-Mapster

在这里推荐Mapster，**Mapster** 性能优于 AutoMapper，简单易用，而且性能极高

>`PM> dotnet add package Mapster`

```csharp
/*
* 默认情况下，无需任何配置，Mapster会根据两个实体字段名称相同进行匹配
* 第一次调用时，配置会被缓存，第二次将会从缓存中取，以此提升性能
*/
var user = new User();
var dto = user.Adapt<UserDto>();//映射为新对象
user.Adapt(dto);//在目标对象的基础上进行映射

//注意：Adapt扩展方法使用的配置为 `TypeAdapterConfig.GlobalSettings`

```

到这里已经可以使用最简单的映射了，但是，如果需要配置映射规则，需要在`TypeAdapterConfig.GlobalSettings`中配置
更多配置，可以参考[教程](https://www.cnblogs.com/qiqigou/p/13696669.html)

更多  `Mapster`  可查看[官方文档](https://github.com/MapsterMapper/Mapster/wiki)
