import React from "react";
import { FiPackage } from "react-icons/fi";
import { Link } from "react-router";

const NoProduct = ({
  message = "No products available",
  actionText = "Browse Products",
  actionLink = "/all-products",
}) => {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      {/* Icon with primary color circle */}
      <div className="bg-amber-100 dark:bg-amber-900 p-6 rounded-full mb-6">
        <FiPackage className="w-10 h-10 text-amber-600 dark:text-amber-300" />
      </div>

      {/* Heading with proper color */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {message}
      </h3>

      {/* Description with subtle text */}
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        It seems there are no products to display at the moment. Check back
        later or explore our collection.
      </p>

      {/* Button with accessible and clear styling */}
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-block bg-amber-600 dark:bg-amber-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-amber-700 dark:hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition"
          aria-label={actionText}
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default NoProduct;
