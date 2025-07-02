import React from "react";
import useTitle from "../../hooks/useTitle";

const Returns = () => {
  useTitle("Returns");

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4">Returns Policy</h1>
      <p>Return and refund policy details are on their way.</p>
    </div>
  );
};

export default Returns;
