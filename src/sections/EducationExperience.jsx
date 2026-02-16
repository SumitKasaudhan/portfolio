import { motion } from "framer-motion";

const education = [
    {
        title: "Master of Computer Applications (MCA)(Pursuing)",
        org: "Lovely Professional University",
        year: "2024 – 2026",
        desc: "Advanced computer science & specialization.",
    },

    {
    
        title: "Bachelor of Computer Applications (BCA)",
        org: "Chhatrapati Shahu Ji Maharaj University",
        year: "2021 – 2024",
    },
    {
        title: "Higher Secondary (12th)",
        org: "Delhi Public School, Azaad Nagar, Kanpur",
        year: "2020 – 2021",
    },
];

const experience = [
    {
        title: "Front-End Developer Intern",
        org: "Graphura India Pvt Ltd",
        year: "Oct 2025 – Jan 2026",
        desc: "Built responsive React apps and reusable UI components.",
    },
    {
        title: "Web Development Intern",
        org: "ApexPlanet Software",
        year: "2025",
        desc: "Optimized frontend performance and responsive UI delivery.",
    },
 
];

const EducationExperience = () => {
    return (
        <section id="academics" className="bg-black text-white py-28 px-6">

            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-center mb-16 text-cyan-300 drop-shadow-[0_0_10px_#00f0ff]"
            >
                Education & Experience
            </motion.h2>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14">

                {/* LEFT — EDUCATION CARDS */}
                <div>

                    <h3 className="text-2xl font-semibold mb-8 text-cyan-200">
                        Education
                    </h3>

                    <div className="space-y-6">

                        {education.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15 }}
                                className="bg-white/5 border border-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/10 transition"
                            >
                                <h4 className="font-semibold text-lg">{item.title}</h4>
                                <p className="text-gray-400">{item.org}</p>
                                <span className="text-gray-500 text-sm">{item.year}</span>
                            </motion.div>
                        ))}

                    </div>
                </div>

                {/* RIGHT — EXPERIENCE TIMELINE */}
                <div>

                    <h3 className="text-2xl font-semibold mb-8 text-purple-300">
                        Experience
                    </h3>

                    <div className="relative border-l border-white/20 ml-4">

                        {experience.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="ml-8 mb-10 relative"
                            >
                                {/* dot */}
                                <div className="absolute -left-[38px] w-5 h-5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>

                                <h4 className="font-semibold text-lg">{item.title}</h4>
                                <p className="text-purple-300">{item.org}</p>
                                <span className="text-gray-500 text-sm">{item.year}</span>
                                <p className="text-gray-400 mt-2">{item.desc}</p>
                            </motion.div>
                        ))}

                    </div>
                </div>

            </div>
        </section>
    );
};

export default EducationExperience;
