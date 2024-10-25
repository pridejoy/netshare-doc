# 装饰器模式（Decorator Pattern）

装饰器模式（Decorator Pattern）是一种结构型设计模式，它允许向一个现有的对象添加新的功能，同时又不改变其结构。装饰器模式通过创建一个装饰类来包裹原始类，从而在保持类接口不变的情况下增强对象的功能。

### 关键点

1. **组件接口（Component Interface）**：定义一个对象接口，可以给这些对象动态地添加职责。
2. **具体组件（Concrete Component）**：实现组件接口的基本对象。
3. **装饰器（Decorator）**：实现组件接口，并持有一个组件对象的引用，通过组合的方式将原始对象的行为和新功能结合。
4. **具体装饰器（Concrete Decorator）**：实现装饰器接口并添加额外的行为。

### 示例

假设我们有一个简单的文本显示组件，我们希望可以动态地向文本添加不同的装饰效果，比如加粗、斜体等。我们可以使用装饰器模式来实现这个需求。

### 1. 定义组件接口

```csharp
// 组件接口 - 文本
public interface IText
{
    void Display();
}
```

### 2. 实现具体组件

```csharp
// 具体组件 - 普通文本
public class PlainText : IText
{
    private string text;

    public PlainText(string text)
    {
        this.text = text;
    }

    public void Display()
    {
        Console.WriteLine(text);
    }
}
```

### 3. 创建装饰器

```csharp
// 装饰器 - 基础装饰器
public abstract class TextDecorator : IText
{
    protected IText decoratedText;

    public TextDecorator(IText text)
    {
        decoratedText = text;
    }

    public virtual void Display()
    {
        decoratedText.Display();
    }
}
```

### 4. 实现具体装饰器

```csharp
// 具体装饰器 - 加粗文本
public class BoldText : TextDecorator
{
    public BoldText(IText text) : base(text) { }

    public override void Display()
    {
        Console.Write("<b>");
        base.Display();
        Console.Write("</b>");
    }
}

// 具体装饰器 - 斜体文本
public class ItalicText : TextDecorator
{
    public ItalicText(IText text) : base(text) { }

    public override void Display()
    {
        Console.Write("<i>");
        base.Display();
        Console.Write("</i>");
    }
}
```

### 5. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        IText plainText = new PlainText("Hello, World!");

        // 使用加粗装饰器
        IText boldText = new BoldText(plainText);
        boldText.Display();  // 输出：<b>Hello, World!</b>

        // 使用斜体装饰器
        IText italicText = new ItalicText(plainText);
        italicText.Display();  // 输出：<i>Hello, World!</i>

        // 同时使用加粗和斜体装饰器
        IText boldItalicText = new BoldText(new ItalicText(plainText));
        boldItalicText.Display();  // 输出：<b><i>Hello, World!</i></b>
    }
}
```

### 解释

1. **组件接口（IText）**：定义了 `Display` 方法，这是所有文本组件和装饰器必须实现的方法。
2. **具体组件（PlainText）**：实现了 `IText` 接口，提供基本的文本显示功能。
3. **装饰器（TextDecorator）**：实现了 `IText` 接口，并持有一个 `IText` 类型的成员变量，通过组合方式将原始文本对象的行为和新功能结合。
4. **具体装饰器（BoldText 和 ItalicText）**：继承自 `TextDecorator`，通过在 `Display` 方法中增加新的行为来实现加粗和斜体的效果。

### 优点

- **职责单一原则**：可以在不修改原始类的情况下向对象添加新功能。
- **开闭原则**：可以通过创建新的具体装饰器来扩展对象的功能，而不需要修改已有代码。
- **灵活性**：可以动态地组合不同的装饰器，从而实现多种功能的叠加。

### 缺点

- **复杂性增加**：使用装饰器模式会增加系统中类的数量和复杂性，特别是在多个装饰器组合使用时。
- **创建装饰链**：需要客户端代码显式地创建和组合装饰器对象，这可能会导致代码复杂且不易理解。

### 适用场景

- **需要动态地添加功能**：在运行时需要向对象添加功能，而不影响其他对象。
- **功能扩展需求频繁变化**：需要通过组合不同的功能来扩展对象，而不希望通过继承来实现。
- **避免类爆炸**：如果通过继承来扩展功能会导致大量子类，可以使用装饰器模式来避免这种情况。
