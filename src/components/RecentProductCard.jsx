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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={productImage || noImage}
          onError={(e) => (e.target.src = noImage)}
          alt={productName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Stock Badge */}
        <span
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
            mainQuantity > minimumQuantity
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
          }`}
        >
          {mainQuantity > minimumQuantity ? "In Stock" : "Low Stock"}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3 flex flex-col flex-grow">
        {/* Title */}
        <div>
          <h3
            onClick={() => navigate(`/product/${_id}`)}
            className="text-lg font-semibold text-gray-900 dark:text-white mb-1 hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer transition-colors"
          >
            {productName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Brand: <span className="font-medium">{brandName}</span>
          </p>
        </div>

        {/* Price + Rating */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
            ${price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1">
            <Rating
              initialRating={parseFloat(rating)}
              readonly
              emptySymbol={<FaRegStar className="text-gray-300 text-sm" />}
              fullSymbol={<FaStar className="text-yellow-400 text-sm" />}
              fractions={2}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              {rating}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 flex-grow">
          {description || "No description available."}
        </p>

        {/* Quantity Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-gray-500 dark:text-gray-400">Available</p>
            <p className="font-medium">{mainQuantity} units</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-gray-500 dark:text-gray-400">Min Order</p>
            <p className="font-medium">{minimumQuantity} units</p>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {sellerPhotoURL ? (
              <img
                src={sellerPhotoURL}
                alt={sellerName}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <FaStore className="text-gray-500 dark:text-gray-300 text-xs" />
              </div>
            )}
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {sellerName}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(createdAt))} ago
          </p>
        </div>

        {/* View Button */}
        <button
          onClick={() => navigate(`/product/${_id}`)}
          className="mt-4 w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 text-white py-2 rounded-md text-sm font-medium transition-colors"
        >
          View Product
        </button>
      </div>
    </motion.div>
  );
};

export default RecentProductCard;
