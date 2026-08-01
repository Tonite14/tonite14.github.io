---
title: 关于
icon: fas fa-info
order: 6
layout: about
---

<!-- ===== Persona 3 Reload 背景视觉模块 v3.0（官网像素级配色 + 10层 + 射线效果） ===== -->

<div class="p3r-bg" aria-hidden="true">
  <!-- Layer 0: 主背景（Royal Blue 三色阶：#0086d5 → #0060b8 → #00489a） -->
  <div class="p3r-bg-gradient p3r-bg-layer" data-parallax="slow"></div>

  <!-- Layer 1: 顶部水面白色波浪反光图案（复刻截图顶部流动水纹） -->
  <div class="p3r-bg-surface p3r-bg-layer" data-parallax="slow"></div>

  <!-- Layer 2: ⭐ 射线/轮廓描边效果（3层平行描边：#0a85d0 / #0c78bf / #0a6db0） -->
  <div class="p3r-bg-rays p3r-bg-layer" data-parallax="medium">
    <!-- SVG 曲线射线组（大轮廓 A） -->
    <div class="p3r-ray-group p3r-ray-group--a"></div>
    <!-- SVG 曲线射线组（次轮廓 B） -->
    <div class="p3r-ray-group p3r-ray-group--b"></div>
    <!-- SVG 曲线射线组（横贯流动 C） -->
    <div class="p3r-ray-group p3r-ray-group--c"></div>
    <!-- 8 条独立小射线段点缀 -->
    <span class="p3r-ray-seg p3r-ray-seg--1"></span>
    <span class="p3r-ray-seg p3r-ray-seg--2"></span>
    <span class="p3r-ray-seg p3r-ray-seg--3"></span>
    <span class="p3r-ray-seg p3r-ray-seg--4"></span>
    <span class="p3r-ray-seg p3r-ray-seg--5"></span>
    <span class="p3r-ray-seg p3r-ray-seg--6"></span>
    <span class="p3r-ray-seg p3r-ray-seg--7"></span>
    <span class="p3r-ray-seg p3r-ray-seg--8"></span>
  </div>

  <!-- Layer 3: SVG 流动水波纹 -->
  <div class="p3r-bg-waves p3r-bg-layer" data-parallax="slow"></div>

  <!-- Layer 4: 斜角透视网格线 -->
  <div class="p3r-bg-grid p3r-bg-layer" data-parallax="medium"></div>

  <!-- Layer 5: 水下光斑焦散 -->
  <div class="p3r-bg-caustics p3r-bg-layer" data-parallax="medium"></div>

  <!-- Layer 6: 气泡群（Sea of Souls，配色 #1a75b8） -->
  <div class="p3r-bubbles p3r-bg-layer" data-parallax="fast">
    <div class="p3r-bubble p3r-bubble--1"></div>
    <div class="p3r-bubble p3r-bubble--2"></div>
    <div class="p3r-bubble p3r-bubble--3"></div>
    <div class="p3r-bubble p3r-bubble--4"></div>
    <div class="p3r-bubble p3r-bubble--5"></div>
    <div class="p3r-bubble p3r-bubble--6"></div>
    <div class="p3r-bubble p3r-bubble--7"></div>
    <div class="p3r-bubble p3r-bubble--8"></div>
    <div class="p3r-bubble p3r-bubble--9"></div>
    <div class="p3r-bubble p3r-bubble--10"></div>
  </div>

  <!-- Layer 7: 斜角流动条（非直线） -->
  <div class="p3r-bg-geometry p3r-bg-layer" data-parallax="fast">
    <div class="p3r-sweep-bar p3r-sweep-bar--1" style="--r: -8deg;"></div>
    <div class="p3r-sweep-bar p3r-sweep-bar--2" style="--r: -5deg;"></div>
    <div class="p3r-sweep-bar p3r-sweep-bar--3" style="--r: -11deg;"></div>
    <div class="p3r-triangle p3r-triangle--1" style="--r: 18deg;"></div>
    <div class="p3r-triangle p3r-triangle--2" style="--r: -18deg;"></div>
  </div>

  <!-- Layer 8: 玻璃闪光层（水下光点闪烁+高光带滚动） -->
  <div class="p3r-bg-shimmer p3r-bg-layer" data-parallax="medium">
    <span class="p3r-shine p3r-shine--star p3r-shine--1"></span>
    <span class="p3r-shine p3r-shine--star p3r-shine--2"></span>
    <span class="p3r-shine p3r-shine--star p3r-shine--3"></span>
    <span class="p3r-shine p3r-shine--star p3r-shine--4"></span>
    <span class="p3r-shine p3r-shine--5"></span>
    <span class="p3r-shine p3r-shine--6"></span>
    <span class="p3r-shine p3r-shine--7"></span>
    <span class="p3r-shine p3r-shine--8"></span>
  </div>

  <!-- Layer 9: 暗角晕影 -->
  <div class="p3r-bg-vignette"></div>
