---
title: 关于
icon: fas fa-info
order: 6
layout: about
---

<!-- ===== Producer Name Card ===== -->
<div class="namecard-scene">
  <div class="namecard" id="producer-card">
    <!-- Front -->
    <div class="namecard-face namecard-front">
      <div class="namecard-accent"></div>
      <div class="namecard-header">
        <div class="namecard-logo">P</div>
        <div class="namecard-series">THE IDOLM@STER</div>
      </div>
      <div class="namecard-body">
        <div class="namecard-main">
          <div class="namecard-name">Tonite14</div>
          <div class="namecard-title">Frontend P / AI Security 見習い</div>
        </div>
        <div class="namecard-oshis">
          <div class="namecard-oshis-label">担当</div>
          <div class="namecard-oshis-list">
            <span class="oshi oshi-1">未定</span>
            <span class="oshi oshi-2">募集中</span>
          </div>
        </div>
      </div>
      <div class="namecard-footer">
        <div class="namecard-id">ID: 000-0000-0000</div>
        <div class="namecard-hint">CLICK TO FLIP</div>
      </div>
    </div>

    <!-- Back -->
    <div class="namecard-face namecard-back">
      <div class="namecard-accent-back"></div>
      <div class="namecard-back-body">
        <div class="namecard-section">
          <h3>自己紹介</h3>
          <ul>
            <li>a rookie about FrontEnd</li>
            <li>a rookie about AI Security</li>
            <li>Wer spricht von Siegen? Überstehn ist Alles</li>
          </ul>
        </div>
        <div class="namecard-section">
          <h3>戦績</h3>
          <ul>
            <li>Live: 募集中</li>
            <li>Event: 募集中</li>
            <li>Project: 本ブログ</li>
          </ul>
        </div>
        <div class="namecard-section">
          <h3>連絡先</h3>
          <div class="namecard-social">
            <a href="https://github.com/tonite14" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>
            <a href="mailto:tonite14@gmail.com" target="_blank" rel="noopener"><i class="fas fa-envelope"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.namecard-scene {
  max-width: 640px;
  margin: 0 auto;
  padding: 1rem;
  perspective: 1200px;
}

.namecard {
  position: relative;
  width: 100%;
  aspect-ratio: 1.75;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.namecard.flipped {
  transform: rotateY(180deg);
}

.namecard-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
}

/* Front */
.namecard-front {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #f0f0f5;
  padding: 1.75rem 2rem;
}

.namecard-accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 45%;
  height: 100%;
  background: linear-gradient(160deg, rgba(255, 107, 107, 0.18) 0%, rgba(255, 107, 107, 0.05) 60%, transparent 100%);
  clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
}

.namecard-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
}

.namecard-logo {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #ff6b6b;
  color: #1a1a2e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.1rem;
  letter-spacing: -0.05em;
}

.namecard-series {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: rgba(240, 240, 245, 0.65);
}

.namecard-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  margin-top: 0.5rem;
}

.namecard-name {
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 0.4rem;
  background: linear-gradient(90deg, #fff 0%, #ffd4d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.namecard-title {
  font-size: 0.92rem;
  color: rgba(240, 240, 245, 0.7);
  letter-spacing: 0.02em;
}

.namecard-oshis {
  margin-top: 1.25rem;
}

.namecard-oshis-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(240, 240, 245, 0.45);
  margin-bottom: 0.4rem;
}

.namecard-oshis-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.oshi {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.oshi-1 {
  background: rgba(255, 107, 107, 0.18);
  color: #ffb4b4;
}

.oshi-2 {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(240, 240, 245, 0.75);
}

.namecard-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 1;
}

.namecard-id {
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 0.7rem;
  color: rgba(240, 240, 245, 0.4);
  letter-spacing: 0.08em;
}

.namecard-hint {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(240, 240, 245, 0.35);
}

/* Back */
.namecard-back {
  background: #f8f5f2;
  color: #2d2d3a;
  transform: rotateY(180deg);
  padding: 1.75rem 2rem;
}

.namecard-accent-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  background: linear-gradient(180deg, #ff6b6b 0%, #ffd4d4 100%);
}

.namecard-back-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  height: 100%;
  align-content: center;
  padding-left: 0.75rem;
}

.namecard-section h3 {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #ff6b6b;
  margin-bottom: 0.6rem;
  text-transform: uppercase;
}

.namecard-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.namecard-section li {
  font-size: 0.82rem;
  line-height: 1.7;
  color: #4a4a5a;
}

.namecard-section li + li {
  margin-top: 0.15rem;
}

.namecard-social {
  display: flex;
  gap: 0.9rem;
}

.namecard-social a {
  color: #4a4a5a;
  font-size: 1.15rem;
  transition: color 0.2s ease, transform 0.2s ease;
}

.namecard-social a:hover {
  color: #ff6b6b;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 576px) {
  .namecard-scene { padding: 0.5rem; }
  .namecard-front,
  .namecard-back { padding: 1.25rem 1.25rem; }
  .namecard-name { font-size: 1.9rem; }
  .namecard-title { font-size: 0.82rem; }
  .namecard-back-body { grid-template-columns: 1fr; gap: 1rem; align-content: start; padding-top: 0.5rem; }
  .namecard-section li { font-size: 0.78rem; }
}
</style>

<script>
document.getElementById('producer-card').addEventListener('click', function() {
  this.classList.toggle('flipped');
});
</script>
