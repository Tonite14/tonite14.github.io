---
title: "Jekyll 侧边栏自定义"最近"Tab 页实现记录"
date: 2026-07-18 01:15:00 +0800
categories: 博客折腾
tags: [Jekyll, Chirpy, Ruby, 博客]
pin: false
author: 虾哥

toc: true
comments: true
typora-root-url: ../../tonite14.github.io
math: false
mermaid: true
---

## 需求

博客文章越来越多，希望侧边栏新增一个「最近」tab 页，按最后修改时间（`last_modified_at`）降序展示最近 7 天内修改或新建的文章，不足 10 篇时用最新文章补齐。

## 技术方案

Chirpy v5.1 侧边栏的 tab 页由 `_tabs/*.md` 文件 + `collections.tabs` 驱动。常规做法是自定义 layout 分页，但不干净。

最终采用 **纯 Ruby Generator plugin** 方案：

- Generator 在构建时截获 `_tabs/recent.md`，注入排序好的 HTML 内容
- 不写任何自定义 `_layout`、`_include` 文件
- 卡片的 HTML 结构手动拼出，与主题 `#post-list .post-preview` 样式无缝对接

## 文件清单

### 新增

| 文件 | 作用 |
|------|------|
| `_plugins/recent-posts-generator.rb` | Jekyll Generator，按 `last_modified_at` 排序、筛选、分页，注入 HTML |
| `_tabs/recent.md` | 侧边栏 tab 注册，`layout: page`，内容由 generator 注入 |

### 修改

| 文件 | 改动 |
|------|------|
| `_data/locales/zh-CN.yml` | 添加 `recent: 最近` 翻译条目 |
| `_tabs/categories.md` | order 1→2 |
| `_tabs/tags.md` | order 2→3 |
| `_tabs/archives.md` | order 3→4 |
| `_tabs/friends.md` | order 4→5 |
| `_tabs/about.md` | order 5→6 |

### 删除（早期方案残留）

| 文件 | 原因 |
|------|------|
| `_layouts/recent.html` | 自定义 layout 与 Chirpy 自动渲染冲突，导致构建失败 |
| `_includes/recent-paginator.html` | generator 已内联分页器 HTML，无需单独 include |

侧边栏最终顺序：首页 → **最近** → 分类 → 标签 → 归档 → 友链 → 关于。

## Generator 核心逻辑

```ruby
# 1. 按 last_modified_at 降序排序
sorted = posts_with_lastmod.sort_by { |e| e[:lastmod] }.reverse

# 2. 筛选 7 天内
recent = sorted.select { |e| e[:lastmod] >= one_week_ago }

# 3. 不足 10 篇用最新文章补齐
if recent.length < per_page
  recent.concat(sorted.reject { ... }.first(per_page - recent.length))
end
```

### Page 1 与 Pages 2+ 的不同处理

- **Page 1**：从 `site.collections['tabs'].docs` 找到 `recent.md`，直接 `tab_page.content = build_html(...)`
- **Pages 2+**：`Jekyll::Page.new(...)` 创建新页面，写入 `recent/page{N}/` 目录

## 卡片样式细节

### 整卡可点击

不用 `<a>` 包裹整张卡片（会破坏 `#post-list .post-preview` 的 CSS 布局），而是 `data-url` 属性 + 内联 JS：

```javascript
cards[i].addEventListener('click', function() {
  var url = this.getAttribute('data-url');
  if (url) window.location.href = url;
});
```

### 标题纯文本 + 粗体

标题 `<h1>` 不嵌套 `<a>`，直接 `<h1 style="font-weight:700;">`，与首页卡片标题一致。

### 摘要 Markdown 清洗

Generator 在 Ruby 侧做正则清洗，去掉代码块、行内代码、标题/引用/列表标记、粗斜体、链接、图片、水平线：

```ruby
raw = raw.gsub(/```[\s\S]*?```/, '')   # 代码块
         .gsub(/`[^`]+`/, '')          # 行内代码
         .gsub(/^[#>\-*+]+\s*/, '')    # 标题/引用/列表
         .gsub(/\*\*([^*]+)\*\*/, '\1') # 粗体
         .gsub(/\[([^\]]+)\]\([^)]+\)/, '\1') # 链接
         # ...
```

### 时间图标区分

```ruby
date_same_day = (post.date.year == lm.year && post.date.yday == lm.yday)
if date_same_day
  icon  = 'far fa-calendar fa-fw'     # 📅 创建日期
  label = post.date.strftime('%Y-%m-%d')
else
  icon  = 'fas fa-edit fa-fw'         # ✏️ 修改日期
  label = lm.strftime('%Y-%m-%d') + ' 更新'
end
```

- 创建时间与修改时间相同 → 日历图标 + 日期（和首页一致）
- 创建时间与修改时间不同 → 编辑图标 + 修改日期 + "更新"后缀

## 踩坑记录

1. **`_layouts/recent.html` 导致构建失败**：Chirpy 的 tab 页面自动渲染路由，如果再手动写 layout 文件 + generator 也生成同名页面，会路径冲突。正确做法是 generator 直接往 tab page 注入 `content`。

2. **`site.pages` 找不到 tab**：Chirpy 把 tab 存在 `site.collections['tabs'].docs` 而非 `site.pages`。查找顺序：先 collections 后 pages。

3. **`fa-pen-to-square` 图标不显示**：Font Awesome 6.1 新增，Chirpy v5.1 绑定的 FA 版本不支持。换成 `fa-edit`（FA 5+ 全版本通用）。

4. **Ruby `rescue` 语法**：不能直接跟在 `if` 表达式后面，必须用 `begin...rescue...end` 包裹。

## 效果

🎯 侧边栏新增"最近"tab → `/recent/` 页面按最后修改时间排序，卡片风格与首页完全一致，支持分页。已上线 [tonite14.github.io/recent/](https://tonite14.github.io/recent/)。
