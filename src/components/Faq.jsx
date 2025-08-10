import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const faqData = [
    {
      id: 1,
      question: "What is the minimum order quantity (MOQ) for products?",
      answer:
        "Each product has a specified minimum order quantity (MOQ). You must order at least the MOQ to proceed with the purchase. The MOQ is clearly displayed on each product page.",
      category: "Ordering",
    },
    {
      id: 2,
      question: "Can I get discounts on bulk orders?",
      answer:
        "Yes! We offer tiered discounts on bulk purchases. The more you order, the better the price. Check the 'Exclusive Offers' section for current deals or contact our sales team for custom pricing.",
      category: "Pricing",
    },
    {
      id: 3,
      question: "What payment methods are accepted?",
      answer:
        "We accept payments via bank transfer, credit card, and select B2B financing partners. For large volume orders, customized payment terms can be discussed.",
      category: "Payments",
    },
    {
      id: 4,
      question: "How long does shipping take for wholesale orders?",
      answer:
        "Shipping times depend on the order size and delivery location. Typically, domestic orders take 5-10 business days, while international orders may take 10-20 business days. Expedited options are available.",
      category: "Shipping",
    },
    {
      id: 5,
      question: "Can I request a sample before placing a bulk order?",
      answer:
        "Yes, sample orders are possible for many products. Please contact our support team or the respective supplier to request a sample.",
      category: "Samples",
    },
    {
      id: 6,
      question: "Are all products sourced from verified suppliers?",
      answer:
        "Yes, we only work with verified and trusted suppliers to ensure product quality and consistency. Our platform is designed to maintain high standards across all categories.",
      category: "Suppliers",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Get unique categories
  const categories = [...new Set(faqData.map((item) => item.category))];

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
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Frequently Asked{" "}
                <span className="text-blue-600">Questions</span>
              </h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Quick answers to common questions about our wholesale platform
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => navigate("/contact")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact support
          </motion.button>
        </div>
        <div className="h-1 w-20 bg-blue-500 rounded-full" />
      </motion.div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveIndex(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeIndex === null
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          All Categories
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              const firstIndexInCategory = faqData.findIndex(
                (item) => item.category === category
              );
              setActiveIndex(
                activeIndex === firstIndexInCategory
                  ? null
                  : firstIndexInCategory
              );
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeIndex !== null &&
              faqData[activeIndex]?.category === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className={`w-full text-left p-5 transition-all duration-200 ${
                activeIndex === index
                  ? "bg-blue-50 dark:bg-blue-900/20"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-content-${faq.id}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  id={`faq-content-${faq.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 pl-16 text-gray-700 dark:text-gray-300">
                    <div className="relative pl-4 border-l-2 border-blue-500">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA for mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-8 sm:hidden"
      >
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Didn&apos;t find what you&apos;re looking for?
        </p>
        <motion.button
          onClick={() => navigate("/contact")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Mail className="w-5 h-5" />
          Contact Our Support Team
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Faq;
