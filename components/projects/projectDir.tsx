export const projects = [
  {
    title: "CRMCalling",
    context: "Freelance · Full-Stack",
    description:
      "A role-based CRM system built for managing sales calling workflows, agent performance, and lead tracking.",
    highlights: [
      "Designed a role-based system for admins and agents with secure authentication.",
      "Implemented lead assignment, call logging, and call outcome tracking.",
      "Built performance dashboards showing call metrics and agent activity.",
      "Developed REST APIs and integrated MongoDB for scalable data storage.",
    ],
    tech: ["React", "Node.js", "MongoDB", "AWS"],
    categories: ["Full Stack", "Freelance"],
    links: {
      github: null,
      live: null,
      note: "Confidential enterprise project",
    },
  },

  {
    title: "Home Services Platform (Canada)",
    context: "Freelance · Frontend (Next.js)",
    description:
      "A service-based website for a Canada-based business offering cleaning, painting, and home maintenance services.",
    highlights: [
      "Built a responsive marketing website using Next.js with clean UI and SEO-friendly pages.",
      "Implemented service listings for cleaning, painting, and multiple home services.",
      "Focused on performance, accessibility, and mobile-first design.",
    ],
    tech: ["Next.js", "React", "CSS"],
    categories: ["Frontend", "Freelance"],
    links: {
      github: null,
      live: "https://prcleaning.vercel.app/",
    },
  },

  {
    title: "Netflix UI Clone",
    context: "Frontend Practice Project · React.js",
    description:
      "A Netflix-inspired UI clone built to strengthen React fundamentals, component-driven architecture, and frontend layout skills.",
    highlights: [
      "Built reusable React components for movie rows, banners, and navigation.",
      "Integrated TMDB API to fetch and display dynamic movie data.",
      "Focused on responsive layout, UI polish, and clean component structure.",
      "Helped build strong foundations in React state, props, and component composition.",
    ],
    tech: ["React", "JavaScript", "CSS", "TMDB API"],
    categories: ["Frontend"],
    links: {
      github: "https://github.com/saumyasrivastava08/netflix-clone",
      live: null,
    },
  },

  {
    title: "DevTrack",
    context: "Personal Project · Full-Stack",
    description:
      "A developer productivity and tracking platform built with Next.js, Go, and PostgreSQL.",
    highlights: [
      "Built a Next.js frontend backed by Go services and PostgreSQL.",
      "Structured the application around clear frontend, API, and data responsibilities.",
    ],
    tech: ["Next.js", "Go", "PostgreSQL"],
    categories: ["Full Stack", "Backend"],
    links: {
      github: null,
      live: null,
    },
  },

  {
    title: "GenAI — Multi-Task Text Utility",
    context: "Backend Project · AI / LLM",
    description:
      "A FastAPI service that processes user prompts through LLMs and returns structured responses with usage and cost metrics.",
    highlights: [
      "Integrated OpenAI models with reusable prompt templates and six predefined task types.",
      "Added latency, token, and cost tracking, plus JSON and CSV report generation.",
    ],
    tech: ["Python", "FastAPI", "OpenAI API", "Pytest"],
    categories: ["Backend", "AI"],
    links: {
      github: "https://github.com/saumyasrivastava08/genai",
      live: null,
    },
  },
];