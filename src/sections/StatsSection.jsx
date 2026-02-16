import { motion } from "framer-motion";

const stats = [
    { value: "3+", label: "Projects Completed" },
    { value: "1+", label: "Years Experience" },
    { value: "2+", label: "Major Technologies" },
    { value: "5+", label: "Skills Mastered" },
];

const StatsSection = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-purple-700/90 via-indigo-700/90 to-purple-700/90">

            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-white">

                {stats.map((s, i) => (
                    <div key={i}>

                        <h3 className="text-5xl font-bold text-cyan-300">
                            {s.value}
                        </h3>

                        <p className="mt-3 text-sm tracking-wide text-white/80">
                            {s.label}
                        </p>

                    </div>
                ))}

            </div>

        </section>
    );
};

export default StatsSection;
