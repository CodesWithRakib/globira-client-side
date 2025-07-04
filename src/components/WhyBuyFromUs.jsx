import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

const WhyBuyFromUs = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: "Competitive Pricing",
      description: "Wholesale rates for maximum value",
      icon: "💰",
      color: "bg-amber-50 dark:bg-amber-900/10",
    },
    {
      id: 2,
      title: "Verified Suppliers",
      description: "Trusted global brands",
      icon: "✅",
      color: "bg-emerald-50 dark:bg-emerald-900/10",
    },
    {
      id: 3,
      title: "Transparent MOQ",
      description: "Clear minimum order quantities",
      icon: "📦",
      color: "bg-purple-50 dark:bg-purple-900/10",
    },
    {
      id: 4,
      title: "Fast Shipping",
      description: "Reliable global delivery",
      icon: "🚚",
      color: "bg-sky-50 dark:bg-sky-900/10",
    },
    {
      id: 5,
      title: "Dedicated Support",
      description: "Real-time B2B assistance",
      icon: "🛎️",
      color: "bg-red-50 dark:bg-red-900/10",
    },
    {
      id: 6,
      title: "Flexible Payments",
      description: "Secure checkout options",
      icon: "💳",
      color: "bg-indigo-50 dark:bg-indigo-900/10",
    },
    {
      id: 7,
      title: "Easy Returns",
      description: "Hassle-free policies",
      icon: "🔄",
      color: "bg-teal-50 dark:bg-teal-900/10",
    },
    {
      id: 8,
      title: "Live Inventory",
      description: "Real-time stock tracking",
      icon: "📊",
      color: "bg-orange-50 dark:bg-orange-900/10",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-sm font-medium">
            B2B ADVANTAGES
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The top reasons businesses rely on our wholesale platform
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${feature.color} transition-all`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-3xl mb-4 p-4 rounded-full shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => navigate("/b2b-benefits")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 text-white font-medium rounded-lg transition-colors"
          >
            Explore B2B Benefits
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyBuyFromUs;
