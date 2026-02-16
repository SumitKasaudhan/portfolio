import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import ProjectModal from "../components/ProjectModal";
import Reveal from "../components/Reveal";

const ProjectsV2 = () => {
    const [projects, setProjects] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await API.get("/projects");
                setProjects(res.data);
            } catch (err) {
                console.error("Failed to load projects:", err);
            }
        };

        fetch();
    }, []);

    return (
        <Reveal>
            <section id="projects" className="py-28 px-6">

                {/* Title */}
                <h2 className="
          text-5xl font-bold text-center mb-16
          text-cyan-300
          drop-shadow-[0_0_18px_#00f0ff]
        ">
                    Featured Projects
                </h2>

                {/* Grid */}
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

                    {projects.map((p, i) => (
                        <motion.div
                            key={p._id}
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            onClick={() =>
                                setSelected({
                                    title: p.title,
                                    desc: p.description,
                                    image: p.image,
                                    tech: p.techStack || [],
                                    github: p.githubUrl,
                                    live: p.liveUrl || null,
                                })
                            }
                            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl cursor-pointer"
                        >

                            {/* Image preview */}
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={p.image || "/projects/default.png"}
                                    alt={p.title}
                                    className="w-full object-cover group-hover:scale-105 transition duration-700"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 relative z-10">

                                <h3 className="text-xl font-bold mb-3">
                                    {p.title}
                                </h3>

                                <p className="text-gray-400 text-sm mb-4">
                                    {p.description}
                                </p>

                                {/* Tech badges */}
                                <div className="flex flex-wrap gap-2">
                                    {(p.techStack || []).map((t, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs px-3 py-1 bg-white/10 rounded-full"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                            </div>
                        </motion.div>
                    ))}

                </div>

                {/* Modal */}
                <ProjectModal
                    project={selected}
                    close={() => setSelected(null)}
                />

            </section>
        </Reveal>
    );
};

export default ProjectsV2;
