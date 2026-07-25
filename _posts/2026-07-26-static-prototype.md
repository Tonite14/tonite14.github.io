---
title: 番外 静态方法与原型方法的设计边界
date: 2026-07-26 03:30:00 +0800
categories: [JavaScript高级程序设计, 番外]
tags: [JS, 原型链, 静态方法, 设计哲学, Object, Array]
pin: false
author: Tonite14

toc: true
comments: true
typora-root-url: ../../tonite14.github.io
math: false
mermaid: true
---

JavaScript 标准库中存在一条稳定但不常被讨论的设计分界线：某些方法挂在构造函数自身上，另一些方法挂在构造函数的 `prototype` 上。前一类被称为静态方法，后一类被称为实例方法。这条分界线并非随意划定，其背后是一套与 `this` 绑定、命名空间安全和调用语义相关的设计逻辑。本文以 `Object`、`Array`、`Function` 三个核心构造函数为样本，逐一分析两类方法的分布规律及其设计动机。

## 分界线：谁在操作，谁的职责

区分静态方法与实例方法的关键线索，在于调用句的主语是谁。

```javascript
// 实例方法：主语是实例自身
obj.hasOwnProperty('key');    // obj 自己做判断
arr.map(fn);                  // arr 自己执行变换

// 静态方法：主语是构造函数，实例只是被传入的原料
Object.keys(obj);             // Object 工具提取 obj 的键
Array.isArray(value);         // Array 工具判断 value 的类型
```

换一个角度表述：实例方法描述的是"作为该类的一个成员，你拥有什么能力"；静态方法描述的是"作为该类的构造者，你能对他人提供什么服务"。前者的 `this` 指向调用它的那个实例，方法内部围绕 `this` 展开逻辑；后者不依赖 `this`，目标对象通过参数显式传入，方法体是纯粹的外部操作。

这一区分并非 JavaScript 独创。在 Smalltalk 和 Java 中，"类方法"（class method）与"实例方法"（instance method）的二分法早已存在。JavaScript 采用的原型继承模型将类方法映射为挂在构造函数上的属性，将实例方法映射为挂在 `prototype` 上的属性，逻辑上等价，语法上更扁平。

## Object：工具函数与自身能力的分野

`Object` 构造函数上的静态方法和原型方法构成了最清晰的对比样本。

### 挂在 `Object` 上的静态方法

这些方法的共同特征：不读取 `this`，传入目标对象，返回一个独立于调用链的计算结果。

```javascript
Object.keys(obj);            // 提取可枚举的自有属性名
Object.values(obj);          // 提取可枚举的自有属性值
Object.entries(obj);         // 提取键值对数组
Object.assign(target, src);  // 将 src 的属性拷到 target
Object.freeze(obj);          // 冻结对象
Object.seal(obj);            // 密封对象
Object.create(proto);        // 以指定原型创建新对象
Object.defineProperty(obj, key, desc); // 精确控制属性描述符
Object.getOwnPropertyDescriptor(obj, key);
Object.getPrototypeOf(obj);
Object.setPrototypeOf(obj, proto);
```

这些方法的调用主语永远不是被操作的对象本身。`Object.keys(obj)` 的语义是"借助 Object 工具提取 obj 的信息"，而非"obj，提取你自己的键"。把 `keys` 放在原型上会引发两个层面的问题。

其一，语义矛盾。`({}).keys()` 意味着空对象在执行"提取自身键"这一动作，但字面量对象本身并不天然拥有对外暴露属性清单的责任。

其二，命名空间冲突。JavaScript 对象长期充当字典（dictionary）角色，任意一个以字符串为键的属性都可能与原型上的方法名发生碰撞。

```javascript
const dict = { keys: 'some value' };
// 如果 keys 在原型上，dict.keys() 就会返回 'some value'，
// 而非属性名列表。属性的值覆盖了方法的引用。
```

将 `keys` 等所有涉及属性遍历的方法全部迁出原型链、挂到 `Object` 上，本质上是对"对象即字典"这一使用模式的妥协：字典的键空间必须完全由用户控制，原型上每多一个方法名，就意味着一个不可用的字典键。

### 挂在 `Object.prototype` 上的实例方法

```javascript
obj.hasOwnProperty('key');   // 判断自身（不含原型）是否拥有该属性
obj.isPrototypeOf(other);    // 判断当前对象是否在 other 的原型链上
obj.propertyIsEnumerable('key'); // 判断属性是否可枚举
obj.toString();              // 返回 [object Type] 格式的字符串标签
obj.valueOf();               // 返回对象的原始值表示
obj.toLocaleString();        // 返回本地化的字符串表示
```

这些方法的共同特征：以调用者自身为唯一数据源。`hasOwnProperty` 检查的就是 `this` 是否拥有某个属性；`toString` 描述的就是 `this` 的类型。它们的语义天然绑定在 `this` 上，不依赖外部输入。放在原型上意味着每个对象默认拥有这些基础自助能力，符合直觉。

