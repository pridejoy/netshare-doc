# 数据校验


https://learn.microsoft.com/zh-cn/aspnet/core/mvc/models/validation?view=aspnetcore-8.0

 在.NET Web API中，数据校验是确保应用程序接收到的数据符合期望格式和规则的重要步骤。数据校验可以帮助防止不正确或恶意的数据输入，提高应用程序的健壮性和安全性。以下是实现数据校验的几种方法：

### 1. 使用数据注解（Data Annotations）

数据注解是.NET中一种简单直观的数据校验方式。通过在模型属性上添加特定的注解（Attribute），你可以定义对该属性的校验规则。

```csharp
using System.ComponentModel.DataAnnotations;

public class Product
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Product name is required")]
    [StringLength(100, ErrorMessage = "Product name cannot be longer than 100 characters")]
    public string Name { get; set; }

    [Range(1, 10000, ErrorMessage = "Price must be between $1 and $10000")]
    public decimal Price { get; set; }
}
```

#### 内置特性
以下是一些内置验证特性：

- [ValidateNever](/zh-cn/dotnet/api/microsoft.aspnetcore.mvc.modelbinding.validation.validateneverattribute)：指示应将某一属性或参数排除在验证外。
- [CreditCard](/zh-cn/dotnet/api/system.componentmodel.dataannotations.creditcardattribute)：验证属性是否有信用卡格式。 需要 [jQuery Validation 附加方法](https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/additional-methods.js)。
- [Compare](/zh-cn/dotnet/api/system.componentmodel.dataannotations.compareattribute)：验证模型中的两个属性是否匹配。
- [EmailAddress](/zh-cn/dotnet/api/system.componentmodel.dataannotations.emailaddressattribute)：验证属性是否有电子邮件格式。
- [Phone](/zh-cn/dotnet/api/system.componentmodel.dataannotations.phoneattribute)：验证属性是否有电话号码格式。
- [Range](/zh-cn/dotnet/api/system.componentmodel.dataannotations.rangeattribute)：验证属性值是否在指定范围内。
- [RegularExpression](/zh-cn/dotnet/api/system.componentmodel.dataannotations.regularexpressionattribute)：验证属性值是否与指定的正则表达式匹配。
- [Required](/zh-cn/dotnet/api/system.componentmodel.dataannotations.requiredattribute)：验证字段是否不为 null。 请参阅 [Required] 属性，获取关于该特性的行为的详细信息。
- [StringLength](/zh-cn/dotnet/api/system.componentmodel.dataannotations.stringlengthattribute)：验证字符串属性值是否未超过指定长度限制。
- [Url](/zh-cn/dotnet/api/system.componentmodel.dataannotations.urlattribute)：验证属性是否有 URL 格式。
- [Remote](/zh-cn/dotnet/api/microsoft.aspnetcore.mvc.remoteattribute)：通过调用服务器上的操作方法，验证客户端上的输入。
 

在 [System.ComponentModel.DataAnnotations](/zh-cn/dotnet/api/system.componentmodel.dataannotations) 命名空间中可找到验证特性的完整列表。

### 2. 使用Fluent Validation

Fluent Validation 是一个.NET库，它允许你以流畅的接口创建强大的校验规则。这种方式比数据注解提供了更多的灵活性和复杂的校验逻辑。

首先，需要安装Fluent Validation库：

```shell
Install-Package FluentValidation.AspNetCore
```

然后，创建一个继承自`AbstractValidator<T>`的校验器类：

```csharp
using FluentValidation;

public class ProductValidator : AbstractValidator<Product>
{
    public ProductValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("Product name is required")
                            .Length(0, 100).WithMessage("Product name cannot be longer than 100 characters");
        RuleFor(x => x.Price).InclusiveBetween(1, 10000).WithMessage("Price must be between $1 and $10000");
    }
}
```

最后，在Startup.cs中配置Fluent Validation：

```csharp
services.AddControllers()
        .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<ProductValidator>());
```

### 3. 手动校验

除了使用框架或库提供的自动校验外，你还可以在控制器中手动校验数据。

```csharp
[HttpPost]
public IActionResult CreateProduct(Product product)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    // 处理product保存逻辑

    return Ok();
}
```

在这个例子中，`ModelState.IsValid`会根据模型上定义的数据注解来检查模型是否有效。

### 结论

选择哪种校验方法取决于你的具体需求和偏好。数据注解提供了一种快速简单的校验方式，而Fluent Validation则提供了更多的灵活性和强大的校验能力。在某些情况下，手动校验可能是必要的，尤其是当校验逻辑非常特殊或超出了框架提供的校验能力时。无论选择哪种方法，确保应用程序的输入数据是有效和安全的，都是非常重要的。

https://blog.csdn.net/ldl_csdn_ios/article/details/107410783