# Csharp代码大全

超有用的Csharp代码大全｜入门进阶。
> [!TIP]
> 超有用的Csharp代码大全｜入门进阶。 关键代码示例 基础语法、数据类型、条件判断、循环、数组、方法、面向对象、继承、接口、抽象类、多态、封装、静态变量、内部类、匿名类、泛型、集合框架、异常处理、文件I/O、多线程、同步、高级多线程概念、事件和委托、Lambda表达式、表达式树、可空值类型、动态类型、反射、序列化和反序列化、单元测试、内存映射文件、正则表达式、异步流、模式匹配、记录类型、顶级语句、目标类型的新语法、只读属性、接口的默认实现、表达式-bodied成员、属性的只读结构、局部函数、可空引用类型、模块初始化器、全局using指令、文件范围的using声明、隐藏实现的成员、静态抽象成员、目标类型的new表达式、记录类型的with表达式、模式匹配的switch表达式、异步流。

<!-- 超有用的Csharp代码大全｜入门进阶。关键代码示例 基础语法、数据类型、条件判断、循环、数组、方法、面向对象、继承、接口、抽象类、多态、封装、静态变量、内部类、匿名类、泛型、集合框架、异常处理、文件 I/O、文件目录操作、多线程、同步、高级多线程概念、异步编程（Async/Await）、事件和委托、Lambda表达式、表达式树、可空值类型（Nullable Value Types）、动态类型、反射、序列化和反序列化、单元测试（使用NUnit）、内存映射文件、正则表达式、异步流（C# 8.0 引入）、模式匹配（Pattern Matching）、记录类型（Record Types，C# 9.0 引入）、顶级语句（Top-Level Statements，C# 9.0 引入）、目标类型的新语法（Target-typed new，C# 9.0 引入）、只读属性（Read-Only Properties，C# 9.0 引入）、接口的默认实现（Default Interface Implementations，C# 8.0 引入）、表达式-bodied成员（Expression-bodied Members，C# 6.0 引入）、属性的只读结构（Read-Only Structs，C# 7.2 引入）、局部函数（Local Functions，C# 7.0 引入）、可空引用类型（Nullable Reference Types，C# 8.0 引入）、模块初始化器（Module Initializers，C# 10.0 引入）、全局using指令（Global Using Directives，C# 10.0 引入）、文件范围的using声明（File-Scope Namespaces，C# 10.0 引入）、隐藏实现的成员（Hidden Implementation Members，C# 10.0 引入）、可空值引用类型（Nullable Reference Types，C# 8.0 引入）、静态抽象成员（Static Abstract Members，C# 9.0 引入）、目标类型的new表达式（Target-typed new expressions，C# 9.0 引入）、记录类型的with表达式（Record types with 'with' expressions，C# 9.0 引入）、模式匹配的switch表达式（Pattern matching with 'switch' expressions，C# 8.0 引入）、异步流（Asynchronous Streams，C# 9.0 引入） -->

### 基础语法

```csharp
using System;

namespace MyNamespace
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, C#!");
        }
    }
}
```

### 数据类型

```csharp
bool isTrue = true;
byte myByte = 255;
sbyte mySByte = -128;
short myShort = 32767;
int myInt = 2147483647;
long myLong = 9223372036854775807;
float myFloat = 3.40282e+38F;
double myDouble = 1.7976931348623157E+308;
decimal myDecimal = 7.92281625e+28;
char myChar = 'A';
string myString = "Hello";
```

### 条件判断

```csharp
int number = 5;
if (number < 10)
{
    Console.WriteLine("The number is less than 10.");
}
else
{
    Console.WriteLine("The number is greater than or equal to 10.");
}
```

### 循环

```csharp
for (int i = 0; i < 10; i++)
{
    Console.WriteLine(i);
}

int[] numbers = { 1, 2, 3, 4, 5 };
foreach (int num in numbers)
{
    Console.WriteLine(num);
}
```

### 数组

