---
title: "Vue 组件开发的五类核心模式：从面试实战到工程抽象"
date: 2026-08-11 02:00:00 +0800
categories: Vue
tags: [Vue, 组件设计, 面试, 设计模式, 工程化]
pin: false
author: Tonite14
toc: true
comments: true
typora-root-url: ../../tonite14.github.io
math: false
mermaid: true
---

Vue 组件面试题的形式相当特殊。与纯 JavaScript 手写题不同，组件题没有固定的输入输出，也没有标准测试用例；面试官通常是当场给出一个需求描述，要求候选人在有限时间内从零搭建出可运行的组件。表面上考的是代码熟练度，实际上考察的是将需求拆解为状态、方法、模板三者关联关系的能力。

这些需求看似千变万化，但按照数据流的组织方式可以收敛为五类核心模式。每一类模式对应一种典型的组件协作关系，掌握这五类模式意味着可以应对绝大多数 Vue 组件级面试题。

## 一、列表渲染类

**核心特征**：一组同构数据以列表形式展示，支持增删改操作，通常附带基于派生状态的数量统计或条件筛选。

这类题目是 Vue 组件面试中出现频率最高的类型。其原因在于列表渲染同时覆盖了 Vue 的三个核心机制：响应式数组、计算属性、循环渲染。面试官可以在基础功能之外持续追加需求（增加筛选、增加排序、增加编辑），以此探测候选人对数据流演变的适应能力。

### 典型案例一：Todo 待办列表

Todo 列表是列表渲染类的经典题目。其功能集合包括：输入文字并添加待办项，每条待办可切换完成状态或删除，底部展示已完成数量与总数量，支持按全部、已完成、未完成三种状态筛选。

这类题目的解法核心在于**源数据与派生数据的分离**。`todos` 数组是唯一的源数据，`filteredTodos`、`doneCount`、`totalCount` 全部是派生数据，通过 `computed` 从源数据推导而来。模板只绑定派生数据，不直接对源数据做过滤或统计。这种分离保证了当需求发生变化时（例如增加一个新的筛选维度），只需要新增一个 `computed` 而不会改动已有的数据结构。

```ts
// 核心状态结构
const todos = ref<Todo[]>([])                          // 源数据
const filter = ref<'all' | 'done' | 'undone'>('all')   // 筛选条件

// 派生数据：模板只绑定这些
const filteredTodos = computed(() => {
  if (filter.value === 'done') return todos.value.filter(t => t.completed)
  if (filter.value === 'undone') return todos.value.filter(t => !t.completed)
  return todos.value
})
const doneCount = computed(() => todos.value.filter(t => t.completed).length)
const totalCount = computed(() => todos.value.length)

// 变更方法：集中修改源数据
const addTodo = (title: string) => todos.value.push({
  id: crypto.randomUUID(), title, completed: false, createdAt: Date.now()
})
const removeTodo = (id: string) => {
  todos.value = todos.value.filter(t => t.id !== id)
}
const toggleTodo = (id: string) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.completed = !todo.completed
}
```

关键设计决策：`newTodoTitle`（输入框当前文字）留在组件内部 `ref` 而不放入 store，因为它是瞬时 UI 状态，其他组件不需要关心用户正在输入什么。

### 典型案例二：商品列表与购物车联动

相较 Todo 列表的单页面操作，商品列表涉及**跨组件数据共享**。商品列表页展示所有商品，每个商品有一个"加入购物车"按钮；购物车页面展示已选商品和总价。

这类题目的核心区别在于状态必须放在 Pinia store 中，因为两个页面（商品列表和购物车）需要访问同一份数据。store 的结构与 Todo 类似，但多了一层"全量数据"与"选中数据"的区分：`products` 是全部商品的源数据，`cartItems` 是通过 `computed` 筛选出被选中的商品，`totalPrice` 是另一个派生值。

### 典型案例三：评论列表的嵌套渲染

递归评论（每条评论可能有子回复，子回复再嵌套子回复）在技术本质上是**树形数据的递归渲染**。Vue 组件可以通过 `name` 属性在自身模板中引用自身，形成递归组件。类型定义使用自引用接口（`children?: Comment[]`），模板里用 `v-if` 控制递归的终止条件。