### 一个特殊案例：`toString`

`toString` 作为原型方法，其设计意图是让每个对象拥有一个默认的字符串表示。但 `Object` 层面无法预测子类型的展示需求，所以默认实现只是返回 `[object Type]` 格式的保守标签。各子类型（`Array`、`Date`、`Number`）在各自的原型上覆写 `toString`，提供更有意义的输出：

```javascript
Object.prototype.toString.call({});          // '[object Object]'
Object.prototype.toString.call([]);          // '[object Array]'
Object.prototype.toString.call(new Date());  // '[object Date]'
Object.prototype.toString.call(null);        // '[object Null]'

[1, 2, 3].toString();        // '1,2,3'，Array.prototype 覆写了
(42).toString();              // '42'，Number.prototype 覆写了
new Date().toString();        // 'Sun Jul 26 2026 ...'，Date.prototype 覆写了
```

由此衍生出一种类型判断技法：借 `Object.prototype.toString` 读取内部 `[[Class]]` 标签。这一用法并非 `toString` 的原始设计目标，而是社区在实践中发现并固化下来的"副产品"：名字仍是 `toString`，但其在类型判断领域提供的信息量远超字符串转换本身。

## Array：变换自身与外部判断的分离

`Array` 的静态方法与原型方法之间的界限与 `Object` 遵循同一套原则，但呈现方式更为极端：绝大多数常用方法都在原型上，静态方法极少。

### 挂在 `Array.prototype` 上的实例方法

```javascript
arr.push(1);          // 在尾部追加元素，修改自身
arr.pop();            // 弹出尾部元素，修改自身
arr.map(fn);          // 映射变换，返回新数组
arr.filter(fn);       // 过滤，返回新数组
arr.reduce(fn, init); // 归约，返回单个值
arr.slice(1, 3);      // 切片，返回新数组
arr.splice(1, 2);     // 删除/插入，修改自身
arr.indexOf(val);     // 查找索引，返回位置
arr.includes(val);    // 判断包含，返回布尔
arr.forEach(fn);      // 遍历，无返回值
arr.sort(fn);         // 排序，修改自身
arr.join(sep);        // 连接为字符串
arr.find(fn);         // 查找元素
arr.some(fn);         // 存在性测试
arr.every(fn);        // 全量测试
```

数量多、覆盖面广，这是有意为之。数组是 JavaScript 中最频繁使用的数据结构之一，大量操作都以数组自身为主体：变换自身、查询自身、遍历自身。所有这些方法都围绕 `this`（即调用它们的那个数组实例）展开，放在原型上是唯一自然的选择。

### 挂在 `Array` 上的静态方法

```javascript
Array.isArray(value);      // 判断 value 是否为数组
Array.from(iterable);      // 从类数组或可迭代对象创建数组
Array.of(1, 2, 3);        // 从参数列表创建数组
```

这三个方法的共性：调用主体不是某个已存在的数组实例，输入原料可能根本不是数组。`Array.isArray` 接受任意类型的值，返回布尔判断——这是一个纯粹的类型检查函数，与"数组对自己的操作"无关。`Array.from` 和 `Array.of` 是工厂方法，在没有数组实例时从外部原料构造一个新数组。它们的语义中没有 `this` 的位置，挂在构造函数自身上是最合理的归宿。

### 为什么 `Array.isArray` 不能放在原型上

假设 `isArray` 挂在 `Array.prototype` 上：

```javascript
// 语法本身就构成悖论：要判断一个值是不是数组，
// 必须先通过一个数组实例来调用。
[].isArray(value);  // 为什么要用一个空数组来问"另一个值是不是数组"？

// 非数组值无法调用 —— 而这恰好是 isArray 最常见的输入。
Array.isArray([]);           // true，正常工作
Array.isArray({ length: 0 }); // false，类数组，正常工作
// 如果挂在原型上：({ length: 0 }).isArray  →  不存在，彻底堵死
```

当一个方法的输入可能在调用发生时还不是该类型的实例，该方法就必然不能放在原型上。这是区分静态与实例的一条硬性判据，适用于所有构造函数。

## Function：方法全部在原型上的例外

`Function` 是一个有趣的边界案例：它几乎没有静态方法，三个核心方法 `call`、`apply`、`bind` 全部挂在 `Function.prototype` 上。

```javascript
function fn(a, b) { return this.x + a + b; }

fn.call(obj, 1, 2);     // 以 obj 为 this 调用 fn
fn.apply(obj, [1, 2]);  // 同上，参数以数组传入
fn.bind(obj)(1, 2);     // 创建 this 永久绑定为 obj 的新函数
```

乍看之下这与前述原则相悖：`call`/`apply`/`bind` 分明是在操作另一个函数调用，为什么不是静态方法 `Function.call(fn, thisArg, ...args)`？

