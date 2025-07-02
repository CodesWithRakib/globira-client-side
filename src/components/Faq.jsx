import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, Mail, MessageSquare } from "lucide-react";
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

  return (
    <section className="py-16 px-4 sm:px-6 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-full">
            <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              HELP CENTER
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Quick answers to common questions about our wholesale platform
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full text-left p-5 transition-all duration-200 border border-gray-200 dark:border-gray-700 rounded-lg ${
                  activeIndex === index
                    ? "bg-amber-50 dark:bg-amber-900/20"
                    : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-content-${faq.id}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                      {faq.question}
                    </h3>
                  </div>
                  {activeIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
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
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-3 text-gray-700 dark:text-gray-300 border-l-4 border-amber-500 ml-4 bg-white dark:bg-gray-800 rounded-md">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Didn&apos;t find what you&apos;re looking for?
          </p>
          <motion.button
            onClick={() => navigate("/contact")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 text-white font-medium rounded-lg transition-colors"
          >
            <Mail className="w-5 h-5" />
            Contact Our Support Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
