import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
    { name: "Home",      id: "home" },
    { name: "About",     id: "about" },
    { name: "Projects",  id: "projects" },
    { name: "Skills",    id: "skills" },
    { name: "Education", id: "academics" },
    { name: "Contact",   id: "contact" },
];

/* ─────────────────────────────────────────────
   Responsive breakpoints are handled via a
   <style> tag — avoids the "inline style beats
   Tailwind hidden class" bug entirely.
───────────────────────────────────────────── */
const RESPONSIVE_CSS = `
  .nav-desktop-links   { display: flex; align-items: center; gap: 4px; }
  .nav-desktop-right   { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
  .nav-hamburger       { display: none; }

  @media (max-width: 1023px) {
    .nav-desktop-links  { display: none !important; }
    .nav-desktop-right  { display: none !important; }
    .nav-hamburger      { display: flex !important; }
  }

  /* Ensure tap targets are ≥ 44px on touch devices */
  @media (hover: none) {
    .nav-link-btn { min-height: 44px; }
    .nav-drawer-link { min-height: 48px !important; }
  }

  /* Safe-area inset for notched devices */
  .nav-drawer {
    padding-bottom: max(20px, env(safe-area-inset-bottom));
    padding-top: max(24px, env(safe-area-inset-top));
  }

  /* Scrollbar hidden in drawer on mobile */
  .nav-drawer-links::-webkit-scrollbar { display: none; }
  .nav-drawer-links { -ms-overflow-style: none; scrollbar-width: none; }
`;

const NavbarV2 = () => {
    const [open,     setOpen]     = useState(false);
    const [active,   setActive]   = useState("home");
    const [scrolled, setScrolled] = useState(false);

    /* ── active section tracker ── */
    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 20);
        for (const link of links) {
            const el = document.getElementById(link.id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
                setActive(link.id);
                break;
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    /* close drawer on resize → desktop */
    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    /* lock body scroll when drawer open */
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 72; // navbar height
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
        setOpen(false);
    };

    return (
        <>
            {/* inject responsive CSS once */}
            <style>{RESPONSIVE_CSS}</style>

            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0,   opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0,
                    zIndex: 9000,
                    background: scrolled ? "rgba(4,4,12,0.95)" : "rgba(4,4,12,0.6)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.55)" : "none",
                    transition: "background 0.3s, box-shadow 0.3s",
                }}
            >
                {/* ── scroll progress bar ── */}
                <ScrollProgress />

                <div style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "0 clamp(14px, 4vw, 32px)",
                    height: "clamp(56px, 8vw, 68px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                }}>

                    {/* ── LOGO ── */}
                    <button
                        onClick={() => scrollTo("home")}
                        style={{
                            display: "flex", alignItems: "center",
                            gap: "clamp(6px, 1.5vw, 10px)",
                            background: "none", border: "none",
                            cursor: "pointer", padding: 0,
                            flexShrink: 0,
                            minHeight: "44px",          /* touch target */
                        }}
                    >
                        <img
                            src="/favicon.png"
                            alt="SK logo"
                            style={{
                                width: "clamp(22px, 3.5vw, 28px)",
                                height: "clamp(22px, 3.5vw, 28px)",
                                objectFit: "contain",
                            }}
                        />
                        <span style={{
                            fontWeight: 700,
                            fontSize: "clamp(12px, 2.2vw, 17px)",
                            color: "#22d3ee",
                            letterSpacing: "0.05em",
                            whiteSpace: "nowrap",
                            lineHeight: 1,
                        }}>
                            SUMIT KASAUDHAN
                        </span>
                    </button>

                    {/* ── DESKTOP LINKS ── */}
                    <div className="nav-desktop-links">
                        {links.map(l => (
                            <NavLink key={l.id} label={l.name} id={l.id} active={active} onClick={scrollTo} />
                        ))}
                    </div>

                    {/* ── DESKTOP RIGHT (socials + resume) ── */}
                    <div className="nav-desktop-right">
                        <SocialIcon href="https://github.com/SumitKasaudhan"           Icon={FaGithub}   />
                        <SocialIcon href="https://www.linkedin.com/in/sumit-kasaudhan/" Icon={FaLinkedin} />

                        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)" }} />

                        <a
                            href="/resume.pdf"
                            target="_blank" rel="noopener noreferrer"
                            style={resumePillStyle}
                            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.04)"; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "scale(1)"; }}
                        >
                            Resume ↗
                        </a>
                    </div>

                    {/* ── HAMBURGER (mobile/tablet only) ── */}
                    <button
                        onClick={() => setOpen(o => !o)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        className="nav-hamburger"
                        style={{
                            background: open ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.06)",
                            border: `1px solid ${open ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.1)"}`,
                            borderRadius: "10px",
                            color: open ? "#c4b5fd" : "#fff",
                            width: "40px", height: "40px",
                            alignItems: "center", justifyContent: "center",
                            cursor: "pointer",
                            transition: "background 0.15s, border-color 0.15s, color 0.15s",
                            flexShrink: 0,
                        }}
                    >
                        {open ? <FaTimes size={15} /> : <FaBars size={15} />}
                    </button>
                </div>
            </motion.nav>

            {/* ── MOBILE DRAWER ── */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setOpen(false)}
                            style={{
                                position: "fixed", inset: 0, zIndex: 8000,
                                background: "rgba(0,0,0,0.65)",
                                WebkitTapHighlightColor: "transparent",
                            }}
                        />

                        {/* drawer panel */}
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
                                background: "linear-gradient(160deg, #09091f 0%, #0d0d1f 100%)",
                                borderLeft: "1px solid rgba(168,85,247,0.2)",
                                display: "flex",
                                flexDirection: "column",
                                paddingLeft: "20px",
                                paddingRight: "20px",
                                overflowY: "auto",
                            }}
                        >
                            {/* drawer header */}
                            <div style={{
                                display: "flex", justifyContent: "space-between",
                                alignItems: "center", marginBottom: "28px",
                                paddingTop: "4px",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <img src="/favicon.png" alt="logo" style={{ width: "20px", height: "20px" }} />
                                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                                        Navigation
                                    </span>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "8px", color: "#fff",
                                        width: "34px", height: "34px",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <FaTimes size={13} />
                                </button>
                            </div>

                            {/* nav links */}
                            <nav
                                className="nav-drawer-links"
                                style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflowY: "auto" }}
                            >
                                {links.map((l, i) => (
                                    <motion.button
                                        key={l.id}
                                        className="nav-drawer-link"
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }}
                                        onClick={() => scrollTo(l.id)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "13px 14px",
                                            borderRadius: "10px",
                                            background: active === l.id ? "rgba(139,92,246,0.15)" : "transparent",
                                            border: `1px solid ${active === l.id ? "rgba(168,85,247,0.3)" : "transparent"}`,
                                            color: active === l.id ? "#c4b5fd" : "rgba(255,255,255,0.75)",
                                            fontSize: "clamp(14px, 4vw, 15px)",
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
                                                borderRadius: "50%", background: "#a78bfa",
                                                flexShrink: 0,
                                            }} />
                                        )}
                                    </motion.button>
                                ))}
                            </nav>

                            {/* drawer bottom actions */}
                            <div style={{
                                borderTop: "1px solid rgba(255,255,255,0.08)",
                                paddingTop: "20px",
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
                                        padding: "12px",
                                        borderRadius: "10px",
                                        background: "linear-gradient(135deg, #7c3aed, #22d3ee)",
                                        color: "#fff",
                                        fontSize: "14px", fontWeight: 600,
                                        textDecoration: "none",
                                        minHeight: "44px",
                                    }}
                                >
                                    Resume ↗
                                </a>

                                <div style={{ display: "flex", gap: "10px" }}>
                                    <DrawerSocialBtn
                                        href="https://github.com/SumitKasaudhan"
                                        Icon={FaGithub}
                                        label="GitHub"
                                    />
                                    <DrawerSocialBtn
                                        href="https://www.linkedin.com/in/sumit-kasaudhan/"
                                        Icon={FaLinkedin}
                                        label="LinkedIn"
                                    />
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

