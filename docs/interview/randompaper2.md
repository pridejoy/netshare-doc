
## 随机试卷2

 1.1 可访问性级别包括哪几种?请具体描述所列级别。

1.2C#中，stringstr=null; 与string str ="”;两者有什么区别?

1.3 ASP.NET 中常见内置对象有?

1.4 ASP.NET 中<%# %>和 <% %>有什么区别?

1.5 接口和抽象类有什么区别?

1.6 用 C#实现把一个 Array 复制到 ArrayList 里。

1.7 请写出程序输出结果
```csharp
public class A
{
    public virtual void Fun1(int i) { Console.WriteLine(i); }
    public void Fun2(A a)
    { 
        a.Fun1(1);
        Fun1(5);
    }
};

public class B : A {
    public override void Fun1(int i) { base.Fun1(i + 1); }

    public static void Main() { 
        B b=new B();
        A a=new A();
        a.Fun2(b);
        b.Fun2(a);
    }
}
 
``` 

1.8 一列数的规则如下: `1  1 2 3 5 8 13` 求第 25 位数是多少，用递归算法实现。

1.9 用 C# 创建一个`int` 数组，长度为` 100`，并向其中随机插入` 1-100`，并且不能重复

1.10 编写一个类，继承基类(基类有方法`F1`)，继承接口并实现其方法`F2`
 
 
| 类A | 基类 BaseA | 接口类 InterA |


1.11 怎样在多线程中调用同一对象，前提是该对象每分钟会被某一线程改写一次，改写过程希望其他线程暂停访问，待改写完成后再行访问.


1.12将 `List<ClassA>Ist`中的所有元素复制给另一`List<ClassA>Ist2`对象,有几种方法?引用复制后使用` Ist2` 会出现什么问题?

1.13请简单描述 `WebAP!` 跟` WebService` 两者的区别。

1.14 一个完整的软件项目开发过程需要经历哪几个步骤?每个步骤会有哪些成果?

1.15 在之前项目开发或者管理过程中，你用过什么工具?具体用途是什么?