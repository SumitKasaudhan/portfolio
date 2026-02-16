import { motion } from "framer-motion";

const IntroLoader = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="fixed inset-0 bg-black z-[999] flex items-center justify-center pointer-events-none"
        >
            <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-4xl font-bold text-blue-500"
            >
                SUMIT KASAUDHAN
            </motion.h1>
        </motion.div>
    );
};

export default IntroLoader;
