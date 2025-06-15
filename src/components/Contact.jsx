import React from "react";
import { motion } from "motion/react";
import { FiMapPin, FiMail, FiPhone, FiClock, FiSend } from "react-icons/fi";

const Contact = () => {
  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-400 dark:to-amber-400 bg-clip-text text-transparent mb-3">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're here to help with your wholesale business needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Whether you're curious about pricing, bulk orders, or anything
              else — our team is ready to answer all your questions.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Our Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Dinajpur, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Email Us
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    support@globira.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Call Us
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    +880-1234-567890
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <FiClock className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Business Hours
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Mon - Fri, 9AM - 6PM (BST)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg space-y-6 border border-gray-100 dark:border-zinc-800"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@company.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                rows="5"
                placeholder="How can we help you?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-500 dark:to-amber-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FiSend className="text-lg" />
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
