import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileData } from '../../data/profile.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contact" class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">
            <span>&gt;_ Initialize Handshake</span>
          </div>
          <h2 class="section-title">Let's Build or Game Together</h2>
          <p class="section-subtitle">
            Whether you want to discuss a fullstack architecture, optimize a CI/CD pipeline, or squad up for a raid, my inbox is open.
          </p>
        </div>

        <div class="contact-grid">
          <!-- Direct Connect Card -->
          <div class="glass-card direct-card">
            <h3 class="card-title">Direct Connection</h3>
            <p class="card-desc">
              Have an exciting project opportunity, consulting request, or technical question?
            </p>

            <div class="email-box">
              <span class="email-text mono">{{ profile().socials.email }}</span>
              <button class="copy-btn" (click)="copyEmail()" title="Copy Email">
                @if (copied()) {
                  <span class="copied-indicator">✓ Copied!</span>
                } @else {
                  <span>Copy</span>
                }
              </button>
            </div>

            <div class="status-box">
              <span class="pulsing-dot"></span>
              <span class="status-msg">{{ profile().status }}</span>
            </div>
          </div>

          <!-- Socials Hub -->
          <div class="glass-card socials-card">
            <h3 class="card-title">Dev &amp; Gaming Hub</h3>
            <p class="card-desc">Find me across code repositories, gaming networks, and socials:</p>

            <div class="social-links-grid">
              @if (profile().socials.gitlab) {
                <a [href]="profile().socials.gitlab" target="_blank" rel="noopener noreferrer" class="social-item gitlab">
                  <div class="social-icon">🦊</div>
                  <div class="social-info">
                    <span class="social-name">GitLab</span>
                    <span class="social-handle">&#64;drumble</span>
                  </div>
                </a>
              }

              @if (profile().socials.github) {
                <a [href]="profile().socials.github" target="_blank" rel="noopener noreferrer" class="social-item github">
                  <div class="social-icon">🐙</div>
                  <div class="social-info">
                    <span class="social-name">GitHub</span>
                    <span class="social-handle">&#64;drumblebot</span>
                  </div>
                </a>
              }

              @if (profile().socials.discord) {
                <div class="social-item discord">
                  <div class="social-icon">💬</div>
                  <div class="social-info">
                    <span class="social-name">Discord</span>
                    <span class="social-handle">{{ profile().socials.discord }}</span>
                  </div>
                </div>
              }

              @if (profile().socials.steam) {
                <a [href]="profile().socials.steam" target="_blank" rel="noopener noreferrer" class="social-item steam">
                  <div class="social-icon">🎮</div>
                  <div class="social-info">
                    <span class="social-name">Steam</span>
                    <span class="social-handle">drumble</span>
                  </div>
                </a>
              }

              @if (profile().socials.twitch) {
                <a [href]="profile().socials.twitch" target="_blank" rel="noopener noreferrer" class="social-item twitch">
                  <div class="social-icon">📺</div>
                  <div class="social-info">
                    <span class="social-name">Twitch</span>
                    <span class="social-handle">&#64;drumble</span>
                  </div>
                </a>
              }

              @if (profile().socials.linkedin) {
                <a [href]="profile().socials.linkedin" target="_blank" rel="noopener noreferrer" class="social-item linkedin">
                  <div class="social-icon">💼</div>
                  <div class="social-info">
                    <span class="social-name">LinkedIn</span>
                    <span class="social-handle">drumble</span>
                  </div>
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: stretch;
    }

    .direct-card, .socials-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2rem;
    }

    .card-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 0.5rem;
    }

    .card-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.75rem;
    }

    .email-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 0.85rem 1.25rem;
      margin-bottom: 1.75rem;
    }

    .email-text {
      color: var(--accent-cyan);
      font-size: 1rem;
      font-weight: 600;
    }

    .copy-btn {
      background: rgba(0, 240, 255, 0.12);
      border: 1px solid rgba(0, 240, 255, 0.3);
      color: var(--accent-cyan);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.4rem 0.85rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .copy-btn:hover {
      background: rgba(0, 240, 255, 0.25);
      box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
    }

    .copied-indicator {
      color: #00ff88;
      font-weight: bold;
    }

    .status-box {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.88rem;
      color: var(--text-secondary);
      background: rgba(255, 255, 255, 0.03);
      padding: 0.75rem 1rem;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .social-links-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .social-item {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-subtle);
      padding: 0.85rem 1rem;
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      color: var(--text-primary);
      text-decoration: none;
    }

    .social-item:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--accent-cyan);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    .social-icon {
      font-size: 1.4rem;
      line-height: 1;
    }

    .social-info {
      display: flex;
      flex-direction: column;
    }

    .social-name {
      font-size: 0.88rem;
      font-weight: 700;
      color: #fff;
    }

    .social-handle {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    @media (max-width: 800px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
      .social-links-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  readonly profile = input.required<ProfileData>();
  readonly copied = signal<boolean>(false);

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.profile().socials.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    }
  }
}
