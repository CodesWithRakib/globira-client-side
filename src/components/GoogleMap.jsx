import React from "react";
import { motion } from "motion/react";

const GoogleMap = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full h-[500px] mt-16 relative group"
    >
      {/* Map container with overlay effect */}
      <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-xl">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.0168614784893!2d88.64683901538594!3d25.627058020198004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4e8fbdce1c7db%3A0xe0341f18e45cb7a1!2sDinajpur%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1718200000000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500 dark:brightness-90"
        />

        {/* Overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none"></div>

        {/* Location pin indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-red-600 text-4xl drop-shadow-lg"
          >
            📌
          </motion.div>
        </div>
      </div>

      {/* Floating address card */}
      <motion.div
        whileHover={{ y: -5 }}
        className="absolute bottom-6 left-6 bg-white dark:bg-zinc-900 px-6 py-4 rounded-xl shadow-lg z-10 border border-gray-100 dark:border-zinc-800"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinecap="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinecap="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Our Office
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dinajpur, Bangladesh
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default GoogleMap;
