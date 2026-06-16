---
title: 现代前端工程化：package.json 完全指南
date: 2026-06-16 23:32:00 +0800
categories: 前端工程化
tags: [package.json, 前端, Node.js, 工程化]
author: 虾哥
pin: false
toc: true
comments: true
math: false
mermaid: false
---

## 一、文件是什么

`package.json` 是每个 Node.js/前端项目的**身份证 + 说明书 + 遥控器**。

```
身份证（项目元信息）→ name / version / author / description
说明书（依赖清单） → dependencies / devDependencies
遥控器（快捷命令） → scripts
```

没有它：
- 别人不知道你项目叫什么
- `pnpm install` 不知道装什么
- 不知道你的项目能跑什么命令

---

## 二、字段全解

### 2.1 元信息（必知）

```json
{
  "name": "my-project",          // 项目名，npm 唯一标识（小写、连字符分隔）
  "version": "1.0.0",           // 语义化版本：主版本.次版本.修订号
  "type": "module",             // "module" = ESM（import/export），不写默认 CommonJS
  "private": true,              // true 则禁止发布到 npm（公司项目设为 true）
  "description": "一个后台管理系统",
  "author": "张三 <zhang@example.com>",
  "license": "MIT",
  "repository": "https://github.com/user/repo"
}
```

### 2.2 版本号规则（SemVer）

```
1.2.3  →  主版本 . 次版本 . 修订号

主版本加 1  → 不兼容的 API 变更（vue 2 → vue 3）
次版本加 1  → 加了新功能，向后兼容
修订号加 1  → bug 修复，无新功能

^1.2.3 → >=1.2.3 且 <2.0.0  （允许次版本和修订号更新）
~1.2.3 → >=1.2.3 且 <1.3.0  （只允许修订号更新）
1.2.3  → 精确锁定此版本
```

### 2.3 scripts（快捷命令）

```json
{
  "scripts": {
    "dev": "vite",                        // 启动开发服务器
    "build": "vue-tsc && vite build",     // 类型检查 + 打包
    "build:staging": "vite build --mode staging",  // 打包测试环境
    "preview": "vite preview",            // 预览打包结果
    "lint": "eslint . --fix",             // 代码检查 + 自动修复
    "test": "vitest",                     // 跑测试
    "prepare": "husky"                    // Git hook 初始化
  }
}
```

**为什么需要 scripts？三个核心原因：**

| 原因 | 说明 |
|------|------|
| **PATH 注入** | `vite` 装在 `node_modules/.bin/`，不在系统 PATH，scripts 临时注入后你才能调 |
| **统一入口** | 换工具只改一行（vite → webpack），团队命令不变 |
| **组合命令** | `vue-tsc && vite build` 串行执行，有 `&&` 和 `||` 两种逻辑 |

```
&& → 前面成功才跑后面
|| → 前面失败才跑后面
&  → 前后同时跑
```

### 2.4 dependencies（运行时依赖）

```json
{
  "dependencies": {
    "vue": "^3.5.0",              // 框架
    "vue-router": "^4.6.0",       // 路由
    "pinia": "^3.0.0",            // 状态管理
    "axios": "^1.13.0",           // HTTP 请求
    "element-plus": "^2.13.0",    // UI 组件库
    "dayjs": "^1.11.0",           // 日期处理
    "lodash-es": "^4.17.0",       // 工具函数
    "nprogress": "^0.2.0",        // 进度条
    "vue-echarts": "^7.0.0",      // 图表
    "screenfull": "^6.0.0"        // 全屏
  }
}
```

**特征：会打包进最终代码，浏览器要运行。**

### 2.5 devDependencies（开发时依赖）

```json
{
  "devDependencies": {
    "vite": "^7.0.0",             // 构建工具
    "typescript": "^5.9.0",       // TS 编译器
    "vue-tsc": "^3.0.0",          // Vue 类型检查
    "eslint": "^9.0.0",           // 代码检查
    "prettier": "^3.0.0",         // 代码格式化
    "husky": "^9.0.0",            // Git hook 管理
    "lint-staged": "^16.0.0",     // 提交时检查改动的文件
    "vitest": "^4.0.0",           // 测试框架
    "@vitejs/plugin-vue": "^6.0.0",  // Vite Vue 插件
    "unocss": "^66.0.0",          // 原子化 CSS
    "sass-embedded": "^1.78.0"    // SCSS 预处理器
  }
}
```

**特征：只在本地开发/构建时用，不打包进最终代码（浏览器不需要 eslint）。**

