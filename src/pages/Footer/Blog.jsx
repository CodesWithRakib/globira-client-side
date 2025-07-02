import React from "react";
import useTitle from "../../hooks/useTitle";

const Blog = () => {
  useTitle("Blog");

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4">Our Blog</h1>
      <p>Industry insights and wholesale news coming soon!</p>
    </div>
  );
};

export default Blog;
