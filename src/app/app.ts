import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA } from './data/profile.data';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { SkillsComponent } from './components/skills/skills';
import { ProjectsComponent } from './components/projects/projects';
import { GamingComponent } from './components/gaming/gaming';
import { TerminalComponent } from './components/terminal/terminal';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    SkillsComponent,
    ProjectsComponent,
    GamingComponent,
    TerminalComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly profile = signal(PROFILE_DATA);
  readonly isTerminalOpen = signal(false);

  openTerminal(): void {
    this.isTerminalOpen.set(true);
  }

  closeTerminal(): void {
    this.isTerminalOpen.set(false);
  }

  toggleTerminal(): void {
    this.isTerminalOpen.update(v => !v);
  }
}
