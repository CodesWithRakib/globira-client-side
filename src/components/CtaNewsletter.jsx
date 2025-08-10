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
    <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white rounded-2xl my-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center p-2 rounded-full bg-white/20">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Grow Your <span className="text-blue-200">Business</span>
                </h2>
                <p className="text-lg text-blue-100 max-w-2xl">
                  Join thousands of businesses sourcing high-quality products at
                  competitive wholesale prices
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => navigate("/login")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-medium rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Left side - Icon and text */}
              <div className="md:w-1/3 flex flex-col items-center text-center md:text-left">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Stay Updated
                </h3>
                <p className="text-blue-100 text-sm">
                  Subscribe to our newsletter for exclusive deals and updates
                </p>
              </div>

              {/* Right side - Form */}
              <div className="md:w-2/3">
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                      <input
                        type="email"
                        placeholder="Enter your business email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={submitting}
                        className="w-full px-5 py-3.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 shadow-sm disabled:opacity-60"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={submitting}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-blue-600 font-medium rounded-lg shadow-md transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                    >
                      <span>{submitting ? "Subscribing..." : "Subscribe"}</span>
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Trust indicators */}
                  <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-blue-100">
                    <div className="flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>Get approved in minutes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span>100% secure</span>
                    </div>
                  </div>

                  {/* Privacy notice */}
                  <div className="text-center text-xs text-blue-200/70 mt-2">
                    We never share your data. Read our{" "}
                    <a href="/privacy" className="underline hover:text-white">
                      Privacy Policy
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-400/10 blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/5 blur-3xl"></div>
      </div>
    </section>
  );
};

export default CtaNewsletter;
