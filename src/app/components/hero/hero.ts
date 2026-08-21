import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileData } from '../../data/profile.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="hero-section">
      <div class="hero-glow-blob top-left"></div>
      <div class="hero-glow-blob bottom-right"></div>

      <div class="container hero-container">
        <!-- Status indicator -->
        <div class="status-pill">
          <span class="pulsing-dot"></span>
          <span class="status-text">{{ profile().status }}</span>
          <span class="status-tag">CI/CD: READY</span>
        </div>

        <!-- Main Headline -->
        <div class="hero-main">
          <p class="hero-greeting mono">&gt; initialize_profile --user="drumble"</p>
          <h1 class="hero-title">
            Crafting Resilient <span class="glow-text-cyan">Cloud Pipelines</span> &amp; Modern <span class="glow-text-pink">Fullstack Web</span>.
          </h1>
          <p class="hero-description">
            {{ profile().tagline }}
          </p>
        </div>

        <!-- Role Badges -->
        <div class="role-tags">
          <span class="badge cyan">⚡ Fullstack Architect</span>
          <span class="badge purple">🦊 GitLab CI/CD &amp; DevOps</span>
          <span class="badge green">☸️ Kubernetes &amp; Cloud</span>
          <span class="badge pink">🎮 Competitive Gamer &amp; Modder</span>
        </div>

        <!-- CTA Buttons -->
        <div class="hero-actions">
          <a href="#projects" class="btn btn-primary">
            <span>Explore Projects</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </a>
          
          <button class="btn btn-outline" (click)="openTerminal.emit()">
            <span class="mono">&gt;_ Launch CLI</span>
          </button>

          <a href="#contact" class="btn btn-outline">
            <span>Get in Touch</span>
          </a>
        </div>

        <!-- Live Stats HUD -->
        <div class="stats-hud">
          <div class="stat-card">
            <div class="stat-number glow-text-cyan">{{ profile().stats.yearsExp }}</div>
            <div class="stat-label">Years Engineering</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-card">
            <div class="stat-number glow-text-pink">{{ profile().stats.pipelinesDeployed }}</div>
            <div class="stat-label">Automated Pipelines</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-card">
            <div class="stat-number glow-text-green">{{ profile().stats.projectsCompleted }}</div>
            <div class="stat-label">Shipped Projects</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-card">
            <div class="stat-number glow-text-purple">{{ profile().stats.coffeeAndEnergyDrinks }}</div>
            <div class="stat-label">Passion &amp; Coffee</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 92vh;
      display: flex;
      align-items: center;
      padding-top: 100px;
      padding-bottom: 4rem;
      position: relative;
      overflow: hidden;
    }

    .hero-glow-blob {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      filter: blur(120px);
      pointer-events: none;
      opacity: 0.15;
      z-index: 0;
    }

    .hero-glow-blob.top-left {
      top: -100px;
      left: -150px;
      background: var(--accent-cyan);
    }

    .hero-glow-blob.bottom-right {
      bottom: -100px;
      right: -150px;
      background: var(--accent-pink);
    }

    .hero-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2rem;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(18, 26, 42, 0.85);
      border: 1px solid rgba(0, 255, 136, 0.3);
      padding: 0.4rem 1rem;
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      box-shadow: 0 0 15px rgba(0, 255, 136, 0.15);
    }

    .status-text {
      color: #e2e8f0;
      font-weight: 500;
    }

    .status-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      background: rgba(0, 255, 136, 0.15);
      color: #00ff88;
      padding: 0.15rem 0.5rem;
      border-radius: var(--radius-sm);
      font-weight: 700;
    }

    .hero-greeting {
      font-size: 0.95rem;
      color: var(--accent-cyan);
      margin-bottom: 0.75rem;
      letter-spacing: 0.05em;
    }

    .hero-title {
      font-size: clamp(2.4rem, 5.5vw, 4.2rem);
      font-weight: 900;
      line-height: 1.12;
      letter-spacing: -0.03em;
      margin-bottom: 1.25rem;
      max-width: 950px;
    }

    .glow-text-cyan {
      color: var(--accent-cyan);
      text-shadow: 0 0 30px rgba(0, 240, 255, 0.4);
    }

    .glow-text-pink {
      color: var(--accent-pink);
      text-shadow: 0 0 30px rgba(255, 0, 127, 0.4);
    }

    .glow-text-green {
      color: var(--accent-green);
      text-shadow: 0 0 30px rgba(0, 255, 136, 0.4);
    }

    .glow-text-purple {
      color: var(--accent-purple);
      text-shadow: 0 0 30px rgba(157, 78, 221, 0.4);
    }

    .hero-description {
      font-size: clamp(1.05rem, 2vw, 1.25rem);
      color: var(--text-secondary);
      max-width: 780px;
      line-height: 1.6;
    }

    .role-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .stats-hud {
      margin-top: 2rem;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      background: rgba(18, 26, 42, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.5rem 2rem;
      gap: 1.5rem;
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .stat-number {
      font-family: var(--font-mono);
      font-size: 2.2rem;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 0.35rem;
    }

    .stat-label {
      font-size: 0.85rem;
      color: var(--text-muted);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-divider {
      display: none;
    }

    @media (max-width: 768px) {
      .hero-section {
        padding-top: 90px;
        min-height: auto;
      }

      .stats-hud {
        grid-template-columns: 1fr 1fr;
        padding: 1.25rem;
      }
    }
  `]
})
export class HeroComponent {
  readonly profile = input.required<ProfileData>();
  readonly openTerminal = output<void>();
}
