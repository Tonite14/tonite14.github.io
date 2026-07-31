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
      <!-- 内容区 - 左右分区 4:6 布局 -->
      <div class="namecard-back-body">
        <!-- 左侧 40% 原色区：个人介绍 + 游戏爱好 -->
        <div class="namecard-split namecard-split--left">
          <div class="namecard-section profile-section">
            <h3 class="section-title section-title--primary"><i class="fas fa-user-circle"></i> Profile</h3>
            <ul class="profile-list">
              <li class="profile-item"><span class="profile-dot"></span>a rookie about FrontEnd</li>
              <li class="profile-item"><span class="profile-dot"></span>a rookie about AI Security</li>
              <li class="profile-item quote-item"><i class="fas fa-quote-left quote-icon"></i>Wer spricht von Siegen? Überstehn ist Alles</li>
            </ul>
          </div>
          <div class="namecard-section hobby-section">
            <h3 class="section-title section-title--primary"><i class="fas fa-gamepad"></i> Favorites</h3>
            <div class="game-grid">
              <div class="game-chip">
                <i class="fas fa-crosshairs"></i>
                <span>Overwatch</span>
              </div>
              <div class="game-chip">
                <i class="fas fa-dice"></i>
                <span>炉石传说</span>
              </div>
              <div class="game-chip game-chip--reserved">
                <i class="fas fa-plus-circle"></i>
                <span>Reserved</span>
              </div>
              <div class="game-chip game-chip--reserved">
                <i class="fas fa-plus-circle"></i>
                <span>Reserved</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 60% 单色蒙版区：联系方式 + 装饰 -->
        <div class="namecard-split namecard-split--right">
          <div class="namecard-section links-section">
            <h3 class="section-title section-title--contrast"><i class="fas fa-link"></i> Connect</h3>
            <div class="namecard-social">
              <a href="https://github.com/tonite14" target="_blank" rel="noopener" class="social-link social-link--contrast">
                <span class="social-icon-wrap"><i class="fab fa-github"></i></span>
                <div class="social-text-wrap">
                  <span class="social-label">GitHub</span>
                  <span class="social-value">@tonite14</span>
                </div>
                <i class="fas fa-external-link-alt social-arrow"></i>
              </a>
              <a href="mailto:tonite14@gmail.com" target="_blank" rel="noopener" class="social-link social-link--contrast">
                <span class="social-icon-wrap"><i class="fas fa-envelope"></i></span>
                <div class="social-text-wrap">
                  <span class="social-label">Mail</span>
                  <span class="social-value">tonite14@gmail.com</span>
                </div>
                <i class="fas fa-external-link-alt social-arrow"></i>
              </a>
            </div>
          </div>
          <!-- 底部装饰签名 -->
          <div class="footer-signature">
            <div class="signature-line"></div>
            <span class="signature-text">Personal Card</span>
            <div class="signature-line"></div>
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

  /* MyGO!!!!! 应援色系 */
  --mygo-cyan: #5bc0de;
  --mygo-cyan-light: #7dd3e8;
  --mygo-cyan-dark: #3a9bb5;
  --mygo-teal: #1a5f7a;
  --mygo-deep: #0d3b4d;

  /* 遮罩渐变色（背面：135° 双向渐变，MyGO 深青色系，左浅右深 + 上浅下深） */
  --overlay-front: linear-gradient(135deg,
    rgba(10, 15, 30, 0.35) 0%,
    rgba(20, 40, 70, 0.28) 50%,
    rgba(30, 60, 100, 0.25) 100%);
  --overlay-back: linear-gradient(135deg,
    rgba(26, 95, 122, 0.32) 0%,
    rgba(13, 59, 77, 0.42) 45%,
    rgba(5, 30, 42, 0.52) 100%);

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

/* 翻转后正面不可交互，避免干扰背面文本选中 */
.namecard.flipped .namecard-front {
  pointer-events: none;
}

