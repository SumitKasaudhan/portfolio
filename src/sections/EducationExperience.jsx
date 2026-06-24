import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/* ================= DATA ================= */

const education = [
    {
        title: "Master of Computer Applications (MCA)",
        org: "Lovely Professional University",
        year: "2024 – 2026 (Pursuing)",
        badge: "Currently Enrolled",
        desc: "Specializing in scalable system design, advanced algorithms, and modern full-stack development. Actively building production-grade projects alongside coursework.",
        highlights: ["System Design", "Advanced DSA", "Cloud Architecture", "Research Methods"],
    },
    {
        title: "Bachelor of Computer Applications (BCA)",
        org: "Chhatrapati Shahu Ji Maharaj University",
        year: "2021 – 2024",
        badge: "Completed",
        desc: "Graduated with strong foundation in data structures, OOP, and full-stack development. Completed 3+ capstone projects spanning web and mobile platforms.",
        highlights: ["Full-Stack Dev", "DBMS", "OOP & DSA", "Project Work"],
    },
    {
        title: "Senior Secondary — PCM",
        org: "Delhi Public School, Azaad Nagar, Kanpur",
        year: "2020 – 2021",
        badge: "PCM Stream",
        desc: "Physics, Chemistry & Mathematics — built strong analytical thinking and problem-solving foundation that drives technical work today.",
        highlights: ["Mathematics", "Physics", "Logical Reasoning"],
    },
];

const experience = [
    {
        title: "Front-End Developer Intern",
        org: "Graphura India Pvt Ltd",
        year: "Oct 2025 – Jan 2026",
        type: "Internship",
        bullets: [
            "Built 10+ reusable React components (modals, tables, form wizards) that reduced feature delivery time by ~30% across 3 dashboards.",
            "Improved UI consistency by implementing a shared Tailwind design system — cut visual inconsistencies by ~40%.",
            "Delivered responsive, cross-browser layouts with Framer Motion animations, reducing bounce rate on key landing pages.",
        ],
        skills: ["React", "Tailwind CSS", "Framer Motion", "JavaScript", "UI Design"],
    },
    {
        title: "Web Developer Intern",
        org: "Infosys Springboard",
        year: "Nov 2025 – Jan 2026",
        type: "Internship",
        bullets: [
            "Optimized Streamlit + OpenCV pipeline for real-time object detection (YOLO), achieving ~25% faster inference on edge-like hardware.",
            "Integrated REST APIs and debugged frontend data flows, cutting reported UI defects by 35% before final delivery.",
            "Contributed production-ready Python modules (NumPy, gTTS) to a live accessibility tool used by 200+ test users.",
        ],
        skills: ["React", "Python", "OpenCV", "YOLO", "Streamlit", "NumPy", "API Integration"],
    },
];

/* ================= CARD ================= */

