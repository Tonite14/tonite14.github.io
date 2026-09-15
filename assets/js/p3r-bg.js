/**
 * Persona 3 Reload — 背景视差控制器
 *
 * @description 为 P3R 背景各层提供轻量级视差滚动效果。
 *              仅监听 scroll 事件，通过 transform: translate3d 实现 GPU 加速的视差位移。
 *              严格遵循 prefers-reduced-motion 偏好，尊重用户设置。
 *
 * @module P3RBackground
 * @performance 仅在需要时启用，使用 passive listener + rAF 节流
 */
(() => {
  'use strict';

  /* ── 配置常量 ── */
  const PARALLAX_CONFIG = Object.freeze({
    /** 各层视差速度（值越大位移越明显，建议 0 ~ 0.3） */
    speeds: {
      slow:   0.05,   // 渐变/网格层：轻微漂移
      medium: 0.12,   // 水波/焦散层：中等视差
      fast:   0.22,   // 几何装饰层：明显视差
    },
    /** rAF 节流间隔（ms） */
    throttleMs: 16,
  });

  /* ── 工具函数 ── */

  /**
   * 检测是否应禁用动画。
   * @returns {boolean}
   */
  const shouldDisableMotion = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    // 移动端禁用视差以节省性能
    if (window.innerWidth < 576) {
      return true;
    }
    return false;
  };

  /**
   * 安全获取滚动 Y 偏移。
   * @returns {number}
   */
  const getScrollY = () => {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  };

  /* ── 视差控制器 ── */

  /**
   * P3R 背景视差控制器
   *
   * 职责：
   *   - 管理背景各层的视差位移
   *   - 节流 scroll 事件，使用 rAF 批量更新
   *   - 组件卸载时清理事件监听
   */
  class P3RBackgroundController {
    /**
     * @param {HTMLElement} container - P3R 背景根容器
     */
    constructor(container) {
      /** @type {HTMLElement} */
      this.container = container;

      /** @type {Map<string, HTMLElement[]>} 按视差速度分组的层 */
      this.layers = new Map();

      /** @type {boolean} 是否启用视差 */
      this.enabled = !shouldDisableMotion();

      /** @type {number} 最近一次更新时间戳 */
      this.lastUpdate = 0;

      /** @type {?Function} 解绑函数引用 */
      this._unbindScroll = null;
    }

    /**
     * 初始化：收集层引用 + 绑定事件。
     * @returns {void}
     */
    init() {
      this.collectLayers();

      if (this.enabled) {
        this.bindScroll();
      }

      // 首次立即同步位置
      this.update(getScrollY());

      // 监听主题变化（暗/亮切换可能影响背景）
      this.observeThemeChange();
    }

    /**
     * 收集所有视差层并按 data-parallax 属性分组。
     * @returns {void}
     */
    collectLayers() {
      const nodes = this.container.querySelectorAll('[data-parallax]');
      nodes.forEach((node) => {
        const speed = node.dataset.parallax || 'medium';
        if (!this.layers.has(speed)) {
          this.layers.set(speed, []);
        }
        this.layers.get(speed).push(node);
      });
    }

    /**
     * 绑定滚动事件（passive + rAF 节流）。
     * @returns {void}
     */
    bindScroll() {
      let ticking = false;

      const onScroll = () => {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
          const now = performance.now();
          if (now - this.lastUpdate >= PARALLAX_CONFIG.throttleMs) {
            this.update(getScrollY());
            this.lastUpdate = now;
          }
          ticking = false;
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      this._unbindScroll = () => {
        window.removeEventListener('scroll', onScroll, { passive: true });
      };
    }

    /**
     * 根据滚动偏移更新所有层的视差位置。
     * @param {number} scrollY - 当前滚动 Y 偏移
     * @returns {void}
     */
    update(scrollY) {
      this.layers.forEach((nodes, speed) => {
        const factor = PARALLAX_CONFIG.speeds[speed] || 0.1;
        const translateY = scrollY * factor;

        nodes.forEach((node) => {
          node.style.transform = `translate3d(0, ${-translateY}px, 0)`;
        });
      });
    }

    /**
     * 监听 prefers-color-scheme 变化，动态调整启用状态。
     * @returns {void}
     */
    observeThemeChange() {
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handler = (e) => {
        this.enabled = !e.matches;
        if (!this.enabled && this._unbindScroll) {
          this._unbindScroll();
          this._unbindScroll = null;
        } else if (this.enabled && !this._unbindScroll) {
          this.bindScroll();
        }
      };

      // 兼容新旧 API
      if (mql.addEventListener) {
        mql.addEventListener('change', handler);
      } else if (mql.addListener) {
        mql.addListener(handler);
      }
    }

    /**
     * 销毁：清理事件监听。
     * @returns {void}
     */
    destroy() {
      if (this._unbindScroll) {
        this._unbindScroll();
        this._unbindScroll = null;
      }
      this.layers.clear();
    }
  }

  /* ── 启动 ── */

  /**
   * 初始化 P3R 背景系统。
   * @returns {Promise<void>}
   */
  const init = async () => {
    // 等待 DOM 就绪
    if (document.readyState === 'loading') {
      await new Promise((resolve) =>
        document.addEventListener('DOMContentLoaded', resolve, { once: true })
      );
    }

    const container = document.querySelector('.p3r-bg');
    if (!container) return;

    // 检测 about 页面
    const page = document.querySelector('.p3r-page');
    if (!page) return;

    // 添加 body class 作为 :has() 的降级方案
    document.body.classList.add('p3r-mode');

    const controller = new P3RBackgroundController(container);
    controller.init();

    // 暴露到全局（便于调试和外部控制）
    window.__p3rBackground = controller;

    console.info('[P3R Background] 初始化完成');
  };

  init();
})();