```csharp
int[] myArray = new int[5] { 1, 2, 3, 4, 5 };
Console.WriteLine(myArray[2]); // Outputs 3

int[,] my2DArray = new int[3, 2] { { 1, 2 }, { 3, 4 }, { 5, 6 } };
Console.WriteLine(my2DArray[2, 1]); // Outputs 6
```

### 方法

```csharp
static int Add(int a, int b)
{
    return a + b;
}

static void Main()
{
    int result = Add(5, 10);
    Console.WriteLine(result); // Outputs 15
}
```

### 面向对象

```csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public void Introduce()
    {
        Console.WriteLine($"Hello, my name is {Name} and I am {Age} years old.");
    }
}

static void Main()
{
    Person person = new Person { Name = "Alice", Age = 30 };
    person.Introduce();
}
```

### 继承

```csharp
public class Animal
{
    public void Eat()
    {
        Console.WriteLine("Animal is eating.");
    }
}

public class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine("Dog is barking.");
    }
}

static void Main()
{
    Dog myDog = new Dog();
    myDog.Eat(); // Inherited method
    myDog.Bark(); // Dog specific method
}
```

### 接口

```csharp
public interface IShape
{
    double Area();
}

public class Circle : IShape
{
    public double Radius { get; set; }

    public double Area()
    {
        return Math.PI * Radius * Radius;
    }
}

static void Main()
{
    IShape myShape = new Circle { Radius = 5 };
    Console.WriteLine(myShape.Area());
}
```

### 抽象类

```csharp
public abstract class Shape
{
    public abstract double Area();
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public override double Area()
    {
        return Width * Height;
    }
}

static void Main()
{
    Shape myShape = new Rectangle { Width = 5, Height = 10 };
    Console.WriteLine(myShape.Area());
}
```

### 多态

```csharp
public class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Some sound");
    }
}

public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Bark");
    }
}

static void AnimalSound(Animal animal)
{
    animal.MakeSound();
}

static void Main()
{
    Animal myAnimal = new Animal();
    Animal myDog = new Dog();

    AnimalSound(myAnimal); // Outputs "Some sound"
    AnimalSound(myDog);    // Outputs "Bark"
}
```

### 封装

```csharp
public class BankAccount
{
    private decimal _balance;

    public decimal Balance
    {
        get { return _balance; }
        private set { _balance = value; }
    }

    public void Deposit(decimal amount)
    {
        _balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (_balance >= amount)
        {
            _balance -= amount;
        }
    }
}
```

### 静态变量

```csharp
public class MathUtils
{
    public static double Pi = 3.14159;

    public static double AreaOfCircle(double radius)
    {
        return Pi * radius * radius;
    }
}

static void Main()
{
    double area = MathUtils.AreaOfCircle(5);
    Console.WriteLine(area);
}
```

### 内部类

```csharp
public class OuterClass
{
    public class InnerClass
    {
        public void Print()
        {
            Console.WriteLine("Inner class");
        }
    }
}

static void Main()
{
    OuterClass.InnerClass inner = new OuterClass.InnerClass();
    inner.Print();
}
```

### 匿名类

```csharp
var person = new
{
    Name = "John Doe",
    Age = 30
};

Console.WriteLine(person.Name);
```

### 泛型

```csharp
public class GenericList<T>
{
    private List<T> _items = new List<T>();

    public void Add(T item)
    {
        _items.Add(item);
    }

    public T Get(int index)
    {
        return _items[index];
    }
}

static void Main()
{
    GenericList<int> intList = new GenericList<int>();
    intList.Add(1);
    intList.Add(2);
    Console.WriteLine(intList.Get(0)); // Outputs 1
}
```

### 集合框架

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
numbers.Add(6);
int lastNumber = numbers.Last();
Console.WriteLine(lastNumber); // Outputs 6

