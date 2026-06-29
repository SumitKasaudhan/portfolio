import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
    { name: "Home",           id: "home"           },
    { name: "About",          id: "about"          },
    { name: "Projects",       id: "projects"       },
    { name: "Skills",         id: "skills"         },
    { name: "Education",      id: "academics"      },
    { name: "Certifications", id: "certifications" },
    { name: "Contact",        id: "contact"        },
];

const RESPONSIVE_CSS = `
  *, *::before, *::after { box-sizing: border-box; }

  .nav-desktop-links { display: flex; align-items: center; gap: 2px; }
  .nav-desktop-right { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
  .nav-hamburger     { display: none !important; }

  @media (max-width: 1023px) {
    .nav-desktop-links { display: none !important; }
    .nav-desktop-right { display: none !important; }
    .nav-hamburger     { display: flex !important; }
  }

  @media (hover: none) {
    .nav-link-btn    { min-height: 44px; }
    .nav-drawer-link { min-height: 48px !important; }
  }

  .nav-pill-wrapper {
    position: fixed;
    left: 0; right: 0;
    top: 0;
    z-index: 9000;
    pointer-events: none;
    transition: padding 0.45s cubic-bezier(0.22,1,0.36,1),
                top     0.45s cubic-bezier(0.22,1,0.36,1);
  }
  .nav-pill-wrapper.scrolled {
    top: 10px;
    padding: 0 14px;
  }

  .nav-pill {
    pointer-events: auto;
    margin: 0 auto;
    max-width: 1280px;
    /* NO border, NO box-shadow by default — avoids white flash */
    background: rgba(4,4,18,0.55);
    border: 1px solid transparent;
    border-radius: 0px;
    transition:
      max-width      0.45s cubic-bezier(0.22,1,0.36,1),
      border-radius  0.45s cubic-bezier(0.22,1,0.36,1),
      background     0.45s cubic-bezier(0.22,1,0.36,1),
      border-color   0.45s cubic-bezier(0.22,1,0.36,1),
      box-shadow     0.45s cubic-bezier(0.22,1,0.36,1);
    /* clip children so nothing bleeds outside rounded corners */
    overflow: hidden;
  }
  .nav-pill.scrolled {
    max-width: 1200px;
    border-radius: 18px;
    background: rgba(6,6,22,0.92);
    border-color: rgba(255,255,255,0.07);
    box-shadow: 0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(168,85,247,0.06);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
  }

  .nav-bar-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    height: clamp(58px, 8vw, 70px);
    padding: 0 clamp(16px, 4vw, 32px);
    transition: height 0.45s cubic-bezier(0.22,1,0.36,1),
                padding 0.45s cubic-bezier(0.22,1,0.36,1);
  }
  .nav-bar-row.scrolled {
    height: 54px;
    padding: 0 clamp(14px, 3vw, 24px);
  }

  /* bottom edge line — only on non-scrolled state */
  .nav-bottom-line {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: rgba(255,255,255,0.06);
    transition: opacity 0.35s ease;
    pointer-events: none;
  }
  .nav-pill.scrolled .nav-bottom-line { opacity: 0; }

  /* progress bar */
  .nav-progress-track {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    overflow: hidden;
    border-radius: 0 0 18px 18px;
    pointer-events: none;
  }
  .nav-pill:not(.scrolled) .nav-progress-track {
    border-radius: 0;
  }

  /* drawer */
  .nav-drawer {
    padding-bottom: max(20px, env(safe-area-inset-bottom));
    padding-top: max(20px, env(safe-area-inset-top));
  }
  .nav-drawer-links::-webkit-scrollbar { display: none; }
  .nav-drawer-links { -ms-overflow-style: none; scrollbar-width: none; }

  /* logo text */
  .nav-logo-text {
    font-weight: 700;
    font-size: clamp(11px, 1.8vw, 15px);
    color: #22d3ee;
    letter-spacing: 0.06em;
    white-space: nowrap;
    line-height: 1;
    transition: font-size 0.3s ease;
  }

  /* resume pill */
  .nav-resume-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 7px 16px;
    border-radius: 999px;
    font-size: clamp(11px, 1vw, 13px);
    font-weight: 600;
    background: linear-gradient(135deg, #7c3aed, #22d3ee);
    color: #fff;
    text-decoration: none;
    transition: opacity 0.15s, transform 0.15s;
    white-space: nowrap;
  }
  .nav-resume-pill:hover { opacity: 0.82; transform: scale(1.04); }

  /* hamburger */
  .nav-hamburger {
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
`;

