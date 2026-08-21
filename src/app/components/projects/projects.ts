import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../data/profile.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">
            <span>&gt;_ Shipped Deployments</span>
          </div>
          <h2 class="section-title">Featured Projects &amp; Systems</h2>
          <p class="section-subtitle">
            A selection of production-ready web apps, DevOps automation pipelines, and gaming experiments.
          </p>
        </div>

        <!-- Filter tabs -->
        <div class="project-tabs">
          <button 
            class="tab-btn" 
            [class.active]="selectedFilter() === 'all'" 
            (click)="selectedFilter.set('all')">
            All ({{ projects().length }})
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedFilter() === 'devops'" 
            (click)="selectedFilter.set('devops')">
            🦊 DevOps &amp; Infra
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedFilter() === 'fullstack'" 
            (click)="selectedFilter.set('fullstack')">
            ⚡ Fullstack Web
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedFilter() === 'gaming'" 
            (click)="selectedFilter.set('gaming')">
            🎮 Gaming &amp; Tools
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          @for (project of filteredProjects(); track project.id) {
            <article class="glass-card project-card" [class.featured]="project.featured">
              <div class="card-top-bar">
                <div class="category-pill mono">
                  {{ project.category | uppercase }}
                </div>
                <div class="status-indicator">
                  <span class="status-dot" [class.live]="project.status === 'Live'"></span>
                  <span class="status-label mono">{{ project.status }}</span>
                </div>
              </div>

              <div class="card-body">
                <h3 class="project-title">{{ project.title }}</h3>
                <h4 class="project-subtitle">{{ project.subtitle }}</h4>
                <p class="project-desc">{{ project.description }}</p>

                <!-- Architecture workflow -->
                @if (project.architecture.length > 0) {
                  <div class="arch-box">
                    <span class="arch-label mono">PIPELINE / ARCH:</span>
                    <div class="arch-flow">
                      @for (node of project.architecture; track node; let isLast = $last) {
                        <span class="arch-node">{{ node }}</span>
                        @if (!isLast) {
                          <span class="arch-arrow">→</span>
                        }
                      }
                    </div>
                  </div>
                }

                <!-- Impact Metrics -->
                @if (project.metrics) {
                  <div class="metrics-pill">
                    <span class="metrics-icon">⚡</span>
                    <span class="metrics-text">{{ project.metrics }}</span>
                  </div>
                }

                <!-- Tech Stack Tags -->
                <div class="tech-tags">
                  @for (tech of project.techStack; track tech) {
                    <span class="badge">{{ tech }}</span>
                  }
                </div>
              </div>

              <!-- Card Actions -->
              <div class="card-footer">
                @if (project.demoUrl) {
                  <a [href]="project.demoUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                    <span>Live Demo</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                }
                @if (project.repoUrl) {
                  <a [href]="project.repoUrl" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.65 14.39 12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 5.12 2a.43.43 0 0 1 .4.27l2.24 6.9h8.48l2.24-6.9a.43.43 0 0 1 .4-.27.42.42 0 0 1 .41.16l2.44 7.51 1.22 3.78a.84.84 0 0 1-.3.94z"/></svg>
                    <span>GitLab Repo</span>
                  </a>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .project-tabs {
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
    }

    .tab-btn.active {
      background: rgba(255, 0, 127, 0.12);
      border-color: var(--accent-pink);
      color: #fff;
      box-shadow: 0 0 15px rgba(255, 0, 127, 0.25);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.75rem;
    }

    .project-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-top: 2px solid rgba(0, 240, 255, 0.2);
    }

    .project-card.featured {
      border-top-color: var(--accent-pink);
    }

    .card-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }

    .category-pill {
      font-size: 0.72rem;
      color: var(--accent-cyan);
      background: rgba(0, 240, 255, 0.08);
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-sm);
      letter-spacing: 0.05em;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--text-muted);
    }

    .status-dot.live {
      background: var(--accent-green);
      box-shadow: 0 0 8px var(--accent-green);
    }

    .status-label {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .project-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: #fff;
      margin-bottom: 0.25rem;
      line-height: 1.3;
    }

    .project-subtitle {
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--accent-pink);
      margin-bottom: 0.85rem;
    }

    .project-desc {
      font-size: 0.92rem;
      color: var(--text-secondary);
      line-height: 1.55;
      margin-bottom: 1.25rem;
    }

    .arch-box {
      background: rgba(0, 0, 0, 0.35);
      border: 1px dashed rgba(255, 255, 255, 0.12);
      border-radius: var(--radius-sm);
      padding: 0.65rem 0.85rem;
      margin-bottom: 1rem;
    }

    .arch-label {
      font-size: 0.68rem;
      color: var(--text-muted);
      display: block;
      margin-bottom: 0.3rem;
    }

    .arch-flow {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.35rem;
    }

    .arch-node {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #e2e8f0;
      background: rgba(255, 255, 255, 0.06);
      padding: 0.15rem 0.4rem;
      border-radius: 3px;
    }

    .arch-arrow {
      color: var(--accent-cyan);
      font-size: 0.75rem;
    }

    .metrics-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(0, 255, 136, 0.08);
      border: 1px solid rgba(0, 255, 136, 0.25);
      color: var(--accent-green);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.3rem 0.75rem;
      border-radius: var(--radius-full);
      margin-bottom: 1rem;
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.5rem;
    }

    .card-footer {
      display: flex;
      gap: 0.75rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .btn-sm {
      padding: 0.45rem 0.95rem;
      font-size: 0.82rem;
      border-radius: var(--radius-sm);
    }

    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectsComponent {
  readonly projects = input.required<Project[]>();
  readonly selectedFilter = signal<string>('all');

  readonly filteredProjects = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'all') {
      return this.projects();
    }
    return this.projects().filter(p => p.category === filter);
  });
}
