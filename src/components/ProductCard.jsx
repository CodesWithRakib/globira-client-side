import React from "react";
import noImage from "/default.jpg";
import { useNavigate } from "react-router";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import SkeletonLoading from "./SkeletonLoading";

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
  const [liked, setLiked] = React.useState(false);

  if (loading) {
    return <SkeletonLoading></SkeletonLoading>;
  }

  return (
    <div className="relative rounded-xl border dark:border-zinc-800 shadow-sm dark:bg-zinc-950 bg-white flex flex-col overflow-hidden transition-all hover:shadow-lg group">
      {/* Wishlist icon */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-3 right-3 z-10 text-red-500 text-xl"
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Product Image with Quick View overlay */}
      <div className="relative overflow-hidden">
        <img
          src={productImage || noImage}
          onError={(e) => (e.target.src = noImage)}
          alt={productName}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
          <button
            onClick={() => navigate(`/product/${_id}`)}
            className="bg-white dark:bg-zinc-800 text-sm font-semibold px-4 py-2 rounded shadow hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all"
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
        <div>
          <h2 className="text-lg font-bold line-clamp-1">{productName}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {brandName}
          </p>
          <span className="inline-block mt-2 px-3 py-1 text-xs bg-amber-100 text-amber-700 rounded-full dark:bg-amber-800 dark:text-white">
            {category?.split("-").join(" ").toUpperCase()}
          </span>

          <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm mt-4">
          <p>
            <span className="font-semibold">Min Qty:</span> {minimumQuantity}
          </p>
          <p className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-yellow-500 ${i < rating ? "" : "opacity-30"}`}
              />
            ))}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-base font-bold text-primary dark:text-amber-500">
            ${price}
          </p>
          <button
            onClick={() => navigate(`/product/${_id}`)}
            className="bg-primary dark:bg-amber-700 text-white text-sm px-4 py-2 rounded hover:opacity-90 transition-all"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
