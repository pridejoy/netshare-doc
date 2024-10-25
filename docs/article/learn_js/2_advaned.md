# JavaScript 进阶详解

阮一峰 ECMAScript 6 (ES6) 标准入门教程 第三版
<https://www.bookstack.cn/read/es6-3rd/sidebar.md>

## 1. 高级函数

### 回调函数与高阶函数

高阶函数是指接受一个或多个函数作为输入，或输出一个函数的函数。回调函数则是在高阶函数中被调用的函数。

```javascript
function greeting(name) {
    console.log(`Hello, ${name}!`);
}

function processUserInput(callback) {
    const name = 'John';
    callback(name);
}

processUserInput(greeting); // Hello, John!
```

### 函数柯里化

柯里化（currying）指的是将一个多参数的函数拆分成一系列函数，每个拆分后的函数都只接受一个参数（unary）。

```javascript
function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
```

### 函数记忆化

记忆化（Memoization）是一种优化技术，通过缓存函数调用的结果来避免重复计算。

```javascript
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        } else {
            const result = fn.apply(this, args);
            cache[key] = result;
            return result;
        }
    };
}

const factorial = memoize(function(x) {
    if (x === 0) {
        return 1;
    } else {
        return x * factorial(x - 1);
    }
});

console.log(factorial(5)); // 120
```

## 2. 异步编程

### 回调地狱与Promise

回调地狱（Callback Hell）是指在多层回调嵌套中处理异步操作，代码变得难以维护。Promise 可以帮助解决这个问题。

```javascript
// 回调地狱
setTimeout(() => {
    console.log('First');
    setTimeout(() => {
        console.log('Second');
        setTimeout(() => {
            console.log('Third');
        }, 1000);
    }, 1000);
}, 1000);

// 使用Promise
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(1000)
    .then(() => {
        console.log('First');
        return wait(1000);
    })
    .then(() => {
        console.log('Second');
        return wait(1000);
    })
    .then(() => {
        console.log('Third');
    });
```

### Async/Await

Async/Await 是基于 Promise 的语法糖，使异步代码更具可读性。

```javascript
const fetchData = async () => {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();
```

## 3. 面向对象编程（OOP）

### 类与继承

JavaScript 的类是基于原型的，ES6 引入了更直观的类语法。

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
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    speak() {
        console.log(`${this.name} barks.`);
    }
}

const dog = new Dog('Rex', 'German Shepherd');
dog.speak(); // Rex barks.
```

### 多态与封装

多态是指不同对象可以通过相同接口调用各自的方法。封装是指将数据和操作数据的方法包装在对象内部。

```javascript
class Shape {
    area() {
        return 0;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

const shapes = [new Circle(10), new Rectangle(5, 10)];
shapes.forEach(shape => console.log(shape.area()));
```

## 4. 模块化

### ES6 模块

ES6 引入了 `import` 和 `export` 语法，使得模块化变得更简单。

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

### CommonJS 模块

CommonJS 是 Node.js 使用的模块系统，使用 `require` 和 `module.exports`。

```javascript
// module.js
module.exports = {
    name: 'John',
    greet: function() {
        return 'Hello';
    }
};

// main.js
const { name, greet } = require('./module');
console.log(greet(), name);
```

## 5. 元编程

### Proxy

Proxy 对象用于定义基本操作的自定义行为（如属性查找、赋值等）。

```javascript
const handler = {
    get: function(target, property) {
        return property in target ? target[property] : 42;
    }
};

const p = new Proxy({}, handler);
p.a = 1;
console.log(p.a); // 1
console.log(p.b); // 42
```

### Reflect

Reflect 是一个内置对象，提供拦截 JavaScript 操作的方法，与 Proxy 对象的某些方法对应。

```javascript
const obj = { x: 1, y: 2 };
console.log(Reflect.has(obj, 'x')); // true
console.log(Reflect.get(obj, 'x')); // 1
Reflect.set(obj, 'z', 3);
console.log(obj.z); // 3
```

## 6. 设计模式

### 单例模式

单例模式确保一个类只有一个实例，并提供一个访问它的全局访问点。

```javascript
const Singleton = (function() {
    let instance;

    function createInstance() {
        const object = new Object('I am the instance');
        return object;
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true
```

### 观察者模式

观察者模式定义了一种一对多的依赖关系，使得多个观察者对象同时监听一个主题对象。当主题对象发生变化时，它的所有观察者都会收到通知。

```javascript
class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class Observer {
    update(data) {
        console.log('Observer received data:', data);
    }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify('Hello Observers!'); // Observer received data: Hello Observers!
```

## 7. Web API 高级用法

### Fetch API

Fetch API 提供了一个接口用于获取资源（包括跨域请求）。

```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

### WebSockets

WebSockets 提供了在单个 TCP 连接上进行全双工通信的能力。

```javascript
const socket = new WebSocket('ws://example.com/socket');

socket.addEventListener('open', function(event) {
    socket.send('Hello Server!');
});

socket.addEventListener('message', function(event) {
    console.log('Message from server ', event.data);
});
```

### Service Workers

Service Workers 是一种在后台独立于网页运行的脚本，主要用于缓存资源和推送通知。

```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
        console.error('Service Worker registration failed:', error);
    });
}
```

## 8. 性能优化

### 节流与防抖

节流（throttle）和防抖（debounce）是优化频繁触发事件的方法。

```javascript
// 防

抖
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// 节流
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

### 请求合并

请求合并是一种优化网络请求的方法，通过合并多个请求来减少网络开销。

```javascript
function mergeRequests(requests) {
    const merged = {};
    requests.forEach(request => {
        for (const [key, value] of Object.entries(request)) {
            if (!merged[key]) {
                merged[key] = [];
            }
            merged[key].push(value);
        }
    });
    return merged;
}

const requests = [
    { url: '/api/data1', method: 'GET' },
    { url: '/api/data2', method: 'POST' },
];

console.log(mergeRequests(requests));
// { url: ['/api/data1', '/api/data2'], method: ['GET', 'POST'] }
```

## 9. 工具与调试

### 使用 `console` 调试

`console` 对象提供了用于调试的多种方法。

```javascript
console.log('Logging message');
console.error('Error message');
console.warn('Warning message');
console.table([{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]);
```

### 调试工具

- Chrome DevTools
- Firefox Developer Tools
- VS Code Debugger

## 10. TypeScript 基础

### 类型注解

TypeScript 通过类型注解使得代码更具可读性和安全性。

```typescript
let isDone: boolean = false;
let age: number = 30;
let name: string = 'John';

let list: number[] = [1, 2, 3];
let tuple: [string, number] = ['hello', 10];

enum Color { Red, Green, Blue }
let c: Color = Color.Green;

function greet(person: string): string {
    return `Hello, ${person}`;
}
```

### 接口与类

接口用于定义对象的结构，类可以实现接口。

```typescript
interface Person {
    firstName: string;
    lastName: string;
}

class Student implements Person {
    firstName: string;
    lastName: string;
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

let user = new Student('John', 'Doe');
console.log(user.getFullName()); // John Doe
```
