// Loading.jsx (Minimalist Version)
import React from "react";
import { motion } from "motion/react";

const Loading = () => {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-center p-4"
      role="status"
      aria-live="polite"
    >
      {/* Minimalist Spinner */}
      <div className="relative mb-10">
        <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full">
          <motion.div
            className="w-16 h-16 border-4 border-t-blue-600 border-r-blue-600 border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "linear",
            }}
          ></motion.div>
        </div>
      </div>

      {/* Simple Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-200">
          Initializing Platform
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we prepare your workspace
        </p>
      </motion.div>

      {/* Simple Progress Indicator */}
      <motion.div
        className="mt-10 flex space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: i * 0.1,
            }}
            className="w-2 h-2 bg-blue-600 rounded-full"
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Loading;
