# 建造者模式（Builder Pattern）

建造者模式（Builder Pattern）是一种创建型设计模式，它用于分离对象的构建和表示，使得同样的构建过程可以创建不同的表示。建造者模式通过将复杂对象的构建过程抽象出来，使得构建过程的步骤可以灵活地被替换或修改。

### 关键点

1. **产品（Product）**：要创建的复杂对象。
2. **构建者接口（Builder）**：定义创建产品各个部分的接口。
3. **具体构建者（Concrete Builder）**：实现 Builder 接口，构建和装配各个部分。
4. **指挥者（Director）**：负责按照特定的顺序或规则来调用构建者创建产品。
5. **客户端（Client）**：使用指挥者和构建者来创建产品对象。

### 示例

假设我们要建造一个房子，房子包含地基、墙和屋顶。我们可以使用建造者模式来实现这个需求。

### 1. 定义产品

```csharp
public class House
{
    public string Foundation { get; set; }
    public string Walls { get; set; }
    public string Roof { get; set; }

    public void Show()
    {
        Console.WriteLine($"Foundation: {Foundation}");
        Console.WriteLine($"Walls: {Walls}");
        Console.WriteLine($"Roof: {Roof}");
    }
}
```

### 2. 定义构建者接口

```csharp
public interface IHouseBuilder
{
    void BuildFoundation();
    void BuildWalls();
    void BuildRoof();
    House GetResult();
}
```

### 3. 实现具体构建者

```csharp
public class ConcreteHouseBuilder : IHouseBuilder
{
    private House house = new House();

    public void BuildFoundation()
    {
        house.Foundation = "Concrete Foundation";
        Console.WriteLine("Building concrete foundation...");
    }

    public void BuildWalls()
    {
        house.Walls = "Brick Walls";
        Console.WriteLine("Building brick walls...");
    }

    public void BuildRoof()
    {
        house.Roof = "Shingle Roof";
        Console.WriteLine("Building shingle roof...");
    }

    public House GetResult()
    {
        return house;
    }
}
```

### 4. 创建指挥者

```csharp
public class Director
{
    private IHouseBuilder builder;

    public Director(IHouseBuilder builder)
    {
        this.builder = builder;
    }

    public void Construct()
    {
        builder.BuildFoundation();
        builder.BuildWalls();
        builder.BuildRoof();
    }
}
```

### 5. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        IHouseBuilder builder = new ConcreteHouseBuilder();
        Director director = new Director(builder);

        director.Construct();
        House house = builder.GetResult();
        house.Show();
    }
}
```

### 解释

1. **产品（House）**：表示要创建的复杂对象，包含多个部件。
2. **构建者接口（IHouseBuilder）**：定义了创建产品各个部分的方法。
3. **具体构建者（ConcreteHouseBuilder）**：实现了 `IHouseBuilder` 接口，提供了具体的构建过程。
4. **指挥者（Director）**：负责调用具体构建者的方法来构建产品，按照特定的顺序调用。
5. **客户端代码**：创建具体构建者和指挥者，使用指挥者来构建产品，并获取最终的产品对象。

### 优点

- **更好的控制和灵活性**：可以逐步构建对象，并对构建过程有更精细的控制。
- **易于扩展**：可以创建新的具体构建者来构建不同的产品。
- **封装复杂的创建逻辑**：将产品的创建过程和复杂的创建逻辑封装在具体构建者中，使客户端代码更加简洁。

### 缺点

- **更多的类和代码**：引入了更多的类和代码，使得系统变得更复杂。
- **构建过程固定**：指挥者控制了构建过程的顺序，灵活性可能受到限制。

### 适用场景

- **对象的创建过程复杂**：需要通过多个步骤创建一个复杂对象。
- **需要不同的表示**：需要通过相同的创建过程构建不同的表示或变体。
- **需要逐步构建对象**：需要在构建对象的过程中逐步添加或修改部件。
