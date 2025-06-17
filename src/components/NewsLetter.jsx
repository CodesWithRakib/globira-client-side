import React from "react";
import { motion } from "motion/react";
import { FiSend } from "react-icons/fi";

const NewsLetter = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative py-16 px-6 text-center bg-gradient-to-br from-blue-50 to-amber-50 dark:from-[#010313] dark:to-[#010313]"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-amber-400 blur-3xl"></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-400 dark:to-amber-400 bg-clip-text text-transparent mb-3">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get exclusive offers, business tips, and new arrivals straight to
            your inbox.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-md mx-auto"
        >
          <div className="relative flex-grow">
            <input
              type="email"
              placeholder="Your business email"
              required
              className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-500 dark:to-amber-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Subscribe</span>
            <FiSend className="text-lg" />
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-4 text-sm text-gray-500 dark:text-gray-400"
        >
          We respect your privacy. Unsubscribe at any time.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default NewsLetter;
