import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import profile from "../assets/profile.webp";

// ── Lightweight reveal variants — reused across the section ──
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerParent = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// ── Real metrics pulled from resume — no filler numbers ──
const stats = [
  { value: "4+",  label: "Projects Built" },
  { value: "2+",  label: "Internships" },
  { value: "15+", label: "Technologies" },
  { value: "35+", label: "Endpoints Load Tested" },
];

const experience = [
  {
    range: "Oct 2025 – Jan 2026",
    title: "Frontend Developer Intern",
    org: "Graphura India Pvt. Ltd.",
    detail: "20+ reusable React components · cut UI defects 35% · API latency −30%",
    color: "cyan",
  },
  {
    range: "Feb 2026 – April 2026",
    title: "Software Developer Intern",
    org: "Infosys Springboard",
    detail: "Real-time OpenCV + TensorFlow pipeline · inference latency −25%",
    color: "purple",
  },
  {
    range: "2024 – 2026",
    title: "MCA — Dissertation: Sentinel AI",
    org: "Lovely Professional University",
    detail: "Live, production-deployed EASM SaaS as postgrad thesis project",
    color: "pink",
  },
];

// Core stack — pulled straight from resume's technical skills section
const stack = [
  "React.js", "Next.js 15", "TypeScript", "Node.js",
  "PostgreSQL", "DSA & System Design", "REST APIs", "AES-256 / JWT",
];