const Card = ({ item, isExperience }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                padding: "20px 22px",
                borderRadius: "14px",
                background: "rgba(8,8,20,0.82)",
                border: `1px solid ${hovered ? "rgba(168,85,247,0.4)" : "rgba(168,85,247,0.18)"}`,
                boxShadow: hovered ? "0 0 32px rgba(139,92,246,0.14)" : "none",
                transition: "border-color 0.25s, box-shadow 0.25s",
            }}
        >
            {/* top accent */}
            <div style={{
                position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)",
            }} />

            {/* title + badge */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", marginBottom: "4px" }}>
                <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "#fff", lineHeight: 1.35 }}>
                    {item.title}
                </h3>
                {(item.badge || item.type) && (
                    <span style={{
                        flexShrink: 0,
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        fontWeight: 500,
                        padding: "3px 10px",
                        borderRadius: "999px",
                        background: "rgba(139,92,246,0.14)",
                        border: "1px solid rgba(168,85,247,0.3)",
                        color: "#c4b5fd",
                        whiteSpace: "nowrap",
                    }}>
                        {item.badge || item.type}
                    </span>
                )}
            </div>

            <p style={{ margin: 0, fontSize: "13px", fontWeight: 500, color: "#22d3ee" }}>{item.org}</p>
            <p style={{ margin: "2px 0 12px", fontSize: "12px", color: "#6b7280" }}>{item.year}</p>

            {/* experience bullets */}
            {isExperience && item.bullets && (
                <ul style={{ margin: "0 0 12px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {item.bullets.map((b, i) => (
                        <li key={i} style={{ display: "flex", gap: "10px", fontSize: "13px", color: "#d1d5db", lineHeight: 1.6 }}>
                            <span style={{ marginTop: "8px", width: "5px", height: "5px", borderRadius: "50%", background: "#a78bfa", flexShrink: 0 }} />
                            {b}
                        </li>
                    ))}
                </ul>
            )}

            {/* education desc */}
            {!isExperience && (
                <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#9ca3af", lineHeight: 1.7 }}>{item.desc}</p>
            )}

            {/* tags */}
            {(item.skills || item.highlights) && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {(item.skills || item.highlights).map((tag, i) => (
                        <span key={i} style={{
                            padding: "3px 10px",
                            fontSize: "11px",
                            borderRadius: "6px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#9ca3af",
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

/* ================= DOT ================= */

const Dot = () => (
    <div style={{
        width: "13px", height: "13px", borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg, #a855f7, #22d3ee)",
        boxShadow: "0 0 12px rgba(168,85,247,0.8)",
        outline: "3px solid #000",
    }} />
);

/* ================= MOBILE ITEM ================= */

const MobileItem = ({ item, index, isExperience }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.07 }}
        viewport={{ once: true }}
        style={{ display: "flex", gap: "14px", marginBottom: "20px" }}
    >
        {/* left: dot + line */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px", flexShrink: 0 }}>
            <Dot />
            <div style={{ width: "1px", flex: 1, minHeight: "20px", background: "rgba(168,85,247,0.2)", marginTop: "6px" }} />
        </div>
        {/* card */}
        <div style={{ flex: 1, paddingBottom: "4px" }}>
            <Card item={item} isExperience={isExperience} />
        </div>
    </motion.div>
);

/* ================= DESKTOP ITEM ================= */

const DesktopItem = ({ item, index, isExperience }) => {
    const isLeft = index % 2 === 0;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "flex-start", position: "relative", marginBottom: "40px" }}
        >
            {/* left slot */}
            <div style={{ width: "50%", paddingRight: "40px", visibility: isLeft ? "visible" : "hidden" }}>
                {isLeft && <Card item={item} isExperience={isExperience} />}
            </div>

            {/* center dot — absolutely positioned on the line */}
            <div style={{
                position: "absolute", left: "50%", top: "18px",
                transform: "translateX(-50%)",
                zIndex: 2,
            }}>
                <Dot />
            </div>

            {/* right slot */}
            <div style={{ width: "50%", paddingLeft: "40px", visibility: !isLeft ? "visible" : "hidden" }}>
                {!isLeft && <Card item={item} isExperience={isExperience} />}
            </div>
        </motion.div>
    );
};

/* ================= TIMELINE SECTION ================= */

const TimelineSection = ({ title, data, isExperience, isMobile }) => (
    <section style={{ padding: "56px 0" }}>
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                textAlign: "center",
                marginBottom: "40px",
                fontSize: isMobile ? "36px" : "48px",
                fontWeight: 700,
                background: "linear-gradient(90deg, #67e8f9, #22d3ee, #5eead4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            }}
        >
            {title}
        </motion.h2>

        <div style={{
            position: "relative",
            maxWidth: isMobile ? "100%" : "860px",
            margin: "0 auto",
            padding: isMobile ? "0 16px" : "0 24px",
        }}>
            {/* vertical center line — desktop only */}
            {!isMobile && (
                <div style={{
                    position: "absolute",
                    left: "50%", top: 0, bottom: 0,
                    width: "1px",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(to bottom, transparent, rgba(168,85,247,0.45) 10%, rgba(168,85,247,0.45) 90%, transparent)",
                }} />
            )}

            {data.map((item, i) =>
                isMobile
                    ? <MobileItem key={i} item={item} index={i} isExperience={isExperience} />
                    : <DesktopItem key={i} item={item} index={i} isExperience={isExperience} />
            )}
        </div>
    </section>
);

/* ================= MAIN EXPORT ================= */

const EducationExperience = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <section id="academics" style={{ background: "#000", color: "#fff" }}>
            <TimelineSection title="Education"  data={education}  isExperience={false} isMobile={isMobile} />
            <TimelineSection title="Experience" data={experience} isExperience={true}  isMobile={isMobile} />
        </section>
    );
};

export default EducationExperience;