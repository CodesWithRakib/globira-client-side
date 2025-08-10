import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Check,
  Shield,
  Truck,
  CreditCard,
  Headset,
  Box,
  ChartBar,
} from "lucide-react";
import useTitle from "../hooks/useTitle";

const B2BBenefitsPage = () => {
  const navigate = useNavigate();
  useTitle("B2B Benefits");

  const benefits = [
    {
      id: 1,
      title: "Wholesale Pricing",
      description:
        "Enjoy exclusive wholesale rates with volume discounts that increase with your order quantity",
      icon: <Check className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      title: "Verified Suppliers",
      description:
        "All our suppliers undergo strict verification to ensure product quality and reliability",
      icon: <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 3,
      description:
        "Get real-time inventory updates and accurate stock levels for better planning",
      title: "Live Inventory Tracking",
      icon: <Box className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 4,
      title: "Global Logistics",
      description:
        "Our worldwide shipping network ensures timely delivery to your location",
      icon: <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 5,
      title: "Dedicated Account Managers",
      description:
        "Personalized support from our B2B specialists for your business needs",
      icon: <Headset className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 6,
      title: "Flexible Payment Options",
      description:
        "Multiple secure payment methods including net terms for qualified businesses",
      icon: <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 7,
      title: "Business Analytics",
      description:
        "Access to purchasing reports and analytics to optimize your procurement",
      icon: <ChartBar className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 8,
      title: "Custom Solutions",
      description:
        "Tailored product sourcing and private label options available",
      icon: <Check className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex justify-between items-start mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>

          <div className="text-center flex-grow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-5 py-2.5 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 text-blue-800 dark:text-blue-200 text-sm font-medium shadow-sm"
            >
              B2B SOLUTIONS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4"
            >
              Business Benefits Program
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Exclusive advantages designed to help your business grow and save
              on procurement
            </motion.p>
          </div>

          {/* Empty div for layout balance */}
          <div className="w-20"></div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`rounded-2xl p-6 border border-gray-200 dark:border-gray-700 ${benefit.color} bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all h-full`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 mb-6 shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 flex-grow">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-8 md:p-12 border border-blue-200 dark:border-blue-800/50 shadow-sm"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Ready to unlock wholesale benefits?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Register your business today to access exclusive pricing and
              features
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Create Business Account
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
                className="px-8 py-3.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-xl transition-colors duration-200 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Contact Sales
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default B2BBenefitsPage;
