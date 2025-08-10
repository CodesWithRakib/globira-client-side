import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Rating from "react-rating";
import {
  FaStar,
  FaRegStar,
  FaStore,
  FaEye,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import noImage from "/default.jpg";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

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
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if product is in wishlist on component mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsLiked(wishlist.some((item) => item._id === _id));
  }, [_id]);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();

    // Get current wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isLiked) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item) => item._id !== _id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsLiked(false);
      toast.success("Removed from wishlist");
    } else {
      // Add to wishlist
      // Check if already exists (shouldn't happen but just in case)
      if (!wishlist.some((item) => item._id === _id)) {
        const updatedWishlist = [...wishlist, product];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setIsLiked(true);
        toast.success("Added to wishlist");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={productImage || noImage}
          onError={(e) => (e.target.src = noImage)}
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow hover:scale-110 transition-transform"
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isLiked ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-600 dark:text-gray-300 text-lg hover:text-red-500 transition-colors" />
          )}
        </button>

        {/* Stock Badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
            mainQuantity > minimumQuantity
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}
        >
          {mainQuantity > minimumQuantity ? "In Stock" : "Low Stock"}
        </span>

        {/* Quick View Button */}
        <button
          onClick={() => navigate(`/product/${_id}`)}
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="View product"
        >
          <div className="bg-white dark:bg-gray-800 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg">
            <FaEye className="text-blue-600 dark:text-blue-400 text-xl" />
          </div>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-4 flex flex-col flex-grow">
        {/* Title */}
        <div>
          <h3
            onClick={() => navigate(`/product/${_id}`)}
            className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors line-clamp-1"
          >
            {productName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Brand:{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {brandName}
            </span>
          </p>
        </div>

        {/* Price + Rating */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1">
            <Rating
              initialRating={parseFloat(rating)}
              readonly
              emptySymbol={
                <FaRegStar className="text-gray-300 dark:text-gray-600 text-sm" />
              }
              fullSymbol={
                <FaStar className="text-blue-500 dark:text-blue-300 text-sm" />
              }
              fractions={2}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              {rating}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-grow">
          {description || "No description available."}
        </p>

        {/* Quantity Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/50">
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              Available
            </p>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {mainQuantity} units
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/50">
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              Min Order
            </p>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {minimumQuantity} units
            </p>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {sellerPhotoURL ? (
              <img
                src={sellerPhotoURL}
                alt={sellerName}
                className="w-7 h-7 rounded-full object-cover border border-gray-200 dark:border-gray-600"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-700">
                <FaStore className="text-blue-600 dark:text-blue-400 text-xs" />
              </div>
            )}
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate max-w-[100px]">
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
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center gap-2"
        >
          <FaEye className="text-sm" />
          View Product
        </button>
      </div>
    </motion.div>
  );
};

export default RecentProductCard;
