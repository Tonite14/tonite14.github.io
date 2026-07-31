---
title: 关于
icon: fas fa-info
order: 6
---

<!-- ===== Terminal Business Card ===== -->
<div class="terminal-card">
  <div class="terminal-header">
    <span class="terminal-btn close"></span>
    <span class="terminal-btn minimize"></span>
    <span class="terminal-btn maximize"></span>
    <span class="terminal-title">tonite14@github:~</span>
  </div>

  <div class="terminal-body">
    <div class="terminal-avatar">
      <img src="/assets/config/avatar.jpg" alt="Tonite14" />
    </div>

    <div class="terminal-line">
      <span class="prompt">tonite14@github</span>:<span class="path">~</span>$ <span class="cmd" id="cmd-1"></span><span class="cursor">_</span>
    </div>
    <div class="terminal-output" id="out-1"></div>

    <div class="terminal-line">
      <span class="prompt">tonite14@github</span>:<span class="path">~</span>$ <span class="cmd" id="cmd-2"></span><span class="cursor hidden">_</span>
    </div>
    <div class="terminal-output" id="out-2"></div>

    <div class="terminal-line">
      <span class="prompt">tonite14@github</span>:<span class="path">~</span>$ <span class="cmd" id="cmd-3"></span><span class="cursor hidden">_</span>
    </div>
    <div class="terminal-output" id="out-3"></div>

    <div class="terminal-line">
      <span class="prompt">tonite14@github</span>:<span class="path">~</span>$ <span class="cmd" id="cmd-4"></span><span class="cursor hidden">_</span>
    </div>
    <div class="terminal-output" id="out-4"></div>

    <div class="terminal-line final-line">
      <span class="prompt">tonite14@github</span>:<span class="path">~</span>$ <span class="cursor">_</span>
    </div>

    <div class="terminal-social">
      <a href="https://github.com/tonite14" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>
      <a href="mailto:tonite14@gmail.com" target="_blank" rel="noopener"><i class="fas fa-envelope"></i></a>
    </div>
  </div>
</div>

<style>
/* Terminal card */
.terminal-card {
  max-width: 640px;
  margin: 0 auto;
  background: rgba(13, 17, 23, 0.92);
  border: 1px solid rgba(48, 54, 61, 0.85);
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55);
  overflow: hidden;
  font-family: "SFMono-Regular", "Fira Code", "JetBrains Mono", Consolas, "Noto Sans SC", monospace;
  color: #c9d1d9;
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(22, 27, 34, 0.95);
  border-bottom: 1px solid rgba(48, 54, 61, 0.85);
}

.terminal-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.terminal-btn.close    { background: #ff5f56; }
.terminal-btn.minimize { background: #ffbd2e; }
.terminal-btn.maximize { background: #27c93f; }

.terminal-title {
  margin-left: 0.75rem;
  font-size: 0.78rem;
  color: #8b949e;
  opacity: 0.85;
}

.terminal-body {
  padding: 1.75rem 1.5rem 1.25rem;
  position: relative;
}

.terminal-avatar {
  width: 90px;
  height: 90px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(110, 118, 129, 0.45);
  box-shadow: 0 0 0 4px rgba(35, 197, 94, 0.12);
}

.terminal-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.terminal-line {
  font-size: 0.92rem;
  line-height: 1.85;
  white-space: pre-wrap;
  word-break: break-word;
}

.terminal-line .prompt { color: #7ee787; font-weight: 600; }
.terminal-line .path   { color: #79c0ff; font-weight: 600; }
.terminal-line .cmd    { color: #e6edf3; }
.terminal-line .cursor {
  display: inline-block;
  color: #3fb950;
  animation: blink 1s step-end infinite;
}
.terminal-line .cursor.hidden { display: none; }

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.terminal-output {
  margin: 0.25rem 0 1rem 0;
  padding-left: 0.15rem;
  font-size: 0.9rem;
  line-height: 1.7;
  color: #b0b8c4;
}

.terminal-output .hi-name { color: #f778ba; font-weight: 700; font-size: 1.05rem; }
.terminal-output .hi-tag  { color: #d2a8ff; }
.terminal-output .hi-desc { color: #79c0ff; }
.terminal-output .hi-warn { color: #ffa657; }

.terminal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.3rem;
}

.terminal-tag {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  background: rgba(56, 139, 253, 0.12);
  color: #58a6ff;
  font-size: 0.78rem;
  border: 1px solid rgba(56, 139, 253, 0.25);
}

.terminal-social {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(48, 54, 61, 0.7);
}

.terminal-social a {
  color: #8b949e;
  font-size: 1.25rem;
  transition: color 0.2s ease, transform 0.2s ease;
}

.terminal-social a:hover {
  color: #3fb950;
  transform: translateY(-2px);
}

.final-line { margin-top: 0.25rem; }

/* Responsive */
@media (max-width: 576px) {
  .terminal-card { margin: 0 -0.75rem; border-radius: 10px; }
  .terminal-body { padding: 1.25rem 1rem 1rem; }
  .terminal-line { font-size: 0.85rem; }
  .terminal-output { font-size: 0.84rem; }
}
</style>

<script>
const commands = [
  {
    cmd: 'whoami',
    out: '<span class="hi-name">Tonite14</span> <span class="hi-tag">// Frontend Developer · AI Security Learner</span>'
  },
  {
    cmd: 'cat about.txt',
    out: '- a rookie about FrontEnd<br>- a rookie about AI Security<br>- Wer spricht von Siegen? Überstehn ist Alles'
  },
  {
    cmd: 'ls ./skills/',
    out: '<div class="terminal-tags"><span class="terminal-tag">Vue3</span><span class="terminal-tag">TypeScript</span><span class="terminal-tag">JavaScript</span><span class="terminal-tag">Node.js</span><span class="terminal-tag">浏览器原理</span><span class="terminal-tag">AI Security</span></div>'
  },
  {
    cmd: 'cat motd',
    out: '<span class="hi-warn">Wer spricht von Siegen? Überstehn ist Alles.</span>'
  }
];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function typeText(el, text) {
  for (let i = 0; i <= text.length; i++) {
    el.textContent = text.slice(0, i);
    await sleep(45 + Math.random() * 35);
  }
}

(async function runTerminal() {
  for (let i = 0; i < commands.length; i++) {
    const line = commands[i];
    const cmdEl = document.getElementById(`cmd-${i + 1}`);
    const outEl = document.getElementById(`out-${i + 1}`);
    const cursor = cmdEl.parentElement.querySelector('.cursor');

    await typeText(cmdEl, line.cmd);
    cursor.classList.add('hidden');
    await sleep(180);
    outEl.innerHTML = line.out;
    await sleep(500);
  }
})();
</script>