</div>

<!-- ===== 成员名片 ===== -->
<div class="namecard-scene is-loading" id="namecard-scene">
  <!-- 加载遮罩：渲染完成前覆盖卡片区域，阻止主页面背景透出 -->
  <div class="namecard-loader" aria-hidden="true">
    <span class="loader-dot"></span>
  </div>
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
        <div class="namecard-logo">PRODUCER</div>
        <div class="namecard-series">BanG Dream! It's MyGO!!!!!</div>
      </div>
      <div class="namecard-body">
        <div class="namecard-main">
          <div class="namecard-name">Tonite14</div>
          <div class="namecard-title">MyGO!!!!! P · Frontend Learner</div>
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
      <!-- 高松灯名台词（Producer Card 风格） -->
      <div class="namecard-quote" aria-hidden="true">
        <p class="quote-jp">迷子でもいい、迷子でも進め。</p>
      </div>
      <!-- 印章 -->
      <div class="namecard-stamp"><span class="stamp-text">mygo!!!!!</span></div>
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
                <span>Hearthstone</span>
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
              <a href="mailto:tonite14@foxmail.com" target="_blank" rel="noopener" class="social-link social-link--contrast">
                <span class="social-icon-wrap"><i class="fas fa-envelope"></i></span>
                <div class="social-text-wrap">
                  <span class="social-label">Mail</span>
                  <span class="social-value">tonite14@foxmail.com</span>
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
      <div class="namecard-stamp"><span class="stamp-text">mygo!!!!!</span></div>
    </div>
  </div>
</div>

