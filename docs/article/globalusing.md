# 全局和隐式usings

 
在.NET 6及更高版本中，`global using` 指令允许你在整个项目中定义全局的 `using` 指令，避免了在每个文件顶部重复相同的 `using` 声明。这样做可以使代码更加整洁，并减少模板代码的冗余。要启用并使用 `global using` 指令，请按照以下步骤操作：

### 1. 创建 GlobalUsings.cs 文件（或任何你喜欢的文件名）

可以在任何 `.cs` 文件中添加 `global using` 指令，但为了维护的便利性，建议将所有全局 `using` 指令集中在项目的根目录下，通常命名为 `GlobalUsings.cs`,。

通过在 `using` 关键字前添加 `global` 关键字，这些命名空间将在整个项目中自动可用，无需在每个 `.cs` 文件顶部重复声明。

打开刚创建的 `GlobalUsings.cs` 文件，并添加你想要在整个项目中全局使用的命名空间。例如：
 
GlobalUsings.cs 
```csharp
global using System;
global using System.Text.Json;
global using Microsoft.AspNetCore.Mvc; 
global using Newtonsoft.Json; 
global using Swashbuckle.AspNetCore.Swagger;
global using Swashbuckle.AspNetCore.SwaggerUI;
// 添加更多根据项目需求的全局 using 指令
```

### 2. 启用隐式命名空间

在项目的.csproj 文件（双击项目的类库或者程序即可编辑），添加 **<ImplicitUsings>enable</ImplicitUsings>**来启用
 
 
xxx..csproj
```ts{4}
  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
	  <Nullable>disable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <InvariantGlobalization>false</InvariantGlobalization>
    <GenerateDocumentationFile>True</GenerateDocumentationFile>
  </PropertyGroup>
```
 
- 使用 `global using` 时要谨慎，因为它会在整个项目范围内引入命名空间，可能会导致命名冲突或意外的名称解析行为。
- 对于大型项目或库，考虑只将最通用和不太可能引起冲突的命名空间设置为全局，以避免潜在问题。

`global using` 是.NET 6引入的一个非常有用的特性，能够显著减少重复代码并提高项目的整洁性。

一旦设置完成，就不需要再每个 .cs 文件顶部重复声明这些 using 指令了。这将使得新创建的文件更加干净，且减少了因忘记添加常用 using 指令导致的编译错误。



