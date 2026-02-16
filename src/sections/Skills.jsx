import { FaReact, FaNodeJs, FaDatabase, FaCode } from "react-icons/fa";

const skillCards = [
    {
        icon: <FaReact />,
        title: "Frontend",
        items: ["React", "Tailwind", "JavaScript", "Responsive UI"],
    },
    {
        icon: <FaNodeJs />,
        title: "Backend",
        items: ["Node.js", "Express", "REST APIs", "Authentication"],
    },
    {
        icon: <FaDatabase />,
        title: "Database",
        items: ["MongoDB", "Mongoose", "Data Modeling"],
    },
    {
        icon: <FaCode />,
        title: "Tools",
        items: ["Git", "Postman", "Vercel", "Deployment"],
    },
];

const Skills = () => {
    return (
        <section id="skills" className="bg-black text-white py-24">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center mb-16 text-cyan-300 drop-shadow-[0_0_10px_#00f0ff]">
                    My Skills
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {skillCards.map((card, i) => (
                        <div
                            key={i}
                            className="group bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 hover:border-cyan-400/40 transition relative overflow-hidden"
                        >
                            {/* glow hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />

                            {/* icon */}
                            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 text-2xl mb-6 shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                                {card.icon}
                            </div>

                            <h3 className="text-xl font-semibold mb-4 text-cyan-200">
                                {card.title}
                            </h3>

                            <ul className="space-y-2 text-gray-300">
                                {card.items.map((item, idx) => (
                                    <li key={idx}>✓ {item}</li>
                                ))}
                            </ul>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Skills;
