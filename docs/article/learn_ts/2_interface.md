 
# 2. 接口 | TS 快速上手

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。我们使用接口（Interfaces）来定义对象的类型。接口是对象的状态（属性）和行为（方法）的抽象（描述）。

## 接口初探

需求：创建人的对象，需要对人的属性进行一定的约束。

```typescript
// 示例代码：IPerson接口
interface IPerson {
  name: string;
  age: number;
}
```

类型检查器会查看对象内部的属性是否与 `IPerson` 接口描述一致，如果不一致就会提示类型错误。

## 可选属性

接口里的属性不全都是必需的。有些是只在某些条件下存在，或者根本不存在。

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 `?` 符号。

```typescript
// 示例代码：可选属性接口
interface IPersonOptional {
  name: string;
  age?: number; // 可选属性
}
```

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。你可以在属性名前用 `readonly` 来指定只读属性：

```typescript
// 示例代码：只读属性
interface IPersonReadonly {
  readonly name: string; // 只读属性
}
```

一旦赋值后再也不能被改变了。

### readonly vs const

最简单判断该用 `readonly` 还是 `const` 的方法是看要把它做为变量使用还是做为一个属性。做为变量使用的话用 `const`，若做为属性则使用 `readonly`。

## 函数类型

接口能够描述 JavaScript 中对象拥有的各种各样的外形。除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```typescript
// 示例代码：函数类型的接口
interface IFunction {
  (arg1: string, arg2: number): boolean;
}

// 使用函数类型的接口
let myFunction: IFunction = function(arg1: string, arg2: number): boolean {
  // 实现细节
  return true;
};
```

这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。

## 类类型

### 类实现接口

与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。

```typescript
// 示例代码：类实现接口
interface IAnimal {
  makeSound(): void;
}

class Dog implements IAnimal {
  makeSound(): void {
    console.log('Woof!');
  }
}
```

## 一个类可以实现多个接口

## 接口继承接口

和类一样，接口也可以相互继承。这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```typescript
// 示例代码：接口继承
interface IShape {
  getArea(): number;
}

interface IShapeWithColor extends IShape {
  getColor(): string;
}

class Square implements IShapeWithColor {
  getArea(): number {
    // 实现细节
    return 100;
  }
  getColor(): string {
    // 实现细节
    return 'blue';
  }
}
```
 

 更多信息，请访问 [Vue3+TS 快速上手](https://24kcs.github.io/vue3_study/chapter2/1_type.html)。
 