```vue
<script setup lang="ts">
interface Comment { id: string; content: string; children?: Comment[] }
defineProps<{ comment: Comment }>()
</script>
<template>
  <div>
    <p>{{ comment.content }}</p>
    <div v-if="comment.children?.length" style="margin-left: 20px">
      <CommentItem v-for="child in comment.children" :key="child.id" :comment="child" />
    </div>
  </div>
</template>
```

这三道题虽然表面需求不同（平面列表、跨页列表、嵌套树），但底层共享同一套数据流范式：源数据统一存放、派生数据通过 `computed` 推导、变更通过集中方法执行、模板只做展示和事件绑定。

---

## 二、表单交互类

**核心特征**：多个输入控件以结构化方式收集用户数据，在提交前执行格式校验和业务规则校验，提交后给出反馈。

表单题的考察重点不在"能不能写出来"（Element Plus 的表单组件 API 高度标准化），而在三个设计判断：校验规则应该放在前端还是后端；哪些校验规则应该写在前端；如何在复杂表单中组织校验逻辑。

### 典型案例一：注册表单（多字段校验）

注册表单通常包含用户名、邮箱、密码、确认密码等字段，校验需求涵盖必填、格式、一致性、异步校验四层。

Element Plus 的 `el-form` 通过 `rules` 属性接收校验规则数组。规则按照"通用到具体"的顺序排列：`required` 在最前面（通用且优先级最高），接着是格式校验（`type: 'email'`、`pattern`），最后是自定义校验器。这种顺序确保用户先看到"请填写此项"而非在空输入框上看到"格式不正确"，交互体验更合理。

```ts
const rules: FormRules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少 6 位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (value !== ruleForm.password) callback(new Error('两次密码不一致'))
        else callback()
      },
      trigger: 'blur'
    }
  ]
}
```

自定义校验器（`validator`）是一个接收三个参数的回调函数：校验规则对象、当前值、以及一个 `callback`。校验通过时调用 `callback()` 无参，失败时传入 `new Error('提示信息')`。密码一致性校验是一种典型的"依赖上下文"的规则——`confirmPassword` 的合法性取决于它和 `password` 的关系，无法用静态规则表达。

### 典型案例二：搜索框（防抖输入）

搜索框的核心技术点不在校验，而在**输入事件到实际请求之间的延迟控制**。用户在快速输入时不应该每个字符触发一次请求，而应在连续输入停止后的一个固定间隔（通常 300ms）再发起搜索。

Vue 层面通过 `v-model` 绑定输入值，使用 `watch` 监听值变化并在回调中实现防抖。更工程化的做法是将防抖逻辑封装为 composable（`useDebouncedSearch`），返回一个延迟更新的响应式 ref，组件只需绑定该 ref 并在 `watch` 中发起请求。封装后的 composable 可在多个搜索场景复用。

### 设计共识

表单题的三个通用原则：格式校验和交互反馈放在前端（立刻响应，减少无效请求），业务规则校验前后端各做一套（前端挡低级错误，后端做最终防线），安全校验只在后端（前端代码对用户完全可见，任何前端校验都可被绕过）。

---

## 三、父子通信类

**核心特征**：一个父组件通过 props 向子组件传递数据，子组件通过 emits 向父组件通知事件。数据流动方向固定为"父到子传数据，子到父传事件"。

这类题目考察的是对 Vue 单向数据流的理解：为什么需要 props 和 emits 两种不同的通道，以及如何在不同的通信需求下选择合适的通道。

### 典型案例一：Modal 弹窗组件

弹窗是父子通信最典型的载体。父组件控制弹窗的显示与隐藏（通过 `visible` prop），子组件负责弹窗内部的 UI 和交互，并在用户点击关闭或确认时将事件 emit 回父组件。

```vue
<!-- 父组件 -->
<Modal :visible="showModal" @close="showModal = false" @confirm="handleConfirm" />

<!-- 子组件 Modal.vue -->
<script setup lang="ts">
defineProps<{ visible: boolean }>()
const emit = defineEmits<{ close: []; confirm: [] }>()
</script>
<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <slot />
      <button @click="emit('close')">取消</button>
      <button @click="emit('confirm')">确认</button>
    </div>
  </div>
</template>
```

这个组件同时展示了三种通信方式：`visible` prop 控制显隐（父到子），`close` 和 `confirm` 事件通知交互结果（子到父），`<slot />` 插槽传递模板内容（父到子的另一种形式，不传数据而传 DOM 结构）。

