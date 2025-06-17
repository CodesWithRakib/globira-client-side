import React from "react";
import { motion } from "motion/react";
import Rating from "react-rating";
import { FaStar, FaRegStar, FaStore } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import noImage from "/default.jpg";
import { useNavigate } from "react-router";

const RecentProductCard = ({ product }) => {
  const {
    _id,
    brandName,
    productName,
    productImage,
    price,
    rating,
    description,
    mainQuantity,
    minimumQuantity,
    sellerName,
    sellerPhotoURL,
    createdAt,
  } = product;

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.4 }}
      className="group bg-white dark:bg-zinc-950 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-zinc-700 overflow-hidden hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={productImage || noImage}
          onError={(e) => (e.target.src = noImage)}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Stock Status Badge */}
        <span
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
            mainQuantity > minimumQuantity
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
          }`}
        >
          {mainQuantity > minimumQuantity ? "In Stock" : "Low Stock"}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Title and Brand */}
        <div>
          <h2
            className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-primary dark:hover:text-amber-500 transition-colors cursor-pointer"
            onClick={() => navigate(`/product/${_id}`)}
          >
            {productName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            by{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {brandName}
            </span>
          </p>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600 dark:text-amber-500">
            ${price.toLocaleString("en-IN")}
          </span>
          <div className="flex items-center gap-1">
            <Rating
              initialRating={parseFloat(rating)}
              readonly
              emptySymbol={<FaRegStar className="text-yellow-400 text-sm" />}
              fullSymbol={<FaStar className="text-yellow-500 text-sm" />}
              fractions={2}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({rating})
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>

        {/* Stock Info */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 dark:bg-zinc-700/50 p-2 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Available</p>
            <p className="font-medium text-gray-700 dark:text-gray-200">
              {mainQuantity} units
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-zinc-700/50 p-2 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Min Order</p>
            <p className="font-medium text-gray-700 dark:text-gray-200">
              {minimumQuantity} units
            </p>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-700">
          <div className="flex items-center gap-2">
            {sellerPhotoURL ? (
              <img
                src={sellerPhotoURL}
                alt={sellerName}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center">
                <FaStore className="text-gray-500 text-xs" />
              </div>
            )}
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
              {sellerName}
            </span>
          </div>
          <p className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(createdAt))} ago
          </p>
        </div>

        {/* View Button */}
        <button
          onClick={() => navigate(`/product/${_id}`)}
          className="mt-3 w-full bg-orange-600 hover:bg-orange-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default RecentProductCard;
