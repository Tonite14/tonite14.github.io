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
        <div class="namecard-logo">MyGO</div>
        <div class="namecard-series">BanG Dream! It's MyGO!!!!!</div>
      </div>
      <div class="namecard-body">
        <div class="namecard-character">
          <img src="/assets/config/tomori.jpg" alt="高松 燈" />
        </div>
        <div class="namecard-main">
          <div class="namecard-name">Tonite14</div>
          <div class="namecard-title">Producer · Frontend Learner</div>
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
    </div>

    <!-- Back -->
    <div class="namecard-face namecard-back">
      <div class="namecard-accent-back"></div>
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
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
}

/* Front */
.namecard-front {
  background: linear-gradient(125deg, #0d1b26 0%, #143348 55%, #1a4560 100%);
  color: #eef7fc;
  padding: 2.5rem 3rem;
}

.namecard-accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 52%;
  height: 100%;
  background: linear-gradient(155deg, rgba(51, 136, 187, 0.28) 0%, rgba(51, 136, 187, 0.08) 55%, transparent 100%);
  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0% 100%);
}

.namecard-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.namecard-logo {
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  background: #3388bb;
  color: #fff;
  font-weight: 900;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  line-height: 1;
}

.namecard-series {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(238, 247, 252, 0.55);
}

.namecard-body {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 1;
  margin-top: 0.5rem;
}

.namecard-character {
  flex: 0 0 auto;
  width: 38%;
  max-width: 220px;
  aspect-ratio: 0.7;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  background: rgba(255, 255, 255, 0.08);
}

.namecard-character img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.namecard-main {
  flex: 1 1 auto;
  min-width: 0;
}

.namecard-name {
  font-size: 3.4rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #fff 0%, #a8d8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.namecard-title {
  font-size: 1.05rem;
  color: rgba(238, 247, 252, 0.72);
  letter-spacing: 0.03em;
}

.namecard-oshis {
  margin-top: 1.5rem;
}

.namecard-oshis-label {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: rgba(238, 247, 252, 0.42);
  margin-bottom: 0.55rem;
  text-transform: uppercase;
}

.namecard-oshis-list {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.oshi {
  padding: 0.35rem 1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.oshi-main {
  background: rgba(51, 136, 187, 0.22);
  color: #a8d8f0;
  border-color: rgba(51, 136, 187, 0.45);
}

.oshi:not(.oshi-main) {
  background: rgba(255, 255, 255, 0.07);
  color: rgba(238, 247, 252, 0.8);
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
  font-size: 0.78rem;
  color: rgba(238, 247, 252, 0.45);
  letter-spacing: 0.06em;
}

.namecard-hint {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: rgba(238, 247, 252, 0.32);
}

/* Back */
.namecard-back {
  background: #f3f8fb;
  color: #1f3342;
  transform: rotateY(180deg);
  padding: 2.5rem 3rem;
}

.namecard-accent-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 100%;
  background: linear-gradient(180deg, #3388bb 0%, #6bb3e0 100%);
}

.namecard-back-body {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2rem;
  height: 100%;
  align-content: center;
  padding-left: 1rem;
}

.namecard-section h3 {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #3388bb;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
}

.namecard-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.namecard-section li {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #3d5a6e;
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
  color: #3d5a6e;
  font-size: 0.92rem;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.namecard-social a:hover {
  color: #3388bb;
  transform: translateX(3px);
}

/* Responsive */
@media (max-width: 768px) {
  .namecard-front,
  .namecard-back { padding: 1.75rem 1.75rem; }
  .namecard-body { gap: 1.25rem; }
  .namecard-character { width: 32%; max-width: 150px; }
  .namecard-name { font-size: 2.4rem; }
  .namecard-title { font-size: 0.9rem; }
  .namecard-oshis { margin-top: 1.25rem; }
  .namecard-back-body { grid-template-columns: 1fr; gap: 1.25rem; padding-left: 0.5rem; }
  .namecard-section li { font-size: 0.85rem; }
}

@media (max-width: 576px) {
  .namecard-scene { padding: 0.75rem 0.5rem 0.75rem; }
  .namecard-front,
  .namecard-back { padding: 1.35rem 1.25rem; }
  .namecard-body { flex-direction: column; gap: 1rem; }
  .namecard-character { width: 45%; max-width: 130px; }
  .namecard-name { font-size: 1.9rem; }
  .namecard-title { font-size: 0.82rem; }
  .namecard-oshis { margin-top: 1rem; }
  .oshi { font-size: 0.8rem; padding: 0.3rem 0.8rem; }
  .namecard-section li { font-size: 0.8rem; }
}
</style>

<script>
document.getElementById('producer-card').addEventListener('click', function() {
  this.classList.toggle('flipped');
});
</script>
