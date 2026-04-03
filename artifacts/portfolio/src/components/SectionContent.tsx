import { useEffect, useState } from "react";
import { SKILLS, PROJECTS, TIMELINE, CONTACT } from "../data/portfolio";

function HomeSection() {
  return (
    <div>
      <div className="home-title glow">ASFAND KHAN</div>
      <div className="home-subtitle">[ JUNIOR SOFTWARE DEVELOPER ]</div>

      <div className="status-block">
        <div className="status-line">DESIGNATION : <span>Junior Software Developer</span></div>
        <div className="status-line">STATUS      : <span>ACTIVE — Available for Hire</span></div>
        <div className="status-line">LOCATION    : <span>United Kingdom</span></div>
        <div className="status-line">CLEARANCE   : <span>Full-Stack Development</span></div>
        <div className="status-line">OBJECTIVE   : <span>First Dev Role — Ready to Deploy</span></div>
      </div>

      <div className="status-block">
        <div className="status-line">◈ Use <span>◄ ►</span> arrows to change frequency</div>
        <div className="status-line">◈ Each frequency contains a transmission</div>
        <div className="status-line">◈ Navigate the codec to discover my work</div>
      </div>

      <div style={{ marginTop: '16px', fontFamily: 'VT323, monospace', fontSize: '14px', color: 'var(--green-dark)', letterSpacing: '2px' }}>
        ▶ SIGNAL STRENGTH: OPTIMAL &nbsp; | &nbsp; ENCRYPTION: NONE &nbsp; | &nbsp; CODEC v4.2.1
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div>
      <div className="section-header">// ABOUT ME</div>
      <div className="status-block" style={{ marginBottom: '14px' }}>
        <div className="status-line">SUBJECT    : <span>Asfand Khan</span></div>
        <div className="status-line">UNIT       : <span>Software Engineering</span></div>
        <div className="status-line">RANK       : <span>Junior Developer (Entry Level)</span></div>
      </div>

      <p className="about-text">
        I'm <span className="hl">Asfand Khan</span> — a junior software developer who recently completed a <span className="hl">BSc in Computer Science</span>. 
        I've spent the last few years learning how to build things properly: not just making code that works, but understanding why it works.
      </p>
      <p className="about-text">
        I love the <span className="hl">full-stack</span> side of development — there's something satisfying about owning a feature from the database schema all the way to the UI. 
        I've worked with <span className="hl">Python, JavaScript, TypeScript, React,</span> and <span className="hl">Node.js</span>, and I'm always learning.
      </p>
      <p className="about-text">
        I'm looking for my <span className="hl">first professional role</span> where I can contribute from day one, grow quickly, and work alongside people who care about building great software. 
        I bring a genuine passion for the craft, strong problem-solving instincts, and a habit of going deeper than the surface.
      </p>
      <p className="about-text">
        When I'm not coding, I'm probably obsessing over a game, reading about distributed systems, or building something nobody asked me to build.
      </p>

      <div className="status-block">
        <div className="status-line">LANGUAGES  : <span>English (Native)</span></div>
        <div className="status-line">STRENGTHS  : <span>Problem Solving · Fast Learner · Curious</span></div>
        <div className="status-line">INTERESTS  : <span>Web Dev · Open Source · Gaming · Systems</span></div>
      </div>
    </div>
  );
}

function SkillsSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <div className="section-header">// EQUIPMENT LOADOUT</div>
      <div className="status-line" style={{ marginBottom: '14px', fontSize: '12px', color: 'var(--green-dark)', fontFamily: 'Share Tech Mono, monospace' }}>
        ▶ SIGNAL STRENGTH INDICATES PROFICIENCY LEVEL
      </div>
      {SKILLS.map((cat) => (
        <div className="skill-category" key={cat.category}>
          <div className="skill-category-title">[ {cat.category} ]</div>
          {cat.items.map((skill) => (
            <div className="skill-item" key={skill.name}>
              <div className="skill-name">{skill.name}</div>
              <div className="skill-bar">
                <div
                  className="skill-bar-fill"
                  style={{ width: loaded ? `${skill.level}%` : '0%' }}
                />
              </div>
              <div className="skill-level">{skill.level}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ProjectsSection() {
  return (
    <div>
      <div className="section-header">// MISSION FILES</div>
      {PROJECTS.map((proj) => (
        <div className="mission-card" key={proj.codename}>
          <div className="mission-codename">▶ {proj.codename}</div>
          <div className="mission-name">{proj.name}</div>
          <div className="mission-objective">{proj.objective}</div>
          <div className="mission-meta">
            {proj.tech.map((t) => (
              <span className="mission-tag" key={t}>{t}</span>
            ))}
          </div>
          <div className="mission-links">
            {proj.github && (
              <a href={proj.github} target="_blank" rel="noopener noreferrer" className="mission-link">
                ◈ GITHUB
              </a>
            )}
            {proj.live && (
              <a href={proj.live} target="_blank" rel="noopener noreferrer" className="mission-link">
                ◈ LIVE DEMO
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceSection() {
  return (
    <div>
      <div className="section-header">// PERSONNEL DOSSIER</div>
      <div className="status-block" style={{ marginBottom: '16px' }}>
        <div className="status-line">CLEARANCE  : <span>LEVEL 2 — TRAINING COMPLETE</span></div>
        <div className="status-line">UNIT       : <span>FOXHOUND SOFTWARE DIVISION</span></div>
      </div>
      <div>
        {TIMELINE.map((item, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-marker">
              <div className="timeline-dot" />
              {i < TIMELINE.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="timeline-content">
              <div className="timeline-date">[ {item.date} ]</div>
              <div className="timeline-role">{item.role}</div>
              <div className="timeline-org">◈ {item.org}</div>
              <div className="timeline-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div>
      <div className="section-header">// TRANSMISSION CHANNELS</div>
      <div className="status-line" style={{ marginBottom: '16px', fontSize: '13px', color: 'var(--green-dark)', fontFamily: 'Share Tech Mono, monospace' }}>
        ▶ ALL CHANNELS SECURE — READY TO RECEIVE
      </div>

      <div className="contact-channels">
        <a href={`mailto:${CONTACT.email}`} className="contact-channel">
          <div className="channel-freq">EMAIL</div>
          <div className="channel-label">◈ Direct Signal</div>
          <div className="channel-value">{CONTACT.email}</div>
        </a>
        <a href={`https://${CONTACT.github}`} target="_blank" rel="noopener noreferrer" className="contact-channel">
          <div className="channel-freq">GH</div>
          <div className="channel-label">◈ GitHub Ops</div>
          <div className="channel-value">{CONTACT.github}</div>
        </a>
        <a href={`https://${CONTACT.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-channel">
          <div className="channel-freq">LI</div>
          <div className="channel-label">◈ LinkedIn Field</div>
          <div className="channel-value">{CONTACT.linkedin}</div>
        </a>
      </div>

      <a href="#" className="dossier-btn" onClick={(e) => e.preventDefault()}>
        ▼ DOWNLOAD DOSSIER (CV)
      </a>

      <div className="status-block" style={{ marginTop: '20px' }}>
        <div className="status-line">
          ◈ <span>Open to:</span> Full-Stack · Front-End · Back-End roles
        </div>
        <div className="status-line">
          ◈ <span>Availability:</span> Immediate
        </div>
        <div className="status-line">
          ◈ <span>Location:</span> UK-based (Remote / Hybrid / On-site)
        </div>
      </div>
    </div>
  );
}

const SECTION_COMPONENTS: Record<string, React.FC> = {
  HOME: HomeSection,
  ABOUT: AboutSection,
  SKILLS: SkillsSection,
  PROJECTS: ProjectsSection,
  EXPERIENCE: ExperienceSection,
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
