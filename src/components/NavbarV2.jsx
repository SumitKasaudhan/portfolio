import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarV2 = () => {
    const [open, setOpen] = useState(false);

    const links = [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Projects", id: "projects" },
        { name: "Skills", id: "skills" },
        { name: "Education", id: "academics" },
        { name: "Contact", id: "contact" },
    ];

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
        setOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

                {/* Logo */}
                <button
                    onClick={() => scrollTo("home")}
                    className="font-bold text-2xl tracking-wide text-cyan-400"
                >
                    SUMIT KASAUDHAN
                </button>

                {/* Desktop menu */}
                <div className="hidden md:flex gap-10 text-lg">
                    {links.map((l) => (
                        <button
                            key={l.id}
                            onClick={() => scrollTo(l.id)}
                            className="hover:text-cyan-400 transition"
                        >
                            {l.name}
                        </button>
                    ))}
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-black/95 text-center py-8 space-y-6 border-t border-white/10 text-lg">
                    {links.map((l) => (
                        <button
                            key={l.id}
                            onClick={() => scrollTo(l.id)}
                            className="block w-full hover:text-cyan-400 transition"
                        >
                            {l.name}
                        </button>
                    ))}
                </div>
            )}
        </motion.nav>
    );
};

export default NavbarV2;
