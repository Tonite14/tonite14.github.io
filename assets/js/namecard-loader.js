/**
 * 名片加载状态控制器 (ES6+)
 *
 * @description 等待卡片所有资源（字体、背景图、样式）加载完成后，
 *              移除加载状态，触发卡片整体淡入。
 *
 *              等待策略（取最先完成者）：
 *                ① window.load + document.fonts.ready 全部就绪 → 正常淡入
 *                ② MAX_WAIT_MS 超时 → 强制淡入（防止资源加载失败导致永久卡死）
 *
 *              淡入后所有交互（翻转、印章悬停）立即可用，因为事件监听
 *              已由 namecard-flip.js / namecard-stamp.js 在 DOM 就绪时绑定，
 *              仅 pointer-events 被 is-loading 类临时禁用。
 *
 * @architecture
 *   ├─ LOADER_CONFIG   常量配置（冻结对象）
 *   ├─ 工具函数         waitForDOMReady / waitForWindowLoad / waitForFonts
 *   └─ init            主流程：等待资源 → rAF → 切换类名
 *
 * @module NameCardLoader
 */
(() => {
  'use strict';

  /* ═══ 常量配置 ════════════════════════════════════════════════ */
  /**
   * 加载状态配置常量（Object.freeze 防止运行时篡改）。
   */
  const LOADER_CONFIG = Object.freeze({
    /** @type {number} 最大等待时长（毫秒），超时后强制显示卡片 */
    MAX_WAIT_MS: 3000,
    /** @type {string} 场景元素选择器 */
    SCENE_SELECTOR: '.namecard-scene',
    /** @type {string} 加载中状态类名（HTML 初始携带） */
    LOADING_CLASS: 'is-loading',
    /** @type {string} 就绪状态类名（JS 添加以触发淡入） */
    READY_CLASS: 'is-ready',
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
   * 等待 window.load 事件（所有资源包括图片加载完成）。
   * @returns {Promise<void>}
   */
  const waitForWindowLoad = () =>
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) =>
          window.addEventListener('load', resolve, { once: true })
        );

  /**
   * 等待字体加载完成（display=optional 下通常极快）。
   * @returns {Promise<void>}
   */
  const waitForFonts = () =>
    document.fonts && document.fonts.ready
      ? document.fonts.ready
      : Promise.resolve();

  /* ═══ 主流程 ══════════════════════════════════════════════════ */

  /**
   * 初始化加载状态控制器。
   *
   * 流程：
   *   1. 等待 DOM 就绪
   *   2. 查找场景元素（不存在则退出，不影响其他页面）
   *   3. 竞速等待：资源全就绪 vs 超时兜底
   *   4. requestAnimationFrame 后切换类名，确保浏览器完成渲染再淡入
   */
  const init = async () => {
    await waitForDOMReady();

    const scene = document.querySelector(LOADER_CONFIG.SCENE_SELECTOR);
    /* 非 about 页无场景元素，静默退出 */
    if (!scene) return;

    const { MAX_WAIT_MS, LOADING_CLASS, READY_CLASS } = LOADER_CONFIG;

    /* 超时兜底 Promise：防止资源加载失败导致卡片永久隐藏 */
    const timeoutFallback = new Promise((resolve) =>
      setTimeout(resolve, MAX_WAIT_MS)
    );

    /* 正常路径：等待 window.load + 字体就绪 */
    const allResourcesReady = Promise.all([
      waitForWindowLoad(),
      waitForFonts(),
    ]);

    /* 竞速：资源先就绪 → 完美淡入；超时先到 → 强制淡入 */
    await Promise.race([allResourcesReady, timeoutFallback]);

    /* rAF：确保当前帧渲染完毕后再切换类名，避免淡入时仍有未绘制内容 */
    requestAnimationFrame(() => {
      scene.classList.remove(LOADING_CLASS);
      scene.classList.add(READY_CLASS);
      console.log('[NameCardLoader] 卡片加载完成，触发淡入');
    });
  };

  init();
})();