<!-- 问答模块样式（少女歌剧红白主题，独立模块） -->
<link rel="stylesheet" href="/assets/css/quiz.css">
<!-- ===== BanG Dream! 考据问答 ===== -->
<section class="mygo-quiz is-loading" id="mygo-quiz" aria-label="BanG Dream! 考据问答">
  <!-- 加载遮罩：渲染完成前覆盖问答区域，保持透明背景，仅显示红色脉冲点 -->
  <div class="quiz-loader" aria-hidden="true">
    <span class="quiz-loader-dot"></span>
  </div>
  <div class="quiz-frame">
    <!-- 舞台装饰层（少女歌剧华丽风格） -->
    <div class="quiz-curtain-top" aria-hidden="true"></div>
    <div class="quiz-spotlight" aria-hidden="true"></div>
    <div class="quiz-crest-wrap" aria-hidden="true">
      <div class="quiz-crest">★</div>
    </div>
    <span class="quiz-sparkle quiz-sparkle--1" aria-hidden="true"></span>
    <span class="quiz-sparkle quiz-sparkle--2" aria-hidden="true"></span>
    <span class="quiz-sparkle quiz-sparkle--3" aria-hidden="true"></span>
    <span class="quiz-sparkle quiz-sparkle--4" aria-hidden="true"></span>

    <!-- 装饰角花（白色 + 金色双层精致角饰） -->
    <span class="quiz-corner quiz-corner--tl" aria-hidden="true"></span>
    <span class="quiz-corner quiz-corner--tr" aria-hidden="true"></span>
    <span class="quiz-corner quiz-corner--bl" aria-hidden="true"></span>
    <span class="quiz-corner quiz-corner--br" aria-hidden="true"></span>

    <!-- 头部 -->
    <div class="quiz-header">
      <div class="quiz-badge">BanG Dream!</div>
      <h2 class="quiz-title">考据问答 <span class="quiz-title-sub">Lore Quiz</span></h2>
      <p class="quiz-tagline">舞台は幕を開ける——さぁ、始めましょう</p>
    </div>

    <!-- 进度条 -->
    <div class="quiz-progress">
      <div class="quiz-progress-bar" id="quiz-progress-bar"></div>
    </div>

    <!-- 问题区 -->
    <div class="quiz-stage" id="quiz-stage">
      <div class="quiz-q-meta">
        <span class="quiz-q-index" id="quiz-q-index">1</span>
        <span class="quiz-q-sep">/</span>
        <span class="quiz-q-total" id="quiz-q-total">10</span>
      </div>
      <div class="quiz-question" id="quiz-question"></div>
      <div class="quiz-options" id="quiz-options"></div>
      <div class="quiz-feedback" id="quiz-feedback" hidden></div>
      <button class="quiz-next-btn" id="quiz-next-btn" type="button" hidden>下一题</button>
    </div>

    <!-- 结果区 -->
    <div class="quiz-result" id="quiz-result" hidden>
      <div class="quiz-result-trophy" aria-hidden="true">🏆</div>
      <div class="quiz-score-label">得分</div>
      <div class="quiz-score-text" id="quiz-score-text" data-text="0 / 10">0 / 10</div>
      <div class="quiz-best" id="quiz-best"></div>
      <button class="quiz-restart-btn" id="quiz-restart-btn" type="button">重新挑战</button>
    </div>

    <!-- 底部装饰：舞台裙幕 + 反光底座 -->
    <div class="quiz-stage-base" aria-hidden="true"></div>
    <div class="quiz-valance-bottom" aria-hidden="true"></div>
  </div>
</section>

<style>
/* ==========================================================================
   名片组件样式表
   ---------------------------------------------------------------------------
   文件结构：
     1. CSS 自定义属性（设计 token）
     2. 全局布局适配
     3. 3D 舞台与翻转控制
     4. 卡片面基础样式
     5. 背景与遮罩层
     6. 装饰元素（边框、角标、金线、印章）
     7. 卡片正面内容（头部、名称、担当、底部）
     8. 卡片背面内容（分区、标题、介绍、游戏、链接、签名）
     9. 响应式断点（768px / 576px / 420px）

   设计规范：
     - 主色系：金色（偶像大师风格）+ MyGO!!!!! 青色应援色
     - 字体：clamp() 响应式缩放
     - 布局：正面纵向三段式 / 背面左右 4:6 分区
   ========================================================================== */

/* ==========================================================================
   1. CSS 自定义属性（设计 token）
   所有颜色、渐变、阴影、字体、动画参数集中管理，便于全局换肤。
   字体链与 custom.css:root 字体 token 保持一致（Lato 优先）。
   ========================================================================== */
