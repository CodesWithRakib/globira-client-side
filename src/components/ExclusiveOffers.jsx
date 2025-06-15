import React from "react";
import { motion } from "motion/react";
import ExclusiveCard from "./ExclusiveCard";

const ExclusiveOffers = () => {
  const offers = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1720424742704-ceb95856fa22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFNraW5jYXJlJTIwRXNzZW50aWFsc3xlbnwwfHwwfHx8MA%3D%3D",
      title: "Skincare Essentials",
      description: "Get glowing with our dermatologist-approved beauty kits.",
      discount: "30%",
      expiry: "2025-07-01",
      buttonLabel: "Shop Now",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1691097913713-2e3ce8123a5b?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Fitness Gear",
      description: "Save big on resistance bands, yoga mats & more.",
      discount: "40%",
      expiry: "2025-07-10",
      buttonLabel: "Grab Deal",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Wireless Headphones",
      description: "Experience crystal clear audio with up to 50% off.",
      discount: "50%",
      expiry: "2025-07-20",
      buttonLabel: "Explore",
    },
    {
      id: 4,
      image:
        "https://plus.unsplash.com/premium_photo-1661499280481-8b8ffb4585b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8SG9tZSUyMERlY29yJTIwU2FsZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Home Decor Sale",
      description: "Transform your space with modern, cozy aesthetics.",
      discount: "20%",
      expiry: "2025-07-15",
      buttonLabel: "View Items",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1628454787246-cd6e6accc352?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RXhjbHVzaXZlJTIwTWVuJUUyJTgwJTk5cyUyMFdlYXJ8ZW58MHwwfDB8fHww",
      title: "Exclusive Men’s Wear",
      description: "Trendy shirts & formalwear at discounted prices.",
      discount: "35%",
      expiry: "2025-08-01",
      buttonLabel: "Buy Now",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1692645214212-ea7fdb37ca6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGFwdG9wJTIwQ2xlYXJhbmNlfGVufDB8MHwwfHx8MA%3D%3D",
      title: "Laptop Clearance",
      description: "Limited stock of top laptops with unbeatable prices.",
      discount: "45%",
      expiry: "2025-07-30",
      buttonLabel: "Claim Offer",
    },
  ];

  return (
    <div className="px-5 py-8 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
      <div className="mb-6">
        <div className="flex justify-between items-center gap-5 mb-2">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-[#FF6600]"
          >
            Exclusive Offers
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm md:text-base font-medium text-blue-600 hover:underline hover:text-blue-800 transition"
          >
            View All Offers
          </motion.button>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl"
        >
          Take advantage of our exclusive offers and get up to{" "}
          <span className="font-semibold text-red-500">50% off</span> on select
          products.
        </motion.p>
      </div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <ExclusiveCard offer={offer} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExclusiveOffers;
