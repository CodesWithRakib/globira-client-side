import React from "react";
import useTitle from "../../hooks/useTitle";

const Faq = () => {
  useTitle("FAQ");

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <p>Common queries addressed here soon.</p>
    </div>
  );
};

export default Faq;
