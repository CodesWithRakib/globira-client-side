import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Rocket, Mail, Send, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CtaNewsletter = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Simple email regex validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      // Simulate API call or connect your newsletter subscription API here
      // Will be added in future updates
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-center py-16 px-6 rounded-xl mx-4 shadow-lg"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Small banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Rocket className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">
              GROW YOUR BUSINESS
            </span>
          </div>
        </motion.div>

        {/* Main CTA heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-5"
        >
          Ready to Source Wholesale Products?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
        >
          Join thousands of businesses sourcing high-quality products at
          competitive wholesale prices.
        </motion.p>

        {/* Call-to-action button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all mb-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Newsletter subscription form */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-xl w-full mx-auto"
            onSubmit={handleSubscribe}
          >
            <div className="relative flex-grow">
              <input
                type="email"
                placeholder="Enter your business email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                className="w-full px-5 py-3.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 shadow-sm text-gray-700 dark:text-gray-300 disabled:opacity-60"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              <span>{submitting ? "Subscribing..." : "Subscribe"}</span>
              <Send className="w-5 h-5" />
            </motion.button>
          </motion.form>

          {/* Trust message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mt-5 text-sm text-white/80"
          >
            <Check className="w-4 h-4" />
            <span>No credit card required</span>
            <span className="mx-2">•</span>
            <Check className="w-4 h-4" />
            <span>Get approved in minutes</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mt-3 text-xs text-white/70"
          >
            <Shield className="w-4 h-4" />
            <span>We never share your data. Read our </span>
            <a href="privacy" className="underline hover:text-white">
              Privacy Policy
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
    </motion.section>
  );
};

export default CtaNewsletter;
