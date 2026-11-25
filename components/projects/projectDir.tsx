export type ProjectStatus = "shipped" | "wip";

export type Project = {
  title: string;
  /** Short label for the hanging-folder tab */
  spine: string;
  context: string;
  description: string;
  highlights: string[];
  tech: string[];
  categories: string[];
  status?: ProjectStatus;
  featured?: boolean;
  links: {
    github?: string | null;
    live?: string | null;
    note?: string;
  };
};

export const projects: Project[] = [
  {
    title: "Threat Intel Portal",
    spine: "Threat Intel",
    context: "Product · Full-Stack Threat Intelligence",
    description:
      "Customer-facing portal for a dark-web threat intelligence platform. Organizations search leaked credentials, manage alerts, verify domains, export data, and request takedowns.",
    highlights: [
      "Built a search-first Next.js portal with authentication, domain verification, API keys, and data export.",
      "Designed a dark-first interface with charts, a command palette, and plan-gated features.",
      "Paired it with a core API for auth, search, and business data, backed by local seed data and a real ingestion path.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "Zustand", "Recharts", "Framer Motion"],
    categories: ["Full Stack", "Frontend", "Security"],
    status: "wip",
    featured: true,
    links: {
      github: null,
      live: null,
      note: "Private product work — demo on request",
    },
  },

  {
    title: "CRMCalling",
    spine: "CRMCalling",
    context: "Freelance · Full-Stack",
    description:
      "A role-based CRM for running sales calling workflows, tracking agent performance, and managing leads.",
    highlights: [
      "Designed separate admin and agent roles with secure authentication.",
      "Implemented lead assignment, call logging, and call outcome tracking.",
      "Built dashboards for call metrics and agent activity.",
      "Developed REST APIs on MongoDB for scalable data storage.",
    ],
    tech: ["React", "Node.js", "MongoDB", "AWS"],
    categories: ["Full Stack", "Freelance"],
    status: "shipped",
    featured: true,
    links: {
      github: null,
      live: null,
      note: "Confidential enterprise project",
    },
  },

  {
    title: "Home Services Platform (Canada)",
    spine: "Home Services",
    context: "Freelance · Frontend (Next.js)",
    description:
      "A website for a Canada-based business offering cleaning, painting, and home maintenance services.",
    highlights: [
      "Built a responsive, SEO-friendly marketing site in Next.js with a clean interface.",
      "Implemented service listings for cleaning, painting, and other home services.",
      "Prioritized performance, accessibility, and a mobile-first layout.",
    ],
    tech: ["Next.js", "React", "CSS"],
    categories: ["Frontend", "Freelance"],
    status: "shipped",
    featured: true,
    links: {
      github: null,
      live: "https://prcleaning.vercel.app/",
    },
  },

  {
    title: "Interview Prep Knowledge Base",
    spine: "Interview Prep",
    context: "Personal System · Learning Ops",
    description:
      "A structured SDE-2/SDE-3 interview prep system with gap analysis, a skill matrix, a weekly roadmap, and 300+ topics mapped to interview rounds and company types.",
    highlights: [
      "Organized Java, DSA, system design, cloud, and stack tracks into a syllabus I can track.",
      "Built priority matrices and coverage maps so study time goes to the highest-impact gaps first.",
      "Keeps the roadmap, tracker, and subject deep-dives in living docs instead of scattered notes.",
    ],
    tech: ["Markdown", "Knowledge Architecture", "Java", "System Design"],
    categories: ["Learning", "DevOps"],
    status: "wip",
    featured: true,
    links: {
      github: null,
      live: null,
      note: "Personal prep system — expanding weekly",
    },
  },

  {
    title: "GenAI — Multi-Task Text Utility",
    spine: "GenAI",
    context: "Backend Project · AI / LLM",
    description:
      "A FastAPI service that runs user prompts through LLMs and returns structured responses along with usage and cost metrics.",
    highlights: [
      "Integrated OpenAI models with reusable prompt templates and six predefined task types.",
      "Added latency, token, and cost tracking, with JSON and CSV report export.",
    ],
    tech: ["Python", "FastAPI", "OpenAI API", "Pytest"],
    categories: ["Backend", "AI"],
    status: "shipped",
    featured: true,
    links: {
      github: "https://github.com/saumyasrivastava08/genai",
      live: null,
    },
  },

  {
    title: "DevTrack",
    spine: "DevTrack",
    context: "Personal Project · Full-Stack",
    description:
      "A developer productivity and tracking platform built with Next.js, Go, and PostgreSQL.",
    highlights: [
      "Built a Next.js frontend on top of Go services and PostgreSQL.",
      "Kept the frontend, API, and data layers cleanly separated.",
    ],
    tech: ["Next.js", "Go", "PostgreSQL"],
    categories: ["Full Stack", "Backend"],
    status: "wip",
    featured: false,
    links: {
      github: null,
      live: null,
      note: "In progress",
    },
  },

  {
    title: "Personal Portfolio",
    spine: "Portfolio",
    context: "Personal Brand · Next.js",
    description:
      "This site: a space-themed portfolio covering my experience, projects, skills, education, and contact details, with animation-driven sections.",
    highlights: [
      "Custom sections for the skills constellation, education archive, and career timeline.",
      "Built on the Next.js Pages Router and Framer Motion, with a responsive layout and a consistent design language.",
    ],
    tech: ["Next.js", "TypeScript", "Framer Motion", "CSS"],
    categories: ["Frontend"],
    status: "wip",
    featured: false,
    links: {
      github: "https://github.com/saumyasrivastava08",
      live: null,
      note: "You’re looking at it",
    },
  },

  {
    title: "Netflix UI Clone",
    spine: "Netflix Clone",
    context: "Frontend Practice Project · React.js",
    description:
      "A Netflix-inspired UI clone built to sharpen my React fundamentals, component-driven architecture, and frontend layout skills.",
    highlights: [
      "Built reusable React components for movie rows, banners, and navigation.",
      "Integrated the TMDB API to fetch and display live movie data.",
      "Focused on responsive layout, visual polish, and a clean component structure.",
    ],
    tech: ["React", "JavaScript", "CSS", "TMDB API"],
    categories: ["Frontend", "Learning"],
    status: "shipped",
    featured: false,
    links: {
      github: "https://github.com/saumyasrivastava08/netflix-clone",
      live: null,
    },
  },

  {
    title: "Console Quiz Lab",
    spine: "Quiz Lab",
    context: "Java Fundamentals · CLI",
    description:
      "A terminal quiz app in Java, built as an OOP practice project covering questions, scoring, and input handling.",
    highlights: [
      "Modeled questions and a question service with simple OOP boundaries.",
      "Built an interactive CLI flow with feedback after each question and a running score.",
    ],
    tech: ["Java"],
    categories: ["Learning", "Backend"],
    status: "shipped",
    featured: false,
    links: {
      github: null,
      live: null,
      note: "Local learning project",
    },
  },

  {
    title: "Orbit Desk",
    spine: "Orbit Desk",
    context: "Personal Project · Ops Dashboard",
    description:
      "A personal ops board for habits, deep-work blocks, and weekly goals: one calm surface instead of five apps.",
    highlights: [
      "Day and week views with focus timers and streak tracking.",
      "Local-first storage, with optional cloud backup planned for later.",
    ],
    tech: ["Next.js", "TypeScript", "IndexedDB"],
    categories: ["Full Stack", "Frontend"],
    featured: false,
    links: {
      github: null,
      live: null,
      note: "Coming soon",
    },
  },

  {
    title: "Pulse Pipeline",
    spine: "Pulse Pipeline",
    context: "Personal Project · DevOps / CI Visibility",
    description:
      "A visual CI health board that turns GitHub Actions runs into a live pipeline map, showing failures, flaky jobs, and deploy freshness at a glance.",
    highlights: [
      "A repo-level status wall with drill-down into failed steps.",
      "Webhook ingestion and cached summaries to keep the board fast.",
    ],
    tech: ["Next.js", "GitHub API", "Redis"],
    categories: ["DevOps", "Full Stack"],
    featured: false,
    links: {
      github: null,
      live: null,
      note: "Coming soon",
    },
  },

  {
    title: "Harbor Watch",
    spine: "Harbor Watch",
    context: "Personal Project · Containers & Observability",
    description:
      "A lightweight local container dashboard showing running services, recent logs, and health checks, so you don't need a dozen terminals.",
    highlights: [
      "A Docker Desktop-friendly container list with restart and log-tail actions.",
      "Safe-by-default controls that only act on local containers.",
    ],
    tech: ["Go", "Docker API", "React"],
    categories: ["DevOps", "Backend"],
    featured: false,
    links: {
      github: null,
      live: null,
      note: "Coming soon",
    },
  },

  {
    title: "Nebula Notes",
    spine: "Nebula Notes",
    context: "Personal Project · Knowledge Garden",
    description:
      "A linked markdown notebook with backlinks and a graph view, keeping interview notes, architecture write-ups, and project journals in one place.",
    highlights: [
      "Wiki-style links and a graph view of related notes.",
      "Fast search across a local notes vault, with an optional publish mode.",
    ],
    tech: ["Next.js", "MDX", "SQLite"],
    categories: ["Full Stack", "Learning"],
    featured: false,
    links: {
      github: null,
      live: null,
      note: "Coming soon",
    },
  },

  {
    title: "Relay Inbox",
    spine: "Relay Inbox",
    context: "Personal Project · Alerts & Integrations",
    description:
      "A webhook fan-out playground that accepts events, filters them, and relays them to Slack, email, or a custom HTTP endpoint, with retries and dead-letter views.",
    highlights: [
      "Rule-based routing with sample payloads and delivery logs.",
      "Demonstrates integration and reliability fundamentals such as retries and dead-letter queues.",
    ],
    tech: ["Node.js", "PostgreSQL", "BullMQ"],
    categories: ["Backend", "DevOps"],
    featured: false,
    links: {
      github: null,
      live: null,
      note: "Coming soon",
    },
  },
];

export const projectsCountLabel =
  projects.length >= 10 ? "10+" : String(projects.length).padStart(2, "0");
