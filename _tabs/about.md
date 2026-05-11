---
title: 关于
icon: fas fa-info
order: 5
---

- ### Tonite14

  - a rookie about FrontEnd
  - a rookie about AI Security
  - Wer spricht von Siegen? Überstehn ist Alles

<!-- ===== JS Flashcard Styles (inline, only affects this page) ===== -->
<style>
.flashcard-container {
  max-width: 520px;
  margin: 2.5rem auto 0;
  padding: 0 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif;
}

.flashcard-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--heading-color, #111);
}

.flashcard-header i { color: #6c5ce7; font-size: 1.2rem; }

.flashcard-hint {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--text-muted-color, #888);
  opacity: 0.7;
}

.flashcard {
  position: relative;
  width: 100%;
  height: 220px;
  perspective: 800px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.flashcard-front,
.flashcard-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
}

.flashcard-front {
  background: rgba(108, 92, 231, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(108, 92, 231, 0.18);
  box-shadow: 0 4px 24px rgba(108, 92, 231, 0.10);
}

.flashcard-back {
  background: rgba(0, 206, 201, 0.07);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 206, 201, 0.18);
  box-shadow: 0 4px 24px rgba(0, 206, 201, 0.10);
  transform: rotateY(180deg);
}

.flashcard.flipped .flashcard-front { transform: rotateY(180deg); }
.flashcard.flipped .flashcard-back   { transform: rotateY(360deg); }

.flashcard-question {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.6;
  color: var(--heading-color, #222);
}

.flashcard-category {
  margin-top: 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6c5ce7;
  background: rgba(108, 92, 231, 0.10);
  padding: 0.2rem 0.7rem;
  border-radius: 1rem;
  letter-spacing: 0.03em;
}

.flashcard-answer {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text-color, #333);
  white-space: pre-line;
  text-align: left;
  width: 100%;
}

.flashcard-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 1rem;
}

.flashcard-btn {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(108, 92, 231, 0.25);
  border-radius: 50%;
  background: rgba(108, 92, 231, 0.06);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #6c5ce7;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flashcard-btn:hover {
  background: rgba(108, 92, 231, 0.15);
  border-color: rgba(108, 92, 231, 0.45);
  transform: scale(1.08);
}

.flashcard-btn:active { transform: scale(0.95); }

.flashcard-counter {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted-color, #888);
  min-width: 3.5rem;
  text-align: center;
}

/* Dark mode */
[data-mode="dark"] .flashcard-front {
  background: rgba(108, 92, 231, 0.12);
  border-color: rgba(108, 92, 231, 0.25);
}
[data-mode="dark"] .flashcard-back {
  background: rgba(0, 206, 201, 0.10);
  border-color: rgba(0, 206, 201, 0.25);
}
[data-mode="dark"] .flashcard-question { color: var(--heading-color, #e5e5e5); }
[data-mode="dark"] .flashcard-answer  { color: var(--text-color, #c8c8d0); }
[data-mode="dark"] .flashcard-category { color: #a29bfe; background: rgba(108, 92, 231, 0.20); }
[data-mode="dark"] .flashcard-btn {
  background: rgba(108, 92, 231, 0.12);
  border-color: rgba(108, 92, 231, 0.35);
  color: #a29bfe;
}
[data-mode="dark"] .flashcard-btn:hover {
  background: rgba(108, 92, 231, 0.25);
  border-color: rgba(108, 92, 231, 0.55);
}

/* Responsive */
@media (max-width: 576px) {
  .flashcard-container { padding: 0 0.5rem; }
  .flashcard { height: 200px; }
  .flashcard-front, .flashcard-back { padding: 1.2rem; }
  .flashcard-question { font-size: 0.95rem; }
  .flashcard-answer  { font-size: 0.82rem; }
}
</style>

<!-- ===== Flashcard HTML ===== -->
<div class="flashcard-container">
  <div class="flashcard-header">
    <i class="fas fa-brain"></i>
    <span>JS 知识快闪</span>
    <span class="flashcard-hint">点击卡片翻转</span>
  </div>
  <div class="flashcard" id="js-flashcard">
    <div class="flashcard-front">
      <div class="flashcard-question" id="card-question"></div>
      <div class="flashcard-category" id="card-category"></div>
    </div>
    <div class="flashcard-back">
      <div class="flashcard-answer" id="card-answer"></div>
    </div>
  </div>
  <div class="flashcard-controls">
    <button class="flashcard-btn" onclick="prevCard()"><i class="fas fa-chevron-left"></i></button>
    <span class="flashcard-counter" id="card-counter">1 / 30</span>
    <button class="flashcard-btn" onclick="nextCard()"><i class="fas fa-chevron-right"></i></button>
  </div>
</div>

{% raw %}
<!-- ===== Flashcard Data & Logic ===== -->
<script>
const flashcardData = [
  {
    category: "原型链",
    question: "instanceof 的底层原理是什么？为什么跨 iframe 会失效？",
    answer: "底层原理：遍历对象的 __proto__ 链，检查是否存在构造函数的 prototype。\n\n跨 iframe 失效：每个 iframe 有独立的全局环境，Array.prototype 引用不同，instanceof 比较的是引用，所以跨 Realm 失效。\n\n解决：用 Array.isArray()，它检查内部 [[Class]] 标记，不受 Realm 影响。"
  },
  {
    category: "this 绑定",
    question: "箭头函数的 this 有什么特殊之处？哪些场景不适用？",
    answer: "特殊之处：箭头函数没有自己的 this，继承外层作用域的 this，且在定义时确定、终身不变。\n\n不适用场景：\n① 对象方法（this 不会指向对象）\n② 构造函数（不能 new）\n③ 需要动态 this 的事件回调（如 addEventListener 中用箭头函数，this 不是触发元素）"
  },
  {
    category: "闭包",
    question: "闭包的内存机制是什么？为什么闭包能访问外层变量？",
    answer: "内存机制：闭包持有外层作用域的引用（不是拷贝），只要闭包还活着，外层作用域的变量对象就不会被 GC 回收。\n\n访问链路：闭包作用域 → 外层作用域 → 变量对象。\n\n注意：闭包保存的是引用，所以外层变量后续变化，闭包里看到的也是变化后的值。"
  },
  {
    category: "Promise 基础",
    question: "Promise 的三种状态是什么？状态是否可逆？",
    answer: "三种状态：pending → fulfilled 或 rejected。\n\n状态不可逆：一旦从 pending 变为 fulfilled 或 rejected，就永远锁定，无法再改变。\n\n这是 Promise 与事件监听器的核心区别：事件可以多次触发，Promise 只决议一次。这也是为什么 then() 可以多次调用，每次都能拿到同一个结果。"
  },
  {
    category: "Promise 链式调用",
    question: "then() 返回新期约，为什么需要显式返回 pending promise 才能让链等待？",
    answer: "then() 对所有返回值做 Promise.resolve() 包装：\n\n返回普通值（包括 undefined）→ Promise.resolve(普通值) → 新期约立刻兑现 → 链不等待。\n\n返回 pending promise → then() 返回的新期约跟着 pending → 等内部期约落定后才落定 → 链串行等待。\n\n本质：不显式返回 pending，链就没有等的东西，一口气跑完。"
  },
  {
    category: "迭代器",
    question: "迭代器是快照还是实时引用？有什么内存风险？",
    answer: "迭代器是实时引用，不是快照。迭代器持有集合的引用，集合的变化会反映到迭代过程中。\n\n内存风险：只要迭代器还活着，它引用的集合就不会被 GC 回收。如果集合很大，迭代器又长期持有（比如闭包里保存了迭代器），就会造成内存泄漏。\n\n这也是为什么 for...of 遍历时修改集合要小心——迭代器是实时的，修改会导致不可预期的行为。"
  },
  {
    category: "事件循环",
    question: "微任务和宏任务的执行顺序是什么？Promise.then 属于哪一类？",
    answer: "执行顺序：\n① 执行当前宏任务（如 script 整体代码）\n② 执行所有微任务（全部清空）\n③ 渲染（如果需要）\n④ 取下一个宏任务\n\nPromise.then/catch/finally 的回调是微任务，优先级高于 setTimeout/setInterval（宏任务）。\n\n面试常考：setTimeout 和 Promise.then 同时注册，then 先执行。"
  },
  {
    category: "ES6 类",
    question: "class 写法中，类字段声明和类方法在原型链上有什么区别？",
    answer: "类字段声明（key = value）→ 放在实例自身上（this.xxx），每个实例一份。\n\n类方法 → 放在 prototype 上，所有实例共享同一个函数。\n\n私有字段（#key）→ 放在实例自身，外部无法访问，也不在 prototype 上。\n\n面试意义：类字段声明越多，每个实例占的内存越大；方法放 prototype 是为了共享，节省内存。"
  },
  {
    category: "尾调用优化",
    question: "什么是尾调用优化？为什么非严格模式无法开启？",
    answer: "尾调用：函数最后一步 return 另一个函数调用，且当前栈帧不再被引用。\n\n优化原理：引擎可以复用当前栈帧，不新增栈帧，防止递归深度过大导致栈溢出。\n\n非严格模式无法开启：因为非严格模式下，函数可以通过 arguments.callee 访问自身，通过 f.arguments / f.caller 访问调用栈——这些信息依赖栈帧存在。如果栈帧被复用，这些信息就不准确了。严格模式禁用了这些属性，所以才能安全优化。"
  },
  {
    category: "异步编程",
    question: "回调地狱的本质是什么？Promise 和 async/await 分别怎么解决的？",
    answer: "本质：异步无返回值，结果只能通回调参数传递，嵌套形成三角形缩进。\n\nPromise 的解法：让异步有返回值（期约对象），then() 返回新期约实现链式调用，把嵌套三角形拉成直线。\n\nasync/await 的解法：以同步写法写异步，本质是 Promise 的语法糖。解决了 Promise 链式调用中中间值不保留的问题（用变量保存即可，不需要闭包），代码可读性更高。"
  },
  {
    category: "原型链",
    question: "原型链继承有哪些实现方式？Object.create() 比 new Xxx() 好在哪？",
    answer: "常见方式：\n① 原型链：子类的 prototype = new 父类()\n② 借用构造函数：Super.call(this)\n③ 组合继承：原型链 + 构造函数\n④ 原型式继承：Object.create(原型对象)\n⑤ 寄生式继承：Object.create + 增强对象\n⑥ class extends（ES6 语法糖）\n\nObject.create() 的优势：不调用父类构造函数，更干净，避免了 constructor 被改写的副作用，也不会创建多余的实例属性。"
  },
  {
    category: "原型链",
    question: "hasOwnProperty 和 in 运算符有什么区别？",
    answer: "hasOwnProperty：只检查自身属性（不包括原型链），返回布尔值。\n\nin 运算符：检查自身 + 原型链，返回 true/false。\n\nfor...in 循环：遍历自身 + 原型链的可枚举属性（包含继承属性）。\n\n应用场景：\n遍历对象属性时，如果只想处理自身属性，用 hasOwnProperty 过滤。\n\n注意：Object.prototype.hasOwnProperty.call(obj, 'key') 比 obj.hasOwnProperty('key') 更安全（防止对象被重写了 hasOwnProperty）。"
  },
  {
    category: "this 绑定",
    question: "this 的四种绑定规则是什么？优先级顺序是怎样的？",
    answer: "四种规则（优先级从高到低）：\n① new 绑定：new Fn() → this 指向新创建的实例\n② 显式绑定：call/apply/bind(obj, ...) → this 指向 obj\n③ 隐式绑定：obj.fn() → this 指向 obj\n④ 默认绑定：fn() → 严格模式 undefined，非严格模式 window\n\n优先级：new > 显式 > 隐式 > 默认。\n\n面试常考：显式绑定比隐式优先级高，所以 obj.fn.call(obj2) 中 this = obj2（不是 obj）。"
  },
  {
    category: "this 绑定",
    question: "call、apply、bind 有什么区别？bind 返回的是什么？",
    answer: "共同点：都用于显式绑定 this，改变函数执行时的 this 指向。\n\n区别：\n① call(thisArg, arg1, arg2...)：直接调用，立即执行，参数逐个传入\n② apply(thisArg, [argsArray])：直接调用，立即执行，参数以数组传入\n③ bind(thisArg, ...)：返回一个新函数（不调用），绑定 this 和预设参数\n\nbind 返回的是绑定了 this 的新函数，原函数不变。常用场景：把类数组转数组 ([].slice.call(obj))、事件处理函数传参、保留回调 this。"
  },
  {
    category: "闭包",
    question: "闭包在实际开发中有哪些经典应用场景？",
    answer: "经典场景：\n① 数据私有化/模块模式：函数内部变量只能通过闭包暴露的方法访问\n② 防抖（debounce）：延迟执行，闭包保存定时器 ID\n③ 节流（throttle）：固定频率执行，闭包保存时间戳\n④ 柯里化（curry）：保存已收集的参数，分步调用\n⑤ 缓存/记忆化（memoize）：闭包保存计算结果，避免重复计算\n\n核心思想：闭包让函数拥有了"记忆"，可以在函数外部持久访问和操作内部状态。"
  },
  {
    category: "闭包",
    question: "循环中使用 var + 闭包会产生什么问题？如何解决？",
    answer: "问题：var 没有块级作用域，循环中创建的闭包共享同一个变量 i。循环结束后 i 的值已经是循环终值，所有闭包访问的都是同一个 i。\n\n经典例题：for (var i = 1; i <= 3; i++) { setTimeout(() => console.log(i), 100) } → 输出 4, 4, 4（不是 1, 2, 3）\n\n解决方式：\n① 换成 let（块级作用域，每次迭代有独立变量）\n② 立即执行函数（IIFE）创建新作用域\n③ 把 i 作为参数传入函数\n\n面试加分：能用 let 解决是加分项，理解 IIFE 的原理是基础。"
  },
  {
    category: "Promise",
    question: "Promise.all、Promise.race、Promise.allSettled、Promise.any 有什么区别？",
    answer: "Promise.all：全部成功才成功，返回结果数组；任一失败则整体失败，返回第一个拒绝理由。\n\nPromise.race：返回最快 settled（fulfilled 或 rejected）的结果。\n\nPromise.allSettled：全部 settled 后返回结果数组（不管成功还是失败），适合需要所有请求结果时用。\n\nPromise.any：返回最快 fulfilled 的结果；全部 rejected 才整体拒绝（返回 AggregateError）。\n\n常见应用：all = 并行请求全部成功；race = 超时控制；allSettled = 不怕部分失败的全量结果；any = 取最快成功的。"
  },
  {
    category: "Promise",
    question: "async/await 的错误处理最佳实践是什么？try/catch 有什么坑？",
    answer: "最佳实践：\n① 顶层 await 用 try/catch 包裹（如 top-level async 函数）\n② 多个独立 await 可以并行用 Promise.all 包裹，在外层统一 try/catch\n③ 不相干的 await 出错不应该影响其他逻辑，用独立的 try/catch\n\ntry/catch 的坑：\n① try/catch 会捕获同步 throw 和异步 reject，但无法捕获未处理的 rejection\n② 如果在 async 函数内 return 了 rejected promise 而外层没 catch，还是会 unhandled rejection\n\n面试加分：提到 unhandledRejection 事件监听、了解 rejection handled 的边界情况。"
  },
  {
    category: "事件循环",
    question: "requestAnimationFrame 在事件循环的哪个阶段执行？它和 setTimeout 比有什么优势？",
    answer: "执行时机：requestAnimationFrame 的回调在浏览器渲染之前、在微任务之后、被纳入下一次屏幕刷新之前的那个任务中执行。\n\n优势：\n① 与屏幕刷新率同步（通常是 60fps = 16.67ms），不会产生撕裂\n② 页面隐藏/后台时自动暂停（节省 CPU）\n③ setTimeout 只能约 16ms，rAF 是浏览器主动调用，更精准\n\n常用场景：动画（canvas、游戏循环）、滚动时懒加载/虚拟列表、滚动吸附效果。"
  },
  {
    category: "事件循环",
    question: "Node.js 和浏览器的事件循环有什么区别？",
    answer: "核心区别：\n① 微任务队列时机相同（每个阶段之间都会清空微任务队列）\n② 宏任务分类不同：\n  - 浏览器：script、setTimeout、setInterval、I/O、UI rendering、requestAnimationFrame\n  - Node.js：Timers（setTimeout/setInterval）、pending callbacks、idle/prepare、poll、check（setImmediate）、close callbacks\n\n③ setTimeout vs setImmediate：Node.js 中 setImmediate 优先于 setTimeout（I/O 回调之后）\n④ process.nextTick：Node.js 特有，在当前操作完成后、微任务之前立即执行，优先级高于 Promise.then\n⑤ Node.js 的微任务队列会在每个阶段结束后清空（和浏览器一样）。"
  },
  {
    category: "ES6 类",
    question: "class extends 的底层原理是什么？super() 做了什么？",
    answer: "extends 的本质：子类原型对象的 [[Prototype]] 指向父类原型。\n\nsuper() 的作用：\n① 调用父类的 constructor，将 this 绑定到子类实例\n② 必须在 this 赋值之前调用（JavaScript 引擎强制）\n③ 子类中访问 this.xxx 前必须先调用 super()\n\n禁止操作：在 super() 之前访问 this（会报错）。\n\n面试常考：super() 不是必须写的——如果不写，引擎会自动调用。但一旦手动写 this.xxx，就必须先写 super()。"
  },
  {
    category: "ES6 类",
    question: "静态方法、实例方法、私有方法在内存占用和访问权限上有什么区别？",
    answer: "实例方法：定义在类块中的方法，放在 prototype 上，所有实例共享同一个函数对象，节省内存。\n\n静态方法（static）：定义在类本身上（如 static getInstance()），不绑定实例，只能通过类名调用。常用于工厂方法、工具方法。\n\n私有字段（#field）：ES2022 引入，定义在类块顶部，放在实例自身上，外部无法访问，也不共享。\n\n内存区别：N 个实例，实例方法只占 1 份（prototype 上），类字段和私有字段各占 N 份。"
  },
  {
    category: "类型判断",
    question: "typeof、instanceof、Object.prototype.toString.call() 三种判断方式分别适用什么场景？",
    answer: "typeof：适合判断原始类型（string/number/boolean/undefined/symbol/function）和 bigint。\n① typeof null === 'object'（历史 bug）\n② typeof 数组/对象/日期/正则 === 'object'\n\ninstanceof：适合判断引用类型的具体类（数组、日期、正则、Error）。注意：跨 iframe/realm 失效。\n\nObject.prototype.toString.call()：最通用，返回内部 [[Class]] 标记，如 '[object Array]'、'[object Date]'。\n\n最佳实践：typeof 做基础筛选 → Object.prototype.toString.call() 做精确判断 → instanceof 做业务层判断。"
  },
  {
    category: "类型判断",
    question: "如何准确判断一个值是数组？有哪些方法？为什么不能用 typeof？",
    answer: "方法：\n① Array.isArray()（最推荐）：准确，不受 iframe/range 影响\n② Object.prototype.toString.call(arr) === '[object Array]'\n③ arr instanceof Array（有问题：跨 iframe 时 Array.prototype 不是同一个引用）\n\n为什么 typeof 不行：typeof [] === 'object'，因为数组是引用类型，typeof 只区分原始类型和 function。\n\n面试加分：能说出跨 iframe 场景下的 instanceof 失效原因，以及为什么 Array.isArray() 更可靠。"
  },
  {
    category: "拷贝",
    question: "浅拷贝有哪些实现方式？Object.assign 和展开运算符有什么区别？",
    answer: "常见浅拷贝方式：\n① Object.assign({}, obj)（ES6）\n② { ...obj }（对象展开运算符）\n③ Array.prototype.slice() / Array.prototype.concat()（数组）\n④ for...in 遍历赋值\n\nObject.assign vs 展开运算符：\n本质上都是浅拷贝（只拷贝一层），都是 ES6+ 语法糖。\n\n区别：Object.assign 可以有选择性地只拷贝部分属性（Object.assign({}, obj, { only: this }）），展开运算符语法更简洁。"
  },
  {
    category: "拷贝",
    question: "如何实现深拷贝？循环引用怎么处理？",
    answer: "基础深拷贝：JSON.parse(JSON.stringify(obj))，简单但有局限（不能拷贝函数、undefined、Symbol、循环引用、Date/Math/RegExp 等特殊对象）。\n\n循环引用处理（WeakMap 法）：\n① 用 WeakMap 记录已拷贝的对象（key = 原对象，value = 拷贝对象）\n② 每次拷贝前检查 WeakMap，有则返回已存在的拷贝\n③ 拷贝完成后从 WeakMap 中移除（或者用普通 Map 在结束后清空）\n\n库方案：lodash 的 cloneDeep（内部用 SameValue 比较 + Map 处理循环引用）。\n\n面试加分：能手写 WeakMap 版本的深拷贝，或者解释 structuredClone（浏览器原生 API，支持循环引用）。"
  },
  {
    category: "函数",
    question: "arguments 对象和 ES6 rest 参数有什么区别？",
    answer: "arguments：\n① 是类数组对象（不是真正的数组，没有数组方法）\n② 箭头函数中没有 arguments（它属于外层函数）\n③ 包含所有实参（包括未命名的参数）\n\nrest 参数（...args）：\n① 是真正的数组，有所有数组方法\n② 是 ES6 语法，更清晰，语义明确\n③ 只能是最后一个参数，只能写在解构或最后一个位置\n\n最佳实践：优先使用 rest 参数，arguments 已不推荐在现代代码中使用。"
  },
  {
    category: "函数",
    question: "函数声明和函数表达式有什么区别？var + 函数表达式会有提升陷阱吗？",
    answer: "函数声明：function fn() {}\n① 会被提升到作用域顶部，包括函数体本身（可以在声明之前调用）\n② 遵循块级作用域？不，它遵循函数作用域\n\n函数表达式：var fn = function() {}\n① 只有变量声明提升，初始值为 undefined；函数体不提升\n② 在赋值之前调用 fn() → TypeError\n\nvar + 函数表达式的陷阱：\nvar fn = function() {}：声明提升（fn = undefined），赋值不提升 → 调用前 fn 是 undefined，TypeError\n\n函数声明提升 > var 声明提升（函数优先），所以 var fn = function() {} 后，fn() 实际上会是 undefined。\n\n最佳实践：函数声明放顶层，函数表达式用于回调/参数/IIFE。"
  },
  {
    category: "模块化",
    question: "CommonJS 和 ES Module 有什么区别？",
    answer: "加载方式：\n① CJS：同步加载，运行时加载（require 可以在任何位置动态调用）\n② ESM：静态分析，编译时确定依赖（import 必须在模块顶层，不能在条件语句中）\n\n导入值：\n① CJS：拷贝（值的拷贝或引用，取决于导出的是原始值还是对象）\n② ESM：只读绑定（原始值的引用，导出的 binding 不可修改）\n\n循环引用：\n① CJS：能处理，但可能拿到不完整的模块（因为同步加载）\n② ESM：有机制（绑定可见但值可能是 undefined），需要主动处理\n\n其他：CJS module.exports 导出整体，ES6 export 导出单个或 default。"
  },
  {
    category: "模块化",
    question: "ES Module 的动态导入 import() 和静态 import 有什么区别？有什么应用场景？",
    answer: "静态 import（import xxx from）：\n① 必须在模块顶层，不能条件加载\n② 打包时即确定所有依赖（Tree Shaking 的基础）\n③ 加载是同步的\n\n动态 import()（返回 Promise）：\n① 返回 Promise，可在任意位置按需调用\n② 可用于条件加载（if (need) { import('./a.js') }）\n③ 浏览器原生支持，无需打包工具也可使用\n\n应用场景：\n① 路由懒加载（React.lazy / Vue.defineAsyncComponent）\n② 按需加载大型库（moment.js 等）\n③ 条件加载（浏览器判断后加载不同实现）\n\n面试加分：动态 import 是 code splitting 的基础，提到减少首屏 bundle 大小。"
  }
];

let currentCardIndex = 0;

function renderCard() {
  const card = flashcardData[currentCardIndex];
  document.getElementById('card-question').textContent = card.question;
  document.getElementById('card-category').textContent = card.category;
  document.getElementById('card-answer').textContent = card.answer;
  document.getElementById('card-counter').textContent =
    `${currentCardIndex + 1} / ${flashcardData.length}`;
}

function nextCard() {
  const flashcard = document.getElementById('js-flashcard');
  flashcard.classList.remove('flipped');
  setTimeout(() => {
    currentCardIndex = (currentCardIndex + 1) % flashcardData.length;
    renderCard();
  }, 150);
}

function prevCard() {
  const flashcard = document.getElementById('js-flashcard');
  flashcard.classList.remove('flipped');
  setTimeout(() => {
    currentCardIndex = (currentCardIndex - 1 + flashcardData.length) % flashcardData.length;
    renderCard();
  }, 150);
}

document.getElementById('js-flashcard').addEventListener('click', function() {
  this.classList.toggle('flipped');
});

renderCard();
</script>
{% endraw %}