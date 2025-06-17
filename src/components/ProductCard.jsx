import React from "react";
import noImage from "/default.jpg";
import { useNavigate } from "react-router";
import { FaHeart, FaRegHeart, FaStar, FaEye } from "react-icons/fa";
import SkeletonLoading from "./SkeletonLoading";
import { formatCategory } from "../Utils/formatCategory";

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
  const [isLiked, setIsLiked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  if (loading) {
    return <SkeletonLoading />;
  }

  return (
    <div
      className="relative rounded-xl shadow-sm dark:bg-zinc-900 bg-white flex flex-col overflow-hidden transition-all hover:shadow-lg group border border-gray-100 dark:border-zinc-800 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Badge - Improved Design */}
      {category && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary to-amber-500 text-white shadow-sm">
            {formatCategory(category)}
          </span>
        </div>
      )}

      {/* Wishlist icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform"
        aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isLiked ? (
          <FaHeart className="text-red-500 text-lg" />
        ) : (
          <FaRegHeart className="text-gray-600 dark:text-gray-300 text-lg hover:text-red-500 transition-colors" />
        )}
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={productImage || noImage}
          onError={(e) => (e.target.src = noImage)}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => navigate(`/product/${_id}`)}
            className="flex items-center gap-2 bg-white dark:bg-zinc-800 text-sm font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all"
            aria-label="Quick view"
          >
            <FaEye className="text-primary dark:text-amber-400" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
        <div>
          <h2 className="text-lg font-bold line-clamp-1">{productName}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            by {brandName}
          </p>

          <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 line-clamp-2 min-h-[40px]">
            {description}
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1">
              <span className="font-medium">Min Qty:</span>
              <span>{minimumQuantity}</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(rating || 0)
                      ? "text-yellow-500"
                      : "text-gray-300 dark:text-zinc-600"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">
                ({rating || 0})
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <p className="text-lg font-bold text-primary dark:text-amber-400">
              ${price}
            </p>
            <button
              onClick={() => navigate(`/product/${_id}`)}
              className="bg-primary dark:bg-amber-700 hover:bg-primary/90 dark:hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              aria-label={`View details of ${productName}`}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
