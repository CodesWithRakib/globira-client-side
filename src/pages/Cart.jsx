import React, { useState, useEffect } from "react";
import SingleCart from "../components/SingleCart";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "react-hot-toast";
import EmptyState from "../components/EmptyState";
import useTitle from "../hooks/useTitle";

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
        toast.error("Failed to load cart items ,Please log in first.");
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

    return total.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full mb-4">
            <FiShoppingCart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {carts.length} {carts.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {carts.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="Looks like you haven't added any items yet. Start shopping to fill your cart!"
            actionText="Browse Products"
            actionLink="/products"
          />
        ) : (
          <>
            {/* Cart Controls */}
            <div className="flex justify-between items-center mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">
                Cart Items
              </h4>
              <button
                onClick={() =>
                  toast.success(
                    "Cart Clear Functionality Will Be Added Soon ..."
                  )
                }
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm"
              >
                Clear All
              </button>
            </div>

            {/* Cart Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carts.map((cart) => (
                <SingleCart
                  key={cart._id}
                  cart={cart}
                  setCarts={setCarts}
                  carts={carts}
                />
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Order Summary
                </h3>
                <span className="text-gray-600 dark:text-gray-400">
                  {carts.length} {carts.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="font-medium">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${calculateTotal()}
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
