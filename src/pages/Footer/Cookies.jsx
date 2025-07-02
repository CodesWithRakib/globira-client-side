import React from "react";
import useTitle from "../../hooks/useTitle";

const Cookies = () => {
  useTitle("Cookie Policy");

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
      <p>
        Our cookie usage guidelines and user control options will be posted here
        shortly.
      </p>
    </div>
  );
};

export default Cookies;
