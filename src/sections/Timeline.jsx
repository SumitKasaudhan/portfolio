import { motion } from "framer-motion";

const timeline = [
    {
        title: "Front-End Developer Intern",
        company: "Graphura India Pvt Ltd",
        period: "Oct 2025 – Jan 2026",
        desc: "Built responsive React applications, reusable UI components and improved cross-device performance.",
    },
    {
        title: "Web Development Intern",
        company: "ApexPlanet Software",
        period: "2025",
        desc: "Optimized frontend components and delivered responsive client UI projects.",
    },
    {
        title: "MCA (Pursuing)",
        company: "Lovely Professional University",
        period: "2024 – 2026",
        desc: "Advanced computer science & cybersecurity specialization.",
    },
];

const Timeline = () => {
    return (
        <section id="timeline" className="py-24 px-6">

            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold text-center mb-16"
            >
                Experience Timeline
            </motion.h2>

            <div className="max-w-4xl mx-auto relative border-l border-white/20">

                {timeline.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                        className="ml-8 mb-12"
                    >

                        <div className="absolute -left-3 w-6 h-6 bg-blue-500 rounded-full"></div>

                        <h3 className="text-xl font-bold">
                            {item.title}
                        </h3>

                        <p className="text-blue-400">
                            {item.company}
                        </p>

                        <span className="text-gray-500 text-sm">
                            {item.period}
                        </span>

                        <p className="text-gray-400 mt-2">
                            {item.desc}
                        </p>

                    </motion.div>
                ))}

            </div>
        </section>
    );
};

export default Timeline;