.namecard-scene {
  /* ── 字体链（与全局 custom.css 字体 token 保持一致） ── */
  --font-card-body:    "Lato", "Source Sans Pro",
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-card-heading: "Lato", "Source Sans Pro",
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC",
    "Microsoft YaHei", sans-serif;
  --font-card-quote:   "Noto Serif JP", "Lato", Georgia, serif;
  --font-card-hand:    "Caveat", "Lato", cursive;
  --font-card-mono:    "SFMono-Regular", Consolas, monospace;

  /* ── 金色调色板（偶像大师风格主色） ── */
  --color-gold: #ffd700;
  --color-gold-dark: #b8860b;
  --color-gold-cream: #fff8dc;
  --color-gold-border: rgba(255, 215, 0, 0.6);
  --color-gold-subtle: rgba(255, 215, 0, 0.3);
  --color-gold-faint: rgba(255, 215, 0, 0.15);

  /* ── MyGO!!!!! 应援色系 ── */
  --mygo-cyan: #5bc0de;
  --mygo-cyan-light: #7dd3e8;
  --mygo-cyan-dark: #3a9bb5;
  --mygo-teal: #1a5f7a;
  --mygo-deep: #0d3b4d;

  /* ── 文字调色板 ── */
  --color-text-light: #eef7fc;
  --color-text-dark: #1f3342;
  --color-text-link: #2c4454;
  --color-text-gold: #8b6914;
  --color-ink-dark: #1a1a2e;

  /* ── 遮罩渐变（正面 135° 对角 / 背面 90° 左→右：左浅右深，四色标非线性过渡） ── */
  --overlay-front: linear-gradient(135deg,
    rgba(10, 15, 30, 0.35) 0%,
    rgba(20, 40, 70, 0.28) 50%,
    rgba(30, 60, 100, 0.25) 100%);
  --overlay-back: linear-gradient(90deg,
    rgba(26, 95, 122, 0.14) 0%,
    rgba(18, 70, 92, 0.22) 38%,
    rgba(10, 48, 63, 0.32) 70%,
    rgba(5, 30, 42, 0.42) 100%);

  /* ── 渐变预设 ── */
  --gradient-gold-line: linear-gradient(90deg,
    transparent 0%,
    var(--color-gold) 20%,
    var(--color-gold-cream) 50%,
    var(--color-gold) 80%,
    transparent 100%);
  --gradient-gold-logo: linear-gradient(135deg,
    var(--color-gold) 0%,
    var(--color-gold-dark) 100%);
  --gradient-gold-name: linear-gradient(90deg,
    #fff 0%,
    var(--color-gold) 50%,
    var(--color-gold) 100%);

  /* ── 阴影预设 ── */
  --shadow-card: 0 30px 70px rgba(0, 0, 0, 0.4),
                 0 0 0 1px var(--color-gold-subtle);

  /* ── 台词蒙版渐变（正面台词与背面格言共享） ── */
  --quote-mask: linear-gradient(135deg,
    rgba(0, 0, 0, 0.30) 0%,
    rgba(0, 20, 30, 0.18) 100%);

  --shadow-gold-sm: 0 2px 8px rgba(255, 215, 0, 0.4);
  --shadow-stamp-inner: inset 0 0 10px rgba(255, 215, 0, 0.3);

  /* ── 交互参数 ── */
  --drag-threshold: 5px;
  --flip-duration: 0.75s;
  --flip-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* ==========================================================================
   2. 全局布局适配
   ========================================================================== */
.layout--about #core-wrapper,
.layout--about #main-wrapper {
  padding-top: 1.5rem !important;
}

/* ==========================================================================
   3. 3D 舞台与翻转控制
   ========================================================================== */
.namecard-scene {
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  padding: 1.5rem 1rem 1rem;
  perspective: 1400px;
  /* 为加载遮罩提供定位上下文 */
  position: relative;
}

.namecard {
  position: relative;
  width: 100%;
  aspect-ratio: 1.75;
  transform-style: preserve-3d;
  /* opacity 过渡用于加载淡入（400ms）；transform 过渡用于翻转动画 */
  transition: transform var(--flip-duration) var(--flip-easing),
              opacity 0.4s ease;
  cursor: pointer;
  /* 消除移动端 300ms 点击延迟，禁用双击缩放，保证翻转响应即时 */
  touch-action: manipulation;
}

.namecard.flipped {
  transform: rotateY(180deg);
}

/* 翻转后正面不可交互，避免遮挡背面的点击与链接跳转 */
.namecard.flipped .namecard-front {
  pointer-events: none;
}

/* 未翻转时背面不可交互，避免干扰正面 */
.namecard:not(.flipped) .namecard-back {
  pointer-events: none;
}

/* ==========================================================================
   3.5 加载状态（渲染完成前隐藏卡片，仅显示加载指示点）
   ---------------------------------------------------------------------------
   工作流程：
     1. HTML 初始携带 is-loading 类 → 卡片 opacity:0，加载指示点居中显示
     2. namecard-loader.js 等待资源就绪后移除 is-loading、添加 is-ready
     3. CSS 过渡自动完成：指示点淡出 + 卡片淡入
   ========================================================================== */

