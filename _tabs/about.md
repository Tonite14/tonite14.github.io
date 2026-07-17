---
title: 关于
icon: fas fa-info
order: 6
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
  min-height: 220px;
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
  .flashcard { min-height: 200px; }
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
    <span class="flashcard-counter" id="card-counter">1 / 10</span>
    <button class="flashcard-btn" onclick="nextCard()"><i class="fas fa-chevron-right"></i></button>
  </div>
</div>

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
