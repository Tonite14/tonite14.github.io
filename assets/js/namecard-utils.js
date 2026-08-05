/**
 * 名片模块共享工具函数 (ES6+)
 *
 * @description 为 namecard-flip.js / namecard-loader.js / namecard-quiz.js
 *              提供公共工具函数，消除 3 处重复的 waitForDOMReady 定义。
 *
 * @module NamecardUtils
 * @version 1.0.0
 * @since 2026-08-05
 */
window.NamecardUtils = (() => {
  'use strict';

  /**
   * 等待 DOM 就绪（DOMContentLoaded）。
   * 若 DOM 已解析完成则立即 resolve。
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
   * 安全获取 DOM 元素，支持多次重试。
   * @param {string} id - 元素 ID
   * @param {number} [retries=5] - 最大重试次数
   * @param {number} [interval=200] - 重试间隔（毫秒）
   * @returns {Promise<HTMLElement|null>}
   */
  const waitForElement = (id, retries = 5, interval = 200) =>
    new Promise((resolve) => {
      let remaining = retries;
      const tryGet = () => {
        const el = document.getElementById(id);
        if (el) { resolve(el); return; }
        if (remaining <= 0) { resolve(null); return; }
        remaining -= 1;
        setTimeout(tryGet, interval);
      };
      tryGet();
    });

  /**
   * 懒加载脚本文件（动态注入 <script>）。
   * @param {string} src - 脚本 URL
   * @returns {Promise<void>}
   */
  const lazyLoadScript = (src) =>
    new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.body.appendChild(s);
    });

  return { waitForDOMReady, waitForWindowLoad, waitForElement, lazyLoadScript };
})();
