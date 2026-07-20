---
title: "VUEDAY1 Vue 3 Reactivity System: Proxy、Effect、Track & Trigger"
date: 2026-07-17 19:52:00 +0800
categories: Vue
tags: [Vue]
pin: true
author: Tonite14

toc: true
comments: true
typora-root-url: ../../tonite14.github.io
math: false
mermaid: true
---

Vue 3 的响应式系统由四个核心概念组成：`Proxy`、`effect`、`track`、`trigger`。`Proxy` 负责拦截数据读写，`effect` 包装需要追踪的副作用函数，`track` 在读取时收集依赖，`trigger` 在写入时派发更新。四者形成"数据 → 副作用"的自动同步链路。

本文从这四个概念出发，梳理它们的分工与协作方式，并在最后给出一个约 200 行的最小化实现，作为理解响应式原理的参考。

> 首先我们要清楚，一个原始对象，要先通过调用 `reactive` 转化为响应式对象，再通过 `proxy` 来实现响应式功能。`reactive(obj)` 内部会直接 `return new Proxy(...)`。
>
> 想让对象是响应式的，开发者需要reactive，需要proxy和track和trigger；开发者想让使用的函数是响应式的，需要reactiveEffect包装原函数为effect。

---

## The role of Proxy — the native gatekeeper（Proxy 的角色：原生门卫）

Vue 3 响应式的底层基石是 ES6 的 `Proxy` 对象。它能拦截目标对象的任意读写操作，这是 Vue 2 使用 `Object.defineProperty` 时无法做到的。

```js
// 一个最简 Proxy 例子
const obj = new Proxy({ count: 0 }, {
  get(target, key) {
    console.log(`${key} 被读取`)
    return target[key]
  },
  set(target, key, value) {
    console.log(`${key} 被设置为 ${value}`)
    target[key] = value
    return true
  }
})

obj.count       // 控制台输出: count 被读取
obj.count = 5   // 控制台输出: count 被设置为 5
```

> `Proxy` 的拦截粒度是"属性级别"，不是 Vue 2 的"定义时级别"。这意味着新增属性、数组索引修改、`delete` 操作，Proxy 全都能感知，无需任何 hack。

Vue 3 选择 `Proxy` 而不是沿袭 `Object.defineProperty`，解决了 Vue 2 两个最著名的响应式盲区：

| 场景 | Vue 2（defineProperty） | Vue 3（Proxy） |
|---|---|---|
| 对象新增属性 | 需要 `Vue.set()` | 自动追踪 |
| 数组按索引修改 | 无法检测 | 自动检测 |
| `delete obj.key` | 需要 `Vue.delete()` | 自动感知 |
| 嵌套对象 | 初始化时递归遍历（性能差） | 按需懒代理（get 时才递归） |

> 懒代理是 Vue 3 一个被低估的性能优化：Vue 2 初始化时把 data 里所有嵌套对象递归转成 getter/setter，Vue 3 只在读到某个属性时发现它是对象，才给它套下一层 `reactive`。大对象场景下启动速度差异明显。

---

## Why Proxy alone is not enough — the three missing pieces（为什么只有 Proxy 不够：缺失的三块拼图）

`Proxy` 能告诉开发者"有人在读/写这个属性"，但它回答不了两个关键问题：

1. **谁在读？** 是模板渲染函数？是 `computed`？还是 `console.log` 顺手读了一下？
2. **该通知谁？** 属性被改后，哪些函数需要重新执行？

```js
// Proxy 单打独斗的困境
const obj = new Proxy({ count: 0 }, {
  get(target, key) {
    // 知道 'count' 被读了，但不知道是谁读的、该不该跟踪
    return target[key]
  },
  set(target, key, value) {
    // 知道 'count' 被改了，但不知道该通知谁更新
    target[key] = value
    return true
  }
})

// 这段读取是模板渲染触发的，需要追踪
obj.count

// 这段读取只是 console.log 顺手读的，不该追踪
console.log(obj.count)
```

> Proxy 提供了"发生了什么"的信息，但没有提供"对谁有意义"的判断。这就像小区门卫看到有人进出，但没有来访登记表：他知道发生了进出事件，但不知道该通知哪一户。

Vue 3 在 Proxy 之上设计了三个运行时概念来解决这个问题：`effect`、`track`、`trigger`。

