import React from "react";
import { motion } from "motion/react";
import ExclusiveCard from "./ExclusiveCard";
import { ArrowRight } from "lucide-react";

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
      bgColor: "bg-pink-50",
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
      bgColor: "bg-blue-50",
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
      bgColor: "bg-purple-50",
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
      bgColor: "bg-amber-50",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1628454787246-cd6e6accc352?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RXhjbHVzaXZlJTIwTWVuJUUyJTgwJTk5cyUyMFdlYXJ8ZW58MHwwfDB8fHww",
      title: "Exclusive Men's Wear",
      description: "Trendy shirts & formalwear at discounted prices.",
      discount: "35%",
      expiry: "2025-08-01",
      buttonLabel: "Buy Now",
      bgColor: "bg-teal-50",
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
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Exclusive <span className="text-amber-600">Offers</span>
              </h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Limited-time deals on our most popular products
              </p>
            </div>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 dark:hover:text-amber-500 font-medium transition-colors"
            >
              View all offers <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="h-1 w-20 bg-amber-500 rounded-full" />
        </motion.div>

        {/* Offers Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <ExclusiveCard offer={offer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusiveOffers;