export default function NavbarV2() {
    const [open,     setOpen]     = useState(false);
    const [active,   setActive]   = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const [pct,      setPct]      = useState(0);

    const handleScroll = useCallback(() => {
        const y = window.scrollY;
        setScrolled(y > 28);

        const max = document.body.scrollHeight - window.innerHeight;
        setPct(max > 0 ? (y / max) * 100 : 0);

        for (const link of links) {
            const el = document.getElementById(link.id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) { setActive(link.id); break; }
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: "smooth" });
        }
        setOpen(false);
    };

    return (
        <>
            <style>{RESPONSIVE_CSS}</style>

            {/* ── PILL WRAPPER ── */}
            <motion.div
                className={`nav-pill-wrapper${scrolled ? " scrolled" : ""}`}
                initial={{ y: -90, opacity: 0 }}
                animate={{ y: 0,   opacity: 1 }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className={`nav-pill${scrolled ? " scrolled" : ""}`} style={{ position: "relative" }}>

                    {/* bottom hairline — only visible when not pill */}
                    <div className="nav-bottom-line" />

                    {/* scroll progress */}
                    <div className="nav-progress-track">
                        <div style={{
                            height: "100%",
                            width: `${pct}%`,
                            background: "linear-gradient(90deg, #a855f7, #22d3ee)",
                            transition: "width 0.08s linear",
                            borderRadius: "0 2px 2px 0",
                        }} />
                    </div>

                    {/* ── BAR ROW ── */}
                    <div className={`nav-bar-row${scrolled ? " scrolled" : ""}`}>

                        {/* LOGO */}
                        <button
                            onClick={() => scrollTo("home")}
                            style={{
                                display: "flex", alignItems: "center",
                                gap: "clamp(6px, 1.2vw, 10px)",
                                background: "none", border: "none",
                                cursor: "pointer", padding: 0,
                                flexShrink: 0, minHeight: "44px",
                            }}
                        >
                            <img
                                src="/favicon.png"
                                alt="SK"
                                style={{
                                    width: "clamp(20px, 3vw, 26px)",
                                    height: "clamp(20px, 3vw, 26px)",
                                    objectFit: "contain",
                                }}
                            />
                            <span className="nav-logo-text">SUMIT KASAUDHAN</span>
                        </button>

                        {/* DESKTOP LINKS */}
                        <div className="nav-desktop-links">
                            {links.map(l => (
                                <NavLink key={l.id} label={l.name} id={l.id} active={active} onClick={scrollTo} />
                            ))}
                        </div>

                        {/* DESKTOP RIGHT */}
                        <div className="nav-desktop-right">
                            <SocialIcon href="https://github.com/SumitKasaudhan"            Icon={FaGithub}   />
                            <SocialIcon href="https://www.linkedin.com/in/sumit-kasaudhan/" Icon={FaLinkedin} />
                            <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume-pill">
                                Resume ↗
                            </a>
                        </div>

                        {/* HAMBURGER */}
                        <button
                            onClick={() => setOpen(o => !o)}
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                            className="nav-hamburger"
                            style={{
                                background: open ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.06)",
                                border: `1px solid ${open ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.09)"}`,
                                color: open ? "#c4b5fd" : "rgba(255,255,255,0.85)",
                            }}
                        >
                            {open ? <FaTimes size={14} /> : <FaBars size={14} />}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* ── MOBILE DRAWER ── */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            onClick={() => setOpen(false)}
                            style={{
                                position: "fixed", inset: 0, zIndex: 8000,
                                background: "rgba(0,0,0,0.72)",
                                WebkitTapHighlightColor: "transparent",
                            }}
                        />

                        <motion.aside
                            key="drawer"
                            role="dialog"
                            aria-label="Navigation menu"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="nav-drawer"
                            style={{
                                position: "fixed",
                                top: 0, right: 0, bottom: 0,
                                width: "min(300px, 82vw)",
                                zIndex: 8500,
                                background: "linear-gradient(160deg, #08081e 0%, #0c0c1e 100%)",
                                borderLeft: "1px solid rgba(168,85,247,0.18)",
                                display: "flex",
                                flexDirection: "column",
                                padding: "0 18px",
                                overflowY: "auto",
                            }}
                        >
                            {/* drawer header */}
                            <div style={{
                                display: "flex", justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "24px",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <img src="/favicon.png" alt="logo" style={{ width: "18px", height: "18px" }} />
                                    <span style={{
                                        fontSize: "10px",
                                        color: "rgba(255,255,255,0.28)",
                                        letterSpacing: "0.15em",
                                        textTransform: "uppercase",
                                    }}>
                                        Navigation
                                    </span>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.09)",
                                        borderRadius: "8px", color: "rgba(255,255,255,0.8)",
                                        width: "34px", height: "34px",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <FaTimes size={12} />
                                </button>
                            </div>

                            {/* links */}
                            <nav
                                className="nav-drawer-links"
                                style={{ display: "flex", flexDirection: "column", gap: "3px", flex: 1, overflowY: "auto" }}
                            >
                                {links.map((l, i) => (
                                    <motion.button
                                        key={l.id}
                                        className="nav-drawer-link"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                                        onClick={() => scrollTo(l.id)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "12px 14px",
                                            borderRadius: "10px",
                                            background: active === l.id ? "rgba(139,92,246,0.14)" : "transparent",
                                            border: `1px solid ${active === l.id ? "rgba(168,85,247,0.28)" : "transparent"}`,
                                            color: active === l.id ? "#c4b5fd" : "rgba(255,255,255,0.72)",
                                            fontSize: "clamp(13px, 3.5vw, 15px)",
                                            fontWeight: active === l.id ? 600 : 400,
                                            cursor: "pointer",
                                            textAlign: "left",
                                            transition: "background 0.15s, border-color 0.15s, color 0.15s",
                                            width: "100%",
                                        }}
                                    >
                                        {l.name}
                                        {active === l.id && (
                                            <span style={{
                                                width: "6px", height: "6px",
                                                borderRadius: "50%",
                                                background: "#a78bfa",
                                                flexShrink: 0,
                                            }} />
                                        )}
                                    </motion.button>
                                ))}
                            </nav>

                            {/* bottom actions */}
                            <div style={{
                                borderTop: "1px solid rgba(255,255,255,0.07)",
                                paddingTop: "18px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                marginTop: "16px",
                            }}>
                                <a
                                    href="/resume.pdf"
                                    target="_blank" rel="noopener noreferrer"
                                    style={{
                                        display: "flex", alignItems: "center",
                                        justifyContent: "center", gap: "6px",
                                        padding: "13px",
                                        borderRadius: "10px",
                                        background: "linear-gradient(135deg, #7c3aed, #22d3ee)",
                                        color: "#fff",
                                        fontSize: "14px", fontWeight: 600,
                                        textDecoration: "none",
                                        minHeight: "48px",
                                    }}
                                >
                                    Resume ↗
                                </a>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <DrawerSocialBtn href="https://github.com/SumitKasaudhan"            Icon={FaGithub}   label="GitHub"   />
                                    <DrawerSocialBtn href="https://www.linkedin.com/in/sumit-kasaudhan/" Icon={FaLinkedin} label="LinkedIn" />
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

/* ── DESKTOP NAV LINK ── */
function NavLink({ label, id, active, onClick }) {
    const [hovered, setHovered] = useState(false);
    const isActive = active === id;
    return (
        <button
            className="nav-link-btn"
            onClick={() => onClick(id)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                padding: "7px clamp(8px, 1vw, 12px)",
                borderRadius: "8px",
                background: isActive
                    ? "rgba(139,92,246,0.1)"
                    : hovered ? "rgba(255,255,255,0.05)" : "transparent",
                border: "none",
                color: isActive ? "#22d3ee" : hovered ? "#22d3ee" : "rgba(255,255,255,0.68)",
                fontSize: "clamp(11.5px, 1vw, 13px)",
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
            }}
        >
            {label}
            {isActive && (
                <span style={{
                    position: "absolute", bottom: "3px", left: "50%",
                    transform: "translateX(-50%)",
                    width: "4px", height: "4px", borderRadius: "50%",
                    background: "#22d3ee",
                }} />
            )}
        </button>
    );
}

/* ── DESKTOP SOCIAL ICON ── */
function SocialIcon({ href, Icon }) {
    return (
        <a
            href={href}
            target="_blank" rel="noopener noreferrer"
            style={{
                color: "rgba(255,255,255,0.48)",
                display: "flex", alignItems: "center",
                textDecoration: "none",
                padding: "6px", borderRadius: "6px",
                transition: "color 0.15s, background 0.15s",
                minWidth: "32px", minHeight: "32px",
                justifyContent: "center",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#22d3ee"; e.currentTarget.style.background = "rgba(34,211,238,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.48)"; e.currentTarget.style.background = "transparent"; }}
        >
            <Icon size={16} />
        </a>
    );
}

/* ── DRAWER SOCIAL BUTTON ── */
function DrawerSocialBtn({ href, Icon, label }) {
    return (
        <a
            href={href}
            target="_blank" rel="noopener noreferrer"
            style={{
                flex: 1,
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "7px",
                padding: "11px 10px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.68)",
                textDecoration: "none",
                fontSize: "13px", minHeight: "44px",
                transition: "background 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
        >
            <Icon size={14} /> {label}
        </a>
    );
}