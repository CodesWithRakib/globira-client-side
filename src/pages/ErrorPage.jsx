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
    <motion.section
      className="flex items-center justify-center min-h-screen px-4 bg-white dark:bg-gray-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="text-center max-w-md mx-auto space-y-6">
        {/* Animated error illustration */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute inset-0 bg-red-100 dark:bg-red-900/20 rounded-full blur-2xl opacity-70 animate-pulse"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-32 h-32 mx-auto text-red-500 dark:text-red-400 relative"
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
        </motion.div>

        {/* Status code */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-3 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">
            Error {statusCode}
          </span>
        </motion.div>

        {/* Message */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold text-gray-900 dark:text-white"
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
          className="flex flex-col sm:flex-row justify-center gap-3 pt-4"
        >
          {showHomeButton && (
            <Link
              to="/"
              className="px-6 py-3 font-medium text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-800 dark:hover:bg-amber-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Return Home
            </Link>
          )}
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </motion.div>

        {/* Support link */}
        <motion.div variants={itemVariants} className="pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="text-amber-600 hover:text-amber-700 hover:underline"
            >
              Contact support
            </a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ErrorPage;
