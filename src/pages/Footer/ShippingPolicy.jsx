import React from "react";
import useTitle from "../../hooks/useTitle";

const ShippingPolicy = () => {
  useTitle("Shipping Policy");

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>
      <p>Details on shipping options and timelines will be added shortly.</p>
    </div>
  );
};

export default ShippingPolicy;
