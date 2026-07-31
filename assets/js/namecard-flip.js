/**
 * 成员名片 - 交互式翻转控制器 (ES6+)
 *
 * @description 管理成员名片的 3D 翻转交互。
 *              方案：Pointer Events API (统一 mouse/touch/pen)
 *                    + pointermove 实时追踪拖拽状态
 *                    + click 事件作为兜底触发
 *                    + DOMContentLoaded 确保 DOM 就绪
 *
 * @architecture
 *   ├─ CARD_CONFIG        常量配置（冻结对象，集中管理可调参数）
 *   ├─ EVENT_BINDINGS     事件绑定配置表（数据驱动，避免重复 addEventListener）
 *   ├─ 工具函数            waitForElement / isInteractiveArea / waitForDOMReady
 *   └─ NameCardFlipController  class 封装单张名片的交互状态与事件处理
 *
 * @module NameCardFlip
 */
(() => {
  'use strict';

  /* ═══ 常量配置 ════════════════════════════════════════════════ */
  /**
   * 名片交互配置常量（Object.freeze 防止运行时篡改）。
   * 集中管理所有可调参数，便于维护与调优。
   */
  const CARD_CONFIG = Object.freeze({
    /** @type {string} 名片元素的 DOM ID */
    ID: 'member-card',
    /** @type {number} 区分点击与拖拽的像素阈值（高 DPI + 手抖容忍度） */
    DRAG_THRESHOLD: 12,
    /** @type {number} 翻转冷却时长（毫秒），防止 pointerup 与 click 重复触发 */
    FLIP_COOLDOWN_MS: 200,
    /** @type {number} DOM 元素获取重试间隔（毫秒） */
    RETRY_INTERVAL: 200,
    /** @type {number} DOM 元素获取最大重试次数（Jekyll 可能延迟渲染） */
    MAX_RETRIES: 5,
    /** @type {string} 交互元素选择器：命中时不翻转，交由原生跳转 */
    INTERACTIVE_SELECTOR: 'a, button',
  });

  /**
   * 事件绑定配置表（数据驱动）。
   * 将「事件类型 → 处理器」的映射抽离为数据，统一用 forEach 绑定，
   * 消除 Pointer Events 与降级方案中重复的 addEventListener 调用。
   *
   * @type {Record<string, Array<{type: string, handler: string, options?: Object}>>}
   */
  const EVENT_BINDINGS = {
    /** Pointer Events 链路（Chrome 55+ / Firefox 59+ / Safari 13+） */
    pointer: [
      { type: 'pointerdown', handler: 'onPointerDown' },
      { type: 'pointermove', handler: 'onPointerMove', options: { passive: true } },
      { type: 'pointerup', handler: 'onPointerUp' },
      { type: 'pointercancel', handler: 'onPointerCancel' },
    ],
    /** 降级链路：旧浏览器回退到 mouse + touch */
    fallback: [
      { type: 'mousedown', handler: 'onMouseDown' },
      { type: 'mousemove', handler: 'onMouseMove', options: { passive: true } },
      { type: 'mouseup', handler: 'onMouseUp' },
      { type: 'touchstart', handler: 'onTouchStart', options: { passive: true } },
      { type: 'touchmove', handler: 'onTouchMove', options: { passive: true } },
      { type: 'touchend', handler: 'onTouchEnd' },
    ],
  };

  /* ═══ 工具函数 ════════════════════════════════════════════════ */

  /**
   * 安全获取 DOM 元素，支持多次重试（Jekyll 可能延迟渲染）。
   * @param {string} id - 元素 ID
   * @param {number} [retries] - 剩余重试次数
   * @returns {Promise<HTMLElement|null>}
   */
  const waitForElement = (id, retries = CARD_CONFIG.MAX_RETRIES) =>
    new Promise((resolve) => {
      let remaining = retries;
      const tryGet = () => {
        const el = document.getElementById(id);
        if (el) {
          resolve(el);
          return;
        }
        if (remaining <= 0) {
          console.warn(`[NameCardFlip] 重试超限，未找到名片元素: #${id}`);
          resolve(null);
          return;
        }
        remaining -= 1;
        setTimeout(tryGet, CARD_CONFIG.RETRY_INTERVAL);
      };
      tryGet();
    });

  /**
   * 判断点击目标是否位于交互元素（链接、按钮）。
   * 精准区分两种交互：命中链接/按钮 → 仅跳转；其余区域 → 仅翻转。
   * @param {EventTarget|null} target - 事件目标
   * @returns {boolean}
   */
  const isInteractiveArea = (target) =>
    !!(target && target.closest && target.closest(CARD_CONFIG.INTERACTIVE_SELECTOR));

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

  /* ═══ 翻转控制器 ═══════════════════════════════════════════════ */

  /**
   * 名片翻转控制器
   *
   * 封装单张名片的交互状态与事件处理逻辑，以 class 组织：
   *   - 构造器：缓存 DOM 引用、初始化状态、构建处理器
   *   - 状态管理：recordStart / trackMove（指针追踪）
   *   - 翻转控制：doFlip / updatePointerEvents
   *   - 事件处理：箭头函数集合，固定 this 指向
   *   - 事件绑定：数据驱动，统一 forEach 注册
   */
  class NameCardFlipController {
    /**
     * @param {HTMLElement} card - 名片根元素
     */
    constructor(card) {
      /** @type {HTMLElement} 名片根元素 */
      this.card = card;
      /** @type {HTMLElement|null} 正面元素（用于动态切换 pointer-events） */
      this.frontFace = card.querySelector('.namecard-front');
      /** @type {HTMLElement|null} 背面元素 */
      this.backFace = card.querySelector('.namecard-back');

      /** @type {{ x: number, y: number }} 交互起始位置坐标 */
      this.startPoint = { x: 0, y: 0 };
      /** @type {boolean} 本次交互是否已判定为拖拽（超过阈值） */
      this.isDragging = false;
      /**
       * @type {boolean} 翻转冷却锁
       * 一次「点击」会按序触发 pointerdown→…→pointerup→click，
       * 冷却锁防止 pointerup 翻转后 click 兜底再次反向翻转。
       */
      this.flipLocked = false;

      /* 构建事件处理器（箭头函数固定 this，便于解绑） */
      this.handlers = this.buildHandlers();
    }

    /* ── 指针状态管理 ──────────────────────────────────────── */

    /**
     * 记录指针起始位置 + 重置状态 + 清除残留选区。
     * @param {number} x - 指针 X 坐标
     * @param {number} y - 指针 Y 坐标
     */
    recordStart(x, y) {
      window.getSelection().removeAllRanges();
      this.startPoint = { x, y };
      this.isDragging = false;
    }

    /**
     * 实时追踪指针移动，超过阈值即标记为拖拽。
     * 流式判定：一旦超过即永久标记，避免「抖回去」误判。
     * @param {number} x - 指针 X 坐标
     * @param {number} y - 指针 Y 坐标
     */
    trackMove(x, y) {
      if (this.isDragging) return;
      /* 对象解构：从起始点取出坐标 */
      const { x: sx, y: sy } = this.startPoint;
      const dx = Math.abs(x - sx);
      const dy = Math.abs(y - sy);
      if (dx > CARD_CONFIG.DRAG_THRESHOLD || dy > CARD_CONFIG.DRAG_THRESHOLD) {
        this.isDragging = true;
      }
    }

    /* ── 翻转与交互面切换 ──────────────────────────────────── */

    /**
     * 执行翻转（仅当非拖拽 + 未冷却时）。
     * 同一「点击周期」内仅首次调用会执行，后续被冷却锁拦截。
     * @returns {boolean} 是否实际触发了翻转
     */
    doFlip() {
      if (this.flipLocked || this.isDragging) return false;

      const isFlipped = this.card.classList.toggle('flipped');
      this.flipLocked = true;
      /* 冷却锁：超时后释放 */
      setTimeout(() => { this.flipLocked = false; }, CARD_CONFIG.FLIP_COOLDOWN_MS);
      this.isDragging = false;
      /* 动态切换 pointer-events，确保只有可见面可交互 */
      this.updatePointerEvents(isFlipped);
      return true;
    }

    /**
     * 更新正反面 pointer-events，确保只有可见面可交互。
     * CSS 规则可能被 kramdown 破坏，故通过内联样式强制控制。
     * @param {boolean} isFlipped - 是否处于翻转状态
     */
    updatePointerEvents(isFlipped) {
      if (this.frontFace) this.frontFace.style.pointerEvents = isFlipped ? 'none' : '';
      if (this.backFace) this.backFace.style.pointerEvents = isFlipped ? '' : 'none';
    }

    /* ── 事件处理器构建（箭头函数固定 this 指向）─────────── */

    /**
     * 构建事件处理器集合。
     * @returns {Object<string, Function>} 处理器映射
     */
    buildHandlers() {
      return {
        /* ── Pointer Events ── */
        /** 指针按下：记录起点 + 捕获指针 */
        onPointerDown: (e) => {
          if (e.button !== undefined && e.button !== 0) return;
          if (isInteractiveArea(e.target)) return;
          this.recordStart(e.clientX, e.clientY);
          try {
            /* 捕获后续指针事件（即使移出元素），避免 mouseup 丢失 */
            if (this.card.setPointerCapture) this.card.setPointerCapture(e.pointerId);
          } catch (_) { /* 某些浏览器不支持，静默忽略 */ }
        },
        /** 指针移动：实时追踪拖拽状态 */
        onPointerMove: (e) => this.trackMove(e.clientX, e.clientY),
        /** 指针抬起：判定翻转 + 释放捕获 */
        onPointerUp: (e) => {
          this.trackMove(e.clientX, e.clientY);
          if (isInteractiveArea(e.target)) return;
          this.doFlip();
          try {
            if (this.card.releasePointerCapture) this.card.releasePointerCapture(e.pointerId);
          } catch (_) { /* 静默忽略 */ }
        },
        /** 指针取消：标记为拖拽，阻止后续翻转 */
        onPointerCancel: () => { this.isDragging = true; },

        /* ── 降级方案：mouse + touch（旧浏览器） ── */
        onMouseDown: (e) => {
          if (e.button !== 0) return;
          this.recordStart(e.clientX, e.clientY);
        },
        onMouseMove: (e) => this.trackMove(e.clientX, e.clientY),
        onMouseUp: (e) => {
          this.trackMove(e.clientX, e.clientY);
          this.doFlip();
        },
        onTouchStart: (e) => {
          const { clientX, clientY } = e.touches[0];
          this.recordStart(clientX, clientY);
        },
        onTouchMove: (e) => {
          const { clientX, clientY } = e.touches[0];
          this.trackMove(clientX, clientY);
        },
        onTouchEnd: (e) => {
          const { clientX, clientY } = e.changedTouches[0];
          this.trackMove(clientX, clientY);
          this.doFlip();
        },

        /* ── Click 兜底：Pointer Events 失效时仍能响应 ── */
        onClickFallback: (e) => {
          if (isInteractiveArea(e.target)) return;
          this.doFlip();
        },
      };
    }

    /* ── 事件绑定（数据驱动，数组方法统一注册）─────────────── */

    /**
     * 绑定所有事件监听器。
     * 根据浏览器能力自动选择 Pointer Events 或降级方案，
     * 通过遍历 EVENT_BINDINGS 配置表统一注册，消除重复代码。
     *
     * @returns {boolean} 是否使用了 Pointer Events
     */
    bindEvents() {
      const { card, handlers } = this;
      const supportsPointerEvents = typeof window.PointerEvent !== 'undefined';
      const bindingSet = supportsPointerEvents
        ? EVENT_BINDINGS.pointer
        : EVENT_BINDINGS.fallback;

      /* 数组方法：遍历配置表统一注册事件 */
      bindingSet.forEach(({ type, handler, options }) => {
        card.addEventListener(type, handlers[handler], options);
      });

      /* 永远绑定 click 兜底 */
      card.addEventListener('click', handlers.onClickFallback);

      return supportsPointerEvents;
    }

    /* ── 冒烟测试 ──────────────────────────────────────────── */

    /**
     * 运行冒烟测试，验证关键能力。
     * @param {boolean} supportsPointerEvents - 是否使用了 Pointer Events
     */
    runSmokeTest(supportsPointerEvents) {
      console.assert(this.card !== null, '[NameCardFlip] 名片元素存在');
      console.assert(
        typeof this.card.classList.toggle === 'function',
        '[NameCardFlip] 名片支持 classList.toggle'
      );
      console.log(
        `[NameCardFlip] 初始化成功 | 目标: #${CARD_CONFIG.ID} | ` +
        `PointerEvents: ${supportsPointerEvents ? '✅' : '❌(降级)'} | ` +
        `拖拽阈值: ${CARD_CONFIG.DRAG_THRESHOLD}px`
      );
    }
  }

  /* ═══ 主流程 ══════════════════════════════════════════════════ */

  /**
   * 初始化名片翻转控制器。
   * 流程：等待 DOM 就绪 → 等待名片元素 → 实例化控制器 → 绑定事件 → 冒烟测试。
   */
  const init = async () => {
    await waitForDOMReady();

    const card = await waitForElement(CARD_CONFIG.ID);
    if (!card) return;

    const controller = new NameCardFlipController(card);
    /* 初始化：未翻转时背面不可交互 */
    controller.updatePointerEvents(false);
    const supportsPointerEvents = controller.bindEvents();
    controller.runSmokeTest(supportsPointerEvents);
  };

  /* 启动 */
  init();
})();
