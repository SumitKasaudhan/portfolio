import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import ProjectModal from "../components/ProjectModal";

const ProjectsV2 = () => {

    const [projects, setProjects] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ⭐ Detect hover supported devices */

    const [canHover, setCanHover] = useState(true);

    useEffect(() => {

        setCanHover(window.matchMedia("(hover:hover)").matches);

    }, []);



    /* FETCH */

    useEffect(() => {

        const fetchProjects = async () => {

            try {

                const res = await API.get("/projects");

                setProjects(res.data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        fetchProjects();

    }, []);



    if (loading) {

        return (

            <section className="py-28 text-center">

                <p className="text-gray-400">

                    Loading projects...

                </p>

            </section>

        );

    }



    return (

        <section

            id="projects"

            className="py-28 px-6 relative"

        >

            <h2

                className="

text-5xl font-bold text-center mb-20

text-transparent bg-clip-text

bg-gradient-to-r

from-cyan-300 via-cyan-400 to-teal-300

drop-shadow-[0_0_15px_rgba(34,211,238,0.35)]

"

            >

                Featured Projects

            </h2>



            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12">

                {projects.length === 0 && (

                    <p className="col-span-3 text-center text-gray-500">

                        No projects found

                    </p>

                )}



                {projects.map((project, index) => (

                    <motion.div

                        key={project._id}

                        initial={{ opacity: 0, y: 80 }}

                        whileInView={{ opacity: 1, y: 0 }}

                        viewport={{ once: true }}

                        whileHover={canHover ? { y: -14 } : {}}

                        transition={{ duration: .6, delay: index * .1 }}

                        onClick={() => setSelected({

                            title: project.title,

                            desc: project.description,

                            image: project.image,

                            tech: project.techStack || [],

                            github: project.githubUrl,

                            live: project.liveUrl || null

                        })}

                        className={`

group

relative

rounded-3xl overflow-hidden cursor-pointer

border border-white/10

bg-[rgba(15,15,30,0.65)]

backdrop-blur-xl

shadow-[0_10px_35px_rgba(0,0,0,0.55)]

transition-all duration-500

hover:shadow-[0_0_45px_rgba(0,255,255,0.25)]

${!canHover ? "hover:shadow-none" : ""}

`}

                    >


                        {/* Glow */}

                        <div

                            className={`

absolute inset-0

opacity-0

${canHover ? "group-hover:opacity-100" : ""}

transition duration-500

bg-gradient-to-r

from-purple-500/20 via-transparent to-cyan-400/20

blur-2xl

pointer-events-none

`}

                        />



                        {/* IMAGE */}

                        <div className="relative h-64 overflow-hidden">

                            <img

                                src={project.image || "https://via.placeholder.com/400"}

                                alt={project.title}

                                className={`

w-full h-full object-cover

transition duration-700

${canHover ? "group-hover:scale-110" : ""}

`}

                            />


                            <div

                                className="

absolute inset-0

bg-gradient-to-t

from-black/90

via-black/20

to-transparent

"

                            />

                        </div>



                        {/* CONTENT */}

                        <div className="p-6 relative z-10">

                            <h3

                                className={`

text-xl font-semibold mb-3

text-white

transition

${canHover ? "group-hover:text-cyan-300" : ""}

`}

                            >

                                {project.title}

                            </h3>



                            <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">

                                {project.description}

                            </p>



                            <div className="flex flex-wrap gap-2">

                                {(project.techStack || []).map((tech, idx) => (

                                    <span

                                        key={idx}

                                        className="

px-3 py-1 text-xs font-medium

rounded-lg

text-purple-200

bg-purple-500/10

border border-purple-400/30

shadow-[0_0_10px_rgba(168,85,247,0.25)]

transition-all duration-300

"

                                    >

                                        {tech}

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
