import React from "react";
import { motion } from "motion/react";

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
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          }
          alt={title || "Offer Image"}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start">
        {/* Discount Badge */}
        {discount && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-bold mb-3 shadow-sm"
          >
            {discount} OFF
          </motion.div>
        )}

        {/* Title */}
        <h2 className="text-white text-2xl font-bold mb-2">
          {title || "Exclusive Deal"}
        </h2>

        {/* Description */}
        <p className="text-gray-200 text-sm mb-4 line-clamp-2">
          {description ||
            "Don't miss this limited-time deal on our best-selling products."}
        </p>

        {/* Expiry Date */}
        {expiry && (
          <div className="flex items-center text-xs text-gray-300 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Expires: {expiry}
          </div>
        )}

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium rounded-full hover:from-orange-700 hover:to-amber-700 transition-all"
        >
          {buttonLabel}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ExclusiveCard;
