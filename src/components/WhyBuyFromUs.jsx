import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  DollarSign,
  CheckCircle,
  Package,
  Truck,
  HeadphonesIcon,
  CreditCard,
  RefreshCw,
  BarChart3,
} from "lucide-react";

const WhyBuyFromUs = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: "Competitive Pricing",
      description: "Wholesale rates for maximum value",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      title: "Verified Suppliers",
      description: "Trusted global brands",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 3,
      title: "Transparent MOQ",
      description: "Clear minimum order quantities",
      icon: <Package className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 4,
      title: "Fast Shipping",
      description: "Reliable global delivery",
      icon: <Truck className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      id: 5,
      title: "Dedicated Support",
      description: "Real-time B2B assistance",
      icon: <HeadphonesIcon className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
    {
      id: 6,
      title: "Flexible Payments",
      description: "Secure checkout options",
      icon: <CreditCard className="w-6 h-6" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    },
    {
      id: 7,
      title: "Easy Returns",
      description: "Hassle-free policies",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "text-pink-600",
      bgColor: "bg-pink-100 dark:bg-pink-900/30",
    },
    {
      id: 8,
      title: "Live Inventory",
      description: "Real-time stock tracking",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-teal-600",
      bgColor: "bg-teal-100 dark:bg-teal-900/30",
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
              B2B ADVANTAGES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-blue-600">Us</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              The top reasons businesses rely on our wholesale platform
            </p>
          </div>
          <motion.button
            onClick={() => navigate("/b2b-benefits")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Explore B2B Benefits
          </motion.button>
        </div>
        <div className="h-1 w-20 bg-blue-500 rounded-full" />
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
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`mb-4 p-4 rounded-full ${feature.bgColor} ${feature.color} transition-all duration-300 group-hover:scale-110`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA for mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-8 sm:hidden"
      >
        <motion.button
          onClick={() => navigate("/b2b-benefits")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Explore B2B Benefits
        </motion.button>
      </motion.div>
    </section>
  );
};

export default WhyBuyFromUs;
