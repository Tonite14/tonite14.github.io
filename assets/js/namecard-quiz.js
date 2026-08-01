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
        question: 'MyGO!!!!! 的出道单曲《迷星叫》（MAYOIUTA）于何时发行？',
        options: ['2021 年 11 月', '2022 年 11 月 9 日', '2023 年 6 月 29 日', '2023 年 11 月 1 日'],
        correct: 1,
        explain: 'MyGO!!!!! 于 2022 年 11 月 9 日发行首张单曲《迷星叫》（MAYOIUTA）。此时成员面貌尚未公开，直到 2023 年 4 月 9 日的 4th LIVE 才正式亮相。',
      },
      {
        question: 'CRYCHIC 解散的直接导火索是什么？',
        options: ['成员间的音乐理念分歧', '祥子在首场演出后突然宣布退出', '学校禁止乐队活动', '经济公司合约终止'],
        correct: 1,
        explain: 'CRYCHIC 在唯一一次演出后，丰川祥子接到一通电话后突然宣布退出并指责燈，随后燈与立希相继退出，乐队随之实质解散。',
      },
      {
        question: '动画《BanG Dream! It\'s MyGO!!!!!》的系列构成（编剧）是谁？',
        options: ['绫奈ゆにこ', '大河内一楼', '虚渊玄', '冈田麿里'],
        correct: 0,
        explain: '动画由绫奈ゆにこ（Yuniko Ayana）担任系列构成，木户康平执导，Sanzigen 制作，以真实细腻的人际关系描写著称。',
      },
      {
        question: '高松燈在笔记本中将自己比作什么生物来隐喻她的孤独？',
        options: ['蚯蚓', '潮虫（西瓜虫）', '蜗牛', '蚂蚁'],
        correct: 1,
        explain: '燈在笔记本中将自己画成一只躲在洞里的潮虫（だんごむし），将 CRYCHIC 成员比作洞口上方的存在，象征他们为她带来了光。',
      },
      {
        question: '丰川祥子在 Ave Mujica 中使用的艺名是？',
        options: ['Mortis', 'Oblivionis', 'Amoris', 'Lethe'],
        correct: 1,
        explain: '祥子在假面乐队 Ave Mujica 中以「Oblivionis」为艺名活动，担任键盘手兼队长，采用哥特戏剧化的美学风格。',
      },
      {
        question: 'MyGO!!!!! 的首张专辑《迷跡波》（Meisekiha）在 Oricon 周榜的最高排名是？',
        options: ['第 1 位', '第 4 位', '第 10 位', '未上榜'],
        correct: 1,
        explain: '首张专辑《迷跡波》于 2023 年 11 月 1 日发行，在 Oricon 周榜最高排名第 4 位，Billboard Japan Hot Albums 排名第 5。',
      },
      {
        question: '燈与祥子初次相遇时，燈递给祥子的是什么物品？',
        options: ['企鹅图案的创可贴', '手帕', '一块石头', '她的笔记本'],
        correct: 0,
        explain: '两人在桥上相遇时，祥子误以为燈要跳桥而扑向她导致擦伤膝盖，燈递给她一枚企鹅图案的创可贴——这是燈难得能为他人做的事。',
      },
      {
        question: 'CRYCHIC 的原创曲目《Haruhikage》在故事中引发了什么重大事件？',
        options: ['成为 MyGO!!!!! 的出道曲', 'MyGO!!!!! 未经祥子许可演奏此曲，导致そよ情绪崩溃', '此曲从未被公开演奏', '祥子借此曲宣布回归'],
        correct: 1,
        explain: '《Haruhikage》是 CRYCHIC 的原创曲。MyGO!!!!! 未经祥子许可演奏此曲，导致長崎そよ情绪崩溃，前 CRYCHIC 成员间的裂痕进一步加深。',
      },
      {
        question: '要楽奈（Rāna）加入 MyGO!!!!! 的契机是什么？',
        options: ['被学校强制分配', '觉得燈「很有趣」', '受そよ委托', '被立希邀请'],
        correct: 1,
        explain: '楽奈是一位天才吉他手，作为局外人加入，理由是她觉得燈「很有趣」。两人之间有着无需多言、通过音乐传达的默契。',
      },
      {
        question: '丰川祥子转学至羽丘女子学园的真正原因是什么？',
        options: ['追随燈的脚步', '家庭破产，为隐藏贫困而从月之森学园转学', '被原学校开除', '为了组建新乐队'],
        correct: 1,
        explain: '祥子原为富裕家庭，就读名门月之森学园。家庭破产后她转入羽丘女子学园以隐藏困境，并秘密打工（如电话接线员）维持生计。',
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
