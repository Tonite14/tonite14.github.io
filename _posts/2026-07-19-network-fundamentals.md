---
title: 网络知识体系：从基础协议到 Web 安全
date: 2026-07-19 19:37:00 +0800
categories: [网络, 八股]
tags: [网络, 协议, 安全, 八股]
pin: false
author: Tonite14

toc: true
comments: true
typora-root-url: ../../tonite14.github.io
math: false
mermaid: true
---

## 网络模型与分层架构

### OSI 七层模型与 TCP/IP 四层模型

网络通信的复杂性被分层模型所管理。理论上存在 OSI 七层参考模型，但工程实践中遵循的是 TCP/IP 四层模型。两者的对应关系以及各层代表性协议如下：

| 层级 | OSI 七层 | TCP/IP 四层 | 代表性协议 |
|---|---|---|---|
| 7 | 应用层 | 应用层 | HTTP、HTTPS、DNS、FTP、SMTP |
| 6 | 表示层 | 应用层 | TLS/SSL（加密与压缩） |
| 5 | 会话层 | 应用层 | TLS/SSL（会话管理） |
| 4 | 传输层 | 传输层 | TCP、UDP |
| 3 | 网络层 | 网络层 | IP、ICMP、ARP |
| 2 | 数据链路层 | 网络接口层 | Ethernet、Wi-Fi |
| 1 | 物理层 | 网络接口层 | 光纤、双绞线、无线电 |

> 分层模型的核心价值在于"各层独立演进"：应用层协议（HTTP/3）可以从 TCP 切换到 QUIC，传输层无需感知上层语义；网络层仅负责寻址与路由，不关心传输内容的可靠性。

对于前端开发，需重点关注的是**应用层（HTTP/HTTPS）**和**传输层（TCP/UDP）**两个层次。网络层以下由操作系统和硬件处理。

### 数据封装与解封装

数据在发送端自上而下逐层封装——每层在前一层数据前添加本层的头部信息（Header），到达链路层后转为电信号或光信号传输。接收端自下而上逐层解封装，每层读取并剥离本层头部后将载荷上交给上一层。这一过程保证了层与层之间的解耦。

```
发送端                              接收端
应用层  [HTTP Data]                [HTTP Data]  应用层
传输层  [TCP Hdr | HTTP Data]      [TCP Hdr | HTTP Data]  传输层
网络层  [IP Hdr | TCP Hdr | ...]   [IP Hdr | TCP Hdr | ...]  网络层
```

---

## 应用层核心协议：HTTP

### HTTP 的演进

HTTP（HyperText Transfer Protocol）是无状态的应用层协议，自 1991 年提出以来经历了四个主要版本：

**HTTP/0.9（1991）**：仅支持 GET 方法，无请求头与响应头，响应内容仅为 HTML 文件本身，无状态码。完成一次请求后 TCP 连接立即关闭。

**HTTP/1.0（1996）**：引入请求头与响应头（`Content-Type`、`Content-Length` 等）、状态码（`200 OK`、`404 Not Found`）、以及 POST/HEAD 方法。但每次 HTTP 请求仍需要独立的 TCP 连接（短连接），页面加载中的多次请求引发大量 TCP 握手开销。

**HTTP/1.1（1997）**：两个关键改进：

- **持久连接（Keep-Alive）**：默认不在每次请求后关闭 TCP 连接，多个请求复用同一条 TCP 连接，大幅降低握手开销。
- **管道化（Pipelining）**：允许在前一个请求的响应到达之前发送下一个请求。但由于必须按序返回响应，队头阻塞（Head-of-Line Blocking）问题严重——第一个响应延迟将阻塞后续所有响应的传输。

**HTTP/2（2015）**：不再采用文本协议，改为二进制帧传输，核心改进：

- **多路复用（Multiplexing）**：同一 TCP 连接上多个请求的帧交错传输，接收端按 Stream ID 重组。从协议层面消除了 HTTP/1.1 的队头阻塞。
- **头部压缩（HPACK）**：静态表 + 动态表 + Huffman 编码，同一连接上的请求头去重。
- **服务端推送（Server Push）**：服务端可主动向客户端推送资源，无需等待客户端显式请求。

**HTTP/3**：将底层传输从 TCP 替换为 QUIC（基于 UDP），从根本上解决了 TCP 层的队头阻塞问题（TCP 按字节序号交付，一个包的丢失会阻塞其后所有包的递交，即使它们属于不同的 HTTP 请求流）。

### HTTP 请求方法

