# 模板方法模式（Template Method Pattern）

模板方法模式（Template Method Pattern）是一种行为设计模式，它定义了一个操作中的算法框架，允许子类在不改变该框架结构的情况下重写算法的某些步骤。模板方法模式通过将相同的步骤抽象到父类中，将具体实现延迟到子类，从而提供了代码复用和灵活性。

### 关键点

1. **模板方法（Template Method）**：定义了算法的骨架，将具体步骤的实现推迟到子类。
2. **基本方法（Primitive Methods）**：在模板方法中调用的方法，可以是抽象方法或具体方法，子类可以根据需要实现。
3. **钩子方法（Hooks）**：在模板方法中提供默认实现或空实现的方法，子类可以选择性地覆盖。

### 示例

假设我们有一个制作咖啡和茶的应用程序，它们都有一些共同的步骤，例如煮水、冲泡、加入调味品。我们可以使用模板方法模式来实现这些共同步骤，而具体的冲泡方法则由不同的子类实现。

### 1. 定义模板方法类和基本方法

```csharp
// 模板方法类 - 咖啡和茶共同的制作方法
public abstract class BeverageTemplate
{
    // 模板方法，定义了制作饮料的步骤
    public void PrepareBeverage()
    {
        BoilWater();
        Brew();
        PourInCup();
        AddCondiments();
    }

    // 基本方法 - 煮水
    protected void BoilWater()
    {
        Console.WriteLine("Boiling water");
    }

    // 抽象的基本方法 - 冲泡（茶和咖啡的具体冲泡方式不同）
    protected abstract void Brew();

    // 基本方法 - 把饮料倒入杯子
    protected void PourInCup()
    {
        Console.WriteLine("Pouring into cup");
    }

    // 钩子方法 - 添加调味品，默认不做任何事，由子类选择性覆盖
    protected virtual void AddCondiments()
    {
    }
}

// 具体子类 - 咖啡
public class Coffee : BeverageTemplate
{
    protected override void Brew()
    {
        Console.WriteLine("Dripping Coffee through filter");
    }

    protected override void AddCondiments()
    {
        Console.WriteLine("Adding Sugar and Milk");
    }
}

// 具体子类 - 茶
public class Tea : BeverageTemplate
{
    protected override void Brew()
    {
        Console.WriteLine("Steeping the tea");
    }

    // 茶不加调味品，因此不覆盖钩子方法
}
```

### 2. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Making coffee...");
        BeverageTemplate coffee = new Coffee();
        coffee.PrepareBeverage();

        Console.WriteLine("\nMaking tea...");
        BeverageTemplate tea = new Tea();
        tea.PrepareBeverage();
    }
}
```

### 解释

1. **模板方法类（BeverageTemplate）**：定义了制作饮料的模板方法 `PrepareBeverage()`，其中包含了煮水、冲泡、倒入杯子和添加调味品等步骤。
2. **具体子类（Coffee 和 Tea）**：继承自模板方法类，并实现了抽象方法 `Brew()` 和钩子方法 `AddCondiments()`，以实现具体的冲泡方式和是否添加调味品。
3. **客户端代码**：创建具体子类的实例，并调用模板方法来制作咖啡和茶，由于模板方法已经定义了制作饮料的流程，因此客户端不需要关心具体步骤。

### 优点

- **代码复用**：将公共步骤提取到父类中，避免了重复代码。
- **灵活性**：子类可以灵活实现和扩展算法的某些步骤，而不改变模板方法的结构。
- **封装变化**：将不同的实现细节封装在子类中，提高了代码的可维护性。

### 缺点

- **每个不同的实现都需要一个子类**：如果有太多的实现类，可能会导致类的数量增加。

### 适用场景

- **算法的整体结构是固定的，但各个步骤可以灵活变化**：例如生命周期中的某个流程、具有相同格式的报告生成等。
- **需要避免代码中的重复**：将相同的代码抽取到父类中。

### 示例的现实应用

模板方法模式在许多现实应用中都有应用：

- **框架设计**：例如 Web 框架中的请求处理流程、游戏开发中的生命周期管理等。
- **工作流引擎**：例如工作流程中不同步骤的执行顺序和操作。
- **软件开发流程**：例如在软件开发过程中，可以使用模板方法模式定义代码审查、测试、部署等流程的执行顺序和步骤。

通过使用模板方法模式，可以有效地管理和控制算法的执行流程，并提高代码的复用性和可维护性。