---

## effect — the tracked function container（effect：被追踪的副作用容器）

`effect` 包装一个"副作用函数"（side effect function）。这个函数内部读取的任何响应式数据都会自动被追踪。

每一个 `computed`、每一个 `watch`、每一个组件的渲染函数，背后都是一个 `effect`。它们本质上是同一套 `effect(fn)` 机制，换不同配置参数、外面包不同 API，表现出不同行为：`computed` 包了懒执行 + 缓存脏标记，`watch` 包了 schedule 调度 + 旧值比对，组件渲染函数则是最直接的 effect（数据变了就重新渲染）。

下面从最底层的 `ReactiveEffect` 类看起：

```js
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn           // fn 即用户传进来的副作用函数
    // 即写在 computed(() => ...)、watch(() => ...)、组件 render() 里面的那个回调
    this.deps = []         // 这个 effect 依赖了哪些数据的哪些属性
  }

  run() {
    // 把当前 effect 挂到全局变量，这样 track 函数才能找到它
    activeEffect = this
    const result = this.fn()  // 执行副作用 → 读响应式数据 → 触发 track → 收集依赖
    activeEffect = null       // 执行完毕，摘下标记
    return result
  }
}
```

> `activeEffect` 是一个模块级的全局变量。它是唯一的，依靠单线程机制维持，如果遇到嵌套 effect，会使用一个栈来辅助。
>
> 它是 `effect.run()` 和 `track()` 之间的**唯一通信通道**：`effect.run()` 执行前把 `this` 挂上去，`track()` 被 Proxy get 触发时读取这个全局变量，就知道是谁在读数据。

这也是为什么 `run()` 执行完毕后必须把 `activeEffect` 置为 `null`。如果不摘掉，后续任何非 effect 触发的读取（比如 `console.log(obj.count)`）也会被错误地追踪，造成依赖泄漏。

> 总结来说，`activeEffect` 就像办公室墙上唯一的一块**白板**。
>
> effect A 开始执行时在白板上写自己的名字，执行过程中所有读到响应式数据的操作都抬头看一眼白板：“哦，是 A 在干活，把我登记到 A 的依赖表里”。执行完擦掉名字。下一个 effect B 再写自己的名字。
>
> 同一时刻白板上只能有一个名字，嵌套 effect 需要栈来保存（Vue 内部用 `effectStack` 数组处理这个，但 `effectStack` 数组仅是辅助作用，`activeEffect` 仍是单独的全局变量）。
>
> 它是一个模块级的全局变量，整个响应式系统只有这一个。effect A 运行时 `activeEffect = effectA`，跑完置 null。下一轮 effect B 运行，同一个变量被赋值为 `effectB`。
>
> 为什么必须全局唯一？因为 `track()` 是一个全局函数。调用链是：
>
> ```
> effect.run() → fn() → 读 obj.count → Proxy get → track()
> ```
>
> `track()` 被 Proxy 的 `get` 间接触发，它不具备依赖传入某个参数来告知它哪个函数在读取这个变量，唯一的获知方式就是读全局变量 `activeEffect`。如果每个 effect 有自己的局部变量，`track()` 拿不到。

---

## track — dependency collection（track：依赖收集）

`track` 是一个全局函数，所有 effect 共用同一个 `track`。它不创建、不拥有 effect，只是把"当前正在跑的 effect"登记到对应的数据属性名下。

想象一个签到表：effectA 执行期间读了 `state.name`，`track` 就在 `name` 那栏记下 effectA；effectB 也读了 `state.name`，就把 effectB 追加进去。等 `state.name` 被修改时，`trigger` 翻开签到表就知道该通知谁。

`track` 在 Proxy 的 `get` 拦截器中被调用。它的职责是建立映射：**"响应式对象的属性 → 依赖它的 effect 集合"**。

这个映射采用三级存储结构：

```
WeakMap<target> 所有活跃的响应式对象
  └─ Map<key> 某个响应式对象的所有属性
       └─ Set<effect> 读取过某个属性的 effect 集合
```

