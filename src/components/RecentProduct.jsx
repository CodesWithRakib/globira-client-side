import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiClock, FiArrowRight, FiRefreshCw, FiPackage } from "react-icons/fi";
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";
import ErrorPage from "../pages/ErrorPage";
import { useNavigate } from "react-router";
import Rating from "react-rating";
import { FaStar, FaRegStar, FaStore, FaEye } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import noImage from "/default.jpg";

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

  // Product Card Component
  const RecentProductCard = ({ product }) => {
    const {
      _id,
      brandName,
      productName,
      productImage,
      price,
      rating,
      description,
      mainQuantity,
      minimumQuantity,
      sellerName,
      sellerPhotoURL,
      createdAt,
    } = product;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={productImage || noImage}
            onError={(e) => (e.target.src = noImage)}
            alt={productName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Stock Badge */}
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
              mainQuantity > minimumQuantity
                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
            }`}
          >
            {mainQuantity > minimumQuantity ? "In Stock" : "Low Stock"}
          </span>
          {/* Quick View Button */}
          <button
            onClick={() => navigate(`/product/${_id}`)}
            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="View product"
          >
            <div className="bg-white dark:bg-gray-800 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg">
              <FaEye className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-5 space-y-4 flex flex-col flex-grow">
          {/* Title */}
          <div>
            <h3
              onClick={() => navigate(`/product/${_id}`)}
              className="text-lg font-bold text-gray-900 dark:text-white mb-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors line-clamp-1"
            >
              {productName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Brand:{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {brandName}
              </span>
            </p>
          </div>

          {/* Price + Rating */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ${price.toLocaleString()}
            </span>
            <div className="flex items-center gap-1">
              <Rating
                initialRating={parseFloat(rating)}
                readonly
                emptySymbol={
                  <FaRegStar className="text-gray-300 dark:text-gray-600 text-sm" />
                }
                fullSymbol={
                  <FaStar className="text-blue-400 dark:text-blue-300 text-sm" />
                }
                fractions={2}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                {rating}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 flex-grow">
            {description || "No description available."}
          </p>

          {/* Quantity Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-600">
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Available
              </p>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {mainQuantity} units
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-600">
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Min Order
              </p>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {minimumQuantity} units
              </p>
            </div>
          </div>

          {/* Seller Info */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              {sellerPhotoURL ? (
                <img
                  src={sellerPhotoURL}
                  alt={sellerName}
                  className="w-7 h-7 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center border border-gray-300 dark:border-gray-500">
                  <FaStore className="text-gray-500 dark:text-gray-300 text-xs" />
                </div>
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate max-w-[100px]">
                {sellerName}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(createdAt))} ago
            </p>
          </div>

          {/* View Button */}
          <button
            onClick={() => navigate(`/product/${_id}`)}
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center gap-2"
          >
            <FaEye className="text-sm" />
            View Product
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <FiClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Recent <span className="text-blue-600">Products</span>
              </h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Check out our newest additions
              </p>
            </div>
          </div>

          <div className="flex gap-3">
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

            <motion.button
              onClick={handleViewAll}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              View all <FiArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        <div className="h-1 w-20 bg-blue-500 rounded-full" />
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
              className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Notify Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RecentProduct;
