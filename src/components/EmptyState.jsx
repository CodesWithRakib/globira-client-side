import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router";

const EmptyState = ({
  title = "No items found",
  description = "It seems there's nothing here yet.",
  actionText = "Explore",
  actionLink = "/all-products",
}) => {
  return (
    <section
      role="region"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="bg-gray-100 dark:bg-gray-600 p-6 rounded-full mb-6">
        <FiShoppingBag className="w-10 h-10 text-gray-400 dark:text-gray-300" />
      </div>

      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
        {description}
      </p>

      {actionText && (
        <Link
          to={actionLink || "/all-products"}
          aria-label={actionText}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary dark:bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
        >
          {actionText}
        </Link>
      )}
    </section>
  );
};

export default EmptyState;
