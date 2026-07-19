---
title: 番外2：JavaScript 中的类型判断方法
date: 2026-07-19 20:10:00 +0800
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

JavaScript 提供了多种判断值类型的机制，各自适用于不同的场景。本文梳理 `typeof`、`instanceof`、`Object.prototype.toString.call()`、`Array.isArray()`、`constructor` 和 `isPrototypeOf()` 六种方式的适用边界与取舍逻辑。

---

## typeof：原始类型检查的基本工具

`typeof` 是类型判断中最常用的操作符。它对原始类型的返回值基本可靠：

```js
typeof 42;          // "number"
typeof "hello";     // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof Symbol();    // "symbol"
typeof 1n;          // "bigint"
typeof function(){};// "function"
```

然而 `typeof` 对于对象类型存在已知局限：数组、对象字面量、正则表达式、`null` 均返回 `"object"`。

```js
typeof {};          // "object"
typeof [];          // "object"  —— 数组无法被 typeof 识别
typeof /regex/;     // "object"
typeof null;        // "object"  —— 规范层面的历史缺陷
```

`typeof null === "object"` 源自 JavaScript 初始版本中值的内部类型标签（Type Tag）设计：对象的类型标签为 `000`，而 `null` 被表示为全零指针，其类型标签同样为 `000`，因此被误判为对象。该行为已被 ECMAScript 规范固化，无法修正。

`typeof` 对函数返回 `"function"` 是特例——函数在规范层面是对象，但 `typeof` 对可调用对象（实现了 `[[Call]]` 内部方法的对象）单独返回 `"function"`，这一行为是实用性的妥协而非类型系统的严谨反映。

**适用边界**：`typeof` 仅限于判断原始类型（除 `null` 外）和函数。涉及对象类型的细分时，需使用下文所述的其他方案。

---

## instanceof：对象类型的原型链检查

`instanceof` 检测构造函数的 `prototype` 属性是否存在于实例的原型链上。这一机制使其成为面向对象代码中类型判断的核心工具。

```js
class ApiResponse {}
class UserModel {}

const data = new ApiResponse();
data instanceof ApiResponse;  // true
data instanceof Object;       // true —— 原型链末端永远是 Object.prototype
```

`instanceof` 的核心优势在于对继承链的感知：

```js
class Animal {}
class Dog extends Animal {}
const d = new Dog();

d instanceof Dog;     // true
d instanceof Animal;  // true —— 沿原型链向上搜索，识别父类
typeof d;             // "object" —— 毫无区分力
```

这一特性在错误处理中是标准实践：

```js
try { /* ... */ } catch (e) {
  if (e instanceof TypeError)      { /* 类型错误 */ }
  else if (e instanceof RangeError) { /* 范围错误 */ }
}
```

`instanceof` 存在两个已知限制。其一，不适用于原始类型：

```js
42 instanceof Number;    // false —— 42 是原始值，不是 Number 实例
"str" instanceof String; // false
```

其二，跨执行环境（iframe / realm）下，不同窗口拥有各自独立的全局对象及内建构造函数，原型链上的 `Array.prototype` 指针不同：

```js
// iframe 中创建的数组传递至父窗口
iframeArray instanceof Array;  // false —— Array 的引用不同
```

`Array.isArray()` 不存在此问题——它是语言层面的检测，不依赖特定执行环境的构造函数引用。

**适用边界**：对象的类归属判断，尤其是自定义类和继承链场景。原始类型不适用；跨帧场景中内建类型检测应使用专用 API。

---

## Object.prototype.toString.call()：最细粒度的内部类型标签

`Object.prototype.toString()` 返回形如 `"[object Type]"` 的字符串，其中 `Type` 来自规范定义的内部类型标签。将此方法通过 `call` 绑定到任意值上执行，可获取该值的精确内部类型：

```js
Object.prototype.toString.call([]);          // "[object Array]"
Object.prototype.toString.call({});          // "[object Object]"
Object.prototype.toString.call(null);        // "[object Null]"
Object.prototype.toString.call(undefined);   // "[object Undefined]"
Object.prototype.toString.call(new Date());  // "[object Date]"
Object.prototype.toString.call(/regex/);     // "[object RegExp]"
Object.prototype.toString.call(new Map());   // "[object Map]"
Object.prototype.toString.call(new Set());   // "[object Set]"
Object.prototype.toString.call(Promise.resolve()); // "[object Promise]"
```

`typeof` 无法区分的边界情况，此方案全部覆盖。包括 `null`（返回 `"[object Null]"`）在内的一切值均有明确的类型标签。

自定义类可通过 `Symbol.toStringTag` 控制该返回值：

