import React from "react";
import useTitle from "../../hooks/useTitle";

const Privacy = () => {
  useTitle("Privacy Policy");

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>
        Information on how we manage and protect your data will be listed here.
      </p>
    </div>
  );
};

export default Privacy;
