import React, { useState, useEffect } from "react";
import MyProductCard from "../components/MyProductCard";
import NoProduct from "../components/NoProduct";
import Loading from "../components/Loading";
import useAxios from "../hooks/useAxios";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";
import Pagination from "../components/Pagination"; // Import your Pagination component

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-6 max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            {isRefreshing ? "Retrying..." : "Retry"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      {products.length === 0 ? (
        <NoProduct />
      ) : (
        <div className="max-w-7xl mx-auto">
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
              <button
                onClick={handleRefresh}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Refresh products"
              >
                <FiPlus
                  className={`w-5 h-5 text-gray-600 dark:text-gray-300 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
              </button>

              <button
                onClick={() => navigate("/add-product")}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white rounded-lg transition-colors shadow-md"
              >
                <FiPlus className="w-5 h-5" />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <MyProductCard
                key={product._id}
                product={product}
                setProducts={setProducts}
                products={products}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProduct;