Dictionary<string, int> scores = new Dictionary<string, int>
{
    { "Alice", 90 },
    { "Bob", 85 }
};
scores["Alice"] = 95;
Console.WriteLine(scores["Alice"]); // Outputs 95
```

### 异常处理

```csharp
try
{
    int result = 10 / 0; // Division by zero
}
catch (DivideByZeroException ex)
{
    Console.WriteLine("Cannot divide by zero: " + ex.Message);
}
finally
{
    Console.WriteLine("This will always be executed.");
}
```

### 文件I/O

```csharp
string path = "example.txt";
string textToWrite = "Hello, World!";

// Writing to a file
System.IO.File.WriteAllText(path, textToWrite);

// Reading from a file
string fileContent = System.IO.File.ReadAllText(path);
Console.WriteLine(fileContent);
```

### 文件目录操作

```csharp
//创建目录
Directory.CreateDirectory("newDirectory");
//获取目录下所有文件和子目录
var files = Directory.GetFiles("directoryPath");
var subDirectories = Directory.GetDirectories("directoryPath");
//移动目录
Directory.Move("sourcePath", "destinationPath");
//删除目录及其内容
Directory.Delete("directoryPath", true);
//获取目录信息
var di = new DirectoryInfo("directoryPath");
Console.WriteLine(di.CreationTime);
//遍历目录树
void TraverseDirectory(DirectoryInfo di)
{
    foreach (FileInfo fi in di.EnumerateFiles())
    {
        Console.WriteLine(fi.Name);
    }
    foreach (DirectoryInfo subDi in di.EnumerateDirectories())
    {
        TraverseDirectory(subDi);
    }
}
 
```

### 多线程

```csharp
Thread thread = new Thread(() => Console.WriteLine("Hello from a new thread!"));
thread.Start();
thread.Join(); // Wait for the thread to finish
```

### 同步

```csharp
object lockObject = new object();

void ThreadSafeMethod()
{
    lock (lockObject)
    {
        // Code that needs to be thread-safe
    }
}
```

### 高级多线程概念

```csharp
// Using Parallel class for parallel loop
Parallel.For(0, 10, i =>
{
    Console.WriteLine($"Thread: {Thread.CurrentThread.ManagedThreadId}, i: {i}");
});
```

### 异步编程（Async/Await）

```csharp
using System;
using System.Threading.Tasks;

public class AsyncDemo
{
    public async Task DoAsyncWork()
    {
        await Task.Delay(1000); // Simulate work with async delay
        Console.WriteLine("Work completed asynchronously.");
    }
}

static async Task Main()
{
    var demo = new AsyncDemo();
    await demo.DoAsyncWork();
    Console.WriteLine("Main thread continues after async work.");
}
```

### 事件和委托

```csharp
using System;

public delegate void MessageEventHandler(object sender, MessageEventArgs e);

public class MessageEventArgs : EventArgs
{
    public string Message { get; set; }
}

public class Publisher
{
    public event MessageEventHandler MessageReceived;

    protected virtual void OnMessageReceived(MessageEventArgs e)
    {
        MessageReceived?.Invoke(this, e);
    }

    public void Send(string message)
    {
        OnMessageReceived(new MessageEventArgs { Message = message });
    }
}

public class Subscriber
{
    public Subscriber(Publisher publisher)
    {
        publisher.MessageReceived += OnMessageReceived;
    }

    private void OnMessageReceived(object sender, MessageEventArgs e)
    {
        Console.WriteLine($"Received message: {e.Message}");
    }
}

static void Main()
{
    var publisher = new Publisher();
    var subscriber = new Subscriber(publisher);
    publisher.Send("Hello, World!");
}
```

### Lambda表达式

```csharp
using System;

public class LambdaDemo
{
    public void Process(int[] numbers, Func<int, bool> condition)
    {
        foreach (var number in numbers)
        {
            if (condition(number))
            {
                Console.WriteLine(number);
            }
        }
    }
}

static void Main()
{
    var demo = new LambdaDemo();
    demo.Process(new[] { 1, 2, 3, 4, 5 }, x => x % 2 == 0);
}
```

### 表达式树

```csharp
using System;
using System.Linq.Expressions;

