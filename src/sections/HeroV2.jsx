import { lazy, Suspense, useCallback, useState } from "react";

const HeroParticles = lazy(() => import("../components/HeroParticles"));

const HeroV2 = () => {
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const [hoverProjects, setHoverProjects] = useState(false);
  const [hoverContact,  setHoverContact]  = useState(false);

  return (
    <section
      id="home"
      className="
        relative isolate
        min-h-[100svh]
        flex items-center justify-center
        overflow-hidden
        bg-[#06040f] text-white
        pt-20 pb-10
        px-4
      "
    >
      {/* Particle Background */}
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.60) 80%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto text-center flex flex-col items-center gap-5 sm:gap-6">

        {/* ── Open to Work Badge ── */}
        <span
          className="
            inline-flex items-center gap-2
            px-3 py-1 sm:px-4 sm:py-1.5
            rounded-full
            text-[11px] sm:text-xs md:text-sm font-medium
            text-emerald-300
            bg-emerald-500/10
            border border-emerald-400/30
            backdrop-blur-sm
            shadow-[0_0_14px_rgba(52,211,153,0.15)]
            select-none cursor-default
            transition-all duration-300
            hover:bg-emerald-500/15
            hover:border-emerald-400/50
          "
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Open to Work
        </span>

        {/* Heading */}
        <h1
          className="
            font-black
            tracking-[0.04em] sm:tracking-[0.06em]
            leading-none
            bg-gradient-to-r from-cyan-300 via-cyan-200 to-cyan-400
            text-transparent bg-clip-text
            select-none cursor-default
            drop-shadow-[0_0_18px_rgba(34,211,238,0.28)]
            hover:drop-shadow-[0_0_32px_rgba(34,211,238,0.55)]
            transition-all duration-500
            text-[clamp(1.6rem,6.5vw,3.8rem)]
          "
        >
          SUMIT KASAUDHAN
        </h1>

        {/* Subtitle */}
        <p
          className="
            text-[clamp(0.78rem,2.5vw,1.1rem)]
            text-gray-300
            tracking-wide
            opacity-85
            max-w-[90%] sm:max-w-xl md:max-w-2xl
            mx-auto
            leading-relaxed
            cursor-default select-none
          "
        >
          Front-End Developer&nbsp;&bull;&nbsp;React Enthusiast&nbsp;&bull;&nbsp;UI/UX Aficionado
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-2 sm:mt-4 w-full">

          {/* Projects */}
          <button
            onClick={() => scrollToSection("projects")}
            onMouseEnter={() => setHoverProjects(true)}
            onMouseLeave={() => setHoverProjects(false)}
            aria-label="View my projects"
            className="
              group
              px-6 py-2.5 sm:px-8 sm:py-3
              rounded-full
              bg-gradient-to-r from-purple-600 to-cyan-400
              font-medium
              text-sm sm:text-base
              transition-all duration-300
              hover:scale-105 active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black
            "
            style={{
              boxShadow: hoverProjects
                ? "0 0 36px rgba(34,211,238,0.65), 0 0 72px rgba(168,85,247,0.30)"
                : "0 0 22px rgba(168,85,247,0.50)",
            }}
          >
            <span className="transition-all duration-300 group-hover:tracking-wider">
              My Projects
            </span>
          </button>

          {/* Contact */}
          <button
            onClick={() => scrollToSection("contact")}
            onMouseEnter={() => setHoverContact(true)}
            onMouseLeave={() => setHoverContact(false)}
            aria-label="Contact me"
            className="
              px-6 py-2.5 sm:px-8 sm:py-3
              rounded-full
              border border-white/20
              bg-white/5
              backdrop-blur-sm
              font-medium
              text-sm sm:text-base
              transition-all duration-300
              hover:bg-white/10
              hover:border-cyan-300/40
              hover:scale-105 active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black
            "
            style={{
              boxShadow: hoverContact
                ? "0 0 20px rgba(34,211,238,0.28), inset 0 0 16px rgba(34,211,238,0.05)"
                : "none",
              color: hoverContact ? "#67e8f9" : "#fff",
            }}
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroV2;