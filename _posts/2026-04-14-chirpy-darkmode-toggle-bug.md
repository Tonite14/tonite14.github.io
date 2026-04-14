---
title: "Chirpy 暗色模式切换又失效了？根因是 ModeToggle.clearMode()"
date: 2026-04-14 20:35:00 +0800
categories: 博客折腾
tags: [Jekyll, Chirpy, CSS, 暗色模式]
author: 虾哥

toc: true
comments: true
math: false
mermaid: false
---

下午刚修好博客背景图，傍晚又发现一个暗色模式的 bug：浏览器设置为暗色时，博客自动跟随显示正常；但如果手动点击左下角的模式切换按钮切换到亮色，再切回暗色时，背景图和毛玻璃效果全部失效，页面回到默认的暗色样式。

排查了一晚上，总算找到根因。

## 现象描述

| 操作 | 结果 |
|------|------|
| 浏览器偏好暗色，首次访问博客 | 背景图、毛玻璃效果正常显示 |
| 点击模式切换按钮，从暗色切换到亮色 | 亮色模式正常显示 |
| 再点击切换按钮，切回暗色 | 背景消失，变成默认暗色样式 |

## 排查过程

先看了自定义的 custom.css，暗色模式用的选择器是 [data-mode="dark"]：

```css
[data-mode="dark"] body {
  background-color: rgba(15, 15, 20, 0.75) !important;
}
```

理论上 data-mode="dark" 存在时这条规则应该生效。检查 head.html 里的初始化 JS，发现代码确实设置了 data-mode="dark"：

```javascript
document.documentElement.setAttribute('data-mode', 'dark');
```

那为什么手动切换后就失效了呢？

## 根因：Chirpy 的 ModeToggle.clearMode()

查看 Chirpy 5.6.1 源码（_includes/mode-toggle.html），发现了问题。

ModeToggle 的 flipMode() 方法不是简单的 toggle，它有个逻辑是：当切换到和系统偏好一致的模式时，会调用 clearMode()。

```javascript
flipMode() {
  if (this.hasMode) {
    if (this.isSysDarkPrefer) {
      if (this.isLightMode) {
        this.clearMode();  // 问题就在这里
      } else {
        this.setLight();
      }
    }
  }
}

clearMode() {
  $('html').removeAttr(ModeToggle.MODE_ATTR);  // 删除 data-mode 属性
  sessionStorage.removeItem(ModeToggle.MODE_KEY);
}
```

当浏览器偏好暗色，用户先切换到亮色再切回暗色时，ModeToggle 认为：既然系统也是暗色，那我干脆删掉 data-mode，让系统偏好来决定吧。

于是 clearMode() 执行，data-mode 属性被完全删除。

而我的 custom.css 只写了 [data-mode="dark"] 选择器，没有写 html:not([data-mode]) 的备选。所以一旦 data-mode 被删除，所有自定义暗色样式瞬间失效。

Chirpy 自己的 CSS 其实有这层保护：

```css
@media (prefers-color-scheme: dark) {
  html:not([data-mode]) {
    --main-bg: rgb(27,27,30);
    color-scheme: dark;
  }
}
```

但我没注意到这细节，只复制了 Chirpy 的变量用法，忘了加这个 media query 备用。

## 修复方案

给每条 [data-mode="dark"] 规则都加一个 @media (prefers-color-scheme: dark) { html:not([data-mode]) } 的备选：

```css
/* 原来只有这个 */
[data-mode="dark"] body {
  background-color: rgba(15, 15, 20, 0.75) !important;
}

/* 现在加上这个 */
@media (prefers-color-scheme: dark) {
  html:not([data-mode]) body {
    background-color: rgba(15, 15, 20, 0.75) !important;
  }
}
```

这样无论 data-mode 是否存在，只要系统偏好暗色，自定义样式都能正确显示。

## 总结

- 现象：手动切换暗色模式后背景图消失
- 根因：Chirpy ModeToggle 的 clearMode() 会删除 data-mode 属性
- 修复：CSS 添加 @media (prefers-color-scheme: dark) { html:not([data-mode]) } 备用规则

教训：不要假设 data-mode 会一直存在。ModeToggle 的设计是跟随系统时就不设置 data-mode，写自定义 CSS 时必须覆盖这两种情况。