/* 未翻转时背面不可交互，避免干扰正面 */
.namecard:not(.flipped) .namecard-back {
  pointer-events: none;
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
  font-size: clamp(2.0rem, 7vw, 4.0rem);
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

/* ─── 背面内容容器：左右分区 4:6 黄金比例 ───────────────────── */
.namecard-back-body {
  position: relative;
  z-index: 4;
  display: flex;
  gap: 0;
  height: 100%;
  padding-top: 1rem;
}

/* 左右分区基础 */
.namecard-split {
  padding: 1.4rem 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
}

/* 左侧 40%：纯布局区，与蒙版同色系，无额外阴影避免边缘色差 */
.namecard-split--left {
  flex: 0 0 40%;
  border-right: 1px solid rgba(91, 192, 222, 0.18);
}

/* 右侧 60%：纯布局区，与蒙版同色系 */
.namecard-split--right {
  flex: 0 0 60%;
}

/* ─── 区域容器 ──────────────────────────────────────────────── */
.namecard-section {
  display: flex;
  flex-direction: column;
}

/* ─── 区域标题 ──────────────────────────────────────────────── */
.section-title {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin: 0 0 0.9rem 0;
  padding-bottom: 0.45rem;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  position: relative;
  /* 与正面名称字体颜色一致：白→金渐变 */
  background: var(--gradient-gold-name);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  /* 描边：先描边后填充，深色描边确保各背景下可读 */
  paint-order: stroke fill;
  -webkit-text-stroke: 0.8px rgba(5, 20, 30, 0.55);
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
}

.section-title i {
  font-size: 0.92rem;
  /* 图标使用实心金色 */
  background: linear-gradient(135deg, #ffd700, #b8860b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 0;
  /* 加一个 fallback 边框让图标有轮廓感 */
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25));
}

/* 左侧标题：深色背景条+金线（适配浅蒙版端） */
.section-title--primary {
  border-bottom: 1.5px solid rgba(184, 134, 11, 0.5);
  padding-left: 0.65rem;
}

.section-title--primary::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8%;
  height: 84%;
  width: 3px;
  background: linear-gradient(180deg, #ffd700 0%, #b8860b 100%);
  border-radius: 2px;
}

.section-title--primary::after {
  content: '';
  position: absolute;
  left: 0.65rem;
  bottom: -1.5px;
  width: 52px;
  height: 1.5px;
  background: linear-gradient(90deg, #b8860b, rgba(184, 134, 11, 0));
}

/* 右侧标题：深蓝底条+金线（适配深蒙版端） */
.section-title--contrast {
  border-bottom: 1.5px solid rgba(255, 215, 0, 0.45);
  padding-left: 0.65rem;
}

.section-title--contrast::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8%;
  height: 84%;
  width: 3px;
  background: linear-gradient(180deg, #ffd700 0%, #b8860b 100%);
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
}

.section-title--contrast::after {
  content: '';
  position: absolute;
  left: 0.65rem;
  bottom: -1.5px;
  width: 52px;
  height: 1.5px;
  background: linear-gradient(90deg, #ffd700, rgba(255, 215, 0, 0));
  box-shadow: 0 0 6px rgba(255, 215, 0, 0.35);
}

/* ─── 个人介绍列表（三句话，不改内容，只改排版） ───────────── */
.profile-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.profile-item {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--mygo-cyan-light);
  padding-left: 1.1rem;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 20, 30, 0.5);
  font-weight: 500;
}

.profile-dot {
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 7px;
  height: 7px;
  background: linear-gradient(135deg, var(--mygo-cyan-light), var(--mygo-cyan-dark));
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(91, 192, 222, 0.4),
              0 0 6px rgba(91, 192, 222, 0.4);
}

/* 第三句名言：特殊排版（MyGO 青色底 + 金色左边框） */
.quote-item {
  font-style: italic;
  padding: 0.55rem 0.85rem;
  padding-left: 1.8rem;
  margin-top: 0.25rem;
  background: linear-gradient(90deg,
    rgba(26, 95, 122, 0.25),
    rgba(13, 59, 77, 0.12));
  border-left: 2.5px solid var(--mygo-cyan);
  border-radius: 0 4px 4px 0;
  color: var(--mygo-cyan-light);
  box-shadow: inset 0 1px 0 rgba(91, 192, 222, 0.12);
  text-shadow: 0 1px 2px rgba(0, 20, 30, 0.5);
}

.quote-icon {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  font-size: 0.75rem;
  color: var(--mygo-cyan);
  opacity: 0.9;
  filter: drop-shadow(0 1px 1px rgba(0, 20, 30, 0.4));
}

/* ─── 游戏爱好板块 ─────────────────────────────────────────── */
.game-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.45rem;
}

