# 3. 类 | TS 快速上手

对于传统的 JavaScript 程序我们会使用 `函数` 和 `基于原型的继承` 来创建可重用的组件，但对于熟悉使用面向对象方式的程序员使用这些语法就有些棘手，因为他们用的是 `基于类的继承` 并且对象是由类构建出来的。从 ECMAScript 2015，也就是 ES6 开始，JavaScript 程序员将能够使用基于类的面向对象的方式。使用 TypeScript，我们允许开发者现在就使用这些特性，并且编译后的 JavaScript 可以在所有主流浏览器和平台上运行，而不需要等到下个 JavaScript 版本。

## 基本示例

下面看一个使用类的例子：

如果你使用过 C# 或 Java，你会对这种语法非常熟悉。我们声明一个 `Greeter` 类。这个类有 3 个成员：一个叫做 `message` 的属性，一个构造函数和一个 `greet` 方法。

```typescript
class Greeter {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  greet() {
    console.log('Hello, ' + this.message);
  }
}

let greeter = new Greeter('world');
greeter.greet(); // 输出: Hello, world
```

你会注意到，我们在引用任何一个类成员的时候都用了 `this`。它表示我们访问的是类的成员。

后面一行，我们使用 `new` 构造了 `Greeter` 类的一个实例。它会调用之前定义的构造函数，创建一个 `Greeter` 类型的新对象，并执行构造函数初始化它。

最后一行通过 `greeter` 对象调用其 `greet` 方法。

## 继承

在 TypeScript 里，我们可以使用常用的面向对象模式。基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

看下面的例子：

这个例子展示了最基本的继承：类从基类中继承了属性和方法。这里，`Dog` 是一个派生类，它派生自 `Animal` 基类，通过 `extends` 关键字。派生类通常被称作 _子类_，基类通常被称作 _超类_。

```typescript
class Animal {
  move(): void {
    console.log('Animal is moving');
  }
}

class Dog extends Animal {
  bark(): void {
    console.log('Dog is barking');
  }
}

let dog = new Dog();
dog.bark(); // 狗是会叫的
dog.move(); // 狗是动物，因此也会移动
```

因为 `Dog` 继承了 `Animal` 的功能，因此我们可以创建一个 `Dog` 的实例，它能够 `cry()` 和 `run()`。

下面我们来看个更加复杂的例子。

这个例子展示了一些上面没有提到的特性。这一次，我们使用 `extends` 关键字创建了 Animal的两个子类：`Horse` 和 `Snake`。

```typescript
class Animal {
  move(): void {
    console.log('Animal is moving');
  }
}

class Dog extends Animal {
  cry(): void {
    console.log('Dog is crying');
  }
}

class Horse extends Animal {
  run(): void {
    console.log('Horse is running');
  }
}

class Snake extends Animal {
  run(): void {
    console.log('Snake is slithering');
  }
}

let dog = new Dog();
let horse = new Horse();
let snake = new Snake();

dog.move(); // 动物会移动
horse.run(); // 马会跑
snake.run(); // 蛇会滑行
```

与前一个例子的不同点是，派生类包含了一个构造函数，它必须调用 `super()`，它会执行基类的构造函数。而且，在构造函数里访问 `this` 的属性之前，我们一定要调用 `super()`。这个是 TypeScript 强制执行的一条重要规则。

这个例子演示了如何在子类里可以重写父类的方法。`Snake` 类和 `Horse` 类都创建了 `run` 方法，它们重写了从 `Animal` 继承来的 `run` 方法，使得 `run` 方法根据不同的类而具有不同的功能。注意，即使 `tom` 被声明为 `Animal` 类型，但因为它的值是 `Horse`，调用 `tom.run(34)` 时，它会调用 `Horse` 里重写的方法。

::: tip 总结
//类和类之间如果要有继承关系,需要使用extends关键字

//子类中可以调用父类中的构造函数,使用的是super关键字(包括调用父类中的实例方法,也可以使用super)

//子类中可以重写父类的方法
:::

## 公共，私有与受保护的修饰符

### 默认为 public

