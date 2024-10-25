# 状态模式（State Pattern）

状态模式（State Pattern）是一种行为设计模式，它允许对象在内部状态改变时改变其行为，使其看起来像是改变了其类。状态模式通过将状态封装成独立的类，并将客户端和状态对象解耦，使得对象在不同状态下具有不同的行为。

### 关键点

1. **上下文（Context）**：定义客户端感兴趣的接口，维护一个当前状态对象的引用。
2. **状态（State）**：定义一个接口或抽象类，封装与上下文的一个特定状态相关的行为。
3. **具体状态（Concrete State）**：实现状态接口的具体状态类，负责实现该状态下的具体行为。

### 示例

假设我们有一个电梯系统，电梯在不同的状态下具有不同的行为。我们可以使用状态模式来实现电梯状态的管理。

### 1. 定义状态接口和具体状态类

```csharp
// 状态接口
public interface IState
{
    void Handle(Context context);
}

// 具体状态类 - 关门状态
public class ClosedState : IState
{
    public void Handle(Context context)
    {
        Console.WriteLine("Closing the door...");
        context.SetState(new ClosingState());  // 设置为关闭状态
    }
}

// 具体状态类 - 关闭状态
public class ClosingState : IState
{
    public void Handle(Context context)
    {
        Console.WriteLine("Elevator is closing...");
        // 模拟电梯在关闭后的动作
        context.SetState(new RunningState());  // 设置为运行状态
    }
}

// 具体状态类 - 运行状态
public class RunningState : IState
{
    public void Handle(Context context)
    {
        Console.WriteLine("Elevator is running...");
        // 模拟电梯在运行中的动作
        context.SetState(new OpeningState());  // 设置为开门状态
    }
}

// 具体状态类 - 开门状态
public class OpeningState : IState
{
    public void Handle(Context context)
    {
        Console.WriteLine("Opening the door...");
        // 模拟电梯在开门后的动作
        context.SetState(new OpenedState());  // 设置为开门状态
    }
}

// 具体状态类 - 开门状态
public class OpenedState : IState
{
    public void Handle(Context context)
    {
        Console.WriteLine("Elevator is opened...");
        // 模拟电梯在开门状态的动作
        context.SetState(new ClosingState());  // 设置为关闭状态
    }
}
```

### 2. 定义上下文类

```csharp
// 上下文类
public class Context
{
    private IState currentState;

    public Context()
    {
        // 初始状态为关闭状态
        currentState = new ClosedState();
    }

    // 设置当前状态
    public void SetState(IState state)
    {
        currentState = state;
    }

    // 处理当前状态
    public void Request()
    {
        currentState.Handle(this);
    }
}
```

### 3. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        Context context = new Context();

        // 模拟电梯运行过程
        context.Request();  // 关闭门
        context.Request();  // 运行中
        context.Request();  // 开门
        context.Request();  // 开门后关门

        // 可以继续添加其他请求，模拟电梯运行过程
    }
}
```

### 解释

1. **状态接口（IState）**：定义了状态对象的行为接口 `Handle`。
2. **具体状态类**：实现了状态接口，每个具体状态类负责管理自己状态下的行为。
3. **上下文类（Context）**：维护当前状态对象的引用，并定义客户端可以调用的接口 `Request`，通过调用当前状态的 `Handle` 方法来处理请求。

### 优点

- **简化条件逻辑**：状态模式将状态转换逻辑分布在状态类中，避免了大量的条件语句。
- **增加新状态容易**：可以轻松地添加新的状态类和转换规则，扩展性好。
- **更好的可维护性**：状态模式将每个状态的行为局部化，易于单独修改和测试。

### 缺点

- **可能会增加类的数量**：引入多个状态类和状态转换可能会增加系统中的类的数量。

### 适用场景

- **对象的行为取决于其状态，并且需要根据状态改变其行为**：例如电梯、订单状态等。
- **有大量条件语句控制对象行为**：状态模式可以简化复杂的条件逻辑。

### 示例的现实应用

状态模式在许多现实场景中都有应用：

- **电梯控制系统**：电梯在不同状态下的行为，如开门、关门、运行等。
- **工作流引擎**：工作流中不同的状态和转换，如待处理、处理中、已完成等。
- **游戏中角色状态**：角色在不同状态下的行为和能力，如正常、受伤、死亡等。

通过使用状态模式，可以使对象在不同状态下表现出不同的行为，从而使系统更加灵活和可扩展。
