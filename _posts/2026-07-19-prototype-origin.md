---
title: 番外 原型链的设计由来
date: 2026-07-19 20:55:00 +0800
categories: [JavaScript高级程序设计, 番外]
tags: [JS, 原型链, 继承, 面向对象]
pin: false
author: Tonite14

toc: true
comments: true
typora-root-url: ../../tonite14.github.io
math: false
mermaid: true
---

大多数人学原型链停在"怎么用"，但真正值得追问的问题是：**JavaScript 为什么要有原型链？1995 年的网景在面对什么约束？原型模式到底解决了类继承解决不了的什么问题？**

本文不讨论原型链的 API 细节（`Object.create`、`__proto__`、`prototype` 的指向关系），而是回溯到 1995 年，从设计动机出发，梳理原型模式的设计由来。

---

## 1995 年的网景：三个硬约束

1995 年，Brendan Eich 受雇于网景，要给 Navigator 浏览器写一款脚本语言。当时的约束条件非常具体：

1. **语法要像 Java**（市场部明确要求），但**不是** Java。不需要编译、不需要声明类型、不需要虚拟机。
2. **10 天内交出原型**。没有时间设计庞大的类型系统。
3. **目标用户不是专业程序员**，是网页设计师。他们要的是"表单没填完不许提交"，不是"设计一套类继承体系"。

这三个约束叠加到一起，直接堵死了 Java/C++ 那条**类继承**路线。

> 类继承的前提是"先有模板，再创建实例"。一切行为在编译期用类定义描述好，运行时照模板创建对象。这套机制有两个致命问题：第一，设计成本太高，10 天不可能定义出完备的类库；第二，对网页设计师太抽象——他们不想先"设计一个表单类"再"实例化它"，他们只想当场写几个判断逻辑。

JavaScript 因此不能走类继承路线。但完全放弃继承同样不可行：代码复用是刚需。同一个页面上三个按钮，不能要求设计师写三遍一模一样的 `onclick` 逻辑。

---

## 原型模式的核心洞察

Eich 的解法是借鉴 Self 语言的原型模式。它的核心思想可以用一句话概括：

> **不需要"先定义模板再创建实例"。直接创建一个已有某些行为的对象，新对象链接到它身上，自己没有的属性就去它身上找。**

```js
// 原型的思路：现成的对象 → 链上去 → 自动共享
const parent = { greet: function() { return 'hello'; } };
const child = Object.create(parent);  // child.__proto__ = parent
console.log(child.greet());           // 'hello'，child 没有 greet，沿链向上查找 parent
```

对比类的思路：

```
先定义类 → 类描述了"这类东西长什么样" → 调用 new 照模板创建实例
   ↓
继承：子类 → 父类，一层层往上找（编译期静态绑定的关系）
```

两者在表面上看都是"往上找"，但心智模型完全不同：

| | 类继承 | 原型委托 |
|---|---|---|
| 设计时机 | 编译期，先定义好所有行为 | 运行时，对象创建后再追加也行 |
| 子对象如何获得能力 | 从父模板**复制**一份 | **不复制**，沿链向上查找 |
| 能力何时生效 | 创建实例时一次性确定 | 随时追加，后代立刻能用到 |
| 修改父类/原型后 | 已创建的实例不受影响 | 所有后代立刻受影响 |

> 原型不是"简化版的类"，而是完全不同的模型：类描述**未来要创建的东西**，原型是一个**已经存在的、可以直接复用的东西**。

---

## 原型具体解决了哪三个问题

### 问题 1：内存开销

把方法挂在构造函数内部，每 `new` 一次就创建一个新函数对象：

```js
function Person(name) {
  this.name = name;
  this.sayName = function() { console.log(this.name); };
  // ☝ 每 new 一次，就创建一个全新的函数对象
}

const a = new Person('A');
const b = new Person('B');
console.log(a.sayName === b.sayName); // false，两份内存
```

挂在原型上，所有实例共享同一份：

```js
function Person(name) {
  this.name = name;  // 只有数据是每个实例私有的
}
Person.prototype.sayName = function() { console.log(this.name); };

const a = new Person('A');
const b = new Person('B');
console.log(a.sayName === b.sayName); // true，一份内存
```

10000 个 `Person` 实例，省了 9999 次函数对象的创建。这在 1995 年的浏览器里不是优化问题，是**能不能跑得动**的问题。当时浏览器内存以 KB 计，每省一个函数对象都是生与死的差别。

### 问题 2：动态性

类继承要求"所有方法在创建实例前就定义好"。原型模式没有这个限制：

