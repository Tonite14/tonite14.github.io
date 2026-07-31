/**
 * 印章悬停交互控制器 (ES6+)
 *
 * @description 管理 MyGO! 印章的悬停交互效果：
 *              - 印章放大至 120% + 文字匀速旋转 → CSS :hover / animation 处理
 *              - 四个感叹号围绕印章外围逐个出现，保持后消失，
 *                在新随机位置重复出现 → JS 控制时序与定位
 *
 * @architecture
 *   ├─ STAMP_CONFIG          常量配置（时序参数、半径系数）
 *   ├─ waitForDOMReady       工具函数
 *   └─ StampHoverController  class 封装悬停状态与感叹号动画循环
 *
 * @module StampHover
 */
(() => {
  'use strict';

  /* ═══ 常量配置 ════════════════════════════════════════════════ */
  /**
   * 印章悬停动画配置常量（Object.freeze 防止运行时篡改）。
   */
  const STAMP_CONFIG = Object.freeze({
    /** @type {number} 感叹号逐个出现的间隔（毫秒） */
    STAGGER_MS: 180,
    /** @type {number} 全部出现后保持显示的时长（毫秒） */
    HOLD_MS: 1000,
    /** @type {number} 淡出过渡时长（毫秒），与 CSS transition 对应 */
    FADE_OUT_MS: 400,
    /** @type {number} 循环间隔（毫秒） */
    CYCLE_GAP_MS: 200,
    /** @type {number} 感叹号出现过渡时长（毫秒），与 CSS transition 对应 */
    APPEAR_MS: 500,
    /** @type {number} 感叹号距印章中心的半径系数（相对于印章尺寸） */
    RADIUS_FACTOR: 0.7,
    /** @type {number} 感叹号数量（代表团队其余四名成员） */
    EXCLAIM_COUNT: 4,
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

  /* ═══ 印章悬停控制器 ═══════════════════════════════════════════ */

  /**
   * 印章悬停交互控制器
   *
   * 管理单个印章的悬停动画循环：
   *   1. 鼠标进入 → 启动循环
   *   2. 循环：生成随机位置 → 逐个显示感叹号 → 保持 → 淡出 → 重复
   *   3. 鼠标离开 → 停止循环，感叹号缩回印章内部
   */
  class StampHoverController {
    /**
     * @param {HTMLElement} stamp - 印章根元素
     */
    constructor(stamp) {
      /** @type {HTMLElement} 印章根元素 */
      this.stamp = stamp;
      /** @type {HTMLElement[]} 感叹号元素列表 */
      this.exclaims = [...stamp.querySelectorAll('.stamp-exclaim')];
      /** @type {number[]} 待执行的定时器 ID 列表 */
      this.timers = [];
      /** @type {boolean} 当前是否处于悬停状态 */
      this.isHovering = false;

      /* 显式初始化感叹号为隐藏状态（内联样式优先级最高，
         确保不依赖 CSS 基础规则在 kramdown 压缩下的稳定性） */
      this.exclaims.forEach((ex) => {
        ex.style.opacity = '0';
      });

      /* 绑定事件（箭头函数固定 this） */
      stamp.addEventListener('mouseenter', () => this.handleEnter());
      stamp.addEventListener('mouseleave', () => this.handleLeave());
    }

    /* ── 悬停状态管理 ──────────────────────────────────────── */

    /**
     * 鼠标进入：启动动画循环。
     */
    handleEnter() {
      this.isHovering = true;
      this.startCycle();
    }

    /**
     * 鼠标离开：停止循环，感叹号缩回印章内部（淡出）。
     */
    handleLeave() {
      this.isHovering = false;
      this.clearTimers();
      this.hideAll();
    }

    /* ── 动画循环 ──────────────────────────────────────────── */

    /**
     * 启动一个完整的动画周期。
     *
     * 时序：
     *   t=0         第 1 个感叹号开始出现
     *   t=STAGGER   第 2 个开始出现
     *   t=2*STAGGER 第 3 个开始出现
     *   t=3*STAGGER 第 4 个开始出现
     *   t=allShown  全部就位 → 保持 HOLD_MS
     *   t=fadeOut   全部淡出（缩回中心）
     *   t=nextCycle 新周期（新随机位置）
     */
    startCycle() {
      if (!this.isHovering) return;

      const {
        STAGGER_MS, HOLD_MS, FADE_OUT_MS, CYCLE_GAP_MS, APPEAR_MS, EXCLAIM_COUNT,
      } = STAMP_CONFIG;
      const positions = this.generatePositions();

      /* 阶段一：逐个显示感叹号（从印章中心移动到外围位置，淡入）。
         transform 通过内联样式设置（避免 calc(var()) 在压缩环境下出错） */
      this.exclaims.forEach((ex, i) => {
        const timer = setTimeout(() => {
          const { x, y } = positions[i];
          ex.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(1)`;
          ex.style.opacity = '1';
          ex.classList.add('is-out');
        }, i * STAGGER_MS);
        this.timers.push(timer);
      });

      /* 阶段二 + 三：全部出现后保持 → 淡出（缩回印章中心） */
      const allShownAt = (EXCLAIM_COUNT - 1) * STAGGER_MS + APPEAR_MS;
      const fadeOutAt = allShownAt + HOLD_MS;

      const fadeTimer = setTimeout(() => {
        this.exclaims.forEach((ex) => {
          ex.classList.remove('is-out');
          ex.style.transform = '';
          ex.style.opacity = '0';
        });
      }, fadeOutAt);
      this.timers.push(fadeTimer);

      /* 阶段四：下一周期（新随机位置） */
      const nextCycleAt = fadeOutAt + FADE_OUT_MS + CYCLE_GAP_MS;
      const nextTimer = setTimeout(() => this.startCycle(), nextCycleAt);
      this.timers.push(nextTimer);
    }

    /* ── 随机位置生成 ──────────────────────────────────────── */

    /**
     * 围绕印章中心生成 EXCLAIM_COUNT 个随机位置。
     *
     * 算法：将 360° 均分为若干扇区，每个感叹号在其扇区内随机偏移
     * 角度与半径，避免聚集；最终打乱顺序以实现"逐个出现"的随机性。
     *
     * @returns {Array<{x: number, y: number}>} 位置坐标（相对于印章中心，px）
     */
    generatePositions() {
      const size = this.stamp.offsetWidth;
      const baseRadius = size * STAMP_CONFIG.RADIUS_FACTOR;
      const sectorSize = 360 / STAMP_CONFIG.EXCLAIM_COUNT;

      /* 使用 Array.from + map 生成位置数组 */
      const positions = Array.from(
        { length: STAMP_CONFIG.EXCLAIM_COUNT },
        (_, i) => {
          /* 扇区基准角度 + 随机偏移（±25% 扇区宽度） */
          const baseAngle = i * sectorSize;
          const offset = (Math.random() - 0.5) * sectorSize * 0.5;
          const angle = ((baseAngle + offset) * Math.PI) / 180;
          /* 半径随机变化（85% ~ 115%），增加自然感 */
          const r = baseRadius * (0.85 + Math.random() * 0.3);
          return {
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r,
          };
        }
      );

      /* 打乱顺序：每次出现的感叹号位置不固定 */
      return positions.sort(() => Math.random() - 0.5);
    }

    /* ── 重置与清理 ────────────────────────────────────────── */

    /**
     * 隐藏所有感叹号（缩回印章中心并淡出）。
     * 移除 is-out 类 + 清除内联 transform + 显式设置 opacity 为 0，
     * CSS transition 自动处理缩回与淡出动画。
     */
    hideAll() {
      this.exclaims.forEach((ex) => {
        ex.classList.remove('is-out');
        ex.style.transform = '';
        ex.style.opacity = '0';
      });
    }

    /**
     * 清除所有待执行的定时器，防止悬停状态切换时产生残留循环。
     */
    clearTimers() {
      this.timers.forEach((id) => clearTimeout(id));
      this.timers = [];
    }
  }

  /* ═══ 主流程 ══════════════════════════════════════════════════ */

  /**
   * 初始化所有印章的悬停控制器。
   */
  const init = async () => {
    await waitForDOMReady();

    const stamps = document.querySelectorAll('.namecard-stamp');
    if (stamps.length === 0) return;

    /* 为每个印章实例化独立的控制器 */
    stamps.forEach((stamp) => new StampHoverController(stamp));
    console.log(`[StampHover] 初始化成功 | 目标: ${stamps.length} 个印章`);
  };

  init();
})();
