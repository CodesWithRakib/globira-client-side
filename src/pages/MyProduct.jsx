import React, { useState, useEffect } from "react";
import MyProductCard from "../components/MyProductCard";
import Loading from "../components/Loading";
import useAxios from "../hooks/useAxios";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import { motion, AnimatePresence } from "motion/react";

const MyProduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useTitle(`My Products`);

  const fetchProducts = async () => {
    if (!user?.email) return;
    try {
      const response = await axiosSecure.get(
        `/api/products?email=${user.email}&page=${page}&limit=${limit}`
      );
      setProducts(response.data.data);
      const total = response.data.total || 0;
      setTotalPages(Math.ceil(total / limit));
      setError(null);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user?.email, axiosSecure, page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchProducts();
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <Loading fullScreen />;

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Something went wrong
          </h3>
          <p className="text-red-500 dark:text-red-400 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            {isRefreshing ? "Retrying..." : "Retry"}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    My Products
                  </h1>
                  <div className="inline-block bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full">
                    <p className="text-gray-700 dark:text-gray-300">
                      {products.length} product
                      {products.length !== 1 ? "s" : ""} showing (page {page} of{" "}
                      {totalPages})
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleRefresh}
                    className="p-3 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                    aria-label="Refresh products"
                  >
                    <FiRefreshCw
                      className={`w-5 h-5 text-blue-600 dark:text-blue-400 ${
                        isRefreshing ? "animate-spin" : ""
                      }`}
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/add-product")}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                  >
                    <FiPlus className="w-5 h-5" />
                    <span>Add Product</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10"
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <MyProductCard
                    product={product}
                    setProducts={setProducts}
                    products={products}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mt-8"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-200 dark:border-gray-700">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProduct;
