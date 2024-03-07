# 对象关系映射

在这里推荐Mapster，**Mapster**性能优于 AutoMapper，上手简单方便

## 简单使用

### 安装

PM> dotnet add package Mapster 

### 使用

```csharp
public class User
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Sex { get; set; }
    public string like { get; set; }
}

public class UserDto
{
    public string name { get; set; }
    public int UserAge { get; set; }
    public string UserSex { get; set; }
    public string like { get; set; }
}

```


简单使用

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
更多配置，可以参考以下链接

## 相关文章

[转载链接|C# Mapster 对象映射器（C#对象映射器）](https://www.cnblogs.com/qiqigou/p/13696669.html)

[Mapster官方|仓库地址](https://github.com/MapsterMapper/Mapster)

[Mapster中文文档](https://github.com/rivenfx/Mapster-docs)