.game-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.65rem;
  /* MyGO 深青基调 + 金色描边（半透明） */
  background: linear-gradient(135deg,
    rgba(26, 95, 122, 0.45),
    rgba(13, 59, 77, 0.38));
  border: 1px solid rgba(91, 192, 222, 0.4);
  border-radius: 6px;
  font-size: 0.86rem;
  font-weight: 600;
  color: #e8f4f8;
  box-shadow: 0 1px 2px rgba(5, 30, 42, 0.3),
              inset 0 1px 0 rgba(91, 192, 222, 0.15);
  transition: all 0.2s ease;
}

.game-chip:hover {
  transform: translateY(-1px);
  border-color: var(--mygo-cyan);
  box-shadow: 0 2px 8px rgba(91, 192, 222, 0.3),
              inset 0 1px 0 rgba(91, 192, 222, 0.25);
  background: linear-gradient(135deg,
    rgba(38, 110, 140, 0.55),
    rgba(20, 75, 98, 0.45));
}

.game-chip i {
  font-size: 0.92rem;
  color: var(--mygo-cyan-light);
  width: 18px;
  text-align: center;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
}

.game-chip--reserved {
  opacity: 0.4;
  background: linear-gradient(135deg,
    rgba(26, 95, 122, 0.3),
    rgba(13, 59, 77, 0.25));
  border-style: dashed;
  border-color: rgba(91, 192, 222, 0.2);
}

.game-chip--reserved i {
  color: rgba(91, 192, 222, 0.5);
}

.game-chip--reserved:hover {
  transform: none;
  box-shadow: none;
  border-color: rgba(91, 192, 222, 0.2);
  opacity: 0.45;
  background: linear-gradient(135deg,
    rgba(26, 95, 122, 0.3),
    rgba(13, 59, 77, 0.25));
}

/* ─── 社交链接：右侧对比区新版样式 ────────────────────────── */
.namecard-social {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.9rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.25s ease;
}

/* 右侧链接卡片（MyGO 深青基调 + 金色边框） */
.social-link--contrast {
  background: linear-gradient(135deg,
    rgba(26, 95, 122, 0.4),
    rgba(13, 59, 77, 0.32));
  border: 1px solid rgba(91, 192, 222, 0.3);
  box-shadow: inset 0 1px 0 rgba(91, 192, 222, 0.1),
              0 2px 6px rgba(5, 30, 42, 0.35);
}

.social-link--contrast:hover {
  background: linear-gradient(135deg,
    rgba(38, 110, 140, 0.5),
    rgba(20, 75, 98, 0.4));
  border-color: rgba(91, 192, 222, 0.6);
  transform: translateX(4px);
  box-shadow: inset 0 1px 0 rgba(91, 192, 222, 0.18),
              0 4px 14px rgba(5, 30, 42, 0.5),
              0 0 0 1px rgba(91, 192, 222, 0.2);
}

.social-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  /* MyGO 青色渐变图标底 + 金色描边 */
  background: linear-gradient(135deg, var(--mygo-cyan-light) 0%, var(--mygo-cyan) 50%, var(--mygo-cyan-dark) 100%);
  color: var(--mygo-deep);
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(91, 192, 222, 0.35),
              inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.social-icon-wrap i {
  font-size: 1.05rem;
  /* 图标文字深青，和青色底形成对比 */
  color: var(--mygo-deep);
}

.social-text-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.social-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  /* 金色标签，强调色 */
  color: rgba(255, 215, 0, 0.88);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
}

.social-value {
  font-size: 0.92rem;
  font-weight: 500;
  /* MyGO 亮青文字 */
  color: var(--mygo-cyan-light);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.35);
}

.social-arrow {
  /* 金色强调箭头 */
  color: rgba(255, 215, 0, 0.5);
  font-size: 0.82rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.25s ease;
  flex-shrink: 0;
}

.social-link--contrast:hover .social-arrow {
  opacity: 1;
  transform: translateX(0);
  color: #ffd700;
  filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.5));
}

/* ─── 底部签名装饰（金色线条） ────────────────────────────── */
.footer-signature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.2rem;
  padding-top: 0.9rem;
  border-top: 1px dashed rgba(255, 215, 0, 0.2);
}

.signature-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    rgba(255, 215, 0, 0.35),
    transparent);
}

