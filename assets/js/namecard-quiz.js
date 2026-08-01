/**
 * BanG Dream! 考据问答控制器 (ES6+)
 *
 * @description 卡片下方的 BanG Dream! 知识问答模块。
 *              题库数据由独立模块 quiz-data.js 提供（window.BANGDREAM_QUIZ_QUESTIONS），
 *              覆盖 BanG Dream! 企划全部官方乐队，共 120 题。
 *              支持即时反馈、解析说明、计分与最佳成绩持久化。
 *
 *              交互流程：
 *                ① 渲染题目 → 用户点击选项
 *                ② 即时反馈（正确/错误 + 解析）→ 显示「下一题」
 *                ③ 末题结束后展示总分 + 最佳成绩（localStorage）
 *                ④ 可重新挑战（重新抽取题目）
 *
 * @architecture
 *   ├─ QUIZ_CONFIG          常量配置（冻结对象：外部题库引用 + 存储 key）
 *   ├─ 工具函数             waitForDOMReady / shuffleArray
 *   └─ BangDreamQuizController  class 封装问答状态机与渲染逻辑
 *
 * @module BangDreamQuiz
 * @depend quiz-data.js（须在本脚本之前加载，提供 window.BANGDREAM_QUIZ_QUESTIONS）
 */
(() => {
  'use strict';

  /* ═══ 常量配置 ════════════════════════════════════════════════ */
  /**
   * 问答配置常量（Object.freeze 防止运行时篡改）。
   * 题库数据来自外部独立模块 quiz-data.js，本文件仅负责流程控制与渲染。
   */
  const QUIZ_CONFIG = Object.freeze({
    /** @type {string} 问答容器元素的 DOM ID */
    CONTAINER_ID: 'mygo-quiz',
    /** @type {string} localStorage 最佳成绩存储键 */
    STORAGE_KEY: 'bangdream-quiz-best-score',

    /** @type {number} 每轮答题数量（从题库中随机抽取） */
    QUESTIONS_PER_ROUND: 10,

    /**
     * 题库（由 quiz-data.js 提供，覆盖 BanG Dream! 全部官方乐队，共 120 题）。
     * 外部模块未加载时降级为空数组，控制器将安全退出。
     * @type {ReadonlyArray<{category: string, difficulty: number, question: string, options: string[], correct: number, explain: string}>}
     */
    QUESTIONS: Object.freeze(window.BANGDREAM_QUIZ_QUESTIONS || []),
  });

  /* ═══ 工具函数 ════════════════════════════════════════════════ */

  /**
   * 等待 DOM 就绪。
   * @returns {Promise<void>}
   */
  const waitForDOMReady = () =>
    document.readyState === 'loading'
      ? new Promise((resolve) =>
          document.addEventListener('DOMContentLoaded', resolve, { once: true })
        )
      : Promise.resolve();

  /**
   * Fisher-Yates 洗牌算法：返回打乱后的新数组（不修改原数组）。
   * @param {ReadonlyArray<T>} arr
   * @returns {T[]}
   * @template T
   */
  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  /* ═══ 问答控制器 ══════════════════════════════════════════════ */

  /**
   * BanG Dream! 考据问答控制器
   *
   * 封装问答状态机与渲染逻辑，以 class 组织：
   *   - 构造器：缓存 DOM 引用、初始化状态、绑定事件
   *   - 状态管理：currentIndex / score / answered
   *   - 渲染：renderQuestion / selectAnswer / showFeedback
   *   - 流程：nextQuestion / showResult / restart
   *   - 持久化：loadBest / saveBest（localStorage）
   */
  class BangDreamQuizController {
    /**
     * @param {HTMLElement} container - 问答根元素
     */
    constructor(container) {
      /** @type {HTMLElement} 问答根元素 */
      this.container = container;
      /** @type {ReadonlyArray<Object>} 完整题库（120 题，来自外部 quiz-data.js） */
      this.pool = QUIZ_CONFIG.QUESTIONS;
      /** @type {Object[]} 本轮随机抽取的题目（QUESTIONS_PER_ROUND 题） */
      this.questions = this.selectQuestions();
      /** @type {number} 本轮总题数 */
      this.total = this.questions.length;
      /** @type {number} 当前题索引（0-based） */
      this.currentIndex = 0;
      /** @type {number} 当前得分 */
      this.score = 0;
      /** @type {boolean} 当前题是否已作答（防重复点击） */
      this.answered = false;

      /* 缓存 DOM 引用（解构赋值） */
      this.els = this.cacheElements(container);

      /* 绑定事件 */
      this.bindEvents();
    }

    /* ── DOM 缓存 ─────────────────────────────────────────── */

    /**
     * 缓存问答区所有 DOM 引用，避免重复查询。
     * @param {HTMLElement} container
     * @returns {Object<string, HTMLElement>}
     */
    cacheElements(container) {
      const ids = [
        'quiz-progress-bar', 'quiz-q-index', 'quiz-q-total',
        'quiz-question', 'quiz-options', 'quiz-feedback',
        'quiz-next-btn', 'quiz-stage', 'quiz-result',
        'quiz-score-text', 'quiz-best', 'quiz-restart-btn',
      ];
      const els = {};
      ids.forEach((id) => { els[id] = container.querySelector(`#${id}`); });
      return els;
    }

    /* ── 题目抽取 ─────────────────────────────────────────── */

    /**
     * 从题库中随机抽取本轮题目（Fisher-Yates 洗牌 + 截取）。
     * 每次调用返回不同的随机子集，确保重玩时低重复度。
     * @returns {Object[]}
     */
    selectQuestions() {
      return shuffleArray(this.pool).slice(0, QUIZ_CONFIG.QUESTIONS_PER_ROUND);
    }

    /* ── 初始化 ───────────────────────────────────────────── */

    /**
     * 初始化问答：设置总题数 → 渲染首题 → 移除加载遮罩触发淡入。
     * 流程与名片加载对齐：渲染完成后经 rAF 切换类名，确保浏览器完成绘制后再显示。
     */
    init() {
      const { total, els, container } = this;
      if (els['quiz-q-total']) els['quiz-q-total'].textContent = total;
      this.renderQuestion();

      /* 与名片对齐：首题渲染经一帧完成后，切换 is-loading → is-ready，触发 0.4s 淡入 */
      requestAnimationFrame(() => {
        container.classList.remove('is-loading');
        container.classList.add('is-ready');
      });
    }

    /* ── 渲染：单题 ───────────────────────────────────────── */

    /**
     * 渲染当前题目：更新进度、题目文本、选项按钮。
     */
    renderQuestion() {
      const { questions, currentIndex, total, els } = this;
      const q = questions[currentIndex];

      this.answered = false;

      /* 更新进度指示 */
      if (els['quiz-q-index']) els['quiz-q-index'].textContent = currentIndex + 1;
      if (els['quiz-progress-bar']) {
        els['quiz-progress-bar'].style.width = `${(currentIndex / total) * 100}%`;
      }

      /* 渲染题目文本 */
      if (els['quiz-question']) els['quiz-question'].textContent = q.question;

      /* 渲染选项按钮（数组方法 + 模板字符串） */
      if (els['quiz-options']) {
        els['quiz-options'].innerHTML = '';
        q.options.forEach((opt, i) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'quiz-option';
          btn.dataset.index = i;
          btn.textContent = opt;
          btn.addEventListener('click', () => this.selectAnswer(i));
          els['quiz-options'].appendChild(btn);
        });
      }

      /* 重置反馈与按钮 */
      if (els['quiz-feedback']) els['quiz-feedback'].hidden = true;
      if (els['quiz-next-btn']) els['quiz-next-btn'].hidden = true;
    }

    /* ── 交互：作答 ───────────────────────────────────────── */

    /**
     * 处理选项点击：判定正误、更新样式、显示反馈。
     * @param {number} index - 所选选项索引
     */
    selectAnswer(index) {
      if (this.answered) return;
      this.answered = true;

      const { questions, currentIndex, els } = this;
      const q = questions[currentIndex];
      const isCorrect = index === q.correct;

      if (isCorrect) this.score += 1;

      /* 更新选项样式：正确项高亮、错误项标红、全部禁用 */
      const optionBtns = els['quiz-options']
        ? els['quiz-options'].querySelectorAll('.quiz-option')
        : [];
      optionBtns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add('is-correct');
        else if (i === index) btn.classList.add('is-wrong');
      });

      /* 显示解析反馈 */
      if (els['quiz-feedback']) {
        els['quiz-feedback'].hidden = false;
        els['quiz-feedback'].className = `quiz-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`;
        els['quiz-feedback'].innerHTML =
          `<span class="quiz-feedback-icon">${isCorrect ? '✓' : '✗'}</span>` +
          `<span class="quiz-feedback-text">${q.explain}</span>`;
      }

      /* 显示下一题 / 查看结果按钮 */
      if (els['quiz-next-btn']) {
        els['quiz-next-btn'].hidden = false;
        els['quiz-next-btn'].textContent =
          currentIndex + 1 >= this.total ? '查看结果' : '下一题';
      }
    }

    /* ── 流程：下一题 / 结果 ─────────────────────────────── */

    /**
     * 推进到下一题，或末题时展示结果。
     */
    nextQuestion() {
      if (this.currentIndex + 1 >= this.total) {
        this.showResult();
      } else {
        this.currentIndex += 1;
        this.renderQuestion();
      }
    }

    /**
     * 展示最终结果：总分 + 最佳成绩（localStorage 持久化）。
     */
    showResult() {
      const { score, total, els } = this;

      /* 进度条满格 */
      if (els['quiz-progress-bar']) els['quiz-progress-bar'].style.width = '100%';

      /* 切换到结果区 */
      if (els['quiz-stage']) els['quiz-stage'].hidden = true;
      if (els['quiz-result']) els['quiz-result'].hidden = false;

      /* 总分：同步 data-text 属性以驱动伪元素辉光层 */
      if (els['quiz-score-text']) {
        const scoreText = `${score} / ${total}`;
        els['quiz-score-text'].textContent = scoreText;
        els['quiz-score-text'].dataset.text = scoreText;
      }

      /* 最佳成绩：破纪录则更新 localStorage */
      const best = this.loadBest();
      if (els['quiz-best']) {
        if (score > best) {
          this.saveBest(score);
          els['quiz-best'].textContent = '新纪录！';
          els['quiz-best'].classList.add('is-new-record');
        } else {
          els['quiz-best'].textContent = `最佳成绩：${best} / ${total}`;
          els['quiz-best'].classList.remove('is-new-record');
        }
      }
    }

    /**
     * 重新挑战：重置状态并渲染首题。
     */
    restart() {
      /* 重新随机抽取题目，确保重玩时题目组合不同 */
      this.questions = this.selectQuestions();
      this.total = this.questions.length;
      this.currentIndex = 0;
      this.score = 0;
      this.answered = false;

      const { els } = this;
      if (els['quiz-q-total']) els['quiz-q-total'].textContent = this.total;
      if (els['quiz-stage']) els['quiz-stage'].hidden = false;
      if (els['quiz-result']) els['quiz-result'].hidden = true;

      this.renderQuestion();
    }

    /* ── 持久化：localStorage ────────────────────────────── */

    /**
     * 读取历史最佳成绩。
     * @returns {number}
     */
    loadBest() {
      try {
        return parseInt(localStorage.getItem(QUIZ_CONFIG.STORAGE_KEY), 10) || 0;
      } catch (_) {
        /* localStorage 不可用时静默降级 */
        return 0;
      }
    }

    /**
     * 保存最佳成绩。
     * @param {number} score
     */
    saveBest(score) {
      try {
        localStorage.setItem(QUIZ_CONFIG.STORAGE_KEY, String(score));
      } catch (_) {
        /* 静默忽略写入失败 */
      }
    }

    /* ── 事件绑定 ─────────────────────────────────────────── */

    /**
     * 绑定按钮事件（箭头函数固定 this 指向）。
     */
    bindEvents() {
      const { els } = this;
      if (els['quiz-next-btn']) {
        els['quiz-next-btn'].addEventListener('click', () => this.nextQuestion());
      }
      if (els['quiz-restart-btn']) {
        els['quiz-restart-btn'].addEventListener('click', () => this.restart());
      }
    }
  }

  /* ═══ 主流程 ══════════════════════════════════════════════════ */

  /**
   * 初始化考据问答控制器。
   * 流程：等待 DOM 就绪 → 校验题库 → 查找容器 → 实例化控制器 → 初始化。
   */
  const init = async () => {
    await waitForDOMReady();

    /* 题库外部模块未加载时安全退出 */
    if (!QUIZ_CONFIG.QUESTIONS || QUIZ_CONFIG.QUESTIONS.length === 0) {
      console.warn('[BangDreamQuiz] 题库未加载（quiz-data.js 缺失），问答模块跳过初始化');
      return;
    }

    const container = document.getElementById(QUIZ_CONFIG.CONTAINER_ID);
    /* 非 about 页无问答容器，静默退出 */
    if (!container) return;

    const controller = new BangDreamQuizController(container);
    controller.init();
    console.log(`[BangDreamQuiz] 考据问答初始化成功 | 题库: ${controller.pool.length}题 | 本轮: ${controller.total}题`);
  };

  /* 启动 */
  init();
})();
