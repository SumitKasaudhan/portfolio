import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";

const Footer = () => {
    const canvasRef = useRef(null);
    const [hovered, setHovered] = useState(null);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const navLinks = ["home", "about", "projects", "skills", "Certifications", "contact"];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animId;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const particles = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.1 + 0.3,
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.2,
            o: Math.random() * 0.3 + 0.08,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0,211,243,${p.o})`;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 85) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0,211,243,${0.05 * (1 - dist / 85)})`;
                        ctx.lineWidth = 0.4;
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    const socials = [
        { href: "https://github.com/SumitKasaudhan", icon: <FaGithub />, label: "GitHub", sub: "SumitKasaudhan", external: true },
        { href: "https://www.linkedin.com/in/sumit-kasaudhan/", icon: <FaLinkedin />, label: "LinkedIn", sub: "sumit-kasaudhan", external: true },
        { href: "mailto:sumit979gupta@gmail.com", icon: <FaEnvelope />, label: "Email", sub: "sumit979gupta@gmail.com", external: false },
    ];

    return (
        <footer className="relative mt-24 overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 bg-[#02020e]" />

            {/* Grid */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,211,243,1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(0,211,243,1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Glows */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-cyan-400/[0.05] blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-[280px] h-[380px] bg-violet-600/[0.05] blur-[80px] rounded-full pointer-events-none" />

            {/* Particles */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            {/* Top edge */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-cyan-400/50 blur-sm" />

            {/* Content */}
            <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-0">

                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.2fr] gap-14 pb-14">

                    {/* BRAND */}
                    <div className="space-y-6">
                        <div>
                            <h2
                                className="text-[26px] font-black tracking-[5px] uppercase relative inline-block"
                                style={{
                                    background: "linear-gradient(90deg, #fff 0%, #00d3f3 40%, #fff 60%, rgba(255,255,255,0.4) 100%)",
                                    backgroundSize: "200% auto",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    animation: "shimmer 4s linear infinite",
                                }}
                            >
                                Sumit Kasaudhan
                            </h2>
                            <div className="flex items-center gap-3 mt-2">
                                <div className="h-[1px] w-10 bg-gradient-to-r from-cyan-400 to-transparent" />
                                <p className="text-[10px] tracking-[3.5px] text-cyan-400/70 uppercase font-semibold">
                                    Full Stack Developer
                                </p>
                            </div>
                        </div>

                        {/* Description — visible */}
                        <p className="text-[13.5px] leading-[1.9] text-slate-400 max-w-[270px]">
                            Building scalable web apps and AI-powered products using modern technologies.
                        </p>

                        {/* Open to hire */}
                        <div className="group inline-flex items-center gap-2.5 cursor-default
                            border border-emerald-400/25 rounded-full px-4 py-[9px]
                            bg-gradient-to-r from-emerald-500/[0.1] to-cyan-500/[0.05]
                            hover:border-emerald-400/50 transition-all duration-300
                            shadow-[0_0_20px_rgba(52,211,153,0.06)]
                            hover:shadow-[0_0_28px_rgba(52,211,153,0.14)]">
                            <span className="relative flex h-[7px] w-[7px]">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-emerald-500" />
                            </span>
                            <span className="text-[11px] text-emerald-400 tracking-[2px] uppercase font-semibold">Open to hire</span>
                        </div>

                        {/* Resume card */}
                        <div className="w-fit min-w-[220px]" style={{ perspective: "600px" }}>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center justify-between gap-6 w-full overflow-hidden rounded-xl px-5 py-4
                                    border border-white/[0.1] bg-gradient-to-br from-white/[0.05] to-white/[0.02]
                                    hover:border-cyan-400/30 hover:from-cyan-400/[0.08] hover:to-violet-500/[0.04]
                                    shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                                    hover:shadow-[0_0_28px_rgba(0,211,243,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]
                                    transition-all duration-400 cursor-pointer"
                                onMouseEnter={e => { e.currentTarget.style.transform = "rotateX(6deg) scale(1.02)"; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = "rotateX(0deg) scale(1)"; }}
                                style={{ transition: "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease" }}
                            >
                                <div className="relative">
                                    <p className="text-[11px] font-bold text-white/80 tracking-[2.5px] uppercase">Resume</p>
                                    <p className="text-[11px] text-slate-500 mt-0.5 tracking-wide">View · Download PDF</p>
                                </div>
                                <HiOutlineDocumentDownload className="relative text-slate-500 group-hover:text-cyan-400 text-[22px]
                                    transition-all duration-300 flex-shrink-0
                                    group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_8px_#00d3f3]" />
                            </a>
                        </div>
                    </div>

                    {/* NAVIGATION */}
                    <div>
                        <h3 className="text-[9px] font-bold tracking-[3.5px] uppercase text-slate-500 mb-7 flex items-center gap-2">
                            <span className="block w-3 h-[1px] bg-cyan-400/60" />
                            Navigation
                        </h3>
                        <ul className="space-y-[14px]">
                            {navLinks.map((id, i) => (
                                <li key={id}>
                                    <button
                                        onClick={() => scrollTo(id.toLowerCase())}
                                        onMouseEnter={() => setHovered(`nav-${i}`)}
                                        onMouseLeave={() => setHovered(null)}
                                        className="group flex items-center text-[13.5px] text-slate-400 hover:text-white transition-colors duration-200 tracking-wide"
                                    >
                                        <span
                                            className="block h-[1px] bg-gradient-to-r from-cyan-400 to-cyan-400/0 rounded-full transition-all duration-300"
                                            style={{
                                                width: hovered === `nav-${i}` ? "14px" : "0px",
                                                marginRight: hovered === `nav-${i}` ? "10px" : "0px",
                                            }}
                                        />
                                        {id.charAt(0).toUpperCase() + id.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONNECT */}
                    <div>
                        <h3 className="text-[9px] font-bold tracking-[3.5px] uppercase text-slate-500 mb-7 flex items-center gap-2">
                            <span className="block w-3 h-[1px] bg-cyan-400/60" />
                            Connect
                        </h3>

                        <div className="space-y-2.5">
                            {socials.map(({ href, icon, label, sub, external }, i) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={external ? "_blank" : undefined}
                                    rel={external ? "noreferrer" : undefined}
                                    onMouseEnter={() => setHovered(`soc-${i}`)}
                                    onMouseLeave={() => setHovered(null)}
                                    className="group flex items-center gap-3.5 p-3 rounded-xl
                                        border border-transparent hover:border-white/[0.08]
                                        hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
                                >
                                    <div
                                        className="flex items-center justify-center w-9 h-9 rounded-lg text-[15px]
                                            border border-white/[0.1] bg-white/[0.04] text-slate-400
                                            group-hover:border-cyan-400/35 group-hover:bg-cyan-400/[0.1]
                                            group-hover:text-cyan-400 transition-all duration-300 flex-shrink-0"
                                        style={{
                                            transform: hovered === `soc-${i}` ? "rotateY(15deg) scale(1.1)" : "rotateY(0deg) scale(1)",
                                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                            boxShadow: hovered === `soc-${i}` ? "0 0 14px rgba(0,211,243,0.2)" : "none",
                                        }}
                                    >
                                        {icon}
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-slate-300 group-hover:text-white transition-colors duration-200 font-medium leading-none mb-1">
                                            {label}
                                        </p>
                                        <p className="text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors duration-200 truncate max-w-[160px]">
                                            {sub}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative h-[1px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/50 shadow-[0_0_6px_rgba(0,211,243,0.5)]" />
                </div>

                {/* Bottom bar */}
                <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11.5px] text-slate-600 tracking-wide">
                        © {new Date().getFullYear()} Sumit Kasaudhan — All rights reserved.
                    </p>
                    <div className="flex items-center gap-3">
                        {["MCA · LPU 2026", "MERN Stack", "AI · Web"].map((tag, i, arr) => (
                            <span key={tag} className="flex items-center gap-3">
                                <span className="text-[10px] tracking-[2px] uppercase text-slate-600 hover:text-slate-400 transition-colors duration-200 cursor-default">
                                    {tag}
                                </span>
                                {i < arr.length - 1 && (
                                    <span className="w-[3px] h-[3px] rounded-full bg-slate-700 flex-shrink-0" />
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
            `}</style>
        </footer>
    );
};

export default Footer;