import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import Reveal from "../components/Reveal";


const ContactConsole = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const submit = (e) => {
        e.preventDefault();

        emailjs
            .send(
                "service_24lmj6p",
                "template_420c5go",
                form,
                "KYA1qUA9m6phiCzjF"
            )
            .then(
                (result) => {
                    console.log("SUCCESS:", result.text);
                    alert("Message sent 🚀");
                },
                (error) => {
                    console.log("FAILED:", error.text);
                    alert("Email failed ❌ Check console");
                }
            );

        setForm({ name: "", email: "", message: "" });
    };


    return (
        <Reveal>
        <section id="contact" className="py-24 px-6">

            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold text-center mb-16"
            >
                Contact Console
            </motion.h2>

            <motion.form
                onSubmit={submit}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto bg-black/70 backdrop-blur border border-white/10 rounded-xl p-10 space-y-6 font-mono"
            >

                <p className="text-green-400">
                    &gt; connect_to_sumit()
                </p>

                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 p-3 outline-none"
                />

                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 p-3 outline-none"
                />

                <textarea
                    placeholder="Message"
                    rows="4"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 p-3 outline-none"
                />

                <button className="bg-blue-500 px-6 py-3 rounded hover:bg-blue-600 transition">
                    Send Signal →
                </button>

            </motion.form>
        </section>
        </Reveal>
    );
};

export default ContactConsole;
