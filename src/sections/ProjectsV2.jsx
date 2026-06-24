import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import ProjectModal from "../components/ProjectModal";

/* ── tiny CSS injected once ── */
const injectStyles = () => {
    if (document.getElementById("proj-styles")) return;
    const s = document.createElement("style");
    s.id = "proj-styles";
    s.textContent = `
        .proj-card { position: relative; }
        .proj-card::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 18px;
            padding: 1px;
            background: linear-gradient(135deg, rgba(168,85,247,0.5), rgba(34,211,238,0.3), transparent 60%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        .proj-card:hover::before { opacity: 1; }

        .proj-img-wrap img { transition: transform 0.5s ease; }
        .proj-card:hover .proj-img-wrap img { transform: scale(1.06); }

        .proj-shine {
            position: absolute;
            top: 0; left: -75%;
            width: 50%; height: 100%;
            background: linear-gradient(120deg, transparent, rgba(255,255,255,0.055), transparent);
            transform: skewX(-20deg);
            transition: left 0.55s ease;
            pointer-events: none;
        }
        .proj-card:hover .proj-shine { left: 130%; }

        .proj-tag {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 3px 10px;
            font-size: 11px;
            font-weight: 500;
            border-radius: 6px;
            background: rgba(139,92,246,0.12);
            border: 1px solid rgba(139,92,246,0.22);
            color: #c4b5fd;
            transition: background 0.15s, border-color 0.15s;
        }
        .proj-card:hover .proj-tag {
            background: rgba(139,92,246,0.2);
            border-color: rgba(139,92,246,0.38);
        }

        .proj-arrow {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px; height: 32px;
            border-radius: 50%;
            background: rgba(34,211,238,0.08);
            border: 1px solid rgba(34,211,238,0.2);
            color: #67e8f9;
            font-size: 14px;
            transition: background 0.2s, transform 0.2s;
        }
        .proj-card:hover .proj-arrow {
            background: rgba(34,211,238,0.18);
            transform: translate(2px, -2px);
        }

        @media (prefers-reduced-motion: reduce) {
            .proj-card::before,
            .proj-shine,
            .proj-img-wrap img,
            .proj-arrow { transition: none !important; }
        }
    `;
    document.head.appendChild(s);
};

/* ── skeleton loader ── */
const SkeletonCard = () => (
    <div className="rounded-[18px] overflow-hidden bg-[#0c0c1e] border border-white/8 animate-pulse">
        <div className="h-52 bg-white/5" />
        <div className="p-5 space-y-3">
            <div className="h-4 bg-white/8 rounded w-2/3" />
            <div className="h-3 bg-white/5 rounded w-full" />
            <div className="h-3 bg-white/5 rounded w-4/5" />
            <div className="flex gap-2 mt-4">
                <div className="h-5 w-14 bg-white/5 rounded" />
                <div className="h-5 w-16 bg-white/5 rounded" />
                <div className="h-5 w-12 bg-white/5 rounded" />
            </div>
        </div>
    </div>
);

/* ── number badge on card ── */
const IndexBadge = ({ n }) => (
    <div className="
        absolute top-3 left-3 z-10
        w-7 h-7 rounded-full
        bg-black/60 border border-white/15
        flex items-center justify-center
        text-[11px] font-semibold text-gray-400
        select-none
    ">
        {String(n).padStart(2, "0")}
    </div>
);

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const ProjectsV2 = () => {
    const [projects, setProjects]   = useState([]);
    const [selected, setSelected]   = useState(null);
    const [loading,  setLoading]    = useState(true);
    const [canHover, setCanHover]   = useState(true);

    useEffect(() => {
        injectStyles();
        setCanHover(window.matchMedia("(hover:hover)").matches);
    }, []);

    useEffect(() => {
        API.get("/projects")
            .then(r => setProjects(r.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const openModal = (p) => setSelected({
        title:  p.title,
        desc:   p.description,
        image:  p.image,
        tech:   p.techStack || [],
        github: p.githubUrl,
        live:   p.liveUrl || null,
    });

    return (
        <section id="projects" className="py-24 px-4 md:px-6 bg-black overflow-hidden">

            {/* ── section header ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                {/* eyebrow */}
                <p className="text-xs uppercase tracking-[0.2em] text-purple-400 mb-3 font-medium">
                    What I've built
                </p>

                <h2 className="
                    text-4xl md:text-5xl font-bold
                    text-transparent bg-clip-text
                    bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-300
                ">
                    Featured Projects
                </h2>

                {/* subtle underline accent */}
                <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            </motion.div>

            {/* ── grid ── */}
            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">

                {loading && [0,1,2,3,4,5].map(i => <SkeletonCard key={i} />)}

                {!loading && projects.length === 0 && (
                    <p className="col-span-3 text-center text-gray-500 py-10">No projects found</p>
                )}

                {!loading && projects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.06 }}
                        whileHover={canHover ? { y: -5, transition: { duration: 0.2 } } : {}}
                        onClick={() => openModal(project)}
                        className="proj-card rounded-[18px] overflow-hidden cursor-pointer
                            bg-[#0c0c1e]
                            border border-white/[0.07]
                            will-change-transform
                        "
                        style={{ isolation: "isolate" }}
                    >
                        {/* ── image zone ── */}
                        <div className="proj-img-wrap relative h-52 overflow-hidden bg-black">
                            <img
                                src={project.image || "https://placehold.co/600x300/080818/333?text=Project"}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                            {/* gradient fade at bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c1e] via-transparent to-transparent" />

                            {/* number badge */}
                            <IndexBadge n={index + 1} />

                            {/* shine sweep */}
                            <div className="proj-shine" />
                        </div>

                        {/* ── content zone ── */}
                        <div className="p-5 flex flex-col gap-3">

                            {/* title row */}
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="text-base md:text-lg font-semibold text-white leading-snug group-hover:text-cyan-300 transition-colors duration-200 line-clamp-1">
                                    {project.title}
                                </h3>
                                <div className="proj-arrow shrink-0">↗</div>
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                {project.description}
                            </p>

                            {/* tech tags */}
                            <div className="flex flex-wrap gap-1.5 mt-1">
                                {(project.techStack || []).slice(0, 4).map((tech, idx) => (
                                    <span key={idx} className="proj-tag">{tech}</span>
                                ))}
                                {(project.techStack || []).length > 4 && (
                                    <span className="proj-tag" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "#6b7280" }}>
                                        +{project.techStack.length - 4}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <ProjectModal project={selected} close={() => setSelected(null)} />
        </section>
    );
};

export default ProjectsV2;