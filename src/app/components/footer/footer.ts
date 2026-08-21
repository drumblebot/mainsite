import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-left">
          <span class="mono brand">&lt;drumble.dev /&gt;</span>
          <p class="footer-sub">
            Built with Angular 21 Standalone &amp; SCSS • Continuous Deployment on 
            <a href="https://docs.gitlab.com/ee/user/project/pages/" target="_blank" rel="noopener noreferrer" class="gitlab-link">
              🦊 GitLab Pages
            </a>
          </p>
        </div>

        <div class="footer-right">
          <button class="back-to-top" (click)="scrollToTop()" title="Return to Top">
            <span>Top</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      background: rgba(8, 11, 18, 0.95);
      padding: 2.5rem 0;
      position: relative;
      z-index: 10;
    }

    .footer-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .footer-left {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .brand {
      font-size: 1.1rem;
      font-weight: 700;
      color: #fff;
    }

    .footer-sub {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .gitlab-link {
      color: #fc6d26;
      font-weight: 600;
    }

    .gitlab-link:hover {
      text-decoration: underline;
    }

    .back-to-top {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      padding: 0.45rem 0.9rem;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .back-to-top:hover {
      background: rgba(0, 240, 255, 0.15);
      border-color: var(--accent-cyan);
      color: #fff;
      transform: translateY(-2px);
    }
  `]
})
export class FooterComponent {
  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
