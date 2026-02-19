import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";

const NavbarV2 = () => {

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("home");
    const [scrolled, setScrolled] = useState(false);

    const links = [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Projects", id: "projects" },
        { name: "Skills", id: "skills" },
        { name: "Education", id: "academics" },
        { name: "Contact", id: "contact" }
    ];

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 20);

            links.forEach(section => {
                const el = document.getElementById(section.id);
                if (!el) return;
                const rect = el.getBoundingClientRect();
                if (rect.top <= 120 && rect.bottom >= 120) {
                    setActive(section.id);
                }
            });

        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    const scrollTo = id => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
    };

    return (

        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 w-full z-50 border-b border-white/10 transition-all duration-300 ${scrolled ? "bg-black/85 backdrop-blur-xl shadow-lg" : "bg-black/60 backdrop-blur"
                }`}
        >

            <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 lg:h-20 flex justify-between items-center">

                {/* LOGO */}

                <button onClick={() => scrollTo("home")} className="flex items-center gap-2 shrink-0">

                    <img src="/favicon.png" alt="logo" className="w-7 h-7" />

                    <span className="font-bold text-lg sm:text-xl text-cyan-300 whitespace-nowrap">
                        SUMIT KASAUDHAN
                    </span>

                </button>


                {/* DESKTOP >=1280px */}

                <div className="hidden xl:flex items-center gap-7 text-lg">

                    {links.map(l => (

                        <button
                            key={l.id}
                            onClick={() => scrollTo(l.id)}
                            className={`relative transition ${active === l.id ? "text-cyan-300" : "text-white/80 hover:text-cyan-300"
                                }
after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-cyan-300 after:transition-all ${active === l.id ? "after:w-full" : "after:w-0 hover:after:w-full"
                                }`}
                        >

                            {l.name}

                        </button>

                    ))}

                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 font-semibold hover:scale-105 transition"
                    >

                        Resume

                    </a>

                    <div className="flex gap-5 ml-2 text-xl">

                        <a href="https://github.com/SumitKasaudhan" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">
                            <FaGithub />
                        </a>

                        <a href="https://www.linkedin.com/in/sumit-kasaudhan-654401229/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">
                            <FaLinkedin />
                        </a>

                    </div>

                </div>


                {/* MOBILE + TABLET */}

                <button className="xl:hidden text-2xl" onClick={() => setOpen(!open)}>
                    {open ? <FaTimes /> : <FaBars />}
                </button>

            </div>


            {/* MOBILE MENU */}

            <AnimatePresence>

                {open && (

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="xl:hidden bg-black/95 text-center py-8 space-y-6 border-t border-white/10 text-lg"
                    >

                        {links.map(l => (

                            <button
                                key={l.id}
                                onClick={() => scrollTo(l.id)}
                                className="block w-full hover:text-cyan-300"
                            >

                                {l.name}

                            </button>

                        ))}

                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="block hover:text-cyan-300">

                            Resume

                        </a>

                        <div className="flex justify-center gap-8 text-2xl pt-3">

                            <a href="https://github.com/SumitKasaudhan" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>

                            <a href="https://www.linkedin.com/in/sumit-kasaudhan-654401229/" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </motion.nav>

    );

};

export default NavbarV2;
