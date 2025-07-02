import React from "react";
import useTitle from "../../hooks/useTitle";

const AboutUs = () => {
  useTitle("About Us");

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p>
        Globira is a B2B wholesale platform connecting verified suppliers and
        businesses worldwide. Our mission is to streamline bulk sourcing with
        trust and ease.
      </p>
    </div>
  );
};

export default AboutUs;
