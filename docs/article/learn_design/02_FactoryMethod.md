# 工厂方法模式（Factory Method Pattern）

工厂方法模式（Factory Method Pattern）是一种创建型设计模式，它通过定义一个创建对象的接口来让子类决定实例化哪一个类，使得一个类的实例化延迟到其子类。这种模式的核心思想是将对象的创建过程推迟到子类，从而实现更灵活、更可扩展的代码。

### 关键点

1. **抽象产品（Abstract Product）**：定义产品对象的接口。
2. **具体产品（Concrete Product）**：实现抽象产品接口的具体类。
3. **抽象工厂（Creator）**：声明工厂方法，该方法返回一个产品对象。
4. **具体工厂（Concrete Creator）**：实现抽象工厂的工厂方法，生成具体产品实例。

### 示例

假设我们有一个文档创建系统，不同类型的文档如 Word 文档和 PDF 文档。我们将使用工厂方法模式来实现这个系统。

### 1. 定义抽象产品

```csharp
// 抽象产品 - 文档
public abstract class Document
{
    public abstract void Open();
}
```

### 2. 实现具体产品

```csharp
// 具体产品 - Word 文档
public class WordDocument : Document
{
    public override void Open()
    {
        Console.WriteLine("Opening Word document...");
    }
}

// 具体产品 - PDF 文档
public class PdfDocument : Document
{
    public override void Open()
    {
        Console.WriteLine("Opening PDF document...");
    }
}
```

### 3. 创建抽象工厂

```csharp
// 抽象工厂
public abstract class Application
{
    // 工厂方法
    public abstract Document CreateDocument();

    // 其他方法
    public void OpenDocument()
    {
        var doc = CreateDocument();
        doc.Open();
    }
}
```

### 4. 实现具体工厂

```csharp
// 具体工厂 - Word 文档工厂
public class WordApplication : Application
{
    public override Document CreateDocument()
    {
        return new WordDocument();
    }
}

// 具体工厂 - PDF 文档工厂
public class PdfApplication : Application
{
    public override Document CreateDocument()
    {
        return new PdfDocument();
    }
}
```

### 5. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        // 使用 Word 文档工厂
        Application app = new WordApplication();
        app.OpenDocument();  // 输出：Opening Word document...

        // 使用 PDF 文档工厂
        app = new PdfApplication();
        app.OpenDocument();  // 输出：Opening PDF document...
    }
}
```

### 解释

1. **抽象产品（Document）**：定义了所有文档类型都必须实现的方法 `Open`。
2. **具体产品（WordDocument 和 PdfDocument）**：实现了 `Document` 接口，并提供了各自的实现。
3. **抽象工厂（Application）**：声明了工厂方法 `CreateDocument`，并包含使用产品对象的方法 `OpenDocument`。
4. **具体工厂（WordApplication 和 PdfApplication）**：实现了 `Application` 的工厂方法 `CreateDocument`，返回具体的文档对象。

### 优点

- **遵循开放/关闭原则**：添加新的产品类型时，只需要新增相应的具体工厂类和具体产品类，不需要修改现有代码。
- **单一职责原则**：工厂方法将产品的创建代码封装在具体工厂中，使得客户端代码和创建代码分离。

### 缺点

- **类的数量增加**：每增加一个新的产品类型，就需要新增一个具体工厂类和具体产品类。
- **复杂性增加**：相比于直接实例化对象，引入了更多的类和接口，增加了系统的复杂性。

### 适用场景

- **需要创建的对象较复杂**：对象的创建过程较复杂，可能包含一些初始化步骤。
- **需要灵活的对象创建方式**：需要通过子类来决定实例化哪一个具体类，以满足不同的需求。
- **希望将对象的创建过程封装起来**：希望将对象的创建过程与其使用过程分离，增强代码的可维护性和可扩展性。
