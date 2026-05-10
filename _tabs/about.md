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

<!-- ===== Flashcard Data & Logic ===== -->
<script>
const flashcardData = [
  // ===== 原型链 & 对象 =====
  {
    category: "原型链",
    question: "instanceof 的底层原理是什么？为什么跨 iframe 会失效？",
    answer: "底层原理：遍历对象的 __proto__ 链，检查是否存在构造函数的 prototype。\n\n跨 iframe 失效：每个 iframe 有独立的全局环境，Array.prototype 引用不同，instanceof 比较的是引用，所以跨 Realm 失效。\n\n解决：用 Array.isArray()，它检查内部 [[Class]] 标记，不受 Realm 影响。"
  },
  {
    category: "原型链",
    question: "Object.create(null) 和 {} 有什么区别？什么场景用前者？",
    answer: "Object.create(null) 创建的对象原型为 null，没有任何继承属性（没有 toString/hasOwnProperty 等），是一个纯字典。\n\n{} 创建的对象原型是 Object.prototype，继承了所有对象方法。\n\n使用场景：用作 Map（避免 key 与继承属性名冲突）、处理可能覆盖 __proto__ 的 key、需要完全干净的对象时。"
  },
  {
    category: "原型链",
    question: "new 操作符做了哪四件事？手写实现。",
    answer: "四步：\n1. 创建一个新对象，原型指向构造函数的 prototype\n2. 将 this 绑定到新对象，执行构造函数\n3. 如果构造函数没有 return 对象，则返回新对象\n4. 如果构造函数 return 了一个对象，则返回该对象\n\n手写：\nfunction myNew(Fn, ...args) {\n  const obj = Object.create(Fn.prototype);\n  const result = Fn.apply(obj, args);\n  return result instanceof Object ? result : obj;\n}"
  },
  // ===== this 绑定 =====
  {
    category: "this 绑定",
    question: "this 绑定的四条规则是什么？优先级顺序是怎样的？",
    answer: "四条规则：\n1. 默认绑定：独立函数调用，this = window（非严格）/ undefined（严格）\n2. 隐式绑定：obj.fn()，this = obj\n3. 显式绑定：call/apply/bind，this = 指定对象\n4. new 绑定：new Fn()，this = 新创建的对象\n\n优先级：new > 显式 > 隐式 > 默认\n\n注意：箭头函数不参与这四条规则，它的 this 继承自外层作用域。"
  },
  {
    category: "this 绑定",
    question: "箭头函数的 this 有什么特殊之处？哪些场景不适用？",
    answer: "特殊之处：箭头函数没有自己的 this，继承外层作用域的 this，且在定义时确定、终身不变。\n\n不适用场景：\n① 对象方法（this 不会指向对象）\n② 构造函数（不能 new）\n③ 需要动态 this 的事件回调（如 addEventListener 中用箭头函数，this 不是触发元素）"
  },
  {
    category: "this 绑定",
    question: "(obj.fn = obj.fn)() 的 this 为什么是 window？",
    answer: "赋值表达式 (obj.fn = obj.fn) 的返回值是函数本身（裸函数），不再是 obj 的方法引用。\n\n相当于：const f = obj.fn; f();\n\n此时 this 走默认绑定规则，非严格模式下是 window。\n\n这是隐式绑定丢失的经典场景之一（还有作为参数传递、setTimeout 包裹等）。"
  },
  // ===== 闭包 =====
  {
    category: "闭包",
    question: "闭包的内存机制是什么？为什么闭包能访问外层变量？",
    answer: "内存机制：闭包持有外层作用域的引用（不是拷贝），只要闭包还活着，外层作用域的变量对象就不会被 GC 回收。\n\n访问链路：闭包作用域 → 外层作用域 → 变量对象。\n\n注意：闭包保存的是引用，所以外层变量后续变化，闭包里看到的也是变化后的值。\n\n内存泄漏风险：闭包长期持有大对象引用，要及时置 null 释放。"
  },
  {
    category: "闭包",
    question: "for 循环里用 var 声明 i，闭包拿到的是同一个 i，怎么解决？",
    answer: "原因：var 没有块级作用域，i 被提升到循环外部，所有闭包共享同一个 i，循环结束后 i = 最终值。\n\n解法1：用 let 声明 i（每次迭代创建新的词法作用域，每个闭包持有独立的 i）\n解法2：IIFE 捕获当时的值（(function(j) { ... })(i)）\n解法3：用 for...of / for...in（每次迭代重新绑定）"
  },
  // ===== Promise & 异步 =====
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
    category: "Promise 静态方法",
    question: "Promise.resolve() 的幂等性是什么？Promise.reject() 有幂等性吗？",
    answer: "Promise.resolve() 幂等：传入一个 Promise，直接原样返回，不做任何包装。\nPromise.resolve(Promise.resolve(x)) === Promise.resolve(x)。\n\nPromise.reject() 无幂等性：\nPromise.reject(Promise.resolve(x)) → 返回一个 rejected 的 Promise，拒绝理由是 Promise.resolve(x) 这个对象本身（不会展开）。\n\n这也是为什么 reject 里应该传 Error 对象，而不是 Promise。"
  },
  {
    category: "async/await",
    question: "async/await 是 Promise 的语法糖，true or false？有什么是 await 做不到的？",
    answer: "基本正确。async 函数返回值始终被包装成 Promise，await 后面跟的始终是 Promise.resolve()。\n\nawait 做不到的：\n① 无法并行等待多个 Promise（需要 Promise.all）\n② 无法在外层 catch 到 async 函数内部抛出的错误（必须用 try/catch 或 .catch）\n③ for...await...of 才能串行等待，普通 for 循环里 await 是并行的（如果 Promise 已创建）\n\n面试加分：async 函数返回的 Promise 在抛出异常时，错误会被静默吞掉（如果没有 catch），这是常见坑。"
  },
  // ===== 事件循环 =====
  {
    category: "事件循环",
    question: "微任务和宏任务的执行顺序是什么？Promise.then 属于哪一类？",
    answer: "执行顺序：\n① 执行当前宏任务（如 script 整体代码）\n② 执行所有微任务（全部清空）\n③ 渲染（如果需要）\n④ 取下一个宏任务\n\nPromise.then/catch/finally 的回调是微任务，优先级高于 setTimeout/setInterval（宏任务）。\n\n面试常考：setTimeout(fn, 0) 和 Promise.resolve().then(fn) 同时注册，then 先执行。"
  },
  {
    category: "事件循环",
    question: "以下代码输出顺序是什么？\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
    answer: "输出：1 → 4 → 3 → 2\n\n解析：\n① console.log(1) → 同步，立即输出 1\n② setTimeout → 宏任务，放入任务队列，等待下一轮\n③ Promise.then → 微任务，放入微任务队列\n④ console.log(4) → 同步，立即输出 4\n⑤ 当前宏任务（script）执行完毕，清空微任务队列 → 输出 3\n⑥ 取下一个宏任务（setTimeout 回调）→ 输出 2"
  },
  // ===== ES6 类 =====
  {
    category: "ES6 类",
    question: "class 写法中，类字段声明和类方法在原型链上有什么区别？",
    answer: "类字段声明（key = value）→ 放在实例自身上（this.xxx），每个实例一份。\n\n类方法 → 放在 prototype 上，所有实例共享同一个函数。\n\n私有字段（#key）→ 放在实例自身，外部无法访问，也不在 prototype 上。\n\n面试意义：类字段声明越多，每个实例占的内存越大；方法放 prototype 是为了共享，节省内存。"
  },
  {
    category: "ES6 类",
    question: "super() 在 constructor 里必须在使用 this 之前调用，为什么？",
    answer: "ES6 类继承的实现机制：子类实例的创建分为两步，先由父类构造函数创建 this，再由子类构造函数修饰 this。\n\n如果子类不调用 super()，则没有 this（父类没创建）。\n\n在使用 this 之前必须调用 super()，否则会报 ReferenceError（TDZ）。\n\n这也是为什么 constructor 里第一行通常是 super(...)。"
  },
  // ===== 类型判断 =====
  {
    category: "类型判断",
    question: "typeof null 为什么是 'object'？如何正确判断 null？",
    answer: "历史遗留 Bug：JS 第一个版本中，用 32 位存储值，低 1-3 位表示类型标签，000 表示 object，而 null 的机器码是全 0，所以 typeof null === 'object'。\n\n正确判断 null：\nif (value === null) { ... }\n\n更严谨的判断（排除 undefined）：\nif (value == null) { ... }  // 只匹配 null 和 undefined\nif (value != null) { ... }  // 排除 null 和 undefined"
  },
  {
    category: "类型判断",
    question: "typeof 和 instanceof 和 Object.prototype.toString.call() 各自适用场景？",
    answer: "typeof：判断基本类型（string/number/boolean/undefined/symbol/bigint），但 typeof null = 'object'，typeof [] = 'object'，有局限。\n\ninstanceof：判断自定义构造函数和内置构造函数的实例，但跨 iframe 失效，且不能判断基本类型。\n\nObject.prototype.toString.call()：最准确，返回 [object Type]，能区分 array/date/regexp/null/undefined 等。\n\n大厂面试常考：写一个通用的类型判断函数，用 Object.prototype.toString.call()。"
  },
  // ===== 深拷贝 & 浅拷贝 =====
  {
    category: "拷贝",
    question: "浅拷贝和深拷贝的区别？JS 里哪些方法是浅拷贝？",
    answer: "浅拷贝：只复制第一层属性，嵌套对象复制的是引用。\n深拷贝：递归复制所有层级，新旧对象完全独立。\n\n浅拷贝方法：\n① Object.assign({}, src)\n② 展开运算符 {...src}\n③ Array.prototype.slice()\n④ Array.prototype.concat()\n\n深拷贝：\n① JSON.parse(JSON.stringify(obj))（有局限：不能拷贝函数/Symbol/循环引用）\n② 手写递归深拷贝（处理循环引用需要用 WeakMap 做缓存）"
  },
  {
    category: "拷贝",
    question: "JSON.parse(JSON.stringify(obj)) 做深拷贝有哪些坑？",
    answer: "五个坑：\n① 函数/Symbol/undefined 会被忽略\n② Date 对象会变成字符串，再解析回来不是 Date\n③ 正则表达式会变成空对象 {}\n④ NaN/Infinity 会变成 null\n⑤ 循环引用会直接报错（Maximum call stack size exceeded）\n\n生产环境：用 structuredClone()（浏览器原生，支持循环引用/Date/RegExp/Map/Set）或第三方库（lodash.cloneDeep）。"
  },
  // ===== 函数 =====
  {
    category: "函数",
    question: "函数声明提升和变量提升的区别是什么？",
    answer: "函数声明：整体提升（函数体 + 函数名），可以在声明之前调用。\n\n变量提升：只有声明提升，赋值不提升。var 声明的变量初始化为 undefined；let/const 声明的变量存在 TDZ（暂时性死区），访问会报错。\n\n同名时：函数声明优先级高于变量声明，但变量赋值会覆盖函数声明。\n\n面试常考：\nconsole.log(fn); // 输出函数体（函数声明提升）\nvar fn = 1;       // 变量赋值覆盖\nfunction fn() {}   // 函数声明"
  },
  {
    category: "函数",
    question: "call/apply/bind 的区别？手写一个 bind。",
    answer: "区别：\ncall：立即执行，参数逐个传（fn.call(thisArg, arg1, arg2)）\napply：立即执行，参数以数组形式传（fn.apply(thisArg, [args])）\nbind：返回新函数，不立即执行，参数可以分多次传（柯里化）\n\n手写 bind：\nFunction.prototype.myBind = function(ctx, ...args) {\n  const fn = this;\n  return function(...args2) {\n    return fn.call(ctx, ...args, ...args2);\n  };\n};"
  },
  // ===== 模块化 =====
  {
    category: "模块化",
    question: "CommonJS 和 ES Module 的核心区别是什么？",
    answer: "核心区别：\n① 加载方式：CommonJS 是运行时加载（require 同步加载），ESM 是编译时加载（import 静态分析）\n② 值拷贝 vs 值引用：CommonJS 导出的是值的拷贝（基本类型）或引用（对象类型，但模块缓存后不会再读最新值）；ESM 导出的是活绑定（live binding），原始模块修改后导入方也能看到\n③ this 指向：CommonJS 中 this = module.exports；ESM 中 this = undefined\n④ 顶层的 await：ESM 支持，CommonJS 不支持"
  },
  // ===== 数组方法 =====
  {
    category: "数组方法",
    question: "map/forEach/filter/reduce 各自的使用场景？forEach 能跳出循环吗？",
    answer: "map：映射（一对一转换），返回新数组\nfilter：过滤，返回满足条件的元素组成的新数组\nreduce：聚合（任意累加），功能最强，可以实现 map/filter\nforEach：遍历，无返回值（undefined）\n\nforEach 不能用 break/continue 跳出循环（会报 SyntaxError），只能用 try/catch 抛出异常来提前终止，或者用 some/every（return false/true 可跳出）。\n\n性能：for 循环 > for...of > forEach（V8 优化后差距很小，可忽略）。"
  },
  {
    category: "数组方法",
    question: "以下代码输出什么？\n[1, 2, 3].map(parseInt)",
    answer: "输出：[1, NaN, NaN]\n\n原因：parseInt 接收两个参数（string, radix），map 传给回调三个参数（item, index, array）。\n\n等价于：\nparseInt(1, 0) → 1（radix=0 按十进制解析）\nparseInt(2, 1) → NaN（二进制没有 2）\nparseInt(3, 2) → NaN（二进制没有 3）\n\n解法：用 Number 或一元加号：[1,2,3].map(Number)"
  },
  // ===== 作用域 & 提升 =====
  {
    category: "作用域",
    question: "let/const 的暂时性死区（TDZ）是什么？和 var 的区别？",
    answer: "TDZ：let/const 声明的变量从进入作用域到声明语句之间，变量存在但不可访问，访问会报 ReferenceError。\n\nvar 没有 TDZ：变量提升后初始化为 undefined，在声明前访问得到 undefined（不会报错）。\n\nTDZ 的意义：让开发者更早地发现错误（使用未声明的变量），而不是默默地得到 undefined。\n\n经典场景：\nlet x = x; // ReferenceError（x 在 TDZ 中被读取）\nvar y = y; // OK，y = undefined"
  },
  // ===== 事件 & DOM =====
  {
    category: "事件",
    question: "事件冒泡和事件捕获的区别？addEventListener 的第三个参数？",
    answer: "事件冒泡：从最具体的元素向上传播到最不具体的元素（div → body → html → document）\n事件捕获：从最不具体的元素向下传播到最具体的元素（document → html → body → div）\n\naddEventListener 第三个参数：\nfalse/不传 → 冒泡阶段触发（默认）\ntrue → 捕获阶段触发\n\n事件代理（event delegation）：利用冒泡，在父元素上监听事件，通过 event.target 判断具体子元素，减少事件监听器数量，动态添加的子元素也能触发。"
  },
  // ===== 尾调用 =====
  {
    category: "尾调用优化",
    question: "什么是尾调用优化？为什么非严格模式无法开启？",
    answer: "尾调用：函数最后一步 return 另一个函数调用，且当前栈帧不再被引用。\n\n优化原理：引擎可以复用当前栈帧，不新增栈帧，防止递归深度过大导致栈溢出。\n\n非严格模式无法开启：因为非严格模式下，函数可以通过 arguments.callee 访问自身，通过 f.arguments / f.caller 访问调用栈——这些信息依赖栈帧存在。如果栈帧被复用，这些信息就不准确了。严格模式禁用了这些属性，所以才能安全优化。"
  },
  // ===== 异步编程演进 =====
  {
    category: "异步编程",
    question: "回调地狱的本质是什么？Promise 和 async/await 分别怎么解决的？",
    answer: "本质：异步无返回值，结果只能通过回调参数传递，嵌套形成三角形缩进。\n\nPromise 的解法：让异步有返回值（期约对象），then() 返回新期约实现链式调用，把嵌套三角形拉成直线。\n\nasync/await 的解法：以同步写法写异步，本质是 Promise 的语法糖。解决了 Promise 链式调用中中间值不保留的问题（用变量保存即可，不需要闭包），代码可读性更高。"
  },
  // ===== 迭代器 =====
  {
    category: "迭代器",
    question: "迭代器是快照还是实时引用？有什么内存风险？",
    answer: "迭代器是实时引用，不是快照。迭代器持有集合的引用，集合的变化会反映到迭代过程中。\n\n内存风险：只要迭代器还活着，它引用的集合就不会被 GC 回收。如果集合很大，迭代器又长期持有（比如闭包里保存了迭代器），就会造成内存泄漏。\n\n这也是为什么 for...of 遍历时修改集合要小心——迭代器是实时的，修改会导致不可预期的行为。"
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
