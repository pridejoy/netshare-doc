# 设计模式


## 工厂模式



在平时编程中，构建对象最常用的方式是 new 一个对象。乍一看这种做法没什么不好，而实际上这也属于一种硬编码。每 new 一个对象，相当于调用者多知道了一个类，增加了类与类之间的联系，不利于程序的松耦合。其实构建过程可以被封装起来，工厂模式便是用于封装对象的设计模式。



###  1.简单工厂模式 

问题来了，我是调用者，我需要水果，new一个苹果，梨子，香蕉.........我知道很多种水果名字，我就能new出这些吗？答案不一定，因为每个水果怎么创建出来的不一样。我要new出不同的水果，我不光要知道水果名字，我还要知道这个水果的创建方式（构造函数）。



这时候有个水果工厂，我只需要跟工厂说我要什么水果，给他一个水果名字，它就给我返回一个相应的水果。我不用知道这个水果是怎么创建的，工厂帮我做。

```
class Fruit//水果父类
{
}
class Apple: Fruit//苹果
{
}
class Pear: Fruit //梨子
{
}
class Banana: Fruit//香蕉
{
}
class Strawberry: Fruit //草莓
{
}
```

简单的水果工厂

```

class FruitsFactory//水果工厂
{
    //给一个水果名，返回一个水果
    public Fruit Create(string fruitname)
    {
        switch (fruitname)
        {
            case "苹果":return new Apple();
            case "梨":return new Pear();
            case "香蕉":return new Banana();
            case "草莓":return new Strawberry();
            default:return null;
        }
    }
}
```

调用工厂

```
static void Main(string[] args)
{

    FruitsFactory factory = new FruitsFactory();
    //有了工厂，现在我要一个苹果
    Fruit apple = factory.Create("苹果");
   //我要草莓
   Fruit strawberry = factory.Create("草莓");
}
```



事实上，将构建过程封装的好处不仅可以降低耦合，如果某个产品构造方法相当复杂，使用工厂模式可以大大减少代码重复。比如，如果生产一个苹果需要苹果种子、阳光、水分，将工厂修改如下：

```
class FruitsFactory//水果工厂
{
    //给一个水果名，返回一个水果
    public Fruit Create(string fruitname)
    {
        switch (fruitname)
        {
            case "苹果":
                AppleSeed appleSeed = new AppleSeed();
                Sunlight sunlight = new Sunlight();
                Water water = new Water();
                return new Apple(appleSeed, sunlight, water);
            case "梨":return new Pear();
            case "香蕉":return new Banana();
            case "草莓":return new Strawberry();
            default:return null;
        }
    }
} 
```



调用者的代码则完全不需要变化，而且调用者不需要在每次需要苹果时，自己去构建苹果种子、阳光、水分以获得苹果。苹果的生产过程再复杂，也只是工厂的事。这就是封装的好处，假如某天科学家发明了让苹果更香甜的肥料，要加入苹果的生产过程中的话，也只需要在工厂中修改，调用者完全不用关心。

#### 总结

总而言之，简单工厂模式就是让一个工厂类承担构建所有对象的职责。调用者需要什么产品，让工厂生产出来即可。
它的弊端也显而易见：

- 一是如果需要生产的产品过多，此模式会导致工厂类过于庞大，承担过多的职责，变成超级类。当苹果生产过程需要修改时，要来修改此工厂。梨子生产过程需要修改时，也要来修改此工厂。也就是说这个类不止一个引起修改的原因。违背了单一职责原则。

- 二是当要生产新的产品时，必须在工厂类中添加新的分支。而开闭原则告诉我们：类应该对修改封闭。我们希望在添加新功能时，只需增加新的类，而不是修改既有的类，所以这就违背了开闭原则。

### 2.**工厂方法模式**

为了解决简单工厂模式的这两个弊端，工厂方法模式应运而生，它规定每个产品都有一个专属工厂。比如苹果有专属的苹果工厂，梨子有专属的梨子工厂

不同的水果工厂

