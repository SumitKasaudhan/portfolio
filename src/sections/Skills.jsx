// Skills.jsx — heading color matched to Contact + simple lightweight animation

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const skillGroups = [
    {
        title: "Frontend",
        icon: <FaReact />,
        accent: "cyan",
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
        accent: "purple",
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
        accent: "cyan",
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
        accent: "purple",
        skills: [
            { name: "Gemini AI", icon: <SiGooglegemini /> },
            { name: "REST APIs", icon: <FaCode /> },
            { name: "OAuth 2.0", icon: <FaCode /> },
        ],
    },
    {
        title: "Languages",
        icon: <FaPython />,
        accent: "cyan",
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
        accent: "purple",
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
    typeof window !== "undefined" && window.innerWidth <= 768;

/* ── Animated Heading — lightweight fade + slide, same color as Contact ── */
const SectionHeading = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="
                text-4xl md:text-5xl
                font-bold text-center
                text-transparent bg-clip-text
                bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-300
            "
        >
            Skills &amp; Technologies
        </motion.h2>
    );
};

/* ── Flip Card ── */
const FlipCard = ({ group, index, isMobile }) => {
    const [flipped, setFlipped] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const isCyan = group.accent === "cyan";

    const frontAccent = isCyan
        ? {
            border: "rgba(0,211,243,0.2)",
            bgClass: "bg-cyan-400/[0.08]",
            borderClass: "border-cyan-400/20",
            textClass: "text-cyan-300",
            glow: "rgba(0,211,243,0.12)",
            lineBg: "bg-cyan-400/20",
        }
        : {
            border: "rgba(168,85,247,0.2)",
            bgClass: "bg-purple-500/[0.08]",
            borderClass: "border-purple-400/20",
            textClass: "text-purple-300",
            glow: "rgba(168,85,247,0.12)",
            lineBg: "bg-purple-400/20",
        };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                duration: 0.55,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="h-[220px] cursor-pointer"
            style={{ perspective: "1000px" }}
            onMouseEnter={() => !isMobile && setFlipped(true)}
            onMouseLeave={() => !isMobile && setFlipped(false)}
            onClick={() => isMobile && setFlipped(f => !f)}
        >
            <div
                style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    position: "relative",
                    width: "100%",
                    height: "100%",
                }}
            >
                {/* ── FRONT ── */}
                <div
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        position: "absolute",
                        inset: 0,
                        borderRadius: "1rem",
                        padding: "24px 28px",
                        background: "rgba(8,8,20,0.92)",
                        border: `1px solid ${frontAccent.border}`,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: 0, right: 0,
                            width: "120px", height: "120px",
                            borderRadius: "50%",
                            background: `radial-gradient(circle, ${frontAccent.glow} 0%, transparent 70%)`,
                            transform: "translate(35%, -35%)",
                            pointerEvents: "none",
                        }}
                    />

                    <div className={`w-12 h-12 flex items-center justify-center
                        rounded-xl text-xl
                        ${frontAccent.bgClass} border ${frontAccent.borderClass}
                        ${frontAccent.textClass}`}>
                        {group.icon}
                    </div>

                    <div>
                        <h3 className={`text-xl font-bold ${frontAccent.textClass} mb-1`}>
                            {group.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                            {group.skills.length} technologies
                        </p>
                    </div>

                    <div style={{
                        position: "absolute",
                        bottom: "16px", right: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                    }}>
                        <span className="text-[10px] tracking-widest uppercase text-gray-700">
                            {isMobile ? "tap" : "hover"}
                        </span>
                        <div className={`w-4 h-[1px] ${frontAccent.lineBg}`} />
                    </div>
                </div>

                {/* ── BACK ── */}
                <div
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        position: "absolute",
                        inset: 0,
                        borderRadius: "1rem",
                        padding: "20px 24px",
                        overflow: "hidden",
                        background: "rgba(6,6,18,0.97)",
                        border: `1px solid ${frontAccent.border}`,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                        <span className={`text-xs font-bold tracking-[2px] uppercase ${frontAccent.textClass}`}>
                            {group.title}
                        </span>
                        <div className={`flex-1 h-[1px] ${frontAccent.lineBg}`} />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {group.skills.map((skill, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 px-2.5 py-2 rounded-lg
                                    bg-white/[0.04] border border-white/[0.07]
                                    hover:border-white/[0.15] hover:bg-white/[0.07]
                                    transition-colors duration-150"
                            >
                                <span className={`text-sm shrink-0 ${frontAccent.textClass}`}>
                                    {skill.icon}
                                </span>
                                <span className="text-[11px] text-gray-300 font-medium truncate">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ── Main Component ── */
const Skills = () => {
    const [isMobile, setIsMobile] = useState(checkIsMobile);

    useEffect(() => {
        const onResize = () => setIsMobile(checkIsMobile());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <section id="skills" className="py-20 md:py-28 text-white bg-black relative overflow-hidden">

            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[400px] rounded-full opacity-[0.04] blur-[80px]"
                    style={{ background: "linear-gradient(to right, #00d3f3, #a855f7)" }}
                />
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-14 md:mb-20 px-6"
            >
                {/* Pill */}
                <div className="inline-flex items-center gap-2 mb-5
                    px-4 py-1.5 rounded-full
                    border border-purple-400/20 bg-purple-400/[0.06]">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-[11px] tracking-[2.5px] uppercase text-purple-400/80 font-semibold">
                        Tech Stack
                    </span>
                </div>

                <SectionHeading />

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base"
                >
                    Technologies I use to design, build, and scale modern applications.
                    {isMobile && (
                        <span className="block mt-1 text-xs text-gray-600">
                            Tap any card to explore
                        </span>
                    )}
                </motion.p>
            </motion.div>

            {/* Cards */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 md:gap-6 px-4 md:px-6">
                {skillGroups.map((group, i) => (
                    <FlipCard key={i} group={group} index={i} isMobile={isMobile} />
                ))}
            </div>

            {!isMobile && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center text-[11px] tracking-[2px] uppercase text-gray-700 mt-10"
                >
                    Hover cards to explore skills
                </motion.p>
            )}
        </section>
    );
};

export default Skills;