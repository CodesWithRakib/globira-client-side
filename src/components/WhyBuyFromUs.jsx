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
      icon: <DollarSign className="w-7 h-7" />,
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: 2,
      title: "Verified Suppliers",
      description: "Trusted global brands",
      icon: <CheckCircle className="w-7 h-7" />,
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      id: 3,
      title: "Transparent MOQ",
      description: "Clear minimum order quantities",
      icon: <Package className="w-7 h-7" />,
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      id: 4,
      title: "Fast Shipping",
      description: "Reliable global delivery",
      icon: <Truck className="w-7 h-7" />,
      color: "from-yellow-500 to-yellow-700",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      id: 5,
      title: "Dedicated Support",
      description: "Real-time B2B assistance",
      icon: <HeadphonesIcon className="w-7 h-7" />,
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      id: 6,
      title: "Flexible Payments",
      description: "Secure checkout options",
      icon: <CreditCard className="w-7 h-7" />,
      color: "from-indigo-500 to-indigo-700",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      id: 7,
      title: "Easy Returns",
      description: "Hassle-free policies",
      icon: <RefreshCw className="w-7 h-7" />,
      color: "from-pink-500 to-pink-700",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
    },
    {
      id: 8,
      title: "Live Inventory",
      description: "Real-time stock tracking",
      icon: <BarChart3 className="w-7 h-7" />,
      color: "from-teal-500 to-teal-700",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-100 dark:bg-blue-900/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-indigo-100 dark:bg-indigo-900/10 blur-3xl"></div>
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
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <span className="ml-2">B2B ADVANTAGES</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Our Platform
                </span>
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Discover the benefits that make us the preferred wholesale
                partner for businesses worldwide
              </p>
            </div>

            <motion.button
              onClick={() => navigate("/b2b-benefits")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-full group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-500 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center">
                Explore B2B Benefits
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.button>
          </div>

          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-7 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              {/* Background Decoration */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 rounded-full ${feature.bgColor} blur-2xl opacity-50 -mr-12 -mt-12`}
              ></div>

              {/* Icon Container */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div
                  className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Indicator */}
                <div className="mt-4 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-500"></div>
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
          className="text-center mt-12 lg:hidden"
        >
          <motion.button
            onClick={() => navigate("/b2b-benefits")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-full group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center">
              Explore B2B Benefits
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyBuyFromUs;
