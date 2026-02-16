import { motion } from "framer-motion";
import {
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaCss3Alt,
    FaJs,
    FaHtml5,
} from "react-icons/fa";

const skills = [
    { name: "React", icon: <FaReact /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "JavaScript", icon: <FaJs /> },
    { name: "HTML5", icon: <FaHtml5 /> },
    { name: "CSS3", icon: <FaCss3Alt /> },
    { name: "Git", icon: <FaGitAlt /> },
];

const SkillsLab = () => {
    return (
        <section id="skills" className="py-24 px-6">

            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold text-center mb-16"
            >
                Skills Lab
            </motion.h2>

            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">

                {skills.map((skill, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-10 text-center hover:bg-white/10 transition cursor-pointer"
                    >
                        <div className="text-4xl mb-4 text-blue-400">
                            {skill.icon}
                        </div>
                        <p className="text-lg">{skill.name}</p>
                    </motion.div>
                ))}

            </div>
        </section>
    );
};

export default SkillsLab;
