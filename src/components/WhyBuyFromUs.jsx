import React from "react";
import { motion } from "motion/react";

const WhyBuyFromUs = () => {
  const whyBuyFeatures = [
    {
      id: 1,
      text: "Competitive wholesale pricing for maximum value",
      image: "https://i.ibb.co/V09jJKVz/profitable.jpg",
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      text: "Verified suppliers & trusted global brands",
      image: "https://i.ibb.co/DPGTQdFd/pngtree.png",
      color: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 3,
      text: "Transparent Minimum Order Quantities (MOQ)",
      image: "https://i.ibb.co/pBdYf45X/moq.jpg",
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 4,
      text: "Fast & reliable shipping across regions",
      image: "https://i.ibb.co/fzcr0c3S/free-shipping.jpg",
      color: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      id: 5,
      text: "Dedicated B2B support with real-time assistance",
      image: "https://i.ibb.co/vx2LD6cZ/organic-flat.jpg",
      color: "bg-red-100 dark:bg-red-900/30",
    },
    {
      id: 6,
      text: "Flexible payment options & secured checkout",
      image: "https://i.ibb.co/TDp3y15b/payment.jpg",
      color: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      id: 7,
      text: "Easy product returns and replacement policies",
      image: "https://i.ibb.co/DPMnPZTp/returns.jpg",
      color: "bg-indigo-100 dark:bg-indigo-900/30",
    },
    {
      id: 8,
      text: "Live inventory tracking & stock availability",
      image: "https://i.ibb.co/n8MCRLmc/inventory-control-system.jpg",
      color: "bg-orange-100 dark:bg-orange-900/30",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 dark:bg-[#010313] bg-white text-zinc-800 dark:text-white transition-colors duration-300">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-400 dark:to-amber-400 bg-clip-text text-transparent"
        >
          Why Buy From Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-zinc-600 dark:text-zinc-400 mt-3 text-lg max-w-2xl mx-auto"
        >
          Discover the benefits of choosing us as your trusted B2B wholesale
          partner
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {whyBuyFeatures.map((feature, i) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{
              duration: 0.4,
              delay: i * 0.1,
              hover: { duration: 0.2 },
            }}
            viewport={{ once: true, margin: "-50px" }}
            className={`p-6 ${feature.color} rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-800 transition-all duration-300`}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div
                className={`p-3 rounded-full ${feature.color
                  .replace("100", "50")
                  .replace("900/30", "800")} shadow-inner`}
              >
                <img
                  src={feature.image}
                  alt="icon"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <p className="text-zinc-800 dark:text-zinc-100 font-medium text-sm md:text-base">
                {feature.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-14"
      >
        <button className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-500 dark:to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
          <span className="relative z-10">
            Learn More About Our B2B Benefits
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-amber-700 dark:from-blue-600 dark:to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </motion.div>
    </section>
  );
};

export default WhyBuyFromUs;
