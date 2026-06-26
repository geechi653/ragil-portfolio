/**
 * Single source of truth for the entire portfolio.
 * Every section component reads from here — change content in one place only.
 */

export const profile = {
  name: 'Ragil Mammadov',
  role: 'Full-Stack Software Developer',
  location: 'Raleigh, NC, USA',
  email: 'ragil.mmdv653@gmail.com',
  phone: '+1-919-946-3996',
  linkedin: 'https://linkedin.com/in/ragil-mammadov',
  github: 'https://github.com/',
  resumeUrl: '/RagilMammadov-Resume.pdf',
  citizenship: 'U.S. Citizen',
  tagline: 'I build enterprise-grade full-stack systems and AI-driven products.',
  status: 'Open to interesting problems',
  about: [
    "I'm a full-stack software developer who ships production features end to end — " +
      'from C#/.NET and Python microservices to polished React + TypeScript interfaces.',
    'At Prometheus Group I deliver software for Fortune 500 clients like Shell, BP, ' +
      'Saudi Aramco, and Chevron, and contribute to one of the first AI-driven solutions ' +
      'in the EAM/ERP space.',
    'I care about clean architecture, reusable component systems, and details that make ' +
      'software feel fast and trustworthy.',
  ],
} as const

export type Experience = {
  company: string
  role: string
  meta: string
  location: string
  period: string
  highlights: string[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    company: 'Prometheus Group',
    role: 'Associate Software Developer (Full-Stack)',
    meta: 'On-site · Full-time',
    location: 'Raleigh, NC',
    period: 'Jun 2025 — Present',
    highlights: [
      'Ship full-stack features across the Shutdown Turnaround Outage (STO) suite for Fortune 500 clients including Shell, BP, Saudi Aramco, Chevron, and Covestro.',
      'Deployed on-site to Covestro for a 3-week embedded engagement, resolving 30+ production tickets across bug fixes, feature delivery, incident triage, and PostgreSQL data integrity — cutting the client’s open backlog by 80%.',
      'Designed C#/.NET microservices on PostgreSQL and engineered bidirectional SAP & Oracle Primavera P6 REST integrations, syncing enterprise planning and execution data across global turnarounds.',
      'Built and maintained a shared React + TypeScript component library, accelerating delivery and enforcing UI consistency across product teams.',
      'Contributed to GWOS AI — one of the first AI-driven solutions in the EAM/ERP space — developing ML pipelines that power planning, scheduling, and predictive insights.',
    ],
    stack: ['C#', '.NET', 'PostgreSQL', 'React', 'TypeScript', 'SAP', 'Primavera P6', 'ML'],
  },
  {
    company: 'Mr. ComfortRide LLC',
    role: 'Software Engineer',
    meta: 'Remote · Contract',
    location: 'Raleigh, NC',
    period: 'Jan 2025 — May 2025',
    highlights: [
      'Built and launched MrComfortRide.com, a luxury transportation booking platform in React, TypeScript, and Tailwind CSS featuring real-time pricing — driving an 18% lift in booking conversion.',
      'Developed a Python/Django driver management service backed by PostgreSQL, sustaining 99.9% uptime and automating driver onboarding, payout reconciliation, and trip analytics.',
      'Modeled SQL schemas, tuned query plans (40% latency reduction), and shipped GitHub Actions CI/CD for one-click, zero-downtime deployments.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind', 'Django', 'PostgreSQL', 'GitHub Actions'],
  },
  {
    company: 'Aurora LLC',
    role: 'Software Development Intern',
    meta: 'On-site',
    location: 'Baku, Azerbaijan',
    period: 'May 2023 — Aug 2023',
    highlights: [
      'Built and documented RESTful APIs in Node.js, using Azure DevOps for version control and Mocha for unit testing across core service logic.',
      'Collaborated with the data science team in an Agile/Scrum environment to integrate predictive ML models into the web application framework.',
      'Applied machine learning techniques to categorize user-generated content, achieving 85% classification accuracy.',
    ],
    stack: ['Node.js', 'Azure DevOps', 'Mocha', 'ML', 'Agile'],
  },
  {
    company: "Kohl’s",
    role: 'Technical Operations Associate (Amazon)',
    meta: 'Part-time · On-site',
    location: 'Apex, NC',
    period: 'Oct 2020 — Mar 2021',
    highlights: [
      'Processed 150+ Amazon returns daily at 99% accuracy through Kohl’s inventory system and Amazon Seller Central, operating barcode scanning, POS, and Amazon logistics platforms.',
      'Worked across the Kohl’s–Amazon partnership using Amazon-integrated retail inventory software, data entry systems, and supply chain tracking tools.',
    ],
    stack: ['Amazon Seller Central', 'POS', 'Inventory Systems'],
  },
]

