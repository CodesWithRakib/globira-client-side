import React, { useEffect } from "react";
import { Link } from "react-router";
import useTitle from "../hooks/useTitle";
import { motion } from "motion/react";

const ErrorPage = ({
  message = "Service Temporarily Unavailable",
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.section
        className="w-full max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 text-center space-y-8 border border-gray-200 dark:border-gray-700">
          {/* Professional error header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-16 h-16 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>

            {/* Status code with professional styling */}
            <div className="inline-flex items-center px-4 py-2 mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
              <span className="font-mono font-medium">Error {statusCode}</span>
            </div>
          </motion.div>

          {/* Professional message */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100"
          >
            {message}
          </motion.h1>

          {/* Business-oriented description */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {statusCode === 404
                ? "The resource you're trying to access is unavailable or has been moved. Please check the URL or navigate to another section."
                : "Our system is experiencing technical difficulties. Our team has been notified and is working to resolve the issue."}
            </p>

            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              For immediate assistance with your wholesale orders or account
              issues, please contact our business support team.
            </p>
          </motion.div>

          {/* Professional action buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            {showHomeButton && (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 max-w-xs"
              >
                <Link
                  to="/"
                  className="w-full px-6 py-3.5 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Return to Home
                </Link>
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 max-w-xs"
            >
              <Link
                to="/contact"
                className="w-full px-6 py-3.5 font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Contact Support
              </Link>
            </motion.div>
          </motion.div>

          {/* Additional business resources */}
          <motion.div
            variants={itemVariants}
            className="pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              While you're waiting, these resources might be helpful:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/help"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium text-sm"
              >
                Help Center
              </Link>
              <Link
                to="/faq"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium text-sm"
              >
                FAQ
              </Link>
              <Link
                to="/order-status"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium text-sm"
              >
                Order Status
              </Link>
              <Link
                to="/catalog"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium text-sm"
              >
                Product Catalog
              </Link>
            </div>
          </motion.div>

          {/* Support contact information */}
          <motion.div variants={itemVariants} className="pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For urgent business inquiries:{" "}
              <a
                href="mailto:support@globira.com"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium"
              >
                support@globira.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+8801234567890"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium"
              >
                +880 1234 567890
              </a>
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ErrorPage;
