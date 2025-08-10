import React from "react";
import { motion } from "motion/react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <aside
      className="hidden lg:flex items-center justify-center p-12 bg-blue-50 dark:bg-blue-900/20"
      role="img"
      aria-labelledby="auth-pattern-title auth-pattern-subtitle"
      aria-describedby="auth-pattern-desc"
    >
      <div className="max-w-md text-center">
        {/* Pattern Grid */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-10"
          aria-hidden="true"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className={`aspect-square rounded-2xl bg-white dark:bg-gray-800 shadow-sm ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
              transition={{ duration: 0.3 }}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "3s",
              }}
            />
          ))}
        </motion.div>

        {/* Content */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.h2
            id="auth-pattern-title"
            className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.p
            id="auth-pattern-subtitle"
            className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
        </motion.header>

        {/* Decorative Elements */}
        <motion.div
          className="mt-10 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          aria-hidden="true"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </aside>
  );
};

export default AuthImagePattern;
