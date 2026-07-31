---
title: 关于
icon: fas fa-info
order: 6
layout: about
---

<!-- ===== Member Name Card ===== -->
<div class="namecard-scene">
  <div class="namecard" id="member-card">
    <!-- Front -->
    <div class="namecard-face namecard-front">
      <!-- Background Image -->
      <div class="namecard-bg"></div>
      <!-- Dark Overlay -->
      <div class="namecard-overlay-front"></div>
      <!-- Decorative Borders (Idolmaster style) -->
      <div class="namecard-border-frame">
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
      </div>
      <!-- Gold Decorative Line -->
      <div class="namecard-gold-line"></div>
      <!-- Content -->
      <div class="namecard-header">
        <div class="namecard-logo">MEMBER ID</div>
        <div class="namecard-series">BanG Dream! It's MyGO!!!!!</div>
      </div>
      <div class="namecard-body">
        <div class="namecard-main">
          <div class="namecard-name">Tonite14</div>
          <div class="namecard-title">Supporter · Frontend Learner</div>
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
      <!-- Stamp / Seal -->
      <div class="namecard-stamp">MyGO!</div>
    </div>

    <!-- Back -->
    <div class="namecard-face namecard-back">
      <!-- Background Image -->
      <div class="namecard-bg"></div>
      <!-- Light Overlay -->
      <div class="namecard-overlay-back"></div>
      <!-- Decorative Borders -->
      <div class="namecard-border-frame">
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
      </div>
      <!-- Gold Decorative Line -->
      <div class="namecard-gold-line"></div>
      <!-- Content -->
      <div class="namecard-back-body">
        <div class="namecard-section profile-section">
          <h3>Profile</h3>
          <ul>
            <li>a rookie about FrontEnd</li>
            <li>a rookie about AI Security</li>
            <li>Wer spricht von Siegen? Überstehn ist Alles</li>
          </ul>
        </div>
        <div class="namecard-section links-section">
          <h3>Link</h3>
          <div class="namecard-social">
            <a href="https://github.com/tonite14" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>
            <a href="mailto:tonite14@gmail.com" target="_blank" rel="noopener"><i class="fas fa-envelope"></i> Mail</a>
          </div>
        </div>
      </div>
      <!-- Stamp / Seal -->
      <div class="namecard-stamp">MyGO!</div>
    </div>
  </div>
</div>

<style>
/* About page top spacing */
.layout--about #core-wrapper,
.layout--about #main-wrapper {
  padding-top: 1.5rem !important;
}

/* Name card scene */
.namecard-scene {
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  padding: 1.5rem 1rem 1rem;
  perspective: 1400px;
}

.namecard {
  position: relative;
  width: 100%;
  aspect-ratio: 1.75;
  transform-style: preserve-3d;
  transition: transform 0.75s cubic-bezier(0.4, 0, 0.2, 1);
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
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(255, 215, 0, 0.3);
  display: flex;
  flex-direction: column;
}

/* Background image shared by both faces */
.namecard-bg {
  position: absolute;
  inset: 0;
  background-image: url('/assets/config/link.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

/* Dark overlay for front */
.namecard-overlay-front {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(10, 15, 30, 0.35) 0%, rgba(20, 40, 70, 0.28) 50%, rgba(30, 60, 100, 0.25) 100%);
  z-index: 1;
}

/* Light overlay for back */
.namecard-overlay-back {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 250, 240, 0.72) 0%, rgba(240, 248, 255, 0.68) 50%, rgba(230, 245, 255, 0.65) 100%);
  z-index: 1;
}

/* Idolmaster-style border frame */
.namecard-border-frame {
  position: absolute;
  inset: 12px;
  border: 2px solid rgba(255, 215, 0, 0.6);
  border-radius: 12px;
  z-index: 2;
  pointer-events: none;
}

/* Corner decorations */
.corner {
  position: absolute;
  width: 28px;
  height: 28px;
  border: 3px solid #ffd700;
  z-index: 3;
}

.corner-tl {
  top: 4px;
  left: 4px;
  border-right: none;
  border-bottom: none;
  border-top-left-radius: 14px;
}

.corner-tr {
  top: 4px;
  right: 4px;
  border-left: none;
  border-bottom: none;
  border-top-right-radius: 14px;
}

.corner-bl {
  bottom: 4px;
  left: 4px;
  border-right: none;
  border-top: none;
  border-bottom-left-radius: 14px;
}

.corner-br {
  bottom: 4px;
  right: 4px;
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 14px;
}

/* Gold decorative line (Idolmaster style) */
.namecard-gold-line {
  position: absolute;
  top: 18px;
  left: 18px;
  right: 18px;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #ffd700 20%, #fff8dc 50%, #ffd700 80%, transparent 100%);
  z-index: 3;
  opacity: 0.8;
}

