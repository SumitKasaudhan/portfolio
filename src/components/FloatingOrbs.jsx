import { motion } from "framer-motion";

const FloatingOrbs = () => {
    return (
        <>
            <motion.div
                animate={{ y: [0, -40, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="fixed w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full top-20 left-10 pointer-events-none"
            />

            <motion.div
                animate={{ y: [0, 50, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="fixed w-96 h-96 bg-purple-500/10 blur-[140px] rounded-full bottom-10 right-10 pointer-events-none"
            />
        </>
    );
};

export default FloatingOrbs;
