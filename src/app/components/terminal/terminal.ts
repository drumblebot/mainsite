import { Component, input, output, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileData } from '../../data/profile.data';

interface CommandOutput {
  command: string;
  output: string;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen()) {
      <div class="terminal-overlay" (click)="onBackdropClick($event)">
        <div class="terminal-window glass-card">
          <!-- Titlebar -->
          <div class="terminal-header">
            <div class="header-buttons">
              <span class="btn-circle red" (click)="close.emit()" title="Close"></span>
              <span class="btn-circle yellow" title="Minimize"></span>
              <span class="btn-circle green" (click)="toggleFullscreen()" title="Maximize"></span>
            </div>
            <div class="header-title mono">drumble&#64;arch-devops: ~ (v21.2-pages)</div>
            <div class="header-actions">
              <span class="badge green">BASH</span>
            </div>
          </div>

          <!-- Terminal Output Area -->
          <div class="terminal-body" #terminalBody>
            <div class="welcome-banner mono">
              <pre class="ascii-art">
  ___  ___ _   _ __  __ ___  _    ___ 
 |   \\| _ \\ | | |  \\/  | _ )| |  | __|
 | |) |   / |_| | |\\/| | _ \\| |__| _| 
 |___/|_|_\\\\___/|_|  |_|___/|____|___|
              </pre>
              <p class="intro-line">Welcome to <strong>drumble.dev interactive CLI</strong>.</p>
              <p class="help-hint">Type <span class="cmd-highlight">'help'</span> to explore commands or <span class="cmd-highlight">'exit'</span> to close.</p>
            </div>

            <!-- History -->
            @for (entry of history(); track $index) {
              <div class="history-entry mono">
                <div class="prompt-line">
                  <span class="user-prompt">drumble&#64;cloud:~$</span>
                  <span class="cmd-text">{{ entry.command }}</span>
                </div>
                <div class="output-block" [innerHTML]="entry.output"></div>
              </div>
            }

            <!-- Active Prompt -->
            <div class="active-prompt mono">
              <span class="user-prompt">drumble&#64;cloud:~$</span>
              <input 
                #cmdInput
                type="text" 
                [(ngModel)]="currentInput" 
                (keydown.enter)="executeCommand()"
                (keydown.arrowUp)="historyUp($event)"
                (keydown.arrowDown)="historyDown($event)"
                placeholder="type a command (e.g. skills, projects, devops, help)..."
                autocomplete="off"
                spellcheck="false"
                autofocus />
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .terminal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(4, 7, 13, 0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .terminal-window {
      width: 100%;
      max-width: 820px;
      height: 540px;
      max-height: 90vh;
      background: #090d16;
      border: 1px solid rgba(0, 240, 255, 0.3);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.2);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow: hidden;
    }

    .terminal-header {
      background: #111726;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      user-select: none;
    }

    .header-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .btn-circle {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      cursor: pointer;
    }

    .btn-circle.red { background: #ff5f56; }
    .btn-circle.yellow { background: #ffbd2e; }
    .btn-circle.green { background: #27c93f; }

    .header-title {
      font-size: 0.82rem;
      color: #94a3b8;
    }

    .terminal-body {
      flex: 1;
      padding: 1.25rem;
      overflow-y: auto;
      font-size: 0.88rem;
      line-height: 1.5;
    }

    .welcome-banner {
      margin-bottom: 1.25rem;
      color: #94a3b8;
    }

    .ascii-art {
      color: var(--accent-cyan);
      font-size: 0.75rem;
      line-height: 1.15;
      margin-bottom: 0.5rem;
    }

    .cmd-highlight {
      color: var(--accent-pink);
      font-weight: bold;
    }

    .history-entry {
      margin-bottom: 1rem;
    }

    .prompt-line {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .user-prompt {
      color: #00ff88;
      font-weight: 600;
    }

    .cmd-text {
      color: #fff;
      font-weight: bold;
    }

    .output-block {
      color: #cbd5e1;
      margin-top: 0.35rem;
      padding-left: 0.5rem;
      border-left: 2px solid rgba(0, 240, 255, 0.25);
    }

    .active-prompt {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .active-prompt input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-family: var(--font-mono);
      font-size: 0.88rem;
      color: #fff;
      caret-color: var(--accent-cyan);
    }
  `]
})
export class TerminalComponent implements AfterViewChecked {
  readonly isOpen = input.required<boolean>();
  readonly profile = input.required<ProfileData>();
  readonly close = output<void>();

  @ViewChild('terminalBody') private terminalBodyRef?: ElementRef<HTMLDivElement>;
  @ViewChild('cmdInput') private cmdInputRef?: ElementRef<HTMLInputElement>;

  currentInput = '';
  readonly history = signal<CommandOutput[]>([]);
  private commandLog: string[] = [];
  private historyIndex = -1;

  ngAfterViewChecked(): void {
    if (this.terminalBodyRef) {
      this.terminalBodyRef.nativeElement.scrollTop = this.terminalBodyRef.nativeElement.scrollHeight;
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('terminal-overlay')) {
      this.close.emit();
    }
  }

  toggleFullscreen(): void {
    // fullscreen helper
  }

  historyUp(event: Event): void {
    event.preventDefault();
    if (this.commandLog.length === 0) return;
    if (this.historyIndex === -1) {
      this.historyIndex = this.commandLog.length - 1;
    } else if (this.historyIndex > 0) {
      this.historyIndex--;
    }
    this.currentInput = this.commandLog[this.historyIndex] || '';
  }

  historyDown(event: Event): void {
    event.preventDefault();
    if (this.historyIndex === -1) return;
    if (this.historyIndex < this.commandLog.length - 1) {
      this.historyIndex++;
      this.currentInput = this.commandLog[this.historyIndex] || '';
    } else {
      this.historyIndex = -1;
      this.currentInput = '';
    }
  }

  executeCommand(): void {
    const raw = this.currentInput.trim();
    if (!raw) return;

    this.commandLog.push(raw);
    this.historyIndex = -1;
    this.currentInput = '';

    const cmd = raw.toLowerCase();
    let resText = '';

    switch (cmd) {
      case 'help':
        resText = `
Available commands:
  <span style="color: #00f0ff">whoami</span>       - Display developer summary
  <span style="color: #00f0ff">skills</span>       - List tech capabilities &amp; radar
  <span style="color: #00f0ff">projects</span>     - Summary of key projects
  <span style="color: #00f0ff">devops</span>       - View CI/CD &amp; cloud architecture
  <span style="color: #00f0ff">gaming</span>       - View gamer stats, gear &amp; hobbies
  <span style="color: #00f0ff">contact</span>      - Get social links and email
  <span style="color: #00f0ff">gitlab</span>       - Show GitLab repository link
  <span style="color: #00f0ff">matrix</span>       - Activate emerald matrix mode
  <span style="color: #00f0ff">sudo</span>         - Run with elevated privileges
  <span style="color: #00f0ff">clear</span>        - Clear terminal screen
  <span style="color: #00f0ff">exit</span>         - Close terminal window
        `;
        break;

      case 'whoami':
        resText = `
<strong>Name:</strong> ${this.profile().name} (${this.profile().handle})<br/>
<strong>Role:</strong> ${this.profile().title}<br/>
<strong>Status:</strong> ${this.profile().status}<br/>
<strong>Tagline:</strong> ${this.profile().tagline}
        `;
        break;

      case 'skills':
        resText = this.profile().skills.map(s => `
  [${s.category.toUpperCase().padEnd(10)}] <strong>${s.name.padEnd(24)}</strong> ${s.level}%
        `).join('<br/>');
        break;

      case 'projects':
        resText = this.profile().projects.map(p => `
  ★ <strong style="color: #00f0ff">${p.title}</strong> (${p.category}) - <span style="color: #00ff88">${p.status}</span><br/>
    &nbsp;&nbsp;${p.subtitle}
        `).join('<br/>');
        break;

      case 'devops':
        resText = `
<span style="color: #9d4edd">🦊 GitLab CI/CD Pipeline Architecture:</span><br/>
  1. <strong>Code Lint &amp; Test:</strong> Pre-commit hooks, Vitest, TypeScript Strict Check<br/>
  2. <strong>Build Stage:</strong> Docker multi-stage &amp; Angular AOT compiler<br/>
  3. <strong>Pages Deployment:</strong> Automatic artifact publication with SPA 404 routing<br/>
  4. <strong>Infrastructure:</strong> Kubernetes (k3s/EKS), Helm charts, Terraform IaC
        `;
        break;

      case 'gaming':
        resText = `
<span style="color: #ff007f">🎮 Gaming &amp; Hardware Rig:</span><br/>
  • <strong>Genres:</strong> Competitive Shooters, MMORPGs, Roguelikes, Soulslikes<br/>
  • <strong>Battlestation:</strong> Ryzen 7800X3D + RTX 4080 Super + 240Hz OLED<br/>
  • <strong>Audio &amp; Mods:</strong> Custom lubed 75% mech keyboard + Sennheiser HD600
        `;
        break;

      case 'contact':
        resText = `
<span style="color: #00f0ff">Connect with Drumble:</span><br/>
  • <strong>Email:</strong> ${this.profile().socials.email}<br/>
  • <strong>GitLab:</strong> ${this.profile().socials.gitlab || 'N/A'}<br/>
  • <strong>GitHub:</strong> ${this.profile().socials.github || 'N/A'}<br/>
  • <strong>Discord:</strong> ${this.profile().socials.discord || 'N/A'}
        `;
        break;

      case 'gitlab':
        resText = `GitLab: ${this.profile().socials.gitlab || 'https://gitlab.com/drumble'}`;
        break;

      case 'matrix':
        if (typeof document !== 'undefined') {
          document.body.classList.remove('theme-cyber', 'theme-synth');
          document.body.classList.add('theme-matrix');
        }
        resText = `<span style="color: #00ff88">Wake up, Neo... Matrix theme activated.</span>`;
        break;

      case 'sudo':
        resText = `<span style="color: #ff0055">drumble is not in the sudoers file. This incident will be reported to Santa Claus.</span>`;
        break;

      case 'clear':
        this.history.set([]);
        return;

      case 'exit':
      case 'quit':
        this.close.emit();
        return;

      default:
        resText = `command not found: <span style="color: #ff5f56">${cmd}</span>. Type <span style="color: #00f0ff">'help'</span> for available commands.`;
        break;
    }

    this.history.update(h => [...h, { command: raw, output: resText }]);
  }
}