### 典型案例二：Tab 切换组件与路由联动

Tab 切换是"谁说了算"问题的经典案例。Tab 的高亮状态和路由路径是两个天然的"真相候选"。将路由路径作为唯一可信源（Single Source of Truth），Tab 组件只通过 `:model-value` 从路由读取当前路径并高亮对应 Tab；点击 Tab 时通过 `@tab-click` 调用 `router.push` 修改路由，路由变化后 Tab 自动响应。这种方式保证了刷新页面时 Tab 状态从 URL 自动恢复，不需要额外的持久化逻辑。

```vue
<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const tabs = [
  { name: '/todo', label: '待办' },
  { name: '/form', label: '表单' },
]
function onTabClick(tab: { props: { name: string } }) {
  router.push(tab.props.name)
}
</script>
<template>
  <el-tabs :model-value="route.path" @tab-click="onTabClick">
    <el-tab-pane
      v-for="item in tabs"
      :key="item.name"
      :label="item.label"
      :name="item.name"
    />
  </el-tabs>
  <router-view />
</template>
```

### 典型案例三：v-model 协议的实现

Vue 3 允许一个组件通过 `modelValue` prop 和 `update:modelValue` emit 实现 `v-model` 协议。当面试官要求"让这个自定义组件支持 v-model"时，本质是要求将 prop 命名为 `modelValue`、emit 命名为 `update:modelValue`。

```vue
<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
```

通过 `v-model:xxx` 语法，一个组件可以支持多个 `v-model` 绑定（如 `v-model:name` 映射为 `name` prop 和 `update:name` emit），为复杂组件的双向绑定提供了标准化的扩展方式。

---

## 四、状态管理类

**核心特征**：数据被多个不相关的组件共享，且数据的生命周期超出单个组件的挂载周期。此时需要将数据提升到全局状态管理层。

这类题目的考察重点不在"怎么用 Pinia"（API 记忆层面），而在"为什么这里需要 Pinia 而不是组件内 ref"（设计判断层面）。

### 典型案例一：购物车（跨页面状态共享）

购物车数据在两个完全独立的页面之间共享：商品列表页添加商品，购物车页展示已添加的商品和总价。两个页面不存在父子关系，没有 props/emits 通道可用。组件内 ref 的生命周期绑在组件上，切换到购物车页面时商品列表页被卸载，其 ref 数据随之销毁。

解决方案是将购物车状态提升到 Pinia store。store 实例在 `app.use(createPinia())` 时创建，生命周期跟随整个应用而非某个组件。商品列表页调用 `cartStore.add(item)` 写入数据，购物车页通过 `cartStore.items` 读取数据，两者通过 store 这个中间层耦合在一起，彼此不直接感知对方的存在。

```ts
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
  const totalCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  function add(product: Product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) { existing.quantity++ }
    else { items.value.push({ ...product, quantity: 1 }) }
  }
  function remove(id: string) {
    items.value = items.value.filter(i => i.id !== id)
  }

  return { items, totalPrice, totalCount, add, remove }
})
```

### 典型案例二：多步骤表单向导

多步骤表单（如分三步填写注册信息）存在一个关键矛盾：每一步是一个独立页面，但所有步骤的数据需要在最后一步统一提交。如果每步用组件内 ref 存储数据，最后一步无法访问前面步骤的数据。

Pinia store 提供了一个天然的数据中转层。每一步的页面组件从同一个 store 读取和写入数据，最后一步的提交方法从 store 中收集完整数据集合发送请求。store 同时承载了"数据存储"和"流程状态"两种职责：当前处于第几步也是一个 store 状态，控制步骤指示器和前进后退按钮的行为。

### 设计判断标准

判断一个状态是否应该放进 store 的唯一标准是"这个状态是否被多个不相关的组件消费"。输入框当前值只被输入框自身消费，留在组件内 ref；用户的登录态被请求拦截器、导航守卫、个人中心页面、权限指令同时消费，必须进 store。有疑问时先留在组件内，当确实出现跨组件共享需求时再提升到 store——状态提升是单向操作，从组件提到 store 的成本远低于在 store 和组件之间反复搬运。

---

## 五、组合逻辑类

