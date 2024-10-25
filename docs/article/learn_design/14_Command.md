# 命令模式（Command Pattern）

命令模式（Command Pattern）是一种行为设计模式，它将请求封装成一个对象，从而允许用不同的请求参数化其他对象，并且支持请求的排队、记录日志、撤销等操作。

### 关键点

1. **命令接口（Command）**：声明执行操作的方法 `Execute()`。
2. **具体命令（ConcreteCommand）**：实现命令接口，将一个接收者绑定于一个动作。
3. **接收者（Receiver）**：知道如何执行一个请求相关的操作。
4. **调用者（Invoker）**：要求命令执行请求。
5. **客户端（Client）**：创建具体命令对象，并且设置接收者。

### 示例

假设我们有一个遥控器，可以控制不同的电器，如电灯、音响等。我们可以使用命令模式来实现这个遥控器，使得每个按钮都对应不同的操作。

### 1. 定义命令接口和接收者

```csharp
// 命令接口
public interface ICommand
{
    void Execute();
}

// 具体命令 - 开灯
public class LightOnCommand : ICommand
{
    private Light light;

    public LightOnCommand(Light light)
    {
        this.light = light;
    }

    public void Execute()
    {
        light.TurnOn();
    }
}

// 接收者 - 电灯
public class Light
{
    public void TurnOn()
    {
        Console.WriteLine("Light is on.");
    }

    public void TurnOff()
    {
        Console.WriteLine("Light is off.");
    }
}
```

### 2. 创建调用者和客户端代码

```csharp
// 调用者 - 遥控器
public class RemoteControl
{
    private ICommand command;

    public void SetCommand(ICommand command)
    {
        this.command = command;
    }

    public void PressButton()
    {
        command.Execute();
    }
}

// 客户端
class Program
{
    static void Main(string[] args)
    {
        Light light = new Light();
        ICommand lightOnCommand = new LightOnCommand(light);

        RemoteControl remote = new RemoteControl();
        remote.SetCommand(lightOnCommand);

        remote.PressButton();  // 输出：Light is on.
    }
}
```

### 解释

1. **命令接口（ICommand）**：定义了命令执行的方法 `Execute()`。
2. **具体命令（LightOnCommand）**：实现了命令接口，并且绑定了一个接收者（Light）和一个动作（开灯）。
3. **接收者（Light）**：知道如何执行开灯操作。
4. **调用者（RemoteControl）**：设置和调用命令对象。
5. **客户端代码**：创建具体命令对象并设置给调用者，然后通过调用者执行命令。

### 优点

- **解耦**：将调用操作的对象和知道如何执行操作的对象解耦。
- **增加新的命令**：很容易添加新的命令类和新的接收者。
- **支持撤销和恢复**：可以很容易实现命令的撤销和恢复操作。
- **支持日志记录**：可以对命令进行日志记录，用于审计和调试。

### 缺点

- **类膨胀**：可能会导致命令的类数量激增。

### 适用场景

- **需要将请求封装成对象**：例如需要队列请求、撤销操作等场景。
- **需要支持命令的撤销和恢复**：例如编辑器的撤销操作。
- **需要支持事务**：例如数据库的事务操作。

### 示例的现实应用

命令模式在许多现实应用中都有广泛的应用：

- **GUI 操作**：例如按钮点击触发的操作。
- **操作日志**：例如对用户操作进行记录和回放。
- **事务处理**：例如数据库中的事务操作。
- **遥控器控制**：例如遥控器控制家电设备。

通过命令模式，可以使得请求发送者和接收者之间解耦，同时支持对命令的撤销、恢复和扩展，从而提高系统的灵活性和可维护性。