/* 加载层：透明背景，仅承载居中加载指示点，保留布局空间不遮挡页面 */
.namecard-loader {
  position: absolute;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  opacity: 1;
  transition: opacity 0.4s ease, visibility 0s linear 0.5s;
  pointer-events: none;
}

/* 加载指示点：金色脉冲动画 */
.loader-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-gold);
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
  animation: loader-pulse 1.2s ease-in-out infinite;
}

@keyframes loader-pulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50%      { opacity: 1;   transform: scale(1.3); }
}

/* 加载中：卡片隐藏，禁止交互 */
.namecard-scene.is-loading .namecard {
  opacity: 0;
  pointer-events: none;
}

/* 就绪：卡片淡入，加载指示点淡出并移出可访问性树 */
.namecard-scene.is-ready .namecard {
  opacity: 1;
}

.namecard-scene.is-ready .namecard-loader {
  opacity: 0;
  visibility: hidden;
}

/* 加载完成后停止脉冲动画，节省资源 */
.namecard-scene.is-ready .loader-dot {
  animation: none;
}

/* ==========================================================================
   4. 卡片面基础样式
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
  /* 卡片字体基线：统一 Lato 优先，非特殊字体的子元素均继承此字体链 */
  font-family: var(--font-card-body);
  font-size: 1rem;
  line-height: 1.6;
  /* 禁用文本选中：避免拖拽选中文本干扰点击翻转与链接跳转 */
  user-select: none;
  -webkit-user-select: none;
}

/* ==========================================================================
   5. 背景与遮罩层
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

/* 正反两面遮罩层共享定位，仅背景渐变不同 */
.namecard-overlay-front,
.namecard-overlay-back {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.namecard-overlay-front { background: var(--overlay-front); }
.namecard-overlay-back  { background: var(--overlay-back); }

/* 背面蒙版动态层：两层青蓝色调（偏青 / 偏深）交叉淡入淡出，
   cubic-bezier 缓动曲线驱动，形成流畅且具层次感的颜色变化过程。
   仅在背面可见（.flipped）时运行，不可见时暂停以节省资源。 */
.namecard-overlay-back::before,
.namecard-overlay-back::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  animation-duration: 12s;
  animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-play-state: paused;
}
.namecard-overlay-back::before {
  background: linear-gradient(100deg, rgba(93, 192, 222, 0.12) 0%, rgba(26, 95, 122, 0.06) 100%);
  animation-name: backLayerCyan;
}
.namecard-overlay-back::after {
  background: linear-gradient(100deg, rgba(26, 95, 122, 0.04) 0%, rgba(5, 30, 42, 0.12) 100%);
  animation-name: backLayerDeep;
}
@keyframes backLayerCyan { from { opacity: 0.25; } to { opacity: 1; } }
@keyframes backLayerDeep { from { opacity: 1; } to { opacity: 0.25; } }
.namecard.flipped .namecard-overlay-back::before,
.namecard.flipped .namecard-overlay-back::after {
  animation-play-state: running;
}

/* ==========================================================================
   6. 装饰元素（边框、角标、金线、印章）
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
   7. 卡片正面内容（头部、名称、担当、底部）
   ========================================================================== */
.namecard-front {
  color: var(--color-text-light);
  /* 四向 padding 统一 3.2rem：内容距金色边框内沿均为 37.2px */
  padding: 3.2rem;
}

/* 所有装饰层不可选中、不响应点击（正反两面共用，依托 .namecard-face 父类） */
.namecard-face .namecard-bg,
.namecard-face .namecard-overlay-front,
.namecard-face .namecard-overlay-back,
.namecard-face .namecard-border-frame,
.namecard-face .namecard-gold-line,
.namecard-face .corner {
  user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
}

/* 正面内容元素提至装饰层之上（显式列举内容容器，规避 :not() 长链） */
.namecard-front > .namecard-header,
.namecard-front > .namecard-body,
.namecard-front > .namecard-footer {
  position: relative;
  z-index: 4;
}

/* ─── 头部区域 ──────────────────────────────────────────────── */
.namecard-header {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  margin-top: auto;
}