在上面的例子里，我们可以自由的访问程序里定义的成员。如果你对其它语言中的类比较了解，就会注意到我们在之前的代码里并没有使用 `public` 来做修饰；例如，C# 要求必须明确地使用 `public` 指定成员是可见的。在 TypeScript 里，成员都默认为 `public`。

你也可以明确的将一个成员标记成 `public`。

### 理解 private

当成员被标记成 `private` 时，它就不能在声明它的类的外部访问。

### 理解 protected

`protected` 修饰符与 `private` 修饰符的行为很相似，但有一点不同，`protected` 成员在派生类中仍然可以访问。

## readonly 修饰符

你可以使用 `readonly` 关键字将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。

::: tip 总结
//修饰符(类中的成员的修饰符):主要是描述类中的成员(属性,构造函数,方法)的可访问性

//类中的成员都有自己的默认的访问修饰符,public

//public修饰,类中成员默认的修饰符,代表的是公共的,任何位置都可以访问类中的成员

// private修饰符,类中的成员如果使用private来修饰,那么外部是无法访问这个成员数据的,当然,子类中也是无法访问该成员数据的

//protected修饰符,类中的成员如果使用protected来修饰,那么外部是无法访问这个成员数据的,当然,子类中是可以访问该成员数据的
:::

## 参数属性

在上面的例子中，我们必须在 `Person` 类里定义一个只读成员 `name` 和一个参数为 `name` 的构造函数，并且立刻将 `name` 的值赋给 `this.name`，这种情况经常会遇到。参数属性可以方便地让我们在一个地方定义并初始化一个成员。

```typescript
class Person {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// 使用参数属性
class Person {
  constructor(readonly name: string) {
    // 构造函数体为空或者只包含其他逻辑
  }
}
```

注意看我们是如何舍弃参数 `name`，仅在构造函数里使用 `readonly name: string` 参数来创建和初始化 `name` 成员。我们把声明和赋值合并至一处。

参数属性通过给构造函数参数前面添加一个访问限定符来声明。使用 `private` 限定一个参数属性会声明并初始化一个私有成员；对于 `public` 和 `protected` 来说也是一样。

## 存取器

`TypeScript` 支持通过 `getters/setters` 来截取对对象成员的访问。它能帮助你有效的控制对对象成员的访问。

下面来看如何把一个简单的类改写成使用 `get` 和 `set`。

```typescript
class Square {
  private sideLength: number;

  constructor(sideLength: number) {
    this.sideLength = sideLength;
  }

  get area(): number {
    return this.sideLength * this.sideLength;
  }

  set sideLength(newLength: number) {
    if (newLength > 0) {
      this.sideLength = newLength;
    } else {
      console.log('Side length must be positive.');
    }
  }
}
```

## 静态属性

到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。

在这个例子里，我们使用 `static` 定义 `origin`，因为它是所有网格都会用到的属性。每个实例想要访问这个属性的时候，都要在 `origin` 前面加上类名。

```typescript
class Grid {
  static origin = { x: 0, y: 0 };
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  printCoordinates() {
    console.log(`(${this.x}, ${this.y})`);
  }
}

let grid1 = new Grid(4, 5);
grid1.printCoordinates(); // 输出: (4, 5)

let grid2 = new Grid(-10, 10);
grid2.printCoordinates(); // 输出: (-10, 10)

console.log(Grid.origin); // 输出: { x: 0, y: 0 }
```

如同在实例属性上使用 `this.xxx` 来访问属性一样，这里我们使用 `Grid.xxx` 来访问静态属性。

## 抽象类

抽象类做为其它派生类的基类使用。它们不能被实例化。不同于接口，抽象类可以包含成员的实现细节。

`abstract` 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```typescript
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log('Animal is moving');
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log('Dog is barking');
  }
}

let dog = new Dog();
dog.makeSound(); // 狗是会叫的
dog.move(); // 狗是动物，因此也会移动
```

注意：由于 TypeScript 的 `abstract` 类不能被实例化，所以你需要创建一个 `Dog` 类的实例来调用 `makeSound` 方法。
 
 更多信息，请访问 [Vue3+TS 快速上手](https://24kcs.github.io/vue3_study/)。
 