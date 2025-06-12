import React from "react";
import { motion } from "motion/react";

const WhyBuyFromUs = () => {
  const whyBuyFeatures = [
    {
      id: 1,
      text: "Competitive wholesale pricing for maximum value",
      image: "https://i.ibb.co/V09jJKVz/profitable.jpg",
    },
    {
      id: 2,
      text: "Verified suppliers & trusted global brands",
      image: "https://i.ibb.co/DPGTQdFd/pngtree.png",
    },
    {
      id: 3,
      text: "Transparent Minimum Order Quantities (MOQ)",
      image: "https://i.ibb.co/pBdYf45X/moq.jpg",
    },
    {
      id: 4,
      text: "Fast & reliable shipping across regions",
      image: "https://i.ibb.co/fzcr0c3S/free-shipping.jpg",
    },
    {
      id: 5,
      text: "Dedicated B2B support with real-time assistance",
      image: "https://i.ibb.co/vx2LD6cZ/organic-flat.jpg",
    },
    {
      id: 6,
      text: "Flexible payment options & secured checkout",
      image: "https://i.ibb.co/TDp3y15b/payment.jpg",
    },
    {
      id: 7,
      text: "Easy product returns and replacement policies",
      image: "https://i.ibb.co/DPMnPZTp/returns.jpg",
    },
    {
      id: 8,
      text: "Live inventory tracking & stock availability",
      image: "https://i.ibb.co/n8MCRLmc/inventory-control-system.jpg",
    },
  ];

  return (
    <section className="py-14 px-6 md:px-12 dark:bg-zinc-950 bg-white text-zinc-800 dark:text-white transition duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Why Buy From Us</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-base max-w-xl mx-auto">
          Discover the benefits of choosing us as your trusted B2B wholesale
          partner.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {whyBuyFeatures.map((feature, i) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-5 bg-zinc-100 dark:bg-zinc-900 rounded-xl shadow-sm flex gap-4 items-center "
          >
            <div className="text-2xl flex-shrink-0">
              <img
                src={feature.image}
                alt="icon"
                className="h-8 w-8 rounded-full"
              />
            </div>
            <p className="text-zinc-700 dark:text-zinc-200 font-medium">
              {feature.text}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-2 rounded-full font-semibold hover:scale-105 transition">
          Learn More About Our B2B Benefits
        </button>
      </div>
    </section>
  );
};

export default WhyBuyFromUs;
