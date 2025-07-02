import React from "react";
import useTitle from "../../hooks/useTitle";

const Solutions = () => {
  useTitle("B2B Solutions");

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4">B2B Solutions</h1>
      <p>
        Explore our upcoming B2B solutions designed to make bulk sourcing
        smarter and faster.
      </p>
    </div>
  );
};

export default Solutions;
