import React from "react";
import { motion } from "motion/react";

const Cta = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-amber-600 dark:from-[#03061d] dark:to-[#0103137a] text-center py-16 px-6 rounded-2xl mx-4 shadow-xl"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-5"
        >
          Ready to Grow Your Business?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-lg text-white/90 mb-8"
        >
          Join thousands of B2B buyers who trust our platform to source
          high-quality products at the best prices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-zinc-900 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Sourcing Now
            <span className="ml-2">→</span>
          </motion.button>

          <p className="text-white/80 mt-4 text-sm">
            No credit card required • Get started in minutes
          </p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-500/20 blur-xl"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-amber-500/20 blur-xl"></div>
    </motion.section>
  );
};

export default Cta;
