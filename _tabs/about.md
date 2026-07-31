---
title: 关于
icon: fas fa-info
order: 6
layout: about
---

<!-- ===== 成员名片 ===== -->
<div class="namecard-scene">
  <div class="namecard" id="member-card">
    <!-- 卡片正面 -->
    <div class="namecard-face namecard-front">
      <!-- 背景图片 -->
      <div class="namecard-bg"></div>
      <!-- 深色遮罩层 -->
      <div class="namecard-overlay-front"></div>
      <!-- 装饰边框（偶像大师风格） -->
      <div class="namecard-border-frame">
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
      </div>
      <!-- 金色装饰线 -->
      <div class="namecard-gold-line"></div>
      <!-- 内容区 -->
      <div class="namecard-header">
        <div class="namecard-logo">MEMBER ID</div>
        <div class="namecard-series">BanG Dream! It's MyGO!!!!!</div>
      </div>
      <div class="namecard-body">
        <div class="namecard-main">
          <div class="namecard-name">Tonite14</div>
          <div class="namecard-title">Supporter · Frontend Learner</div>
        </div>
        <div class="namecard-oshis">
          <div class="namecard-oshis-label">担当</div>
          <div class="namecard-oshis-list">
            <span class="oshi oshi-main">高松 燈</span>
            <span class="oshi">MyGO!!!!!</span>
          </div>
        </div>
      </div>
      <div class="namecard-footer">
        <div class="namecard-id">tonite14.github.io</div>
        <div class="namecard-hint">CLICK TO FLIP</div>
      </div>
      <!-- 印章 -->
      <div class="namecard-stamp">MyGO!</div>
    </div>

    <!-- 卡片背面 -->
    <div class="namecard-face namecard-back">
      <!-- 背景图片 -->
      <div class="namecard-bg"></div>
      <!-- 浅色遮罩层 -->
      <div class="namecard-overlay-back"></div>
      <!-- 装饰边框 -->
      <div class="namecard-border-frame">
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
      </div>
      <!-- 金色装饰线 -->
      <div class="namecard-gold-line"></div>
      <!-- 内容区 -->
      <div class="namecard-back-body">
        <div class="namecard-section profile-section">
          <h3>Profile</h3>
          <ul>
            <li>a rookie about FrontEnd</li>
            <li>a rookie about AI Security</li>
            <li>Wer spricht von Siegen? Überstehn ist Alles</li>
          </ul>
        </div>
        <div class="namecard-section links-section">
          <h3>Link</h3>
          <div class="namecard-social">
            <a href="https://github.com/tonite14" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>
            <a href="mailto:tonite14@gmail.com" target="_blank" rel="noopener"><i class="fas fa-envelope"></i> Mail</a>
          </div>
        </div>
      </div>
      <!-- 印章 -->
      <div class="namecard-stamp">MyGO!</div>
    </div>
  </div>
</div>

<style>
/* ==========================================================================
   名片组件 - CSS 自定义属性
   ========================================================================== */
