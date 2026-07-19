---
title: 番外1：JavaScript 内部属性（[[ ]]）简述
date: 2026-07-19 20:00:00 +0800
categories: [JavaScript高级程序设计, 番外]
tags: [JS, 基础]
pin: false
author: Tonite14

toc: true
comments: true
typora-root-url: ../../tonite14.github.io
math: false
mermaid: true
---

阅读 ECMAScript 规范或红宝书时，形如 `[[Prototype]]`、`[[Call]]`、`[[ThisValue]]` 的记号频繁出现。这些以双方括号包裹的标识符是规范层面的**内部属性（Internal Slots / Internal Methods）**——它们不在 JavaScript 代码中直接暴露、不可通过属性访问语法读取，但定义了语言运行时的底层行为。本文对前端开发中最常遇到的几类内部属性进行归类说明。

---

## 分类一：对象结构与原型

### `[[Prototype]]`

最基本的内部属性之一，指向对象的原型，即构成原型链的链接点。

```js
const obj = {};
// obj.[[Prototype]] → Object.prototype → null
```

JavaScript 提供了若干 API 来间接操作这一内部属性：`Object.getPrototypeOf()` 读取，`Object.setPrototypeOf()` 修改，`Object.create()` 在创建时指定。浏览器环境曾经暴露的非标准访问器 `__proto__` 现已被纳入附录规范，但生产代码中应优先使用 `Object.getPrototypeOf`。

`[[Prototype]]` 在属性查找流程中扮演关键角色：当引擎在对象自身上找不到目标属性时，沿 `[[Prototype]]` 链逐级向上搜索，直到找到属性或抵达 `null`（原型链末端）。

### `[[Extensible]]`

布尔值，指示对象是否允许添加新属性。`Object.preventExtensions(obj)` 将其置为 `false`——此后对 `obj` 添加新属性静默失败（严格模式下抛出 TypeError）。注意这一操作不可逆：没有对应的"恢复可扩展"API。

`Object.seal()` 和 `Object.freeze()` 也会将 `[[Extensible]]` 置为 `false`，同时附加修改属性描述符中的 `[[Configurable]]`（seal）和 `[[Writable]]`（freeze）。

---

## 分类二：属性描述符（Property Descriptor）

对象的每个自有属性都拥有关联的描述符，其中包含若干内部属性。描述符分为数据描述符和存取描述符两种。

### 数据描述符

| 内部属性 | 含义 |
|---|---|
| `[[Value]]` | 属性的当前值 |
| `[[Writable]]` | 是否可修改 `[[Value]]` |
| `[[Enumerable]]` | 是否出现在 `for-in` 和 `Object.keys()` 中 |
| `[[Configurable]]` | 是否可删除属性、是否可修改描述符（除 `[[Value]]` 和 `[[Writable]]` 外） |

```js
const obj = {};
Object.defineProperty(obj, 'x', {
  value: 1,
  writable: false,      // obj.x 不可修改
  enumerable: true,     // 出现在遍历中
  configurable: false   // 不可删除，描述符不可再改
});
```

`Object.freeze()` 等价于将所有属性的 `[[Writable]]` 和 `[[Configurable]]` 全部置为 `false`，并将 `[[Extensible]]` 置为 `false`——即不可添加、不可删除、不可修改值。

### 存取描述符

| 内部属性 | 含义 |
|---|---|
| `[[Get]]` | getter 函数，读取属性时调用 |
| `[[Set]]` | setter 函数，写入属性时调用 |
| `[[Enumerable]]` | 同上 |
| `[[Configurable]]` | 同上 |

存取描述符的 `[[Get]]` 和 `[[Set]]` 是属性级别的——与下文对象级别的 `[[Get]]` 内部方法不同。属性级别的存取描述符定义的是单个属性的 getter/setter 行为；对象级别的 `[[Get]]` 是引擎在任意属性访问时调用的统一入口。

---

## 分类三：对象内部方法

ECMAScript 规范为所有对象定义了一组内部方法（Internal Methods），它们是引擎执行操作时的统一入口。

### `[[Get]](P, Receiver)` 和 `[[Set]](P, Value, Receiver)`

`[[Get]]` 是属性读取的底层机制。每当执行 `obj.key` 或 `obj[key]`，引擎调用 `obj.[[Get]]('key', obj)`。`[[Get]]` 先在自身属性中搜索，找不到则沿 `[[Prototype]]` 链向上递归。

`[[Set]]` 同理：`obj.key = value` 触发 `obj.[[Set]]('key', value, obj)`。若属性自身不存在，`[[Set]]` 可能在原型链上找到一个 setter 并调用它，也可能直接在自身创建新属性。

这两个内部方法对理解 Proxy 至关重要——Proxy 的 `get` 和 `set` 陷阱，本质上就是拦截对应的 `[[Get]]` 和 `[[Set]]` 调用：

```js
const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    // 拦截 obj.[[Get]](key, receiver)
    return Reflect.get(target, key, receiver);
  }
});
```

> 关于 receiver 参数在 `[[Get]]` 内部的传递机制（为何缺失会导致 getter 中 this 指向错误），参见本系列《阅读DAY19 JavaScript高级程序设计 9章 代理与反射》。

### `[[Call]](thisArgument, argumentsList)` 和 `[[Construct]](argumentsList, newTarget)`

这两个内部方法区分了"调用函数"和"构造实例"两种行为。

