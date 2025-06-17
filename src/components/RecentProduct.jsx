import React, { useEffect, useState } from "react";
import RecentProductCard from "./RecentProductCard";
import { FiPackage, FiClock } from "react-icons/fi";
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";
import ErrorPage from "../pages/ErrorPage";
import { motion } from "motion/react";

const RecentProduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const axiosSecure = useAxios();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/api/products?sortBy=newest&page=1&limit=12`
        );
        setProducts(data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          err.response?.data?.message || "Failed to load recent products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axiosSecure]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error} />;

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-[#010313] dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with scroll-triggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <FiClock className="w-6 h-6 text-blue-500 mr-2" />
            <span className="text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              New Arrivals
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Recently Added Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our latest additions to the collection
          </p>
        </motion.div>

        {/* Product Grid with scroll-triggered animations */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <RecentProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
          >
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-6 transition-all duration-300 hover:scale-105">
              <FiPackage className="w-12 h-12 text-gray-400 dark:text-gray-300" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              No New Products Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
              Check back soon for our latest additions
            </p>
          </motion.div>
        )}

        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-12"
          >
            <button className="px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
              View All New Arrivals
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RecentProduct;
