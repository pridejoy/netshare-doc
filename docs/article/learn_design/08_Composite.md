# 组合模式（Composite Pattern）

组合模式（Composite Pattern）是一种结构型设计模式，它将对象组合成树形结构以表示“部分-整体”的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。该模式旨在让客户端可以统一地处理单个对象和对象的组合。

### 关键点

1. **组件（Component）**：定义了组合对象和叶子对象的共同接口或抽象类。
2. **叶子（Leaf）**：表示组合的基本元素，不包含其他子对象。
3. **组合（Composite）**：定义了包含子对象的类，并实现了组件接口。组合对象可以包含叶子和其他组合对象。

### 示例

假设我们要构建一个组织结构的层次关系，其中包括公司、部门和员工。我们可以使用组合模式来实现这个需求。

### 1. 定义组件接口

```csharp
// 组件接口 - 员工
public abstract class Employee
{
    protected string name;
    protected string position;

    public Employee(string name, string position)
    {
        this.name = name;
        this.position = position;
    }

    public abstract void Display(int indent);
}
```

### 2. 实现叶子类

```csharp
// 叶子类 - 员工
public class IndividualEmployee : Employee
{
    public IndividualEmployee(string name, string position) : base(name, position) { }

    public override void Display(int indent)
    {
        Console.WriteLine(new String('-', indent) + " " + name + " (" + position + ")");
    }
}
```

### 3. 实现组合类

```csharp
// 组合类 - 部门
public class Department : Employee
{
    private List<Employee> _employees = new List<Employee>();

    public Department(string name, string position) : base(name, position) { }

    public void Add(Employee employee)
    {
        _employees.Add(employee);
    }

    public void Remove(Employee employee)
    {
        _employees.Remove(employee);
    }

    public override void Display(int indent)
    {
        Console.WriteLine(new String('-', indent) + " " + name + " (" + position + ")");
        foreach (Employee employee in _employees)
        {
            employee.Display(indent + 2);
        }
    }
}
```

### 4. 客户端代码

```csharp
class Program
{
    static void Main(string[] args)
    {
        // 创建个别员工
        Employee emp1 = new IndividualEmployee("John", "Developer");
        Employee emp2 = new IndividualEmployee("Jane", "Designer");

        // 创建部门并添加员工
        Department dept = new Department("Development", "Head of Development");
        dept.Add(emp1);
        dept.Add(emp2);

        // 创建公司并添加部门
        Department company = new Department("Tech Corp", "CEO");
        company.Add(dept);

        // 显示组织结构
        company.Display(1);
    }
}
```

### 解释

1. **组件接口（Employee）**：定义了所有员工（包括个别员工和部门）共有的接口，并提供了显示方法 `Display`。
2. **叶子类（IndividualEmployee）**：表示个别员工，具体实现了 `Display` 方法。
3. **组合类（Department）**：表示部门，可以包含多个员工或子部门，具体实现了 `Display` 方法，并提供添加和删除子员工的方法。
4. **客户端代码**：创建个别员工、部门和公司，使用组合类的方法来构建组织结构，并显示该结构。

### 优点

- **清晰的层次结构**：可以清晰地定义“部分-整体”的层次结构。
- **一致性**：客户端可以一致地对待个别对象和组合对象，而不需要关心它们的具体类型。
- **便于扩展**：可以很容易地增加新的叶子和组合类，而不会影响现有代码。

### 缺点

- **复杂性增加**：如果设计的不合理，可能会使系统变得复杂。
- **子节点管理复杂**：组合类需要管理其子节点的添加、删除和遍历，可能导致复杂的代码逻辑。

### 适用场景

- **表示树形结构**：如文件系统、组织结构、GUI 的控件层次等。
- **希望客户端一致地处理单个对象和组合对象**：通过组合模式，客户端可以不用关心对象是个别的还是组合的，统一处理。
- **需要简化客户端代码**：通过组合模式，可以将复杂的对象层次结构隐藏在简单的接口后面，使客户端代码更简洁。
