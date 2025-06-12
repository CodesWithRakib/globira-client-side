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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="card bg-base-100 image-full w-full shadow-md overflow-hidden"
    >
      <figure>
        <img
          src={
            image ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt={title || "Offer Image"}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body items-start justify-end bg-gradient-to-t from-black/80 to-transparent p-5">
        {discount && (
          <p className="bg-white text-zinc-800 px-3 py-1 rounded-full text-xs font-semibold mb-2 shadow">
            {discount} OFF
          </p>
        )}

        <h2 className="card-title text-white text-lg sm:text-xl">
          {title || "Exclusive Deal"}
        </h2>

        <p className="text-sm text-gray-200">
          {description ||
            "Don't miss this limited-time deal on our best-selling products."}
        </p>

        {expiry && (
          <p className="text-xs text-gray-400 mt-1">Expires on: {expiry}</p>
        )}

        <div className="card-actions mt-4">
          <button className="btn btn-sm bg-[#FF6600] hover:bg-[#e65c00] text-white px-4">
            {buttonLabel}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExclusiveCard;
