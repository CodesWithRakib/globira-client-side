import React from "react";
import { motion } from "motion/react";
import { FiClock, FiArrowRight } from "react-icons/fi";

const ExclusiveCard = ({ offer }) => {
  const {
    image,
    title,
    description,
    discount,
    expiry,
    buttonLabel = "View Offer",
    bgColor = "bg-gray-50",
  } = offer || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative w-full h-[380px] sm:h-[420px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
          }
          alt={title || "Offer Image"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </motion.div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        {/* Discount Badge */}
        {discount && (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="absolute top-5 right-5 bg-white text-amber-600 px-3 py-1 rounded-full text-sm sm:text-base font-bold shadow-md"
          >
            {discount} OFF
          </motion.div>
        )}

        {/* Content */}
        <div className="space-y-2 sm:space-y-3">
          {/* Title */}
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white text-2xl sm:text-3xl font-bold leading-tight"
          >
            {title || "Exclusive Deal"}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base line-clamp-2"
          >
            {description || "Limited-time offer on premium products"}
          </motion.p>

          {/* Expiry Date */}
          {expiry && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center text-xs sm:text-sm text-amber-100"
            >
              <FiClock className="mr-1.5" />
              <span>Offer ends: {expiry}</span>
            </motion.div>
          )}

          {/* Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-3 sm:pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, x: 3 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center px-5 py-2.5 ${bgColor} bg-opacity-90 backdrop-blur-sm text-amber-700 font-medium rounded-full border border-amber-200/30 hover:bg-opacity-100 transition-all`}
            >
              {buttonLabel}
              <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-amber-400/10 rounded-full filter blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-orange-400/10 rounded-full filter blur-xl"></div>
      </div>
    </motion.div>
  );
};

export default ExclusiveCard;
