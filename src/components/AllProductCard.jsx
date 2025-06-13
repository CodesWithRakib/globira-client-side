import React from "react";
import noImage from "/default.jpg";
import { useNavigate } from "react-router";
import { FaShoppingCart, FaEdit } from "react-icons/fa";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

const AllProductCard = ({ product }) => {
  const {
    _id,
    productName,
    brandName,
    productImage,
    price,
    category,
    description,
    minimumQuantity,
    rating = 0, // Default to 0 if rating is undefined
  } = product;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={productImage || noImage}
          onError={(e) => (e.target.src = noImage)}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Stock Status Badge */}
        <span
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
            minimumQuantity > 100
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {minimumQuantity > 100 ? "In Stock" : "Low Stock"}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-grow">
        {/* Category */}
        <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          {category.split("-").join(" ").toUpperCase()}
        </span>

        {/* Title and Brand */}
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">
          {productName}
        </h3>
        <h4 className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          by {brandName}
        </h4>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Quantity and Price */}
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Min. Qty: <span className="font-medium">{minimumQuantity}</span>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            ${price}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <Rating
            initialRating={rating}
            readonly
            emptySymbol={
              <FaRegStar className="text-gray-300 dark:text-gray-600 text-lg" />
            }
            fullSymbol={<FaStar className="text-yellow-400 text-lg" />}
            fractions={2}
          />
          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
            ({rating})
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4">
        <button
          onClick={() => navigate(`/update-product/${_id}`)}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white py-2 px-4 rounded transition-colors duration-300"
        >
          <FaEdit /> Update Product
        </button>
      </div>
    </div>
  );
};

export default AllProductCard;
