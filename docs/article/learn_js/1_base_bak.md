## javaScript基础

在 HTML 中，JavaScript 代码必须位于 `<script>` 与 `</script>` 标签之间。

```js
<script>
   document.getElementById("demo").innerHTML = "我的第一段 JavaScript";
</script>
```

您能够在 HTML 文档中放置任意数量的脚本。

脚本可被放置与 HTML 页面的 `<body>` 或 `<head>` 部分中

也可以放置与外部文件中，文件文件扩展名是**.js**

外部脚本， `<script>` 标签的 src 属性中设置脚本的地址

在外部文件中放置脚本有如下优势：

- 分离了 HTML 和 js 代码
- 使 HTML 和 JavaScript 更易于阅读和维护
- 已缓存的 JavaScript 文件可加速页面加载

## 1、基础

### 1.输出

JavaScript 能够以不同方式“显示”数据：

- 使用 window.alert() 写入警告框
- 使用 document.write() 写入 HTML 输出
- 使用 innerHTML 写入 HTML 元素
- 使用 console.log() 写入浏览器控制台

```js
<script>
 document.getElementById("demo").innerHTML = 5 + 6;
 document.write(5 + 6);
 window.alert(5 + 6);
 alert(5 + 6);
 console.log(5 + 6);
</script>
```

### 2.基础语法

JavaScript 语法是一套规则，它定义了 JavaScript 的语言结构

在编程语言中，**变量**用于存储数据值

JavaScript 使用 **var** 关键词来声明变量

**=** 号用于为变量赋值

```js
var name = "Tina";
var age = 18;
```

JavaScript 使用**算数运算符（+ - * /）**来计算值：

```js
// 数值计算
var num = 18 + 1
//字符串相加
var str = name + ':' + age
```

JavaScript **关键词**用于标识被执行的动作。

var 关键词告知浏览器创建新的变量：

```
var x = 7 + 8;
var y = x * 10; 
```

并非所有 JavaScript 语句都被“执行”。

双斜杠 // 或 /*与 **/* 之间的代码被视为*注释*。

注释会被忽略，不会被执行：

```js
var x = 7;   // 会执行

// var x = 8;   不会执行
```

### 3.数据类型

**值类型(基本类型)**：

- 字符串（String）
- 数字(Number)
- 布尔(Boolean)
- 空（Null）
- 未定义（Undefined）

**引用数据类型**：

- 对象(Object)
- 数组(Array)
- 函数(Function)

```js
var length = 7;                             // 数字
var lastName = "Gates";                      // 字符串
var isShow = true;                          // 布尔
var title = null;                          // 空
var title;                               // undefined
var list = ["Ace", "Tina", "Eleven"];         // 数组
var x = {firstName:"Bill", lastName:"Gates"};    // 对象 
var fun = function(){alert('我是一个函数')}    // 对象 
```

#### 3.1 字符串

字符串（或文本字符串）是一串字符（比如 "Bill Gates"）。

字符串被引号包围。您可使用单引号或双引号：

```js
var name = "Tina";   // 使用双引号
var name = 'Tina';   // 使用单引号
var name = "我的名字叫'Tina'";   // 字符串内包含引号
```

**特殊字符**

*\ 转义字符*。

反斜杠转义字符把特殊字符转换为字符串字符：

| 代码 | 结果 | 描述   |
| :--- | :--- | :----- |
| \'   | '    | 单引号 |
| \"   | "    | 双引号 |
| \\\  | \    | 反斜杠 |

```js
//序列 \" 在字符串中插入双引号：
var x = "中国是瓷器的故乡，因此 china 与\"China（中国）\"同名。"
```

通常，JavaScript 字符串是原始值，通过字面方式创建：

```js
var firstName = "Bill"
```

但是字符串也可通过关键词 new 定义为对象：

```js
var firstName = new String("Bill")
```

当使用 == 相等运算符时，相等字符串是相等的：

```js
var x = "Bill";             
var y = new String("Bill");

// (x == y) 为 true，因为 x 和 y 的值相等
```

当使用 === 运算符时，相等字符串是不相等的，因为 === 运算符需要类型和值同时相等。

```js
var x = "Bill";             
var y = new String("Bill");

// (x === y) 为 false，因为 x 和 y 的类型不同（字符串与对象）
```

```js
var x = new String("Bill");             
var y = new String("Bill");

// (x == y) 为 false，因为 x 和 y 是不同的对象
```

##### 3.1.1**字符串长度**

内建属性 **length** 可返回字符串的长度：

