import { SKILLS, PROJECTS, QUALIFICATIONS, CONTACT } from "../data/portfolio";

/* ── shared typography helpers ── */
const H = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    fontFamily: "'VT323', monospace",
    fontSize: 20,
    color: "#00FF41",
    letterSpacing: 4,
    textTransform: "uppercase" as const,
    borderBottom: "1px solid #006615",
    paddingBottom: 6,
    marginBottom: 16,
    textShadow: "0 0 8px rgba(0,255,65,0.4)",
  }}>{children}</div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    fontFamily: "'VT323', monospace",
    fontSize: 13,
    color: "#00FF41",
    letterSpacing: 2,
    textTransform: "uppercase" as const,
  }}>{children}</span>
);

const Body = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <p style={{
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 13,
    color: "#b0b8b0",
    lineHeight: 1.85,
    marginBottom: 12,
    ...style,
  }}>{children}</p>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
    <span style={{ fontFamily: "'VT323', monospace", fontSize: 14, color: "#00FF41", letterSpacing: 2, flexShrink: 0, minWidth: 120, textTransform: "uppercase" as const }}>{label}</span>
    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: "#b0b8b0" }}>{value}</span>
  </div>
);

const Block = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    border: "1px solid #002800",
    padding: "12px 14px",
    marginBottom: 14,
    background: "rgba(0,255,65,0.02)",
    ...style,
  }}>{children}</div>
);

/* ── sections ── */

function AboutSection() {
  return (
    <div>
      <H>// Asfandyar Khan</H>

      <Block>
        <Row label="Role" value="Junior Software Developer" />
        <Row label="Location" value="Alberta, Canada" />
        <Row label="Training" value="SAIT — Software Development Diploma" />
        <Row label="Status" value="Available for Hire" />
      </Block>

      <Body>
        Highly motivated software developer with hands-on experience building full-stack web
        applications using React, Next.js, and Firebase. Strong foundation in front-end
        development, UI/UX design, and API integration.
      </Body>
      <Body>
        Passionate about developing scalable, user-centred applications and contributing to
        collaborative teams. During my SAIT Capstone I led front-end development of a real-world
        mental health platform — delivering a complete application against genuine client
        requirements, with Firebase and Azure AI integrations.
      </Body>
      <Body>
        Ready to contribute from day one. Fast learner, team-oriented, and genuinely
        interested in the craft of building great software.
      </Body>
    </div>
  );
}

