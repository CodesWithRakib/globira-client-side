import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  Rocket,
  Mail,
  Send,
  Shield,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CtaNewsletter = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
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
      // Simulate API call
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
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient and decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-400/20 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>

        {/* Floating stars */}
        <div className="absolute top-1/4 left-1/5 text-yellow-300 animate-pulse">
          <Star className="w-4 h-4 fill-current" />
        </div>
        <div className="absolute top-1/3 right-1/4 text-yellow-300 animate-pulse">
          <Star className="w-5 h-5 fill-current" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 text-yellow-300 animate-pulse">
          <Star className="w-3 h-3 fill-current" />
        </div>
        <div className="absolute bottom-1/3 right-1/5 text-yellow-300 animate-pulse">
          <Star className="w-4 h-4 fill-current" />
        </div>
      </div>

      <div className="container mx-auto px-4  relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/20 backdrop-blur-sm shadow-lg">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
                  <span className="flex h-3 w-3 relative mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  BUSINESS GROWTH
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Grow Your <span className="text-blue-200">Business</span> with
                Us
              </h2>

              <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
                Join thousands of businesses sourcing high-quality products at
                competitive wholesale prices
              </p>
            </div>

            <motion.button
              onClick={() => navigate("/login")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-blue-600 rounded-full group bg-white hover:bg-blue-50 transition-all duration-500 shadow-xl hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center text-lg">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.button>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              {/* Left side - Icon and text */}
              <div className="lg:w-2/5 flex flex-col items-center text-center lg:text-left">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-6 shadow-lg">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Stay Updated
                </h3>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Subscribe to our newsletter for exclusive deals, industry
                  insights, and product updates
                </p>

                {/* Trust indicators */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-2 text-blue-100">
                    <Check className="w-5 h-5 text-green-300" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <Check className="w-5 h-5 text-green-300" />
                    <span>Get approved in minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <Shield className="w-5 h-5 text-green-300" />
                    <span>100% secure and private</span>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="lg:w-3/5 w-full">
                <form onSubmit={handleSubscribe} className="space-y-6">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your business email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={submitting}
                      className="w-full px-6 py-4 rounded-xl border border-white/20 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 shadow-lg disabled:opacity-60 text-lg"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-blue-200" />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-white to-blue-100 text-blue-700 font-bold rounded-xl shadow-xl transition-all disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 text-lg"
                  >
                    <span>
                      {submitting ? "Subscribing..." : "Subscribe Now"}
                    </span>
                    <Send className="w-5 h-5" />
                  </motion.button>

                  {/* Privacy notice */}
                  <div className="text-center text-sm text-blue-200/80 mt-2">
                    We respect your privacy. Read our{" "}
                    <a
                      href="/privacy"
                      className="underline hover:text-white transition-colors duration-300"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaNewsletter;