public class ExpressionTreeDemo
{
    public void PrintExpressionTree()
    {
        Expression<Func<int, int, int>> expression = (a, b) => a + b;
        Console.WriteLine(expression.Body); // Outputs: a + b
    }
}

static void Main()
{
    var demo = new ExpressionTreeDemo();
    demo.PrintExpressionTree();
}
```

### 可空值类型（Nullable Value Types）

```csharp
int? nullableInt = null;
if (nullableInt.HasValue)
{
    Console.WriteLine(nullableInt.Value);
}
else
{
    Console.WriteLine("Value is null");
}
```

### 动态类型

```csharp
dynamic d = 10;
d += " is greater than 5";
Console.WriteLine(d); // Outputs: 10 is greater than 5
```

### 反射

```csharp
using System;
using System.Reflection;

public class ReflectionDemo
{
    public void PrintProperties()
    {
        PropertyInfo[] properties = this.GetType().GetProperties();
        foreach (PropertyInfo property in properties)
        {
            Console.WriteLine($"{property.Name} is of type {property.PropertyType}");
        }
    }
}

static void Main()
{
    ReflectionDemo demo = new ReflectionDemo();
    demo.PrintProperties();
}
```

### 序列化和反序列化

```csharp
using System;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

[Serializable]
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

static void Main()
{
    Person person = new Person { Name = "John Doe", Age = 30 };
    BinaryFormatter formatter = new BinaryFormatter();
    using (FileStream stream = new FileStream("person.dat", FileMode.Create))
    {
        formatter.Serialize(stream, person);
    }

    using (FileStream stream = new FileStream("person.dat", FileMode.Open))
    {
        Person deserializedPerson = (Person)formatter.Deserialize(stream);
        Console.WriteLine($"Name: {deserializedPerson.Name}, Age: {deserializedPerson.Age}");
    }
}
```

### 单元测试（使用NUnit）

```csharp
using NUnit.Framework;

[TestFixture]
public class CalculatorTests
{
    private Calculator _calculator;

    [SetUp]
    public void SetUp()
    {
        _calculator = new Calculator();
    }

    [Test]
    public void Add_ValidNumbers_ReturnsSum()
    {
        // Arrange
        int a = 5;
        int b = 10;

        // Act
        int result = _calculator.Add(a, b);

        // Assert
        Assert.AreEqual(15, result);
    }
}

public class Calculator
{
    public int Add(int x, int y)
    {
        return x + y;
    }
}
```

### 内存映射文件

```csharp
using System;
using System.IO.MemoryMappedFiles;

public class MemoryMappedFileDemo
{
    public void CreateAndAccess()
    {
        using (var mmf = MemoryMappedFile.CreateNew("MyMapFile", 1024))
        {
            using (var accessor = mmf.CreateViewAccessor())
            {
                accessor.Write(0, 100);
                int value = accessor.ReadInt32(0);
                Console.WriteLine(value); // Outputs: 100
            }
        }
    }
}

static void Main()
{
    var demo = new MemoryMappedFileDemo();
    demo.CreateAndAccess();
}
```

### 正则表达式

```csharp
using System;
using System.Text.RegularExpressions;

public class RegexDemo
{
    public void MatchPattern()
    {
        string pattern = @"\b[A-Za-z]+\b";
        string input = "Hello, this is a test.";
        MatchCollection matches = Regex.Matches(input, pattern);

        foreach (Match match in matches)
        {
            Console.WriteLine(match.Value);
        }
    }
}

static void Main()
{
    var demo = new RegexDemo();
    demo.MatchPattern();
}
```

### 异步流（C# 8.0 引入）

```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

public class AsyncStreamsDemo
{
    public async IAsyncEnumerable<int> GenerateNumbers()
    {
        for (int i = 0; i < 10; i++)
        {
            await Task.Delay(100); // Simulate work
            yield return i;
        }
    }
}

