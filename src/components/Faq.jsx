import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "What is the minimum order quantity (MOQ) for products?",
      answer:
        "Each product has a specified minimum order quantity (MOQ). You must order at least the MOQ to proceed with the purchase. The MOQ is clearly displayed on each product page.",
    },
    {
      id: 2,
      question: "Can I get discounts on bulk orders?",
      answer:
        "Yes! We offer tiered discounts on bulk purchases. The more you order, the better the price. Check the 'Exclusive Offers' section for current deals or contact our sales team for custom pricing.",
    },
    {
      id: 3,
      question: "What payment methods are accepted?",
      answer:
        "We accept payments via bank transfer, credit card, and select B2B financing partners. For large volume orders, customized payment terms can be discussed.",
    },
    {
      id: 4,
      question: "How long does shipping take for wholesale orders?",
      answer:
        "Shipping times depend on the order size and delivery location. Typically, domestic orders take 5-10 business days, while international orders may take 10-20 business days. Expedited options are available.",
    },
    {
      id: 5,
      question: "Can I request a sample before placing a bulk order?",
      answer:
        "Yes, sample orders are possible for many products. Please contact our support team or the respective supplier to request a sample.",
    },
    {
      id: 6,
      question: "Are all products sourced from verified suppliers?",
      answer:
        "Yes, we only work with verified and trusted suppliers to ensure product quality and consistency. Our platform is designed to maintain high standards across all categories.",
    },
  ];
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-400 dark:to-amber-400 bg-clip-text text-transparent mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Find answers to common questions about our wholesale platform
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden"
            >
              <div
                onClick={() => toggleAccordion(index)}
                className={`p-5 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-white dark:bg-zinc-900 shadow-md border border-gray-200 dark:border-zinc-700"
                    : "bg-white/80 dark:bg-zinc-900/80 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-gray-100 dark:border-zinc-800"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                    {faq.question}
                  </h3>
                  {activeIndex === index ? (
                    <FiChevronUp className="text-gray-500 dark:text-gray-400 text-xl" />
                  ) : (
                    <FiChevronDown className="text-gray-500 dark:text-gray-400 text-xl" />
                  )}
                </div>
              </div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-2 text-gray-600 dark:text-gray-300 border-l-2 border-blue-500 ml-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions?
          </p>
          <button className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-500 dark:to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
            <span className="relative z-10">Contact Our Support Team</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-amber-700 dark:from-blue-600 dark:to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
