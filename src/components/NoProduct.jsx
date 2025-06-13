import React from "react";
import { FiPackage } from "react-icons/fi";
import { Link } from "react-router";

const NoProduct = ({
  message = "No products available",
  actionText = "Browse Products",
  actionLink = "/products",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Icon with primary color circle */}
      <div className="bg-base-100 p-6 rounded-full mb-6">
        <FiPackage className="w-10 h-10 text-primary" />
      </div>

      {/* Heading with base-content color */}
      <h3 className="text-xl font-medium text-base-content mb-2">{message}</h3>

      {/* Description with info color */}
      <p className="text-info max-w-md mb-6">
        It seems there are no products to display at the moment. Check back
        later or explore our collection.
      </p>

      {/* Button with primary color */}
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="btn btn-primary hover:bg-accent text-neutral"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default NoProduct;