```js
var txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var sln = txt.length;
```

##### 3.1.2查找字符串

**indexOf()** 方法返回字符串中指定文本**首次**出现的索引（位置）

 JavaScript 从零计算位置。

0 是字符串中的第一个位置，1 是第二个，2 是第三个 ...

**lastIndexOf()** 方法返回指定文本在字符串中**最后**一次出现的索引

如果未找到文本， indexOf() 和 lastIndexOf() 均返回 -1

```js
var str = "这是String字符串的讲解";
var pos = str.indexOf("String");
var pos2 = str.lastIndexOf("String");
```

两种方法都接受作为检索起始位置的第二个参数。

```js
var str = "这是String字符串的讲解";
var pos = str.indexOf("String",1);
var pos2 = str.lastIndexOf("String",1);
```

##### 3.1.3 检索字符串

**search()** 方法搜索特定值的字符串，并返回匹配的位置：

```js
var str = "这是String字符串的讲解";
var pos = str.search("String");
```

indexOf() 与 search()，是相等的。

这两种方法是不相等的。区别在于：

- search() 方法无法设置第二个开始位置参数。
- indexOf() 方法无法设置更强大的搜索值（正则表达式）。

##### 3.1.4提取字符串

有三种提取部分字符串的方法：

- **slice(*start*, *end*)**

    **slice()** 提取字符串的某个部分并在新字符串中返回被提取的部分。

    该方法设置两个参数：起始索引（开始位置），终止索引（结束位置）。

    ```js
    var str = "Apple, Banana, Mango";
    var res = str.slice(7,13);
    //如果某个参数为负，则从字符串的结尾开始计数
    var res2 = str.slice(-13,-7);
    //如果省略第二个参数，则该方法将裁剪字符串的剩余部分
    var res3 = str.slice(7);
    //从结尾计数
    var res = str.slice(-13);
    ```

- **substring(*start*, *end*)**

    **substring()** 类似于 slice()。

    不同之处在于 **substring()** 无法接受负的索引。

    ```js
    var str = "Apple, Banana, Mango";
    var res = str.substring(7,13);
    //如果省略第二个参数，则该 substring() 将裁剪字符串的剩余部分。
    var res2 = str.substring(7);
    ```

- **substr(*start*, *length*)**

    substr() 类似于 slice()。

    不同之处在于第二个参数规定被提取部分的长度。

    ```js
    var str = "Apple, Banana, Mango";
    var res = str.substr(7,6);
    //如果省略第二个参数，则该 substr() 将裁剪字符串的剩余部分。
    var res2 = str.substr(7);
    //如果首个参数为负，则从字符串的结尾计算位置
    var res3 = str.substr(-5);
    ```

##### 3.1.5 替换字符串

**replace()** 方法用另一个值替换在字符串中指定的值

replace() 方法不会改变调用它的字符串。它返回的是新字符串。

```js
var str = "这是String字符串的讲解";
//默认replace() 只替换首个匹配：
var n = str.replace("String字符串", "前端");
//如需执行大小写不敏感的替换，请使用正则表达式 /i（大小写不敏感）：
var n = str.replace(/string字符串/i, "前端");
//如需替换所有匹配，请使用正则表达式的 g 标志（用于全局搜索）
var n = str.replace(/string字符串/g, "前端");
```

##### 3.1.6 转换为大小写

通过 **toUpperCase()** 把字符串转换为大写

```js
var text1 = "Hello World!";       // 字符串
var text2 = text1.toUpperCase();  // text2 是被转换为大写的 text1
```

通过 **toLowerCase()** 把字符串转换为小写：

```js
var text1 = "Hello World!";       // 字符串
var text2 = text1.toLowerCase();  // text2 是被转换为小写的 text1
```

##### 3.1.7 concat()

**concat()** 连接两个或多个字符串：

```js
var text1 = "Hello";
var text2 = "World";
text3 = text1.concat(" ",text2);
```

##### 3.1.8 String.trim()

**trim()** 方法删除字符串两端的空白符：

```
var str = "       Hello World!        ";
alert(str.trim());
```

##### 3.1.9 charAt()

**charAt()** 方法返回字符串中指定下标的字符串

```js
var str = "HELLO WORLD";
str.charAt(0);            // 返回 H
```

##### 3.1.10 字符串转数组

可以通过 split() 将字符串转换为数组：

```js
var txt = "a,b,c,d,e";   // 字符串
txt.split(",");          // 用逗号分隔
txt.split(" ");          // 用空格分隔
txt.split("|");          // 用竖线分隔
txt.split(""); 
```

