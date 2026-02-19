import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const ProjectModal = ({ project, close }) => {

    useEffect(() => {

        if (!project) return;

        const esc = (e) => {
            if (e.key === "Escape") close();
        };

        /* body scroll lock safe */

        document.body.style.overflow = "hidden";

        window.addEventListener("keydown", esc);

        return () => {

            document.body.style.overflow = "";
            window.removeEventListener("keydown", esc);

        };

    }, [project, close]);


    if (!project) return null;


    return (

        <AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
                style={{ touchAction: "manipulation" }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6"
            >

                {/* MODAL */}

                <motion.div
                    initial={{ y: 40, opacity: 0, scale: .96 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .3 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-6xl max-h-[92vh] rounded-3xl bg-[#0f1120f2] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,.85)] flex flex-col overflow-hidden"
                >

                    {/* CLOSE */}

                    <button
                        onClick={close}
                        className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white transition"
                    >

                        ✕

                    </button>


                    {/* IMAGE SCROLL */}

                    <div
                        className="relative h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] overflow-y-auto bg-black touch-pan-y"
                    >

                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full min-h-full object-cover object-center"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

                    </div>


                    {/* CONTENT */}

                    <div className="px-5 sm:px-8 lg:px-12 py-6 sm:py-8 space-y-6">

                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">

                            {project.title}

                        </h2>

                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">

                            {project.desc}

                        </p>


                        {/* TECH */}

                        <div className="flex flex-wrap gap-2">

                            {project.tech.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 text-xs sm:text-sm rounded-lg bg-purple-500/10 border border-purple-400/30 text-purple-200"
                                >

                                    {tech}

                                </span>
                            ))}

                        </div>


                        {/* BUTTONS */}

                        <div className="flex flex-col sm:flex-row gap-3 pt-3">

                            {project.github && (

                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-center px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:scale-105 transition"
                                >

                                    GitHub

                                </a>

                            )}

                            {project.status === "coming" || !project.live ? (

                                <span className="text-center px-5 py-3 rounded-lg bg-yellow-500/10 border border-yellow-400/40 text-yellow-400">

                                    Coming Soon

                                </span>

                            ) : (

                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-center px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-400 hover:scale-105 transition"
                                >

                                    Live Demo

                                </a>

                            )}

                            <button
                                onClick={close}
                                className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
                            >

                                Close

                            </button>

                        </div>

                    </div>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );

};

export default ProjectModal;
