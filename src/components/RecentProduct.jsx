import React from "react";
import RecentProductCard from "./RecentProductCard";

const RecentProduct = ({ products }) => {
  return (
    <div className="text-zinc-800 dark:text-zinc-100 py-10 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl md:text-3xl font-bold px-5 mb-6 text-center">
        RECENTLY ADDED
      </h1>

      <div className="w-full px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <RecentProductCard
            key={product._id}
            product={product}
          ></RecentProductCard>
        ))}
      </div>
    </div>
  );
};

export default RecentProduct;
