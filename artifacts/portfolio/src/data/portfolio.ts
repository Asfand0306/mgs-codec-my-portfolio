export interface Section {
  freq: string;
  code: string;
  label: string;
  dialogue: string;
  speakerLeft: string;
  speakerRight: string;
}

export const SECTIONS: Section[] = [
  {
    freq: "140.85",
    code: "HOME",
    label: "HOME",
    dialogue: "Snake, we've intercepted a signal — a junior developer has gone live. Patching you through now. Kept you waiting, huh?",
    speakerLeft: "ASFAND",
    speakerRight: "COMMAND",
  },
  {
    freq: "141.12",
    code: "ABOUT",
    label: "ABOUT",
    dialogue: "This is Asfand. I'm a junior software developer based in the UK — passionate about building real things that solve real problems.",
    speakerLeft: "ASFAND",
    speakerRight: "COMMAND",
  },
  {
    freq: "142.36",
    code: "SKILLS",
    label: "EQUIPMENT",
    dialogue: "FOXHOUND analyst confirms — subject has working knowledge of full-stack development. Equipment loadout follows.",
    speakerLeft: "ASFAND",
    speakerRight: "COMMAND",
  },
  {
    freq: "143.70",
    code: "PROJECTS",
    label: "MISSIONS",
    dialogue: "Mission files decrypted. Each operation represents a completed objective. Review dossiers below.",
    speakerLeft: "ASFAND",
    speakerRight: "COMMAND",
  },
  {
    freq: "144.95",
    code: "EXPERIENCE",
    label: "DOSSIER",
    dialogue: "Personnel file retrieved. Training background and operational history — handle with discretion.",
    speakerLeft: "ASFAND",
    speakerRight: "COMMAND",
  },
  {
    freq: "146.00",
    code: "CONTACT",
    label: "CONTACT",
    dialogue: "Transmission channels established. Awaiting your signal. All frequencies are clear — make contact when ready.",
    speakerLeft: "ASFAND",
    speakerRight: "COMMAND",
  },
];

export const SKILLS = [
  {
    category: "LANGUAGES",
    items: [
      { name: "Python", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "Java", level: 70 },
      { name: "HTML / CSS", level: 88 },
      { name: "SQL", level: 72 },
    ],
  },
  {
    category: "FRAMEWORKS",
    items: [
      { name: "React", level: 78 },
      { name: "Node.js", level: 74 },
      { name: "Express", level: 70 },
      { name: "Django", level: 65 },
      { name: "Tailwind CSS", level: 80 },
    ],
  },
  {
    category: "TOOLS & SYSTEMS",
    items: [
      { name: "Git / GitHub", level: 82 },
      { name: "VS Code", level: 90 },
      { name: "PostgreSQL", level: 68 },
      { name: "REST APIs", level: 75 },
      { name: "Linux / CLI", level: 65 },
      { name: "Docker (Basic)", level: 50 },
    ],
  },
];

export const PROJECTS = [
  {
    codename: "OPERATION CIPHER",
    name: "E-Commerce Platform",
    objective:
      "Full-stack e-commerce web application with product listings, shopping cart, user authentication, and checkout flow. Built to replicate the core buying experience of a real storefront.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "REST API"],
    github: "https://github.com/asfandkhan",
    live: null,
  },
  {
    codename: "OPERATION ATLAS",
    name: "Task Management App",
    objective:
      "A productivity web app for managing tasks and projects with drag-and-drop Kanban board, priority tagging, and persistent local storage. Built as a solo project to deepen React state management skills.",
    tech: ["React", "TypeScript", "Tailwind CSS", "localStorage"],
    github: "https://github.com/asfandkhan",
    live: null,
  },
  {
    codename: "OPERATION SIGNAL",
    name: "Weather Dashboard",
    objective:
      "Real-time weather dashboard that fetches live data from OpenWeatherMap API. Displays 5-day forecasts, location search, temperature unit toggling, and animated weather icons.",
    tech: ["JavaScript", "HTML/CSS", "OpenWeatherMap API", "Fetch API"],
    github: "https://github.com/asfandkhan",
    live: null,
  },
  {
    codename: "OPERATION NEXUS",
    name: "Student Grade Tracker",
    objective:
      "Python-based CLI application for tracking student grades across modules. Calculates averages, generates grade reports, and exports data to CSV. Developed during university studies.",
    tech: ["Python", "CSV", "OOP", "File I/O"],
    github: "https://github.com/asfandkhan",
    live: null,
  },
];

export const TIMELINE = [
  {
    date: "2021 — 2024",
    role: "BSc Computer Science",
    org: "University (UK)",
    desc: "Graduated with a Bachelor's degree in Computer Science. Modules covered algorithms, data structures, databases, software engineering, web development, and object-oriented programming.",
    type: "education",
  },
  {
    date: "2023",
    role: "Software Development Intern",
    org: "Tech SME (UK)",
    desc: "Assisted with internal tooling development. Contributed to bug fixes and feature additions in a Python/Django web application. Gained experience with agile workflows and code review processes.",
    type: "work",
  },
  {
    date: "2022",
    role: "Hackathon Participant",
    org: "University Hack Event",
    desc: "Built a community resource-sharing app in 24 hours as part of a 3-person team. Won Best Social Impact award. Responsible for backend API and database design.",
    type: "achievement",
  },
  {
    date: "2024 — PRESENT",
    role: "Junior Developer (Seeking)",
    org: "Available for Hire",
    desc: "Actively seeking junior developer roles in software engineering. Open to front-end, back-end, or full-stack positions. Ready to contribute from day one.",
    type: "work",
  },
];

export const CONTACT = {
  email: "asfand.khan.dev@gmail.com",
  github: "github.com/asfandkhan",
  linkedin: "linkedin.com/in/asfandkhan",
};