```
class AppleFactory//苹果工厂
{
    public Fruit Create()
    {
        return new Apple();
    }
}

class PearFactory//梨工厂
{
    public Fruit Create()
    {
        return new Pear();
    }
}

class BananaFactory//香蕉工厂
{
    public Fruit Create()
    {
        return new Banana();
    }
}

```

调用工厂

```

static void Main(string[] args)
{
    //创建一个苹果工厂
    AppleFactory factory = new AppleFactory();
    //通过苹果工厂可以获得苹果
    Fruit apple = factory.Create();

    //需要梨子的时候，就创建梨子工厂
    PearFactory pearFactory = new PearFactory();
    Fruit pear = pearFactory.Create();

}
```

这样和直接 new 出苹果和梨子有什么区别？上文说工厂是为了减少类与类之间的耦合，让调用者尽可能少的和其他类打交道。

用简单工厂模式，我们只需要知道 FruitFactory，无需知道 Apple 、Pear 类，很容易看出耦合度降低了。

但用工厂方法模式，调用者虽然不需要和 Apple 、Pear 类打交道了，但却需要和 AppleFactory、PearFactory 类打交道。有几种水果就需要知道几个工厂类，耦合度完全没有下降啊，甚至还增加了代码量！

工厂模式的第二个优点在工厂方法模式中还是存在的。当构建过程相当复杂时，工厂将构建过程封装起来，调用者可以很方便的直接使用，同样以苹果生产为例：

```
class AppleFactory
{
    public Fruit Create()
    {
        AppleSeed appleSeed = new AppleSeed();
        Sunlight sunlight = new Sunlight();
        Water water = new Water();
        return new Apple(appleSeed, sunlight, water);
    }
}
```

 

#### 总结

调用者无需知道苹果的生产细节，当生产过程需要修改时也无需更改调用端。同时，工厂方法模式解决了简单工厂模式的两个弊端。

- 当生产的产品种类越来越多时，工厂类不会变成超级类。工厂类会越来越多，保持灵活。不会越来越大、变得臃肿。如果苹果的生产过程需要修改时，只需修改苹果工厂。梨子的生产过程需要修改时，只需修改梨子工厂。符合单一职责原则。

- 当需要生产新的产品时，无需更改已有的工厂，只需要添加新的工厂即可。保持了面向对象的可扩展性，符合开闭原则。



### 3.**抽象工厂模式**

工厂方法模式可以进一步优化，提取出工厂接口。然后不同的水果工厂都实现这个接口

```
   interface IFactory//工厂接口
    {
        Fruit Create();
    }

    class AppleFactory: IFactory
    {
        public Fruit Create()
        {
            return new Apple();
        }
    }
    
    class PearFactory: IFactory
    {
        public Fruit Create()
        {
            return new Pear();
        }
    }
    
    class BananaFactory: IFactory
    {
        public Fruit Create()
        {
            return new Banana();
        }
    }
```

可以看到，我们在创建时指定了具体的工厂类后，在使用时就无需再关心是哪个工厂类，只需要将此工厂当作抽象的 IFactory 接口使用即可。这种经过抽象的工厂方法模式被称作抽象工厂模式

```

static void Main(string[] args)
{
    //需要苹果时，就创建苹果工厂
    IFactory factory = new AppleFactory();
    //通过苹果工厂可以获得苹果
    Fruit fruit = factory.Create();
}
```

如果要替换成梨子，只需要修改一行代码

```

static void Main(string[] args)
{
    IFactory factory = new PearFactory();
    Fruit fruit = factory.Create();
}
```

#### 总结

抽象工厂模式很好的发挥了开闭原则、依赖倒置原则，但缺点是抽象工厂模式太重了，如果 IFactory 接口需要新增功能，则会影响到所有的具体工厂类。使用抽象工厂模式，替换具体工厂时只需更改一行代码，但要新增抽象方法则需要修改所有的具体工厂类。所以抽象工厂模式适用于增加同类工厂这样的横向扩展需求，不适合新增功能这样的纵向扩展。



## 原型模式

 什么是原型模式 

- 原型模式是一种创建型设计模式，它允许通过克隆现有对象来创建新对象，而无需使用显式的构造函数。该模式涉及使用原型接口来创建具有相同状态的对象。