.namecard-scene {
  /* 金色调色板 */
  --color-gold: #ffd700;
  --color-gold-dark: #b8860b;
  --color-gold-cream: #fff8dc;
  --color-gold-border: rgba(255, 215, 0, 0.6);
  --color-gold-subtle: rgba(255, 215, 0, 0.3);
  --color-gold-faint: rgba(255, 215, 0, 0.15);

  /* 文字调色板 */
  --color-text-light: #eef7fc;
  --color-text-dark: #1f3342;
  --color-text-link: #2c4454;
  --color-text-gold: #8b6914;
  --color-ink-dark: #1a1a2e;

  /* 遮罩渐变色 */
  --overlay-front: linear-gradient(135deg,
    rgba(10, 15, 30, 0.35) 0%,
    rgba(20, 40, 70, 0.28) 50%,
    rgba(30, 60, 100, 0.25) 100%);
  --overlay-back: linear-gradient(135deg,
    rgba(255, 250, 240, 0.72) 0%,
    rgba(240, 248, 255, 0.68) 50%,
    rgba(230, 245, 255, 0.65) 100%);

  /* 金色装饰线渐变 */
  --gradient-gold-line: linear-gradient(90deg,
    transparent 0%,
    var(--color-gold) 20%,
    var(--color-gold-cream) 50%,
    var(--color-gold) 80%,
    transparent 100%);

  /* 金色 Logo 渐变 */
  --gradient-gold-logo: linear-gradient(135deg,
    var(--color-gold) 0%,
    var(--color-gold-dark) 100%);

  /* 金色姓名渐变 */
  --gradient-gold-name: linear-gradient(90deg,
    #fff 0%,
    var(--color-gold) 50%,
    var(--color-gold) 100%);

  /* 阴影变量 */
  --shadow-card: 0 30px 70px rgba(0, 0, 0, 0.4),
                 0 0 0 1px var(--color-gold-subtle);
  --shadow-gold-sm: 0 2px 8px rgba(255, 215, 0, 0.4);
  --shadow-stamp-inner: inset 0 0 10px rgba(255, 215, 0, 0.3);

  /* 交互参数 */
  --drag-threshold: 5px;
  --flip-duration: 0.75s;
  --flip-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* ==========================================================================
   全局布局
   ========================================================================== */
.layout--about #core-wrapper,
.layout--about #main-wrapper {
  padding-top: 1.5rem !important;
}

/* ==========================================================================
   卡片容器与 3D 舞台
   ========================================================================== */
.namecard-scene {
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  padding: 1.5rem 1rem 1rem;
  perspective: 1400px;
}

.namecard {
  position: relative;
  width: 100%;
  aspect-ratio: 1.75;
  transform-style: preserve-3d;
  transition: transform var(--flip-duration) var(--flip-easing);
  cursor: pointer;
}

.namecard.flipped {
  transform: rotateY(180deg);
}

/* ==========================================================================
   卡片面基础样式
   ========================================================================== */
.namecard-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
}

/* ==========================================================================
   背景与遮罩层
   ========================================================================== */
.namecard-bg {
  position: absolute;
  inset: 0;
  background-image: url('/assets/config/link.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.namecard-overlay-front {
  position: absolute;
  inset: 0;
  background: var(--overlay-front);
  z-index: 1;
}

.namecard-overlay-back {
  position: absolute;
  inset: 0;
  background: var(--overlay-back);
  z-index: 1;
}

/* ==========================================================================
   装饰元素（偶像大师风格）
   ========================================================================== */
.namecard-border-frame {
  position: absolute;
  inset: 12px;
  border: 2px solid var(--color-gold-border);
  border-radius: 12px;
  z-index: 2;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 28px;
  height: 28px;
  border: 3px solid var(--color-gold);
  z-index: 3;
}

.corner-tl { top: 4px; left: 4px; border-right: none; border-bottom: none; border-top-left-radius: 14px; }
.corner-tr { top: 4px; right: 4px; border-left: none; border-bottom: none; border-top-right-radius: 14px; }
.corner-bl { bottom: 4px; left: 4px; border-right: none; border-top: none; border-bottom-left-radius: 14px; }
.corner-br { bottom: 4px; right: 4px; border-left: none; border-top: none; border-bottom-right-radius: 14px; }

.namecard-gold-line {
  position: absolute;
  top: 18px;
  left: 18px;
  right: 18px;
  height: 1px;
  background: var(--gradient-gold-line);
  z-index: 3;
  opacity: 0.8;
}

/* ==========================================================================
   卡片正面 - 布局与内容
   ========================================================================== */
.namecard-front {
  color: var(--color-text-light);
  padding: 2.8rem 3.2rem;
  user-select: text;
  -webkit-user-select: text;
}

.namecard-front .namecard-bg,
.namecard-front .namecard-overlay-front,
.namecard-front .namecard-border-frame,
.namecard-front .namecard-gold-line,
.namecard-front .namecard-stamp,
.namecard-front .corner {
  user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
}

.namecard-front > *:not(.namecard-bg):not(.namecard-overlay-front):not(.namecard-border-frame):not(.namecard-gold-line):not(.namecard-stamp) {
  position: relative;
  z-index: 4;
}

/* ─── 头部区域 ──────────────────────────────────────────────── */
.namecard-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
}

