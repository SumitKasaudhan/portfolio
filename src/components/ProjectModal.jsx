import { motion } from "framer-motion";

const ProjectModal = ({ project, close }) => {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center px-6"
            onClick={close}
        >
            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-[#0f0f16] rounded-xl max-w-5xl w-full border border-white/10 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Scrollable image viewer */}
                <div className="h-[60vh] overflow-y-auto bg-black">
                    <img
                        src={project.image}
                        className="w-full"
                        alt={project.title}
                    />
                </div>

                <div className="p-8 space-y-4">

                    <h2 className="text-2xl font-bold">
                        {project.title}
                    </h2>

                    <p className="text-gray-400">
                        {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-white/10 rounded-full text-sm"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4 pt-4 flex-wrap">

                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 bg-purple-600 rounded hover:opacity-80"
                            >
                                GitHub
                            </a>
                        )}

                        {project.status === "coming" || !project.live ? (
                            <span className="px-4 py-2 bg-yellow-500/10 border border-yellow-500 text-yellow-400 rounded font-semibold">
                                Coming Soon
                            </span>
                        ) : (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 bg-cyan-600 rounded hover:opacity-80"
                            >
                                Live Demo
                            </a>
                        )}

                        <button
                            onClick={close}
                            className="px-4 py-2 bg-gray-800 rounded hover:opacity-80"
                        >
                            Close
                        </button>

                    </div>


                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;