原因在于这些方法的设立逻辑并不是"外部工具在操作函数"，而是"每个函数天生具备的能力"。在 JavaScript 的语义中，任何一个函数对象都应当能够回答三个问题：以指定的 `this` 调用自己（`call`）、以指定的 `this` 和数组参数调用自己（`apply`）、返回一个 `this` 被永久固定的副本（`bind`）。它们的主体是函数自己，`this` 指向调用它们的那个函数对象，与"变换自身"的数组实例方法完全同构。

```javascript
// 语义一致性验证
const greet = function() { return `Hello, ${this.name}`; };

// greet 在调用自己的 call —— 主语是 greet 自身
greet.call({ name: 'World' });     // 'Hello, World'

// 如果设计成静态方法：
Function.call(greet, { name: 'World' });
// 语义变成了"Function 工具在调用 greet" —— 同样是调用，
// 但损失了 greet.call 在方法链和函数式组合中的表达能力。
```

从设计史角度看，`call`/`apply` 源自 ES3 对方法借用（method borrowing）模式的编码：将一个对象的方法临时借给另一个对象使用。这个场景下，被借用的方法本身就是调用主体，把它挂在 `Function.prototype` 上是唯一能让 `Array.prototype.slice.call(arguments)` 这种经典写法成立的设计。

## 多态分发：同一方法名在两处的分工

某些方法名同时出现在静态方法和原型方法中，`Object` 最为典型：

| 方法 | `Object.xxx`（静态） | `Object.prototype.xxx`（实例） |
|------|---------------------|-------------------------------|
| `toString` | ❌ 不存在 | ✅ 返回 `[object Type]` 标签 |
| `valueOf` | ❌ 不存在 | ✅ 返回原始值表示 |
| `hasOwnProperty` | ✅ `Object.hasOwn(obj, key)` (ES2022) | ✅ `obj.hasOwnProperty(key)` (ES3) |

`Object.hasOwn` 是 ES2022 引入的静态版本，其出现恰好印证了原型方法的命名空间风险：

```javascript
const obj = Object.create(null);        // 无原型对象
obj.hasOwnProperty('key');              // TypeError：hasOwnProperty 不存在

const dict = { hasOwnProperty: 42 };
dict.hasOwnProperty('key');             // TypeError：42 不是函数

// ES2022 静态版本绕开所有风险
Object.hasOwn(obj, 'key');              // 正常工作，不管 obj 有没有原型
Object.hasOwn(dict, 'key');             // 正常工作，不管属性名是否被覆盖
```

这是一个方向性信号：当原型方法在极端场景下不可靠时，标准库倾向于补一个静态版本作为安全出口。不是替代，是互补。

## 设计原则总结

综合 `Object`、`Array`、`Function` 三个样本，静态方法与原型方法的分配遵循以下三条原则：

**原则一：`this` 依赖。** 方法是否以调用者自身为数据源？若是，放原型；若目标对象通过参数传入，放构造函数自身。`arr.map(fn)` 的 `this` 就是被映射的数组，放原型；`Object.keys(obj)` 的 `obj` 是参数，放静态。

**原则二：命名空间安全。** 方法名是否会与用户定义属性产生冲突？若可能，放静态。对象被广泛用作字典，`keys`、`values`、`entries` 等属性名极易被覆盖，迁出原型是防御性设计。

**原则三：调用时实例的存在性。** 方法的典型输入是否可能在调用时尚未成为该类型的实例？若是，放静态。`Array.isArray` 的输入经常不是数组；`Object.assign` 的输入甚至可能是 `null`（会报错，但语法上允许）。这类方法不能假设调用者已存在。

三条原则并非孤立生效，而是互有交叠。`Object.hasOwn` 同时受原则二（`hasOwnProperty` 被子类或字典键覆盖）和原则三（`Object.create(null)` 无原型）驱动。`Array.from` 同时受原则一（不存在 `this` 数组）和原则三（输入不是数组）驱动。

## 历史维度：一个修补中的体系

这套设计并非从一开始就完整。ES3 时代，原型上只有 `toString`、`valueOf`、`hasOwnProperty`、`isPrototypeOf`、`propertyIsEnumerable` 五个实例方法。`Object.keys` 直到 ES5 才加入，`Object.assign` 是 ES6，`Object.hasOwn` 是 ES2022。随着语言演进，越来越多的方法被添加到构造函数自身上，而非原型上。

这个趋势的驱动力是双重的。一方面，字典模式的使用频率推动了对命名空间安全的更高要求；另一方面，函数式编程风格的流行使得"将对象作为不可变数据传入工具函数"愈发常见，而静态方法与此风格天然兼容。

理解这条分界线，不是为了背诵每个方法的归属，而是为了在阅读标准库文档或设计自身的 API 时，有一个可复用的判断框架：这个方法是在描述实例自身的能力，还是在提供针对该类型的通用服务。前者走向原型，后者走向构造函数。两类方法共同构成了 JavaScript 的类型系统接口层，它们之间的分工是语言设计史上一段无声但持续演进的叙事。

