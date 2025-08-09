import React from "react";
import { Loader } from "lucide-react";
import { motion } from "motion/react";

const Loading = () => {
  return (
    <section
      className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-center"
      role="status"
      aria-live="polite"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="text-blue-600 dark:text-blue-400"
      >
        <Loader className="w-16 h-16" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-6 text-gray-700 dark:text-gray-300 text-base font-medium"
      >
        Loading your experience...
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-3 flex space-x-1"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Loading;