| 方法 | 语义 | 幂等性 | 请求体 | 典型用途 |
|---|---|---|---|---|
| GET | 获取资源 | ✓ | 无 | 查询、页面访问 |
| POST | 创建资源 | ✗ | 有 | 表单提交、新增数据 |
| PUT | 全量更新 | ✓ | 有 | 完整替换资源 |
| PATCH | 部分更新 | ✗ | 有 | 修改资源的部分字段 |
| DELETE | 删除资源 | ✓ | 无 | 删除数据 |
| HEAD | 获取响应头 | ✓ | 无 | 检查资源存在性 |
| OPTIONS | 获取支持的方法 | ✓ | 无 | CORS 预检请求 |

> 幂等性（Idempotency）指同一操作执行一次与执行多次产生的副作用相同。GET、PUT、DELETE 是幂等的；POST 每次执行都创建新资源，不具备幂等性。这一区别在接口设计时需加以区分——幂等接口可安全重试，非幂等接口的重试需附加去重机制。

### HTTP 状态码

状态码首位数字表意分类：

- **1xx（信息）**：请求已接受，继续处理。`101 Switching Protocols`（WebSocket 升级）。
- **2xx（成功）**：`200 OK`（请求成功）、`201 Created`（资源创建成功）、`204 No Content`（成功但无返回体）。
- **3xx（重定向）**：`301 Moved Permanently`（永久重定向，搜索引擎更新索引）、`302 Found`（临时重定向）、`304 Not Modified`（协商缓存命中）。
- **4xx（客户端错误）**：`400 Bad Request`（请求参数有误）、`401 Unauthorized`（未认证）、`403 Forbidden`（已认证但无权限）、`404 Not Found`、`405 Method Not Allowed`。
- **5xx（服务端错误）**：`500 Internal Server Error`、`502 Bad Gateway`（上游服务不可用）、`503 Service Unavailable`。

---

## 传输层：TCP 与 UDP

### 核心差异

| 特性 | TCP | UDP |
|---|---|---|
| 连接模型 | 面向连接（三次握手 + 四次挥手） | 无连接 |
| 可靠性 | 确认重传、按序交付 | 不保证送达、不保证顺序 |
| 头部开销 | 20 字节（最小） | 8 字节 |
| 速度 | 较慢（拥塞控制、流量控制） | 较快 |
| 适用场景 | HTTP、文件传输、邮件 | DNS 查询、视频直播、在线游戏 |

UDP 的"不可靠"并非缺陷：对于 DNS 查询和实时视频流，重传带来的延迟比丢包本身更不可接受。HTTP/3 选用 QUIC（基于 UDP）而弃用 TCP，正是因为 TCP 的可靠性机制在丢包场景下产生的队头阻塞对现代 Web 体验的伤害超过了其可靠性带来的收益。

### TCP 三次握手与四次挥手

**三次握手** 的目标是在不可靠的 IP 网络上建立可靠的传输通道：

1. 客户端发送 SYN（同步序列号，`x`）
2. 服务端应答 SYN + ACK（`y`，`x + 1`）
3. 客户端应答 ACK（`y + 1`）

两次握手失败的原因在于网络延迟和重传的旧连接请求。若只有两次握手，服务端收到一个过期的 SYN 即认为连接已建立，而客户端早已放弃该连接，这将导致服务端空等。第三次握手的 ACK 确认了双方序列号的同步完成。

**四次挥手** 之所以比握手多一次，是因为 TCP 连接是全双工的——每个方向需要独立关闭：

1. 客户端 FIN（我不再发数据了）
2. 服务端 ACK（收到，但我可能还有数据要发）
3. 服务端 FIN（我也不再发数据了）
4. 客户端 ACK

---

## Web 安全：同源策略与跨域

### 同源策略

**定义**：浏览器的核心安全机制。同源指协议（protocol）、域名（host）、端口（port）三者完全一致。三个要素中任一不同，都构成跨域。

| 对比 | 源 A | 源 B | 是否同源 |
|---|---|---|---|
| 不同协议 | `https://a.com` | `http://a.com` | ✗ |
| 不同域名 | `http://a.com` | `http://b.com` | ✗ |
| 不同子域 | `http://a.com` | `http://sub.a.com` | ✗ |
| 不同端口 | `http://a.com:80` | `http://a.com:8080` | ✗ |

同源策略限制的是浏览器端 JavaScript 的跨域读写行为，具体表现为：

- DOM 访问限制：不同源的 iframe 之间无法通过 JS 读取对方 DOM
- Cookie / LocalStorage / IndexedDB 限制：按源隔离
- XHR / Fetch 请求限制：浏览器拦截非同源请求的响应，JS 无法读取返回数据

> 两次"拦截"的精确位置不同：请求实际上已发出，服务器正常接收并返回了响应，但浏览器拒绝将响应数据交给 JavaScript。用 Postman 能成功调通而浏览器不能，根源正在于此——Postman 作为服务端工具不受同源策略约束。

