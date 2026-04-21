export interface Section {
  freq: string;
  code: string;
  label: string;
  dialogue: string;
  speaker: string;
}

export const SECTIONS: Section[] = [
  {
    freq: "140.85",
    code: "ABOUT",
    label: "About",
    dialogue: "This is Asfandyar Khan — junior software developer, Alberta CA. Full-stack experience, strong front-end skills. Patching you through now.",
    speaker: "ASFANDYAR",
  },
  {
    freq: "141.12",
    code: "SKILLS",
    label: "Skills",
    dialogue: "JavaScript, React, Next.js — all systems operational. Full-stack capable.",
    speaker: "ASFANDYAR",
  },
  {
    freq: "142.36",
    code: "PROJECTS",
    label: "Projects",
    dialogue: "One completed operation with real-world client requirements. Dossier follows.",
    speaker: "ASFANDYAR",
  },
  {
    freq: "143.70",
    code: "QUALIFICATIONS",
    label: "Qualifications",
    dialogue: "SAIT-trained, capstone-hardened. Education and experience on file.",
    speaker: "ASFANDYAR",
  },
  {
    freq: "144.95",
    code: "CERTIFICATIONS",
    label: "Certifications",
    dialogue: "Certification records pending. This channel is reserved — transmissions incoming.",
    speaker: "ASFANDYAR",
  },
  {
    freq: "146.00",
    code: "CONTACT",
    label: "Contact",
    dialogue: "All channels secure. Alberta, Canada — ready to receive. Make contact when ready.",
    speaker: "ASFANDYAR",
  },
];

export const SKILLS = {
  Languages: ["JavaScript", "TypeScript", "Python", "Java", "HTML", "CSS"],
  "Frameworks & Libraries": ["React", "Next.js", "Node.js", "React Native", "Tailwind CSS"],
  "Tools & Platforms": ["GitHub", "Firebase", "Vercel", "Expo", "Figma", "VS Code", "Eclipse", "Azure AI"],
  Concepts: ["Responsive Design", "REST APIs", "UI/UX Design", "Agile Development"],
};

export const PROJECTS = [
  {
    name: "Mental Health Support Platform",
    role: "Lead Front-End Developer",
    context: "SAIT Capstone Project — Alberta, CA",
    description:
      "Full-stack platform connecting patients, volunteers, and healthcare professionals. Led front-end development end-to-end — from responsive UI design through to API integration and Azure AI feature implementation.",
    tech: ["React", "Next.js", "Tailwind CSS", "Firebase", "Azure AI", "REST APIs", "GitHub"],
    achievements: [
      "Delivered a fully functional application against real-world client requirements",
      "Built responsive, accessible UI across mobile and desktop",
      "Integrated Firebase and Azure AI for real-time data and smart recommendations",
      "Contributed to a scalable, maintainable front-end architecture",
    ],
    github: null,
    live: null,
  },
];

export const QUALIFICATIONS = [
  {
    date: "JAN 2025 — AUG 2025",
    role: "Lead Front-End Developer",
    org: "SAIT Capstone Project — Alberta, CA",
    desc: "Led front-end development of a mental health platform. Built responsive UI with React, Next.js, and Tailwind CSS. Integrated Firebase and Azure AI. Coordinated team contributions via GitHub.",
  },
  {
    date: "JAN 2024 — AUG 2025",
    role: "Software Development Diploma",
    org: "Southern Alberta Institute of Technology (SAIT)",
    desc: "Diploma covering front-end and back-end development, UI/UX design, databases, REST APIs, and modern software engineering practices.",
  },
];

export const CONTACT = {
  email: "Asfand0306@gmail.com",
  phone: "+1 (403) 918-1817",
  location: "Alberta, CA",
  github: "github.com/Asfand0306",
  linkedin: "linkedin.com/in/asfand-khan-7a8a971aa/",
};
