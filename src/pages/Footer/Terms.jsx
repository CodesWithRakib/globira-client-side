import React from "react";
import useTitle from "../../hooks/useTitle";

const Terms = () => {
  useTitle("Terms of Service");

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p>The legally binding terms for using Globira will be provided soon.</p>
    </div>
  );
};

export default Terms;
