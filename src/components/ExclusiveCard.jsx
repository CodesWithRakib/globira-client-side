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
  } = offer || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          }
          alt={title || "Offer Image"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </motion.div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        {/* Top-right Discount Badge */}
        {discount && (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="absolute top-6 right-6 bg-white text-orange-600 px-4 py-2 rounded-full text-lg font-extrabold shadow-lg"
          >
            {discount} OFF
          </motion.div>
        )}

        {/* Content */}
        <div className="space-y-3">
          {/* Title */}
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white text-3xl font-bold tracking-tight"
          >
            {title || "Exclusive Deal"}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base line-clamp-2"
          >
            {description ||
              "Don't miss this limited-time deal on our best-selling products."}
          </motion.p>

          {/* Expiry Date */}
          {expiry && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center text-sm text-gray-300"
            >
              <FiClock className="mr-2" />
              <span>Expires: {expiry}</span>
            </motion.div>
          )}

          {/* Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-amber-600 transition-all"
            >
              {buttonLabel}
              <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-400/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-orange-400/20 rounded-full filter blur-3xl"></div>
      </div>
    </motion.div>
  );
};

export default ExclusiveCard;
