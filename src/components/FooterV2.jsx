import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {

    const scrollTo = (id) => {

        const el = document.getElementById(id);

        if (el) {

            el.scrollIntoView({

                behavior: "smooth"

            });

        }

    };

    return (

        <footer

            className="

bg-gradient-to-b

from-black

via-[#050514]

to-black

border-t border-white/10

mt-20

text-gray-400

"

        >

            <div

                className="

max-w-7xl mx-auto

px-6 py-16

grid md:grid-cols-3

gap-12

"

            >


                {/* BRAND */}

                <div>

                    <h2

                        className="

font-bold text-2xl tracking-wide

text-cyan-300

transition-all duration-300

group-hover:text-cyan-200

"
                    >

                        SUMIT KASAUDHAN

                    </h2>



                    <p>

                        Full Stack Developer crafting modern,

                        scalable web applications using MERN stack.

                    </p>

                </div>



                {/* QUICK LINKS */}

                <div>

                    <h3 className="font-semibold mb-4 text-white">

                        Quick Links

                    </h3>

                    <ul className="space-y-3">

                        {["home", "about", "projects", "skills", "contact"].map((id) => (

                            <li key={id}>

                                <button

                                    onClick={() => scrollTo(id)}

                                    className="hover:text-cyan-400 transition"

                                >

                                    {id.charAt(0).toUpperCase() + id.slice(1)}

                                </button>

                            </li>

                        ))}



                        {/* Resume */}

                        <li>

                            <a

                                href="/resume.pdf"

                                target="_blank"

                                rel="noopener noreferrer"

                                className="hover:text-cyan-400"

                            >

                                Resume

                            </a>

                        </li>

                    </ul>

                </div>



                {/* CONNECT */}

                <div>

                    <h3 className="font-semibold mb-4 text-white">

                        Connect

                    </h3>



                    <div className="flex gap-6 text-2xl">

                        <a

                            href="https://github.com/SumitKasaudhan"

                            target="_blank"

                            rel="noreferrer"

                            className="

hover:text-cyan-400

hover:scale-110

hover:drop-shadow-[0_0_8px_#22d3ee]

transition

"

                        >

                            <FaGithub />

                        </a>



                        <a

                            href="https://www.linkedin.com/in/sumit-kasaudhan-654401229/"

                            target="_blank"

                            rel="noreferrer"

                            className="

hover:text-cyan-400

hover:scale-110

hover:drop-shadow-[0_0_8px_#22d3ee]

transition

"

                        >

                            <FaLinkedin />

                        </a>

                    </div>



                    {/* EMAIL */}

                    <a

                        href="mailto:sumit979gupta@gmail.com"

                        className="

flex items-center gap-2

mt-6 text-sm

hover:text-cyan-400

"

                    >

                        <FaEnvelope />

                        sumit979gupta@gmail.com

                    </a>



                    <p className="mt-6 text-sm">

                        Let’s build something amazing together 🚀

                    </p>

                </div>

            </div>



            <div

                className="

border-t border-white/10

text-center

text-gray-500

py-6 text-sm

"

            >

                © {new Date().getFullYear()} Sumit Kasaudhan —

                All rights reserved.

            </div>

        </footer>

    );

};

export default Footer;