```js
class MyClass {
  get [Symbol.toStringTag]() { return 'MyClass'; }
}
Object.prototype.toString.call(new MyClass());  // "[object MyClass]"
```

必须通过 `call` 借用 `Object.prototype` 上的原始方法，而非直接调用实例的 `toString`。数组、日期等内建类型覆盖了自身的 `toString` 方法，直接调用返回的是格式化字符串而非类型标签：

```js
[1, 2, 3].toString();       // "1,2,3" —— 不是类型标签
(new Date()).toString();    // "Sun Jul 19 2026 ..." —— 同样不是
```

**适用场景**：需要在运行时精确识别值类型的工具函数（如深拷贝、序列化）。Vue 3 源码中的 `toRawType` 工具函数即基于此方案实现：

```js
const toRawType = (value) => Object.prototype.toString.call(value).slice(8, -1);
toRawType([]);  // "Array"
toRawType({});  // "Object"
```

---

## Array.isArray()：数组专用的跨帧安全检测

```js
Array.isArray([]);   // true
Array.isArray({});   // false
Array.isArray(arguments);  // false
```

此方法的存在理由有二。首先，在 `Array.isArray` 被引入 ES5 之前，检测数组典型写法为 `Object.prototype.toString.call(value) === '[object Array]'`——繁琐且依赖字符串比较。`Array.isArray` 将该判断标准化。

其次，更重要的是跨执行环境（跨 iframe）场景中的安全性。不同 frame 拥有各自独立的全局对象和 `Array` 构造函数，在一个 frame 中创建的数组传递至另一个 frame 后，其原型链上的 `Array.prototype` 来自原始 frame，`instanceof` 在当前 frame 中的 `Array` 构造函数上查不到对应原型：

```js
// 父窗口
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);

const iframeArray = iframe.contentWindow.Array(1, 2, 3);
iframeArray instanceof Array;  // false —— Array 引用不同
Array.isArray(iframeArray);    // true  —— 语言内置检测
```

`Array.isArray` 的检测逻辑基于 ECMAScript 规范中的 `IsArray` 抽象操作，该操作检查对象的内部插槽 `[[ArrayLike]]` 等标记，与原型链无关，因此不受执行环境影响。

---

## constructor：不可靠的属性回查

每个对象通过原型链继承的 `constructor` 属性理论上指向创建该对象的构造函数：

```js
[].constructor === Array;    // true
(1).constructor === Number;  // true
```

但 `constructor` 作为普通可写属性，在原型被置换或手动修改后不可靠：

```js
function Animal() {}
Animal.prototype = {};          // 原型被整个替换
const a = new Animal();
a.constructor === Animal;    // false —— constructor 丢失
a.constructor === Object;    // true —— 沿链找到 Object.prototype.constructor
```

此外，`null` 和 `undefined` 没有 `constructor` 属性，直接访问抛 TypeError。因此在生产代码中 `constructor` 不适合作为类型判断的首选方案，更多用于获取已知类型的构造函数引用（如 `value.constructor` 作为默认工厂函数）。

---

## isPrototypeOf()：原型链方向的逆操作

`instanceof` 检查"构造函数是否在实例的原型链上"。`isPrototypeOf` 以相反方向执行同样的检查——"原型对象是否在实例的原型链上"：

```js
Array.prototype.isPrototypeOf([]);   // true
Object.prototype.isPrototypeOf([]);  // true
```

两者功能等价，仅调用方向不同。`isPrototypeOf` 在某些场景下表达更自然——当调用方已经是原型对象而非构造函数时：

```js
const base = { tag: 'base' };
const child = Object.create(base);

base.isPrototypeOf(child);     // true —— 直观，base 是原型
base.prototype;                // undefined —— base 没有 .prototype，instanceof 不可用
```

---

## 选型总结

| 方法 | 原类型 | 对象类型细分 | 继承链 | 跨帧安全 | null |
|---|---|---|---|---|---|
| `typeof` | ✅ | ❌ | ❌ | ✅ | ❌ |
| `instanceof` | ❌ | ✅ | ✅ | ❌ | ❌ |
| `toString.call` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `Array.isArray` | — | 仅数组 | ❌ | ✅ | — |
| `constructor` | ⚠️ | ⚠️ | ❌ | ❌ | ❌ |

- **`typeof`** 与 **`instanceof`** 并非替代关系，而是互补——前者管原始类型，后者管对象及继承链
- **`Object.prototype.toString.call()`** 是兜底方案：覆盖一切值的精确内部类型标签
- **`Array.isArray()`** 是跨帧安全需求下的专用工具
- **`constructor`** 仅在对原型链完整性有保证的受控场景中辅助使用

