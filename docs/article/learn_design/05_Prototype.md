# 原型模式（Prototype Pattern）

原型模式（Prototype Pattern）是一种创建型设计模式，它通过复制现有的实例来创建新对象，而不是通过类构造函数实例化对象。这种模式使得创建对象更加灵活，可以在运行时动态地创建对象。

### 关键点

1. **原型接口（Prototype Interface）**：定义一个克隆自身的接口。
2. **具体原型（Concrete Prototype）**：实现原型接口，提供克隆自身的方法。
3. **客户端（Client）**：通过调用原型接口的克隆方法来复制对象。

### 示例

假设我们有一个简单的形状类（Shape），包含圆形（Circle）和矩形（Rectangle），我们可以使用原型模式来复制这些形状。

### 1. 定义原型接口

```csharp
public abstract class Shape
{
    public string Id { get; set; }
    public string Type { get; set; }

    public abstract Shape Clone();
}
```

### 2. 实现具体原型

```csharp
// 圆形
public class Circle : Shape
{
    public Circle()
    {
        Type = "Circle";
    }

    public override Shape Clone()
    {
        return (Shape)this.MemberwiseClone();
    }
}

// 矩形
public class Rectangle : Shape
{
    public Rectangle()
    {
        Type = "Rectangle";
    }

    public override Shape Clone()
    {
        return (Shape)this.MemberwiseClone();
    }
}
```

### 3. 创建原型管理器

```csharp
public class ShapeCache
{
    private static Dictionary<string, Shape> shapeMap = new Dictionary<string, Shape>();

    public static Shape GetShape(string shapeId)
    {
        Shape cachedShape = shapeMap[shapeId];
        return cachedShape.Clone();
    }

    public static void LoadCache()
    {
        Circle circle = new Circle();
        circle.Id = "1";
        shapeMap.Add(circle.Id, circle);

        Rectangle rectangle = new Rectangle();
        rectangle.Id = "2";
        shapeMap.Add(rectangle.Id, rectangle);
    }
}
```

### 4. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        ShapeCache.LoadCache();

        Shape clonedShape1 = ShapeCache.GetShape("1");
        Console.WriteLine("Shape : " + clonedShape1.Type);  // 输出：Shape : Circle

        Shape clonedShape2 = ShapeCache.GetShape("2");
        Console.WriteLine("Shape : " + clonedShape2.Type);  // 输出：Shape : Rectangle
    }
}
```

### 解释

1. **原型接口（Shape）**：定义了一个 `Clone` 方法，用于克隆自身。
2. **具体原型（Circle 和 Rectangle）**：实现了 `Clone` 方法，使用 `MemberwiseClone` 方法实现浅拷贝。
3. **原型管理器（ShapeCache）**：保存了各种形状的原型，并提供获取这些原型的克隆的方法。
4. **客户端代码**：通过原型管理器获取形状的克隆对象，并使用这些对象。

### 优点

- **性能优化**：通过克隆现有对象来创建新对象，比直接实例化对象更高效，尤其是当对象的创建成本较高时。
- **简化对象创建**：隐藏了对象的创建复杂性，使得客户端代码更加简洁。
- **动态对象创建**：可以在运行时动态地创建对象，而不依赖于具体类。

### 缺点

- **深拷贝和浅拷贝问题**：默认的克隆方法是浅拷贝，对于包含引用类型的对象，需要额外处理深拷贝。
- **复杂性增加**：引入了克隆方法和原型管理器，增加了系统的复杂性。
- **需要实现 Clone 方法**：每个具体原型类都需要实现克隆方法，这对某些复杂对象可能不是很容易。

### 适用场景

- **创建成本较高的对象**：如大型对象或复杂对象，通过克隆现有对象来创建新对象可以显著降低成本。
- **需要大量相似对象**：如游戏中的敌人、NPC 等，可以通过克隆原型来创建大量相似对象。
- **隐藏对象创建复杂性**：如需要隐藏对象创建的细节，简化客户端代码。
