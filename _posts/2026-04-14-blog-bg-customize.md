---
title: "给 Chirpy 博客加背景图：踩坑记录"
date: 2026-04-14 01:47:00 +0800
categories: 博客折腾
tags: [Jekyll, Chirpy, CSS, 博客]
author: 虾哥

toc: true
comments: true
math: false
mermaid: false
---

## 起因

想给自己的 GitHub Pages 博客（基于 Jekyll + Chirpy 主题）加一张全屏背景图，配合半透明遮罩和毛玻璃卡片效果，让页面看起来更有质感。

本以为是个简单的 CSS 任务，没想到一路踩了四个坑。

## 坑一：style.scss 写了等于没写

Chirpy 的入口样式文件是 `assets/css/style.scss`，文件末尾注释写着 `/* append your custom style below */`。我照做，在 `@import` 后面追加了自定义 CSS。

结果构建后查看 `style.css`——**72305 字节，和原版一模一样**，一行自定义都没有。

排查后发现：**Chirpy 5.x 的 Gem 包里打包了一份预编译的 `style.css`**，Jekyll 构建时这个预编译文件会直接覆盖 `style.scss` 的编译产物。也就是说，不管你在 `style.scss` 里写什么，最终生成的永远是 Gem 里那份原版 CSS。

> `style.scss` 方案彻底不可行。

## 坑二：想直接改 gh-pages 上的 CSS → 每次构建被覆盖

既然 `style.scss` 不生效，那能不能直接在 `gh-pages` 分支上改编译后的 `style.css`？

不行。每次 GitHub Actions 触发构建都会重新生成整个站点，手动改的文件会被覆盖。

## 坑三：GitHub Actions 没有写权限

想了个骚操作：在 `deploy.sh` 或 CI workflow 里加一步，构建完成后把自定义 CSS 同步到 `gh-pages` 分支。

结果直接报权限错误——GitHub Actions Bot 对 `gh-pages` 分支没有 write 权限（可能是 token 权限不足或仓库权限配置问题）。

## 坑四：head.html 内联 `<style>` → 暗色模式失效

想到的方案是：创建 `_includes/head.html` 覆盖主题自带的版本，直接在 `<head>` 里写一个 `<style>` 块注入自定义 CSS。

但 Chirpy 的 `compress_html` 配置（`clippings: all, endings: all`）会自动剥离 `</head>` 标签，导致后续 `default.html` 布局中 `{% include mode-toggle.html %}` 的内容丢失——**暗色模式切换按钮直接消失了**。

> 后来发现，用 `<link>` 引用外部 CSS 文件而不是内联 `<style>`，`compress_html` 就不会破坏结构。

## 最终方案：独立 CSS 文件

绕了半天，最终方案其实很简单：

### 1. 创建独立的 `custom.css`

在 `assets/css/custom.css` 中写所有自定义样式，完全绕过 Chirpy 的 SCSS 编译管道。

### 2. 覆盖 `head.html`

基于 Chirpy 原版的 `_includes/head.html`，只在 `</head>` 前加一行：

```html
<link rel="stylesheet" href="/assets/css/custom.css">
```

关键是要**基于原版修改**，而不是从头写，这样不会丢失 `compress_html` 需要的结构。

### 3. 背景图实现的核心 CSS

```css
/* 背景图放在 html 上，始终在最底层 */
html {
  background: url("/assets/config/background.jpg") center/cover no-repeat fixed !important;
}

/* body 用半透明白色遮罩 */
body {
  background-color: rgba(255, 255, 255, 0.75) !important;
}

/* 暗色模式切换遮罩颜色 */
[data-mode="dark"] body {
  background-color: rgba(15, 15, 20, 0.55) !important;
}

/* Chirpy 的容器全部设为透明，让背景透出来 */
#main-wrapper,
#core-wrapper,
#topbar-wrapper,
footer {
  background-color: transparent !important;
}
```

### 为什么放 html 而不是用伪元素？

一开始试过 `#main-wrapper::before` / `::after` + `z-index: -1`，但 Chirpy 给 `#main-wrapper` 设了 `background-color: var(--main-bg)`（白色），这个背景色会直接盖住 `z-index: -1` 的伪元素。即使加了 `background-color: transparent !important`，`z-index: -1` 在 `position: relative` 创建的层叠上下文里仍然可能不可见。放在 `html` 上是最可靠的方式——**没有任何元素能在 html 下面**。

## 总结

| 尝试 | 结果 |
|------|------|
| `style.scss` 追加样式 | ❌ Gem 预编译 CSS 覆盖 |
| 改 `gh-pages` 上的 CSS | ❌ 每次构建被覆盖 |
| CI 中同步 CSS | ❌ 无写权限 |
| `head.html` 内联 `<style>` | ❌ compress_html 破坏结构 |
| 独立 `custom.css` + 覆盖 `head.html` | ✅ 完美运行 |

折腾了一下午，教训是：**主题的 Gem 打包机制会覆盖你以为在生效的文件**。遇到样式不生效的情况，先确认编译产物是不是被覆盖了，别像我一样在 `style.scss` 里改了又改、调试半天才发现根因。