.namecard-logo {
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  background: var(--gradient-gold-logo);
  color: var(--color-ink-dark);
  font-weight: 900;
  font-size: clamp(0.6rem, 1.6vw, 0.78rem);
  letter-spacing: 0.08em;
  line-height: 1;
  box-shadow: var(--shadow-gold-sm);
}

.namecard-series {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(238, 247, 252, 0.85);
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

/* ─── 主体区域 ──────────────────────────────────────────────── */
.namecard-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
  margin-top: 0.5rem;
}

.namecard-main {
  flex: 1;
}

.namecard-name {
  font-size: clamp(1.6rem, 6vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 0.5rem;
  background: var(--gradient-gold-name);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
}

.namecard-title {
  font-size: clamp(0.75rem, 2.5vw, 1.05rem);
  color: rgba(238, 247, 252, 0.9);
  letter-spacing: 0.05em;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
}

/* ─── 担当标签 ─────────────────────────────────────────────── */
.namecard-oshis {
  margin-top: 0.5rem;
}

.namecard-oshis-label {
  font-size: clamp(0.55rem, 1.5vw, 0.68rem);
  font-weight: 800;
  letter-spacing: 0.3em;
  color: var(--color-gold);
  margin-bottom: 0.55rem;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

.namecard-oshis-list {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.oshi {
  padding: 0.35rem 1rem;
  border-radius: 999px;
  font-size: clamp(0.75rem, 2vw, 0.88rem);
  font-weight: 600;
  border: 1px solid var(--color-gold-subtle);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}

.oshi-main {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.25) 0%, rgba(255, 140, 0, 0.15) 100%);
  color: var(--color-gold);
  border-color: var(--color-gold-border);
}

.oshi:not(.oshi-main) {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(238, 247, 252, 0.85);
}

/* ─── 底部区域 ──────────────────────────────────────────────── */
.namecard-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 0.8rem;
  margin-top: auto;
}

