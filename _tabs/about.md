---
title: 关于
icon: fas fa-info
order: 5
---

- ### Tonite14

  - a rookie about FrontEnd
  - a rookie about AI Security
  - Wer spricht von Siegen? Überstehn ist Alles

<!-- JS Flashcard Section -->
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
    <button class="flashcard-btn" onclick="prevCard()">
      <i class="fas fa-chevron-left"></i>
    </button>
    <span class="flashcard-counter" id="card-counter">1 / 10</span>
    <button class="flashcard-btn" onclick="nextCard()">
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</div>

<script>
// JS Flashcard Data - Based on 《JavaScript高级程序设计》DAY1-15
const flashcardData = [
  {
    category: "数组",
    question: "Array.isArray() 和 instanceof Array 有何区别？",
    answer: "① instanceof 跨 iframe/Realm 失效：每个 iframe 有独立的 Array.prototype，instanceof 比较 prototype 引用，跨 Realm 引用不同。\n② Array.isArray() 检查内部 [[Class]] 标记（'Array'），不受 Realm 影响。\n★ 面试必问：推荐始终使用 Array.isArray()。"
  },
  {
    category: "操作符",
    question: "扩展运算符(...)和剩余运算符(...)如何区分？",
    answer: "同一语法，引擎根据上下文自动判断：\n★ 扩展（Spread）：在'提供值'位置，将数组元素逐个展开。\n  例：[...arr1, ...arr2]\n★ 剩余（Rest）：在'接收值'位置，收集剩余元素成数组。\n  例：function fn(...args) / const [first, ...rest] = arr"
  },
  {
    category: "数组方法",
    question: "fill() 和 copyWithin() 有何异同？",
    answer: "相同点：\n★ 作用于 [start, end) 左闭右开区间\n★ 不改变数组大小\n★ 支持负索引，静默忽略无效范围\n\n不同点：\n★ fill(value, start, end)：用指定值填充范围\n★ copyWithin(target, start, end)：复制范围内容插入到 target 位置"
  },
  {
    category: "迭代器",
    question: "什么是迭代器(Iterator)？它有什么特点？",
    answer: "迭代器是提供统一遍历接口的对象：\n★ 迭代器对象必须有 next() 方法，返回 {done, value}\n★ for...of 自动调用 next()，done=true 时停止\n★ 节省内存：按需取出元素，不用一次性加载全部\n★ 迭代器本身是线性结构，指针只能前移"
  },
  {
    category: "Map vs Object",
    question: "Map 和 Object 有什么区别？何时用 Map？",
    answer: "对比表：\n| 特性 | Map | Object |\n|------|-----|--------|\n| 键类型 | 任意类型 | 字符串/Symbol |\n| 顺序 | 保持插入顺序 | 不保证（ES6+保持） |\n| 大小 | size 属性 | 需手动计算 |\n| 迭代 | 原生可迭代 | 需 Object.keys() |\n\n★ 用 Map：键可能是非字符串、需迭代、频繁增删"
  },
  {
    category: "Map 键相等",
    question: "Map 如何判断键相等？SameValueZero 是什么？",
    answer: "Map 使用 SameValueZero 算法判断键相等：\n★ NaN === NaN 视为相等（Object 用 ===，NaN!==NaN）\n★ +0 和 -0 视为相等\n★ 对象键：引用相等，同一对象实例才视为相等\n\n★ 注意：修改对象属性的值不影响键的身份识别"
  },
  {
    category: "原型链",
    question: "什么是原型链？instanceof 的底层原理是什么？",
    answer: "原型链：对象 → 构造函数.prototype → 更上层.prototype → ... → Object.prototype → null\n\n★ instanceof 原理：检查对象的原型链中是否存在构造函数的 prototype\n★ 语法：obj instanceof Constructor\n★ 本质：遍历 obj 的原型链，检查是否有 Constructor.prototype\n★ 跨 iframe 失效原因：每个 iframe 有独立的原型链"
  },
  {
    category: "属性描述符",
    question: "数据属性和访问器属性有什么区别？",
    answer: "数据属性：\n★ value：属性值\n★ writable：是否可写\n★ enumerable：是否可枚举\n★ configurable：是否可配置\n\n访问器属性：\n★ get：读取时调用的函数\n★ set：写入时调用的函数\n★ enumerable、configivable 同上\n\n★ 不能同时存在 value 和 get/set"
  },
  {
    category: "this 绑定",
    question: "箭头函数的 this 有什么特殊之处？",
    answer: "★ 箭头函数没有自己的 this，arguments，super，new.target\n★ 箭头函数的 this 继承外层作用域的 this（定义时确定，终身不变）\n★ 适用于回调函数中保持 this 场景\n★ 不适用：对象方法、构造函数、需要动态 this 的场景"
  },
  {
    category: "异步编程",
    question: "Promise.all() 和 Promise.race() 的区别？",
    answer: "Promise.all(promises)：\n★ 全部 resolved → resolved，返回所有结果数组\n★ 任一 rejected → rejected，返回第一个拒绝原因\n\nPromise.race(promises)：\n★ 返回最先 settled（resolved 或 rejected）的结果\n★ 用途：设置超时、竞态处理\n\n★ 注意：空数组情况不同（all → resolved，race → pending）"
  }
];

let currentCardIndex = 0;

function renderCard() {
  const card = flashcardData[currentCardIndex];
  document.getElementById('card-question').textContent = card.question;
  document.getElementById('card-category').textContent = card.category;
  document.getElementById('card-answer').textContent = card.answer;
  document.getElementById('card-counter').textContent = `${currentCardIndex + 1} / ${flashcardData.length}`;
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

// Initialize
renderCard();
</script>
