
# JavaScript 基础详解

## 1. 基本语法

### 变量声明

```javascript
var name = 'John';
let age = 30;
const isStudent = true;
```

### 数据类型

- 字符串（String）
- 数字（Number）
- 布尔值（Boolean）
- 空值（null）
- 未定义（undefined）
- 符号（Symbol）
- 大整数（BigInt）

### 运算符

- 算术运算符：`+`, `-`, `*`, `/`, `%`
- 赋值运算符：`=`, `+=`, `-=`, `*=`, `/=`
- 比较运算符：`==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`
- 逻辑运算符：`&&`, `||`, `!`
- 位运算符：`&`, `|`, `^`, `~`, `<<`, `>>`

## 2. 控制结构

### 条件语句

```javascript
if (condition) {
    // 执行代码
} else if (anotherCondition) {
    // 执行代码
} else {
    // 执行代码
}

switch (expression) {
    case value1:
        // 执行代码
        break;
    case value2:
        // 执行代码
        break;
    default:
        // 执行代码
}
```

### 循环语句

```javascript
for (let i = 0; i < 10; i++) {
    // 执行代码
}

while (condition) {
    // 执行代码
}

do {
    // 执行代码
} while (condition);

for (let key in object) {
    // 执行代码
}

for (let value of iterable) {
    // 执行代码
}
```

## 3. 函数

### 函数声明与调用

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

greet('John');
```

### 函数表达式

```javascript
const greet = function(name) {
    return `Hello, ${name}!`;
};
```

### 箭头函数

```javascript
const greet = (name) => `Hello, ${name}!`;
```

### 回调函数

```javascript
function processUserInput(callback) {
    const name = prompt('Please enter your name.');
    callback(name);
}

processUserInput(greet);
```

### 闭包

```javascript
function outerFunction() {
    let outerVariable = 'I am outside!';

    function innerFunction() {
        console.log(outerVariable);
    }

    return innerFunction;
}

const closure = outerFunction();
closure(); // I am outside!
```

## 4. 对象与数组

### 对象的创建与操作

```javascript
const person = {
    name: 'John',
    age: 30,
    greet() {
        console.log('Hello!');
    }
};

console.log(person.name);
person.greet();
```

### 数组的创建与操作

```javascript
const numbers = [1, 2, 3, 4, 5];
console.log(numbers[0]);
numbers.push(6);
numbers.pop();
```

### 对象方法与属性

```javascript
const car = {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    getCarInfo() {
        return `${this.brand} ${this.model} (${this.year})`;
    }
};

console.log(car.getCarInfo());
```

### 数组方法

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
const even = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((total, num) => total + num, 0);
```

## 5. 事件处理

### 事件监听

```javascript
document.getElementById('myButton').addEventListener('click', () => {
    console.log('Button clicked!');
});
```

### 事件对象

```javascript
document.getElementById('myButton').addEventListener('click', (event) => {
    console.log(event.target);
});
```

### 常见事件类型

- 点击事件（`click`）
- 键盘事件（`keydown`, `keyup`）
- 鼠标事件（`mousemove`, `mouseover`, `mouseout`）

## 6. DOM操作

### DOM节点的获取

```javascript
document.getElementById('myElement');
document.querySelector('.myClass');
document.querySelectorAll('div');
```

### DOM节点的创建与删除

```javascript
const newElement = document.createElement('div');
document.body.appendChild(newElement);
document.body.removeChild(newElement);
```

### 修改DOM节点的属性与内容

```javascript
const element = document.getElementById('myElement');
element.textContent = 'New content';
element.setAttribute('data-custom', 'value');
```

### 样式操作

```javascript
const element = document.getElementById('myElement');
element.style.color = 'red';
element.style.backgroundColor = 'blue';
```

## 7. ES6+新特性

### 模板字符串

```javascript
const name = 'John';
const greeting = `Hello, ${name}!`;
```

### 解构赋值

```javascript
const person = { name: 'John', age: 30 };
const { name, age } = person;

const numbers = [1, 2, 3];
const [first, second, third] = numbers;
```

### 扩展运算符

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3, d: 4 };
```

### 类（class）与继承

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}

const dog = new Dog('Rex');
dog.speak();
```

### 模块化

```javascript
// module.js
export const name = 'John';
export function greet() {
    return 'Hello';
}

// main.js
import { name, greet } from './module.js';
console.log(greet(), name);
```

### Promise与异步编程

```javascript
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Success!');
    }, 1000);
});

myPromise.then(result => {
    console.log(result); // Success!
});

async function fetchData() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
}
```

## 8. 错误处理

### `try...catch`语句

```javascript
try {
    // 可能出错的代码
} catch (error) {
    console.error(error);
}
```

### 自定义错误

```javascript
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error');
```
