import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { FiHeart, FiTrash2, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import useTitle from "../hooks/useTitle";
import EmptyState from "../components/EmptyState";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useTitle("My Wishlist");

  useEffect(() => {
    // Load wishlist from localStorage
    const loadWishlist = () => {
      try {
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
          setWishlistItems(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlist();
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item._id !== productId
    );
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem("wishlist");
  };

  const addToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already exists in cart
    const existingItem = existingCart.find((item) => item._id === product._id);

    if (existingItem) {
      toast.error("This item is already in your cart!");
      return;
    }

    // Add to cart
    const updatedCart = [...existingCart, { ...product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Remove from wishlist
    removeFromWishlist(product._id);

    alert("Item moved to cart!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
                Back
              </motion.button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <FiHeart className="text-red-500" />
                  My Wishlist
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {wishlistItems.length}{" "}
                  {wishlistItems.length === 1 ? "item" : "items"} saved
                </p>
              </div>
            </div>

            {wishlistItems.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearWishlist}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800/50 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <FiTrash2 className="w-5 h-5" />
                Clear All
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            description="Save items you love to your wishlist. They'll appear here for easy access."
            actionText="Browse Products"
            actionLink="/all-products"
            icon={<FiHeart className="w-12 h-12 text-red-500" />}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={item.productImage || "/placeholder-product.jpg"}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-product.jpg";
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromWishlist(item._id)}
                      className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-red-500 hover:text-red-600 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <FiHeart className="w-5 h-5 fill-current" />
                    </motion.button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4 flex-grow flex flex-col">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg mb-1 line-clamp-2">
                      {item.productName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.brandName}
                    </p>
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ${item.price?.toLocaleString("en-US")}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Stock: {item.minimumQuantity || 0}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(item)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <FiShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/product/${item._id}`)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm font-medium"
                      >
                        View
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats Section */}
        {wishlistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/50"
          >
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {wishlistItems.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Items Saved
                </p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  $
                  {wishlistItems
                    .reduce((total, item) => total + (item.price || 0), 0)
                    .toLocaleString("en-US")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Value
                </p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {
                    wishlistItems.filter((item) => item.minimumQuantity > 10)
                      .length
                  }
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  In Stock
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Add all items to cart
                  wishlistItems.forEach((item) => addToCart(item));
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
              >
                Add All to Cart
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
