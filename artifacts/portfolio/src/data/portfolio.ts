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
    speakerLeft: "ASFANDYAR",
    speakerRight: "COMMAND",
  },
  {
    freq: "141.12",
    code: "ABOUT",
    label: "ABOUT",
    dialogue: "This is Asfandyar. Highly motivated software developer — full-stack experience, strong front-end skills, and a passion for building things that matter.",
    speakerLeft: "ASFANDYAR",
    speakerRight: "COMMAND",
  },
  {
    freq: "142.36",
    code: "SKILLS",
    label: "EQUIPMENT",
    dialogue: "FOXHOUND analyst confirms — subject is equipped for full-stack combat. JavaScript, React, Next.js — all systems operational.",
    speakerLeft: "ASFANDYAR",
    speakerRight: "COMMAND",
  },
  {
    freq: "143.70",
    code: "PROJECTS",
    label: "MISSIONS",
    dialogue: "Mission files decrypted. Capstone operation successfully delivered with real-world client requirements. Review the dossier.",
    speakerLeft: "ASFANDYAR",
    speakerRight: "COMMAND",
  },
  {
    freq: "144.95",
    code: "EXPERIENCE",
    label: "DOSSIER",
    dialogue: "Personnel file retrieved. SAIT-trained. Capstone-hardened. Ready to deploy in a professional environment.",
    speakerLeft: "ASFANDYAR",
    speakerRight: "COMMAND",
  },
  {
    freq: "146.00",
    code: "CONTACT",
    label: "CONTACT",
    dialogue: "Transmission channels established. Alberta, Canada — all frequencies clear. Make contact when ready.",
    speakerLeft: "ASFANDYAR",
    speakerRight: "COMMAND",
  },
];

export const SKILLS = [
  {
    category: "LANGUAGES",
    items: [
      { name: "JavaScript", level: 88 },
      { name: "TypeScript", level: 82 },
      { name: "Python", level: 72 },
      { name: "HTML / CSS", level: 90 },
      { name: "Java", level: 65 },
      { name: "SQL", level: 68 },
    ],
  },
  {
    category: "FRAMEWORKS & LIBRARIES",
    items: [
      { name: "React", level: 88 },
      { name: "Next.js", level: 84 },
      { name: "Tailwind CSS", level: 86 },
      { name: "Node.js", level: 75 },
      { name: "React Native", level: 68 },
    ],
  },
  {
    category: "TOOLS & PLATFORMS",
    items: [
      { name: "GitHub", level: 85 },
      { name: "Firebase", level: 78 },
      { name: "Vercel", level: 80 },
      { name: "Figma", level: 74 },
      { name: "Expo", level: 65 },
      { name: "Azure AI", level: 60 },
    ],
  },
  {
    category: "CONCEPTS",
    items: [
      { name: "REST APIs", level: 84 },
      { name: "Responsive Design", level: 88 },
      { name: "UI/UX Design", level: 78 },
      { name: "Agile Development", level: 76 },
    ],
  },
];

export const PROJECTS = [
  {
    codename: "OPERATION MINDBRIDGE",
    name: "Mental Health Support Platform",
    objective:
      "Led front-end development of a full-stack mental health support platform connecting patients, volunteers, and healthcare professionals. Designed and implemented a responsive, accessible UI across mobile and desktop. Integrated REST APIs and Firebase for real-time data flow, and Azure AI services for intelligent resource recommendations. Delivered as a capstone project with real-world client requirements.",
    tech: ["React", "Next.js", "Tailwind CSS", "Firebase", "Azure AI", "REST APIs", "GitHub"],
    github: null,
    live: null,
    achievements: [
      "Delivered a fully functional full-stack application meeting real-world client requirements",
      "Improved mobile responsiveness and usability across all devices",
      "Successfully integrated Firebase and Azure AI third-party services",
      "Contributed to a scalable, maintainable codebase using modern front-end architecture",
    ],
  },
];

export const TIMELINE = [
  {
    date: "JAN 2024 — AUG 2025",
    role: "Software Development Diploma",
    org: "Southern Alberta Institute of Technology (SAIT)",
    desc: "Completed a Software Development Diploma covering front-end and back-end development, UI/UX design, databases, APIs, and modern software engineering practices.",
    type: "education",
  },
  {
    date: "JAN 2025 — AUG 2025",
    role: "Lead Front-End Developer",
    org: "SAIT Capstone Project — Alberta, CA",
    desc: "Led front-end development of a mental health support platform. Designed and built responsive UI with React, Next.js, and Tailwind CSS. Integrated Firebase and Azure AI services. Coordinated team contributions via GitHub and collaborated closely with back-end developers to ensure seamless API integration.",
    type: "work",
  },
];

export const CONTACT = {
  email: "Asfand0306@gmail.com",
  phone: "+1 (403) 918-1817",
  location: "Alberta, CA",
  github: "github.com/asfandkhan",
  linkedin: "linkedin.com/in/asfandyarkhan",
};
