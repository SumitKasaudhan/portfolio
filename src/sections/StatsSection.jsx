import { motion } from "framer-motion";

const stats = [
    { value: "3+", label: "Projects Completed" },
    { value: "1+", label: "Years Experience" },
    { value: "2+", label: "Major Technologies" },
    { value: "5+", label: "Skills Mastered" },
];

const StatsSection = () => {
    return (
        <section className="py-16 md:py-20 bg-[#020617] flex justify-center px-4">

            <div className="
                w-full max-w-6xl
                bg-[#041022]/80 backdrop-blur-md
                rounded-2xl
                border border-cyan-400/10
                shadow-[0_0_80px_rgba(0,255,255,0.08)]
                grid grid-cols-2 lg:grid-cols-4
                gap-8 md:gap-10
                text-center text-white
                px-6 md:px-10 lg:px-12
                py-8 md:py-12
            ">

                {stats.map((s, i) => (
                    <div key={i} className="group">

                        <h3 className="
                            text-4xl md:text-5xl font-bold
                            text-transparent bg-clip-text
                            bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-300
                            drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]
                            group-hover:scale-110 transition
                        ">
                            {s.value}
                        </h3>

                        <p className="mt-3 text-sm tracking-wide text-white/70">
                            {s.label}
                        </p>

                    </div>
                ))}

            </div>
        </section>
    );
};

export default StatsSection;