function SkillsSection() {
  return (
    <div>
      <H>// Skills</H>
      {Object.entries(SKILLS).map(([category, items]) => (
        <div key={category} style={{ marginBottom: 18 }}>
          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: 14,
            color: "#00FF41",
            letterSpacing: 3,
            textTransform: "uppercase" as const,
            marginBottom: 8,
            paddingLeft: 8,
            borderLeft: "2px solid #00FF41",
          }}>
            {category}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, paddingLeft: 8 }}>
            {items.map((skill) => (
              <span key={skill} style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 13,
                color: "#b0b8b0",
                border: "1px solid #002800",
                padding: "3px 10px",
                letterSpacing: 1,
              }}>
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
          border: "1px solid #002800",
          padding: 16,
          marginBottom: 16,
          background: "rgba(0,255,65,0.02)",
        }}>
          <div style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 13,
            fontWeight: 700,
            color: "#00FF41",
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            marginBottom: 4,
          }}>{proj.name}</div>

          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: 15,
            color: "#6a8a6a",
            letterSpacing: 2,
            marginBottom: 12,
          }}>
            {proj.role} — {proj.context}
          </div>

          <Body style={{ marginBottom: 12 }}>{proj.description}</Body>

          <div style={{ marginBottom: 12 }}>
            {proj.achievements.map((a, i) => (
              <div key={i} style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 12,
                color: "#7a9a7a",
                paddingLeft: 12,
                lineHeight: 1.8,
              }}>
                › {a}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
            {proj.tech.map((t) => (
              <span key={t} style={{
                fontFamily: "'VT323', monospace",
                fontSize: 13,
                padding: "1px 8px",
                border: "1px solid #002800",
                color: "#6a8a6a",
                letterSpacing: 1,
                textTransform: "uppercase" as const,
              }}>{t}</span>
            ))}
          </div>

          {(proj.github || proj.live) && (
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              {proj.github && (
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="mission-link">
                  GitHub
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
              border: "2px solid #00FF41",
              background: "#00FF41",
              boxShadow: "0 0 6px rgba(0,255,65,0.4)",
              marginTop: 4, flexShrink: 0,
            }} />
            {i < QUALIFICATIONS.length - 1 && (
              <div style={{ width: 1, flex: 1, background: "#002800", marginTop: 4 }} />
            )}
          </div>
          <div style={{ flex: 1, paddingBottom: 8 }}>
            <div style={{
              fontFamily: "'VT323', monospace", fontSize: 13, color: "#006615",
              letterSpacing: 2, marginBottom: 3, textTransform: "uppercase" as const,
            }}>
              {item.date}
            </div>
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: 12, fontWeight: 700,
              color: "#00FF41", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 3,
            }}>
              {item.role}
            </div>
            <div style={{
              fontFamily: "'VT323', monospace", fontSize: 16, color: "#6a8a6a",
              letterSpacing: 2, marginBottom: 8,
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
        border: "1px solid #002800",
        padding: "24px 20px",
        textAlign: "center" as const,
        marginTop: 8,
      }}>
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: 18,
          color: "#006615",
          letterSpacing: 4,
          marginBottom: 10,
          textTransform: "uppercase" as const,
        }}>
          — CHANNEL RESERVED —
        </div>
        <Body style={{ textAlign: "center", marginBottom: 0, color: "#4a6a4a" }}>
          Certifications will be added here as they are completed.
          <br />This frequency is standing by.
        </Body>
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div>
      <H>// Contact</H>

      <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
        {[
          { label: "Email", href: `mailto:${CONTACT.email}`, value: CONTACT.email },
          { label: "Phone", href: `tel:${CONTACT.phone.replace(/\s/g, "")}`, value: CONTACT.phone },
          { label: "GitHub", href: `https://${CONTACT.github}`, value: CONTACT.github },
          { label: "LinkedIn", href: `https://${CONTACT.linkedin}`, value: CONTACT.linkedin },
          { label: "Location", href: undefined, value: CONTACT.location },
        ].map(({ label, href, value }) => (
          <div key={label} style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            border: "1px solid #002800",
            padding: "10px 14px",
            background: "rgba(0,255,65,0.02)",
          }}>
            <Label>{label}</Label>
            <div style={{ flex: 1, borderLeft: "1px solid #002800", paddingLeft: 14 }}>
              {href ? (
                <a href={href} target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"} rel="noopener noreferrer" style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 13,
                  color: "#b0b8b0",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#00FF41")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#b0b8b0")}
                >
                  {value}
                </a>
              ) : (
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: "#b0b8b0" }}>{value}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <a href="#" className="dossier-btn" onClick={(e) => e.preventDefault()}>
          Download CV
        </a>
      </div>

      <Block style={{ marginTop: 16 }}>
        <Row label="Open to" value="Front-End · Full-Stack · React / Next.js roles" />
        <Row label="Availability" value="Immediate" />
        <Row label="Preference" value="Remote / Hybrid / On-site" />
      </Block>
    </div>
  );
}

const SECTION_COMPONENTS: Record<string, React.FC> = {
  ABOUT: AboutSection,
  SKILLS: SkillsSection,
  PROJECTS: ProjectsSection,
  QUALIFICATIONS: QualificationsSection,
  CERTIFICATIONS: CertificationsSection,
  CONTACT: ContactSection,
};

interface SectionContentProps {
  sectionCode: string;
}

export function SectionContent({ sectionCode }: SectionContentProps) {
  const Component = SECTION_COMPONENTS[sectionCode];
  if (!Component) return null;
  return <Component />;
}
