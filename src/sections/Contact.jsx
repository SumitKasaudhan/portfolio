import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import Reveal from "../components/Reveal";
import { FaEnvelope, FaLinkedin, FaFolderOpen } from "react-icons/fa";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            await emailjs.send(
                "service_24lmj6p",
                "template_420c5go",
                {
                    from_name: form.name,
                    reply_to: form.email,
                    subject: form.subject,
                    message: form.message,
                },
                "KYA1qUA9m6phiCzjF"
            );

            setStatus("✅ Message sent successfully!");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            console.error(err);
            setStatus("❌ Failed to send message");
        }

        setLoading(false);
    };

    return (
        <Reveal>
            <section id="contact" className="py-24 px-6 bg-black text-white">

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="
        text-4xl md:text-5xl
        font-bold
        text-center
        mb-16
        text-transparent
        bg-clip-text
        bg-gradient-to-r
        from-cyan-300
        via-cyan-400
        to-teal-300
        drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]
    "
                >
                    Get In Touch
                </motion.h2>


                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

                    {/* LEFT CARD — Contact Info */}
                    {/* LEFT CARD — Contact Info */}
                    <div className="bg-black/60 backdrop-blur border border-white/10 rounded-2xl p-8 space-y-8">

                        <h3 className="text-xl font-semibold text-cyan-200">
                            Contact Information
                        </h3>

                        {/* Email */}
                        <a
                            href="mailto:sumit979gupta@gmail.com"
                            className="flex items-center gap-4 group hover:opacity-80 transition cursor-pointer"
                        >
                            <FaEnvelope className="text-purple-400 text-xl" />

                            <div>
                                <p>Email</p>
                                <p className="text-gray-400 group-hover:text-cyan-300 break-all">
                                    sumit979gupta@gmail.com
                                </p>
                            </div>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/sumit-kasaudhan-654401229/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 group hover:opacity-80 transition cursor-pointer"
                        >
                            <FaLinkedin className="text-purple-400 text-xl" />

                            <div>
                                <p>LinkedIn</p>
                                <p className="text-gray-400 group-hover:text-cyan-300 break-all">
                                    linkedin.com/in/sumit-kasaudhan
                                </p>
                            </div>
                        </a>

                        <hr className="border-white/10" />

                        {/* Portfolio */}
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <FaFolderOpen className="text-purple-400" />
                                <p className="font-medium">Check Out My Work</p>
                            </div>

                            <p className="text-gray-400 mb-4">
                                Explore my portfolio projects and development work.
                            </p>

                            <a
                                href="#projects"
                                className="inline-block bg-gradient-to-r from-purple-600 to-cyan-400 px-6 py-3 rounded-full font-semibold hover:scale-105 transition shadow-lg"
                            >
                                View Portfolio
                            </a>
                        </div>

                    </div>

                    {/* RIGHT CARD — Form */}
                    <motion.form
                        onSubmit={submit}
                        className="bg-black/60 backdrop-blur border border-white/10 rounded-2xl p-8 space-y-6"
                    >
                        <h3 className="text-xl font-semibold text-purple-300">
                            Send a Message
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field"
                            />

                            <input
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field"
                            />
                        </div>

                        <input
                            name="subject"
                            placeholder="Subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="field"
                        />

                        <textarea
                            name="message"
                            rows="5"
                            placeholder="Message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            className="field resize-none"
                        />

                        <button
                            disabled={loading}
                            className="submitBtn"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                        {status && (
                            <p className="text-sm text-gray-400 text-center">
                                {status}
                            </p>
                        )}
                    </motion.form>
                </div>
            </section>
        </Reveal>
    );
};

export default Contact;
