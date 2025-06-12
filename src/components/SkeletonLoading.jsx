import React from "react";

const SkeletonLoading = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-zinc-950 border rounded-xl p-4 space-y-4">
      <div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
      <div className="h-5 bg-gray-200 dark:bg-zinc-800 w-3/4 rounded"></div>
      <div className="h-3 bg-gray-200 dark:bg-zinc-800 w-1/2 rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-zinc-800 w-full rounded"></div>
      <div className="flex justify-between mt-2">
        <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded"></div>
      </div>
      <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded mt-3"></div>
    </div>
  );
};

export default SkeletonLoading;
