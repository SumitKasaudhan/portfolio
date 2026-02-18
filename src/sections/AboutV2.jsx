import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
import profile from "../assets/profile.jpg";

const AboutV2 = () => {
    return (
        <section
            id="about"
            className="relative z-30 section-bg px-0 py-28 text-white"
        >

            {/* Floating glass card */}
            <div className="
                relative w-full
                py-20 px-6 md:px-16
                rounded-[40px]
                border border-purple-500/15
                backdrop-blur-xl
                bg-[rgba(10,10,25,0.55)]
                shadow-[0_0_80px_rgba(139,92,246,0.18)]
            ">

                {/* soft cinematic edge glow */}
                <div className="absolute inset-0 rounded-[40px]
                    bg-gradient-to-r
                    from-purple-500/5 via-transparent to-cyan-400/5
                    blur-[90px] opacity-80 pointer-events-none" />

                <div className="grid md:grid-cols-2 gap-14 items-center max-w-7xl mx-auto">

                    {/* LEFT — Circle image */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                        className="relative flex justify-center"
                    >

                        {/* aura */}
                        <div className="absolute w-[380px] md:w-[460px] aspect-square
                            rounded-full bg-purple-500/10
                            blur-[140px] opacity-80" />

                        <Tilt
                            glareEnable={false}
                            scale={1.05}
                            tiltMaxAngleX={12}
                            tiltMaxAngleY={12}
                            transitionSpeed={2000}
                            className="bg-transparent rounded-full"
                        >
                            <div className="relative w-[320px] md:w-[400px] aspect-square
                                rounded-full overflow-hidden
                                border-[3px] border-purple-400/25
                                shadow-[0_0_30px_rgba(139,92,246,0.18)]">

                                <img
                                    src={profile}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />

                            </div>
                        </Tilt>
                    </motion.div>

                    {/* RIGHT — Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                    >

                        {/* Title + Resume button */}
                        <div className="flex items-center gap-6 flex-wrap">

                            <h2 className="
        heading-glow
        text-4xl md:text-5xl
        font-bold
    ">
                                About Me
                            </h2>

                            <a
                                href="/public/Resume.pdf"
                                download
                                className="
            inline-flex items-center justify-center
            px-6 py-2.5
            rounded-lg
            text-sm font-medium
            text-cyan-200

            bg-gradient-to-r
            from-purple-500/20
            to-cyan-400/20

            border border-cyan-300/25
            backdrop-blur-md

            hover:scale-105
            hover:text-white
            hover:border-cyan-200
            hover:shadow-[0_0_25px_rgba(0,255,255,0.35)]

            transition-all duration-300
        "
                            >
                                Download Resume
                            </a>

                        </div>

                        <h3 className="mt-6 text-xl md:text-2xl font-semibold">
                            I am a{" "}
                            <span className="text-purple-400 drop-shadow-[0_0_8px_#8B5CF6]">
                                <TypeAnimation
                                    sequence={[
                                        "Frontend Developer",
                                        2000,
                                        "React Specialist",
                                        2000,
                                        "UI Enthusiast",
                                        2000,
                                    ]}
                                    speed={50}
                                    repeat={Infinity}
                                />
                            </span>
                        </h3>

                        <p className="mt-4 text-gray-300 leading-relaxed">
                            I'm a dedicated developer focused on building immersive,
                            high-performance web applications. I love turning complex ideas
                            into elegant digital experiences that feel fast, modern, and intuitive.
                        </p>

                        <p className="mt-4 text-gray-400 leading-relaxed">
                            With strong expertise in React, Node.js, and scalable architecture,
                            I design products that balance performance, usability, and visual polish.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 mt-10">

                            <div className="glass glass-hover p-6">
                                <h4 className="text-lg font-semibold text-purple-300">
                                    My Mission
                                </h4>
                                <p className="mt-2 text-gray-400 text-sm">
                                    Build modern digital experiences that are fast,
                                    scalable, and visually engaging.
                                </p>
                            </div>

                            <div className="glass glass-hover p-6">
                                <h4 className="text-lg font-semibold text-purple-300">
                                    My Approach
                                </h4>
                                <p className="mt-2 text-gray-400 text-sm">
                                    Combine technical excellence with creative design
                                    to deliver polished products.
                                </p>
                            </div>

                        </div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AboutV2;
