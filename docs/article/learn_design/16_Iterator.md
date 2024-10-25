# 迭代器模式（Iterator Pattern）

迭代器模式（Iterator Pattern）是一种行为设计模式，它提供一种方法顺序访问一个聚合对象中各个元素，而不暴露该对象的内部表示。通过迭代器模式，可以在不需要了解集合内部结构的情况下，访问集合中的每个元素

### 关键点

1. **迭代器接口（Iterator）**：定义了访问和遍历元素的方法。
2. **具体迭代器（ConcreteIterator）**：实现迭代器接口，负责管理当前位置并实现迭代器接口的方法。
3. **聚合接口（Aggregate）**：定义创建迭代器对象的方法。
4. **具体聚合类（ConcreteAggregate）**：实现聚合接口，返回具体的迭代器对象。
5. **客户端（Client）**：通过迭代器接口遍历集合中的元素，而不需要了解集合的内部结构。

### 示例

假设我们有一个简单的集合类 `MyCollection`，可以存储整数，并且我们希望使用迭代器模式来遍历这个集合。

### 1. 定义迭代器接口和聚合接口

```csharp
// 迭代器接口
public interface IIterator
{
    bool HasNext();
    int Next();
}

// 聚合接口
public interface IAggregate
{
    IIterator GetIterator();
}
```

### 2. 创建具体迭代器和具体聚合类

```csharp
// 具体迭代器
public class ConcreteIterator : IIterator
{
    private int[] collection;
    private int position = 0;

    public ConcreteIterator(int[] collection)
    {
        this.collection = collection;
    }

    public bool HasNext()
    {
        return position < collection.Length;
    }

    public int Next()
    {
        int result = collection[position];
        position++;
        return result;
    }
}

// 具体聚合类
public class MyCollection : IAggregate
{
    private int[] collection;

    public MyCollection()
    {
        collection = new int[] { 1, 2, 3, 4, 5 };
    }

    public IIterator GetIterator()
    {
        return new ConcreteIterator(collection);
    }
}
```

### 3. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        MyCollection collection = new MyCollection();
        IIterator iterator = collection.GetIterator();

        while (iterator.HasNext())
        {
            int item = iterator.Next();
            Console.WriteLine(item);
        }
    }
}
```

### 解释

1. **迭代器接口（IIterator）**：定义了访问和遍历元素的方法 `HasNext()` 和 `Next()`。
2. **具体迭代器（ConcreteIterator）**：实现了迭代器接口，管理当前位置并提供对集合元素的访问。
3. **聚合接口（IAggregate）**：定义了创建迭代器的方法 `GetIterator()`。
4. **具体聚合类（MyCollection）**：实现了聚合接口，返回一个具体的迭代器对象 `ConcreteIterator`。
5. **客户端代码**：通过迭代器接口遍历集合中的元素，而不需要了解集合的内部结构。

### 优点

- **简化客户端代码**：客户端不需要知道如何遍历集合，只需要通过迭代器接口来访问集合元素。
- **支持多种遍历方式**：具体迭代器可以实现不同的遍历策略，例如顺序遍历、逆序遍历等。
- **更好的封装性**：集合类可以专注于自己的数据结构，迭代器类负责遍历逻辑，各自职责清晰。

### 缺点

- **增加了类的数量**：引入了迭代器接口和具体迭代器类，可能会增加代码量和类的数量。

### 适用场景

- **需要对集合对象进行多种方式遍历**：例如顺序遍历、逆序遍历等。
- **希望将集合对象的遍历算法与集合对象本身分离**：迭代器模式可以将算法封装在迭代器中，使得集合对象的结构和遍历算法可以独立变化。

### 示例的现实应用

迭代器模式在许多现实应用中都有广泛的应用：

- **标准库中的迭代器**：例如 C# 中的 `IEnumerable` 和 `IEnumerator`。
- **数据库结果集的遍历**：例如对查询结果进行逐行遍历。
- **GUI 控件中的元素遍历**：例如对窗口中的控件集合进行遍历和操作。

通过使用迭代器模式，可以使得集合类和遍历算法分离，提高系统的灵活性和可维护性，同时简化客户端代码的复杂度。