/* ── DESKTOP NAV LINK ── */
const NavLink = ({ label, id, active, onClick }) => {
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
                padding: "8px clamp(10px, 1.5vw, 14px)",
                borderRadius: "8px",
                background: isActive ? "rgba(139,92,246,0.1)" : hovered ? "rgba(255,255,255,0.05)" : "transparent",
                border: "none",
                color: isActive ? "#22d3ee" : hovered ? "#22d3ee" : "rgba(255,255,255,0.75)",
                fontSize: "clamp(13px, 1.2vw, 14px)",
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
                whiteSpace: "nowrap",
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
};

/* ── DESKTOP SOCIAL ICON ── */
const SocialIcon = ({ href, Icon }) => (
    <a
        href={href}
        target="_blank" rel="noopener noreferrer"
        style={{
            color: "rgba(255,255,255,0.55)",
            display: "flex", alignItems: "center",
            textDecoration: "none",
            padding: "6px",
            borderRadius: "6px",
            transition: "color 0.15s, background 0.15s",
            minWidth: "32px", minHeight: "32px",
            justifyContent: "center",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "#22d3ee"; e.currentTarget.style.background = "rgba(34,211,238,0.08)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "transparent"; }}
    >
        <Icon size={17} />
    </a>
);

/* ── DRAWER SOCIAL BUTTON ── */
const DrawerSocialBtn = ({ href, Icon, label }) => (
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
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            fontSize: "13px",
            minHeight: "44px",
            transition: "background 0.15s, border-color 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
    >
        <Icon size={14} /> {label}
    </a>
);

/* ── SCROLL PROGRESS BAR ── */
const ScrollProgress = () => {
    const [pct, setPct] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const max = document.body.scrollHeight - window.innerHeight;
            setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "2px", background: "rgba(255,255,255,0.04)",
            pointerEvents: "none",
        }}>
            <div style={{
                height: "100%",
                width: `${pct}%`,
                background: "linear-gradient(90deg, #a855f7, #22d3ee)",
                transition: "width 0.08s linear",
                borderRadius: "0 2px 2px 0",
            }} />
        </div>
    );
};

const resumePillStyle = {
    display: "inline-flex", alignItems: "center", gap: "5px",
    padding: "8px 18px",
    borderRadius: "999px",
    fontSize: "clamp(12px, 1.1vw, 13px)", fontWeight: 600,
    background: "linear-gradient(135deg, #7c3aed, #22d3ee)",
    color: "#fff",
    textDecoration: "none",
    transition: "opacity 0.15s, transform 0.15s",
    whiteSpace: "nowrap",
};

export default NavbarV2;