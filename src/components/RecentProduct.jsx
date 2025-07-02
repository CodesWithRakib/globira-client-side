import React, { useEffect, useState } from "react";
import RecentProductCard from "./RecentProductCard";
import { FiPackage, FiClock, FiArrowRight, FiRefreshCw } from "react-icons/fi";
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";
import ErrorPage from "../pages/ErrorPage";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

const RecentProduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get(
        `/api/products?sortBy=newest&page=1&limit=8`
      );
      setProducts(data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.response?.data?.message || "Failed to load recent products");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [axiosSecure]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchProducts();
  };

  const handleViewAll = () => {
    navigate("/products");
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 relative"
        >
          <div className="flex justify-center items-center gap-4">
            <motion.div
              className="inline-flex items-center justify-center mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 mr-3">
                <FiClock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-sm font-semibold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
                Fresh Arrivals
              </span>
            </motion.div>
            <motion.button
              onClick={handleRefresh}
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Refresh products"
            >
              <FiRefreshCw
                className={`w-4 h-4 text-gray-600 dark:text-gray-300 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
            </motion.button>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our{" "}
            <span className="text-amber-600 dark:text-amber-400">Newest</span>{" "}
            Additions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the latest products added to our collection
          </p>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <Loading />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8"
            >
              <ErrorPage message={error} onRetry={fetchProducts} />
            </motion.div>
          ) : products.length > 0 ? (
            <motion.div
              key="products"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  className="hover:z-10"
                >
                  <RecentProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white/50 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm"
            >
              <motion.div
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-6"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring" }}
              >
                <FiPackage className="w-12 h-12 text-gray-400 dark:text-gray-300" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                Coming Soon!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
                We're preparing some exciting new products for you
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-amber-600 dark:bg-amber-700 text-white rounded-lg hover:bg-amber-700 dark:hover:bg-amber-800 transition-colors"
              >
                Notify Me
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Button */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={handleViewAll}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 mx-auto px-6 py-3 border-2 border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400 rounded-lg font-medium hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300 group"
            >
              View All New Arrivals
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RecentProduct;
