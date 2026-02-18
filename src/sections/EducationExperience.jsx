import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

/* ================= DATA ================= */

const education = [
    {
        title: "Master of Computer Applications (MCA)",
        org: "Lovely Professional University",
        year: "2024 – 2026 (Pursuing)",
        desc: "Currently pursuing MCA with focus on advanced software development, scalable systems, and modern web technologies.",
    },
    {
        title: "Bachelor of Computer Applications (BCA)",
        org: "Chhatrapati Shahu Ji Maharaj University",
        year: "2021 – 2024",
        desc: "Built strong foundation in computer science, programming, and full-stack development.",
    },
    {
        title: "Higher Secondary (12th)",
        org: "Delhi Public School, Kanpur",
        year: "2020 – 2021",
        desc: "Focused on mathematics and computing fundamentals.",
    },
];

const experience = [
    {
        title: "Front-End Developer Intern",
        org: "Graphura India Pvt Ltd",
        year: "Oct 2025 – Jan 2026",
        desc: "Developed responsive React interfaces, reusable components, and improved UI consistency across dashboards.",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Tailwind",
            "Framer Motion",
            "UI Design",
        ],
    },
    {
        title: "Web Development Intern",
        org: "ApexPlanet Software",
        year: "2025",
        desc: "Optimized frontend performance and delivered production-ready UI systems.",
        skills: [
            "Responsive UI",
            "Optimization",
            "React",
            "API Integration",
            "Debugging",
        ],
    },
];

/* ================= TIMELINE ITEM ================= */

const TimelineItem = ({ item, index }) => {
    const isLeft = index % 2 === 0;

    const card = (
        <Tilt scale={1.02} tiltMaxAngleX={5} tiltMaxAngleY={5}>
            <div className="
                relative p-7 md:p-8 rounded-2xl
                bg-[rgba(10,10,25,0.72)]
                border border-purple-500/20
                backdrop-blur-xl
                shadow-[0_0_60px_rgba(139,92,246,0.18)]
            ">

                <div className="absolute inset-0 rounded-2xl
                    bg-gradient-to-r
                    from-purple-500/5 via-transparent to-cyan-400/5
                    blur-[70px] pointer-events-none" />

                <h3 className="text-lg md:text-xl font-semibold text-white">
                    {item.title}
                </h3>
                <p className="text-purple-300 mt-1">{item.org}</p>
                <p className="text-gray-500 text-sm mt-1">{item.year}</p>
                <p className="text-gray-300 mt-3 leading-relaxed">
                    {item.desc}
                </p>

                {/* KEY SKILLS */}
                {item.skills && (
                    <div className="mt-6">
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                            Key Skills
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="
                                        px-3 py-1 text-xs rounded-md
                                        bg-purple-500/10
                                        border border-purple-400/20
                                        text-purple-200
                                        hover:bg-purple-500/20
                                        transition
                                        shadow-[0_0_10px_rgba(139,92,246,0.25)]
                                    "
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Tilt>
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            viewport={{ once: true }}
            className="relative flex mb-14 md:mb-16 w-full"
        >
            <div className={`w-1/2 pr-8 ${isLeft ? "block" : "invisible"}`}>
                {isLeft && card}
            </div>

            <div className="relative w-0">
                <div className="absolute left-1/2 -translate-x-1/2 top-4
                    w-7 h-7 rounded-full
                    bg-gradient-to-r from-purple-500 to-cyan-400
                    shadow-[0_0_28px_rgba(168,85,247,0.9)]" />
            </div>

            <div className={`w-1/2 pl-8 ${!isLeft ? "block" : "invisible"}`}>
                {!isLeft && card}
            </div>
        </motion.div>
    );
};

/* ================= TIMELINE SECTION ================= */
const TimelineSection = ({ title, data }) => {
    return (
        <section className="relative py-20 md:py-24">

            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="
                    text-4xl md:text-5xl
                    font-bold
                    text-center
                    mb-14 md:mb-20
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-cyan-300
                    via-cyan-400
                    to-teal-300
                    drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]
                "
            >
                {title}
            </motion.h2>

            <div className="relative max-w-5xl mx-auto px-6">

                <div className="absolute left-1/2 top-0 bottom-0 w-[2px]
                    bg-gradient-to-b
                    from-purple-500 via-cyan-400 to-purple-500
                    opacity-70" />

                {data.map((item, i) => (
                    <TimelineItem key={i} item={item} index={i} />
                ))}
            </div>
        </section>
    );
};


/* ================= MAIN EXPORT ================= */

const EducationExperience = () => {
    return (
        <section id="academics" className="bg-black text-white">

            <TimelineSection title="Education" data={education} />
            <TimelineSection title="Experience" data={experience} />

        </section>
    );
};

export default EducationExperience;