const AboutV2 = () => {
  return (
    <section
      id="about"
      className="relative z-30 section-bg py-20 md:py-24 lg:py-28 px-6 text-white overflow-hidden"
    >
      {/* Local keyframes — pure CSS, GPU-composited, zero JS animation cost */}
      <style>{`
        @keyframes badgeSpin { to { transform: rotate(360deg); } }
        @keyframes scanline  { 0% { transform: translateY(-100%); opacity:0; }
                                 10% { opacity:1; } 90% { opacity:1; }
                                 100% { transform: translateY(100%); opacity:0; } }
      `}</style>

      {/* Ambient corner glow — static, no animation cost */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #7b2fbe 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #00e5ff 0%, transparent 70%)" }}
      />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 md:mb-16"
      >
        <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase text-cyan-300/70 mb-4">
          <span className="h-px w-6 bg-cyan-400/50" />
          Profile
          <span className="h-px w-6 bg-cyan-400/50" />
        </span>
        <h2 className="heading-glow text-4xl md:text-5xl font-bold">About Me</h2>
        <p className="mt-4 text-gray-400 text-sm md:text-base max-w-xl mx-auto">
          Full-Stack Developer &amp; MCA Graduate Fresher — shipping production
          systems, not tutorials.
        </p>
      </motion.div>

      {/* ── Stagger container — each direct child reveals in sequence ── */}
      <motion.div
        variants={staggerParent(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[320px_1fr] gap-10 md:gap-14 lg:gap-20 items-start"
      >

        {/* ══ LEFT — Access-badge portrait ══ */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-8 md:sticky md:top-28">

          {/* Badge frame — HUD corner brackets + CSS scanline, no JS loop */}
          <div className="relative w-[190px] h-[190px] sm:w-[220px] sm:h-[220px] lg:w-[260px] lg:h-[260px]">
            {/* rotating ring — pure CSS animation */}
            <div
              className="absolute -inset-[3px] rounded-2xl will-change-transform"
              style={{
                background: "conic-gradient(from 0deg, #00e5ff, #7b2fbe, #ff2d78, #00e5ff)",
                animation: "badgeSpin 14s linear infinite",
              }}
            />
            <div className="absolute inset-[3px] rounded-2xl bg-black" />

            {/* photo */}
            <div className="absolute inset-[6px] rounded-2xl overflow-hidden border border-white/10">
              <img
                src={profile}
                alt="Sumit Kasaudhan"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* scanline sweep */}
              <div
                className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-cyan-300/15 to-transparent"
                style={{ animation: "scanline 4s ease-in-out infinite" }}
              />
            </div>

            {/* corner brackets — HUD styling, ties to security/SaaS theme */}
            {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2",
              "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"]
              .map((pos, i) => (
                <span
                  key={i}
                  className={`absolute ${pos} w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 border-cyan-300/70 rounded-[2px]`}
                />
            ))}
          </div>

          {/* ID plate */}
          <div className="text-center">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-1">
              Clearance · Full-Stack
            </p>
            <p className="text-sm text-gray-300">
              I am a{" "}
              <span className="text-cyan-300 font-semibold">
                <TypeAnimation
                  sequence={[
                    "Full-Stack Developer", 2000,
                    "SaaS Builder",         2000,
                    "AI Product Builder",   2000,
                    "MCA Graduate Fresher", 2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </p>
          </div>

          {/* Resume button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative w-full max-w-[240px] overflow-hidden text-center
              py-3 rounded-xl
              text-sm font-semibold text-cyan-100
              bg-gradient-to-r from-purple-500/15 to-cyan-400/15
              border border-cyan-300/25
              hover:border-cyan-200/60
              hover:shadow-[0_0_24px_rgba(0,229,255,0.22)]
              transition-colors duration-300
            "
          >
            <span className="relative z-10">↓ Download Resume</span>
            <span
              className="
                absolute inset-0 -translate-x-full group-hover:translate-x-full
                transition-transform duration-700 ease-out
                bg-gradient-to-r from-transparent via-white/10 to-transparent
              "
            />
          </a>
        </motion.div>

        {/* ══ RIGHT — Manifest ══ */}
        <motion.div variants={staggerParent(0.12)} className="flex flex-col gap-8">

          {/* Bio */}
          <motion.div variants={fadeUp}>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              MCA graduate and fresher with hands-on experience building
              complete products end to end: architecture, authentication,
              payments, AI features and deployment. I designed and built{" "}
              <span className="text-cyan-300 font-semibold">Sentinel AI</span>,
              a live B2B cybersecurity SaaS with paying subscribers, billing
              webhooks, a Clerk-secured API and a Gemini-powered remediation
              engine, load-tested with k6 across 35+ endpoints. I have also
              completed two internships: React and TypeScript at Graphura, and
              a real-time object detection platform for visually impaired users
              at Infosys Springboard (Python, OpenCV, TensorFlow). I work
              across Next.js, Node.js, PostgreSQL and Python, backed by strong
              fundamentals in DSA, OOP, DBMS and networks. Available
              immediately for full-time roles in full-stack, security-focused
              or AI-driven product engineering.
            </p>
          </motion.div>

          {/* Stats — each card reveals with a small stagger */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="
                  group relative text-center py-4 px-2 rounded-xl
                  bg-white/[0.03] border border-white/10
                  hover:border-cyan-300/30
                  transition-colors duration-300
                "
              >
                <div className="text-xl md:text-2xl font-black
                  bg-gradient-to-r from-cyan-300 to-purple-400
                  bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-1 text-[10px] md:text-[11px] text-gray-500 leading-tight">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Experience — log-entry style, each row reveals in sequence */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-gray-500">
              Log — Experience
            </p>
            <div className="flex flex-col gap-2">
              {experience.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="
                    group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4
                    py-3 px-4 rounded-lg
                    border-l-2 border-white/10
                    hover:bg-white/[0.02]
                    transition-colors duration-300
                  "
                  style={{
                    borderLeftColor:
                      item.color === "cyan" ? "rgba(34,211,238,0.4)"
                      : item.color === "purple" ? "rgba(168,85,247,0.4)"
                      : "rgba(244,63,148,0.4)",
                  }}
                >
                  <span className="font-mono text-[11px] text-gray-500 shrink-0 sm:w-[140px]">
                    {item.range}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-white">{item.title}</span>
                    <span className="text-sm text-gray-500"> — {item.org}</span>
                    <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stack chips — light, single reveal (not per-chip, keeps it snappy) */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-gray-500">
              Core Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech, i) => (
                <span
                  key={i}
                  className="
                    px-3 py-1.5 rounded-full text-xs text-gray-300
                    bg-white/[0.04] border border-white/10
                    hover:border-cyan-300/30 hover:text-cyan-200
                    transition-colors duration-200
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutV2;