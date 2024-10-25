# 享元模式（Flyweight Pattern）

享元模式（Flyweight Pattern）是一种结构型设计模式，它通过共享相同对象来减少内存使用，以提高性能。享元模式适用于大量相似对象的场景，通过共享可以有效地减少内存开销。享元模式主要分为内部状态和外部状态，内部状态是对象共享的部分，外部状态是对象独立的部分。

### 关键点

1. **享元（Flyweight）**：定义了享元对象的接口，通常包含方法 `Operation` 来接收外部状态。
2. **具体享元（ConcreteFlyweight）**：实现享元接口，并且存储内部状态。
3. **非共享具体享元（UnsharedConcreteFlyweight）**：不需要共享的具体享元类。
4. **享元工厂（FlyweightFactory）**：用于创建和管理享元对象，确保合理地共享享元。
5. **客户端（Client）**：使用享元工厂来获取享元对象，并且管理外部状态。

### 示例

假设我们有一个文字处理程序，需要展示大量字符。每个字符对象占用大量内存，我们可以使用享元模式来共享字符对象，从而减少内存使用。

### 1. 定义享元接口

```csharp
// 享元接口
public interface ICharacter
{
    void Display(int fontSize);
}
```

### 2. 实现具体享元

```csharp
// 具体享元 - 字符
public class Character : ICharacter
{
    private char symbol;  // 内部状态

    public Character(char symbol)
    {
        this.symbol = symbol;
    }

    public void Display(int fontSize)  // 外部状态
    {
        Console.WriteLine($"Character: {symbol}, FontSize: {fontSize}");
    }
}
```

### 3. 创建享元工厂

```csharp
// 享元工厂
public class CharacterFactory
{
    private Dictionary<char, ICharacter> characters = new Dictionary<char, ICharacter>();

    public ICharacter GetCharacter(char symbol)
    {
        if (!characters.ContainsKey(symbol))
        {
            characters[symbol] = new Character(symbol);
        }
        return characters[symbol];
    }
}
```

### 4. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        CharacterFactory factory = new CharacterFactory();

        string document = "Hello World";
        int[] fontSizes = { 12, 14, 12, 12, 14, 16, 16, 14, 12, 12, 14 };

        for (int i = 0; i < document.Length; i++)
        {
            ICharacter character = factory.GetCharacter(document[i]);
            character.Display(fontSizes[i]);
        }
    }
}
```

### 解释

1. **享元接口（ICharacter）**：定义了 `Display` 方法，用于接收外部状态（字体大小）。
2. **具体享元（Character）**：实现了享元接口，并且存储了内部状态（字符符号）。
3. **享元工厂（CharacterFactory）**：用于创建和管理享元对象，确保相同字符对象只创建一次并共享。
4. **客户端代码**：通过享元工厂获取字符对象，并通过外部状态来展示字符。

### 优点

- **减少内存开销**：通过共享对象，可以显著减少相似对象的内存消耗。
- **提高性能**：减少内存使用的同时，也减少了创建对象的时间，提高了系统性能。

### 缺点

- **复杂性增加**：系统引入了享元工厂和享元对象的管理，增加了代码复杂性。
- **非共享部分的处理**：需要处理好共享对象的外部状态管理，确保外部状态在使用时的一致性。

### 适用场景

- **大量相似对象**：系统中有大量相似对象，并且这些对象的大部分状态可以共享时，可以使用享元模式。
- **内存受限**：系统对内存的使用非常敏感，需要通过共享对象来节省内存。

### 示例的现实应用

享元模式在很多现实应用中都有广泛的使用，比如：

- **文本处理**：文本编辑器中相同字符的共享。
- **图形处理**：图形应用中重复图形的共享。
- **游戏开发**：游戏中重复使用的角色、场景等资源的共享。

通过使用享元模式，可以显著提高系统的性能，减少内存的使用，从而提升用户体验。
