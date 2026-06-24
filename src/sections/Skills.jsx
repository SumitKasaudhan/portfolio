import { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";

import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs,
    FaGitAlt, FaPython, FaCode, FaCloud,
} from "react-icons/fa";

import {
    SiTailwindcss, SiMongodb, SiPostman, SiTypescript,
    SiGithub, SiNextdotjs, SiFigma, SiVercel, SiNetlify,
    SiSupabase, SiFramer, SiExpress, SiClerk,
    SiGooglegemini, SiPrisma, SiRedux, SiRender,
} from "react-icons/si";

/* ================= DATA ================= */

const skillGroups = [
    {
        title: "Frontend",
        icon: <FaReact />,
        skills: [
            { name: "HTML",          icon: <FaHtml5 /> },
            { name: "CSS",           icon: <FaCss3Alt /> },
            { name: "JavaScript",    icon: <FaJs /> },
            { name: "React",         icon: <FaReact /> },
            { name: "Tailwind",      icon: <SiTailwindcss /> },
            { name: "Next.js",       icon: <SiNextdotjs /> },
            { name: "Framer Motion", icon: <SiFramer /> },
            { name: "Redux",         icon: <SiRedux /> },
        ],
    },
    {
        title: "Backend",
        icon: <FaNodeJs />,
        skills: [
            { name: "Node.js",    icon: <FaNodeJs /> },
            { name: "Express.js", icon: <SiExpress /> },
            { name: "TypeScript", icon: <SiTypescript /> },
            { name: "MongoDB",    icon: <SiMongodb /> },
            { name: "Supabase",   icon: <SiSupabase /> },
            { name: "Prisma",     icon: <SiPrisma /> },
        ],
    },
    {
        title: "Cloud & Auth",
        icon: <FaCloud />,
        skills: [
            { name: "Clerk Auth",   icon: <SiClerk /> },
            { name: "Vercel",       icon: <SiVercel /> },
            { name: "Render",       icon: <SiRender /> },
            { name: "k6 Load Test", icon: <FaCode /> },
            { name: "Dodo Pay",     icon: <FaCode /> },
            { name: "VirusTotal",   icon: <FaCode /> },
        ],
    },
    {
        title: "AI & APIs",
        icon: <SiGooglegemini />,
        skills: [
            { name: "Gemini AI", icon: <SiGooglegemini /> },
            { name: "REST APIs", icon: <FaCode /> },
            { name: "OAuth 2.0", icon: <FaCode /> },
        ],
    },
    {
        title: "Languages",
        icon: <FaPython />,
        skills: [
            { name: "JavaScript", icon: <FaJs /> },
            { name: "TypeScript", icon: <SiTypescript /> },
            { name: "Python",     icon: <FaPython /> },
            { name: "C++",        icon: <FaCode /> },
            { name: "C",          icon: <FaCode /> },
        ],
    },
    {
        title: "Tools",
        icon: <FaCode />,
        skills: [
            { name: "Git",     icon: <FaGitAlt /> },
            { name: "GitHub",  icon: <SiGithub /> },
            { name: "VS Code", icon: <FaCode /> },
            { name: "Postman", icon: <SiPostman /> },
            { name: "Figma",   icon: <SiFigma /> },
            { name: "Netlify", icon: <SiNetlify /> },
        ],
    },
];

const checkIsMobile = () =>
    typeof window !== "undefined" && window.innerWidth <= 480;

/* ================= COMPONENT ================= */

const Skills = () => {
    const [isMobile, setIsMobile] = useState(checkIsMobile);

    useEffect(() => {
        const onResize = () => setIsMobile(checkIsMobile());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <section id="skills" className="py-16 md:py-24 text-white bg-black">

            {/* header */}
            <div className="text-center mb-12 md:mb-16 px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                    Skills
                </h2>
                <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
                    Technologies I use to design, build, and scale modern applications.
                </p>
            </div>

            {/* grid */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 md:gap-6 px-4 md:px-6">
                {skillGroups.map((group, i) => {

                    const CardInner = (
                        <div className="
                            rounded-2xl p-5 md:p-7
                            bg-[rgba(12,12,28,0.85)]
                            border border-purple-500/15
                            hover:border-purple-400/30
                            transition-colors duration-200
                        ">
                            {/* header */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="
                                    w-9 h-9 md:w-11 md:h-11
                                    flex items-center justify-center
                                    rounded-xl text-base md:text-xl
                                    bg-purple-500/10 border border-purple-400/20
                                    text-purple-300
                                ">
                                    {group.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-semibold text-purple-300">
                                    {group.title}
                                </h3>
                            </div>

                            {/* chips */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                                {group.skills.map((skill, idx) => (
                                    <div
                                        key={idx}
                                        className="
                                            flex items-center gap-2
                                            px-3 py-2.5
                                            rounded-lg
                                            bg-white/[0.04] border border-white/[0.08]
                                            hover:border-purple-400/25 hover:bg-white/[0.07]
                                            transition-colors duration-150
                                        "
                                    >
                                        <span className="text-sm text-purple-300 shrink-0">
                                            {skill.icon}
                                        </span>
                                        <span className="text-xs text-gray-300 font-medium truncate">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );

                    return isMobile ? (
                        <div key={i}>{CardInner}</div>
                    ) : (
                        <Tilt
                            key={i}
                            glareEnable={false}
                            scale={1.015}
                            tiltMaxAngleX={4}
                            tiltMaxAngleY={4}
                            transitionSpeed={2500}
                            className="rounded-2xl"
                        >
                            {CardInner}
                        </Tilt>
                    );
                })}
            </div>
        </section>
    );
};

export default Skills;