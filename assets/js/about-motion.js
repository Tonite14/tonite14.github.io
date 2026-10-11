/*
 * 「关于」页的交互补丁，由 _layouts/about.html 以 defer 引入，只在这一页运行。
 *
 *   1. 站内跳转的退场转场：点站内链接时，斜切面板盖满画面后再跳转（样式见 about.css 第 11 节）。
 *      从目的页返回时，不论是否命中 bfcache，都把面板收回，不让页面卡在过渡界面。
 *   2. 名片翻转（触屏和鼠标都适用）：点击时不让 label 去聚焦隐藏的 checkbox。checkbox 位于卡片顶边，
 *      聚焦会把页面滚到它那里，卡片只露出一部分时整页会跳动。这里自己切换 checked，视觉不变。
 *   3. 名片光条（仅触屏）：手机没有 hover，光条改由陀螺仪驱动（deviceorientation 的 gamma，左右倾斜）。
 *      iOS 13+ 要求在用户点击里请求授权，所以第一次点名片时请求；不需要授权的设备直接监听。
 *      没有读数或被拒绝时，about.css 里的自动扫光动画接管。
 */
(function () {
  'use strict';

  var touchOnly = window.matchMedia('(hover: none)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── 1. 退场转场 ─────────────────────────────────────────────────── */
  var exitEl = document.querySelector('.ab-exit');
  var exitLabel = exitEl && exitEl.querySelector('.ab-exit-label');
  var leaving = false;
  var jumpTimer = 0;
  var watchdog = 0;

  function clearExitTimers() {
    clearTimeout(jumpTimer);
    clearTimeout(watchdog);
    jumpTimer = 0;
    watchdog = 0;
  }

  function resetExit() {
    clearExitTimers();
    leaving = false;
    exitEl.classList.remove('is-active');
  }

  if (exitEl) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || leaving || e.defaultPrevented || reduceMotion.matches) return;
      /* 新标签打开、下载、外链、修饰键点击、同页跳转：走浏览器默认行为 */
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return;

      e.preventDefault();
      leaving = true;
      /* 转场文字只用英文：菜单项取英文名，其余链接用 data-exit-label */
      var en = a.querySelector('.ab-menu-en');
      exitLabel.textContent = a.getAttribute('data-exit-label') || (en ? en.textContent : '');
      exitEl.classList.add('is-active');
      jumpTimer = setTimeout(function () {
        jumpTimer = 0;
        location.href = url.href;
        /* 跳转后页面还在（导航迟迟没有提交或被取消）：超时收回面板，不让用户困在遮罩里 */
        watchdog = setTimeout(resetExit, 3000);
      }, 520);
    });

    /* 离开时清掉还没触发的跳转；否则 bfcache 恢复后，这个定时器会把页面再带走一次 */
    window.addEventListener('pagehide', clearExitTimers);

    window.addEventListener('pageshow', function (e) {
      if (!e.persisted) return;
      resetExit();
      /* 进场 splash 若还没播完就离开了，恢复后直接移除，避免盖在最上层 */
      var splash = document.querySelector('.ab-splash');
      if (splash) splash.remove();
    });

    /* 定时器已被清掉、页面又回到前台（没有经过 pageshow）：同样收回面板 */
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible' && leaving && !jumpTimer && !watchdog) resetExit();
    });
  }

  /* ── 2. 名片：触屏翻转 + 陀螺仪光条 ──────────────────────────────── */
  var nc = document.querySelector('.nc');
  var toggle = document.getElementById('nc-toggle');
  if (!nc || !toggle) return;

  var asked = false;
  var listening = false;
  var current = 0;  // 光条当前位置（%），每帧向 target 缓动
  var target = 0;
  var frame = 0;

  /* 点名片：自己切换 checked，不走 label 的默认行为。默认行为会聚焦隐藏的 checkbox，
     而 checkbox 在卡片顶边，聚焦会把页面滚到它那里（卡片只露出一部分时整页跳动） */
  document.addEventListener('click', function (e) {
    var hit = e.target.closest && e.target.closest('label.nc-hit');
    if (!hit) return;
    e.preventDefault();
    toggle.checked = !toggle.checked;
    askMotion();
  });

  /* iOS 13+ 必须在用户点击的同步代码里请求授权；只问一次，拒绝后不再弹。光条只给触屏设备 */
  function askMotion() {
    var DOE = window.DeviceOrientationEvent;
    if (asked || listening || !touchOnly.matches || reduceMotion.matches || !DOE) return;
    asked = true;
    if (typeof DOE.requestPermission === 'function') {
      DOE.requestPermission().then(function (state) {
        if (state === 'granted') listen();
      }).catch(function () {});
    } else {
      listen();
    }
  }

  function listen() {
    if (listening) return;
    listening = true;
    window.addEventListener('deviceorientation', onOrientation, false);
  }

  function onOrientation(e) {
    var g = e.gamma;
    if (typeof g !== 'number' || isNaN(g)) return;  // 没有陀螺仪时浏览器给 null
    /* gamma 是左右倾斜角。±25° 之内，光条从左边缘扫到右边缘，超出的部分夹住 */
    g = Math.max(-25, Math.min(25, g));
    var next = (g + 25) / 50 * 76 - 38;  // -38% ~ 38%，与 CSS 里的扫光范围一致
    if (nc.classList.contains('is-tilting') && Math.abs(next - target) < 0.02) return;
    target = next;
    if (!nc.classList.contains('is-tilting')) {
      current = target;  // 第一个读数直接定位，不从左侧滑过来
      nc.style.setProperty('--nc-sweep', current.toFixed(2) + '%');
      nc.classList.add('is-tilting');  // 关掉自动扫光，由这里接管
    }
    if (!frame) frame = requestAnimationFrame(step);
  }

  function step() {
    current += (target - current) * 0.12;  // 缓动：读数抖动时光条不会发闪
    var settled = Math.abs(target - current) < 0.05;
    if (settled) current = target;
    nc.style.setProperty('--nc-sweep', current.toFixed(2) + '%');
    frame = settled ? 0 : requestAnimationFrame(step);
  }

  /* 不需要授权的设备（Android 等）：页面一打开就开始监听 */
  if (touchOnly.matches && !reduceMotion.matches && window.DeviceOrientationEvent &&
      typeof window.DeviceOrientationEvent.requestPermission !== 'function') {
    listen();
  }
})();