#### 3.2 数值

JavaScript 只有一种数值类型。

写数值时用不用小数点均可

```js
var x1 = 34.00;     // 带小数点
var x2 = 34;        // 不带小数点
```

##### 3.2.1 数字计算

JavaScript 的加法使用 + 运算符。

```js
var x = 10;
var y = 20;
var z = x + y;           
```

如果对两个字符串相加，结果将是一个字符串的级联：

```js
var x = "10";
var y = "20";
var z = x + y;     
```

如果您对一个数和一个字符串相加，结果也是字符串级联：

```js
var x = 10;
var y = "20";
var z = x + y;        
```

JavaScript 从左向右进行编译。

因为 x 和 y 都是数，10 + 20 将被相加。

因为 z 是字符串，30 + "30" 被级联。

在所有数字运算中，JavaScript 会将字符串转换为数字

```js
var x = "100";
var y = "10";
var z = x / y;       // z 将是 10
var z = x * y;       // z 将是 1000
var z = x - y;       // z 将是 90
var z = x + y;       // z 不会是 110（而是 10010）
```

##### 3.2.2 NaN 非数值

NaN 属于 JavaScript 保留词，指示某个数不是合法数。

尝试用一个非数字字符串进行除法会得到 NaN（Not a Number）：

```js
var x = 100 / "Apple";  // x 将是 NaN（Not a Number）
//假如字符串包含数值，则结果将是数：
var x = 100 / "10";     // x 将是 10
```

可使用全局 JavaScript 函数 isNaN() 来确定某个值是否是数：

```js
var x = 100 / "Apple";
isNaN(x);               // 返回 true，因为 x 不是数
```

NaN 是数，typeof NaN 返回 number：

```js
typeof NaN;             // 返回 "number"
```

##### 3.2.3 数值对象

通常 JavaScript 数值是通过字面量创建的原始值：var x = 123

但是也可以通过关键词 new 定义为对象：var y = new Number(123)

```js
var x = 123;
var y = new Number(123);

// typeof x 返回 number
// typeof y 返回 object
```

##### 3.2.4 toString() 方法

**toString()** 以字符串返回数值。

所有数字方法可用于任意类型的数字（字面量、变量或表达式）

```js
var x = 123;
x.toString();            // 从变量 x 返回 123
(123).toString();        // 从文本 123 返回 123
(100 + 23).toString();   // 从表达式 100 + 23 返回 123
```

##### 3.2.5 toFixed() 方法

toFixed() 返回字符串值，它包含了指定位数小数的数字

```js
var x = 9.656;
x.toFixed(0);           // 返回 10
x.toFixed(2);           // 返回 9.66
x.toFixed(4);           // 返回 9.6560
x.toFixed(6);           // 返回 9.656000
```

##### 3.2.6 toPrecision()

**toPrecision()** 返回字符串值，它包含了指定长度的数字：

```js
var x = 9.656;
x.toPrecision();        // 返回 9.656
x.toPrecision(2);       // 返回 9.7
x.toPrecision(4);       // 返回 9.656
x.toPrecision(6);       // 返回 9.65600
```

##### 3.2.7 变量转数值

这三种 JavaScript 方法可用于将变量转换为数字

| 方法         | 描述                         |
| :----------- | :--------------------------- |
| Number()     | 返回数字，由其参数转换而来。 |
| parseFloat() | 解析其参数并返回浮点数。     |

- Number() 方法

    ```js
    //Number() 可用于把 JavaScript 变量转换为数值
    x = true;
    Number(x);        // 返回 1
    x = false;     
    Number(x);        // 返回 0
    x = new Date();
    Number(x);        // 返回 1404568027739
    x = "10"
    Number(x);        // 返回 10
    x = "10 20"
    Number(x);        // 返回 NaN
    //Number() 还可以把日期转换为数字：
    Number(new Date("2019-04-15"));    // 返回 1506729600000
    ```

- parseInt() 方法

    ```js
    //parseInt() 解析一段字符串并返回数值。允许空格。只返回首个数字
    parseInt("10");         // 返回 10
    parseInt("10.33");      // 返回 10
    parseInt("10 20 30");   // 返回 10
    parseInt("10 years");   // 返回 10
    //如果无法转换为数值，则返回 NaN
    parseInt("years 10");   // 返回 NaN
    ```

#### 3.3 数组

 **数组用于在单一变量中存储多个值**

##### 3.3.1 申明数组

数组用方括号书写。

数组的项目由逗号分隔

