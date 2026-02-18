import HeroParticles from "../components/HeroParticles";

const HeroV2 = () => {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            className="
                relative isolate 
                min-h-[calc(100vh-96px)] md:min-h-[85vh] sm:min-h-[75vh]
                flex items-center justify-center 
                text-center overflow-hidden 
                bg-black text-white pt-24
            "
        >
            {/* particles */}
            <HeroParticles />

            {/* vignette */}
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%)]" />

            {/* content */}
            <div className="relative z-20 px-6">

                <h1 className="
  text-4xl sm:text-5xl md:text-6xl lg:text-7xl
  font-extrabold
  tracking-[0.08em]
  bg-gradient-to-r from-cyan-300 via-cyan-200 to-cyan-400
  text-transparent bg-clip-text
  drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]
  leading-tight
">
                    SUMIT KASAUDHAN
                </h1>


                <p className="
  mt-6
  text-sm sm:text-base md:text-lg
  text-gray-300
  tracking-wide
  opacity-90
">
                    Front-End Developer | React Enthusiast | UI/UX Aficionado
                </p>



                <div className="flex gap-6 justify-center mt-10 flex-wrap">

                    <button
                        onClick={() => scrollTo("projects")}
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-105 transition"
                    >
                        My Projects
                    </button>

                    <button
                        onClick={() => scrollTo("contact")}
                        className="px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition"
                    >
                        Contact Me
                    </button>

                </div>
            </div>
        </section>
    );
};

export default HeroV2;
