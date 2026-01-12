import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  FileText,
  ExternalLink,
  Search,
  MapPin,
  GraduationCap,
  Shield,
  BarChart3,
  Settings,
} from "lucide-react";

// Single-file portfolio page.
// How to use:
// 1) Replace the placeholders in PROFILE + PROJECTS.
// 2) Paste into a React app (Vite, Next.js, CRA) as App.jsx.
// 3) Deploy on GitHub Pages, Vercel, or Netlify.

const PROFILE = {
  name: "Jerry Tang",
  headline: "MS in Information Systems (Cybersecurity & Risk Analytics) | Data + Risk + Consulting",
  location: "United States",
  email: "jetang600@outlook.com",
  linkedin: "https://www.linkedin.com/in/jerrytangindiana/",
  github: "https://github.com/jetang600",
  resumeUrl: "pdfs/resume.pdf", // upload to a public link and paste here
  about:
    "I build data driven tools and security programs that make messy operations feel simple. Recent work includes an LLM powered team recommendation app (Python, Flask, SQLite) and an end to end GRC runbook set for a small EdTech SaaS aligned to NIST CSF. I like projects where I can translate business needs into clean workflows, dashboards, and controls.",
  skills: [
    "Python",
    "SQL",
    "R",
    "Excel & VBA",
    "Tableau",
    "Flask",
    "Risk & Controls",
    "NIST CSF",
    "COBIT",
    "Vendor Risk",
  ],
  focusAreas: [
    {
      title: "Analytics",
      icon: BarChart3,
      body: "SQL and Python pipelines, dashboards, and decision support. I like answering business questions with clean data and clear visuals.",
    },
    {
      title: "Cybersecurity & GRC",
      icon: Shield,
      body: "Practical controls for small teams, evidence ready documentation, vendor risk workflows, and data classification aligned to common frameworks.",
    },
    {
      title: "Tech Consulting",
      icon: Settings,
      body: "Problem framing, stakeholder communication, and delivery. I enjoy making implementation plans that are realistic and measurable.",
    },
  ],
  education: [
    {
      school: "Indiana University, Kelley School of Business",
      degree: "M.S. Information Systems",
      detail: "Cybersecurity & Risk Analytics",
      year: "2025",
    },
    {
      school: "Indiana University, Kelley School of Business",
      degree: "B.S. Business",
      detail: "Finance",
      year: "2024",
    },
  ],
};

const PROJECTS = [
  {
    id: "team-reco",
    title: "Team Recommendation / Resource Allocation App",
    tags: ["Python", "Flask", "SQLite", "LLMs", "Skill extraction"],
    impact:
      "Built a web app that parses project requirements, extracts skills with an LLM prompt pipeline, and recommends balanced teams based on skills and workload constraints.",
    highlights: [
      "Designed schema for employees, skills, projects, and assignments with workload rules",
      "Implemented skill bank logic and structured JSON outputs for reliable extraction",
      "Added manager notes input to influence recommendations and reduce mismatch",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/jetang600/Team-Recommendation-Logic-App" },
    ],
  },
  {
    id: "predict-premium",
    title: "Predicting Premium Subscription Conversion",
    tags: ["R", "Classification Models", "Imbalanced Data", "F1 Score", "Marketing Analytics"],
    impact:
      "Developed and evaluated machine learning models to identify high-likelihood premium converters from a freemium user base, with a focus on imbalanced data and marketing efficiency.",
    highlights: [
      "Built and compared multiple classification models to predict freemium users most likely to convert to premium subscriptions",
      "Optimized model selection using F1 score to handle severe class imbalance and reduce false positives in marketing outreach",
      "Translated model performance into practical targeting insights to support more ROI-driven subscription growth strategies",
    ],

    links: [
      { label: "GitHub", url: "https://github.com/jetang600/predicting-premium-adopters/tree/main" },
    ],
  },
  {
    id: "tmhna",
    title: "TMHNA Enterprise Digital Transformation Strategy",
    tags: ["SAP S/4HANA", "AI", "RPA", "IoT", "COBIT"],
    impact:
      "Co built a future state strategy and prioritization approach for enterprise initiatives, with a focus on data governance and measurable operational improvements.",
    highlights: [
      "Mapped value drivers across supply chain visibility, reporting, and integrated planning",
      "Proposed governance and data ownership model to support scaled analytics",
      "Built prioritization framework to sequence initiatives by value and feasibility",
    ],
    links: [{ label: "PDF Brief", url: "pdfs/tmhna.pdf" }],
  },
];

