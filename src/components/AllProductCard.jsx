import React from "react";
import noImage from "/default.jpg";
import { useNavigate } from "react-router";
import {
  FaShoppingCart,
  FaEdit,
  FaEye,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import Rating from "react-rating";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { formatCategory } from "../Utils/formatCategory";

const AllProductCard = ({ product, onUpdate, onView }) => {
  const {
    _id,
    productName,
    brandName,
    productImage,
    price,
    category,
    description,
    minimumQuantity,
    rating = 0,
  } = product;
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col h-full rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
      data-tooltip-id={`product-card-${_id}`}
      data-tooltip-content={productName}
    >
      {/* Image with badge and quick view */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={productImage || noImage}
          alt={productName}
          onError={(e) => (e.target.src = noImage)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Stock badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
            minimumQuantity > 100
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {minimumQuantity > 100
            ? "In Stock"
            : `Low Stock (${minimumQuantity})`}
        </span>
        {/* Quick View */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView ? onView(_id) : navigate(`/product/${_id}`);
          }}
          className="absolute bottom-0 left-0 right-0 bg-black/70 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Quick view ${productName}`}
        >
          <FaEye size={14} /> Quick View
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Category */}
        <span className="inline-block w-fit px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-700 dark:text-blue-300">
          {formatCategory(category)}
        </span>

        {/* Title and Brand */}
        <h3
          className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          onClick={() => navigate(`/product/${_id}`)}
        >
          {productName}
        </h3>
        <h4 className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          by <span className="font-medium">{brandName}</span>
        </h4>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
          {description}
        </p>

        {/* Rating and Price */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Rating
              initialRating={rating}
              readonly
              fractions={2}
              emptySymbol={
                <FaRegStar className="text-gray-300 dark:text-zinc-600 text-sm" />
              }
              fullSymbol={<FaStar className="text-blue-500 text-sm" />}
            />
            <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              ({rating})
            </span>
          </div>
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            ${price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate ? onUpdate(_id) : navigate(`/update-product/${_id}`);
          }}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`Edit ${productName}`}
        >
          <FaEdit size={14} /> Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView ? onView(_id) : navigate(`/product/${_id}`);
          }}
          className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`View ${productName}`}
        >
          <FaEye size={14} /> View
        </button>
      </div>

      {/* Tooltip */}
      <Tooltip
        id={`product-card-${_id}`}
        place="top"
        className="!text-xs !py-1 !px-2 !bg-gray-800 !text-white"
      />
    </div>
  );
};

export default AllProductCard;