数组索引基于零，这意味着第一个项目是 [0]，第二个项目是 [1]，以此类推

```js
var list = ["Ace", "Tina", "Eleven"];
var list = new Array("Ace", "Tina", "Eleven");
```

##### 3.3.2 访问数组

通过引用索引号（下标号）来引用某个数组元素

```js
//获取第一个
var name = list[0];
//获取最后一个
var name = list[-1];
```

##### 3.3.3 改变元素

修改了 cars 中第一个元素的值：

```js
list[0] = "Tina";
```

##### 3.3.4 length 属性

**length** 属性返回数组的长度（数组元素的数目）

```js
var list = ["Ace", "Tina", "Eleven"];
list.length;                       // fruits 的长度是 3
```

##### 3.3.5 遍历数组

###### **for**循环

```js
var list = ["Ace", "Tina", "Eleven"];
for (var i = 0; i < list.length; i++) {
    console.log(list[i])
} 
```

###### **Array.foreach()**

该函数接受 3 个参数：

- 项目值
- 项目索引
- 数组本身

```js
var list = ["Ace", "Tina", "Eleven"];
list.forEach(myFunction);

function myFunction(value) {
  console.log(value)
}
```

###### **Array.map()**

map() 方法通过对每个数组元素执行函数来创建新数组。

map() 方法不会对没有值的数组元素执行函数。

map() 方法不会更改原始数组。

函数有 3 个参数：

- 项目值
- 项目索引
- 数组本身

```js
//每个数组值乘以2
var numbers1 = [45, 4, 9, 16, 25];
var numbers2 = numbers1.map(myFunction);

function myFunction(value, index, array) {
  return value * 2;
}
```

###### **Array.filter()**

filter() 方法创建一个包含通过测试的数组元素的新数组

函数接受 3 个参数：

- 项目值
- 项目索引
- 数组本身

```js
//获取大于 18 的元素
var numbers = [45, 4, 9, 16, 25];
var over18 = numbers.filter(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
```

###### **Array.reduce()**

reduce() 方法在每个数组元素上运行函数，以生成（减少它）单个值。

reduce() 方法不会减少原始数组

函数接受 4 个参数：

- 初始值/先前返回的值
- 项目值
- 项目索引
- 数组本身

```js
//求和
var numbers1 = [45, 4, 9, 16, 25];
var sum = numbers1.reduce(myFunction,0);

function myFunction(total, value, index, array) {
  return total + value;
}
```

###### **Array.reduceRight()**

reduceRight() 方法在每个数组元素上运行函数，以生成（减少它）单个值。

reduceRight() 方法在数组中从右到左工作

reduceRight() 方法不会减少原始数组

函数接受 4 个参数：

- 初始值/先前返回的值

- 项目值

- 项目索引

- 数组本身

    ```js
    //求和
    var numbers1 = [45, 4, 9, 16, 25];
    var sum = numbers1.reduceRight(myFunction，0);
    
    function myFunction(total, value) {
      return total + value;
    }
    ```

###### **Array.every()**

every() 方法检查所有数组值是否通过测试

函数接受 3 个参数：

- 项目值
- 项目索引
- 数组本身

```js
//检查所有数组值是否大于 18
var numbers = [45, 4, 9, 16, 25];
var allOver18 = numbers.every(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
```

###### **Array.some()**

some() 方法检查某些数组值是否通过了测试

函数接受 3 个参数：

- 项目值
- 项目索引
- 数组本身

```js
//检查数组是否有大于 18的值
var numbers = [45, 4, 9, 16, 25];
var someOver18 = numbers.some(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
```

###### Array.indexOf()

indexOf() 方法在数组中搜索元素值并返回其位置

方法可接受 2 个参数：

- 要检索的项目
- 从哪里开始搜索

```js
var numbers = [45, 4, 9, 16, 25];
var a = numbers.indexOf(25,1);
```

###### Array.lastIndexOf()

从数组结尾开始搜索

方法可接受 2 个参数：

- 要检索的项目
- 从哪里开始搜索

```js
var numbers = [45, 4, 9, 16, 25];
var a = numbers.lastIndexOf(25);
```

###### Array.find()

find() 方法返回通过测试函数的第一个数组元素的值

函数接受 3 个参数：

- 项目值
- 项目索引
- 数组本身

```js
//大于 18 的第一个元素的值
var numbers = [4, 9, 16, 25, 29];
var first = numbers.find(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
```

###### Array.findIndex()

findIndex() 方法返回通过测试函数的第一个数组元素的索引

函数接受 3 个参数：

