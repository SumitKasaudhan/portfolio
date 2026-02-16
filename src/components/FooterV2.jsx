import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 mt-20 text-gray-400">

            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-cyan-300 drop-shadow-[0_0_10px_#00f0ff]">
                        SUMIT KASAUDHAN<span className="text-purple-400"></span>
                    </h2>

                    <p className="text-gray-400 leading-relaxed">
                        Full Stack Developer crafting modern, responsive web
                        experiences with React and scalable backend systems.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-semibold mb-4 text-white">
                        Quick Links
                    </h3>

                    <ul className="space-y-3">
                        {["home", "about", "projects", "skills", "contact"].map((id) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className="hover:text-cyan-400 transition"
                                >
                                    {id.charAt(0).toUpperCase() + id.slice(1)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="font-semibold mb-4 text-white">
                        Connect
                    </h3>

                    <div className="flex gap-6 text-2xl">

                        <a
                            href="https://github.com/SumitKasaudhan"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-cyan-400 hover:scale-110 transition"
                        >
                            <FaGithub />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/sumit-kasaudhan-654401229/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-cyan-400 hover:scale-110 transition"
                        >
                            <FaLinkedin />
                        </a>

                    </div>

                    <p className="text-gray-500 mt-6 text-sm">
                        Let’s build something amazing together 🚀
                    </p>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-white/10 text-center text-gray-500 py-6 text-sm">
                © {new Date().getFullYear()} Sumit Kasaudhan — All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;