export type Project = {
  name: string
  tagline: string
  period: string
  stack: string[]
  highlights: string[]
}

export const projects: Project[] = [
  {
    name: 'Polycopy',
    tagline: 'Polymarket Top-Trader Signal Bot',
    period: '2026',
    stack: ['Python', 'Polymarket API', 'Telegram Bot API', 'GitHub Actions', 'YAML'],
    highlights: [
      'Watches the top 100 Polymarket traders and fires a Telegram alert whenever one opens, closes, or resizes a position above a configurable dollar threshold — a signal source for manual betting, not an executor.',
      'Each poll cycle pulls the public Data API leaderboard, fetches every top trader’s open positions in parallel, filters out crypto markets, and diffs against the previous snapshot to detect OPEN / CLOSE / INCREASE / DECREASE events.',
      'Alerts carry trader, market, side, price, dollar size, and live consensus (how many other top-100 traders are on the same side); ships a heartbeat, circuit breaker, and CSV event log for post-run analysis.',
      'Deploys free on GitHub Actions cron with state persisted via workflow cache, or as a systemd service on a Linux VM — fully config-driven through a single settings.yaml.',
    ],
  },
  {
    name: 'WatchPort',
    tagline: 'Luxury Watch Portfolio Tracker',
    period: 'Apr 2025 — Jun 2025',
    stack: ['React', 'TypeScript', 'Python (Flask)', 'Supabase', 'Shadcn UI', 'Recharts', 'Zod'],
    highlights: [
      'Web app for luxury watch collectors to track, value, and analyze collections against real-time market data — with automated valuation, ROI analytics, and interactive Recharts dashboards.',
      'Cross-marketplace search engine that aggregates listings from multiple sources, with advanced filtering by brand, model, price range, and condition to surface the best deals.',
      'Python/Flask backend serving REST endpoints for valuation, market-data ingestion, and portfolio analytics, with Supabase auth and PostgreSQL row-level security isolating user portfolios end to end.',
      'Responsive Shadcn UI + Tailwind interface with dark/light themes and Zod-validated forms, on a Vite build tuned for fast cold starts.',
    ],
  },
  {
    name: 'PlayHaven',
    tagline: 'Multi-Store Game Deals Aggregator',
    period: '2025',
    stack: ['React', 'TypeScript', 'Python (Flask)', 'REST', 'Tailwind'],
    highlights: [
      'Steam-style storefront that connects multiple game-store APIs into one hub, surfacing daily free games alongside daily, weekly, and monthly discounts.',
      'Python/Flask backend that normalizes deals from each connected storefront into a unified REST API consumed by the React + TypeScript frontend.',
      'Clean, responsive browsing experience for discovering and comparing the best current game offers across stores.',
    ],
  },
]

export const skills: Record<string, string[]> = {
  Languages: ['Java', 'Python', 'C#', 'TypeScript', 'JavaScript', 'SQL', 'C++', 'Bash'],
  Frontend: [
    'React',
    'Next.js',
    'Angular',
    'Redux',
    'Tailwind CSS',
    'Material UI',
    'Shadcn UI',
    'React Aria',
    'HTML5',
    'CSS3',
  ],
  Backend: [
    'Java Spring Boot',
    'ASP.NET / .NET',
    'Django',
    'Flask',
    'Node.js',
    'Express',
    'GraphQL',
    'REST',
  ],
  Databases: ['PostgreSQL', 'SQL Server', 'MongoDB', 'SQLite', 'Supabase', 'Firebase'],
  'Cloud, DevOps & Security': [
    'AWS',
    'Azure',
    'Docker',
    'Kubernetes',
    'Rancher',
    'Argo CD',
    'GitHub Actions',
    'CI/CD',
    'Linux',
    'Penetration Testing',
  ],
  'AI / ML & Enterprise': [
    'TensorFlow',
    'PyTorch',
    'scikit-learn',
    'NumPy',
    'SAP S/4HANA',
    'Oracle Primavera P6',
    'Jira',
  ],
}

export const education = {
  school: 'University of North Carolina at Charlotte',
  location: 'Charlotte, NC',
  degree: 'B.S. in Computer Science — Concentration in Software Engineering',
  gpa: '3.6 / 4.0',
  honors: 'Dean’s List (4x) · Chancellor’s List (2x)',
}

export const certifications = [
  { name: 'Building RAG Agents with LLMs', issuer: 'NVIDIA', year: '2026' },
  {
    name: 'Advanced Learning Algorithms',
    issuer: 'Stanford University & DeepLearning.AI',
    year: '2025',
  },
  {
    name: 'Supervised Machine Learning',
    issuer: 'Stanford University & DeepLearning.AI',
    year: '2025',
  },
  { name: 'Foundational C#', issuer: 'Microsoft', year: '2025' },
]