- 项目值
- 项目索引
- 数组本身

```js
//查找大于 18 的第一个元素的索引
var numbers = [4, 9, 16, 25, 29];
var first = numbers.findIndex(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
```

##### 3.3.6 数组转字符串

**toString()** 把数组转换为数组值（逗号分隔）的字符串

```js
var list = ["Ace", "Tina", "Eleven"];
vat str = list.toString(); //Ace,Tina,Eleven
```

**join()** 方法也可将所有数组元素结合为一个字符串。

它的行为类似 toString()，但是您还可以规定分隔符

```js
var list = ["Ace", "Tina", "Eleven"];
vat str = list.join("-")//Ace-Tina-Eleven
```

##### 3.3.7 pop()

**pop()** 方法从数组中删除最后一个元素

pop() 方法返回被删除的值

```js
var list = ["Ace", "Tina", "Eleven"];
var str = list.pop();  // 从 list 删除最后一个元素（"Eleven"）
```

##### 3.3.8 push()

**push()**向数组添加新元素

push() 方法返回新数组的长度

```js
var lengthNUm = list.push('张三')
//也可以使用 length 属性向数组添加新元素：
list[list.length] = '张三'
```

##### 3.3.9 shift()

**shift()** 方法会删除首个数组元素

shift() 方法返回被删除的字符串

```js
var list = ["Ace", "Tina", "Eleven"];
list.shift(); // 从 list 删除第一个元素 "Ace"
```

##### 3.3.10 unshift()

**unshift()** 方法（在开头）向数组添加新元素

unshift() 方法返回新数组的长度。

```js
var list = ["Ace", "Tina", "Eleven"];
list.unshift("张三"); 
```

##### 3.3.11 delete

元素可以使用 **delete** 运算符来**删除**

```js
var list = ["Ace", "Tina", "Eleven"];
delete list[0];   // 把 list 中的首个元素改为 undefined
```

##### 3.3.12 splice()

**splice()** 方法可用于向数组添加新项

第一个参数（2）定义了应添加新元素的位置（拼接）。

第二个参数（0）定义应删除多少元素。

其余参数（“Lemon”，“Kiwi”）定义要添加的新元素。

splice() 方法返回一个包含已删除项的数组：

```js
var list = ["Ace", "Tina", "Eleven"];
list.splice(1, 1, "张三");

 //删除 fruits 中的第一个元素
list.splice(0, 1);      
```

##### 3.3.13 合并数组

concat() 方法通过合并（连接）现有数组来创建一个新数组

concat() 方法不会更改现有数组。它总是返回一个新数组。

concat() 方法可以使用任意数量的数组参数

```js
var list = ["Ace", "Tina", "Eleven"];
var myGirls = ["张三", "二狗"];
var newList = myGirls.concat(list);   
```

##### 3.3.14 slice()

slice() 方法用数组的某个片段切出新数组

slice() 方法创建新数组。它不会从源数组中删除任何元素

slice() 可接受两个参数

```js
var list = ["Ace", "Tina", "Eleven"];
//如果结束参数被省略,则 slice() 会切出数组的剩余部分
var newList = list.slice(2); 
//从开始参数选取元素，直到结束参数位置（不包括）为止
var newList = list.slice(1,2); 
```

##### 3.3.15 toString()

把数组转换为字符串，**toString()** 方法以逗号分隔的字符串返回数组

```js
var list = ["Ace", "Tina", "Eleven"];
var str = list.toString()
```

##### 3.3.16 sort() 排序

**sort()** 方法以字母顺序对数组进行排序

```js
var list = ["Ace", "Tina", "Eleven"];
list.sort();     
```

**sort()**还接受一个函数作为参数，根据函数内容决定数字排序

该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b，其返回值如下：

- 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
- 若 a 等于 b，则返回 0。
- 若 a 大于 b，则返回一个大于 0 的值。

```js
var list = [100, 55, 53, 105];
list.sort(function(a, b){return a - b});  //正序 [53, 55, 100, 105]
list.sort(function(a, b){return b - a});  //倒序 [105, 100, 55, 53]
```

##### 3.3.17 reverse() 反转数组

**reverse()** 方法反转数组中的元素

```js
var list = [100, 55, 53, 105];
list.reverse()
```

##### 3.3.7 识别数组

- Array.isArray()

    ```js
    list.isArray(fruits);    
    ```

- list instanceof Array

    ```js
    list instanceof Array 
    ```

#### 3.4 对象

##### 3.4.1 对象定义

JavaScript 对象用花括号来书写。

