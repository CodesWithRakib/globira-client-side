import React, { useState, useEffect } from "react";
import MyProductCard from "../components/MyProductCard";
import NoProduct from "../components/NoProduct";
import Loading from "../components/Loading";
import useAxios from "../hooks/useAxios";
import { FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[60vh]"
      >
        <div className="text-center p-6 max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-red-500 mb-4">{error}</p>
          <motion.button
            onClick={handleRefresh}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isRefreshing ? "Retrying..." : "Retry"}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <AnimatePresence>
        {products.length === 0 ? (
          <NoProduct />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold dark:text-white">
                  My Products
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {products.length} product{products.length !== 1 ? "s" : ""}{" "}
                  showing (page {page} of {totalPages})
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={handleRefresh}
                  whileHover={{ rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Refresh products"
                >
                  <FiPlus
                    className={`w-5 h-5 text-gray-600 dark:text-gray-300 ${
                      isRefreshing ? "animate-spin" : ""
                    }`}
                  />
                </motion.button>

                <motion.button
                  onClick={() => navigate("/add-product")}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition-all shadow-md"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>Add Product</span>
                </motion.button>
              </div>
            </div>

            {/* Products Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center mt-12"
              >
                <nav className="flex items-center gap-1">
                  <motion.button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    whileHover={{ scale: page === 1 ? 1 : 1.05 }}
                    whileTap={{ scale: page === 1 ? 1 : 0.95 }}
                    className={`p-2 rounded-lg ${
                      page === 1
                        ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    aria-label="Previous page"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </motion.button>

                  {[...Array(totalPages).keys()].map((i) => (
                    <motion.button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium ${
                        page === i + 1
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {i + 1}
                    </motion.button>
                  ))}

                  <motion.button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    whileHover={{ scale: page === totalPages ? 1 : 1.05 }}
                    whileTap={{ scale: page === totalPages ? 1 : 0.95 }}
                    className={`p-2 rounded-lg ${
                      page === totalPages
                        ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    aria-label="Next page"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyProduct;