> `WeakMap` 相关可参照[阅读DAY8 JavaScript高级程序设计 6章下 高级引用类型 \| Tonite14](https://tonite14.github.io/posts/read8/)

选择 `WeakMap` 而非 `Map` 作为顶层是为了**自动垃圾回收**：当响应式对象被销毁后，以它为 key 的整个依赖关系分支会被自动释放，不会造成内存泄漏。`Set` 用于去重：同一个 effect 多次读同一属性，只记录一次就够了。

```js
const targetMap = new WeakMap()   // target → depsMap

function track(target, key) {
  if (!activeEffect) return  // 没有 effect 正在执行，不需要追踪
  // 任何代码读 proxy 属性都会触发get，因此需要 activeEffect

  // ① 取出（或创建）target 对应的 Map
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  // ② 取出（或创建）key 对应的 Set
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }

  // ③ 把当前 activeEffect 放入依赖集合
  deps.add(activeEffect)
  activeEffect.deps.push(deps)  // 双向记录，卸载时用于清理
  // deps 是调用这个属性的 effect 集合的一个引用，其种含义上可以代表这个属性
  // 我们知道 deps 的值里一定有目前活跃的 effect，我们也只需要引用以便之后删除这个值
  // 至于值里其余的未活跃 effect，我们无须关心
}
```

> `track` 不直接持有 effect 引用，而是通过 `activeEffect` 全局变量与 `effect.run()` 解耦。这是 Vue 3 响应式系统设计最优雅的地方：track 和 effect 之间没有硬编码调用关系，而是通过一个全局变量在运行时动态桥接。

"卸载时清理"是一个重要的细节：`activeEffect.deps.push(deps)` 是双向绑定：effect 记住自己依赖了哪些 deps，deps 也记住自己被哪些 effect 依赖。当一个 effect 需要停止追踪（比如组件卸载），它可以遍历 `this.deps` 把自己从所有依赖集合中移除。


> **理解 track 之后，回头看三个容易产生的误解：**
>
> 1. 如果直接用 `Proxy` 而不经过 `reactive` 包装，它只代理当前这一层对象，嵌套在里面的对象依然是原始对象——`state.a` 返回 `{ b: 1 }` 这个原始对象，改了它也不会触发任何响应。`reactive` 在 get 拦截器里读到返回值是对象时，会额外调一次 `reactive(原始对象)` 给内层对象也包上 Proxy，并且把"原始对象 → 代理对象"记在 WeakMap 缓存里，下次读到同一个原始对象直接返回缓存的 Proxy。所以嵌套再深也不会无限建 Proxy，每个原始对象最多被代理一次
> 2. effect 只追踪自己**读过**的东西，改了但没读过的数据不会触发更新——`{{ data.name }}` 生效不是因为模板里写了它，而是因为渲染 effect 在首次执行时读到了它
> 3. track 只在 effect 执行瞬间收集依赖，组件首次渲染前改数据不会自动追踪——必须先跑一次 effect，依赖图才建立；这就是为什么组件的响应式更新必须有"第一次渲染"这个冷启动
>
> 这三个不是 bug，是响应式系统的设计前提。理解了它们，就不会在调试时对着改了没反应的数据发呆了。


---

## trigger — dispatching updates（trigger：派发更新）

`trigger` 是 `track` 的对称操作，也是一个全局函数，所有 effect 共用。它不创建 effect，只是翻开 `track` 建好的依赖表，找到"依赖了这个属性的所有 effect"，逐个重新执行。

`trigger` 不需要知道哪一个 effect 在写数据，它只做一件事：查表、通知。写的人不重要，重要的是之前谁登记过要听这个属性的变化。

`trigger` 在 Proxy 的 `set` 拦截器中被调用。它负责"通知"——track 登记，trigger 通知。

```js
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const deps = depsMap.get(key)
  if (!deps) return

  // 遍历所有依赖该 key 的 effect，逐个重新执行
  deps.forEach(effect => {
    effect.run()
  })
}
```

> trigger 的逻辑比 track 简单得多：它不需要判断"谁在写"，只需要找到"谁依赖了这个属性"然后通知即可。写操作不需要精细的上下文判断，只需要一张完整的依赖地图。

实际 Vue 3 的 `trigger` 比上述更复杂：它需要处理数组的 `length` 变更、`Map/Set` 的特殊操作、以及 `scheduler` 调度（将多个同步更新合并到 `nextTick` 的微任务队列）：但从概念上讲，核心就是"查表→执行"。

---

## Putting it all together — reactive（串联：reactive 函数）

`reactive` 是用户直接调用的 API，它用 `Proxy` 把 `track` 和 `trigger` 挂到 `get`/`set` 拦截器上，完成三者的编织：

```js
function reactive(raw) {
  return new Proxy(raw, {
    get(target, key, receiver) {
      track(target, key)              // 读数据 → 收集依赖
      const result = Reflect.get(target, key, receiver)

      // 嵌套对象懒代理：如果返回值是对象，递归套 reactive
      if (typeof result === 'object' && result !== null) {
        return reactive(result)
      }
      return result
    },

    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)

      // 值发生了变化才触发更新，避免无意义重渲染
      if (oldValue !== value) {
        trigger(target, key)           // 写数据 → 派发更新
      }
      return result
    }
  })
}
```

> `Reflect.get` 和 `Reflect.set` 是 Proxy 的最佳搭档。它们保持 `this` 指向正确（`receiver` 参数确保 setter 中的 `this` 指向 Proxy 而非原始对象），避免嵌套对象访问时绕过响应式系统。

---

## The full picture — data flow diagram（完整数据流：一张图）

```
用户写数据
  │
  ▼
state.count = 2
  │
  ▼
Proxy set 拦截
  │
  ▼
trigger(target, 'count')
  │
  ▼
targetMap.get(state) ──→ depsMap ──→ depsMap.get('count') ──→ Set { effect1, effect2 }
  │                                                              │
  └──────────────────────────────────────────────────────────────┘
                                                                 │
                                                   effect1.run()  ← 重新执行
                                                   effect2.run()  ← 重新执行
                                                         │
                                                    渲染函数执行
                                                      ──→ DOM 更新

用户读数据（effect 内部）
  │
  ▼
effect1.run()
  │
  ▼
activeEffect = effect1
  │
  ▼
state.count   （触发 Proxy get）
  │
  ▼
track(state, 'count')
  │
  ▼
depsMap  ──→ Set { effect1 }  ← 把 activeEffect 加入依赖集合
  │
  ▼
activeEffect = null
```

> 这个双向流说明一个关键事实：effect 既触发 track（首次执行时建立依赖），也被 trigger 触发（数据变化后重新执行）。这是一个"自我注册"系统：effect 不需要声明依赖谁，通过执行一次自己的副作用函数，自动发现并注册依赖关系。

---

## Complete implementation — ~200 lines（完整实现：约 200 行）

以下代码是一个可运行的 Vue 3 响应式最简实现。完整包含了 `reactive`、`effect`、`track`、`trigger` 四个核心函数。

```js
// ============================================================
//  mini-vue reactivity system — ~200 lines
//  Run: node this-file.js
// ============================================================

// ---- Global state ----

let activeEffect = null

// ---- Effect system ----

class ReactiveEffect {
  constructor(fn) {
    this.fn = fn
    this.deps = []
  }

  run() {
    try {
      // 挂上当前 effect，try 兜住用户代码抛错
      activeEffect = this
      return this.fn()   // ← 执行期间，任何 reactive 读操作都回 track 到这个 effect
    } finally {
      activeEffect = null  // 执行完毕、无论是否抛错，都摘下
    }
  }

  stop() {
    // 从所有依赖集合中移除自己
    for (const dep of this.deps) {
      dep.delete(this)
    }
    this.deps.length = 0
  }
}

function effect(fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
  return _effect
}

// ---- Dependency tracking ----

// WeakMap 顶层：确保响应式对象销毁后依赖关系自动 GC
const targetMap = new WeakMap()

function track(target, key) {
  if (!activeEffect) return

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }

  if (!deps.has(activeEffect)) {
    deps.add(activeEffect)
    activeEffect.deps.push(deps)  // 双向记录
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const deps = depsMap.get(key)
  if (!deps) return

  // 拷贝后遍历：因为 effect.run() 可能会修改 deps（重新收集依赖），
  // 直接遍历原 Set 可能导致无限循环或漏更新
  const effectsToRun = new Set(deps)
  effectsToRun.forEach(effect => {
    effect.run()
  })
}

// ---- reactive ----

function reactive(raw) {
  if (typeof raw !== 'object' || raw === null) return raw

  return new Proxy(raw, {
    get(target, key, receiver) {
      track(target, key)
      const result = Reflect.get(target, key, receiver)

      // 懒代理嵌套对象
      if (typeof result === 'object' && result !== null) {
        return reactive(result)
      }
      return result
    },

    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)

      if (oldValue !== value) {
        trigger(target, key)
      }
      return result
    }
  })
}

// ---- Demo ----

const state = reactive({
  count: 0,
  message: 'hello',
  nested: { a: 1 }
})

// effect 1: 依赖 count
effect(() => {
  console.log(`[effect1] count = ${state.count}`)
})

// effect 2: 依赖 message
effect(() => {
  console.log(`[effect2] message = ${state.message}`)
})

// effect 3: 依赖嵌套对象的 a
effect(() => {
  console.log(`[effect3] nested.a = ${state.nested.a}`)
})

console.log('--- 修改 count ---')
state.count++            // 触发 effect1

console.log('--- 修改 message ---')
state.message = 'world'  // 触发 effect2

console.log('--- 修改 nested.a ---')
state.nested.a = 999     // 触发 effect3

// ---- 预期输出 ----
// [effect1] count = 0
// [effect2] message = hello
// [effect3] nested.a = 1
// --- 修改 count ---
// [effect1] count = 1
// --- 修改 message ---
// [effect2] message = world
// --- 修改 nested.a ---
// [effect3] nested.a = 999
```

> 这个实现有几个刻意简化的地方：没有处理数组 `length` 变更的特殊逻辑、没有 `ref` 实现、没有 scheduler 调度（实际 Vue 会用微任务批量更新）、没有 `readonly` / `shallowReactive` 等变体。但核心三角形：Proxy 拦截 + track 收集 + trigger 派发：已全部覆盖。

---

## Key design decisions worth noting（值得关注的几个设计决策）

**为什么 `targetMap` 用 `WeakMap` 而不是 `Map`？**

`WeakMap` 的 key 是弱引用：即使 `targetMap` 里存了某个响应式对象的引用，只要这个对象在代码中不再被引用，垃圾回收器就能回收它，`targetMap` 里对应的条目也会自动消失。如果用 `Map`，`targetMap` 里的 key 引用会阻止对象被 GC，造成内存泄漏。

**为什么 `deps` 用 `Set` 而不是 `Array`？**

同一个 effect 可能在一次执行中多次读取同一个属性（比如 `v-for` 循环中用到的 `state.items`），`Set` 天然去重，保证每个 effect 只被记录一次，避免 trigger 时重复执行。

**为什么 `trigger` 里要拷贝一份 `deps` 再遍历？**

`effect.run()` 执行时会重新触发 `track`，可能会修改 `deps` 这个 Set 的内容。如果在遍历原 Set 的同时修改它，行为是未定义的（可能死循环、可能漏项）。先浅拷贝到一个新 Set，在副本上遍历，安全。

**为什么用 `Reflect` 而不是直接读 `target[key]`？**

当原始对象上有 getter/setter 时，`target[key]` 的 `this` 指向原始对象而非 Proxy。`Reflect.get/set(target, key, receiver)` 通过 `receiver` 参数把 `this` 指向 Proxy，确保 getter 内部如果继续读取其他属性，也能被 Proxy 拦截。

---

## From ~200 lines to real Vue 3（从 ~200 行到真正的 Vue 3）

真正的 Vue 3 响应式系统（`@vue/reactivity` 包）在这 200 行基础之上还做了：

- **`ref` 实现**：基本类型无法用 Proxy（Proxy 只能代理对象），所以用 `.value` 属性的 getter/setter + class 封装
- **`computed` 实现**：惰性求值 + 缓存脏标记（依赖不变则不重新计算）
- **`scheduler` 调度**：多个同步数据变更合并到一个微任务（`nextTick`）统一执行
- **`watch` 实现**：基于 effect + 旧值比对 + 回调触发
- **数组特殊处理**：`length` 属性的变更需要特殊分支逻辑
- **`Map`/`Set`/`WeakMap`/`WeakSet` 代理**：这些内置类型的内部方法需要额外的 Proxy 陷阱

> 但所有这些扩展都建立在本篇拆解的三角形之上。理解了 Proxy + track + effect + trigger = 响应式系统，再去看 Vue 3 源码就不会在概念层面迷路了。
