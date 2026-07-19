---
title: 番外 this解析
date: 2026-05-08 20:00:00 +0800
categories: [JavaScript高级程序设计, 番外]
tags: [JS, this, 闭包]
pin: false
author: Tonite14

toc: true
comments: true
typora-root-url: ../../tonite14.github.io
math: false
mermaid: true
---

## this 是什么

`this` 是执行上下文中的一个独立槽位，存放一个对象引用。不在活动对象里，不参与作用域链查找。

```
执行上下文
  ├── 活动对象（变量、arguments）  ← 作用域链能找到
  ├── 作用域链                    ← 查变量的路径
  └── this 绑定                   ← 独立槽位，作用域链找不到
```

`this` 不是编写时确定的，而是**调用时**由调用方式决定。

一句话而言，`this`处于函数的执行上下文里面，指向调用函数的对象。

> this只能存在于一个函数里面，因为每个函数被调用时，JS 引擎都会创建一个执行上下文（Execution Context），里面有一块固定内存叫this，无非会不会用到this。而this存放的是指针，指针指向调用这个函数的对象。

## 绑定规则（4 条）

### 规则 1：默认绑定

独立函数调用，没有所属对象：

```js
function foo() { console.log(this); }
foo(); // window（严格模式下 undefined）
```

### 规则 2：隐式绑定

通过对象属性调用，`this` 指向调用者：

```js
let obj = {
  name: 'A',
  foo() { console.log(this.name); }
};
obj.foo(); // 'A'——obj. 调用，this → obj
```

**隐式丢失**——引用赋值后调用，退回默认绑定：

```js
let fn = obj.foo; // 只拿了函数，没拿对象
fn(); // window——fn() 独立调用，不是 obj.foo()
```

回调也是隐式丢失：

```js
function doFn(cb) { cb(); }
doFn(obj.foo); // window——cb() 独立调用
```

### 规则 3：显式绑定

`call` / `apply` / `bind` 手动指定 `this`：

```js
function foo() { console.log(this.name); }
let obj = { name: 'A' };

foo.call(obj);  // 'A'
foo.apply(obj); // 'A'

let bound = foo.bind(obj);
bound();        // 'A'——bind 返回新函数，this 永远绑死
```

硬绑定解决隐式丢失：

```js
function doFn(cb) { cb(); }
let bound = foo.bind(obj);
doFn(bound); // 'A'——bind 后 this 不会被调用方式改变
```

> `call`、`apply`、`bind` 不是语言关键字（不像 `new` 是运算符），它们是 `Function.prototype` 上的方法，所有函数通过原型链继承它们。`foo.call(obj)` 本质是函数调用函数。
>
> `call` 是一个**元函数（meta-function）**，它的职责不是做业务逻辑，而是控制另一个函数怎么执行、把 `this` 填入 `[[ThisValue]]` 槽位。`apply` 同理（参数传数组），`bind` 不立即执行，返回一个 `this` 焊死的新函数。

### 规则 4：new 绑定

`new` 调用创建新对象，`this` 指向新实例：

```js
function Foo(name) {
  this.name = name;
}
let f = new Foo('A'); // this → 新实例 f
console.log(f.name);  // 'A'

// new 的等价写法：
let f = {};                     // 1. 创建空对象
f.__proto__ = Foo.prototype;    // 2. 挂原型链
Foo.call(f, 'A');               // 3. 通过 call 将 f 填入 Foo 的 [[ThisValue]] 槽位，执行 Foo
                                //    函数体内 this.name → 查 [[ThisValue]] → f → f.name = 'A'
```

此时`new`作为语法糖，做了四件事：

1. 创建一个空对象
2. 把这个空对象的`__proto__`指向`Foo.prototype`
3. 让 `this` 指向空对象，然后通过 `Foo.call(空对象, 参数)` 执行 `Foo`
4. 返回这个对象

> `call` 的本质是在创建 Foo 执行上下文时，把传进来的参数填入 `[[ThisValue]]` 槽位，覆盖默认绑定规则。整个流水线可以拆为三层：
>
> **创建上下文**：执行 `Foo.call(f, 'A')`，引擎为 Foo 创建执行上下文，`[[ThisValue]]` 不按默认规则填，而是填入 `call` 传进来的 `f` 的引用。
>
> **执行函数体**：执行到 `this.name = name` 时，引擎先查当前执行上下文的 `[[ThisValue]]` 槽位拿到 `f` 的引用，再在 `f` 上创建/覆盖 `name` 属性。`this` 不是 `f`，`this` 是指向 `f` 的指针——但这一步对开发者透明，`this.name = 'A'` 等价于 `f.name = 'A'`。
>
> **返回结果**：`new` 自动返回这个对象，

## 绑定优先级

```
new > call/apply/bind > 隐式绑定 > 默认绑定
```

验证：

