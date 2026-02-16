import { useEffect, useState } from "react";
import API from "../api";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get("/projects")
            .then(res => {
                setProjects(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching projects:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center py-10">Loading projects...</p>;
    }

    return (
        <section id="projects" className="py-16 px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
                Projects
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
                {projects.map(p => (
                    <div
                        key={p._id}
                        className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
                    >
                        <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">
                                {p.title}
                            </h3>

                            <p className="text-gray-400 mb-4">
                                {p.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {p.techStack?.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-sm bg-cyan-500/20 px-2 py-1 rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                {p.liveUrl && (
                                    <a
                                        href={p.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-cyan-400 hover:underline"
                                    >
                                        Live
                                    </a>
                                )}

                                {p.githubUrl && (
                                    <a
                                        href={p.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-gray-300 hover:underline"
                                    >
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
