import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AllProductCard from "../components/AllProductCard";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { FaSearch, FaEye, FaEdit, FaFilter } from "react-icons/fa";
import { IoGrid, IoList } from "react-icons/io5";
import noImage from "/noImage.jpg";
import useTitle from "../hooks/useTitle";
import { formatCategory } from "../Utils/formatCategory";
import { motion, AnimatePresence } from "motion/react";
import Pagination from "../components/Pagination";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [viewType, setViewType] = useState("card");
  const [page, setPage] = useState(1);
  const limit = 12;
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  useTitle(`All Products`);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get(
          `/api/products?page=${page}&limit=${limit}`
        );
        const { data, total } = response.data;
        setProducts(data);
        setTotalCount(total);
        setTotalPages(Math.ceil(total / limit));
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [axiosSecure, page]);

  const handleProductUpdate = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesAvailability =
      !showAvailableOnly || product.minimumQuantity > 100;
    const matchesSearch =
      product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brandName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAvailability && matchesSearch;
  });

  if (loading) return <Loading fullScreen />;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Product Inventory
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and explore all available products
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search products"
            />
          </div>
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewType("card")}
              className={`p-2 rounded-md transition-colors ${
                viewType === "card"
                  ? "bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              aria-label="Card view"
              aria-pressed={viewType === "card"}
            >
              <IoGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewType("table")}
              className={`p-2 rounded-md transition-colors ${
                viewType === "table"
                  ? "bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              aria-label="Table view"
              aria-pressed={viewType === "table"}
            >
              <IoList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-expanded={isFilterOpen}
            aria-controls="filters-panel"
          >
            <FaFilter className="text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium">Filters</span>
          </button>
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                id="filters-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-4"
              >
                <label className="inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={showAvailableOnly}
                    onChange={() => setShowAvailableOnly((prev) => !prev)}
                    aria-checked={showAvailableOnly}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    In Stock Only
                  </span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-medium">{filteredProducts.length}</span>{" "}
          of <span className="font-medium">{totalCount}</span> products
        </div>
      </motion.div>

      {/* Products Display */}
      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <FaSearch className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setShowAvailableOnly(false);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset Filters
            </button>
          </div>
        </motion.div>
      ) : viewType === "card" ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <AllProductCard
                product={product}
                onUpdate={() => handleProductUpdate(product._id)}
                onView={() => handleViewDetails(product._id)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {[
                    "Product",
                    "Brand",
                    "Category",
                    "Price",
                    "Stock",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {filteredProducts.map((product) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                          <img
                            src={product.productImage || noImage}
                            alt={product.productName}
                            onError={(e) => (e.target.src = noImage)}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {product.productName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            SKU: {product._id.slice(0, 8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {product.brandName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {formatCategory(product.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600 dark:text-blue-400">
                      ${product.price?.toLocaleString("en-US")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {product.minimumQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1.5 inline-flex items-center text-xs font-medium rounded-full ${
                          product.minimumQuantity > 100
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                      >
                        {product.minimumQuantity > 100
                          ? "In Stock"
                          : "Low Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleViewDetails(product._id)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
                          aria-label={`View details of ${product.productName}`}
                          type="button"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleProductUpdate(product._id)}
                          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
                          aria-label={`Edit product ${product.productName}`}
                          type="button"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default AllProducts;
