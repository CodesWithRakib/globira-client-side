import React, { useEffect } from "react";
import { useParams } from "react-router";
import { FiPackage } from "react-icons/fi";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";
import { formatCategory } from "../Utils/formatCategory";
import { motion } from "motion/react";

const CategoryProducts = () => {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const { category } = useParams();
  const axiosSecure = useAxios();
  useTitle(`${formatCategory(category)} Products`);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(
          `/api/products?category=${category}`
        );
        setProducts(response.data.data);
      } catch (err) {
        toast.error(
          `Error: ${err?.response?.data?.message || "Failed to fetch products"}`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, axiosSecure]);

  if (loading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <div className="bg-blue-600 p-5 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-sm">
            <FiPackage className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            No Products Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't find any products in the {formatCategory(category)}{" "}
            category.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Browse Other Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 px-6 py-2 rounded-full mb-6">
            <span className="text-blue-800 dark:text-blue-200 font-medium">
              {products.length} Products
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {formatCategory(category)} Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our curated collection of{" "}
            {formatCategory(category).toLowerCase()} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center px-5 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
