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

### 2. 使用Fluent Validation

Fluent Validation是一个.NET库，它允许你以流畅的接口创建强大的校验规则。这种方式比数据注解提供了更多的灵活性和复杂的校验逻辑。

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