import { motion } from "framer-motion";
import profile from "../assets/profile.jpg";

const AboutV2 = () => {
    return (
        <section
            id="about"
            className="relative z-30 bg-black text-white px-6 py-14 md:py-20 lg:py-24"
        >
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">

                {/* LEFT — Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative group flex justify-center"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 blur-xl opacity-30 group-hover:opacity-60 transition rounded-3xl" />

                    <div className="relative w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px] h-[420px] md:h-[460px] lg:h-[480px] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                        <img
                            src={profile}
                            alt="profile"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </motion.div>

                {/* RIGHT — Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-cyan-300 drop-shadow-[0_0_12px_#00f0ff]">
                        About Me
                    </h2>

                    <h3 className="mt-6 text-xl md:text-2xl font-semibold text-white">
                        Passionate Front-End Developer
                    </h3>

                    <p className="mt-4 text-gray-300 leading-relaxed">
                        I'm a dedicated developer focused on building immersive,
                        high-performance web applications. I love turning complex ideas
                        into elegant digital experiences that feel fast, modern, and
                        intuitive.
                    </p>

                    <p className="mt-4 text-gray-400 leading-relaxed">
                        With strong expertise in React, Node.js, and scalable architecture,
                        I design products that balance performance, usability, and visual
                        polish.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 mt-10">
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
                            <h4 className="text-lg font-semibold text-cyan-300">
                                My Mission
                            </h4>
                            <p className="mt-2 text-gray-400 text-sm">
                                Build modern digital experiences that are fast,
                                scalable, and visually engaging.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
                            <h4 className="text-lg font-semibold text-cyan-300">
                                My Approach
                            </h4>
                            <p className="mt-2 text-gray-400 text-sm">
                                Combine technical excellence with creative design to
                                deliver polished products.
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutV2;
