/**
 * 成员名片 - 交互式翻转控制器
 *
 * @description 管理成员名片的 3D 翻转交互。
 *              方案：Pointer Events API (统一 mouse/touch/pen)
 *                    + pointermove 实时追踪拖拽状态
 *                    + click 事件作为兜底触发
 *                    + DOMContentLoaded 确保 DOM 就绪
 *
 * @module NameCardFlip
 */
(function () {
  'use strict';

  /* ─── 常量定义 ─────────────────────────────────────────────── */
  /** @type {string} 名片元素的 DOM ID */
  var CARD_ID = 'member-card';

  /**
   * @type {number} 区分点击与拖拽的像素阈值
   * 放宽至 12px：高 DPI 屏幕 + 正常手抖的容忍度
   */
  var DRAG_THRESHOLD = 12;

  /* ─── 工具函数 ─────────────────────────────────────────────── */

  /**
   * 安全获取名片 DOM 元素，支持多次重试（Jekyll 可能延迟渲染）
   * @param {number} retries 剩余重试次数
   * @returns {Promise<HTMLElement>}
   */
  function getCardElement(retries) {
    retries = retries || 5;
    return new Promise(function (resolve) {
      (function tryGet() {
        var el = document.getElementById(CARD_ID);
        if (el) {
          resolve(el);
          return;
        }
        if (retries <= 0) {
          console.warn('[NameCardFlip] 重试超限，未找到名片元素:', CARD_ID);
          resolve(null);
          return;
        }
        retries--;
        setTimeout(tryGet, 200);
      })();
    });
  }

  /* ─── 主流程 ───────────────────────────────────────────────── */

  async function init() {
    /* 确保 DOM 已完全就绪 */
    if (document.readyState === 'loading') {
      await new Promise(function (r) {
        document.addEventListener('DOMContentLoaded', r, { once: true });
      });
    }

    /** @type {HTMLElement | null} */
    var card = await getCardElement();
    if (!card) return;

    /* 获取正反面元素，用于动态切换 pointer-events */
    var frontFace = card.querySelector('.namecard-front');
    var backFace = card.querySelector('.namecard-back');

    /**
     * 更新正反面的 pointer-events，确保只有可见面可交互。
     * CSS 中的 pointer-events 规则可能被 kramdown 破坏导致不生效，
     * 因此通过 JS 内联样式强制控制。
     * @param {boolean} isFlipped - 当前是否处于翻转状态
     */
    function updatePointerEvents(isFlipped) {
      if (frontFace) frontFace.style.pointerEvents = isFlipped ? 'none' : '';
      if (backFace) backFace.style.pointerEvents = isFlipped ? '' : 'none';
    }

    /* 初始化：未翻转时背面不可交互 */
    updatePointerEvents(false);

    /* ─── 状态变量（闭包，每个名片一份）─────────────────────── */
    /** @type {{ x: number, y: number }} 交互起始位置坐标 */
    var startPoint = { x: 0, y: 0 };

    /** @type {boolean} 本次交互是否已判定为拖拽（超过阈值） */
    var isDragging = false;

    /**
     * @type {boolean} 翻转冷却锁
     * 浏览器中，用户的一次「点击」会按顺序触发：
     *   pointerdown → pointermove → pointerup → mousedown → mouseup → click
     * 如果不做去重，pointerup 触发一次翻转后，click 兜底会再翻一次，
     * 两者相互抵消，用户看起来就是「点击没反应」。
     * 冷却锁：一次成功翻转后，在 FLIP_COOLDOWN_MS 内不再响应其他翻转请求。
     */
    var flipLocked = false;

    /**
     * @type {number} 冷却时间（毫秒）
     * 浏览器一次点击周期内，pointerup 与 click 之间的间隔通常 < 30ms，
     * 设置 200ms 留有充足余量，同时不影响用户主动快速双击（正常>200ms）。
     */
    var FLIP_COOLDOWN_MS = 200;

    /* ─── 核心逻辑 ────────────────────────────────────────── */

    /**
     * 记录指针起始位置 + 重置状态 + 清除残留选区。
     * @param {number} x - 指针 X 坐标
     * @param {number} y - 指针 Y 坐标
     */
    function recordStart(x, y) {
      window.getSelection().removeAllRanges();
      startPoint.x = x;
      startPoint.y = y;
      isDragging = false;
    }

    /**
     * 实时追踪指针移动，超过阈值即标记为拖拽。
     * 采用流式判定：一旦超过就永久标记为拖拽，避免「抖回去」误判。
     *
     * @param {number} x - 指针 X 坐标
     * @param {number} y - 指针 Y 坐标
     */
    function trackMove(x, y) {
      if (isDragging) return;
      var dx = Math.abs(x - startPoint.x);
      var dy = Math.abs(y - startPoint.y);
      if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
        isDragging = true;
      }
    }

    /**
     * 执行翻转（仅当非拖拽 + 未冷却时）。
     * 同一「点击周期」内仅首次调用会执行，后续调用被冷却锁拦截。
     * @returns {boolean} 是否实际触发了翻转
     */
    function doFlip() {
      if (flipLocked) return false;
      if (isDragging) return false;
      /* 翻转 + 加锁 */
      var isFlipped = card.classList.toggle('flipped');
      flipLocked = true;
      /* 冷却锁防止同一次点击的后续事件再次反向翻转 */
      setTimeout(function () { flipLocked = false; }, FLIP_COOLDOWN_MS);
      /* 拖拽标记清除 */
      isDragging = false;
      /* 动态切换 pointer-events，确保只有可见面可交互 */
      updatePointerEvents(isFlipped);
      return true;
    }

    /* ─── Pointer Events（统一处理鼠标 / 触控 / 手写笔）───────── */
    /* 兼容性：Chrome 55+ (2016)、Firefox 59+ (2018)、Safari 13+ (2019) */
    var SUPPORTS_POINTER_EVENTS = typeof window.PointerEvent !== 'undefined';

    /** @param {PointerEvent} e */
    function onPointerDown(e) {
      /* 只响应左键（鼠标）/ 主按钮（触控） */
      if (e.button !== undefined && e.button !== 0) return;
      recordStart(e.clientX, e.clientY);
      try {
        /* 捕获后续指针事件（即使移出元素范围），避免 mouseup 丢失问题 */
        if (card.setPointerCapture) card.setPointerCapture(e.pointerId);
      } catch (_) { /* 某些浏览器不支持，静默忽略 */ }
    }

    /** @param {PointerEvent} e */
    function onPointerMove(e) {
      trackMove(e.clientX, e.clientY);
    }

    /**
     * 判断点击目标是否位于交互区域（链接、按钮等），
     * 避免点击这些区域时触发卡片翻转。
     * @param {EventTarget} target - 事件目标
     * @returns {boolean}
     */
    function isInteractiveArea(target) {
      if (!target || !target.closest) return false;
      return !!target.closest('a, button, .namecard-social, .links-section');
    }

    /** @param {PointerEvent} e */
    function onPointerUp(e) {
      trackMove(e.clientX, e.clientY);
      /* 点击的是链接区域时不翻转，让链接正常跳转 */
      if (isInteractiveArea(e.target)) return;
      doFlip();
      try {
        if (card.releasePointerCapture) card.releasePointerCapture(e.pointerId);
      } catch (_) { /* 静默忽略 */ }
    }

    /* ─── 兜底：Click 事件 ────────────────────────────────────── */
    /* 在 Pointer Events 链路因任何原因失效时，click 仍能响应。 */
    /* 此时 isDragging 由 pointermove 已设定，若用户真正拖拽则不会翻转。 */
    function onClickFallback(e) {
      /* 点击的是链接区域时不翻转，让链接正常跳转 */
      if (isInteractiveArea(e.target)) return;
      doFlip();
    }

    /* ─── 绑定事件监听 ────────────────────────────────────────── */
    if (SUPPORTS_POINTER_EVENTS) {
      card.addEventListener('pointerdown', onPointerDown);
      card.addEventListener('pointermove', onPointerMove, { passive: true });
      card.addEventListener('pointerup', onPointerUp);
      card.addEventListener('pointercancel', function () { isDragging = true; });
    } else {
      /* 降级方案：旧浏览器回退到 mouse + touch */
      card.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return;
        recordStart(e.clientX, e.clientY);
      });
      card.addEventListener('mousemove', function (e) { trackMove(e.clientX, e.clientY); }, { passive: true });
      card.addEventListener('mouseup', function (e) {
        trackMove(e.clientX, e.clientY);
        doFlip();
      });
      card.addEventListener('touchstart', function (e) {
        var t = e.touches[0];
        recordStart(t.clientX, t.clientY);
      }, { passive: true });
      card.addEventListener('touchmove', function (e) {
        var t = e.touches[0];
        trackMove(t.clientX, t.clientY);
      }, { passive: true });
      card.addEventListener('touchend', function (e) {
        var t = e.changedTouches[0];
        trackMove(t.clientX, t.clientY);
        doFlip();
      });
    }

    /* 永远绑定 click 兜底 */
    card.addEventListener('click', onClickFallback);

    /* ─── 冒烟测试 ────────────────────────────────────────── */
    console.assert(card !== null, '[NameCardFlip] 名片元素存在');
    console.assert(typeof card.classList.toggle === 'function', '[NameCardFlip] 名片支持 classList.toggle');
    console.log(
      '[NameCardFlip] 初始化成功 | 目标: #%s | PointerEvents: %s | 拖拽阈值: %spx',
      CARD_ID,
      SUPPORTS_POINTER_EVENTS ? '✅' : '❌(降级)',
      DRAG_THRESHOLD
    );
  }

  /* 启动 */
  init();
})();
