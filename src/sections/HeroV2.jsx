import { lazy, Suspense, useCallback } from "react";

const HeroParticles = lazy(() => import("../components/HeroParticles"));

const HeroV2 = () => {
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="home"
      className="
        relative isolate
        min-h-screen
        flex items-center justify-center
        overflow-hidden
        bg-black text-white
        pt-24
      "
    >
      {/* Particle Background */}
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      {/* Gradient Overlay */}
      <div
        className="
          absolute inset-0 z-10
          bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,0.65)_75%)]
        "
      />

      {/* Hero Content */}
      <div
        className="
          relative z-20
          px-6
          max-w-6xl
          mx-auto
          text-center
        "
      >
        {/* ── Open to Work Badge ── */}
        <div className="flex justify-center mb-6">
          <span className="
            inline-flex items-center gap-2
            px-4 py-1.5
            rounded-full
            text-xs sm:text-sm font-medium
            text-emerald-300
            bg-emerald-500/10
            border border-emerald-400/30
            backdrop-blur-sm
            shadow-[0_0_16px_rgba(52,211,153,0.15)]
          ">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Open to Work
          </span>
        </div>

        {/* Heading */}
        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            xl:text-7xl
            font-black
            tracking-[0.08em]
            leading-tight
            bg-gradient-to-r
            from-cyan-300
            via-cyan-200
            to-cyan-400
            text-transparent
            bg-clip-text
            drop-shadow-[0_0_18px_rgba(34,211,238,0.28)]
          "
        >
          SUMIT KASAUDHAN
        </h1>

        {/* Subtitle */}
        <p
          className="
            mt-6
            text-sm
            sm:text-base
            md:text-lg
            text-gray-300
            tracking-wide
            opacity-90
            max-w-2xl
            mx-auto
          "
        >
          Front-End Developer • React Enthusiast • UI/UX Aficionado
        </p>

        {/* CTA Buttons */}
        <div
          className="
            flex
            flex-wrap
            justify-center
            gap-5
            mt-10
          "
        >
          {/* Projects Button */}
          <button
            onClick={() => scrollToSection("projects")}
            className="
              group
              px-8 py-3
              rounded-full
              bg-gradient-to-r
              from-purple-600
              to-cyan-400
              shadow-[0_0_25px_rgba(168,85,247,0.55)]
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_35px_rgba(34,211,238,0.65)]
              active:scale-95
            "
          >
            <span className="relative z-10 font-medium">My Projects</span>
          </button>

          {/* Contact Button */}
          <button
            onClick={() => scrollToSection("contact")}
            className="
              px-8 py-3
              rounded-full
              border border-white/20
              bg-white/5
              backdrop-blur-sm
              transition-all
              duration-300
              hover:bg-white/10
              hover:border-cyan-300/40
              hover:scale-105
              active:scale-95
            "
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroV2;