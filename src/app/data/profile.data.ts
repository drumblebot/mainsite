export interface Skill {
  name: string;
  category: 'devops' | 'backend' | 'frontend' | 'cloud' | 'gaming_tech';
  level: number; // 0 to 100
  icon: string;
  highlight?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'fullstack' | 'devops' | 'gaming' | 'tools';
  subtitle: string;
  description: string;
  architecture: string[];
  techStack: string[];
  metrics?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  status: 'Live' | 'Active' | 'Beta' | 'Prototype';
}

export interface GameHobbyItem {
  title: string;
  category: 'gaming' | 'gear' | 'creative' | 'talent';
  subtitle: string;
  description: string;
  tags: string[];
  highlight?: string;
  icon?: string;
}

export interface ProfileData {
  name: string;
  handle: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  status: string;
  socials: {
    gitlab?: string;
    github?: string;
    linkedin?: string;
    discord?: string;
    steam?: string;
    twitch?: string;
    email: string;
  };
  stats: {
    yearsExp: string;
    pipelinesDeployed: string;
    projectsCompleted: string;
    coffeeAndEnergyDrinks: string;
  };
  skills: Skill[];
  projects: Project[];
  hobbies: GameHobbyItem[];
}

export const PROFILE_DATA: ProfileData = {
  name: 'Drumble',
  handle: 'drumblebot',
  title: 'Fullstack Web Developer & DevOps Engineer',
  tagline: 'Architecting resilient cloud pipelines & reactive web applications by day; conquering competitive games & tinkering with creative tech by night.',
  bio: 'Passionate multi-disciplinary engineer with a focus on modern web ecosystems (Angular, TypeScript, Node.js), robust CI/CD automation (GitLab CI, GitHub Actions), container orchestration (Docker, Kubernetes), and cloud-native infrastructure. When stepping away from the terminal, I immerse myself in competitive gaming, mechanical hardware modding, and interactive multimedia experiments.',
  location: 'Earth // Remote',
  status: '🟢 Available for high-impact projects & co-op sessions',
  socials: {
    gitlab: 'https://gitlab.com/drumble',
    github: 'https://github.com/drumblebot',
    linkedin: 'https://linkedin.com/in/drumble',
    discord: 'drumble#0001',
    steam: 'https://steamcommunity.com/id/drumble',
    twitch: 'https://twitch.tv/drumble',
    email: 'drumble@example.com',
  },
  stats: {
    yearsExp: '5+',
    pipelinesDeployed: '250+',
    projectsCompleted: '30+',
    coffeeAndEnergyDrinks: '∞',
  },
  skills: [
    // DevOps & Cloud
    { name: 'GitLab CI / CD', category: 'devops', level: 95, icon: '🦊', highlight: 'Multi-stage caching, runners & pages' },
    { name: 'Docker & Podman', category: 'devops', level: 92, icon: '🐳', highlight: 'Multi-stage minimal distroless builds' },
    { name: 'Kubernetes & Helm', category: 'devops', level: 85, icon: '☸️', highlight: 'GitOps, Ingress, service meshes' },
    { name: 'Terraform & IaC', category: 'cloud', level: 82, icon: '🏗️', highlight: 'Cloud provisioning & state management' },
    { name: 'AWS & GCP', category: 'cloud', level: 86, icon: '☁️', highlight: 'S3, ECS, EKS, Cloud Run, IAM' },
    { name: 'Prometheus & Grafana', category: 'devops', level: 84, icon: '📊', highlight: 'Telemetry, alerting & APM' },
    { name: 'Linux / Bash Scripting', category: 'devops', level: 94, icon: '🐧', highlight: 'Kernel tuning, systemd, automation' },

    // Frontend
    { name: 'Angular (v19/v20/v21)', category: 'frontend', level: 94, icon: '🅰️', highlight: 'Signals, Standalone, SCSS, SSR' },
    { name: 'TypeScript & JavaScript', category: 'frontend', level: 96, icon: '📜', highlight: 'Strict typing, modern ESNext' },
    { name: 'SCSS / Tailwind CSS', category: 'frontend', level: 90, icon: '🎨', highlight: 'Responsive UI, neon/cyber themes' },
    { name: 'RxJS & State Flow', category: 'frontend', level: 88, icon: '⚡', highlight: 'Reactive data pipelines & streams' },
    { name: 'WebGL / Three.js', category: 'frontend', level: 75, icon: '🌐', highlight: 'Interactive 3D canvas experiences' },

    // Backend & Databases
    { name: 'Node.js & Express / Nest', category: 'backend', level: 92, icon: '🟢', highlight: 'Microservices & REST / GraphQL APIs' },
    { name: 'Python / FastAPI', category: 'backend', level: 86, icon: '🐍', highlight: 'Async APIs, automation & AI tooling' },
    { name: 'Go (Golang)', category: 'backend', level: 80, icon: '🔵', highlight: 'High-throughput CLI & network tools' },
    { name: 'PostgreSQL & MongoDB', category: 'backend', level: 88, icon: '🐘', highlight: 'Schema design, indexing & optimizations' },
    { name: 'Redis & Message Queues', category: 'backend', level: 85, icon: '⚡', highlight: 'Pub/Sub, distributed caching' },

    // Gaming & Creative Tech
    { name: 'Game Dev (Godot / Canvas)', category: 'gaming_tech', level: 78, icon: '🎮', highlight: '2D mechanics, shaders & game loops' },
    { name: 'Game Server Hosting', category: 'gaming_tech', level: 90, icon: '🕹️', highlight: 'Dedicated servers, modpacks & configs' },
    { name: 'Hardware & Keyboards', category: 'gaming_tech', level: 92, icon: '⌨️', highlight: 'Custom mechanical boards & solder mods' },
  ],
  projects: [
    {
      id: 'cloud-infra-orchestrator',
      title: 'CloudFlow CI/CD Engine',
      category: 'devops',
      subtitle: 'Automated Multi-Cloud Deployment & Preview System',
      description: 'An automated pipeline runner that provisions ephemeral staging environments on Kubernetes for every pull request with zero-downtime rolling updates.',
      architecture: ['GitLab CI', 'Docker', 'Kubernetes', 'Helm', 'Terraform', 'Go'],
      techStack: ['Go', 'GitLab API', 'K8s Operator', 'Docker', 'Prometheus'],
      metrics: 'Cut deployment cycle time by 65%',
      demoUrl: 'https://gitlab.com/drumble',
      repoUrl: 'https://gitlab.com/drumble',
      featured: true,
      status: 'Live',
    },
    {
      id: 'neon-command-dashboard',
      title: 'Vanguard Metrics Dashboard',
      category: 'fullstack',
      subtitle: 'Real-time Telemetry & Infrastructure Monitor',
      description: 'Cyberpunk-themed high-frequency monitoring dashboard featuring live WebSocket telemetry, resource alerting, and cluster topology visualization.',
      architecture: ['Angular 21', 'TypeScript', 'Node.js', 'WebSockets', 'RxJS', 'Chart.js'],
      techStack: ['Angular', 'TypeScript', 'SCSS', 'Node.js', 'Socket.IO', 'Redis'],
      metrics: '<15ms telemetry latency',
      demoUrl: 'https://gitlab.com/drumble',
      repoUrl: 'https://gitlab.com/drumble',
      featured: true,
      status: 'Live',
    },
    {
      id: 'game-hub-companion',
      title: 'LootSync & Raid Planner',
      category: 'gaming',
      subtitle: 'Real-time Guild & Multiplayer Event Coordinator',
      description: 'A responsive web application helping competitive raid teams and gaming groups coordinate loadouts, track loot drops, and analyze combat logs.',
      architecture: ['Angular Standalone', 'Firebase', 'Discord OAuth2', 'REST APIs'],
      techStack: ['Angular', 'TypeScript', 'Discord API', 'Tailwind', 'PWA'],
      metrics: 'Used by 2,000+ active players',
      demoUrl: 'https://gitlab.com/drumble',
      repoUrl: 'https://gitlab.com/drumble',
      featured: true,
      status: 'Active',
    },
    {
      id: 'homelab-gitops-infra',
      title: 'Personal GitOps Homelab',
      category: 'devops',
      subtitle: 'Self-Hosted Bare-Metal Infrastructure Cluster',
      description: 'Automated GitOps repository managing a 3-node bare-metal Kubernetes cluster running Plex, game servers, reverse proxies, and personal analytics.',
      architecture: ['k3s', 'ArgoCD', 'Traefik', 'Ansible', 'Cloudflare Tunnels'],
      techStack: ['Kubernetes', 'ArgoCD', 'Ansible', 'WireGuard', 'Linux'],
      metrics: '99.98% self-hosted uptime',
      demoUrl: 'https://gitlab.com/drumble',
      repoUrl: 'https://gitlab.com/drumble',
      featured: false,
      status: 'Live',
    },
    {
      id: 'retro-arcade-engine',
      title: 'PixelRush Arcade Prototype',
      category: 'gaming',
      subtitle: 'Fast-Paced 2D Retro Action Game',
      description: 'An experimental browser arcade game with custom physics, particle systems, chip-tune synth audio, and global leaderboards.',
      architecture: ['HTML5 Canvas', 'TypeScript', 'Web Audio API', 'Serverless Functions'],
      techStack: ['TypeScript', 'Canvas API', 'Web Audio', 'Supabase'],
      metrics: '60 FPS smooth rendering',
      demoUrl: 'https://gitlab.com/drumble',
      repoUrl: 'https://gitlab.com/drumble',
      featured: false,
      status: 'Beta',
    },
    {
      id: 'mainsite-portfolio',
      title: 'drumble.dev Portfolio & Terminal',
      category: 'fullstack',
      subtitle: 'High-Performance Angular Portfolio on GitLab Pages',
      description: 'Modern, blazing fast personal portfolio with integrated interactive CLI terminal, cyber-gamer visual effects, and zero-config automated CI/CD deployment.',
      architecture: ['Angular 21', 'GitLab Pages CI/CD', 'SCSS', 'Standalone Components'],
      techStack: ['Angular', 'TypeScript', 'SCSS', 'GitLab Pages'],
      metrics: '100% Lighthouse Performance score',
      demoUrl: 'https://gitlab.com/drumble',
      repoUrl: 'https://gitlab.com/drumble',
      featured: true,
      status: 'Live',
    },
  ],
  hobbies: [
    {
      title: 'Competitive & Co-op Gaming',
      category: 'gaming',
      subtitle: 'FPS, Tactical Shooters, MMO Raids & Roguelikes',
      description: 'Veteran gaming enthusiast who loves diving deep into game mechanics, theorycrafting build paths, and leading coordinated squad comms in high-stakes lobbies.',
      tags: ['Apex Legends', 'Valorant', 'FFXIV / WoW', 'Helldivers 2', 'Elden Ring', 'Hades'],
      highlight: 'Top 5% rank in competitive seasons',
      icon: '🎯',
    },
    {
      title: 'Custom Mechanical Keyboards & Hardware',
      category: 'gear',
      subtitle: 'Enthusiast Switches, Lubing & Ergonomics',
      description: 'Building custom mechanical keyboards from scratch: soldering PCB switches, tuning stabilizers, sound dampening foam mods, and testing custom keycap profiles.',
      tags: ['75% / Alice Layouts', 'Linear Switches', 'Custom Solder Mods', 'QMK / VIA'],
      highlight: 'Hand-tuned & foam-damped daily drivers',
      icon: '⌨️',
    },
    {
      title: 'Game Server Hosting & Modding',
      category: 'gaming',
      subtitle: 'Dedicated Linux Game Servers & Automation',
      description: 'Deploying and optimizing dedicated game servers (Minecraft, Valheim, Palworld, CS2) inside containerized environments with automatic backup scripts and Discord status bots.',
      tags: ['Linux Game Servers', 'Docker Compose', 'Modpacks', 'Backup Automation'],
      highlight: 'Zero-lag dedicated host for friends',
      icon: '🕹️',
    },
    {
      title: 'Creative Audio & Sound Design',
      category: 'creative',
      subtitle: 'Synthwave & Electronic Music Experiments',
      description: 'Tinkering with DAW software (FL Studio / Ableton), retro synthesizer soundscapes, low-fi beats, and spatial game audio mixing.',
      tags: ['Ableton / FL Studio', 'Synthwave', 'Audio Mixing', 'Chiptune'],
      highlight: 'Custom background tracks & sound FX',
      icon: '🎧',
    },
  ],
};
