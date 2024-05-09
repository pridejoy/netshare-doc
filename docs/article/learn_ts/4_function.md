 
# 4. 函数 | TS 快速上手

函数是 JavaScript 应用程序的基础，它帮助你实现抽象层，模拟类，信息隐藏和模块。在 TypeScript 里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义行为的地方。TypeScript 为 JavaScript 函数添加了额外的功能，让我们可以更容易地使用。

## 基本示例

和 JavaScript 一样，TypeScript 函数可以创建有名字的函数和匿名函数。你可以随意选择适合应用程序的方式，不论是定义一系列 API 函数还是只使用一次的函数。

通过下面的例子可以迅速回想起这两种 JavaScript 中的函数：

```javascript
// 有名字的函数
function greet(name) {
  console.log('Hello ' + name);
}

// 匿名函数
let greeter = function(name) {
  console.log('Hello ' + name);
}
```

## 函数类型

### 为函数定义类型

让我们为上面那个函数添加类型：

```typescript
function greet(name: string): void {
  console.log('Hello ' + name);
}
```

我们可以给每个参数添加类型之后再为函数本身添加返回值类型。TypeScript 能够根据返回语句自动推断出返回值类型。

### 书写完整函数类型

现在我们已经为函数指定了类型，下面让我们写出函数的完整类型。

```typescript
function calculateBill(amount: number, tipPercent: number = 10): number {
  return amount + (amount * tipPercent) / 100;
}
```

## 可选参数和默认参数

TypeScript 里的每个函数参数都是必须的。这不是指不能传递 `null` 或 `undefined` 作为参数，而是说编译器检查用户是否为每个参数都传入了值。编译器还会假设只有这些参数会被传递进函数。简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。

JavaScript 里，每个参数都是可选的，可传可不传。没传参的时候，它的值就是 `undefined`。在 TypeScript 里我们可以在参数名旁使用 `?` 实现可选参数的功能。比如，我们想让 `lastName` 是可选的：

```typescript
function greet(firstName: string, lastName?: string) {
  let name = lastName ? firstName + " " + lastName : firstName;
  console.log('Hello ' + name);
}
```

在 TypeScript 里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是 `undefined` 时。它们叫做有默认初始化值的参数。让我们修改上例，把 `firstName` 的默认值设置为 `"A"`。

```typescript
function greet(firstName: string = "A", lastName?: string) {
  let name = lastName ? firstName + " " + lastName : firstName;
  console.log('Hello ' + name);
}
```

### 剩余参数

必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。在 JavaScript 里，你可以使用 `arguments` 来访问所有传入的参数。

在 TypeScript 里，你可以把所有参数收集到一个变量里：

```typescript
function collectArguments(...args: any[]) {
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }
}
```

剩余参数会被当做个数不限的可选参数。可以一个都没有，同样也可以有任意个。编译器创建参数数组，名字是你在省略号（ `...`）后面给定的名字，你可以在函数体内使用这个数组。

## 函数重载

函数重载：函数名相同，而形参不同的多个函数。

在JS中，由于弱类型的特点和形参与实参可以不匹配，是没有函数重载这一说的。但在TS中，与其它面向对象的语言（如Java）就存在此语法。

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x): any {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  } else {
    return undefined;
  }
}
```

 