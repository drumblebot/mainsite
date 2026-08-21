import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../data/profile.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">
            <span>&gt;_ Capabilities Matrix</span>
          </div>
          <h2 class="section-title">Technical Radar &amp; Stack</h2>
          <p class="section-subtitle">
            Battle-tested infrastructure and modern frontend/backend frameworks engineered for speed, scale, and resilience.
          </p>
        </div>

        <!-- Filter tabs -->
        <div class="category-tabs">
          <button 
            class="tab-btn" 
            [class.active]="selectedCategory() === 'all'" 
            (click)="selectedCategory.set('all')">
            All Tech ({{ skills().length }})
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedCategory() === 'devops'" 
            (click)="selectedCategory.set('devops')">
            🦊 DevOps &amp; CI/CD
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedCategory() === 'frontend'" 
            (click)="selectedCategory.set('frontend')">
            🅰️ Frontend &amp; Web
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedCategory() === 'backend'" 
            (click)="selectedCategory.set('backend')">
            ⚙️ Backend &amp; Data
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedCategory() === 'gaming_tech'" 
            (click)="selectedCategory.set('gaming_tech')">
            🎮 Gaming &amp; Tech
          </button>
        </div>

        <!-- Skills Grid -->
        <div class="skills-grid">
          @for (skill of filteredSkills(); track skill.name) {
            <div class="glass-card skill-card">
              <div class="skill-top">
                <div class="skill-icon-wrap">
                  <span class="skill-icon">{{ skill.icon }}</span>
                  <div>
                    <h3 class="skill-name">{{ skill.name }}</h3>
                    <span class="skill-category-tag mono">{{ skill.category }}</span>
                  </div>
                </div>
                <div class="skill-percentage mono">{{ skill.level }}%</div>
              </div>

              <!-- Proficiency bar -->
              <div class="meter-bar">
                <div class="meter-fill" [style.width.%]="skill.level" [class]="getMeterColorClass(skill.category)"></div>
              </div>

              @if (skill.highlight) {
                <div class="skill-highlight">
                  <span class="mono arrow">&gt;</span> {{ skill.highlight }}
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .category-tabs {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 2.5rem;
    }

    .tab-btn {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      padding: 0.5rem 1.2rem;
      border-radius: var(--radius-full);
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
      font-family: var(--font-primary);
    }

    .tab-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      border-color: rgba(255, 255, 255, 0.2);
    }

    .tab-btn.active {
      background: rgba(0, 240, 255, 0.12);
      border-color: var(--accent-cyan);
      color: var(--accent-cyan);
      box-shadow: 0 0 15px rgba(0, 240, 255, 0.25);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
    }

    .skill-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.25rem 1.5rem;
    }

    .skill-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .skill-icon-wrap {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .skill-icon {
      font-size: 1.6rem;
      line-height: 1;
    }

    .skill-name {
      font-size: 1rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 0.1rem;
    }

    .skill-category-tag {
      font-size: 0.7rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .skill-percentage {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-secondary);
    }

    .meter-bar {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .meter-fill {
      height: 100%;
      border-radius: var(--radius-full);
      transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .meter-cyan {
      background: linear-gradient(90deg, #00c6ff, var(--accent-cyan));
      box-shadow: 0 0 8px var(--accent-cyan);
    }

    .meter-pink {
      background: linear-gradient(90deg, #b5179e, var(--accent-pink));
      box-shadow: 0 0 8px var(--accent-pink);
    }

    .meter-green {
      background: linear-gradient(90deg, #059669, var(--accent-green));
      box-shadow: 0 0 8px var(--accent-green);
    }

    .meter-purple {
      background: linear-gradient(90deg, #7209b7, var(--accent-purple));
      box-shadow: 0 0 8px var(--accent-purple);
    }

    .skill-highlight {
      font-size: 0.82rem;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      line-height: 1.4;
    }

    .arrow {
      color: var(--accent-cyan);
      font-weight: bold;
    }
  `]
})
export class SkillsComponent {
  readonly skills = input.required<Skill[]>();
  readonly selectedCategory = signal<string>('all');

  readonly filteredSkills = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.skills();
    }
    if (category === 'devops') {
      return this.skills().filter(s => s.category === 'devops' || s.category === 'cloud');
    }
    return this.skills().filter(s => s.category === category);
  });

  getMeterColorClass(category: string): string {
    switch (category) {
      case 'devops':
      case 'cloud':
        return 'meter-purple';
      case 'frontend':
        return 'meter-cyan';
      case 'backend':
        return 'meter-green';
      case 'gaming_tech':
        return 'meter-pink';
      default:
        return 'meter-cyan';
    }
  }
}
