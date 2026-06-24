import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";
import profile from "../assets/profile.webp";

const checkIsMobile = () =>
  typeof window !== "undefined" && window.innerWidth <= 480;

const stats = [
  { value: "4+",   label: "Projects Built" },
  { value: "2+",   label: "Internships" },
  { value: "15+",  label: "Technologies" },
  { value: "1K+",  label: "VU Load Tested" },
];

const timeline = [
  {
    year: "2026",
    title: "MCA — LPU",
    desc: "Master of Computer Applications, Lovely Professional University",
    color: "cyan",
  },
  {
    year: "2025",
    title: "Graphura India — Intern",
    desc: "Front-End Developer Intern, built responsive React dashboards & reusable component library",
    color: "cyan",
  },
  {
    year: "2025",
    title: "Infosys Springboard — Intern",
    desc: "Web Developer Intern, delivered UI system using Python + OpenCV + YOLO + Streamlit",
    color: "purple",
  },
];

const AboutV2 = () => {
  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    const onResize = () => setIsMobile(checkIsMobile());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section id="about" className="relative z-30 section-bg py-24 md:py-32 px-6 text-white">

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 md:mb-24"
      >
        <h2 className="heading-glow text-4xl md:text-5xl font-bold">About Me</h2>
        <p className="mt-4 text-gray-400 text-sm md:text-base max-w-xl mx-auto">
          Full-Stack Developer building production-grade apps with modern tech.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-20 items-start">

        {/* ══ LEFT — Image + Stats ══ */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-10"
        >
          {/* Profile image — simple border, no heavy blur */}
          <div className="relative">
            {/* thin ring */}
            <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-purple-500 via-cyan-400 to-purple-600 opacity-60" />
            <div className="relative w-[240px] md:w-[300px] aspect-square rounded-full overflow-hidden border-4 border-black">
              <img src={profile} alt="Sumit Kasaudhan" className="w-full h-full object-cover" />
            </div>
            {/* small badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2
              px-4 py-1 rounded-full text-xs font-semibold
              bg-black border border-purple-400/40 text-purple-300 whitespace-nowrap">
              Front-End Developer
            </div>
          </div>

          {/* TypeAnimation */}
          <p className="text-center text-base md:text-lg text-gray-300">
            I am a{" "}
            <span className="text-cyan-300 font-semibold">
              <TypeAnimation
                sequence={[
                  "Frontend Developer", 2000,
                  "React Enthusiast",   2000,
                  "SaaS Builder",       2000,
                  "UI Enthusiast",      2000,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </span>
          </p>

          {/* Stats grid */}
          <div className="w-full grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="
                  text-center py-5 px-3 rounded-2xl
                  bg-white/[0.03] border border-white/10
                  hover:border-purple-400/30 transition
                "
              >
                <div className="text-2xl md:text-3xl font-black
                  bg-gradient-to-r from-cyan-300 to-purple-400
                  bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-gray-500">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Resume button */}
          <button
            onClick={() => window.open("/resume.pdf", "_blank")}
            className="
              w-full max-w-[280px]
              py-3 rounded-xl
              text-sm font-semibold text-cyan-200
              bg-gradient-to-r from-purple-500/20 to-cyan-400/20
              border border-cyan-300/25
              hover:scale-105 hover:border-cyan-200
              hover:shadow-[0_0_20px_rgba(0,255,255,0.25)]
              transition-all duration-300
            "
          >
            ↓ Download Resume
          </button>
        </motion.div>

        {/* ══ RIGHT — Timeline ══ */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-4"
        >
          {/* Bio */}
          <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-2">
            Frontend-focused Full-Stack Developer passionate about building
            fast, modern, and intuitive web applications. From pixel-perfect
            UIs to production SaaS products — I ship things that work.
          </p>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-8">
            Currently pursuing MCA at LPU. Built <span className="text-cyan-300 font-medium">Sentinel AI</span> —
            a live security SaaS with real scan engines, Gemini AI remediation,
            and 1K+ VU load testing — solo, end-to-end.
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-[2px]
              bg-gradient-to-b from-purple-500 via-cyan-400 to-purple-500 opacity-30" />

            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-5 pl-1"
                >
                  {/* dot */}
                  <div className="flex flex-col items-center shrink-0 mt-1">
                    <div className={`w-[10px] h-[10px] rounded-full mt-1 shrink-0 z-10
                      ${item.color === "cyan"
                        ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                        : "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                      }`}
                    />
                  </div>

                  {/* content */}
                  <div className="flex-1 pb-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded
                        ${item.color === "cyan"
                          ? "text-cyan-300 bg-cyan-400/10 border border-cyan-400/20"
                          : "text-purple-300 bg-purple-400/10 border border-purple-400/20"
                        }`}>
                        {item.year}
                      </span>
                      <h4 className="text-sm md:text-base font-semibold text-white">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission + Approach cards — lightweight */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-400/25 transition">
              <h4 className="text-sm font-semibold text-purple-300 mb-2">My Mission</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Build modern digital experiences that are fast, scalable, and visually engaging.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/25 transition">
              <h4 className="text-sm font-semibold text-cyan-300 mb-2">My Approach</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Combine technical excellence with creative design to deliver polished products.
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutV2;