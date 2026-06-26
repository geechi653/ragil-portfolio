import type { ReactNode } from "react";
import {
  profile,
  experience,
  projects,
  skills,
  education,
  certifications,
} from "./data/portfolio";
import {
  MailIcon,
  PhoneIcon,
  PinIcon,
  LinkedInIcon,
  GithubIcon,
  DownloadIcon,
} from "./components/Icons";

/* ── Reusable syntax-highlight tokens (keeps section markup DRY) ───────── */
const K = ({ children }: { children: ReactNode }) => (
  <span className="t-key">{children}</span>
);
const S = ({ children }: { children: ReactNode }) => (
  <span className="t-str">{children}</span>
);
const F = ({ children }: { children: ReactNode }) => (
  <span className="t-fn">{children}</span>
);
const P = ({ children }: { children: ReactNode }) => (
  <span className="t-prop">{children}</span>
);
const C = ({ children }: { children: ReactNode }) => (
  <span className="t-com">{children}</span>
);
const Pn = ({ children }: { children: ReactNode }) => (
  <span className="t-punc">{children}</span>
);

/** One numbered editor line (CSS supplies the gutter number). */
const Line = ({ children }: { children?: ReactNode }) => (
  <div className="ln">{children ?? " "}</div>
);

/* ── about.tsx ─────────────────────────────────────────────────────────── */
function About() {
  return (
    <div className="code">
      <Line>
        <C>/* Hey, I’m Ragil. Welcome to my portfolio. */</C>
      </Line>
      <Line />
      <div className="hero ln">
        <h1>{profile.name}</h1>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-tag">{profile.tagline}</p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            <DownloadIcon size={15} /> Download résumé
          </a>
          <a
            className="btn"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon size={15} /> LinkedIn
          </a>
        </div>
      </div>
      <Line />
      <Line>
        <K>const</K> <span className="t-var">ragil</span> <Pn>=</Pn>{" "}
        <Pn>{"{"}</Pn>
      </Line>
      <Line>
        {"  "}
        <P>role</P>
        <Pn>:</Pn> <S>'{profile.role}'</S>
        <Pn>,</Pn>
      </Line>
      <Line>
        {"  "}
        <P>location</P>
        <Pn>:</Pn> <S>'{profile.location}'</S>
        <Pn>,</Pn>
      </Line>
      <Line>
        {"  "}
        <P>citizenship</P>
        <Pn>:</Pn> <S>'{profile.citizenship}'</S>
        <Pn>,</Pn>
      </Line>
      <Line>
        {"  "}
        <P>status</P>
        <Pn>:</Pn> <S>'{profile.status}'</S>
        <Pn>,</Pn>
      </Line>
      <Line>
        <Pn>{"}"}</Pn>
      </Line>
      <Line />
      <Line>
        <C>/**</C>
      </Line>
      {profile.about.map((para, i) => (
        <Line key={i}>
          <C>
            {" * "}
            {para}
          </C>
        </Line>
      ))}
      <Line>
        <C>{" */"}</C>
      </Line>
      <Line />

      <Line>
        <C>// education</C>
      </Line>
      <div className="ln">
        <div className="panel">
          <div className="panel-row">
            <strong>{education.school}</strong>
            <span className="muted">{education.location}</span>
          </div>
          <div className="panel-sub">{education.degree}</div>
          <div className="chips">
            <span className="chip">GPA {education.gpa}</span>
            <span className="chip">{education.honors}</span>
          </div>
        </div>
      </div>
      <Line />

      <Line>
        <C>// certifications</C>
      </Line>
      <div className="ln">
        <div className="cert-grid">
          {certifications.map((c) => (
            <div className="cert" key={c.name}>
              <div className="cert-name">{c.name}</div>
              <div className="muted">
                {c.issuer} · {c.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── experience.json ───────────────────────────────────────────────────── */
function ExperienceView() {
  return (
    <div className="code">
      <Line>
        <C>// Career history — most recent first</C>
      </Line>
      <Line />
      {experience.map((job, i) => (
        <div className="ln" key={job.company}>
          <article className="job">
            <div className="job-bar" />
            <div className="job-body">
              <header className="job-head">
                <div>
                  <h3>{job.role}</h3>
                  <div className="job-company">
                    <span className="t-fn">{job.company}</span>
                    <span className="muted"> · {job.meta}</span>
                  </div>
                </div>
                <div className="job-meta">
                  <span className="badge">{job.period}</span>
                  <span className="muted">{job.location}</span>
                </div>
              </header>
              <ul className="bullets">
                {job.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
              <div className="chips">
                {job.stack.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
          {i < experience.length - 1 && <div className="ln-gap" />}
        </div>
      ))}
    </div>
  );
}

/* ── projects.md ───────────────────────────────────────────────────────── */
function Projects() {
  return (
    <div className="code">
      <Line>
        <span className="md-h1"># Projects</span>
      </Line>
      <Line />
      {projects.map((p) => (
        <div className="ln" key={p.name}>
          <article className="project">
            <header className="project-head">
              <h3>
                <span className="md-h2">## {p.name}</span>
                <span className="project-tagline"> — {p.tagline}</span>
              </h3>
              <span className="badge">{p.period}</span>
            </header>
            <ul className="bullets">
              {p.highlights.map((h, j) => (
                <li key={j}>{h}</li>
              ))}
            </ul>
            <div className="chips">
              {p.stack.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </article>
        </div>
      ))}
      <Line />
      <Line>
        <C>{"<!-- More on GitHub -->"}</C>
      </Line>
    </div>
  );
}

/* ── skills.ts ─────────────────────────────────────────────────────────── */
function Skills() {
  const groups = Object.entries(skills);
  return (
    <div className="code">
      <Line>
        <K>export const</K> <span className="t-var">skills</span> <Pn>=</Pn>{" "}
        <Pn>{"{"}</Pn>
      </Line>
      {groups.map(([group, items]) => (
        <div className="ln" key={group}>
          <div className="skill-group">
            <div className="skill-key">
              {"  "}
              <P>'{group}'</P>
              <Pn>: [</Pn>
            </div>
            <div className="chips chips-skill">
              {items.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
            <div className="skill-close">
              <Pn>],</Pn>
            </div>
          </div>
        </div>
      ))}
      <Line>
        <Pn>{"}"}</Pn>
      </Line>
    </div>
  );
}

/* ── contact.tsx ───────────────────────────────────────────────────────── */
function Contact() {
  const items = [
    {
      icon: <MailIcon size={17} />,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <PhoneIcon size={17} />,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone}`,
    },
    {
      icon: <LinkedInIcon size={17} />,
      label: "LinkedIn",
      value: "in/ragil-mammadov",
      href: profile.linkedin,
    },
    {
      icon: <PinIcon size={17} />,
      label: "Location",
      value: profile.location,
      href: null,
    },
  ];
  return (
    <div className="code">
      <Line>
        <K>function</K> <F>getInTouch</F>
        <Pn>() {"{"}</Pn>
      </Line>
      <Line>
        {"  "}
        <K>return</K> <Pn>(</Pn>
      </Line>
      <div className="ln">
        <div className="contact-card">
          <p className="contact-lead">
            I’m <span className="t-fn">{profile.status.toLowerCase()}</span> —
            let’s build something.
          </p>
          <div className="contact-grid">
            {items.map((it) =>
              it.href ? (
                <a
                  className="contact-item"
                  key={it.label}
                  href={it.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="contact-icon">{it.icon}</span>
                  <span>
                    <span className="muted">{it.label}</span>
                    <span className="contact-value">{it.value}</span>
                  </span>
                </a>
              ) : (
                <div className="contact-item" key={it.label}>
                  <span className="contact-icon">{it.icon}</span>
                  <span>
                    <span className="muted">{it.label}</span>
                    <span className="contact-value">{it.value}</span>
                  </span>
                </div>
              ),
            )}
          </div>
          <div className="contact-actions">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              <MailIcon size={15} /> Say hello
            </a>
            <a
              className="btn"
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <DownloadIcon size={15} /> Résumé
            </a>
            <a
              className="btn"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon size={15} /> GitHub
            </a>
          </div>
        </div>
      </div>
      <Line>
        {"  "}
        <Pn>)</Pn>
      </Line>
      <Line>
        <Pn>{"}"}</Pn>
      </Line>
    </div>
  );
}

/* ── File registry (single place that ties files → renderers) ──────────── */
export type FileDef = {
  id: string;
  name: string;
  ext: string;
  lang: string;
  render: () => JSX.Element;
};

export const FILES: FileDef[] = [
  {
    id: "about",
    name: "about",
    ext: "tsx",
    lang: "TypeScript JSX",
    render: About,
  },
  {
    id: "experience",
    name: "experience",
    ext: "json",
    lang: "JSON",
    render: ExperienceView,
  },
  {
    id: "projects",
    name: "projects",
    ext: "md",
    lang: "Markdown",
    render: Projects,
  },
  {
    id: "skills",
    name: "skills",
    ext: "ts",
    lang: "TypeScript",
    render: Skills,
  },
  {
    id: "contact",
    name: "contact",
    ext: "tsx",
    lang: "TypeScript JSX",
    render: Contact,
  },
];

export const fileLabel = (f: FileDef) => `${f.name}.${f.ext}`;
