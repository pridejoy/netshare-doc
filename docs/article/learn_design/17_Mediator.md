# 中介者模式（Mediator Pattern）

中介者模式（Mediator Pattern）是一种行为设计模式，它用于降低多个对象和类之间的直接通信复杂性。中介者模式通过引入一个中介对象来封装一系列对象之间的交互，使各对象不再相互引用，从而减少耦合，增加系统的可复用性和可维护性。

### 关键点

1. **中介者（Mediator）**：定义了一个接口用于与各同事对象通信。
2. **具体中介者（ConcreteMediator）**：实现了中介者接口，负责协调各同事对象的交互关系。
3. **同事类（Colleague）**：每个同事类都知道中介者对象，与其他同事通过中介者进行通信。

### 示例

假设我们有一个简单的聊天室系统，其中用户可以发送消息给其他用户。使用中介者模式可以有效地管理用户之间的通信，而不需要直接耦合每个用户对象。

### 1. 定义中介者接口和具体中介者类

```csharp
// 中介者接口
public interface IChatRoomMediator
{
    void SendMessage(User sender, string message);
}

// 具体中介者类
public class ChatRoom : IChatRoomMediator
{
    public void SendMessage(User sender, string message)
    {
        Console.WriteLine($"{sender.Name} sends message: {message}");
    }
}
```

### 2. 定义同事类（用户类）

```csharp
// 同事类 - 用户类
public class User
{
    private IChatRoomMediator mediator;
    public string Name { get; private set; }

    public User(IChatRoomMediator mediator, string name)
    {
        this.mediator = mediator;
        this.Name = name;
    }

    public void SendMessage(string message)
    {
        mediator.SendMessage(this, message);
    }
}
```

### 3. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        // 创建中介者
        IChatRoomMediator chatRoom = new ChatRoom();

        // 创建用户
        User user1 = new User(chatRoom, "User1");
        User user2 = new User(chatRoom, "User2");

        // 用户发送消息
        user1.SendMessage("Hello, User2!");
        user2.SendMessage("Hi, User1!");
    }
}
```

### 解释

1. **中介者接口（IChatRoomMediator）**：定义了中介者对象与同事对象通信的方法。
2. **具体中介者类（ChatRoom）**：实现了中介者接口，处理用户之间的消息传递。
3. **同事类（User）**：每个用户对象持有一个中介者对象的引用，通过中介者发送消息给其他用户。
4. **客户端代码**：创建中介者和多个用户对象，并且通过中介者进行用户之间的消息传递。

### 优点

- **减少耦合**：通过中介者对象将系统中的对象解耦，使得对象之间的交互更加灵活和可维护。
- **集中控制**：中介者模式将对象之间的交互逻辑集中管理和控制，简化了系统的复杂性。
- **增加复用性**：可以更容易地复用中介者和同事类，而不需要修改现有代码。

### 缺点

- **中介者过于集中**：如果中介者对象过于复杂，可能会变成一个大型的单点集中，影响系统的性能和扩展性。

### 适用场景

- **一组对象之间存在复杂的引用关系**：例如 GUI 组件之间的交互。
- **多个对象之间需要进行复杂的通信**：例如多个部件之间的协作。
- **对象行为有时候依赖于其他对象的状态**：通过中介者可以统一管理对象之间的状态变化。

### 示例的现实应用

中介者模式在许多现实场景中都有应用：

- **聊天室系统**：例如聊天室中的用户之间的消息传递。
- **飞机控制系统**：例如飞机上的各个控制部件之间的协调和通信。
- **交通管理系统**：例如城市中的交通信号系统，通过中央控制中心来协调各个交通信号灯的变换。

通过使用中介者模式，可以有效地管理和减少对象之间的直接耦合，提高系统的灵活性和可维护性。