const EXPERIENCE = [
  {
    company: "Kelley Hope Digital Project (Consulting)",
    role: "GRC Consultant",
    time: "2025",
    bullets: [
      "Collaborated on an 8-member consulting team to strengthen an EdTech company’s governance, risk, and compliance (GRC) framework, improving strategic planning, security documentation, and regulatory alignment",
      "Designed and implemented a Vendor Risk Management framework including a vendor criticality matrix and lifecycle processes to evaluate third-party providers against security, compliance, and operational risk criteria",
      "Developed and expanded security runbooks and policies for vendor management, vulnerability management, and disaster recovery, ensuring compliance with NIST CSF 2.0, FERPA, and GDPR",
    ],
  },
];

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-700 shadow-sm">
      {children}
    </span>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-neutral-600">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function IconLink({ href, Icon, label }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      {href?.startsWith("http") ? <ExternalLink className="h-3.5 w-3.5 opacity-60" /> : null}
    </a>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">{project.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-neutral-700">{project.impact}</p>

      <ul className="mt-4 space-y-2 text-neutral-700">
        {project.highlights.map((h, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {project.links?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target={l.url?.startsWith("http") ? "_blank" : undefined}
              rel={l.url?.startsWith("http") ? "noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              {l.label}
              <ExternalLink className="h-4 w-4" />
            </a>
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");

  const allTags = useMemo(() => {
    const set = new Set();
    PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.impact.toLowerCase().includes(q) ||
        p.highlights.some((h) => h.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);


  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6">
        <Hero />

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <aside className="md:col-span-4">
            <div className="sticky top-24 space-y-8">
              <Card>
                <h3 className="text-sm font-semibold text-neutral-900">Quick links</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <IconLink href={`mailto:${PROFILE.email}`} Icon={Mail} label="Email" />
                  <IconLink href={PROFILE.linkedin} Icon={Linkedin} label="LinkedIn" />
                  <IconLink href={PROFILE.github} Icon={Github} label="GitHub" />
                  <IconLink href={PROFILE.resumeUrl} Icon={FileText} label="Resume" />
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-neutral-900">Skills</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PROFILE.skills.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-neutral-900">Education</h3>
                <div className="mt-3 space-y-3">
                  {PROFILE.education.map((e) => (
                    <div key={e.degree} className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="mt-0.5 h-4 w-4" />
                        <div>
                          <div className="font-medium text-neutral-900">{e.school}</div>
                          <div className="text-sm text-neutral-700">
                            {e.degree}{e.detail ? `, ${e.detail}` : ""}
                          </div>
                          <div className="text-xs text-neutral-600">{e.year}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </aside>

          <section className="md:col-span-8">
            <Section id="projects" title="Projects" subtitle="A few pieces of work I am proud of.">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search projects"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-neutral-300"
                  />
                </div>
              </div>


              <div className="mt-5 grid gap-4">
                {filtered.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
                {!filtered.length ? (
                  <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-neutral-700 shadow-sm">
                    No matches. Try a different search or tag.
                  </div>
                ) : null}
              </div>
            </Section>

            <div className="mt-10" />

            <Section id="experience" title="Experience" subtitle="Recent roles and how I contributed.">
              <div className="space-y-4">
                {EXPERIENCE.map((x) => (
                  <div key={x.company} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                      <div>
                        <div className="text-base font-semibold text-neutral-900">{x.role}</div>
                        <div className="text-sm text-neutral-700">{x.company}</div>
                      </div>
                      <div className="text-sm text-neutral-600">{x.time}</div>
                    </div>
                    <ul className="mt-4 space-y-2 text-neutral-700">
                      {x.bullets.map((b, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <div className="mt-10" />

            <Section id="contact" title="Contact" subtitle="If you want to chat about a role or a project.">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  <IconLink href={`mailto:${PROFILE.email}`} Icon={Mail} label={PROFILE.email} />
                  <IconLink href={PROFILE.linkedin} Icon={Linkedin} label="LinkedIn" />
                  <IconLink href={PROFILE.github} Icon={Github} label="GitHub" />
                </div>
                <p className="mt-4 text-neutral-700">
                  Best way to reach me is email. If you include a quick note on what you are looking for, I will reply
                  faster.
                </p>
              </div>
            </Section>
          </section>
        </div>
      </main>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between md:px-6">
          <div>© {new Date().getFullYear()} {PROFILE.name}</div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{PROFILE.location}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Header() {
  const nav = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#top" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-neutral-900 text-white">
            <span className="text-sm font-semibold">JT</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-neutral-900">{PROFILE.name}</div>
            <div className="text-xs text-neutral-600">Portfolio</div>
          </div>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-xl px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100"
            >
              {n.label}
            </a>
          ))}
          <a
            href={PROFILE.resumeUrl}
            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
        </nav>

        <a
          href="#projects"
          className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 shadow-sm md:hidden"
        >
          View
        </a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div id="top" className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl"
          >
            {PROFILE.headline}
          </motion.h1>
          <p className="mt-4 text-neutral-700">{PROFILE.about}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Pill>Open to analytics roles</Pill>
            <Pill>Risk and controls</Pill>
            <Pill>Consulting mindset</Pill>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <IconLink href={`mailto:${PROFILE.email}`} Icon={Mail} label="Email" />
            <IconLink href={PROFILE.linkedin} Icon={Linkedin} label="LinkedIn" />
            <IconLink href={PROFILE.github} Icon={Github} label="GitHub" />
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
            <div className="text-sm font-semibold text-neutral-900">What I do</div>
            <div className="mt-4 space-y-3">
              {PROFILE.focusAreas.map((a) => (
                <div key={a.title} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <a.icon className="h-4 w-4" />
                    <div className="text-sm font-semibold text-neutral-900">{a.title}</div>
                  </div>
                  <p className="mt-2 text-sm text-neutral-700">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ children }) {
  return <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">{children}</div>;
}
