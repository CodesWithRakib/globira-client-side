import React from "react";

const StockBadge = ({ quantity }) => (
  <span
    className={`px-3 py-1 inline-flex text-center text-xs font-semibold rounded-full ${
      quantity > 100
        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    }`}
  >
    {quantity > 100 ? "In Stock" : `Low Stock (${quantity})`}
  </span>
);

export default StockBadge;