```js
function Foo(name) { this.name = name; }
let obj = { name: 'obj' };

// 隐式 > 默认
obj.foo(); // this → obj，不是 window

// 显式 > 隐式
let obj2 = { name: 'obj2', foo };
obj2.foo.call(obj); // this → obj，不是 obj2

// new > 显式
let BoundFoo = foo.bind(obj);
let f2 = new BoundFoo('new'); // this → f2（新实例），不是 obj
// new 优先级更高，bind 被覆盖
```

## 箭头函数的 this

箭头函数没有自己的 `this` 槽位，也没有 `arguments`。它的 `this` 在**定义时**从外层继承，和调用方式无关：

```js
let obj = {
  name: 'A',
  foo() {
    let arrow = () => this.name; // 定义时继承 foo 的 this
    return arrow;
  }
};

obj.foo()();        // 'A'
let fn = obj.foo();
fn();               // 'A'——直接调用也行，this 不变
fn.call({ name:'B' }); // 'A'——call 也改不了
```

本质：箭头函数的 `this` 是词法作用域的一部分，跟普通变量一样从 `[[Scope]]` 继承，不参与运行时绑定。

> 关于箭头函数四项限制（无 this/arguments/prototype/不能 new）及其根因——没有自己的执行上下文，见红宝书笔记：[2026-05-06-read13.md](2026-05-06-read13)，箭头函数限制小节。

|  | 普通函数 | 箭头函数 |
|--|---------|---------|
| this 决定时机 | 调用时 | 定义时 |
| call/apply/bind | 能改 | 改不了 |
| 有自己的 arguments | ✅ | ❌ |
| 能当构造函数 | ✅ | ❌ |

## 设计原理

**为什么 this 不用词法作用域？**

如果 `this` 跟变量一样由定义位置决定，方法复用就不可能了：

```js
// 假设 this 是词法作用域（定义时决定）
function sayName() {
  console.log(this.name); // 如果 this 在定义时就绑死了，就永远是同一个值
}

let obj1 = { name: 'A', sayName };
let obj2 = { name: 'B', sayName };

obj1.sayName(); // 如果是词法的，两个都输出一样的
obj2.sayName(); // 但我们需要它们分别输出 A 和 B
```

`this` 的设计目的就是让**同一个函数能在不同对象上复用**，所以必须是运行时绑定——调用时才知道"我是谁的方法"。

## 常见陷阱

### 1. 回调中丢失 this

```js
let obj = {
  name: 'A',
  foo() { console.log(this.name); }
};

setTimeout(obj.foo, 100); // undefined——回调时独立调用
// 等价于
let fn = obj.foo; // fn就是一个普通函数，跟obj没关系了
setTimeout(fn, 100); // 是setTimeout调用的fn，不是obj调用的
// 相当于 fn()，没有调用者，this不是obj

// 修复：箭头函数
setTimeout(() => obj.foo(), 100); // 'A'
// 修复：bind
setTimeout(obj.foo.bind(obj), 100); // 'A'
```

### 2. 内部函数 this 丢失

```js
let obj = {
  name: 'A',
  foo() {
    function inner() { console.log(this.name); }
    inner(); // undefined——inner 独立调用，this → window
  }
};
// 修复：箭头函数
foo() {
  let inner = () => console.log(this.name);
  inner(); // 'A'
}
// 修复：that = this
foo() {
  let that = this;
  function inner() { console.log(that.name); }
  inner(); // 'A'
}
```

### 3. 赋值表达式剥离 this

```js
(object.getIdentity = object.getIdentity)(); // window
// 赋值表达式的值是函数本身，脱离了对象绑定
```

### 4. 原型方法中的 this

```js
function Foo(name) { this.name = name; }
Foo.prototype.sayName = function() { console.log(this.name); };

let f = new Foo('A');
f.sayName(); // 'A'——this 指向实例 f，不是原型
```

## 实战模式

### 模式 1：对象方法

```js
let counter = {
  count: 0,
  increment() { this.count++; } // this → counter
};
```

### 模式 2：构造函数 / class

```js
class Foo {
  constructor(name) { this.name = name; } // this → 新实例
}
```

### 模式 3：事件处理

```js
class Button {
  constructor() {
    this.count = 0;
    // 箭头函数确保 this 指向实例而非 DOM 元素
    document.querySelector('button').addEventListener('click', () => {
      this.count++;
    });
  }
}
```

### 模式 4：链式调用

```js
class Builder {
  setName(name) { this.name = name; return this; }
  setAge(age) { this.age = age; return this; }
}
new Builder().setName('A').setAge(20); // return this 实现链式
```

### 模式 5：借用方法

```js
function foo() {
  // arguments 是类数组，没有数组方法
  // 借用数组的 slice 转成真数组
  let args = Array.prototype.slice.call(arguments);
}
```

## 总结

```
this 的值由调用方式决定
│
├── new fn()          → 新实例
├── fn.call/apply(x)  → x
├── fn.bind(x)()      → x（new 优先级更高时除外）
├── obj.fn()          → obj
└── fn()              → window / undefined
│
└── 箭头函数：以上全部不适用，this 在定义时继承外层
```
