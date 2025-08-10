import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import ExclusiveCard from "../components/ExclusiveCard";

const AllOffers = () => {
  const navigate = useNavigate();

  const offersData = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1720424742704-ceb95856fa22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFNraW5jYXJlJTIwRXNzZW50aWFsc3xlbnwwfHwwfHx8MA%3D%3D",
      title: "Skincare Essentials",
      description: "Get glowing with our dermatologist-approved beauty kits.",
      discount: "30%",
      expiry: "2025-07-01",
      buttonLabel: "Shop Now",
      bgColor: "bg-blue-100",
      category: "health-beauty",
      details:
        "Complete skincare routine including cleanser, toner, serum, and moisturizer. Suitable for all skin types. Limited stock available.",
      terms:
        "Offer valid until July 1, 2025 or while supplies last. Cannot be combined with other offers.",
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
      bgColor: "bg-blue-100",
      category: "sports-fitness",
      details:
        "Premium fitness equipment bundle. Includes resistance bands (5 levels), non-slip yoga mat, and foam roller. Perfect for home workouts.",
      terms:
        "Discount applies to selected items only. Free shipping on orders over $50.",
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
      bgColor: "bg-blue-100",
      category: "electronics-gadgets",
      details:
        "Noise-cancelling wireless headphones with 30-hour battery life. Includes carrying case and charging cable. Available in black and white.",
      terms: "Limited to 2 per customer. While supplies last.",
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
      bgColor: "bg-blue-100",
      category: "home-kitchen-appliances",
      details:
        "Curated collection of modern home decor items including wall art, throw pillows, and decorative accents. Mix and match styles available.",
      terms:
        "Discount applies to entire home decor collection. Excludes furniture items.",
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
      bgColor: "bg-blue-100",
      category: "fashion-apparel",
      details:
        "Premium men's clothing collection. Includes dress shirts, casual tees, and tailored pants. Sizes S-XXL available.",
      terms: "Final sale items excluded. Free returns within 30 days.",
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
      bgColor: "bg-blue-100",
      category: "electronics-gadgets",
      details:
        "Last-gen models with premium specs. Includes 1-year warranty. Models from top brands available. SSD storage and full HD displays.",
      terms:
        "Limited quantities. No price matching. Includes manufacturer warranty only.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-blue-700 dark:text-blue-300 font-medium transition-colors shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </motion.button>
            <div className="flex-grow">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                All Exclusive{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  Offers
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
                Browse all our current promotions and limited-time deals
              </p>
            </div>
          </div>
        </motion.div>

        {/* Offers Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {offersData.map((offer, index) => (
            <motion.div
              key={offer.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <ExclusiveCard offer={offer} expandedView={true} />
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="mt-20 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AllOffers;