/* Front face */
.namecard-front {
  color: #eef7fc;
  padding: 2.8rem 3.2rem;
}

.namecard-front > *:not(.namecard-bg):not(.namecard-overlay-front):not(.namecard-border-frame):not(.namecard-gold-line):not(.namecard-stamp) {
  position: relative;
  z-index: 4;
}

.namecard-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
}

.namecard-logo {
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  background: linear-gradient(135deg, #ffd700 0%, #b8860b 100%);
  color: #1a1a2e;
  font-weight: 900;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  line-height: 1;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
}

.namecard-series {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(238, 247, 252, 0.85);
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

.namecard-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
  margin-top: 0.5rem;
}

.namecard-main {
  flex: 1;
}

.namecard-name {
  font-size: 3.2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #fff 0%, #ffd700 50%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
}

.namecard-title {
  font-size: 1.05rem;
  color: rgba(238, 247, 252, 0.9);
  letter-spacing: 0.05em;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
}

.namecard-oshis {
  margin-top: 0.5rem;
}

.namecard-oshis-label {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: #ffd700;
  margin-bottom: 0.55rem;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

.namecard-oshis-list {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.oshi {
  padding: 0.35rem 1rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 600;
  border: 1px solid rgba(255, 215, 0, 0.3);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}

.oshi-main {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.25) 0%, rgba(255, 140, 0, 0.15) 100%);
  color: #ffd700;
  border-color: rgba(255, 215, 0, 0.6);
}

.oshi:not(.oshi-main) {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(238, 247, 252, 0.85);
}

.namecard-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 0.8rem;
  margin-top: auto;
}

.namecard-id {
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 0.74rem;
  color: rgba(255, 215, 0, 0.85);
  letter-spacing: 0.06em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

.namecard-hint {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: rgba(238, 247, 252, 0.6);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

/* Member Stamp / Seal (MyGO style) */
.namecard-stamp {
  position: absolute;
  top: 38px;
  right: 28px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid rgba(255, 215, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: #ffd700;
  background: radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
  transform: rotate(-8deg);
  z-index: 5;
  text-align: center;
  line-height: 1.1;
  box-shadow: inset 0 0 10px rgba(255, 215, 0, 0.3);
}

/* Back face */
.namecard-back {
  color: #1f3342;
  padding: 2.8rem 3.2rem;
  transform: rotateY(180deg);
}

.namecard-back-body {
  position: relative;
  z-index: 4;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2rem;
  height: 100%;
  align-content: center;
  padding-top: 2rem;
}

.namecard-section h3 {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #8b6914;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 215, 0, 0.4);
  display: inline-block;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
}

.namecard-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.namecard-section li {
  font-size: 0.92rem;
  line-height: 1.8;
  color: #2c4454;
  padding-left: 1rem;
  position: relative;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
}

.namecard-section li::before {
  content: '◆';
  position: absolute;
  left: 0;
  color: #ffd700;
  font-size: 0.7rem;
}

.namecard-section li + li {
  margin-top: 0.25rem;
}

.namecard-social {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.namecard-social a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c4454;
  font-size: 0.92rem;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(255, 215, 0, 0.3);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
}

.namecard-social a:hover {
  color: #b8860b;
  transform: translateX(3px);
  background: rgba(255, 215, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .namecard-front,
  .namecard-back { padding: 1.75rem 1.75rem; }
  .namecard-name { font-size: 2.2rem; }
  .namecard-title { font-size: 0.9rem; }
  .namecard-back-body { grid-template-columns: 1fr; gap: 1.25rem; }
  .namecard-section li { font-size: 0.85rem; }
  .namecard-stamp { width: 58px; height: 58px; font-size: 0.58rem; }
  .corner { width: 22px; height: 22px; }
}

@media (max-width: 576px) {
  .namecard-scene { padding: 0.75rem 0.5rem 0.75rem; }
  .namecard-front,
  .namecard-back { padding: 1.35rem 1.25rem; }
  .namecard-name { font-size: 1.8rem; }
  .namecard-title { font-size: 0.82rem; }
  .oshi { font-size: 0.8rem; padding: 0.3rem 0.8rem; }
  .namecard-section li { font-size: 0.8rem; }
  .namecard-back-body { padding-top: 1.5rem; }
  .namecard-stamp { width: 50px; height: 50px; font-size: 0.52rem; top: 28px; right: 20px; }
  .corner { width: 18px; height: 18px; border-width: 2px; }
  .namecard-border-frame { inset: 8px; }
}
</style>

<script>
document.getElementById('member-card').addEventListener('click', function() {
  this.classList.toggle('flipped');
});
</script>
