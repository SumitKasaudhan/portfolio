import Tilt from "react-parallax-tilt";

import {
    FaReact,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaGitAlt,
    FaPython,
    FaCode,
} from "react-icons/fa";

import {
    SiTailwindcss,
    SiMongodb,
    SiPostman,
    SiTypescript,
    SiGithub,
    SiNextdotjs,
    SiFigma,
    SiVercel,
    SiNetlify,
} from "react-icons/si";

/* ================= DATA ================= */

const skillGroups = [
    {
        title: "Frontend",
        icon: <FaReact />,
        skills: [
            { name: "HTML", icon: <FaHtml5 /> },
            { name: "CSS", icon: <FaCss3Alt /> },
            { name: "JavaScript", icon: <FaJs /> },
            { name: "React", icon: <FaReact /> },
            { name: "Tailwind", icon: <SiTailwindcss /> },
            { name: "Next.js", icon: <SiNextdotjs /> },
        ],
    },
    {
        title: "Backend",
        icon: <FaNodeJs />,
        skills: [
            { name: "Node.js", icon: <FaNodeJs /> },
            { name: "MongoDB", icon: <SiMongodb /> },
            { name: "Postman", icon: <SiPostman /> },
            { name: "Git", icon: <FaGitAlt /> },
        ],
    },
    {
        title: "Languages",
        icon: <FaPython />,
        skills: [
            { name: "C", icon: <FaCode /> },
            { name: "C++", icon: <FaCode /> },
            { name: "Python", icon: <FaPython /> },
            { name: "JavaScript", icon: <FaJs /> },
            { name: "TypeScript", icon: <SiTypescript /> },
        ],
    },
    {
        title: "Tools",
        icon: <FaCode />,
        skills: [
            { name: "Git", icon: <FaGitAlt /> },
            { name: "GitHub", icon: <SiGithub /> },
            { name: "VS Code", icon: <FaCode /> },
            { name: "Postman", icon: <SiPostman /> },
            { name: "Figma", icon: <SiFigma /> },
            { name: "Vercel", icon: <SiVercel /> },
            { name: "Netlify", icon: <SiNetlify /> },
            { name: "Compass", icon: <FaCode /> },
        ],
    },
];

/* ================= COMPONENT ================= */

const Skills = () => {
    return (
        <section id="skills" className="section-bg py-20 md:py-28 text-white">

            {/* header */}
            <div className="text-center mb-14 md:mb-20 px-6">
                <h2 className="heading-glow text-4xl md:text-5xl text-center">
                    Skills
                </h2>


                <p className="text-gray-400 mt-4 md:mt-6 max-w-2xl mx-auto text-sm md:text-base">
                    Technologies I use to design, build, and scale modern applications.
                </p>
            </div>

            {/* grid */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 px-4 md:px-6">

                {skillGroups.map((group, i) => (
                    <Tilt
                        key={i}
                        glareEnable={false}
                        scale={1.02}
                        tiltMaxAngleX={6}
                        tiltMaxAngleY={6}
                        transitionSpeed={2000}
                        className="rounded-[28px]"
                    >
                        <div className="
                            relative rounded-[28px]
                            p-6 md:p-10
                            bg-[rgba(10,10,25,0.65)]
                            border border-purple-500/20
                            backdrop-blur-xl
                            shadow-[0_0_80px_rgba(139,92,246,0.15)]
                        ">

                            {/* glow */}
                            <div className="absolute inset-0 rounded-[28px]
                                bg-gradient-to-r
                                from-purple-500/5 via-transparent to-cyan-400/5
                                blur-[80px] pointer-events-none" />

                            {/* header */}
                            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">

                                <div className="
                                    w-10 h-10 md:w-14 md:h-14
                                    flex items-center justify-center
                                    rounded-xl
                                    text-lg md:text-2xl
                                    bg-purple-500/10
                                    border border-purple-400/20
                                    shadow-[0_0_20px_rgba(139,92,246,0.25)]
                                ">
                                    {group.icon}
                                </div>

                                <h3 className="text-xl md:text-3xl font-semibold text-purple-300 tracking-wide">
                                    {group.title}
                                </h3>

                            </div>

                            {/* chips grid */}
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">

                                {group.skills.map((skill, idx) => (
                                    <div
                                        key={idx}
                                        className="
                                            flex items-center gap-2 md:gap-3
                                            px-4 md:px-5
                                            py-3 md:py-4
                                            min-w-[120px]
                                            rounded-lg md:rounded-xl
                                            bg-white/5
                                            border border-white/10
                                            hover:border-purple-400/30
                                            hover:bg-white/10
                                            transition
                                            shadow-[0_0_12px_rgba(139,92,246,0.08)]
                                        "
                                    >
                                        <span className="text-sm md:text-lg text-purple-300">
                                            {skill.icon}
                                        </span>

                                        <span className="text-xs md:text-sm text-gray-300 font-medium">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </Tilt>
                ))}

            </div>
        </section>
    );
};

export default Skills;
