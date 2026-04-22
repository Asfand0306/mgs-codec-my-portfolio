import {
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss, SiMysql,
  SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss,
  SiGithub, SiFirebase, SiVercel, SiExpo, SiFigma,
} from "react-icons/si";
import { FaEnvelope, FaPhone, FaLocationDot, FaCode, FaJava, FaLinkedin, FaMicrosoft } from "react-icons/fa6";
import { SKILLS, PROJECTS, QUALIFICATIONS, CONTACT } from "../data/portfolio";
import type { IconType } from "react-icons";

/* ── icon map ── */
const SKILL_ICONS: Record<string, IconType> = {
  JavaScript:       SiJavascript,
  TypeScript:       SiTypescript,
  Python:           SiPython,
  Java:             FaJava,
  HTML:             SiHtml5,
  CSS:              SiCss,
  SQL:              SiMysql,
  React:            SiReact,
  "Next.js":        SiNextdotjs,
  "Node.js":        SiNodedotjs,
  "React Native":   SiReact,
  "Tailwind CSS":   SiTailwindcss,
  GitHub:           SiGithub,
  Firebase:         SiFirebase,
  Vercel:           SiVercel,
  Expo:             SiExpo,
  Figma:            SiFigma,
  "VS Code":        FaCode,
  Eclipse:          FaCode,
  "Azure AI":       FaMicrosoft,
};

const CONTACT_ICONS: Record<string, IconType> = {
  Email:    FaEnvelope,
  Phone:    FaPhone,
  GitHub:   SiGithub,
  LinkedIn: FaLinkedin,
  Location: FaLocationDot,
};

/* ── shared helpers ── */
const H = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    fontFamily: "'VT323', monospace",
    fontSize: 20,
    color: "#00DDB0",
    letterSpacing: 4,
    textTransform: "uppercase" as const,
    borderBottom: "1px solid #002018",
    paddingBottom: 6,
    marginBottom: 18,
    textShadow: "0 0 8px rgba(0,255,65,0.35)",
  }}>{children}</div>
);

const Body = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <p style={{
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 13,
    color: "#a0b0a0",
    lineHeight: 1.9,
    marginBottom: 12,
    ...style,
  }}>{children}</p>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
    <span style={{
      fontFamily: "'VT323', monospace", fontSize: 14, color: "#00DDB0",
      letterSpacing: 2, flexShrink: 0, minWidth: 110, textTransform: "uppercase" as const,
    }}>{label}</span>
    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: "#a0b0a0" }}>{value}</span>
  </div>
);

const Block = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    border: "1px solid #001a14",
    padding: "12px 14px",
    marginBottom: 14,
    background: "rgba(0,255,65,0.015)",
    ...style,
  }}>{children}</div>
);

function SkillIcon({ name }: { name: string }) {
  const Icon = SKILL_ICONS[name];
  if (!Icon) return null;
  return <Icon style={{ color: "#00AA85", flexShrink: 0, opacity: 0.9 }} size={14} />;
}

/* ── sections ── */

