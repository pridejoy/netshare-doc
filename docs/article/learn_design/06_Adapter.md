# 适配器模式（Adapter Pattern）

适配器模式（Adapter Pattern）是一种结构型设计模式，它用于将一个类的接口转换成客户端期望的另一个接口，从而使得原本因接口不兼容而无法一起工作的类可以协同工作。适配器模式有两种实现方式：类适配器和对象适配器。

### 关键点

1. **目标接口（Target Interface）**：定义客户端期望的接口。
2. **需要适配的类（Adaptee）**：具有不兼容接口的现有类。
3. **适配器（Adapter）**：实现目标接口并通过组合或继承使得需要适配的类的接口适配目标接口。
4. **客户端（Client）**：通过目标接口使用适配器。

### 示例

假设我们有一个充电器（Charger）类，它只接受USB接口的设备，但我们现在有一个老式的电源（OldPowerSource）类，它使用不同的接口。我们可以使用适配器模式来解决这个问题。

### 1. 定义目标接口

```csharp
// 目标接口 - 充电器
public interface ICharger
{
    void Charge();
}
```

### 2. 定义需要适配的类

```csharp
// 需要适配的类 - 老式电源
public class OldPowerSource
{
    public void ProvidePower()
    {
        Console.WriteLine("Providing power from old power source...");
    }
}
```

### 3. 创建适配器

```csharp
// 适配器 - 适配老式电源到充电器
public class PowerSourceAdapter : ICharger
{
    private OldPowerSource oldPowerSource;

    public PowerSourceAdapter(OldPowerSource oldPowerSource)
    {
        this.oldPowerSource = oldPowerSource;
    }

    public void Charge()
    {
        oldPowerSource.ProvidePower();
    }
}
```

### 4. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        // 老式电源
        OldPowerSource oldPowerSource = new OldPowerSource();
        
        // 使用适配器使老式电源适配充电器接口
        ICharger charger = new PowerSourceAdapter(oldPowerSource);
        
        // 客户端通过充电器接口使用老式电源
        charger.Charge();  // 输出：Providing power from old power source...
    }
}
```

### 解释

1. **目标接口（ICharger）**：定义了客户端期望的充电器接口。
2. **需要适配的类（OldPowerSource）**：具有不兼容接口的老式电源类。
3. **适配器（PowerSourceAdapter）**：实现了目标接口 `ICharger`，通过组合 `OldPowerSource` 类的实例，使其接口适配目标接口。
4. **客户端代码**：通过目标接口 `ICharger` 使用适配器 `PowerSourceAdapter`，使得客户端可以使用老式电源。

### 优点

- **提高了类的复用性**：适配器模式使得原本不兼容的类可以一起工作，提高了类的复用性。
- **灵活性和扩展性好**：可以在不修改现有类的情况下，通过适配器来扩展系统功能。
- **符合开闭原则**：通过引入适配器，可以在不修改现有代码的情况下增加新功能。

### 缺点

- **增加了系统的复杂性**：引入适配器后，系统的复杂性增加，需要维护更多的代码。
- **性能开销**：由于多了一层适配器调用，可能会有一定的性能开销。

### 适用场景

- **系统需要使用现有类，而这些类的接口不符合系统的需求**：通过适配器模式，可以使这些类的接口符合系统的需求。
- **需要重用一些现有的类，这些类可能没有完整的接口**：适配器模式可以使这些类的接口满足新环境的要求。
- **需要使用一些不兼容的第三方库或遗留系统**：通过适配器模式，可以将这些不兼容的接口适配为系统需要的接口。