**核心特征**：一段有状态的逻辑需要在多个组件中复用。这段逻辑不是纯函数（它包含响应式状态和副作用），无法通过简单的工具函数抽取。

这类题目考察 Vue 3 组合式 API 的核心优势：composable。composable 本质上是一个返回响应式数据和方法组合的函数，它利用 Vue 的响应式系统将"有状态的逻辑"提取为可复用的单元。

### 典型案例一：倒计时

倒计时的核心逻辑包括：一个递减的剩余秒数、计时器的启动与停止、格式化后的显示文本、计时归零时的回调。

```ts
export function useCountdown(totalSeconds: number, onFinish?: () => void) {
  const remaining = ref(totalSeconds)
  const display = computed(() => {
    const m = Math.floor(remaining.value / 60).toString().padStart(2, '0')
    const s = (remaining.value % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  })
  let timer: ReturnType<typeof setInterval> | null = null

  function start() {
    if (timer !== null) return
    timer = setInterval(() => {
      remaining.value--
      if (remaining.value <= 0) {
        stop()
        onFinish?.()
      }
    }, 1000)
  }
  function stop() {
    if (timer !== null) { clearInterval(timer); timer = null }
  }

  // 组件卸载时自动清理定时器
  onUnmounted(() => stop())

  return { remaining, display, start, stop }
}
```

关键设计点：`onUnmounted` 确保无论调用方是否手动停止，定时器都会在组件卸载时被清理——这是副作用管理的底线。`setInterval` 的写法存在漂移问题（主线程繁忙时计时不准），生产过程可以改用基于绝对时间戳的修正方案，但面试时展示清理意识已足够通过。

### 典型案例二：防抖搜索

将防抖逻辑封装为 composable，输入值的变化经过指定延迟后才更新输出的响应式值。

```ts
export function useDebouncedRef<T>(value: T, delay = 300) {
  const debounced = ref(value) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | null = null

  watch(() => value, (newVal) => {
    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(() => { debounced.value = newVal }, delay)
  })

  onUnmounted(() => { if (timer !== null) clearTimeout(timer) })

  return debounced
}
```

使用时组件只需要绑定原始 `ref` 到输入框的 `v-model`，用 `watch` 监听 `debounced` 的变化发起请求。防抖逻辑完全隐藏在 composable 内部，组件代码保持干净。

### 典型案例三：轮询

定时请求某个接口直到满足特定条件（如任务处理完成）。需要提供手动启动、停止的能力，并在组件卸载时自动清理。

### composeable 的设计原则

三条原则保证 composable 的行为可预测：第一，所有副作用（定时器、事件监听、订阅）必须在 `onUnmounted` 或 `onScopeDispose` 中清理；第二，返回的 ref 和 computed 应该保持只读（提供只读的 `computed` 而非可写的 ref），由 composable 内部的方法控制状态变更；第三，composable 的函数签名应该接收明确参数而非依赖全局变量，保证可测试性和可移植性。

---

## 总结：五类模式的共同骨架

```text
                        ┌──────────────────┐
                        │   模板 (Template)  │  ← 绑定数据 + 监听事件
                        └────────┬─────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
              ┌─────▼─────┐ ┌───▼────┐ ┌────▼─────┐
              │  props    │ │  ref   │ │  emits   │
              │ (外部输入) │ │(内部态)│ │ (事件出口)│
              └─────┬─────┘ └───┬────┘ └────┬─────┘
                    │            │            │
                    └────────────┼────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │     computed / watch     │  ← 派生 + 副作用
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Pinia store (按需)     │  ← 跨组件共享状态
                    └─────────────────────────┘
```

五类模式不是孤立的招式，而是在这张图上选取不同的路径。列表渲染类从核心的 ref 和 computed 入手，表单交互类在 computed 层叠加校验规则，父子通信类通过 props 和 emits 连接组件内外，状态管理类将 ref 的生命周期从组件提升到应用，组合逻辑类将 ref、computed、watch 打包为可复用的单元。

每一次拆分都是在回答同一个问题：**这个状态属于哪里，这个副作用什么时候开始、什么时候结束。** 从第一遍按模板敲代码，到能够独立拆解一个陌生需求，关键不在于记住了多少 API，而在于养成了自动追问"数据从哪来、到哪去、谁关心它"的条件反射。