static async Task Main()
{
    var demo = new AsyncStreamsDemo();
    await foreach (var number in demo.GenerateNumbers())
    {
        Console.WriteLine(number);
    }
}
```

### 模式匹配（Pattern Matching）

```csharp
public class PatternMatchingDemo
{
    public void Process(object obj)
    {
        switch (obj)
        {
            case int i:
                Console.WriteLine($"Integer: {i}");
                break;
            case string s when s.Length > 10:
                Console.WriteLine($"Long string: {s}");
                break;
            case string s:
                Console.WriteLine($"String: {s}");
                break;
            default:
                Console.WriteLine("Unknown type");
                break;
        }
    }
}

static void Main()
{
    var demo = new PatternMatchingDemo();
    demo.Process("Hello, World!");
    demo.Process(123);
    demo.Process("A very long string that is more than ten characters long.");
}
```

### 记录类型（Record Types，C# 9.0 引入）

```csharp
public record Person(string Name, int Age);

static void Main()
{
    var person = new Person("Alice", 30);
    Console.WriteLine(person);
    var anotherPerson = person with { Name = "Bob" };
    Console.WriteLine(anotherPerson);
}
```

### 顶级语句（Top-Level Statements，C# 9.0 引入）

```csharp
// This is a script file, not a class. No class or namespace required.
Console.WriteLine("Hello, C# script!");

int number = 5;
Console.WriteLine($"The number is {number}");
```

### 目标类型的新语法（Target-typed new，C# 9.0 引入）

```csharp
public class Product
{
    public string Name { get; init; }
    public decimal Price { get; init; }
}

static void Main()
{
    var product = new Product { Name = "Apple", Price = 0.99m };
    Console.WriteLine($"Product: {product.Name}, Price: {product.Price}");
}
```

### 只读属性（Read-Only Properties，C# 9.0 引入）

```csharp
public class Rectangle
{
    public double Width { get; }
    public double Height { get; }

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public double Area => Width * Height;
}

static void Main()
{
    var rectangle = new Rectangle(5, 10);
    Console.WriteLine($"Area: {rectangle.Area}");
}
```

### 接口的默认实现（Default Interface Implementations，C# 8.0 引入）

```csharp
public interface IShape
{
    double Area { get; }
    void Draw(); // 默认实现
}

public interface IDrawable : IShape
{
    void Fill();
}

public class Circle : IDrawable
{
    public double Radius { get; }

    public Circle(double radius)
    {
        Radius = radius;
    }

    public double Area => Math.PI * Radius * Radius;

    public void Draw() => Console.WriteLine("Drawing a circle.");

    public void Fill() => Console.WriteLine("Filling the circle.");
}

static void Main()
{
    var circle = new Circle(5);
    circle.Draw(); // 使用接口的默认实现
    circle.Fill();
}
```

### 表达式-bodied成员（Expression-bodied Members，C# 6.0 引入）

```csharp
public class Calculator
{
    public int Add(int a, int b) => a + b;
    public int Multiply(int a, int b)
    {
        // Expression-bodied member can also be a block
        return a * b;
    }
}
```

### 属性的只读结构（Read-Only Structs，C# 7.2 引入）

```csharp
public struct Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
}

static void Main()
{
    var point = new Point(5, 10);
    Console.WriteLine($"Point: ({point.X}, {point.Y})");
}
```

### 局部函数（Local Functions，C# 7.0 引入）

```csharp
public class LocalFunctionsDemo
{
    public int CalculateTotal(int a, int b)
    {
        int AddAndMultiply(int x, int y)
        {
            return (x + y) * 2;
        }

        return AddAndMultiply(a, b);
    }
}

static void Main()
{
    var demo = new LocalFunctionsDemo();
    Console.WriteLine(demo.CalculateTotal(5, 3)); // Outputs: 16
}
```

### 可空引用类型（Nullable Reference Types，C# 8.0 引入）

```csharp
public class NullableReferenceTypesDemo
{
    public string? Name { get; set; } // 允许为null的引用类型
}

