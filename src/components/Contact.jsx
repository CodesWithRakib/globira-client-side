import React from "react";
import { motion } from "motion/react";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const handleContactSubmit = (e) => {
    e.preventDefault();

    try {
      toast.success("Contact form submitted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit contact form. Please try again.");
    }
  };
  return (
    <section className="py-16 px-4 sm:px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              CONTACT OUR TEAM
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Discuss Your Business Needs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our wholesale specialists are ready to assist you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Whether you're inquiring about bulk pricing, custom orders, or
              partnership opportunities, our dedicated team is here to support
              your wholesale requirements.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
                    Headquarters
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    123 Wholesale Plaza
                    <br />
                    Dinajpur, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
                    Email Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    sales@globira.com
                    <br />
                    support@globira.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
                    Phone Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    +880 1234 567890 (Sales)
                    <br />
                    +880 9876 543210 (Support)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
                    Business Hours
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Monday - Friday: 9AM - 6PM (BST)
                    <br />
                    Saturday: 10AM - 4PM (BST)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleContactSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md space-y-6 border border-gray-100 dark:border-gray-700"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name*
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Email*
              </label>
              <input
                type="email"
                placeholder="your@company.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Your business name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Message*
              </label>
              <textarea
                rows="4"
                placeholder="How can we assist your business?"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
                required
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-3.5 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Business Inquiry
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