**动机**：在跨站请求伪造（CSRF）出现之前，同源策略的设计初衷是防止恶意网站读取其他源的敏感数据。一个典型攻击场景为——登录 A 银行后，访问恶意网站 B，若无同源策略，B 网站的 JavaScript 可以通过 iframe 读取 A 银行页面的 DOM 内容，窃取账户余额和交易记录。同源策略从根本上阻断了这一攻击路径。

### 跨域解决方案

**CORS（Cross-Origin Resource Sharing）**：W3C 标准方案，通过 HTTP 响应头告知浏览器允许跨域访问。

简单请求与复杂请求的区分机制：满足"GET/POST/HEAD 方法 + 仅 `Accept`/`Accept-Language`/`Content-Language`/`Content-Type`（限 `text/plain`/`multipart/form-data`/`application/x-www-form-urlencoded` 三种值）"条件的为简单请求，浏览器直接发送请求并检查响应头中的 `Access-Control-Allow-Origin`；不满足此条件的为复杂请求，浏览器先发送 OPTIONS 预检请求，待服务端确认允许后方发送正式请求。

核心响应头：

```
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true  // 允许携带 Cookie
```

> 如需携带 Cookie，`Access-Control-Allow-Origin` 必须指定具体域名（不能为 `*`），且必须设置 `Access-Control-Allow-Credentials: true`。同时 XMLHttpRequest 需设置 `withCredentials = true`（Fetch API 为 `credentials: 'include'`）。

**开发环境代理（Vite Proxy / Webpack DevServer Proxy）**：在开发服务器上配置路径转发。浏览器请求同源的 dev server，dev server 以服务端身份转发至目标 API。服务端之间的通信不受浏览器同源策略限制。

```javascript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

**Nginx 反向代理**：生产环境中的等价方案。部署在服务器端的 Nginx 将特定路径的请求转发至后端服务，对浏览器而言所有请求均指向同一源。

**JSONP**：利用 `<script>` 标签不受同源策略限制的特性，通过动态创建 script 标签并指定回调函数名来获取跨域数据。仅支持 GET 方法，安全风险高（XSS），在现代开发中已不被推荐。

---

## Web 安全：攻击与防御

### XSS（Cross-Site Scripting，跨站脚本攻击）

**定义**：攻击者将恶意脚本注入目标页面，当其他用户访问该页面时脚本被执行，从而窃取 Cookie、会话令牌、或篡改页面内容。

**三种类型**：

**存储型 XSS（Stored XSS）**：攻击者提交的恶意脚本被持久化存储于服务端（数据库、日志、评论），当其他用户请求包含该数据的页面时，脚本从服务端返回并执行。其攻击范围最广，所有访问该页面的用户均受影响。典型场景为论坛帖子和用户评论区。

**反射型 XSS（Reflected XSS）**：恶意脚本包含在 URL 参数中，服务端将参数原样嵌入响应 HTML 而不做转义。攻击者通过诱导受害者点击精心构造的链接来触发。受限于需要用户主动点击，攻击范围小于存储型，但构造成本也更低。典型场景为搜索框的搜索词回显。

**DOM 型 XSS**：恶意脚本的注入与执行全程发生在浏览器端，不经过服务端。攻击者将恶意代码嵌入 URL 片段（`#`）或参数中，页面 JavaScript 在从 `document.location` 或 `innerHTML` 读取并处理用户输入时将其执行。服务端日志和 WAF 对此类攻击完全不可见，因其从未将恶意数据发送至服务端。

**防御策略**：

- **输入验证与输出转义**：所有用户输入在输出到 HTML 前进行 HTML 实体编码（`<` → `&lt;`、`>` → `&gt;`、`"` → `&quot;`）。在 Vue/React 等现代框架中，模板插值（`{{ }}` / `{ }`）默认执行此转义，此为主要防线。
- **CSP（Content Security Policy）**：HTTP 响应头 `Content-Security-Policy` 声明允许加载资源的合法来源白名单，禁止内联脚本的执行。
- **HttpOnly Cookie**：标记 `HttpOnly` 的 Cookie 无法通过 `document.cookie` 读取，即使页面被注入脚本，也无法窃取 Cookie 中的会话令牌。
- **避免危险 API**：不使用 `innerHTML`、`document.write`、`eval()`、`setTimeout(string)` 处理不可信数据。若不可避免，需经 DOMPurify 等独立清洗库处理。

> CSP 是纵深防御的核心：即使输入转义出现遗漏（如富文本编辑器）、或第三方脚本被劫持，CSP 仍然能够在浏览器端阻截注入代码的执行。`script-src 'self'` 禁止任何内联脚本及外部脚本加载，是 CSP 规则的最低基线。

### CSRF（Cross-Site Request Forgery，跨站请求伪造）

