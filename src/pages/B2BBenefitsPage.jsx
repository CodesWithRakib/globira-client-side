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
      icon: <Check className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      color: "bg-amber-50 dark:bg-amber-900/10",
    },
    {
      id: 2,
      title: "Verified Suppliers",
      description:
        "All our suppliers undergo strict verification to ensure product quality and reliability",
      icon: (
        <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
      ),
      color: "bg-emerald-50 dark:bg-emerald-900/10",
    },
    {
      id: 3,
      description:
        "Get real-time inventory updates and accurate stock levels for better planning",
      title: "Live Inventory Tracking",
      icon: <Box className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      color: "bg-purple-50 dark:bg-purple-900/10",
    },
    {
      id: 4,
      title: "Global Logistics",
      description:
        "Our worldwide shipping network ensures timely delivery to your location",
      icon: <Truck className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
      color: "bg-sky-50 dark:bg-sky-900/10",
    },
    {
      id: 5,
      title: "Dedicated Account Managers",
      description:
        "Personalized support from our B2B specialists for your business needs",
      icon: <Headset className="w-6 h-6 text-red-600 dark:text-red-400" />,
      color: "bg-red-50 dark:bg-red-900/10",
    },
    {
      id: 6,
      title: "Flexible Payment Options",
      description:
        "Multiple secure payment methods including net terms for qualified businesses",
      icon: (
        <CreditCard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      ),
      color: "bg-indigo-50 dark:bg-indigo-900/10",
    },
    {
      id: 7,
      title: "Business Analytics",
      description:
        "Access to purchasing reports and analytics to optimize your procurement",
      icon: <ChartBar className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      color: "bg-teal-50 dark:bg-teal-900/10",
    },
    {
      id: 8,
      title: "Custom Solutions",
      description:
        "Tailored product sourcing and private label options available",
      icon: <Check className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      color: "bg-orange-50 dark:bg-orange-900/10",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex justify-between items-start mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="text-center flex-grow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-sm font-medium"
            >
              B2B SOLUTIONS
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Business Benefits Program
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Exclusive advantages designed to help your business grow and save
              on procurement
            </p>
          </div>

          {/* Empty div for layout balance */}
          <div className="w-20"></div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-xl p-8 border border-gray-200 dark:border-gray-700 ${benefit.color} hover:shadow-lg transition-all`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 md:p-12 border border-amber-200 dark:border-gray-700"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to unlock wholesale benefits?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Register your business today to access exclusive pricing and
              features
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 text-white font-medium rounded-lg transition-colors"
              >
                Create Business Account
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-3 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-600 transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default B2BBenefitsPage;
