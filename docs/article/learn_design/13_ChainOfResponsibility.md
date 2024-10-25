# 责任链模式（Chain of Responsibility Pattern）

责任链模式（Chain of Responsibility Pattern）是一种行为设计模式，它允许多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。请求沿着对象链传递，直到有一个对象处理它为止。

### 关键点

1. **抽象处理者（Handler）**：定义了处理请求的接口，并且持有下一个处理者的引用。
2. **具体处理者（ConcreteHandler）**：实现了处理请求的方法，如果自己能够处理则处理，否则将请求转发给下一个处理者。
3. **客户端（Client）**：创建并且将请求发送给链中的第一个处理者，从而开始请求的处理。

### 示例

假设我们需要构建一个审批系统，有多个处理者来处理不同金额级别的审批请求。我们可以使用责任链模式来实现这个审批流程。

### 1. 定义抽象处理者接口

```csharp
// 抽象处理者
public abstract class Approver
{
    protected Approver successor;  // 后继者

    public void SetSuccessor(Approver successor)
    {
        this.successor = successor;
    }

    public abstract void ProcessRequest(Purchase purchase);
}
```

### 2. 创建具体处理者

```csharp
// 具体处理者 - 主管
public class Supervisor : Approver
{
    public override void ProcessRequest(Purchase purchase)
    {
        if (purchase.Amount <= 1000)
        {
            Console.WriteLine($"{nameof(Supervisor)} approved request #{purchase.Number}");
        }
        else if (successor != null)
        {
            successor.ProcessRequest(purchase);
        }
    }
}

// 具体处理者 - 经理
public class Manager : Approver
{
    public override void ProcessRequest(Purchase purchase)
    {
        if (purchase.Amount <= 5000)
        {
            Console.WriteLine($"{nameof(Manager)} approved request #{purchase.Number}");
        }
        else if (successor != null)
        {
            successor.ProcessRequest(purchase);
        }
    }
}

// 具体处理者 - 总经理
public class Director : Approver
{
    public override void ProcessRequest(Purchase purchase)
    {
        if (purchase.Amount <= 10000)
        {
            Console.WriteLine($"{nameof(Director)} approved request #{purchase.Number}");
        }
        else
        {
            Console.WriteLine($"Request #{purchase.Number} requires a board meeting!");
        }
    }
}
```

### 3. 创建请求类

```csharp
// 请求类
public class Purchase
{
    public int Number { get; set; }
    public double Amount { get; set; }
    public string Purpose { get; set; }

    public Purchase(int number, double amount, string purpose)
    {
        Number = number;
        Amount = amount;
        Purpose = purpose;
    }
}
```

### 4. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        // 创建处理者
        Approver supervisor = new Supervisor();
        Approver manager = new Manager();
        Approver director = new Director();

        // 设置责任链
        supervisor.SetSuccessor(manager);
        manager.SetSuccessor(director);

        // 创建请求
        Purchase purchase1 = new Purchase(1, 800, "Office supplies");
        Purchase purchase2 = new Purchase(2, 3500, "Project materials");
        Purchase purchase3 = new Purchase(3, 15000, "New office furniture");

        // 处理请求
        supervisor.ProcessRequest(purchase1);
        supervisor.ProcessRequest(purchase2);
        supervisor.ProcessRequest(purchase3);
    }
}
```

### 解释

1. **抽象处理者（Approver）**：定义了处理请求的接口 `ProcessRequest`，并且持有下一个处理者的引用 `successor`。
2. **具体处理者（Supervisor、Manager、Director）**：实现了处理请求的具体逻辑，如果自己能够处理则处理，否则转发给下一个处理者。
3. **客户端代码**：创建具体处理者并设置责任链的顺序，然后创建请求并通过第一个处理者处理请求。

### 优点

- **降低耦合度**：请求的发送者和接收者之间解耦，增强了系统的灵活性。
- **增强对象的复用性**：可以灵活地组合和复用处理者对象。
- **增加新的请求处理类容易**：可以通过增加新的具体处理者来扩展责任链，无需修改现有代码。

### 缺点

- **请求不一定被处理**：如果责任链没有正确配置，可能会导致请求无法被处理。
- **性能问题**：由于责任链的特性，请求可能需要沿着链路传递，如果责任链过长或者处理逻辑复杂，可能会影响性能。

### 适用场景

- **多个对象可以处理同一请求**：例如工作流程中的审批流程。
- **动态指定处理链**：可以动态地指定处理链的顺序和组成。
- **需要避免请求发送者和接收者之间的耦合关系**：例如消息处理系统、事件处理等。

### 示例的现实应用

责任链模式在实际应用中有广泛的应用，特别是在处理复杂请求和流程中：

- **审批流程**：不同级别的审批者依次处理请求。
- **异常处理**：在软件系统中，可以通过责任链模式来处理异常，使得每个处理者负责处理一种类型的异常。
- **日志记录**：责任链模式可以用于日志记录器链，每个日志记录器处理不同级别的日志消息。