```
对比表：
                 本地开发    打包后（pnpm build → dist/）
dependencies     ✅ 能用      ✅ 还在
devDependencies  ✅ 能用      ❌ 消失了
```

### 2.6 engines（运行环境要求）

```json
{
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=9.0.0"
  }
}
```

告诉团队和 CI/CD：低于这个版本跑不起来。

### 2.7 browserslist（目标浏览器）

```json
{
  "browserslist": [
    "> 1%",              // 全球份额 >1% 的浏览器
    "last 2 versions",   // 每款浏览器最新两个大版本
    "not dead"           // 排除已停止维护的（IE 等）
  ]
}
```

由 Vite、postcss-autoprefixer 等读取，决定要不要加浏览器前缀、要不要降级语法。

### 2.8 lint-staged（提交时检查）

```json
{
  "lint-staged": {
    "*.{js,ts,vue}": ["eslint --fix", "prettier --write"],
    "*.{css,scss}": ["prettier --write"]
  }
}
```

作用：`git commit` 时只检查**改过的文件**，而不是全项目扫描（快几千倍）。

完整链路：

```
git commit
  → husky（拦截 pre-commit）
  → lint-staged（找到你改的文件）
  → eslint --fix（规范检查 + 自动修）
  → prettier --write（格式化）
  → 没问题 ✅ → 允许提交
  → 有问题 ❌ → 拦截，提示你修
```

---

## 三、完整示例（可直接参考）

```json
{
  "name": "my-admin",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "description": "某后台管理系统",
  "author": "张三",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "build:prod": "vite build --mode production",
    "preview": "vite preview",
    "lint": "eslint . --fix",
    "format": "prettier --write .",
    "test": "vitest",
    "prepare": "husky"
  },
  "dependencies": {
    "axios": "^1.13.0",
    "dayjs": "^1.11.0",
    "element-plus": "^2.13.0",
    "pinia": "^3.0.0",
    "vue": "^3.5.0",
    "vue-router": "^4.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.0",
    "eslint": "^9.0.0",
    "husky": "^9.0.0",
    "lint-staged": "^16.0.0",
    "prettier": "^3.0.0",
    "sass-embedded": "^1.78.0",
    "typescript": "^5.9.0",
    "unocss": "^66.0.0",
    "unplugin-auto-import": "^21.0.0",
    "unplugin-vue-components": "^31.0.0",
    "vite": "^7.0.0",
    "vitest": "^4.0.0",
    "vue-tsc": "^3.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=9.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ],
  "lint-staged": {
    "*.{js,ts,vue,json,css,scss,md}": ["eslint --fix", "prettier --write"]
  }
}
```

---

## 四、面试常见问题速查

### Q1：dependencies 和 devDependencies 有什么区别？

> `pnpm install` 两个都装，但 `pnpm build` 只打包 dependencies。devDependencies 是构建工具/质检工具，浏览器不需要。

### Q2：为什么用 scripts 而不是直接敲 `vite dev`？

> 局部安装的命令在 `node_modules/.bin/`，不在系统 PATH，scripts 会临时注入路径。同时也提供统一入口，换工具只改一行。

### Q3：`^` 和 `~` 在版本号里什么意思？

> `^1.2.3` = 允许 1.x 范围内更新（次版本和修订号可变）；`~1.2.3` = 只允许修订号更新（1.2.x）。

### Q4：husky + lint-staged 是干什么的？

> husky 拦截 git commit，lint-staged 只检查改过的文件，配合 eslint/prettier 自动检查+修复，不合格不准提交。

### Q5：`"type": "module"` 不写会怎样？

> 默认走 CommonJS（`require`/`module.exports`），不能直接用 `import`/`export`。

### Q6：`"private": true` 为什么要写？

> 防止不小心 `npm publish` 把项目发布到 npm 公网。

### Q7：`&&` 和 `&` 在 scripts 里有什么区别？

> `vue-tsc && vite build` → 前面成功才跑后面；`vite & vite preview` → 前后同时跑。

---

## 五、一张图总结

```
package.json
├── 元信息     → 项目叫什么、谁写的、版本号
├── scripts    → 快捷命令（dev / build / lint / test）
├── dependencies → 浏览器要用的（vue / axios / pinia / element-plus）
├── devDependencies → 只在本地用的（vite / eslint / typescript / husky）
├── engines    → Node/pnpm 版本下限
├── browserslist → 兼容哪些浏览器
└── lint-staged → 提交时只检查改动的文件
```

---

> 一个规范的 package.json = 别人 3 分钟看懂你的项目，不用猜、不用问。
