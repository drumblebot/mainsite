import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameHobbyItem } from '../../data/profile.data';

@Component({
  selector: 'app-gaming',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="gaming" class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">
            <span>🎮 Level &amp; Passions</span>
          </div>
          <h2 class="section-title">Gaming, Hardware &amp; Talents</h2>
          <p class="section-subtitle">
            Beyond the cloud: Competitive gaming, custom mechanical keyboards, self-hosted game infrastructure, and creative sound design.
          </p>
        </div>

        <div class="gaming-layout">
          <!-- Left Column: Hobbies & Setup Cards -->
          <div class="hobby-cards-col">
            @for (item of hobbies(); track item.title) {
              <div class="glass-card hobby-card">
                <div class="hobby-header">
                  <span class="hobby-icon">{{ item.icon || '🕹️' }}</span>
                  <div>
                    <h3 class="hobby-title">{{ item.title }}</h3>
                    <h4 class="hobby-subtitle">{{ item.subtitle }}</h4>
                  </div>
                </div>

                <p class="hobby-desc">{{ item.description }}</p>

                @if (item.highlight) {
                  <div class="hobby-highlight">
                    <span class="mono">★</span> {{ item.highlight }}
                  </div>
                }

                <div class="hobby-tags">
                  @for (tag of item.tags; track tag) {
                    <span class="badge purple">{{ tag }}</span>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Right Column: Gamer HUD & Interactive Mini-Game -->
          <div class="interactive-col">
            <!-- Battlestation Specs HUD -->
            <div class="glass-card spec-card">
              <div class="spec-header">
                <span class="mono spec-title">&gt; BATTLESTATION_SPECS.cfg</span>
                <span class="badge green">ONLINE</span>
              </div>
              <ul class="spec-list mono">
                <li><span class="k">CPU:</span> <span class="v">Ryzen 7 7800X3D (8C/16T)</span></li>
                <li><span class="k">GPU:</span> <span class="v">RTX 4080 Super 16GB</span></li>
                <li><span class="k">RAM:</span> <span class="v">64GB DDR5-6000 EXPO</span></li>
                <li><span class="k">STORAGE:</span> <span class="v">4TB NVMe Gen4 + 16TB NAS</span></li>
                <li><span class="k">DISPLAY:</span> <span class="v">27" 1440p OLED 240Hz</span></li>
                <li><span class="k">KEYBOARD:</span> <span class="v">Custom 75% Lubed Linears</span></li>
                <li><span class="k">AUDIO:</span> <span class="v">Sennheiser HD600 + DAC/Amp</span></li>
              </ul>
            </div>

            <!-- Interactive Reflex Benchmark Mini-Game -->
            <div class="glass-card game-card">
              <div class="game-header">
                <span class="mono game-title">&gt; GAMER_REFLEX_TEST.exe</span>
                <span class="badge pink">INTERACTIVE</span>
              </div>
              <p class="game-instructions">
                Test your reaction speed! Click the target as soon as the box turns <strong style="color: #00ff88">NEON GREEN</strong>.
              </p>

              <div 
                class="reaction-box"
                [class.waiting]="gameState() === 'waiting'"
                [class.ready]="gameState() === 'ready'"
                [class.clicked-early]="gameState() === 'early'"
                [class.success]="gameState() === 'result'"
                (click)="handleBoxClick()">
                
                @if (gameState() === 'idle') {
                  <div class="box-content">
                    <span class="box-emoji">🎯</span>
                    <span class="box-text">Click anywhere here to Start</span>
                  </div>
                } @else if (gameState() === 'waiting') {
                  <div class="box-content">
                    <span class="box-emoji">⏳</span>
                    <span class="box-text">Wait for GREEN...</span>
                  </div>
                } @else if (gameState() === 'ready') {
                  <div class="box-content">
                    <span class="box-emoji">⚡</span>
                    <span class="box-text bold">CLICK NOW!</span>
                  </div>
                } @else if (gameState() === 'early') {
                  <div class="box-content">
                    <span class="box-emoji">⚠️</span>
                    <span class="box-text">Too early! Click to try again.</span>
                  </div>
                } @else if (gameState() === 'result') {
                  <div class="box-content">
                    <span class="result-ms glow-text-cyan">{{ reactionTime() }} ms</span>
                    <span class="result-rank">{{ getRank(reactionTime()) }}</span>
                    <span class="retry-hint">Click to test again</span>
                  </div>
                }
              </div>

              @if (bestTime() > 0) {
                <div class="best-score mono">
                  <span>BEST REFLEX:</span>
                  <span class="best-val glow-text-pink">{{ bestTime() }} ms</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .gaming-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: start;
    }

    .hobby-cards-col {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .hobby-card {
      padding: 1.5rem;
    }

    .hobby-header {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }

    .hobby-icon {
      font-size: 2rem;
      line-height: 1;
    }

    .hobby-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #fff;
    }

    .hobby-subtitle {
      font-size: 0.85rem;
      color: var(--accent-purple);
      font-weight: 500;
    }

    .hobby-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 0.85rem;
    }

    .hobby-highlight {
      font-size: 0.82rem;
      color: var(--accent-cyan);
      background: rgba(0, 240, 255, 0.08);
      border: 1px solid rgba(0, 240, 255, 0.2);
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-sm);
      margin-bottom: 0.85rem;
      display: inline-block;
    }

    .hobby-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .interactive-col {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .spec-card, .game-card {
      padding: 1.5rem;
    }

    .spec-header, .game-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .spec-title, .game-title {
      font-size: 0.85rem;
      color: var(--accent-cyan);
      font-weight: 600;
    }

    .spec-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      font-size: 0.84rem;
    }

    .spec-list .k {
      color: var(--text-muted);
      margin-right: 0.5rem;
      font-weight: 600;
    }

    .spec-list .v {
      color: #e2e8f0;
    }

    .game-instructions {
      font-size: 0.88rem;
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    .reaction-box {
      min-height: 180px;
      border-radius: var(--radius-md);
      background: rgba(0, 0, 0, 0.4);
      border: 2px dashed rgba(255, 255, 255, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s ease;
      padding: 1.5rem;
      text-align: center;
    }

    .reaction-box:hover {
      border-color: var(--accent-cyan);
    }

    .reaction-box.waiting {
      background: rgba(255, 158, 0, 0.15);
      border-color: #ff9e00;
      border-style: solid;
    }

    .reaction-box.ready {
      background: rgba(0, 255, 136, 0.25);
      border-color: #00ff88;
      border-style: solid;
      box-shadow: 0 0 25px rgba(0, 255, 136, 0.5);
    }

    .reaction-box.clicked-early {
      background: rgba(255, 0, 85, 0.2);
      border-color: #ff0055;
      border-style: solid;
    }

    .reaction-box.success {
      background: rgba(0, 240, 255, 0.15);
      border-color: var(--accent-cyan);
      border-style: solid;
    }

    .box-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .box-emoji {
      font-size: 2.2rem;
    }

    .box-text {
      font-size: 0.95rem;
      color: #fff;
    }

    .box-text.bold {
      font-weight: 800;
      font-size: 1.2rem;
      color: #00ff88;
      letter-spacing: 0.05em;
    }

    .result-ms {
      font-family: var(--font-mono);
      font-size: 2.4rem;
      font-weight: 800;
    }

    .result-rank {
      font-size: 1rem;
      font-weight: 700;
      color: var(--accent-pink);
    }

    .retry-hint {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 0.25rem;
    }

    .best-score {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.85rem;
      padding: 0.5rem 0.85rem;
      background: rgba(0, 0, 0, 0.3);
      border-radius: var(--radius-sm);
      font-size: 0.82rem;
    }

    .best-val {
      font-weight: 800;
    }

    @media (max-width: 900px) {
      .gaming-layout {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class GamingComponent {
  readonly hobbies = input.required<GameHobbyItem[]>();

  readonly gameState = signal<'idle' | 'waiting' | 'ready' | 'early' | 'result'>('idle');
  readonly reactionTime = signal<number>(0);
  readonly bestTime = signal<number>(0);

  private timerId: any = null;
  private startTime = 0;

  handleBoxClick(): void {
    const state = this.gameState();

    if (state === 'idle' || state === 'early' || state === 'result') {
      this.startWaiting();
    } else if (state === 'waiting') {
      clearTimeout(this.timerId);
      this.gameState.set('early');
    } else if (state === 'ready') {
      const elapsed = Date.now() - this.startTime;
      this.reactionTime.set(elapsed);
      if (this.bestTime() === 0 || elapsed < this.bestTime()) {
        this.bestTime.set(elapsed);
      }
      this.gameState.set('result');
    }
  }

  private startWaiting(): void {
    this.gameState.set('waiting');
    const delay = Math.floor(Math.random() * 2500) + 1500; // 1.5s to 4s random delay
    this.timerId = setTimeout(() => {
      this.startTime = Date.now();
      this.gameState.set('ready');
    }, delay);
  }

  getRank(ms: number): string {
    if (ms < 190) return '⚡ GODLIKE (Esports Tier)';
    if (ms < 230) return '🔥 PRO GAMER (Fast Tier)';
    if (ms < 270) return '🎯 SOLID REFLEX (Diamond Tier)';
    if (ms < 330) return '🕹️ CASUAL (Gold Tier)';
    return '☕ COFFEE NEEDED (Lag Tier)';
  }
}
