 
# 1. 基础类型 | TS 快速上手

TypeScript 支持与 JavaScript 几乎相同的数据类型，并提供了实用的枚举类型。

## 布尔值 (Boolean)
最基本的数据类型是简单的 `true`/`false` 值，称为 `boolean`。

```typescript
let isDone: boolean = false;
isDone = true;
// isDone = 2 // 错误
```

## 数字 (Number)
TypeScript 中的所有数字都是浮点数，类型为 `number`。
支持十进制、十六进制、二进制和八进制字面量。

```typescript
let a1: number = 10;  // 十进制
let a2: number = 0b1010;  // 二进制
let a3: number = 0o12;  // 八进制
let a4: number = 0xa;  // 十六进制
```

## 字符串 (String)
使用 `string` 表示文本数据类型，可以用双引号或单引号。

```typescript
let name: string = 'tom';
name = 'jack';
// name = 12 // 错误
let age: number = 12;
const info = `My name is ${name}, I am ${age} years old!`;
```

## undefined 和 null
`undefined` 和 `null` 各自有自己的类型。

```typescript
let u: undefined = undefined;
let n: null = null;
```

默认情况下，`null` 和 `undefined` 是所有类型的子类型。

## 数组 (Array)
有两种方式定义数组。

```typescript
let list1: number[] = [1, 2, 3];  // 方式一

let list2: Array<number> = [1, 2, 3];  // 方式二
```

## 元组 (Tuple)
元组类型允许表示一个已知元素数量和类型的数组。

```typescript
let t1: [string, number];
t1 = ['hello', 10];  // OK
t1 = [10, 'hello'];  // 错误
```

## 枚举 (Enum)
`enum` 类型为一组数值赋予友好的名字。

```typescript
enum Color {
  Red,
  Green,
  Blue
}

let myColor: Color = Color.Green;
console.log(myColor, Color.Red, Color.Blue);
```

## any
`any` 类型用于在编程阶段还不清楚类型的变量。

```typescript
let notSure: any = 4;
notSure = 'maybe a string';
notSure = false;
```

## void
`void` 类型表示没有任何类型。

```typescript
function fn(): void {
  console.log('fn()');
  // return 1 // 错误
}

let unusable: void = undefined;
```

## object
`object` 类型表示非原始类型。

```typescript
function fn2(obj: object): object {
  console.log('fn2()', obj);
  return {};
}

console.log(fn2(new String('abc')));
// console.log(fn2('abc'));  // 错误
```

## 联合类型 (Union Types)
联合类型表示取值可以为多种类型中的一种。

```typescript
function toString2(x: number | string): string {
  return x.toString();
}
```

## 类型断言 (Type Assertion)
类型断言用于手动指定一个值的类型。

```typescript
function getLength(x: number | string): number {
  if ((<string>x).length) {
    return (x as string).length;
  } else {
    return x.toString().length;
  }
}

console.log(getLength('abcd'), getLength(1234));
```

## 类型推断 (Type Inference)
类型推断在没有明确指定类型时推测出一个类型。

```typescript
let b9 = 123;  // 推断为 number 类型
// b9 = 'abc';  // 错误

let b10;  // 推断为 any 类型
b10 = 123;
b10 = 'abc';
```

更多信息，请访问 [Vue3+TS 快速上手](https://24kcs.github.io/vue3_study/chapter2/1_type.html)。
 