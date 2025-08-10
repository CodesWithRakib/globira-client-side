import React, { useState, useEffect } from "react";
import noImage from "/default.jpg";
import { useNavigate } from "react-router";
import { FaHeart, FaRegHeart, FaStar, FaEye } from "react-icons/fa";
import SkeletonLoading from "./SkeletonLoading";
import { formatCategory } from "../Utils/formatCategory";
import { toast } from "react-hot-toast";

const ProductCard = ({ product, loading }) => {
  const {
    productName,
    brandName,
    productImage,
    price,
    category,
    description,
    minimumQuantity,
    rating,
    _id,
  } = product || {};
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

  if (loading) return <SkeletonLoading />;

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all hover:shadow-lg group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category badge */}
      {category && (
        <span className="absolute top-3 left-3 z-10 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white shadow-sm">
          {formatCategory(category)}
        </span>
      )}

      {/* Wishlist button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow hover:scale-110 transition-transform"
        aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isLiked ? (
          <FaHeart className="text-red-500 text-lg" />
        ) : (
          <FaRegHeart className="text-gray-600 dark:text-gray-300 text-lg hover:text-red-500 transition-colors" />
        )}
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={productImage || noImage}
          alt={productName}
          onError={(e) => (e.target.src = noImage)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-black/25 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => navigate(`/product/${_id}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-zinc-800 shadow hover:bg-gray-100 dark:hover:bg-zinc-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaEye className="text-blue-500 dark:text-blue-400" />
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* Title & Brand */}
        <div>
          <h3 className="text-lg font-bold line-clamp-1 text-gray-900 dark:text-white">
            {productName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            by {brandName}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2 min-h-[40px]">
            {description}
          </p>
        </div>

        {/* MOQ & Rating */}
        <div className="flex justify-between text-sm items-center mt-2">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            Min Qty: {minimumQuantity}
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-xs ${
                  i < Math.floor(rating || 0)
                    ? "text-blue-500"
                    : "text-gray-300 dark:text-zinc-600"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({rating || 0})</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="mt-auto pt-3 flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            ${price.toLocaleString("en-IN")}
          </span>
          <button
            onClick={() => navigate(`/product/${_id}`)}
            className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white text-sm px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`View details of ${productName}`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
