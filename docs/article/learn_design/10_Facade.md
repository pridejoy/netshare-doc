# 外观模式（Facade Pattern）

外观模式（Facade Pattern）是一种结构型设计模式，它为子系统中的一组接口提供一个一致的界面，使得子系统更容易使用。外观模式通过定义一个高层接口，简化了子系统的复杂性，使得客户端与子系统之间的交互更加方便和简单。

### 关键点

1. **外观类（Facade）**：提供一个高层接口，简化子系统的使用。
2. **子系统（Subsystem）**：包含了实际工作的类，这些类不知道外观类的存在，它们完成子系统的功能。
3. **客户端（Client）**：通过外观类与子系统交互，而不直接与子系统的类交互。

### 示例

假设我们有一个复杂的计算机系统，包括 CPU、内存、硬盘等组件。我们希望通过一个简单的接口来启动和关闭计算机。我们可以使用外观模式来实现这个需求。

### 1. 定义子系统类

```csharp
public class CPU
{
    public void Start()
    {
        Console.WriteLine("CPU started.");
    }

    public void Shutdown()
    {
        Console.WriteLine("CPU shutdown.");
    }
}

public class Memory
{
    public void Load()
    {
        Console.WriteLine("Memory loaded.");
    }

    public void Unload()
    {
        Console.WriteLine("Memory unloaded.");
    }
}

public class HardDrive
{
    public void Read()
    {
        Console.WriteLine("HardDrive read.");
    }

    public void Write()
    {
        Console.WriteLine("HardDrive write.");
    }
}
```

### 2. 创建外观类

```csharp
public class Computer
{
    private CPU cpu;
    private Memory memory;
    private HardDrive hardDrive;

    public Computer()
    {
        cpu = new CPU();
        memory = new Memory();
        hardDrive = new HardDrive();
    }

    public void Start()
    {
        cpu.Start();
        memory.Load();
        hardDrive.Read();
        Console.WriteLine("Computer started.");
    }

    public void Shutdown()
    {
        hardDrive.Write();
        memory.Unload();
        cpu.Shutdown();
        Console.WriteLine("Computer shutdown.");
    }
}
```

### 3. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        Computer computer = new Computer();

        computer.Start();     // 输出：CPU started. Memory loaded. HardDrive read. Computer started.
        computer.Shutdown();  // 输出：HardDrive write. Memory unloaded. CPU shutdown. Computer shutdown.
    }
}
```

### 解释

1. **子系统类（CPU、Memory、HardDrive）**：这些类是计算机系统的各个部分，提供了启动和关闭的方法。
2. **外观类（Computer）**：定义了一个简化的接口，通过组合子系统类来实现启动和关闭计算机的功能。
3. **客户端代码**：通过外观类 `Computer` 与子系统交互，而不直接与子系统的类交互。

### 优点

- **简化接口**：提供一个简化的接口，减少了客户端与子系统之间的依赖关系。
- **松散耦合**：将客户端与子系统分离，使得子系统的变化不会影响到客户端。
- **更好的分层**：有助于定义系统中的分层结构，使得代码更容易维护和理解。

### 缺点

- **可能增加系统复杂性**：引入外观类后，可能会增加系统的复杂性，特别是当外观类过于复杂时。
- **不符合开闭原则**：如果需要修改外观类以适应新的需求，可能会影响到客户端代码。

### 适用场景

- **简化复杂系统的使用**：当需要为一个复杂的子系统提供一个简单的接口时，可以使用外观模式。
- **需要松散耦合**：当需要降低子系统与客户端之间的耦合度时，可以使用外观模式。
- **定义系统的分层结构**：当需要为系统定义分层结构，使得每一层只与相邻的层交互时，可以使用外观模式。

### 示例的现实应用

在现实应用中，外观模式非常常见。一个典型的例子是数据库访问。我们通常通过一个数据库访问类（外观类）来隐藏实际的数据库操作细节（子系统），简化数据库的使用。例如，在使用 ADO.NET 或 Entity Framework 时，我们通常会创建一个数据访问层，它对外提供简单的接口，而内部处理实际的数据库操作。