对象也是一个变量，但对象可以包含多个值（多个变量），每个值以 **name:value** 对呈现

```js
var obj = {
 type: 1,
    name: 'Tina',
    age: 18,
    sayHi:function(){
        console.log('hi~~')
    }
}

var obj = new Object();
 obj.name = 'Tina'

```

##### 3.4.2 对象属性

键值对在 JavaScript 对象通常称为 **对象属性**

可以通过两种方式访问对象属性

```js
var obj = {
 type: 1,
    name: 'Tina',
    age: 18,
    sayHi:function(){
        console.log('hi~~')
    }
}
var type = obj.type
var name = obj.name
obj.sayHi()
```

##### 3.4.3 对象遍历

for/in - 遍历对象属性

```js
var obj = {
 type: 1,
    name: 'Tina',
    age: 18,
    sayHi:function(){
        console.log('hi~~')
    }
}
var x;
for (x in obj) {
    console.log(x + ' : ' + obj[x])
}
```

#### 3.5 函数

##### 3.5.1函数定义

函数就是包裹在花括号中的代码块，前面使用了关键词

```js
function fun(){
 console.log('我是一个函数')
}
```

 当调用该函数时，会执行函数内的代码。

可以在某事件发生时直接调用函数（比如当用户点击按钮时），并且可由 JavaScript 在任何位置进行调用

##### 3.5.2 带参数函数

在调用函数时，可以向其传递值，这些值被称为参数。

这些参数可以在函数中使用。多个参数，由逗号 **,** 分隔

```js
function fun(str){
 console.log(str)
}
```

变量和参数必须以一致的顺序出现。第一个变量就是第一个被传递的参数的给定的值，以此类推

```js
function fun(name,str){
 console.log(name + '说了一句：' + str)
}
```

##### 3.5.3 带返回值的函数

使用 return 语句就可以实现，函数停止执行，并返回指定的值

```js
function fun(name,str){
    console.log(name + '说了一句：' + str)
    return name + '说了一句：' + str
}
```

##### 3.5.4 函数作用域

函数内部声明的变量（使用 var）是**局部变量**，所以只能在函数内部访问它

在函数外声明的变量是**全局变量**，网页上的所有脚本和函数都能访问它

```js
var name = 'Tina'
function fun(){
    console.log(name) // Tina
}
```

```js

function fun(){
   var name = 'Tina'
   console.log(name )
}
 console.log(name)  //undefined
```

变量的生命期从它们被声明的时间开始

局部变量会在函数运行以后被删除

全局变量会在页面关闭后被删除

#### 3.6 Date

##### 3.6.1 创建 Date 对象

- new Date()
- new Date(year, month, day, hours, minutes, seconds, milliseconds)
- new Date(milliseconds)
- new Date(date string)

```js
//用当前日期和时间创建新的日期对象
var d = new Date();
//用指定日期和时间创建新的日期对象
//7个数字分别指定年、月、日、小时、分钟、秒和毫秒（按此顺序）
var d = new Date(2018, 11, 24, 10, 33, 30, 0);
//根据日期字符串创建一个新的日期对象
var d = new Date("October 13, 2014 11:13:00");
//根据毫秒创建日期
var d = new Date(86400000);
//根据时间字符串创建日期对象
var d = new Date('2021-11-20');
```

##### Date 对象方法

