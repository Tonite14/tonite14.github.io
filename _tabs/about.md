---
title: 关于
icon: fas fa-info
order: 6
layout: about
---

<!-- ⭐ Persona 3 Reload 背景 DOM 已移至 _layouts/about.html（body 直接子级），确保 fixed 定位全视口覆盖 -->

<!-- 关键资源预加载：让浏览器更早将首屏必需资源排入队列 -->
<link rel="preload" as="style" href="/assets/css/namecard.css">
<link rel="preload" as="script" href="/assets/js/namecard-loader.js">
<link rel="preload" as="script" href="/assets/js/namecard-flip.js">

<!-- ===== 页面级结构样式（间距系统 + 介绍区块 + 区域标题 + 连接器） ===== -->
<link rel="stylesheet" href="/assets/css/about-page.css">

<!-- ===== 页面内容容器 ===== -->
<div class="about-content">

  <!-- ── 介绍区块 ── -->
  <div class="about-intro">
    <h1 class="about-intro-title">Tonite14</h1>
    <p class="about-intro-sub">Frontend Learner · MyGO!!!!! Producer · 迷子でも進め</p>
  </div>

  <!-- ── 区域标题 01 ── -->
  <div class="about-section-header">
    <span class="section-label">01 — Profile</span>
    <div class="section-divider"></div>
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

  <!-- ── 模块间视觉连接器 ── -->
  <div class="about-connector" aria-hidden="true">
    <span class="connector-line"></span>
    <span class="connector-icon">★</span>
    <span class="connector-line"></span>
  </div>

  <!-- ── 区域标题 02 ── -->
  <div class="about-section-header">
    <span class="section-label">02 — Lore Quiz</span>
    <div class="section-divider"></div>
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

<!-- 名片组件样式（从 about.md 抽离，含设计 token / 3D 翻转 / 正反面 / 响应式 / JS禁用兜底） -->
<link rel="stylesheet" href="/assets/css/namecard.css">

<!-- 关闭页面内容容器 -->
</div><!-- /.about-content -->

<!-- p3r-bg.js 已移至 _layouts/about.html 中统一引入 -->
<!-- 脚本加载顺序：utils → loader → flip → quiz-data → quiz（defer 按文档序执行） -->
<script src="/assets/js/namecard-utils.js" defer></script>
<script src="/assets/js/namecard-loader.js" defer></script>
<script src="/assets/js/namecard-flip.js" defer></script>
<script src="/assets/js/quiz-data.js" defer></script>
<script src="/assets/js/namecard-quiz.js" defer></script>