.namecard-id {
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 0.74rem;
  color: rgba(255, 215, 0, 0.85);
  letter-spacing: 0.06em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

.namecard-hint {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: rgba(238, 247, 252, 0.6);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

/* ─── 印章/印记 ────────────────────────────────────────────── */
.namecard-stamp {
  position: absolute;
  top: 38px;
  right: 28px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid rgba(255, 215, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: var(--color-gold);
  background: radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
  transform: rotate(-8deg);
  z-index: 5;
  text-align: center;
  line-height: 1.1;
  box-shadow: var(--shadow-stamp-inner);
}

/* ==========================================================================
   卡片背面 - 布局与内容
   ========================================================================== */
.namecard-back {
  color: var(--color-text-dark);
  padding: 2.8rem 3.2rem;
  transform: rotateY(180deg);
  user-select: text;
  -webkit-user-select: text;
}

.namecard-back .namecard-bg,
.namecard-back .namecard-overlay-back,
.namecard-back .namecard-border-frame,
.namecard-back .namecard-gold-line,
.namecard-back .namecard-stamp,
.namecard-back .corner {
  user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
}

.namecard-back-body {
  position: relative;
  z-index: 4;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2rem;
  height: 100%;
  align-content: center;
  padding-top: 2rem;
}

/* ─── 区域标题 ──────────────────────────────────────────────── */
.namecard-section h3 {
  font-size: clamp(0.6rem, 1.6vw, 0.72rem);
  font-weight: 800;
  letter-spacing: 0.25em;
  color: var(--color-text-gold);
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-gold-subtle);
  display: inline-block;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
}

/* ─── 区域列表 ──────────────────────────────────────────────── */
.namecard-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.namecard-section li {
  font-size: clamp(0.75rem, 2.2vw, 0.92rem);
  line-height: 1.8;
  color: var(--color-text-link);
  padding-left: 1rem;
  position: relative;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
}

.namecard-section li::before {
  content: '◆';
  position: absolute;
  left: 0;
  color: var(--color-gold);
  font-size: 0.7rem;
}

.namecard-section li + li {
  margin-top: 0.25rem;
}

/* ─── 社交链接 ──────────────────────────────────────────────── */
.namecard-social {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.namecard-social a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-link);
  font-size: 0.92rem;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid var(--color-gold-subtle);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
}

.namecard-social a:hover {
  color: var(--color-gold-dark);
  transform: translateX(3px);
  background: var(--color-gold-faint);
  border-color: rgba(255, 215, 0, 0.5);
}

/* ==========================================================================
   响应式断点
   ========================================================================== */

/* ─── 平板与小桌面 (≤768px) ─────────────────────────────────── */
@media (max-width: 768px) {
  .namecard { aspect-ratio: 1.65; }
  .namecard-front,
  .namecard-back { padding: 1.5rem 1.5rem; }
  .namecard-title { font-size: 0.9rem; }
  .namecard-back-body { grid-template-columns: 1fr; gap: 1rem; padding-top: 1rem; }
  .namecard-section li { font-size: 0.85rem; }
  .namecard-stamp { width: 56px; height: 56px; font-size: 0.56rem; }
  .corner { width: 22px; height: 22px; }
  .oshi { font-size: 0.82rem; }
}

/* ─── 大屏手机 (≤576px) ────────────────────────────────────── */
@media (max-width: 576px) {
  .namecard-scene { padding: 0.75rem 0.5rem; }
  .namecard { aspect-ratio: 1.55; }
  .namecard-front,
  .namecard-back { padding: 1.2rem 1rem; }
  .namecard-name { font-size: clamp(1.4rem, 7vw, 2rem); }
  .namecard-title { font-size: 0.8rem; }
  .oshi { font-size: 0.75rem; padding: 0.25rem 0.7rem; }
  .namecard-section li { font-size: 0.78rem; }
  .namecard-back-body { gap: 0.75rem; padding-top: 0.75rem; }
  .namecard-section h3 { font-size: 0.65rem; }
  .namecard-stamp { width: 46px; height: 46px; font-size: 0.48rem; top: 22px; right: 16px; }
  .corner { width: 16px; height: 16px; border-width: 2px; }
  .namecard-border-frame { inset: 6px; }
  .namecard-gold-line { top: 14px; left: 14px; right: 14px; }
  .namecard-logo { font-size: 0.65rem; padding: 0.25rem 0.5rem; }
  .namecard-series { font-size: 0.65rem; }
}

/* ─── 小屏手机 (≤420px) ────────────────────────────────────── */
@media (max-width: 420px) {
  .namecard-scene { padding: 0.5rem 0.25rem; }
  .namecard { aspect-ratio: 1.45; }
  .namecard-front,
  .namecard-back { padding: 0.9rem 0.8rem; }
  .namecard-name { font-size: clamp(1.2rem, 8vw, 1.6rem); }
  .namecard-title { font-size: 0.72rem; }
  .namecard-body { gap: 0.7rem; margin-top: 0.25rem; }
  .namecard-oshis { margin-top: 0.25rem; }
  .namecard-oshis-label { font-size: 0.55rem; margin-bottom: 0.35rem; }
  .oshi { font-size: 0.68rem; padding: 0.2rem 0.6rem; }
  .namecard-section li { font-size: 0.72rem; line-height: 1.5; }
  .namecard-back-body { gap: 0.5rem; padding-top: 0.5rem; }
  .namecard-section h3 { font-size: 0.58rem; margin-bottom: 0.5rem; padding-bottom: 0.3rem; }
  .namecard-social a { font-size: 0.75rem; padding: 0.3rem 0.5rem; }
  .namecard-social { gap: 0.4rem; }
  .namecard-stamp { width: 38px; height: 38px; font-size: 0.4rem; top: 18px; right: 12px; }
  .corner { width: 14px; height: 14px; border-width: 2px; }
  .namecard-border-frame { inset: 5px; }
  .namecard-gold-line { top: 12px; left: 12px; right: 12px; }
  .namecard-logo { font-size: 0.58rem; padding: 0.2rem 0.4rem; }
  .namecard-series { font-size: 0.58rem; }
  .namecard-id { font-size: 0.6rem; }
  .namecard-hint { font-size: 0.5rem; }
  .namecard-header { padding-top: 0.5rem; gap: 0.5rem; }
}
</style>

<script>
/**
 * 成员名片 - 交互式翻转控制器
 *
 * @description 管理成员名片的 3D 翻转交互。
 *              区分点击（翻转）与拖拽（文本选择），
 *              防止复制文字时误触翻转。
 *
 * @module NameCardFlip
 */
(function() {
  'use strict';

  // ─── 常量定义 ───────────────────────────────────────────────
  /** @type {string} 名片元素的 DOM ID */
  const CARD_ID = 'member-card';

  /** @type {number} 区分点击与拖拽的像素阈值 */
  const DRAG_THRESHOLD = 5;

  // ─── 状态变量 ───────────────────────────────────────────────
  /** @type {HTMLElement | null} */
  const card = document.getElementById(CARD_ID);

  if (!card) {
    console.warn('[NameCardFlip] 未找到名片元素:', CARD_ID);
    return;
  }

  /** @type {{ x: number, y: number }} 交互起始位置坐标 */
  let startPoint = { x: 0, y: 0 };

  // ─── 核心逻辑 ──────────────────────────────────────────────

  /**
   * 判断当前交互是否应触发名片翻转。
   * 仅当指针未超过阈值移动（即非拖拽行为）时触发翻转。
   * 文本选择必然涉及拖拽移动，因此通过移动距离即可区分。
   *
   * @param {number} endX - 释放时指针的 X 坐标
   * @param {number} endY - 释放时指针的 Y 坐标
   * @returns {boolean} 是否应翻转名片
   */
  function shouldFlip(endX, endY) {
    const deltaX = Math.abs(endX - startPoint.x);
    const deltaY = Math.abs(endY - startPoint.y);
    const moved = deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD;
    return !moved;
  }

  /**
   * 记录指针起始位置并清除已有选区。
   * 在 mousedown 时清除选区，确保 mouseup 时的选区检测
   * 仅针对本次交互产生的新选区。
   *
   * @param {number} x - 指针 X 坐标
   * @param {number} y - 指针 Y 坐标
   */
  function recordStart(x, y) {
    // 清除页面上可能残留的选区，避免误判为文本选择
    window.getSelection().removeAllRanges();
    startPoint.x = x;
    startPoint.y = y;
  }

  /**
   * 尝试翻转名片（当交互判定为有效点击时）。
   *
   * @param {number} endX - 释放时指针的 X 坐标
   * @param {number} endY - 释放时指针的 Y 坐标
   */
  function tryFlip(endX, endY) {
    if (shouldFlip(endX, endY)) {
      card.classList.toggle('flipped');
    }
  }

  // ─── 鼠标事件处理 ────────────────────────────────────────────

  /** @param {MouseEvent} e */
  function onMouseDown(e) {
    recordStart(e.clientX, e.clientY);
  }

  /** @param {MouseEvent} e */
  function onMouseUp(e) {
    tryFlip(e.clientX, e.clientY);
  }

  // ─── 触摸事件处理 ────────────────────────────────────────────

  /** @param {TouchEvent} e */
  function onTouchStart(e) {
    const touch = e.touches[0];
    recordStart(touch.clientX, touch.clientY);
  }

  /** @param {TouchEvent} e */
  function onTouchEnd(e) {
    const touch = e.changedTouches[0];
    tryFlip(touch.clientX, touch.clientY);
  }

  // ─── 初始化事件监听 ──────────────────────────────────────────

  card.addEventListener('mousedown', onMouseDown);
  card.addEventListener('mouseup', onMouseUp);
  card.addEventListener('touchstart', onTouchStart, { passive: true });
  card.addEventListener('touchend', onTouchEnd);

  // ─── 冒烟测试 ──────────────────────────────────────────────
  console.assert(card !== null, '[NameCardFlip] 名片元素存在');
  console.assert(typeof card.classList.toggle === 'function', '[NameCardFlip] 名片支持 classList.toggle');
  console.log('[NameCardFlip] 初始化成功，目标元素: #%s', CARD_ID);
})();
</script>
