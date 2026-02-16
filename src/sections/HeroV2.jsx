import HeroParticles from "../components/HeroParticles";

const HeroV2 = () => {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            className="relative isolate min-h-screen flex items-center justify-center text-center overflow-hidden bg-black text-white pt-24"
        >
            {/* particles */}
            <HeroParticles />

            {/* vignette */}
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%)]" />

            {/* content */}
            <div className="relative z-20 px-6">

                <h1 className="text-6xl md:text-7xl font-bold tracking-widest text-cyan-300 drop-shadow-[0_0_18px_#00f0ff]">
                    SUMIT KASAUDHAN
                </h1>

                <p className="mt-4 text-xl text-cyan-200">
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