function AboutSection() {
  return (
    <div>
      <H>// Asfandyar Khan</H>

      <div className="about-grid">
        <div className="about-photo-frame">
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />
          <img
            src="/me.jpg"
            alt="Asfandyar Khan"
            className="about-photo"
            onError={(e) => {
              const el = e.currentTarget;
              el.style.display = "none";
              const ph = el.nextElementSibling as HTMLElement | null;
              if (ph) ph.style.display = "flex";
            }}
          />
          <div className="about-photo-placeholder">
            <div style={{ fontFamily: "'VT323', monospace", fontSize: 14, color: "#00AA85", letterSpacing: 2 }}>
              [ NO SIGNAL ]
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: "#5a7a5a", marginTop: 8, textAlign: "center", padding: "0 10px" }}>
              place photo at<br/><code>public/me.jpg</code>
            </div>
          </div>
          <div className="about-photo-scanlines" />
          <div className="about-photo-label">SUBJECT — A. KHAN</div>
        </div>

        <div className="about-info">
          <Block>
            <Row label="Role"     value="Junior Software Developer" />
            <Row label="Location" value="Alberta, Canada" />
            <Row label="Training" value="SAIT — Software Development Diploma" />
            <Row label="Status"   value="Available for Hire" />
          </Block>

          <Body>
            Highly motivated software developer with hands-on experience building full-stack web
            applications using React, Next.js, and Firebase. Strong foundation in front-end
            development, UI/UX design, and API integration.
          </Body>
          <Body>
            Passionate about developing scalable, user-centred applications and contributing to
            collaborative teams. During my SAIT Capstone I led front-end development of a real-world
            mental health platform — delivering against genuine client requirements, with Firebase
            and Azure AI integrations.
          </Body>
          <Body>
            Ready to contribute from day one. Fast learner, team-oriented, and genuinely
            invested in building great software.
          </Body>
        </div>
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <div>
      <H>// Skills</H>
      {Object.entries(SKILLS).map(([category, items]) => (
        <div key={category} style={{ marginBottom: 20 }}>
          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: 14,
            color: "#00DDB0",
            letterSpacing: 3,
            textTransform: "uppercase" as const,
            marginBottom: 10,
            paddingLeft: 8,
            borderLeft: "2px solid #00DDB0",
          }}>
            {category}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, paddingLeft: 8 }}>
            {items.map((skill) => (
              <span key={skill} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 12,
                color: "#a0b0a0",
                border: "1px solid #002018",
                padding: "5px 10px",
                letterSpacing: 0.5,
                background: "rgba(0,255,65,0.015)",
              }}>
                <SkillIcon name={skill} />
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsSection() {
  return (
    <div>
      <H>// Projects</H>
      {PROJECTS.map((proj) => (
        <div key={proj.name} style={{
          border: "1px solid #001a14",
          padding: 16,
          marginBottom: 16,
          background: "rgba(0,255,65,0.015)",
        }}>
          <div style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 13,
            fontWeight: 700,
            color: "#00DDB0",
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            marginBottom: 3,
          }}>{proj.name}</div>

          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 12,
            color: "#5a7a5a",
            marginBottom: 14,
            letterSpacing: 0.5,
          }}>
            {proj.role} — {proj.context}
          </div>

          <Body style={{ marginBottom: 12 }}>{proj.description}</Body>

          <div style={{ marginBottom: 14 }}>
            {proj.achievements.map((a, i) => (
              <div key={i} style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 12,
                color: "#6a8a6a",
                paddingLeft: 10,
                lineHeight: 1.85,
                borderLeft: i === 0 ? "1px solid #001a14" : undefined,
                marginLeft: 0,
              }}>
                › {a}
              </div>
            ))}
          </div>

          {/* Tech tags with icons */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
            {proj.tech.map((t) => {
              const Icon = SKILL_ICONS[t];
              return (
                <span key={t} style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 11,
                  padding: "3px 8px",
                  border: "1px solid #001a14",
                  color: "#6a8a6a",
                  letterSpacing: 0.5,
                  background: "rgba(0,255,65,0.01)",
                }}>
                  {Icon && <Icon size={11} style={{ color: "#00AA85", opacity: 0.8 }} />}
                  {t}
                </span>
              );
            })}
          </div>

          {(proj.github || proj.live) && (
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              {proj.github && (
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="mission-link">
                  <SiGithub size={12} style={{ marginRight: 4, verticalAlign: "middle" }} /> GitHub
                </a>
              )}
              {proj.live && (
                <a href={proj.live} target="_blank" rel="noopener noreferrer" className="mission-link">
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function QualificationsSection() {
  return (
    <div>
      <H>// Qualifications</H>
      {QUALIFICATIONS.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", flexShrink: 0 }}>
            <div style={{
              width: 10, height: 10,
              border: "2px solid #00DDB0",
              background: "#00DDB0",
              boxShadow: "0 0 6px rgba(0,255,65,0.4)",
              marginTop: 4, flexShrink: 0,
            }} />
            {i < QUALIFICATIONS.length - 1 && (
              <div style={{ width: 1, flex: 1, background: "#001a14", marginTop: 4 }} />
            )}
          </div>
          <div style={{ flex: 1, paddingBottom: 8 }}>
            <div style={{
              fontFamily: "'VT323', monospace", fontSize: 13, color: "#004535",
              letterSpacing: 2, marginBottom: 3, textTransform: "uppercase" as const,
            }}>
              {item.date}
            </div>
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: 12, fontWeight: 700,
              color: "#00DDB0", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 3,
            }}>
              {item.role}
            </div>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: "#5a7a5a",
              marginBottom: 8, letterSpacing: 0.5,
            }}>
              {item.org}
            </div>
            <Body style={{ marginBottom: 0 }}>{item.desc}</Body>
          </div>
        </div>
      ))}
    </div>
  );
}

