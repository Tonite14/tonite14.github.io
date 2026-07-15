---
title: "localStorage、sessionStorage 与 Cookie：从状态保持到浏览器存储的演化"
date: 2026-07-15 23:49:00 +0800
categories: 八股
tags: [八股]
pin: false
author: Tonite14

toc: true
comments: true
typora-root-url: ../../tonite14.github.io
math: false
mermaid: true
---

前端存储是面试中的经典话题。localStorage、sessionStorage 与 Cookie 被反复放在一起比较，但初学时常常会感到困惑：Cookie 明明是 HTTP 协议中用来维持会话状态的机制，为什么总是被拉进"浏览器存储"的比较当中？本文从状态与存储的双重视角出发，梳理这三者（以及它们背后更大的家族）的关系，补全面试中容易被追问的脉络。

本文参考了掘金文章[《面试题深度解析：localStorage、sessionStorage 与 Cookie：前端存储的三大基石》](https://juejin.cn/post/7538737860543987751)。

## 三层存储：一张表快速区分

面试中最常见的开篇问题就是"它们有什么区别"。先给一张总览表，把硬指标定下来：

| | Cookie | localStorage | sessionStorage | IndexedDB |
|---|---|---|---|---|
| 容量 | ~4KB | ~5-10MB | ~5-10MB | 无上限（仅受硬盘限制） |
| 生命周期 | 可设过期，默认会话结束 | 永久（手动清除） | 标签页关闭即清除 | 永久（手动清除） |
| 作用域 | 可跨子域（Domain/Path） | 同源 | 同源 + 同标签页 | 同源 |
| 随 HTTP 请求发送 | ✅ 每次自动携带 | ❌ | ❌ | ❌ |
| API 类型 | 同步，字符串拼接 | 同步，getItem/setItem | 同步，getItem/setItem | 异步，事务 + 索引 |
| 可被 JS 访问 | 是（除非 HttpOnly） | 是 | 是 | 是 |

这张表能应付大部分面试开场。但要回答得深入，需要理解另一个问题：**为什么比较范围里偏偏出现了 Cookie？**

## 从"状态"到"存储"：Cookie 的双重身份

理解这个问题的关键，在于认识到 Cookie 在设计之初**并不是为了存储业务数据而诞生的**。

### HTTP 无状态与 Cookie 的诞生

HTTP 协议本质是无状态的：每一次请求都是独立的，服务器不会"记住"上一个请求是谁发的。对于一个需要登录的网站来说，这意味着用户每点一个链接，服务器都像第一次见到他一样：这显然没法用。

1994 年，Netscape 发明了 Cookie，思路非常直接：服务器在响应头里写一条 `Set-Cookie`，浏览器收到后保存在本地，后续每次请求自动把这条 Cookie 附在请求头里发回去。服务器读到 Cookie，就知道"哦，是刚才那个人"。

```http
HTTP/1.1 200 OK
Set-Cookie: session_id=abc123; Path=/; HttpOnly; Secure; SameSite=Lax
```

此后每一次请求，浏览器都会自动携带匹配的 Cookie：

```http
GET /api/user HTTP/1.1
Host: example.com
Cookie: session_id=abc123
```

这个过程是**全自动的**：开发者不需要手动读取 Cookie 再拼到请求里，浏览器自动完成。这个"自动携带"的特性，既是 Cookie 最核心的设计意图，也是它与 localStorage 等所有后来者最本质的区别。

所以 Cookie 的原始使命非常纯粹：**替服务器在浏览器里放一张小纸条，让服务器能在无状态的 HTTP 上认出回头客**。它是一个"状态通道"，不是"仓库"。

### 被当作存储用的 Cookie

问题出在历史时间线上。Cookie 诞生于 1994 年，而 localStorage 是 HTML5 时代（2009 年左右）才出现的。在中间这十五年里，Cookie 是浏览器里**唯一的持久化存储手段**。开发者想在客户端存点东西：用户偏好、表单草稿、浏览记录：除了 Cookie 没有第二条路。

这里需要补一句：Cookie 并非只能靠服务端 `Set-Cookie` 响应头写入，前端同样可以通过 `document.cookie` 直接操作。所以 1994 到 2009 那十五年，在 localStorage 出现之前，前端开发者就是用 `document.cookie` 硬扛存储需求的。

但 Cookie 的底层机制从来不是为了当仓库设计的：

- 只有 4KB，存不了多少东西；
- 每次 HTTP 请求自动带上，存得越多，请求越重；
- 操作方式是拼接字符串，读一次要手动 `split` 解析。

随着 Web 应用越来越重，Cookie 这个"临时工"终于撑不住了。HTML5 带来了专门的存储方案：localStorage（5MB，不随请求发送，键值对 API），之后又有了 IndexedDB（异步数据库，支持索引和事务）。Cookie 这才回到了它本该待的位置：只做认证通道，不再当仓库。

**所以这个问题的答案是**：Cookie 被拉进"浏览器存储"的比较，纯粹是历史原因。它在设计上是一个"状态工具"，恰好带了一点存储余量，然后被用成了存储工具，最后被真正的存储方案取代。面试中把 Cookie 和 localStorage 放在一起比较，不是因为它们在同一个分类里，而是因为在很长一段时间里，它们确确实实在争同一个生态位。

## Cookie、Session、Token：三个"记住访问者是谁"的机制

谈到 Cookie，就绕不开 Session 和 Token。这三者的关系是一条演化线。

### Cookie：服务端放在浏览器里的记号

上面已经讲到，Cookie 是"服务器借浏览器之手认人"的机制。数据存在浏览器端，但内容由服务端写入，每次请求自动带回。

问题很快暴露了：Cookie 只有 4KB，用户加了几件购物车商品就装不下。更麻烦的是，每次请求都带着全部 Cookie，请求越来越重。

### Session：真相留在服务器端

Session 的思路是"轻量化 Cookie，重数据存服务端"：Cookie 里只放一个 `session_id`，用户的所有状态（购物车、登录信息、权限）存在服务器的内存或 Redis 里。请求过来，服务端用 `session_id` 查一下，就知道这个用户的一切。

```
Cookie: "我是 9527 号客人，其他的服务端自己知道"
服务端: "哦对，9527 号买了 A/B/C，余额还有 200 块"
```

这个方案解决了 Cookie 容量的问题，但带来了新麻烦：服务器需要维护所有用户的 session。做集群部署时，A 机器的 session B 机器不认识，必须引入 Redis 做共享存储。用户量上去之后，session 存储本身就是一笔不小的开销。

### Token：客户端保管凭证，服务端不存了

Token（典型实现是 JWT）的思路是另一种极端：服务端直接把用户信息签名后发给客户端，不存任何东西。下次请求时，客户端把 token 放在 `Authorization` 头里带回来，服务端验证签名，签得过就信任其中的信息。

```http
GET /api/user HTTP/1.1
Authorization: Bearer eyJhbGciOi...（一段加密签名后的 JSON）
```

Token 的好处很明显：服务端无状态，天然适合分布式和跨域场景（移动端、第三方 API）。代价是 token 一旦发出就收不回来了，注销和权限变更需要用黑名单等额外机制补充。

| | Cookie | Session | Token（JWT） |
|---|---|---|---|
| 数据存哪 | 浏览器 | 服务器 | 客户端（加密自包含） |
| 服务器压力 | 每次解析 | 查存储 | 只验签名 |
| 跨域友好 | ❌ 同源限制 | 靠 Cookie 传 id，受同源限制 | ✅ Authorization 头随意带 |
| 集群扩展 | 单机 OK | 需要共享存储（Redis） | 天然分布式友好 |
| 注销难度 | 删除即可 | 删除即可 | 需额外机制（黑名单） |

三者不是替代关系，现实中经常混用：Cookie 里放 session_id → 服务端查 session 得到用户信息；Cookie 里放 JWT token → 服务端验签名直接得到用户信息（省去查 session 的步骤）。面试时理清这条演化线，就不至于把不同层面的东西搅在一起。

## localStorage 与 sessionStorage：浏览器自己的记事本

HTML5 带来的 localStorage 和 sessionStorage 在 API 上几乎一模一样，区别只在一个维度：**生命周期**。

### localStorage：持久化的前端存储

`localStorage` 的数据永久存储，除非用户手动清理或开发者调用 `clear()`。5MB 容量，不随 HTTP 请求发送，纯前端使用。

```javascript
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme'); // 'dark'
localStorage.removeItem('theme');
localStorage.clear();
```

典型场景：用户偏好（主题、语言、布局）、离线缓存、不需要发给服务端的配置。

需要注意的是，localStorage 的 API 是**同步的**：`getItem` 会阻塞主线程。小数据无所谓，但如果在循环里频繁读写，或者单条数据接近 5MB 上限，阻塞感就很明显。另外，localStorage **只能存字符串**，存对象必须 `JSON.stringify`，取出来再 `JSON.parse`。

localStorage 还有一个实用的 `storage` 事件：当**其他标签页**修改了同源的 localStorage，当前页面会收到通知。

```javascript
window.addEventListener('storage', (e) => {
  console.log(e.key, e.oldValue, e.newValue);
});
```

### sessionStorage：随标签页生死

`sessionStorage` 的 API 与 localStorage 完全相同，但数据只在**当前标签页会话**中存活。关闭标签页，数据自动清除。

更值得注意的特点是作用域：即使打开两个同源页面的标签页，它们的 sessionStorage 也是**互相隔离**的。这一点在单页应用里用得很多：表单草稿、多步骤向导的中间状态、敏感操作的一次性 token：都是"这个标签页关了就忘掉"的东西。

```javascript
// 表单自动保存
form.addEventListener('input', () => {
  sessionStorage.setItem('draft', JSON.stringify(formData));
});
// 标签页关闭后，draft 自动消失，无需手动清理
```

### 选择逻辑

这两个的选择极其简单：**关标签页后这个数据还有没有意义？**还有意义就 `localStorage`，没意义就 `sessionStorage`。

## 安全性视角：数据放在哪里更安全？

面试中经常会追问安全性的对比。核心矛盾在两点：**XSS（跨站脚本攻击）**和 **CSRF（跨站请求伪造）**。

| 威胁 | Cookie | localStorage / sessionStorage |
|---|---|---|
| XSS 可读 | 是（除非设 `HttpOnly`） | 是（无法防御） |
| CSRF 自动携带 | 是（高风险） | 否（不受影响） |

这个对比揭示了一个反直觉的结论：**Cookie 反而比 localStorage 更安全**：只要加上 `HttpOnly`。

`HttpOnly` 属性禁止 JavaScript 通过 `document.cookie` 读取 Cookie，但浏览器在发送 HTTP 请求时仍然会自动携带。这意味着即使页面被注入了恶意脚本（XSS），攻击者也偷不走登录凭证。而 localStorage 没有这种防御机制，一旦 XSS 成功，所有数据裸奔。

防御 CSRF 则靠 Cookie 的 `SameSite` 属性：

- `SameSite=Strict`：完全禁止跨站发送，最安全但可能影响体验（从外部链接点进来不带 Cookie，用户得重新登录）；
- `SameSite=Lax`（推荐）：允许链接跳转等安全的跨站请求携带 Cookie，但阻止 POST 表单、iframe 等危险操作；
- `SameSite=None`：允许跨站发送，必须配合 `Secure`（仅 HTTPS）使用。

**实战中的最佳实践**：用一条设置了 `HttpOnly + Secure + SameSite=Lax` 的 Cookie 存放 session_id 或 token 来做身份认证，防御 XSS 和 CSRF；用 localStorage 存放不敏感的大数据（主题、配置、缓存）；用 sessionStorage 存放临时数据（表单草稿）。

## 为什么 IndexedDB 也应该出现在比较里

大多数面试题只提 Cookie、localStorage、sessionStorage，不提 IndexedDB。但从工程角度看，IndexedDB 才是现代 Web 存储的终局方案：

- **异步 API**：不会阻塞主线程，适合频繁读写和大数据量操作；
- **支持索引**：可以建索引加速查询，不是键值对的盲扫；
- **支持复杂数据类型**：Blob、File、ArrayBuffer 都能直接存；
- **事务机制**：保证一批操作的原子性；
- **几乎无容量限制**：只受用户硬盘剩余空间约束。

典型场景：PWA 离线应用、消息列表缓存、大型文件（图片/视频）的本地存储。

IndexedDB 的原生 API 比较底层，一般使用封装库（如 `idb`）来做 Promise 化处理：

```javascript
import { openDB } from 'idb';

const db = await openDB('MyApp', 1, {
  upgrade(db) {
    const store = db.createObjectStore('messages', { keyPath: 'id' });
    store.createIndex('byTime', 'timestamp');
  },
});

// 批量写入
const tx = db.transaction('messages', 'readwrite');
await Promise.all([
  tx.store.put({ id: 1, text: 'hello', timestamp: Date.now() }),
  tx.store.put({ id: 2, text: 'world', timestamp: Date.now() }),
]);
await tx.done;
```

## 状态主权的转移：从服务端到客户端

理解完 Cookie（认证通道）和 Web Storage / IndexedDB（数据仓库）的区别之后，可以再往上一层看：这背后其实是 Web 应用架构的一个长期趋势：**状态从服务端向客户端迁移**。

```
1994 年：状态归服务端管，Cookie 只是一个记号 → 4KB 足够
2009 年：单页应用兴起，客户端的记忆需求暴增 → localStorage/sessionStorage
2015 年：PWA 出现，客户端要能干很多服务端的事 → IndexedDB
```

Cookie 里存的是"服务端的记忆"：是哪个用户、是否登录。localStorage 和 IndexedDB 里存的是"浏览器自己的记忆"：选了深色主题、写了半天的草稿、看过哪些消息。同样的"状态"二字，以前是服务端的财产，现在分了一大半给浏览器。

这个视角回答了最初的问题：**为什么 Cookie 总是被拉进存储比较里？因为在一开始，它就是浏览器唯一的存储**。我们现在分开看，是因为 localStorage 和 IndexedDB 把"存储"这件事单独做成了一类工具。Cookie 回归了自己的本质：HTTP 状态的通道，而真正的持久化存储有了自己的名字。

## 面试口述模板

> 这个问题其实分两个维度回答。第一层是硬指标对比：Cookie 4KB、自动附带在 HTTP 请求里、可以通过 `HttpOnly` 防 XSS 窃取、通过 `SameSite` 防 CSRF；localStorage 5MB、同步 API、永久存储、纯前端；sessionStorage 同 API、但标签页关闭就清除；IndexedDB 异步、支持索引和事务、适合大量结构化数据。
>
> 第二层是理解它们的关系：Cookie 被拉进这个比较，是因为在 localStorage 出现之前，它是浏览器里唯一的持久化存储手段。但它从一开始就是为 HTTP 状态管理设计的：每次请求自动携带。后来 Web 应用变重了，真正的存储需求催生了 localStorage 和 IndexedDB，Cookie 才回到了它本来的角色：认证通道。
>
> 实战中我用 Cookie（`HttpOnly + Secure + SameSite=Lax`）存 session_id 或 token，保障安全；用 localStorage 存主题、配置、缓存等不需要发给服务端的数据；用 sessionStorage 存表单草稿等临时数据；大量结构化数据走 IndexedDB。
