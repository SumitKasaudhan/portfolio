import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const GitHubIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
);

const ProjectModal = ({ project, close }) => {

    useEffect(() => {
        if (!project) return;
        const esc = (e) => { if (e.key === "Escape") close(); };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", esc);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", esc);
        };
    }, [project, close]);

    return (
        <AnimatePresence>
            {project && (
                /* ── BACKDROP — always center on every device ── */
                <motion.div
                    key="modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    onClick={close}
                    aria-modal="true"
                    role="dialog"
                    aria-label={project.title}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px",
                        background: "rgba(0,0,0,0.82)",
                        touchAction: "manipulation",
                        overscrollBehavior: "none",
                    }}
                >
                    {/* ── MODAL BOX ── */}
                    <motion.div
                        key="modal-box"
                        initial={{ scale: 0.94, opacity: 0, y: 16 }}
                        animate={{ scale: 1,    opacity: 1, y: 0  }}
                        exit={{   scale: 0.96,  opacity: 0, y: 8  }}
                        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: "relative",
                            width: "100%",
                            maxWidth: "680px",
                            maxHeight: "calc(100dvh - 32px)",
                            display: "flex",
                            flexDirection: "column",
                            background: "#0d0d20",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "20px",
                            overflow: "hidden",
                            boxShadow: "0 0 0 1px rgba(139,92,246,0.18), 0 32px 64px rgba(0,0,0,0.75)",
                        }}
                    >
                        {/* top gradient accent line */}
                        <div style={{
                            position: "absolute", top: 0, left: 0, right: 0,
                            height: "1px",
                            background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.7), rgba(34,211,238,0.5), transparent)",
                            zIndex: 10,
                        }} />

                        {/* ── CLOSE BUTTON ── */}
                        <button
                            onClick={close}
                            aria-label="Close modal"
                            style={{
                                position: "absolute", top: "12px", right: "12px",
                                zIndex: 20,
                                width: "32px", height: "32px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.07)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                color: "#9ca3af",
                                cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "13px",
                                transition: "background 0.15s, color 0.15s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#9ca3af"; }}
                        >
                            ✕
                        </button>

                        {/* ── IMAGE ZONE — fixed height, scrollable for tall screenshots ── */}
                        <div style={{
                            position: "relative",
                            flexShrink: 0,
                            height: "clamp(160px, 28vw, 260px)",
                            overflowY: "auto",
                            overflowX: "hidden",
                            background: "#000",
                            WebkitOverflowScrolling: "touch",
                        }}>
                            <img
                                src={project.image}
                                alt={project.title}
                                style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }}
                                loading="eager"
                            />
                            {/* fade bottom */}
                            <div style={{
                                position: "absolute", bottom: 0, left: 0, right: 0,
                                height: "80px",
                                background: "linear-gradient(to top, #0d0d20, transparent)",
                                pointerEvents: "none",
                            }} />
                        </div>

                        {/* ── SCROLLABLE CONTENT ── */}
                        <div style={{
                            flex: 1,
                            overflowY: "auto",
                            WebkitOverflowScrolling: "touch",
                            padding: "clamp(16px, 4vw, 32px)",
                            paddingTop: "20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}>
                            {/* title */}
                            <h2 style={{
                                margin: 0,
                                fontSize: "clamp(17px, 3.5vw, 22px)",
                                fontWeight: 700,
                                color: "#fff",
                                lineHeight: 1.3,
                                paddingRight: "32px",
                            }}>
                                {project.title}
                            </h2>

                            {/* description */}
                            <p style={{
                                margin: 0,
                                fontSize: "clamp(13px, 2.2vw, 15px)",
                                color: "#d1d5db",
                                lineHeight: 1.7,
                            }}>
                                {project.desc}
                            </p>

                            {/* tech tags */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {project.tech.map((tech, i) => (
                                    <span key={i} style={{
                                        padding: "4px 12px",
                                        fontSize: "11px",
                                        fontWeight: 500,
                                        borderRadius: "6px",
                                        background: "rgba(139,92,246,0.12)",
                                        border: "1px solid rgba(139,92,246,0.25)",
                                        color: "#c4b5fd",
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* divider */}
                            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

                            {/* action buttons */}
                            <div style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                paddingBottom: "4px",
                            }}>
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: "8px",
                                            padding: "10px 20px",
                                            borderRadius: "10px",
                                            fontSize: "13px", fontWeight: 600,
                                            background: "rgba(88,28,220,0.18)",
                                            border: "1px solid rgba(139,92,246,0.35)",
                                            color: "#c4b5fd",
                                            textDecoration: "none",
                                            transition: "background 0.15s, border-color 0.15s",
                                            whiteSpace: "nowrap",
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,92,246,0.28)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(88,28,220,0.18)"; }}
                                    >
                                        <GitHubIcon /> View Code
                                    </a>
                                )}

                                {project.status === "coming" || !project.live ? (
                                    <span style={{
                                        display: "inline-flex", alignItems: "center", gap: "6px",
                                        padding: "10px 20px",
                                        borderRadius: "10px",
                                        fontSize: "13px",
                                        background: "rgba(234,179,8,0.08)",
                                        border: "1px solid rgba(234,179,8,0.22)",
                                        color: "rgba(253,224,71,0.75)",
                                        whiteSpace: "nowrap",
                                    }}>
                                        ⏳ Coming Soon
                                    </span>
                                ) : (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: "6px",
                                            padding: "10px 20px",
                                            borderRadius: "10px",
                                            fontSize: "13px", fontWeight: 600,
                                            background: "rgba(34,211,238,0.1)",
                                            border: "1px solid rgba(34,211,238,0.28)",
                                            color: "#67e8f9",
                                            textDecoration: "none",
                                            transition: "background 0.15s, border-color 0.15s",
                                            whiteSpace: "nowrap",
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(34,211,238,0.2)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(34,211,238,0.1)"; }}
                                    >
                                        ↗ Live Demo
                                    </a>
                                )}

                                <button
                                    onClick={close}
                                    style={{
                                        display: "inline-flex", alignItems: "center",
                                        padding: "10px 20px",
                                        borderRadius: "10px",
                                        fontSize: "13px",
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "#9ca3af",
                                        cursor: "pointer",
                                        transition: "background 0.15s",
                                        whiteSpace: "nowrap",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;