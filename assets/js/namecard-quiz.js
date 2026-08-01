/**
 * MyGO!!!!! 考据问答控制器 (ES6+)
 *
 * @description 卡片下方的 MyGO!!!!! 知识问答模块。
 *              支持即时反馈、解析说明、计分与最佳成绩持久化。
 *
 *              交互流程：
 *                ① 渲染题目 → 用户点击选项
 *                ② 即时反馈（正确/错误 + 解析）→ 显示「下一题」
 *                ③ 末题结束后展示总分 + 最佳成绩（localStorage）
 *                ④ 可重新挑战
 *
 * @architecture
 *   ├─ QUIZ_CONFIG          常量配置（冻结对象：题库 + 存储 key）
 *   ├─ 工具函数             waitForDOMReady
 *   └─ MyGOQuizController   class 封装问答状态机与渲染逻辑
 *
 * @module MyGOQuiz
 */
(() => {
  'use strict';

  /* ═══ 常量配置 ════════════════════════════════════════════════ */
  /**
   * 问答配置常量（Object.freeze 防止运行时篡改）。
   * 题库数据与可调参数集中管理，便于维护与扩展。
   */
  const QUIZ_CONFIG = Object.freeze({
    /** @type {string} 问答容器元素的 DOM ID */
    CONTAINER_ID: 'mygo-quiz',
    /** @type {string} localStorage 最佳成绩存储键 */
    STORAGE_KEY: 'mygo-quiz-best-score',

    /**
     * 题库（MyGO!!!!! 考据，数据已校验）。
     * @type {ReadonlyArray<{question: string, options: string[], correct: number, explain: string}>}
     */
    QUESTIONS: Object.freeze([
      {
        question: 'MyGO!!!!! 乐队共有几名成员？',
        options: ['4 名', '5 名', '6 名', '7 名'],
        correct: 1,
        explain: 'MyGO!!!!! 由高松燈、千早愛音、要楽奈、長崎そよ、椎名立希五人组成。',
      },
      {
        question: '高松燈在 MyGO!!!!! 中担任什么位置？',
        options: ['主唱', '吉他手', '贝斯手', '鼓手'],
        correct: 0,
        explain: '高松燈是 MyGO!!!!! 的主唱，同时负责歌词创作，常在笔记本上记录灵感。',
      },
      {
        question: 'TV 动画《BanG Dream! It\'s MyGO!!!!!》于哪一年播出？',
        options: ['2021 年', '2022 年', '2023 年', '2024 年'],
        correct: 2,
        explain: '动画于 2023 年 6 月 29 日至 9 月 14 日播出，共 13 话，由 Sanzigen 制作。',
      },
      {
        question: 'MyGO!!!!! 是在哪个乐队解散后成立的？',
        options: ['Roselia', 'Poppin\'Party', 'CRYCHIC', 'Ave Mujica'],
        correct: 2,
        explain: 'MyGO!!!!! 成立于 CRYCHIC 解散之后，長崎そよ与椎名立希曾属 CRYCHIC。',
      },
      {
        question: '谁作为转学生主动招募高松燈组建乐队？',
        options: ['長崎そよ', '椎名立希', '千早愛音', '要楽奈'],
        correct: 2,
        explain: '千早愛音转入羽丘女子学园后，因羡慕校内乐队文化而主动招募燈。',
      },
    ]),
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

  /* ═══ 问答控制器 ══════════════════════════════════════════════ */

  /**
   * MyGO!!!!! 考据问答控制器
   *
   * 封装问答状态机与渲染逻辑，以 class 组织：
   *   - 构造器：缓存 DOM 引用、初始化状态、绑定事件
   *   - 状态管理：currentIndex / score / answered
   *   - 渲染：renderQuestion / selectAnswer / showFeedback
   *   - 流程：nextQuestion / showResult / restart
   *   - 持久化：loadBest / saveBest（localStorage）
   */
  class MyGOQuizController {
    /**
     * @param {HTMLElement} container - 问答根元素
     */
    constructor(container) {
      /** @type {HTMLElement} 问答根元素 */
      this.container = container;
      /** @type {ReadonlyArray<Object>} 题库引用 */
      this.questions = QUIZ_CONFIG.QUESTIONS;
      /** @type {number} 总题数 */
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

    /* ── 初始化 ───────────────────────────────────────────── */

    /**
     * 初始化问答：设置总题数并渲染首题。
     */
    init() {
      const { total, els } = this;
      if (els['quiz-q-total']) els['quiz-q-total'].textContent = total;
      this.renderQuestion();
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

      /* 总分 */
      if (els['quiz-score-text']) els['quiz-score-text'].textContent = `${score} / ${total}`;

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
      this.currentIndex = 0;
      this.score = 0;
      this.answered = false;

      const { els } = this;
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
   * 流程：等待 DOM 就绪 → 查找容器 → 实例化控制器 → 初始化。
   */
  const init = async () => {
    await waitForDOMReady();

    const container = document.getElementById(QUIZ_CONFIG.CONTAINER_ID);
    /* 非 about 页无问答容器，静默退出 */
    if (!container) return;

    const controller = new MyGOQuizController(container);
    controller.init();
    console.log(`[MyGOQuiz] 考据问答初始化成功 | 题目数: ${controller.total}`);
  };

  /* 启动 */
  init();
})();
