import React from "react";

const SkeletonLoading = ({ count = 1 }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative animate-pulse bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full"
        >
          {/* Visually hidden loading text for screen readers */}
          <span className="sr-only">Loading product...</span>

          {/* Image skeleton with shimmer effect */}
          <div className="aspect-square bg-gray-200 dark:bg-zinc-800 relative overflow-hidden">
            {/* Wishlist button placeholder */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-300 dark:bg-zinc-700"></div>

            {/* Category badge placeholder */}
            <div className="absolute top-3 left-3 w-16 h-6 rounded-full bg-gray-300 dark:bg-zinc-700"></div>
          </div>

          {/* Content skeleton */}
          <div className="p-4 space-y-3 flex flex-col flex-grow justify-between">
            {/* Product name and brand placeholders */}
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2"></div>
            </div>

            {/* Description placeholders */}
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-full"></div>
              <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-2/3"></div>
            </div>

            {/* Min quantity and rating placeholders */}
            <div className="flex justify-between items-center pt-2">
              <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded"></div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded-full"
                  ></div>
                ))}
              </div>
            </div>

            {/* Price and button placeholders */}
            <div className="flex justify-between items-center pt-4">
              <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded"></div>
              <div className="h-10 w-24 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoading;