function CertificationsSection() {
  return (
    <div>
      <H>// Certifications</H>
      <div style={{
        border: "1px solid #001a14",
        padding: "32px 20px",
        textAlign: "center" as const,
        marginTop: 8,
        background: "rgba(0,255,65,0.01)",
      }}>
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: 16,
          color: "#003428",
          letterSpacing: 4,
          marginBottom: 12,
          textTransform: "uppercase" as const,
        }}>
          — CHANNEL RESERVED —
        </div>
        <Body style={{ textAlign: "center", marginBottom: 0, color: "#3a5a3a" }}>
          Certifications will be added here as they are completed.
        </Body>
      </div>
    </div>
  );
}

function ContactSection() {
  const channels = [
    { label: "Email",    href: `mailto:${CONTACT.email}`,   value: CONTACT.email },
    { label: "Phone",    href: `tel:${CONTACT.phone.replace(/[\s()+-]/g, "")}`, value: CONTACT.phone },
    { label: "GitHub",   href: `https://${CONTACT.github}`, value: CONTACT.github },
    { label: "LinkedIn", href: `https://${CONTACT.linkedin}`, value: CONTACT.linkedin },
    { label: "Location", href: undefined,                   value: CONTACT.location },
  ];

  return (
    <div>
      <H>// Contact</H>

      <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
        {channels.map(({ label, href, value }) => {
          const Icon = CONTACT_ICONS[label];
          return (
            <div key={label} style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              border: "1px solid #001a14",
              padding: "10px 14px",
              background: "rgba(0,255,65,0.015)",
            }}>
              {Icon && (
                <Icon size={14} style={{ color: "#00DDB0", flexShrink: 0, opacity: 0.8 }} />
              )}
              <span style={{
                fontFamily: "'VT323', monospace",
                fontSize: 13,
                color: "#00DDB0",
                letterSpacing: 2,
                textTransform: "uppercase" as const,
                flexShrink: 0,
                width: 70,
              }}>{label}</span>
              <div style={{ flex: 1, borderLeft: "1px solid #001a14", paddingLeft: 12 }}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: 12,
                      color: "#a0b0a0",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#00DDB0")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#a0b0a0")}
                  >
                    {value}
                  </a>
                ) : (
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: "#a0b0a0" }}>{value}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Block style={{ marginTop: 16 }}>
        <Row label="Open to"     value="Front-End · Full-Stack · React / Next.js" />
        <Row label="Available"   value="Immediately" />
        <Row label="Preference"  value="Remote / Hybrid / On-site" />
      </Block>
    </div>
  );
}

const SECTION_COMPONENTS: Record<string, React.FC> = {
  ABOUT:          AboutSection,
  SKILLS:         SkillsSection,
  PROJECTS:       ProjectsSection,
  QUALIFICATIONS: QualificationsSection,
  CERTIFICATIONS: CertificationsSection,
  CONTACT:        ContactSection,
};

interface SectionContentProps {
  sectionCode: string;
}

export function SectionContent({ sectionCode }: SectionContentProps) {
  const Component = SECTION_COMPONENTS[sectionCode];
  if (!Component) return null;
  return <Component />;
}