| 方法                 | 描述                                                   |
| :------------------- | :----------------------------------------------------- |
| Date()               | 返回当日的日期和时间。                                 |
| getDate()            |                                                        |
| getDay()             | 从 Date 对象返回一周中的某一天 (0 ~ 6)。               |
| getMonth()           | 从 Date 对象返回月份 (0 ~ 11)。                        |
| getFullYear()        | 从 Date 对象以四位数字返回年份。                       |
| getYear()            | 请使用 getFullYear() 方法代替。                        |
| getHours()           | 返回 Date 对象的小时 (0 ~ 23)。                        |
| getMinutes()         | 返回 Date 对象的分钟 (0 ~ 59)。                        |
| getSeconds()         | 返回 Date 对象的秒数 (0 ~ 59)。                        |
| getMilliseconds()    | 返回 Date 对象的毫秒(0 ~ 999)。                        |
| getTime()            | 返回 1970 年 1 月 1 日至今的毫秒数。                   |
| getTimezoneOffset()  | 返回本地时间与格林威治标准时间 (GMT) 的分钟差。        |
| getUTCDate()         | 根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。        |
| getUTCDay()          | 根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。         |
| getUTCMonth()        | 根据世界时从 Date 对象返回月份 (0 ~ 11)。              |
| getUTCFullYear()     | 根据世界时从 Date 对象返回四位数的年份。               |
| getUTCHours()        | 根据世界时返回 Date 对象的小时 (0 ~ 23)。              |
| getUTCMinutes()      | 根据世界时返回 Date 对象的分钟 (0 ~ 59)。              |
| getUTCSeconds()      | 根据世界时返回 Date 对象的秒钟 (0 ~ 59)。              |
| getUTCMilliseconds() | 根据世界时返回 Date 对象的毫秒(0 ~ 999)。              |
| parse()              | 返回1970年1月1日午夜到指定日期（字符串）的毫秒数。     |
| setDate()            | 设置 Date 对象中月的某一天 (1 ~ 31)。                  |
| setMonth()           | 设置 Date 对象中月份 (0 ~ 11)。                        |
| setFullYear()        | 设置 Date 对象中的年份（四位数字）。                   |
| setYear()            | 请使用 setFullYear() 方法代替。                        |
| setHours()           | 设置 Date 对象中的小时 (0 ~ 23)。                      |
| setMinutes()         | 设置 Date 对象中的分钟 (0 ~ 59)。                      |
| setSeconds()         | 设置 Date 对象中的秒钟 (0 ~ 59)。                      |
| setMilliseconds()    | 设置 Date 对象中的毫秒 (0 ~ 999)。                     |
| setTime()            | 以毫秒设置 Date 对象。                                 |
| setUTCDate()         | 根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。        |
| setUTCMonth()        | 根据世界时设置 Date 对象中的月份 (0 ~ 11)。            |
| setUTCFullYear()     | 根据世界时设置 Date 对象中的年份（四位数字）。         |
| setUTCHours()        | 根据世界时设置 Date 对象中的小时 (0 ~ 23)。            |
| setUTCMinutes()      | 根据世界时设置 Date 对象中的分钟 (0 ~ 59)。            |
| setUTCSeconds()      | 根据世界时设置 Date 对象中的秒钟 (0 ~ 59)。            |
| setUTCMilliseconds() | 根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。           |
| toSource()           | 返回该对象的源代码。                                   |
| toString()           | 把 Date 对象转换为字符串。                             |
| toTimeString()       | 把 Date 对象的时间部分转换为字符串。                   |
| toDateString()       | 把 Date 对象的日期部分转换为字符串。                   |
| toGMTString()        | 请使用 toUTCString() 方法代替。                        |
| toUTCString()        | 根据世界时，把 Date 对象转换为字符串。                 |
| toLocaleString()     | 根据本地时间格式，把 Date 对象转换为字符串。           |
| toLocaleTimeString() | 根据本地时间格式，把 Date 对象的时间部分转换为字符串。 |
| toLocaleDateString() | 根据本地时间格式，把 Date 对象的日期部分转换为字符串。 |
| UTC()                | 根据世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数。  |
| valueOf()            | 返回 Date 对象的原始值。                               |

## 2.逻辑

### 1.运算符

#### 算术运算符

| 运算符 | 描述         | 例子  | x 运算结果 | y 运算结果 |
| :----- | :----------- | :---- | :--------- | :--------- |
| +      | 加法         | x=y+2 | 7          | 5          |
| -      | 减法         | x=y-2 | 3          | 5          |
| *      | 乘法         | x=y*2 | 10         | 5          |
| /      | 除法         | x=y/2 | 2.5        | 5          |
| %      | 取模（余数） | x=y%2 | 1          | 5          |
| ++     | 自增         | x=++y | 6          | 6          |
| --     | 自减         | x=--y | 4          | 4          |

#### 赋值运算符

赋值运算符用于给 JavaScript 变量赋值。

| 运算符 | 例子 | 等同于 |
| :----- | :--- | :----- |
| =      | x=y  |        |
| +=     | x+=y | x=x+y  |
| -=     | x-=y | x=x-y  |
| *=     | x*=y | x=x*y  |
| /=     | x/=y | x=x/y  |
| %=     | x%=y | x=x%y  |

### 2.比较

#### 比较运算符

比较运算符在逻辑语句中使用，以测定变量或值是否相等。

| 运算符 | 描述                                               |
| :----- | :------------------------------------------------- |
| ==     | 等于                                               |
| x==5   | *true*                                             |
| ===    | 绝对等于（值和类型均相等）                         |
| x===5  | *true*                                             |
| !=     | 不等于                                             |
| !==    | 不绝对等于（值和类型有一个不相等，或两个都不相等） |
| x!==5  | *false*                                            |
| >      | 大于                                               |
| <      | 小于                                               |
| >=     | 大于或等于                                         |
| <=     | 小于或等于                                         |