```js
const a = new Person('A');

a.sayHello(); // ❌ 还不存在

// 运行时给原型追加方法，已有的实例立刻拥有
Person.prototype.sayHello = function() { console.log('Hello ' + this.name); };
a.sayHello(); // ✅ Hello A
```

这在 90 年代的浏览器环境里是刚需。浏览器 API 的演化速度远超任何标准：`Array.prototype.forEach` 直到 ES5 才正式出现，但各浏览器早已自行实现。原型模型允许**任何时候给已有对象追加行为**，不需要修改构造函数，也不需要重新创建已有实例。

> 类继承的相同需求需要走 Monkey Patching（修改类定义自身），而原型模型只需要在运行时往原型上追加一个属性。这本身就是原型的正常用法，不构成 Patch。

### 问题 3：委托，不是复制

原型链的本质是一个**运行时的、动态的委托链**。属性查找的每一步都是"我自己有没有？没有就顺着链往上找"。这种模型的语义非常直接：

```js
obj.prop  // 引擎做的事：
//   1. obj 自己有没有 prop？
//   2. 没有 → obj.__proto__ 有没有？
//   3. 没有 → obj.__proto__.__proto__ 有没有？
//   4. ……
//   5. 找到 null 为止 → 返回 undefined
```

类继承在底层通过复制定义来实现（子类拥有一份父类方法的副本，部分实现会做共享优化），而原型委托从来不需要复制。查询本身即是链式查找。

---

## 原型链是怎么"长出来"的

> 一个关键认知：原型链不是设计出来的，是**倒推出来的**。Eich 先定下了对象的委托规则，然后发现"所有对象沿链回溯应当有一个共同祖先"。沿规则自然延伸，整条链就出现了。

时间线还原：

### 阶段 1：只有对象，没有构造函数

最早 JS 里没有 `new`，对象纯粹就是键值对：

```js
const obj = { a: 1, b: 2 };
```

此时没有原型链的概念。每个对象都是一个孤立的哈希表。

### 阶段 2：构造函数出现

为了批量创建相似结构的对象，引入了构造函数。但 `new` 操作符需要一个机制来确定新对象的 `__proto__` 应该指向谁。于是规定了：

> `new F()` 创建的对象，其 `__proto__` = `F.prototype`

注意 `F.prototype` 是一个**普通的、已存在的对象**，不是类定义。`new` 只是把它挂到了新对象的 `__proto__` 上。

```js
function Person() {}
const p = new Person();
Object.getPrototypeOf(p) === Person.prototype; // true
```

### 阶段 3：函数也是对象

函数也是对象，所以 `Person` 本身也有 `__proto__`。它是谁的实例？`Function` 的：

```js
Person.__proto__ === Function.prototype; // true
Function.__proto__ === Function.prototype; // true，自指悖论
```

`Function.prototype` 的 `__proto__` 指向 `Object.prototype`，于是所有函数的原型链最终都通到 `Object.prototype`。

### 阶段 4：终点站

`Object.prototype` 的 `__proto__` 是 `null`。整条链在这里终结。

```js
Object.getPrototypeOf(Object.prototype) === null; // true
```

把整条链画出来就是这个经典图：

```
          null
           ↑
     Object.prototype
      ↑            ↑
Function.prototype   Person.prototype
      ↑                  ↑
   Function────────—→  new Person()
    (所有函数)
```

> 此图的每一个箭头都不是刻意设计的，而是"函数是对象 → 函数有原型 → 对象的根是 Object.prototype"三条简单规则自然推导出的结果。

---

## 和今天面试常考问题的连接

### `instanceof` 的本质

```js
function myInstanceof(obj, Constructor) {
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === Constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```

就是在原型链上逐级上溯，判断 `Constructor.prototype` 是否出现在链上。

### ES6 `class` 是语法糖

```js
class Person {
  constructor(name) { this.name = name; }
  sayName() { console.log(this.name); }
}

// 等同于
function Person(name) { this.name = name; }
Person.prototype.sayName = function() { console.log(this.name); };
```

`class` 关键字没有改变原型机制，只是将构造函数的写法包装为更可读的语法。JavaScript 没有真正的类，只有用 `class` 语法书写的原型链。

---

## 总结

原型链不是"JavaScript 实现了一种叫原型链的特性"，而是"1995 年的网景在 10 天内，为网页设计师设计了一种用已有对象共享行为的机制，然后这个机制的规则自然延伸出了一条查找链"。

它不是刻意设计的，而是**自然生长的**。理解了这一点，`__proto__` 和 `prototype` 的指向关系无需死记。它们都是"函数是对象、对象可以链到另一个对象、链的终点是 null"这三条规则下的必然结果。