只有实现了 `[[Call]]` 的对象才是可调用的（callable），即 `typeof obj === 'function'`。所有函数对象（包括箭头函数、生成器、async 函数）都实现了 `[[Call]]`。

而 `[[Construct]]` 是可选实现的——实现了 `[[Construct]]` 的函数才能被 `new` 调用。箭头函数和方法简写没有 `[[Construct]]`，因此无法作为构造函数使用：

```js
const arrow = () => {};
new arrow();  // TypeError: arrow is not a constructor

const obj = { method() {} };
new obj.method();  // TypeError: obj.method is not a constructor
```

> `[[Call]]` 与 `[[Construct]]` 内部抛出的逻辑不同：`[[Call]]` 负责创建执行上下文、绑定 `this`、执行函数体；`[[Construct]]` 额外执行创建新对象（`[[Prototype]]` 指向 `constructor.prototype`）、将该对象作为 `this` 绑定、以及根据函数体返回值的类型决定最终返回新对象还是返回函数体返回值。

---

## 分类四：执行上下文相关

### `[[ThisValue]]`

每一个执行上下文（Execution Context）都有一个 `[[ThisValue]]` 内部属性，存储当前上下文中 `this` 关键字的绑定值。其赋值时机和方式由调用模式决定：

- 全局执行上下文：`[[ThisValue]]` 为全局对象（浏览器中为 `window`，严格模式下为 `undefined`）
- 函数调用（`fn()`）：严格模式下 `[[ThisValue]]` 为 `undefined`，非严格模式下为全局对象
- 方法调用（`obj.fn()`）：`[[ThisValue]]` 为 `.` 之前的对象（`obj`）
- 构造函数调用（`new Fn()`）：`[[ThisValue]]` 为新创建的实例对象
- 显式绑定（`fn.call(ctx)` / `fn.apply(ctx)` / `fn.bind(ctx)()`）：`[[ThisValue]]` 为传入的第一个参数

箭头函数不拥有独立的 `[[ThisValue]]`——引擎在创建箭头函数的执行上下文时跳过此步骤，`this` 沿词法作用域向上查找外层执行上下文的 `[[ThisValue]]`。这是箭头函数与普通函数在运行时行为上最根本的差异。

### `[[Environment]]` 和 `[[Scopes]]`

这两个内部属性描述的是函数的闭包能力。

`[[Environment]]`：存储函数定义时所在的词法环境（Lexical Environment）的引用。当函数被调用时，引擎使用这一引用构建新的执行上下文的作用域链。这是闭包的形成机制——内部函数通过 `[[Environment]]` 持有外部函数的变量环境引用，即使外部函数已经执行完毕。

```js
function outer() {
  let x = 1;
  return function inner() {
    return x;  // inner.[[Environment]] → outer 的词法环境
  };
}
const fn = outer();
fn();  // 1 —— x 通过 [[Environment]] → 词法环境 → 环境记录访问
```

`[[Scopes]]`：Chrome DevTools 中展示的作用域链数组，等价于 `[[Environment]]` 链的展开形式。调试时在 Sources 面板中看到的 Scope 面板（Local / Closure / Script / Global）即为此内部属性的可视化。

---

## 分类五：特殊对象标记

### `[[Class]]`

ES5 中使用 `Object.prototype.toString.call(value)` 获取的内部类型标记，返回 `"[object Array]"`、`"[object Date]"` 等字符串。ES6 中引入了 `Symbol.toStringTag`，允许开发者自定义这一返回值，`[[Class]]` 作为内部标记仅保留于规范层面。

### `[[ErrorData]]`

`Error` 实例的内部槽。当调用 `new Error('message')` 时，字符串实参被存放于 `[[ErrorData]]` 中（而非普通对象属性）。这也是为什么直接 `console.log(error)` 时能看到错误信息，但 `error.ErrorData` 为 `undefined`——它根本不是 JavaScript 可访问的属性。

类似的特殊槽包括 `[[DateValue]]`（Date 实例的时间戳）、`[[RegExpMatcher]]`（正则对象的匹配逻辑）、`[[MapData]]` / `[[SetData]]`（Map/Set 的底层存储）等。

---

## 总结

方括号记号并非语法糖，而是 ECMAScript 规范与引擎实现之间的"接口约定"。归纳其分类有助于理解规范文本和浏览器行为：

| 类别 | 示例 | 核心作用 |
|---|---|---|
| 对象结构 | `[[Prototype]]`、`[[Extensible]]` | 定义对象之间的关系和可变性约束 |
| 属性描述符 | `[[Value]]`、`[[Writable]]`、`[[Get]]`、`[[Set]]` | 逐属性控制读写行为 |
| 对象内部方法 | `[[Get]]`、`[[Set]]`、`[[Call]]`、`[[Construct]]` | 引擎层面的统一操作入口 |
| 执行上下文 | `[[ThisValue]]`、`[[Environment]]` | 函数调用和闭包的基础设施 |
| 特殊标记 | `[[Class]]`、`[[ErrorData]]`、`[[DateValue]]` | 内建类型的底层存储 |

理解这些内部属性的意义并非记忆规范条文，而在于为解释语言行为提供准确的概念锚点：为什么箭头函数不能 `new`（缺少 `[[Construct]]`）、闭包为什么不会释放外层变量（`[[Environment]]` 持有引用）、Proxy 的 `receiver` 参数为什么重要（`[[Get]]` 内部方法需要 receiver 修正 this）。每一个看似表面的语言行为，其根因均分布在这些内部属性的协作之中。