.namecard-id {
  font-family: var(--font-card-mono);
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

/* ─── 高松灯名台词（Producer Card 风格） ───────────────────── */
/* 定位：右上角基准点，top:70% 卡片高度处 */
.namecard-quote {
  position: absolute;
  right: 8%;
  top: 70%;
  z-index: 5;
  text-align: right;
  pointer-events: none;
  padding: 0.5rem 0.9rem 0.5rem 1.2rem;
  background: var(--quote-mask);
  border-right: 2px solid var(--color-gold-subtle);
  border-radius: 0 0 0 6px;
}

.quote-jp {
  font-family: var(--font-card-quote);
  font-weight: 700;
  font-size: clamp(0.88rem, 2.4vw, 1.3rem);
  letter-spacing: 0.06em;
  line-height: 1.4;
  color: var(--color-gold);
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.4),
               0 2px 5px rgba(0, 0, 0, 0.9);
  margin: 0;
}

/* ─── 印章/印记 ────────────────────────────────────────────── */
.namecard-stamp {
  position: absolute;
  /* top/right 与正面 padding 对齐：距金色边框内沿 37.2px */
  top: 3.2rem;
  right: 3.2rem;
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

/* ─── 印章悬停交互效果 ───────────────────────────────────────── */
/* 启用指针事件以支持悬停（点击仍冒泡至卡片触发翻转）。
   印章已从装饰层共享规则中移除，此处补充 user-select 并启用 pointer-events */
.namecard-face .namecard-stamp {
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;
  overflow: visible;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 悬停：等比放大至 120%，提升层级避免被遮挡 */
.namecard-stamp:hover {
  transform: rotate(-8deg) scale(1.2);
  z-index: 10;
}

/* 文字元素：inline-block 以支持 transform 旋转。
   动画始终声明，通过 animation-play-state 控制启停，
   避免 animation 属性移除时 transform 瞬间跳变至 0deg（transition 无法捕获此变化） */
.stamp-text {
  display: inline-block;
  animation: stamp-text-spin 5s linear infinite;
  animation-play-state: paused;
}

/* 悬停时文字匀速慢转（5s/圈） */
.namecard-stamp:hover .stamp-text {
  animation-play-state: running;
}

@keyframes stamp-text-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ==========================================================================
   8. 卡片背面内容（分区、标题、介绍、游戏、链接、签名）
   ========================================================================== */
.namecard-back {
  color: var(--color-text-dark);
  padding: 2.8rem 3.2rem;
  transform: rotateY(180deg);
}

/* ─── 背面内容容器：左右分区 4:6 黄金比例 ───────────────────── */
.namecard-back-body {
  position: relative;
  z-index: 4;
  display: flex;
  gap: 0;
  height: 100%;
  /* 0.4rem + 卡片 padding-top(2.8rem) = 3.2rem，与印章顶部齐平 */
  padding-top: 0.4rem;
}

/* 左右分区基础 */
.namecard-split {
  padding: 1.4rem 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
}

/* 左侧 40%：Profile 顶部与印章顶部齐平(3.2rem)，左边缘与印章右边缘对称(3.2rem)。
   flex-start 紧凑排列，模块间距通过 gap 控制 */
.namecard-split--left {
  flex: 0 0 40%;
  border-right: 1px solid rgba(91, 192, 222, 0.18);
  justify-content: flex-start;
  gap: 1rem;
  padding-top: 0;
  padding-left: 0;
  padding-bottom: 0.4rem;
}

/* 右侧 60%：右侧 padding 归零使 Connect 右边缘与印章右边缘齐平（3.2rem） */
.namecard-split--right {
  flex: 0 0 60%;
  padding-right: 0;
}

/* ─── 区域容器 ──────────────────────────────────────────────── */
.namecard-section {
  display: flex;
  flex-direction: column;
}

/* ─── 区域标题 ──────────────────────────────────────────────── */
.section-title {
  font-size: 0.85rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin: 0 0 1.2rem 0;
  padding-bottom: 0.45rem;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  position: relative;
  /* 与正面名称字体颜色完全一致：白→金渐变，无描边无阴影 */
  background: var(--gradient-gold-name);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
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

/* 标题装饰伪元素（共享基础）：左侧金色竖条 */
.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8%;
  height: 84%;
  width: 3px;
  background: linear-gradient(180deg, #ffd700 0%, #b8860b 100%);
  border-radius: 2px;
}

/* 标题装饰伪元素（共享基础）：底部短金线 */
.section-title::after {
  content: '';
  position: absolute;
  left: 0.65rem;
  bottom: -1.5px;
  width: 52px;
  height: 1.5px;
}

/* 左侧标题：深色背景条+金线（适配浅蒙版端） */
.section-title--primary {
  border-bottom: 1.5px solid rgba(184, 134, 11, 0.5);
  padding-left: 0.65rem;
}

/* 仅覆盖底部金线渐变方向（暗→透明） */
.section-title--primary::after {
  background: linear-gradient(90deg, #b8860b, rgba(184, 134, 11, 0));
}

/* 右侧标题：深蓝底条+金线（适配深蒙版端） */
.section-title--contrast {
  border-bottom: 1.5px solid rgba(255, 215, 0, 0.45);
  padding-left: 0.65rem;
}

/* 右侧竖条增加金色辉光 */
.section-title--contrast::before {
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
}

/* 右侧底部金线：亮金渐变 + 辉光 */
.section-title--contrast::after {
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
  gap: 0.8rem;
}

.profile-item {
  font-family: var(--font-card-hand);
  font-size: 1.15rem;
  line-height: 1.5;
  color: var(--mygo-cyan-light);
  padding-left: 1.1rem;
  position: relative;
  /* 视觉凸起：顶部高光 + 底部投影 + 柔光晕 */
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.25),
               0 2px 4px rgba(0, 0, 0, 0.8),
               0 0 12px rgba(255, 255, 255, 0.15);
  font-weight: 400;
  letter-spacing: 0.02em;
}

/* 金色圆点：透明度与台词右侧竖线(--color-gold-subtle)一致 */
.profile-dot {
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 7px;
  height: 7px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(184, 134, 11, 0.3));
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 215, 0, 0.3),
              0 0 6px rgba(255, 215, 0, 0.3);
}

/* 第三句名言：特殊排版（金色左边框 + 共享台词蒙版 --quote-mask）
   背景渐变移至 ::before 并施加 blur，使遮罩边缘自然过渡至卡片背面全局遮罩 */
.quote-item {
  isolation: isolate;
  font-style: italic;
  padding: 0.55rem 0.85rem;
  padding-left: 1.8rem;
  margin-top: 0.25rem;
  background: transparent;
  border-left: 2.5px solid var(--color-gold-subtle);
  border-radius: 0 8px 8px 0;
  color: var(--mygo-cyan-light);
  box-shadow: inset 0 1px 0 rgba(91, 192, 222, 0.15),
              inset 0 -3px 10px rgba(5, 30, 42, 0.5);
  text-shadow: 0 1px 2px rgba(0, 20, 30, 0.6);
}

/* 格言遮罩层：blur 模糊边缘，使遮罩与卡片背面全局遮罩自然融合 */
.quote-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--quote-mask);
  border-radius: inherit;
  filter: blur(6px);
  z-index: -1;
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
  gap: 0.65rem;
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
   9. 响应式断点（768px / 576px / 420px）
   ========================================================================== */

