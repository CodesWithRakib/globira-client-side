import React, { useEffect } from "react";
import { Link } from "react-router";
import useTitle from "../hooks/useTitle";
import { motion } from "motion/react";

const ErrorPage = ({
  message = "Oops! Something went wrong",
  statusCode = 404,
  showHomeButton = true,
}) => {
  useTitle(`${statusCode} | ${message}`);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") || "light"
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.section
        className="w-full max-w-md mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 md:p-10 text-center space-y-8 border border-gray-200 dark:border-gray-700">
          {/* Animated error illustration */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-2xl opacity-70 animate-pulse"></div>
            <div className="relative z-10">
              <div className="w-40 h-40 mx-auto rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-24 h-24 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Status code */}
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 text-sm font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
              Error {statusCode}
            </span>
          </motion.div>

          {/* Message */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100"
          >
            {message}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            {statusCode === 404
              ? "The page you're looking for doesn't exist or has been moved."
              : "An unexpected error occurred. Please try again later."}
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-2"
          >
            {showHomeButton && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/"
                  className="px-6 py-3.5 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Return Home
                </Link>
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3.5 font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200 block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Try Again
              </button>
            </motion.div>
          </motion.div>

          {/* Support link */}
          <motion.div variants={itemVariants} className="pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Need help?{" "}
              <a
                href="mailto:support@example.com"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium"
              >
                Contact support
              </a>
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ErrorPage;