**定义**：攻击者诱导已登录用户在不知情的情况下向目标网站发送请求，利用浏览器自动携带 Cookie 的机制，以用户的身份执行非用户本意的操作。

**攻击流程**：

```
1. 用户登录 bank.com —— 浏览器存储认证 Cookie
2. 用户访问恶意网站 evil.com（或在邮件中点击恶意链接）
3. evil.com 向 bank.com/transfer?to=hacker&amount=10000 发起请求
4. 浏览器自动携带 bank.com 的 Cookie 发送请求
5. bank.com 收到请求，验证 Cookie 有效，执行转账操作
```

> CSRF 攻击成功的关键在于两个条件的交集：浏览器在跨站请求中依然携带目标站的 Cookie（默认行为）、服务端仅凭 Cookie 识别用户身份。XSS 攻击的目标是获取用户权限以执行脚本，CSRF 攻击的目标是利用用户已有的认证状态伪造请求。

**防御策略**：

- **SameSite Cookie**：`Set-Cookie: session=xxx; SameSite=Strict`。`Strict` 模式禁止任何跨站请求携带 Cookie；`Lax` 模式允许顶级导航（如点击链接）携带 Cookie 但禁止跨站子请求（`<img>`、`<form>` POST 等）携带。SameSite 是浏览器层面的内置防护，部署成本最低。
- **CSRF Token**：服务端生成随机 Token，嵌入页面表单的隐藏字段。攻击者无法读取目标域的 Token（受同源策略保护），伪造的请求因缺少 Token 被服务端拒绝。
- **Referer / Origin 校验**：服务端检查请求头中的 `Referer` 或 `Origin` 字段，拒绝来源非站内的请求。
- **双重 Cookie 验证**：JS 从 Cookie 读取 Token 并放入自定义请求头。攻击者无法从跨站场景读取 Cookie 内容，但可通过自定义请求头 Token 的携带，使服务端比对 Cookie Token 与请求头 Token 是否一致。

### XSS 与 CSRF 的区别

| 维度 | XSS | CSRF |
|---|---|---|
| 攻击目标 | 在受害者的浏览器中执行脚本 | 利用受害者的登录态伪造请求 |
| 攻击条件 | 页面存在注入点，用户访问该页面 | 用户已登录目标站，访问恶意页面 |
| 利用的机制 | 输入过滤不严格 + 输出转义缺失 | 浏览器自动携带 Cookie 的行为 |
| 影响范围 | 窃取数据、劫持会话、篡改页面 | 以用户身份执行操作（转账、发帖、改密码） |
| 核心防御 | 输出转义 + CSP + HttpOnly | SameSite + CSRF Token + Origin 校验 |

> 两项攻击存在联动可能：XSS 可在注入脚本后获取页面中的 CSRF Token，从而使 Token 防御机制失效。因此 XSS 是更底层的安全威胁——防御 XSS 失效将连带攻破 CSRF 防御。完整的 Web 安全体系必须同时覆盖两者。

---

## 额外收录：HTTPS 与 TLS 握手

### 为什么需要 HTTPS

HTTP 的三项固有缺陷决定了 HTTPS 的必要性：

- **明文传输**：HTTP 报文以纯文本在网络上传输，任何中间节点均可读取内容
- **无身份验证**：客户端无法确认与己方通信的服务端身份，可能被 DNS 劫持至仿冒站点
- **数据完整性无保证**：报文可能在传输过程中被中间人篡改而双方均不知情

HTTPS = HTTP + TLS（Transport Layer Security）。TLS 在 TCP 与 HTTP 之间插入加密层，提供三项保障：**机密性**（对称加密）、**身份认证**（证书 + 非对称加密）、**完整性**（消息认证码 MAC）。

### TLS 握手简述

TLS 握手发生在 TCP 三次握手之后、HTTP 通信之前：

1. 客户端发送 ClientHello（支持的密码套件列表 + 随机数）
2. 服务端返回 ServerHello（选定的密码套件 + 随机数 + 证书）
3. 客户端验证证书（CA 签名链），生成 Pre-Master Secret，用服务端公钥加密发送
4. 双方通过随机数 + Pre-Master Secret 通过 PRF 导出对称会话密钥
5. 双方发送 Finished 消息（由会话密钥加密），验证加解密通道正常工作

> ECDHE（Elliptic Curve Diffie-Hellman Ephemeral）密钥交换算法是当前主流方案：每次会话生成独立的临时密钥对，即使服务端私钥事后泄漏，历史会话的密钥也无法被推导（前向安全性）。而 RSA 密钥交换中，服务端的长期私钥一旦泄露，所有历史通信均可被解密。

握手后的数据传输使用对称加密（AES-GCM 等），因对称加密性能远优于非对称加密。握手阶段的不对称加密仅用于安全地协商会话密钥。

