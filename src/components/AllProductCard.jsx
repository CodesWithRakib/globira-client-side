import React from "react";
import noImage from "/default.jpg";
import { useNavigate } from "react-router";
import { FaShoppingCart, FaEdit, FaEye } from "react-icons/fa";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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

  // Format price with 2 decimal places
  const formattedPrice = Number(price).toFixed(2);

  // Format category name
  const formattedCategory = category
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div
      className="flex flex-col h-full rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
      data-tooltip-id={`product-card-${_id}`}
      data-tooltip-content={productName}
    >
      {/* Product Image with Quick Actions */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={productImage || noImage}
          onError={(e) => (e.target.src = noImage)}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Stock Status Badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
            minimumQuantity > 100
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {minimumQuantity > 100
            ? "In Stock"
            : `Low Stock (${minimumQuantity})`}
        </span>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView ? onView(_id) : navigate(`/product/${_id}`);
          }}
          className="absolute bottom-0 left-0 right-0 bg-black/70 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2"
          aria-label={`Quick view ${productName}`}
        >
          <FaEye /> Quick View
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Category */}
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 text-blue-600 dark:text-blue-300 w-fit">
          {formattedCategory}
        </span>

        {/* Title and Brand */}
        <h3
          className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1 hover:text-primary dark:hover:text-amber-400 transition-colors cursor-pointer"
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
              emptySymbol={
                <FaRegStar className="text-gray-300 dark:text-gray-600 text-sm" />
              }
              fullSymbol={<FaStar className="text-yellow-400 text-sm" />}
              fractions={2}
            />
            <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              ({rating})
            </span>
          </div>
          <div className="text-lg font-bold text-primary dark:text-amber-400">
            ${formattedPrice}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate ? onUpdate(_id) : navigate(`/update-product/${_id}`);
          }}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
          aria-label={`Update ${productName}`}
        >
          <FaEdit size={14} /> Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView ? onView(_id) : navigate(`/product/${_id}`);
          }}
          className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
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
