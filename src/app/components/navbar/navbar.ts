import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar" [class.scrolled]="isScrolled()">
      <div class="container nav-content">
        <a href="#hero" class="nav-logo">
          <span class="logo-bracket">&lt;</span>
          <span class="logo-name">drumble</span>
          <span class="logo-dot">.dev</span>
          <span class="logo-cursor">_</span>
        </a>

        <nav class="nav-links" [class.open]="mobileMenuOpen()">
          <a href="#skills" (click)="closeMenu()">
            <span class="nav-num">01.</span> Tech Radar
          </a>
          <a href="#projects" (click)="closeMenu()">
            <span class="nav-num">02.</span> Fullstack & DevOps
          </a>
          <a href="#gaming" (click)="closeMenu()">
            <span class="nav-num">03.</span> Gaming & Hobbies
          </a>
          <a href="#contact" (click)="closeMenu()">
            <span class="nav-num">04.</span> Connect
          </a>
        </nav>

        <div class="nav-actions">
          <button class="terminal-btn" (click)="toggleTerminal.emit()" title="Toggle Developer Terminal">
            <span class="term-icon">&gt;_</span>
            <span class="term-text">CLI</span>
          </button>

          <button class="theme-btn" (click)="cycleTheme()" title="Switch Cyber Theme">
            <span class="theme-dot" [class.cyan]="currentTheme() === 'cyber'" [class.green]="currentTheme() === 'matrix'" [class.pink]="currentTheme() === 'synth'"></span>
            <span class="theme-name">{{ currentTheme() | uppercase }}</span>
          </button>

          <button class="menu-toggle" (click)="mobileMenuOpen.set(!mobileMenuOpen())" [attr.aria-expanded]="mobileMenuOpen()">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 72px;
      z-index: 1000;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      background: rgba(10, 13, 20, 0.7);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.3s ease;
    }

    .navbar.scrolled {
      background: rgba(10, 13, 20, 0.92);
      border-bottom-color: rgba(0, 240, 255, 0.2);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }

    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    .nav-logo {
      font-family: var(--font-mono);
      font-size: 1.25rem;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      letter-spacing: -0.02em;
    }

    .logo-bracket {
      color: var(--accent-cyan);
      margin-right: 2px;
    }

    .logo-name {
      color: #fff;
      font-weight: 800;
    }

    .logo-dot {
      color: var(--accent-pink);
    }

    .logo-cursor {
      color: var(--accent-cyan);
      animation: blink 1.2s infinite;
      margin-left: 2px;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-links a {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-secondary);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }

    .nav-num {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--accent-cyan);
    }

    .nav-links a:hover {
      color: #fff;
      transform: translateY(-1px);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .terminal-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(0, 240, 255, 0.08);
      border: 1px solid rgba(0, 240, 255, 0.3);
      color: var(--accent-cyan);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      padding: 0.4rem 0.8rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .terminal-btn:hover {
      background: rgba(0, 240, 255, 0.2);
      box-shadow: 0 0 12px rgba(0, 240, 255, 0.4);
      transform: translateY(-1px);
    }

    .theme-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-secondary);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 0.4rem 0.75rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .theme-btn:hover {
      border-color: rgba(255, 255, 255, 0.3);
      color: #fff;
    }

    .theme-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .theme-dot.cyan { background: var(--accent-cyan); box-shadow: 0 0 8px var(--accent-cyan); }
    .theme-dot.green { background: #00ff88; box-shadow: 0 0 8px #00ff88; }
    .theme-dot.pink { background: #ff007f; box-shadow: 0 0 8px #ff007f; }

    .menu-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-around;
      width: 32px;
      height: 32px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 4px;
    }

    .menu-toggle span {
      width: 100%;
      height: 2px;
      background: var(--text-primary);
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    @media (max-width: 880px) {
      .menu-toggle {
        display: flex;
      }

      .nav-links {
        position: fixed;
        top: 72px;
        left: 0;
        right: 0;
        background: rgba(10, 13, 20, 0.98);
        flex-direction: column;
        padding: 2rem;
        gap: 1.5rem;
        border-bottom: 1px solid rgba(0, 240, 255, 0.2);
        transform: translateY(-150%);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .nav-links.open {
        transform: translateY(0);
      }
    }
  `]
})
export class NavbarComponent {
  readonly toggleTerminal = output<void>();
  readonly isScrolled = signal(false);
  readonly mobileMenuOpen = signal(false);
  readonly currentTheme = signal<'cyber' | 'matrix' | 'synth'>('cyber');

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 20);
      });
    }
  }

  closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  cycleTheme(): void {
    const themes: Array<'cyber' | 'matrix' | 'synth'> = ['cyber', 'matrix', 'synth'];
    const nextIndex = (themes.indexOf(this.currentTheme()) + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    this.currentTheme.set(nextTheme);

    if (typeof document !== 'undefined') {
      document.body.classList.remove('theme-cyber', 'theme-matrix', 'theme-synth');
      document.body.classList.add(`theme-${nextTheme}`);
    }
  }
}
