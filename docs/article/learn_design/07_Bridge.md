# 桥接模式（Bridge Pattern）

桥接模式（Bridge Pattern）是一种结构型设计模式，它通过将抽象部分与实现部分分离，使它们可以独立地变化。桥接模式旨在应对类的多维度变化，避免类的数量急剧增加。桥接模式通过组合而非继承来处理扩展问题，使得抽象与实现可以独立扩展。

### 关键点

1. **抽象（Abstraction）**：定义抽象类，并包含一个对实现部分对象的引用。
2. **细化抽象（Refined Abstraction）**：扩展抽象类，增加新的行为。
3. **实现（Implementor）**：定义实现部分的接口。
4. **具体实现（Concrete Implementor）**：实现实现部分接口的具体类。

### 示例

假设我们有一个图形绘制应用程序，需要绘制不同形状（如圆形、矩形）并且可以在不同平台（如 Windows、Linux）上显示。我们可以使用桥接模式来实现这一需求。

### 1. 定义实现接口

```csharp
// 实现接口 - 图形绘制接口
public interface IDrawAPI
{
    void DrawCircle(int radius, int x, int y);
}
```

### 2. 实现具体实现

```csharp
// 具体实现 - 在 Windows 平台绘制
public class WindowsDrawAPI : IDrawAPI
{
    public void DrawCircle(int radius, int x, int y)
    {
        Console.WriteLine($"Drawing Circle [radius: {radius}, x: {x}, y: {y}] on Windows.");
    }
}

// 具体实现 - 在 Linux 平台绘制
public class LinuxDrawAPI : IDrawAPI
{
    public void DrawCircle(int radius, int x, int y)
    {
        Console.WriteLine($"Drawing Circle [radius: {radius}, x: {x}, y: {y}] on Linux.");
    }
}
```

### 3. 定义抽象类

```csharp
// 抽象类 - 图形
public abstract class Shape
{
    protected IDrawAPI drawAPI;

    protected Shape(IDrawAPI drawAPI)
    {
        this.drawAPI = drawAPI;
    }

    public abstract void Draw();
}
```

### 4. 实现细化抽象

```csharp
// 细化抽象 - 圆形
public class Circle : Shape
{
    private int x, y, radius;

    public Circle(int x, int y, int radius, IDrawAPI drawAPI) : base(drawAPI)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    public override void Draw()
    {
        drawAPI.DrawCircle(radius, x, y);
    }
}
```

### 5. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        Shape windowsCircle = new Circle(100, 100, 10, new WindowsDrawAPI());
        Shape linuxCircle = new Circle(100, 100, 10, new LinuxDrawAPI());

        windowsCircle.Draw();  // 输出：Drawing Circle [radius: 10, x: 100, y: 100] on Windows.
        linuxCircle.Draw();    // 输出：Drawing Circle [radius: 10, x: 100, y: 100] on Linux.
    }
}
```

### 解释

1. **实现接口（IDrawAPI）**：定义了绘制图形的方法 `DrawCircle`。
2. **具体实现（WindowsDrawAPI 和 LinuxDrawAPI）**：实现了 `IDrawAPI` 接口，提供了在不同平台上的绘制实现。
3. **抽象类（Shape）**：包含一个 `IDrawAPI` 类型的引用，并定义了抽象方法 `Draw`。
4. **细化抽象（Circle）**：继承自 `Shape` 类，实现了 `Draw` 方法，调用 `IDrawAPI` 接口的方法进行绘制。
5. **客户端代码**：创建了不同平台的 `Circle` 对象，并调用 `Draw` 方法进行绘制。

### 优点

- **分离抽象和实现**：抽象和实现可以独立变化，不会互相影响。
- **提高扩展性**：可以分别扩展抽象部分和实现部分，增加新的实现和新的抽象而无需修改现有代码。
- **符合开闭原则**：可以通过增加新的具体实现和新的细化抽象来扩展系统，而不影响现有系统。

### 缺点

- **增加系统复杂性**：引入了更多的类和接口，使系统复杂性增加。
- **可能需要引入额外的层次**：如果抽象和实现之间的关系不是非常清晰，可能会导致设计过于复杂。

### 适用场景

- **需要分离抽象和实现**：希望将抽象和实现部分解耦，以便它们可以独立变化。
- **多维度变化**：系统有多个变化维度，需要在多个维度上进行扩展和变化。
- **避免类爆炸**：希望通过组合而不是继承来管理多个类的扩展，避免因类的多重继承导致类爆炸。