.signature-text {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 215, 0, 0.45);
  white-space: nowrap;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.35);
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
  /* 背面左右分区改为上下堆叠 */
  .namecard-back-body { flex-direction: column; padding-top: 1rem; }
  .namecard-split { padding: 1rem 1.2rem; gap: 0.9rem; }
  .namecard-split--left { flex: none; border-right: none; border-bottom: 1px solid rgba(91, 192, 222, 0.18); }
  .namecard-split--right { flex: none; }
  /* 游戏网格在平板保持2列 */
  .game-grid { grid-template-columns: 1fr 1fr; }
  .profile-item { font-size: 0.9rem; }
  .section-title { font-size: 0.78rem; }
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
  .namecard-name { font-size: clamp(1.8rem, 8.5vw, 2.6rem); }
  .namecard-title { font-size: 0.8rem; }
  .oshi { font-size: 0.75rem; padding: 0.25rem 0.7rem; }
  .namecard-back-body { flex-direction: column; padding-top: 0.75rem; }
  .namecard-split { padding: 0.85rem 1rem; gap: 0.75rem; }
  .profile-item { font-size: 0.85rem; }
  .section-title { font-size: 0.72rem; margin-bottom: 0.65rem; }
  .game-chip { font-size: 0.8rem; padding: 0.42rem 0.55rem; }
  .game-chip i { font-size: 0.85rem; }
  .social-link { padding: 0.6rem 0.75rem; gap: 0.6rem; }
  .social-icon-wrap { width: 30px; height: 30px; border-radius: 7px; }
  .social-icon-wrap i { font-size: 0.92rem; }
  .social-label { font-size: 0.7rem; letter-spacing: 0.14em; }
  .social-value { font-size: 0.85rem; }
  .namecard-stamp { width: 46px; height: 46px; font-size: 0.48rem; top: 22px; right: 16px; }
  .corner { width: 16px; height: 16px; border-width: 2px; }
  .namecard-border-frame { inset: 6px; }
  .namecard-gold-line { top: 14px; left: 14px; right: 14px; }
  .namecard-logo { font-size: 0.65rem; padding: 0.25rem 0.5rem; }
  .namecard-series { font-size: 0.65rem; }
  .footer-signature { margin-top: 0.9rem; padding-top: 0.7rem; }
}

/* ─── 小屏手机 (≤420px) ────────────────────────────────────── */
@media (max-width: 420px) {
  .namecard-scene { padding: 0.5rem 0.25rem; }
  .namecard { aspect-ratio: 1.45; }
  .namecard-front,
  .namecard-back { padding: 0.9rem 0.8rem; }
  .namecard-name { font-size: clamp(1.6rem, 9.5vw, 2rem); }
  .namecard-title { font-size: 0.72rem; }
  .namecard-body { gap: 0.7rem; margin-top: 0.25rem; }
  .namecard-oshis { margin-top: 0.25rem; }
  .namecard-oshis-label { font-size: 0.55rem; margin-bottom: 0.35rem; }
  .oshi { font-size: 0.68rem; padding: 0.2rem 0.6rem; }
  .namecard-back-body { flex-direction: column; padding-top: 0.5rem; }
  .namecard-split { padding: 0.7rem 0.8rem; gap: 0.6rem; }
  .profile-item { font-size: 0.78rem; line-height: 1.5; }
  .quote-item { padding: 0.45rem 0.65rem; padding-left: 1.5rem; }
  .quote-icon { left: 0.35rem; top: 0.4rem; }
  .section-title { font-size: 0.65rem; margin-bottom: 0.5rem; padding-bottom: 0.35rem; }
  .section-title::after { width: 32px; }
  /* 游戏网格小屏改为2列紧凑 */
  .game-grid { gap: 0.35rem; }
  .game-chip { font-size: 0.72rem; padding: 0.36rem 0.5rem; }
  .game-chip i { font-size: 0.8rem; width: 14px; }
  /* 社交链接小屏优化 */
  .social-link { padding: 0.52rem 0.65rem; gap: 0.5rem; border-radius: 7px; }
  .social-icon-wrap { width: 28px; height: 28px; border-radius: 6px; }
  .social-icon-wrap i { font-size: 0.85rem; }
  .social-label { font-size: 0.64rem; letter-spacing: 0.12em; }
  .social-value { font-size: 0.78rem; }
  .namecard-social { gap: 0.5rem; }
  .footer-signature { margin-top: 0.7rem; padding-top: 0.55rem; }
  .signature-text { font-size: 0.6rem; letter-spacing: 0.22em; }
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

<script src="/assets/js/namecard-flip.js" defer></script>
