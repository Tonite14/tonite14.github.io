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

> 一个关键认知：原型链不是设计出来的，是**倒推出来的**。Eich 在设计之初同时落地了三个机制，然后发现这三条规则自然延伸出了一整条链。

此处有一个容易被误解的因果顺序：并非先有了 `[[Prototype]]` 委托链，再为了实现"批量创建对象"而引入 `new` 操作符；也并非先有了构造函数，然后为了给 `__proto__` 找个指向而发明了 `prototype`。真实情况是，三者是同一个设计方案的三个侧面。Eich 要解决的核心问题是"用最小的语法成本实现代码复用"。`[[Prototype]]` 提供委托机制，`function` 提供批量创建的模板，`.prototype` 为模板和实例之间提供挂钩点，`new` 把它们串起来。四个东西不是先后出现的四件独立工具，而是一套锁扣——拆开任何一件，其余三件都失去意义。

因此，以下内容并非历史版本迭代的记录，而是从三条核心规则出发，推导整条链是如何由规则本身自动生成的。

### 规则 1：对象可以通过 `[[Prototype]]` 委托给另一个对象

这是原型模式的最小内核。一个对象在查找不到属性时，沿 `[[Prototype]]` 指向链上溯。这个内部槽位即为后来暴露的 `__proto__`。

### 规则 2：`function F() {}` 自动生成 `F.prototype`

每定义一个函数（箭头函数除外），引擎自动创建一个全新的普通对象，作为该函数的 `prototype` 属性值，并在其上写入 `constructor` 属性，指向函数自身：

```js
function Person() {}
// 引擎自动执行了等价操作：
// Person.prototype = new Object();
// Person.prototype.constructor = Person;
```

`F.prototype` 不是一个神秘对象——它就是引擎替你 `new Object()` 出来的，上面只有一条 `constructor` 指针。你可以随时删掉它或替换为其他对象：

```js
Person.prototype = { greet() { return 'hello'; } };
// 完全合法，但原先的 constructor 丢失了
```

### 规则 3：`new F()` 将新对象的 `[[Prototype]]` 指向 `F.prototype`

这是 `new` 操作符的核心动作。它不复制任何属性，只是将新对象的委托链挂钩到 `F.prototype` 上：

```js
const p = new Person();
Object.getPrototypeOf(p) === Person.prototype; // true
```

三条规则至此闭环：定义函数 → 自动获得 `prototype` → `new` 把实例链过去 → 实例自动共享原型上的方法。

### 自然延伸：函数链的向上追溯

以上三条规则只解释了"实例 → 原型"这一跳。但函数也是对象，所以函数自身也有 `[[Prototype]]`。此时需要区分两个极易混淆的方向。

#### `F.__proto__` 与 `F.prototype`：两条独立的链

初学者常将二者当作同一件事，但它们服务的是两个完全不同的查找方向：

| | `F.__proto__` | `F.prototype` |
|---|---|---|
| 它是谁 | 函数对象 F 自身的 `[[Prototype]]` | F 作为构造函数时，给实例准备的委托目标 |
| 谁在用 | F 自身。`F.call()`、`F.apply()` 等函数通用方法从此来 | `new F()` 创建的实例。实例的共享方法从此来 |
| 谁创建的 | 引擎初始化时，创建 `Function` 函数时自动生成 | `function F() {}` 执行那一刻新建 |
| 指向 | `Function.prototype` | 一个全新的 `{}`（普通对象，引擎顺手写入了 `constructor: F`） |

用代码验证：

```js
function Person(name) { this.name = name; }
Person.prototype.sayName = function() { console.log(this.name); };

// 方向 1：Person 自身作为对象，怎么找到 call、toString 这些方法？
Person.call;        // Person.__proto__ → Function.prototype
Person.toString;    // Person.__proto__.__proto__ → Object.prototype

// 方向 2：new Person() 的实例 p，怎么找到 sayName？
const p = new Person('X');
p.sayName();        // p.__proto__ → Person.prototype
p.toString();       // p.__proto__.__proto__ → Object.prototype
```

两条链的终点都在 `Object.prototype`，但路径完全不同。`F.__proto__` 服务于"函数对象自身的属性查找"，`F.prototype` 服务于"构造出的实例的属性查找"。两者没有谁从谁来的关系。

#### `Function.prototype` 的创建时机

`Function.prototype` 并非常规意义上的"函数的 prototype"。它是引擎启动时最先创建的内置对象之一，创建顺序如下：

```
引擎启动
  → 创建 Object 函数 → 自动生成 Object.prototype
  → 创建 Function 函数 → 自动生成 Function.prototype
  → Function.__proto__ = Function.prototype   // 自指
  → Function.prototype.__proto__ = Object.prototype

用户写 function F() {}
  → 创建 F 函数 → 自动生成 F.prototype（全新的 { constructor: F }）
  → F.__proto__ = Function.prototype          // 指向已存在的内置对象
  → F.prototype.__proto__ = Object.prototype
```

`Function.prototype` 和 `F.prototype` 的结构完全相同：都是普通对象，上面挂了一条 `constructor` 指针。唯一的区别在于创建时机：前者生活在引擎初始化阶段，后者生活在用户代码执行阶段。

`Function.__proto__ === Function.prototype` 之所以看起来像悖论，仅因为 `Function` 恰好指向了自身被创建时自动生成的 `prototype`。换成任何其他函数，你不会觉得有问题：

```js
Person.__proto__ === Function.prototype; // true —— 不会觉得怪
Function.__proto__ === Function.prototype; // true —— 同样的事，发生在自身，就觉得矛盾
```

本质上，`Function` 和 `Person` 遵循同一套规则。只是 `Function` 恰好处在"既是规则的执行者，又是规则的被施加对象"这个位置上。

沿此方向继续上溯：

```js
Person.__proto__ === Function.prototype;             // true
Function.__proto__ === Function.prototype;           // true，自指悖论
Function.prototype.__proto__ === Object.prototype;   // true
Object.getPrototypeOf(Object.prototype) === null;    // true
```

`Function.prototype` 的 `[[Prototype]]` 指向 `Object.prototype`，于是所有函数的原型链最终通过 `Object.prototype`，止于 `null`。

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