- 在原型模式中，原型对象是被克隆的对象，它定义了一个克隆自己的方法。通过使用原型模式，可以避免昂贵的构造过程，因为新的对象可以通过复制现有对象而不是重新构建来创建。

- 原型模式的实现方式可以是浅克隆或深克隆。在浅克隆中，仅复制原型对象的基本属性，而不复制其引用类型属性的引用，而在深克隆中，所有引用类型属性都将递归复制。



原型模式的优点包括：

- 可以避免构造函数的复杂性，因为新对象可以通过复制现有对象而创建。

- 可以提高性能，因为克隆比创建新对象更快。

- 可以在运行时动态添加和删除对象。

- 可以通过改变原型对象来影响所有克隆的对象。

然而，原型模式的缺点是，如果对象有循环引用，则需要特殊处理以避免无限递归。



### 代码实现
我们将使用原型模式来创建一个新的简历，以便在不重新输入所有信息的情况下创建多个简历。
首先定义一个接口，有一个克隆方法

```
public interface ICloneable
{
    public object Clone();
}
```

创建一个原型类，实现接口

```

using System;

// Resume 类表示一个简历
class Resume : ICloneable
{
    private string name;    // 姓名
    private string gender;  // 性别
    private int age;        // 年龄
    private string workExperience;  // 工作经历

    public Resume(string name, string gender, int age, string workExperience)
    {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.workExperience = workExperience;
    }

    // 设置工作经历
    public void SetWorkExperience(string workExperience)
    {
        this.workExperience = workExperience;
    }

    // 显示简历信息
    public void Display()
    {
        Console.WriteLine("姓名：{0}", name);
        Console.WriteLine("性别：{0}", gender);
        Console.WriteLine("年龄：{0}", age);
        Console.WriteLine("工作经历：{0}", workExperience);
    }

    // 实现 ICloneable 接口中的 Clone 方法
    public object Clone()
    {
	//MemberwiseClone 方法是定义在 System.Object 类中的，它是一个受保护的虚拟方法。
	//这意味着只能在当前类或其派生类中访问该方法。因为 Resume 类继承自 System.Object 类，所以可以在 Resume 类中直接调用 MemberwiseClone 方法。
	//在使用 MemberwiseClone 方法进行克隆时，会自动将原始对象中的所有字段和属性复制到新对象中，因此我们不需要为每个字段和属性都手动编写代码来进行复制。
     return MemberwiseClone();
    }
}


```

现在，我们可以使用原型模式来创建多个简历对象，而无需重新输入所有信息。

```
class Program
{
    static void Main(string[] args)
    {
        // 创建原型对象
        var resumePrototype = new Resume("张三", "男", 20, "无工作经历");

        // 克隆简历对象
        var resume1 = (Resume)resumePrototype.Clone();
        resume1.SetWorkExperience("2019-2021，XXX 公司，Java 开发工程师");

        var resume2 = (Resume)resumePrototype.Clone();
        resume2.SetWorkExperience("2021-至今，YYY 公司，C# 开发工程师");

        // 显示简历信息
        resumePrototype.Display();
        resume1.Display();
        resume2.Display();
    }
}


```

###  克隆为什么比用构造方法快
原型模式中的clone方法其实也是调用了构造方法创建了一个对象。为什么比自己用构造方法创建更快呢。
有些对象有初始化的过程，属性值都是初始化后的结果。如果自己调用构造方法，有初始化的步骤，当然比不过直接用clone对该对象直接赋值快。



## **构建者模式**

什么是构建者模式
建造者模式是设计模式的一种，将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。
建造者模式主要分为以下四种角色：

- 产品(Product)：具体生产器要构造的复杂对象。
- 抽象生成器(Bulider)：抽象生成器是一个接口，创建一个产品各个部件的接口方法，以及返回产品的方法。
- 具体建造者(ConcreteBuilder)：按照自己的产品特性，实现抽象建造者对应的接口。
- 指挥者(Director)：创建一个复杂的对象，控制具体的流程。