/* ─── 平板与小桌面 (≤768px) ─────────────────────────────────── */
@media (max-width: 768px) {
  .namecard { aspect-ratio: 1.65; }
  .namecard-front,
  .namecard-back { padding: 1.5rem 1.5rem; }
  .namecard-title { font-size: 0.9rem; }
  /* 模块级选择性展示：移动端仅保留核心模块，移除非核心模块以适应有限屏幕空间。
     正面：移除台词模块(.namecard-quote)
     背面：移除收藏模块(.hobby-section)，仅保留 Profile + Connect */
  .namecard-quote { display: none; }
  .hobby-section { display: none; }
  /* 背面左右分区改为上下堆叠（Favorites 隐藏后内容大幅减少，768px 无需 zoom） */
  .namecard-back-body {
    flex-direction: column;
    padding-top: 1rem;
  }
  .namecard-split { padding: 1rem 1.2rem; gap: 0.9rem; }
  /* 重置桌面端 --left/--right 的定向 padding 覆盖（特异性高于 .namecard-split 简写，
     不显式重置则桌面端 padding-left:0 / padding-right:0 / padding-top:0 / padding-bottom:0.4rem 残留，
     导致移动端 padding 不均匀、内容贴边、模块间距不一致） */
  .namecard-split--left {
    flex: none;
    border-right: none;
    border-bottom: 1px solid rgba(91, 192, 222, 0.18);
    justify-content: center;
    gap: 0.9rem;
    padding-top: 1rem;
    padding-left: 1.2rem;
    padding-bottom: 1rem;
  }
  .namecard-split--right {
    flex: none;
    justify-content: center;
    gap: 0.9rem;
    padding-right: 1.2rem;
  }
  /* 游戏网格在平板保持2列 */
  .game-grid { grid-template-columns: 1fr 1fr; }
  .profile-item { font-size: 1rem; }
  .section-title { font-size: 0.78rem; }
  .namecard-stamp { width: 56px; height: 56px; font-size: 0.56rem; top: 1.5rem; right: 1.5rem; }
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
  .namecard-back-body { flex-direction: column; padding-top: 0.75rem; zoom: 0.88; }
  .namecard-split { padding: 0.85rem 1rem; gap: 0.75rem; }
  /* 重置桌面端定向 padding 覆盖（同 768px 逻辑） */
  .namecard-split--left {
    justify-content: center;
    gap: 0.75rem;
    padding-top: 0.85rem;
    padding-left: 1rem;
    padding-bottom: 0.85rem;
  }
  .namecard-split--right {
    justify-content: center;
    gap: 0.75rem;
    padding-right: 1rem;
  }
  .profile-item { font-size: 0.95rem; }
  .section-title { font-size: 0.72rem; margin-bottom: 0.65rem; }
  .namecard-quote { right: 5%; top: 70%; padding: 0.4rem 0.7rem; }
  .game-chip { font-size: 0.8rem; padding: 0.42rem 0.55rem; }
  .game-chip i { font-size: 0.85rem; }
  .social-link { padding: 0.6rem 0.75rem; gap: 0.6rem; }
  .social-icon-wrap { width: 30px; height: 30px; border-radius: 7px; }
  .social-icon-wrap i { font-size: 0.92rem; }
  .social-label { font-size: 0.7rem; letter-spacing: 0.14em; }
  .social-value { font-size: 0.85rem; }
  .namecard-stamp { width: 46px; height: 46px; font-size: 0.48rem; top: 1.2rem; right: 1rem; }
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
  .namecard-back-body { flex-direction: column; padding-top: 0.5rem; zoom: 0.68; }
  .namecard-split { padding: 0.7rem 0.8rem; gap: 0.6rem; }
  /* 重置桌面端定向 padding 覆盖（同 768px/576px 逻辑） */
  .namecard-split--left {
    justify-content: center;
    gap: 0.6rem;
    padding-top: 0.7rem;
    padding-left: 0.8rem;
    padding-bottom: 0.7rem;
  }
  .namecard-split--right {
    justify-content: center;
    gap: 0.6rem;
    padding-right: 0.8rem;
  }
  .profile-item { font-size: 0.88rem; line-height: 1.5; }
  .namecard-quote { right: 4%; top: 70%; padding: 0.35rem 0.6rem; }
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
  .namecard-stamp { width: 38px; height: 38px; font-size: 0.4rem; top: 0.9rem; right: 0.8rem; }
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

<!-- JS 禁用时直接显示卡片，避免永久隐藏 -->
<noscript>
  <style>
    .namecard-scene.is-loading .namecard { opacity: 1; pointer-events: auto; }
    .namecard-loader { display: none; }
  </style>
</noscript>
<script src="/assets/js/namecard-loader.js" defer></script>
<script src="/assets/js/namecard-flip.js" defer></script>
<script src="/assets/js/quiz-data.js" defer></script>
<script src="/assets/js/namecard-quiz.js" defer></script>
<script src="/assets/js/p3r-bg.js" defer></script>
