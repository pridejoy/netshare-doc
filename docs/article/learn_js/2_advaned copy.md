## javaScript进阶

## 一、作用域

JS的作用域简单来说就是变量（变量作用于又称上下文）和函数生效（能被访问）的区域

### 1.全局作用域

函数之外声明的变量，会成为全局变量。

变量在程序的任何地方都能被访问，表示它是全局变量，window 对象的内置属性都拥有全局作用域。

#### 自动全局

如果您为尚未声明的变量赋值，此变量会自动成为**全局变量**

### 2.函数作用域

**在固定的代码片段（函数）才能被访问**

**函数作用域就是一个独立的地盘，让变量不会外泄、暴露出去**。也就是说**作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。**

变量取值：**到创建 这个变量 的函数的作用域中取值**

![作用域](https://images0.cnblogs.com/blog/138012/201409/241708372951952.png)

### 3.作用域链

**变量取值到 创建 这个变量 的函数的作用域中取值。**

**但是如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链。**

![作用域链](https://images0.cnblogs.com/blog/138012/201409/251448515607115.png)

JavaScript 属于解释型语言，JavaScript 的执行分为：解释和执行两个阶段,这两个阶段所做的事并不一样：

##### 解释阶段

- 词法分析
- 语法分析
- 作用域规则确定

##### 执行阶段

- 创建执行上下文
- 执行函数代码
- 垃圾回收

JavaScript 解释阶段便会确定作用域规则，因此作用域在函数定义时就已经确定了，而不是在函数调用时确定，但是执行上下文是函数执行之前创建的。执行上下文最明显的就是 this 的指向是执行时确定的。而作用域访问的变量是编写代码的结构确定的。

作用域和执行上下文之间最大的区别是：

**执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并且不会改变**。

一个作用域下可能包含若干个上下文环境。有可能从来没有过上下文环境（函数从来就没有被调用过）；有可能有过，现在函数被调用完毕后，上下文环境被销毁了；有可能同时存在一个或多个（闭包）。**同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值**。

## 二、this指向

在函数内，`this`是非常特殊的关键词标识符，在每个函数的作用域中被自动创建

当函数被调用，一个上下文就被创建。上下文包括函数在哪调用，谁调用的，参数是哪些，等等，上下文中的this，指的就是函数指行期间的this。`this`的上下文基于函数调用的情况。**和函数在哪定义无关，但是和函数怎么调用有关**

**this理解的关键：**

**1：this永远指向一个对象；**

**2：this的指向完全取决于函数调用的位置；**

### 1、全局

在全局上下文（任何函数以外），`this`指向全局对象。

```js
console.log(this === window); // true
```

### 2、函数

在函数内部时，`this`由函数怎么调用来确定

```js
//简单调用，即独立函数调用
function f1(){
  return this;
}
//当前调用者其实是window  window.f1()
f1() === window;

```

当函数作为对象方法调用时，`this`指向该对象

```js
var obj = {
 type: 1,
    name: 'Tina',
    age: 18,
    sayHi:function(){
        console.log(this)
        console.log('hi~~')
    }
}
//this === obj
obj.sayHi()
```

### 3.构造函数

**构造函数的this指向创建的实例对象**

```js
function Obj (name,age){
    this.name = name
    this.age = age
    this.sayHai= function(){
        console.log(this)
    }
}

let o = new Obj('Tina'，18) //{name: 'tina', age: 18}
```

构造函数执行过程分为4步：

**第一步: 创建一个Object对象实例。
第二步: 将构造函数的执行对象赋给新生成的这个实例。
第三步: 执行构造函数中的代码
第四步: 返回新生成的对象实例**

```js
function Obj (name){
    this.name = name
    return name
}

let o = new Obj('Tina') // ???
```

构造函数在new的时候，会默认创建一个空的 { },并且把构造函数的prototype赋值给空对象的__proto__，当构造函数返回值不是对象时，返回值就会默认成构造函数自己创建的对象

### 4.call和apply

`call`和`apply`可以指定函数运行时的`this`

**call方法使用的语法规则**
函数名称.call(obj,arg1,arg2...argN);
参数说明:
obj:函数内this要指向的对象,
arg1,arg2...argN :参数列表，参数与参数之间使用一个逗号隔开

**apply方法使用的语法规则**

函数名称.apply(obj,[arg1,arg2...,argN])
参数说明:
obj :this要指向的对象
[arg1,arg2...argN] : 参数列表，要求格式为数组

```js
function add(c, d){
  return this.a + this.b + c + d;
}

var o = {a:1, b:3};
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
```

### **练习题**

```js
var A = {
    name: '张三',
    f: function () {
        console.log('姓名：' + this.name);
    }
};

var B = {
    name: '李四'
};

B.f = A.f;
B.f()   
A.f()  
```

```js
function foo() {
    console.log(this.a);
}
var obj2 = {
    a: 2,
    fn: foo
};
var obj1 = {
    a: 1,
    o1: obj2
};
obj1.o1.fn();
```

```js
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); 
            console.log(this); 
        }
    }
}
var j = o.b.fn;
j();
```

```js
var x = 3;
var y = 4;
var obj = {
    x: 1,
    y: 6,
    getX: function() {
        var x =5;
        return function() {
            return this.x;
        }();
    },
    getY: function() {
        var y =7;
         return this.y;
    }
}
console.log(obj.getX())
console.log(obj.getY())
```

```js
 var name="the window";

 var object={
    name:"My Object", 
    getName:function(){ 
       return this.name;
   } 
 }

 object.getName();   

(object.getName)();   

(object.getName=object.getName)();  
```

## 三、原型

### 1.prototype

在JavaScript中，每个函数 都有一个prototype属性，当一个函数被用作构造函数来创建实例时，这个函数的prototype属性值会被作为原型赋值给对象实例（也就是设置 实例的`__proto__`属性），也就是说，所有实例的原型引用的是函数的prototype属性。

**构造函数使用方式**

```js
function Person(name,age){
    this.name = name
    this.age = age
}
var p = new Person('张三',20);
```

每一个JavaScript对象(除了 null )都具有的一个属性，叫`__proto__`，这个属性会指向该对象的原型

```js
console.log(p.__proto__ === Person.prototype); // true
```

![img](https://upload-images.jianshu.io/upload_images/1490251-e7476a8697e97aab.png?imageMogr2/auto-orient/strip|imageView2/2/w/567/format/webp)

### 2.constructor

每个原型都有一个 constructor 属性指向关联的构造函数

```js
console.log(Person === p.__proto__.constructor); //true
```

![img](https://upload-images.jianshu.io/upload_images/1490251-0cac772635e8a128.png?imageMogr2/auto-orient/strip|imageView2/2/w/518/format/webp)

在 Javascript 语言中，constructor 属性是专门为 function 而设计的，它存在于每一个 function 的prototype 属性中。这个 constructor 保存了指向 function 的一个引用

通过构造函数创建的对象，constructor 指向构造函数，而构造函数本身的constructor ，则指向**Function**本身，因为所有的函数都是通过**new Function（）**构造的

```js
   function Person() {
       
    }
    var p = new Person()
    console.log(Person.prototype); // Object{} 
    console.log(p.prototype); // undifined
    console.log(p.constructor); //function Person(){}    
    此处的p是通过 Person函数构造出来的，所以p的constructor属性指向Person
    console.log(Person.constructor); //function Function(){}
    之前提过，每个函数其实是通过new Function（）构造的
    console.log({}.constructor); // function Object(){}
    每个对象都是通过new Object（）构造的
    console.log(Object.constructor); // function Function() {}
    Object也是一个函数，它是Function（）构造的
    console.log([].constructor);  //function Array(){}
```

函数是对象构造的 对象也是函数构造的，俩者即是函数也是对象，所以为什么构造函数它是一个函数却返回一个对象，俩者是互相继承的关系

```csharp
    var o1 = new f1();
    typeof o1 //"object"  
```

### prototype的用法

最主要的方法就是将属性暴露成公用的

代码对比：

```jsx
    function Person(name,age){
        this.name = name;
        this.age = age;
        this.sayHello = function(){
            console.log(this.name + "say hello");
        }
    }
    var girl = new Person("bella",23);
    var boy = new Person("alex",23);
    console.log(girl.name);  //bella
    console.log(boy.name);   //alex
    console.log(girl.sayHello === boy.sayHello);  //false
```

```jsx
    function Person(name,age){
        this.name = name;
        this.age = age;
        
    }
    Person.prototype.sayHello=function(){
        console.log(this.name + "say hello");
    }
    var girl = new Person("bella",23);
    var boy = new Person("alex",23);
    console.log(girl.name);  //bella
    console.log(boy.name);   //alex
    console.log(girl.sayHello === boy.sayHello);  //true 
```

总结：

```js
function Person(){

 }
var person1=new Person()
 
person1.__proto__==Person.prototype

person1.constructor==Person

Person.__proto__==Function.prototype

Person.prototype.constructor==Person

person1.__proto__.constructor==Person
```

## 四、原型链

在js中，大部分东西都是对象，数组是对象，函数也是对象，对象更加是对象。**不管我们给数组和函数定义什么内容，它们总是有一些相同的方法和属性**。比如说valueOf()，toString()等

**这说明一个对象所拥有的属性不仅仅是它本身拥有的属性，它还会从其他对象中继承一些属性。当js在一个对象中找不到需要的属性时，它会到这个对象的父对象上去找，以此类推，这就构成了对象的原型链**

```js
function Foo(_name) {
  this.name = _name;
}
Foo.prototype.show = function() {
  console.log('I am ', this.name);
};
var f1 = new Foo('obj1');
var f2 = new Foo('obj2');

f1.show();  //  I am obj1
f2.show();  //  I am obj2
//我们定义的show函数在Foo.prototype中，当我们执行f1.show()时，js发现f1本身没有show这个属性，所以它就到f1的原型（也就是__proto__指向的对象）去找，找到了就可以调用
```

![img](https://upload-images.jianshu.io/upload_images/4888929-d2e1166fb30c2681.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

图片第一行告诉了我们4点：

1. **所有函数都有一个prototype指针**，指向原型对象，如图中的Foo的prototype指针。prototype指针的意义是，当我们使用这个构造函数new出新对象的时候，新对象的`__proto__`指向prototype

2. **构造函数的prototype所指向的原型对象**有一个constructor指针，指回构造函数。如图中Foo.prototype的constructor指针指向Foo。constructor指针有助于我们找到一个对象的构造函数是谁。

3. `__proto__`**每个对象都有**，js在new一个对象的时候，会将它的`__proto__`指向**构造函数的prototype指向的那个对象**。在上图中，f1、f2这些实例对象的`__proto__`都指向了Foo.prototype。

4. 如果一个对象的`__proto__`指向了另一个对象，那么前者就继承了后者的所有属性

    ```js
    function Foo(_name) {
      this.name = _name;
    }
    Foo.prototype.show = function() {
      console.log('I am ', this.name);
    };
    var f1 = new Foo('obj1');
    var f2 = new Foo('obj2');
    
    var obj = {
      type:1
    }
    f1.__proto__ = obj
    console.dir(f1)
    
    f1.show();  //  I am obj1
    f2.show();  //  I am obj2
    ```

Foo是一个函数，它的构造函数是js内部的function Function()，Function的prototype指向了一个对象Function.prototype，因此Foo的__proto__就指向了Function.prototype

> 所有的函数都以function Function()为构造函数，因此，所有函数**（包括function Function()和function Object()）**的__proto__都指向Function.prototype这个对象，这个对象中定义了所有函数都共有的方法，比如call()、apply()等。

我们继续深入下去，Function.prototype这个对象，它就是一个普通的对象，它的构造函数是js内置的function Object()，function Object()的prototype指向Object.prototype，因此Function.prototype.`__proto__`就指向Object.prototype，这个对象中定义了所有对象共有的属性，比如我们之前说的hasOwnProperty()和toString()等。

> 同理，Foo.prototype和其他自定义的对象也是`__proto__`指向Object.prototype对象

Object.prototype就是原型链的终点了，它的`__proto__`是null，js查找属性时，如果到这里还没有找到，那就是undefined了

## 五、闭包

**函数**和函数**内部能访问到的变量**加在一起就是一个闭包

常规认为，一个函数嵌套另一个函数，两个函数中间的环境，叫闭包，但其实这也是制造一个不会被污染**沙箱**环境，实质上，由于js**函数作用域**的存在，所有的函数，都可以是一个闭包

```js
function foo(){
  var num = 1
  function add(){
    num++
    return num
  }
  return add
}

var func = foo()
func()
```

闭包常常用来**间接访问一个变量**也可以理解为**隐藏一个变量**

```js
function foo(){
  var num = 18
  var obj = {
      text:'我是一个字符串',
      getNUm:function(){
          return num
      }
  }
  return obj
}

var obj = foo()
var age = obj.getNUm()
console.log(age)
```

由于 JS 的函数内部可以使用函数外部的变量，而函数外部无法访问到函数内部的变量，所以正好符合了闭包的定义。所以只要懂了 JS 的作用域，自然而然就懂了闭包。

## 六、事件机制

JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事
单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。于是，所有任务可以分成两种，一种是**同步任务**，另一种是**异步任务**

同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；

异步任务指的是，不进入主线程、而进入"任务队列" 的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

![img](https://images2018.cnblogs.com/blog/1424035/201807/1424035-20180717203930248-574135681.png)

1. 所有同步任务都在主线程上执行，形成一个执行栈。

2. 主线程之外，还存在一个"任务队列"。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件

3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行

4. 主线程不断重复上面的第三步

    ```js
    console.log(1);
    setTimeout(function() {
        console.log(2);
    },1000)
    setTimeout(function() {
        console.log(3);
    },0)
    console.log(4);
    /*
        分析：
            同步任务，按照顺序一步一步执行
            异步任务，当读取到异步任务的时候，将异步任务放置到任务队列
    中，当满足某种条件或者说指定事情完成了（这里的是时间分别是达到了0ms和1000ms）当指定
    事件完成了才从任务队列中注册到主线程的事件队列，当同步事件完成了，便从
    事件队列中读取事件执行。（因为3的事情先完成了，所以先从任务队列中注册到
    事件队列中，所以先执行的是3而不是在前面的2）
    */
    ```

#### 宏任务与微任务

宏任务：script代码，setTimeout，setInterval
微任务：Promise，process.nextTick

不同类型的任务会进入对应的任务队列。
事件循环的顺序，决定js代码的执行顺序。

![img](https://images2018.cnblogs.com/blog/1424035/201807/1424035-20180717204025092-991427971.png)

进入整体代码(宏任务)后，开始第一次循环。

接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务

```js
console.log(1);
setTimeout(function() {
    console.log(2)
},1000);
 
new Promise(function(resolve) {
    console.log(3);
    resolve();
}
).then(function() {
    console.log(4)
});
console.log(5);
/*
    为什么是这样呢？因为以同步异步的方式来解释执行机制是不准确的，更加准确的方式是宏任务和微任务：
    因此执行机制便为：执行宏任务 ===> 执行微任务 ===> 执行另一个宏任务 ===> 不断循环
        即：在一个事件循环中，执行第一个宏任务，宏任务执行结束，执行当前事件循环中的微任务，
执行完毕之后进入下一个事件循环中，或者说执行下一个宏任务
*/
```

## 七、ES6

### 1.let

let 声明的变量只在 let 命令所在的代码块内有效

```js
{
  let a = 0;
  a   // 0
}
a   // 报错 ReferenceError: a is not defined
```

let 只能声明一次 (var 可以声明多次)

```js
let a = 1;
let a = 2;
var b = 3;
var b = 4;
a  // Identifier 'a' has already been declared 标识符“a”已声明
b  // 4
```

let 不存在变量提升，var 会变量提升

```js
console.log(a);  //ReferenceError: a is not defined  引用错误：未定义a
let a = "apple";
 
console.log(b);  //undefined
var b = "banana";
```

### 2.const

const 声明一个只读的常量，一旦声明，常量的值就不能改变

```js
const PI = "3.1415926";
PI = '123' //Assignment to constant variable 常量变量的赋值
```

暂时性死区:

```js
var PI = "a";
if(true){
  console.log(PI);  // ReferenceError: PI is not defined
  const PI = "3.1415926";
}
```

ES6 明确规定，代码块内如果存在 let 或者 const，代码块会对这些命令声明的变量从块的开始就形成一个封闭作用域。代码块内，在声明变量 PI 之前使用它会报错。

### 3.解构赋值

解构赋值是对赋值运算符的扩展，是一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值处理

**基本**

```js
let [a, b, c] = [1, 2, 3];
// a = 1
// b = 2
// c = 3

let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// foo = 'aaa'
// bar = 'bbb'
 
let { baz : foo } = { baz : 'ddd' };
// foo = 'ddd'
```

**可嵌套**

```js
let [a, [[b], c]] = [1, [[2], 3]];
// a = 1
// b = 2
// c = 3

let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, { y }] } = obj;
// x = 'hello'
// y = 'world'
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, { }] } = obj;
// x = 'hello'
```

**可忽略**

```js
let [a, , b] = [1, 2, 3];
// a = 1
// b = 3
```

**不完全解构**

```js
let [a = 1, b] = []; 
// a = 1, b = undefined

let obj = {p: [{y: 'world'}] };
let {p: [y, x] } = obj;
// x = undefined
// y = 'world'
```

**剩余运算符**

```js
let [a, ...b] = [1, 2, 3];
//a = 1
//b = [2, 3]

let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
// a = 10
// b = 20
// rest = {c: 30, d: 40}
```

**解构默认值**

```js
let [a = 2] = [undefined]; // a = 2

let {a = 10, b = 5} = {a: 3};
// a = 3; b = 5;
let {a: aa = 10, b: bb = 5} = {a: 3};
// aa = 3; bb = 5;
```

**字符串等**

在数组的解构中，解构的目标若为可遍历对象，皆可进行解构赋值

```js
let [a, b, c, d, e] = 'hello';
// a = 'h'
// b = 'e'
// c = 'l'
// d = 'l'
// e = 'o'
```

### 4.Proxy

Proxy 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作

```js
let target = {
    name: 'Tom',
    age: 24
}
let handler = {
    get: function(target, key) {
        console.log('getting '+key);
        return target[key]; // 不是target.key
    },
    set: function(target, key, value) {
        console.log('setting '+key);
        target[key] = value;
    }
}
let proxy = new Proxy(target, handler)
proxy.name     // 实际执行 handler.get
proxy.age = 25 // 实际执行 handler.set
// getting name
// setting age
// 25
```

### 5.箭头函数

箭头函数提供了一种更加简洁的函数书写方式。基本语法是：

```
参数 => 函数体
```

```js
var f = v => v;
//等价于
var f = function(a){
 return a;
}
f(1);  //1
```

当箭头函数**没有参数**或者有**多个参数**，要用 **()** 括起来

```js
var f = (a,b) => a+b;
f(6,2);  //8
```

当箭头函数函数体有多行语句，用 **{}** 包裹起来，表示代码块，当只有一行语句，并且需要返回结果时，可以省略 **{}** , 结果会自动返回

```js
var f = (a,b) => {
 let result = a+b;
 return {};
}
f(6,2);  // 8
```

当箭头函数要返回对象的时候，为了区分于代码块，要用 **()** 将对象包裹起来

```js
// 报错
var f = (id,name) => {id: id, name: name};
f(6,2);  // SyntaxError: Unexpected token :
 
// 不报错
var f = (id,name) => ({id: id, name: name});
f(6,2);  // {id: 6, name: 2}
```

箭头函数没有 this、arguments绑定

```js
var func = () => {
  // 箭头函数里面没有 this 对象，
  // 此时的 this 是外层的 this 对象，即 Window 
  console.log(this)
}
func(55)  // Window 
 
var func = () => {    
  console.log(arguments)
}
func(55);  // ReferenceError: arguments is not defined
```

箭头函数体中的 this 对象，是定义函数时的对象，而不是使用函数时的对象

```js
function fn(){
  setTimeout(()=>{
    // 定义时，this 绑定的是 fn 中的 this 对象
    console.log(this.a);
  },0)
}
var a = 20;
fn()
// fn 的 this 对象为 window 所以打印20
```

### 6.class类

在ES6中，class (类)作为对象的模板被引入，可以通过 class 关键字定义类。**class 的本质是 function**。

它可以看作一个语法糖，让对象原型的写法更加清晰、更像面向对象编程的语法

注意要点：**不可重复声明**

```js
class Example {
    constructor(a) {
        this.a = a;
    }
}
let obj = new Example(1)
console.log(obj)

```

通过 extends 实现类的继承

```js
class Child extends Example { 
    constructor(a,b) {
        super(b);
        this.b = a;
        this.hi=()=>alert('hi')
    }
 }
 let b = new Child(1,2)
 console.log(b)//{a:2,b:1,hi:()=>alert('hi')}
```

### 7.模块

#### export和import

ES6 的模块化分为导出（export） @与导入（import）两个模块

模块导入导出各种类型的变量，如字符串，数值，函数，类。

- 导出的函数声明与类声明必须要有名称（export default 命令另外考虑）。
- 不仅能导出声明还能导出引用（例如函数）。
- export 命令可以出现在模块的任何位置
- import 命令会提升到整个模块的头部，首先执行。

```js
/*-----export [test.js]-----*/
let myName = "Tom";
let myAge = 20;
let myfn = function(){
    return "My name is" + myName + "! I'm '" + myAge + "years old."
}
let myClass =  class myClass {
    static a = "yeah!";
}
export { myName, myAge, myfn, myClass }
 
/*-----import [xxx.js]-----*/
import { myName, myAge, myfn, myClass } from "./test.js";
console.log(myfn());// My name is Tom! I'm 20 years old.
console.log(myAge);// 20
console.log(myName);// Tom
console.log(myClass.a );// yeah!
```

#### as 的用法

export 命令导出的接口名称，须和模块内部的变量有一一对应关系

导入的变量名，须和导出的接口名称相同，顺序可以不一致

不同模块导出接口名称命名重复， 使用 as 重新定义变量名

```js
/*-----export [test.js]-----*/
let myName = "Tom";
export { myName as exportName }
 
/*-----import [xxx.js]-----*/
import { exportName } from "./test.js";
console.log(exportName);// Tom
//使用 as 重新定义导出的接口名称，隐藏模块内部的变量
/*-----export [test1.js]-----*/
let myName = "Tom";
export { myName }
/*-----export [test2.js]-----*/
let myName = "Jerry";
export { myName }
/*-----import [xxx.js]-----*/
import { myName as name1 } from "./test1.js";
import { myName as name2 } from "./test2.js";
console.log(name1);// Tom
console.log(name2);// Jerry
```

#### export default

- 在一个文件或模块中，export、import 可以有多个，export default 仅有一个。
- export default 中的 default 是对应的导出接口变量。
- 通过 export 方式导出，在导入时要加{ }，export default 则不需要。
- export default 向外暴露的成员，可以使用任意变量来接收。

```js
var a = "My name is Tina!";
export default a; // 仅有一个

import b from "./xxx.js"; // 不需要加{}， 使用任意变量接收
```

### 8.Promise

Promise 异步操作有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。除了异步操作的结果，任何其他操作都无法改变这个状态。

Promise 对象只有：从 pending 变为 fulfilled 和从 pending 变为 rejected 的状态改变。只要处于 fulfilled 和 rejected ，状态就不会再变了即 resolved（已定型）

```js
const p1 = new Promise(function(resolve,reject){
    resolve('success1');
   // resolve('success2');
}); 
const p2 = new Promise(function(resolve,reject){  
    resolve('success3'); 
   // reject('reject');
});
p1.then(function(value){  
    console.log(value); // success1
});
p2.then(function(value){ 
    console.log(value); // success3
});
```

无法取消 Promise ，一旦新建它就会立即执行，无法中途取消。

如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。

当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

#### then方法

then 方法接收两个函数作为参数，第一个参数是 Promise 执行成功时的回调，第二个参数是 Promise 执行失败时的回调，两个函数只会有一个被调用。

在 JavaScript 事件队列的当前运行完成之前，回调函数永远不会被调用

```js
const p = new Promise(function(resolve,reject){
  resolve('success');
});
 
p.then(function(value){
  console.log(value);
});
 
console.log('first');
// first
// success
```

通过 **.then** 形式添加的回调函数，不论什么时候，都会被调用。
then 方法将返回一个 resolved 或 rejected 状态的 Promise 对象用于链式调用，且 Promise 对象的值就是这个返回值

多次调用

```js
const p = new Promise(function(resolve,reject){
  resolve(1);
}).then(function(value){ // 第一个then // 1
  console.log(value);
  return value * 2;
}).then(function(value){ // 第二个then // 2
  console.log(value);
}).then(function(value){ // 第三个then // undefined
  console.log(value);
  return Promise.resolve('resolve'); 
}).then(function(value){ // 第四个then // resolve
  console.log(value);
  return Promise.reject('reject'); 
}).then(function(value){ // 第五个then //reject:reject
  console.log('resolve:' + value);
}, function(err) {
  console.log('reject:' + err);
});
```

### 9.async

async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数

```js
async function helloAsync(){
    return "helloAsync";
  }
  
console.log(helloAsync())  // Promise {<resolved>: "helloAsync"}
 
helloAsync().then(v=>{
   console.log(v);         // helloAsync
})
```

async 函数中可能会有 await 表达式，async 函数执行时，如果遇到 await ，那么await标记的表达式会先执行一遍，**将await后面的代码加入到微任务中，然后就会跳出整个async函数来执行后面的代码**。

await 关键字仅在 async function 中有效

```js
function testAwait(){
   return new Promise((resolve) => {
       setTimeout(function(){
          console.log("testAwait");
          resolve();
       }, 1000);
   });
}
 
async function helloAsync(){
   await testAwait();
   console.log("helloAsync");
 }
helloAsync();
// testAwait
// helloAsync
```

##### **练习题**

```js
const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
    reject('error');
})
promise.then(() => {
    console.log(3);
}).catch(e => console.log(e))
console.log(4);
```

```js
const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
             console.log('once')
             resolve('success')
        }, 1000)
 })
promise.then((res) => {
       console.log(res)
     })
promise.then((res) => {
     console.log(res)
 })
```

```js
const p1 = () => (new Promise((resolve, reject) => {
 console.log(1);
 let p2 = new Promise((resolve, reject) => {
  console.log(2);
  const timeOut1 = setTimeout(() => {
   console.log(3);
   resolve(4);
  }, 0)
  resolve(5);
 });
 resolve(6);
 p2.then((arg) => {
  console.log(arg);
 });

}));
const timeOut2 = setTimeout(() => {
 console.log(8);
 const p3 = new Promise(reject => {
  reject(9);
 }).then(res => {
  console.log(res)
 })
}, 0)


p1().then((arg) => {
 console.log(arg);
});
console.log(10);
```

```js
async function async1() {
    console.log(1)
    await async2()
    console.log(2)
}
async function async2() {
    console.log(3)
}
console.log(4)
setTimeout(() => {
    console.log(5)
}, 0);
async1()
new Promise(resolve => {
        console.log(6)
        resolve()
    })
    .then(() => {
        console.log(7)
    })
console.log(8)
```
