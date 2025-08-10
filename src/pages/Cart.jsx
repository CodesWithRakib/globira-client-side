import React, { useState, useEffect } from "react";
import SingleCart from "../components/SingleCart";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "react-hot-toast";
import EmptyState from "../components/EmptyState";
import useTitle from "../hooks/useTitle";
import { motion } from "motion/react";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState([]);
  const axiosSecure = useAxios();
  useTitle(`Cart`);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axiosSecure.get("/api/carts");
        setCarts(response.data.result);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to load cart items, please log in first.");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [axiosSecure]);

  const calculateTotal = () => {
    const total = carts.reduce((total, item) => {
      const price = parseFloat(item.unitPrice) || 0;
      const quantity = parseInt(item.buyerQuantity) || 0;
      return total + price * quantity;
    }, 0);
    return total.toLocaleString("en-IN");
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center bg-blue-600 p-5 rounded-full mb-6 shadow-sm">
            <FiShoppingCart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Your Shopping Cart
          </h1>
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
            <p className="text-gray-700 dark:text-gray-300">
              {carts.length} {carts.length === 1 ? "item" : "items"} in your
              cart
            </p>
          </div>
        </motion.div>

        {carts.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="Looks like you haven't added any items yet. Start shopping to fill your cart!"
            actionText="Browse Products"
            actionLink="/all-products"
          />
        ) : (
          <>
            {/* Cart Controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center mb-8 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h4 className="font-medium text-gray-800 dark:text-gray-100">
                Cart Items
              </h4>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  toast.success(
                    "Cart Clear Functionality Will Be Added Soon ..."
                  )
                }
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Clear All
              </motion.button>
            </motion.div>

            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            >
              {carts.map((cart) => (
                <motion.div
                  key={cart._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                >
                  <SingleCart cart={cart} setCarts={setCarts} carts={carts} />
                </motion.div>
              ))}
            </motion.div>

            {/* Cart Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Order Summary
                </h3>
                <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  <span className="text-gray-700 dark:text-gray-300">
                    {carts.length} {carts.length === 1 ? "item" : "items"}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    ${calculateTotal()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    Free
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Total
                  </span>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    ${calculateTotal()}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  toast.success("Checkout Functionality Will Be Added Soon ...")
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl font-bold text-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Proceed to Checkout
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