#### 使用

可以在条件语句中使用比较运算符对值进行比较

```js
f (age < 18){
 console.log("年轻人")
}
```

#### 逻辑运算符

逻辑运算符用于判定变量或值之间的逻辑

| 运算符 | 描述 |
| :----- | :--- |
| &&     | 与   |
| \|\|   | 或   |
| !      | 非   |

#### 三元运算符

条件 ? 成立执行 : 不成立执行

```js
age<18 && name==='Tina' ? '小姐姐' : '老师'
```

### 3.条件判断

条件语句用于基于不同的条件来执行不同的动作

- **if 语句** - 只有当指定条件为 true 时，使用该语句来执行代码
- **if...else 语句** - 当条件为 true 时执行代码，当条件为 false 时执行其他代码
- **if...else if....else 语句**- 使用该语句来选择多个代码块之一来执行

```js
if(name === 'Tina'){
 console.log('Tina开始叨叨了')
}else{
 console.log('不是Tina在叨叨')
}
```

```js
if(name === 'Tina'){
 console.log('Tina开始叨叨了')
}else if(name === 'Ace'){
    console.log('Ace开始叨叨了')
}else{
 console.log('有人在叨叨，但是我不知道是谁')
}
```

### 4.switch语句

switch 语句根据条件选择多个需被执行的代码块之一

- 计算一次 switch 表达式
- 把表达式的值与每个 case 的值进行对比
- 如果存在匹配，则执行关联代码

```js
switch(表达式) {
     case n:
        代码块
        break;
     case n:
        代码块
        break;
     default:
        默认代码块
} 
```

```js
switch(name) {
     case 'Tina':
        console.log('Tina开始叨叨了')
        break;
     case 'Ace':
        console.log('Ace开始叨叨了')
        break;
     default:
        console.log('有人在叨叨，但是我不知道是谁')
}
```

#### break 关键词

遇到 break 关键词，会跳出 switch 代码块，停止后续的代码执行

break 能够节省大量执行时间，因为它会“忽略” switch 代码块中的其他代码的执行

#### default 关键词

default 关键词规定不存在 case 匹配时所运行的代码

#### case 条件

case 表示当前对比对象的值，不同的 case 可以使用相同的代码

```js
switch(name) {
     case 'Tina':
     case 'Ace':
        console.log('前端老师开始叨叨了')
        break;
     default:
        console.log('有人在叨叨，但是我不知道是谁')
}
```

Switch case 使用严格比较（===）。

值必须与要匹配的类型相同。

只有操作数属于同一类型时，严格比较才能为 true

### 5.While 循环

#### While 循环

**只要条件为 true，循环能够一直执行代码块**

```js
while (i < 10) {
    console.log(i)
    i++;
}
```

#### Do/While 循环

do/while 循环是 while 循环的变体。在检查条件是否为真之前，这种循环会执行一次代码块，然后只要条件为真就会重复循环。

```js
do{
    console.log(i)
    i++;
}while (i<5);
```

## 3.Math 对象

​ Math 对象方法

| 方法         | 描述                                                         |
| :----------- | :----------------------------------------------------------- |
| abs(x)       | 返回数的绝对值。                                             |
| acos(x)      | 返回数的反余弦值。                                           |
| asin(x)      | 返回数的反正弦值。                                           |
| atan(x)      | 以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。     |
| atan2(y,x)   | 返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。 |
| **ceil(x)**  | 对数进行上舍入。                                             |
| cos(x)       | 返回数的余弦。                                               |
| exp(x)       | 返回 e 的指数。                                              |
| **floor(x)** | 对数进行下舍入。                                             |
| log(x)       | 返回数的自然对数（底为e）。                                  |
| **max(x,y)** | 返回 x 和 y 中的最高值。                                     |
| **min(x,y)** | 返回 x 和 y 中的最低值。                                     |
| pow(x,y)     | 返回 x 的 y 次幂。                                           |
| **random()** | 返回 0 ~ 1 之间的随机数。                                    |
| **round(x)** | 把数四舍五入为最接近的整数。                                 |
| sin(x)       | 返回数的正弦。                                               |
| sqrt(x)      | 返回数的平方根。                                             |
| tan(x)       | 返回角的正切。                                               |
| toSource()   | 返回该对象的源代码。                                         |
| valueOf()    | 返回 Math 对象的原始值。                                     |
