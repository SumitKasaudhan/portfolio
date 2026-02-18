import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import ProjectModal from "../components/ProjectModal";

const ProjectsV2 = () => {
    const [projects, setProjects] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await API.get("/projects");
                console.log("PROJECT API RESPONSE:", res.data);
                setProjects(res.data);
            } catch (err) {
                console.error("Failed to load projects:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section className="py-28 text-center">
                <p className="text-gray-400">Loading projects...</p>
            </section>
        );
    }

    return (
        <section id="projects" className="py-28 px-6">

            <h2 className="
    text-5xl font-bold text-center mb-16
    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-cyan-300
    via-cyan-400
    to-teal-300
    drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]
">
                Featured Projects
            </h2>


            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

                {projects.length === 0 && (
                    <p className="text-center col-span-3 text-gray-500">
                        No projects found
                    </p>
                )}

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

                        <div className="h-64 overflow-hidden">
                            <img
                                src={p.image || "https://via.placeholder.com/400"}
                                alt={p.title}
                                className="w-full object-cover group-hover:scale-105 transition duration-700"
                            />
                        </div>

                        <div className="p-6 relative z-10">

                            <h3 className="text-xl font-bold mb-3">
                                {p.title}
                            </h3>

                            <p className="text-gray-400 text-sm mb-4">
                                {p.description}
                            </p>

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

            <ProjectModal
                project={selected}
                close={() => setSelected(null)}
            />

        </section>
    );
};

export default ProjectsV2;