static void Main()
{
    var demo = new NullableReferenceTypesDemo();
    demo.Name = null; // 明确地允许为null
    Console.WriteLine(demo.Name); // Outputs: (null)
}
```

C# 是一门不断发展的编程语言，随着每个新版本的发布，都会引入新的语言特性和改进。以下是一些C#语言中可能尚未覆盖的其他高级特性和概念：

### 模块初始化器（Module Initializers，C# 10.0 引入）

C# 10.0 引入了模块初始化器的概念，它允许在不编写任何静态构造函数的情况下初始化模块。

```csharp
public static class ModuleInitializerDemo
{
    static ModuleInitializerDemo()
    {
        // 类似于静态构造函数，但语法更简洁。
    }
}
```

### 全局using指令（Global Using Directives，C# 10.0 引入）

从 C# 10 开始，可以使用全局using指令来避免在每个文件中重复相同的using声明。

```csharp
// 在某个.cs文件顶部添加
global using System;

// 然后在其他文件中就无需再写using System;
```

### 文件范围的using声明（File-Scope Namespaces，C# 10.0 引入）

C# 10.0 允许在文件的顶部声明一个命名空间，而不是类或方法。

```csharp
namespace MyNamespace
{
    // 整个文件都属于这个命名空间
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
```

### 隐藏实现的成员（Hidden Implementation Members，C# 10.0 引入）

C# 10.0 引入了隐藏实现的成员，允许隐藏来自基类的成员实现。

```csharp
public interface IExample
{
    int Property { get; set; }
}

public class BaseExample : IExample
{
    int IExample.Property { get => 0; set { } }
}

public class DerivedExample : BaseExample
{
    // 隐藏了基类的实现
    int Property => 42;
}
```

### 可空值引用类型（Nullable Reference Types，C# 8.0 引入）

虽然之前提到过，但这个特性非常重要，提供了更好的空值安全性。

```csharp
public class NullableReferenceTypesDemo
{
    public string? Name { get; set; }
    // ? 表示这个属性可以为null。
}
```

### 静态抽象成员（Static Abstract Members，C# 9.0 引入）

允许接口包含静态方法，这些方法可以在不实现接口的情况下提供默认实现。

```csharp
public interface IExample
{
    static void Method() { Console.WriteLine("Default implementation"); }
}

public class Example : IExample
{
    // 不需要实现 IExample.Method，除非要提供自定义实现。
}
```

### 目标类型的new表达式（Target-typed new expressions，C# 9.0 引入）

允许在对象初始化时省略类型名称。

```csharp
public record Person(string Name, int Age);

var person = new { Name = "Alice", Age = 30 };
```

### 记录类型的with表达式（Record types with 'with' expressions，C# 9.0 引入）

允许创建记录类型的浅拷贝，并修改特定字段。

```csharp
public record Person(string Name, int Age);

var person = new Person("Alice", 30);
var updatedPerson = person with { Age = 31 };
```

### 模式匹配的switch表达式（Pattern matching with 'switch' expressions，C# 8.0 引入）

允许在switch语句中使用模式匹配。

```csharp
public class PatternSwitchDemo
{
    public void Process(object obj)
    {
        var result = obj switch
        {
            int number => $"Number: {number}",
            string text => text.Length > 10 ? "Long string" : "Short string",
            _ => "Unknown type"
        };

        Console.WriteLine(result);
    }
}
```

### 异步流（Asynchronous Streams，C# 9.0 引入）

允许异步迭代数据流。

```csharp
public class AsyncStreamDemo
{
    public async IAsyncEnumerable<int> GenerateNumbers(int count)
    {
        for (int i = 0; i < count; i++)
        {
            await Task.Delay(100);
            yield return i;
        }
    }
}
```

<img src="/images/20210430134609740.png"  alt="Netshare">

欢迎关注
