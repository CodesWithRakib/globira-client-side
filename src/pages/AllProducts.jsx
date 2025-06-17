import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AllProductCard from "../components/AllProductCard";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { FaSearch } from "react-icons/fa";
import noImage from "/noImage.jpg";
import useTitle from "../hooks/useTitle";
import { formatCategory } from "../Utils/formatCategory";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [viewType, setViewType] = useState("card");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

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
      product.brandName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAvailability && matchesSearch;
  });

  if (loading) return <Loading />;

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          All Products
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* View Dropdown */}
          <div>
            <select
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              value={viewType}
              onChange={(e) => {
                setViewType(e.target.value);
                setPage(1);
              }}
            >
              <option value="card">🗂️ Card View</option>
              <option value="table">📋 Table View</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="mb-6">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={showAvailableOnly}
            onChange={() => setShowAvailableOnly((prev) => !prev)}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-700 dark:text-white">
            Show Available Products Only (Qty &gt; 100)
          </span>
        </label>
      </div>

      {/* Product Count */}
      <div className="mb-4 text-gray-600">
        Showing {filteredProducts.length} of {totalCount} products
      </div>

      {/* View Logic */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No products found matching your criteria.
          </p>
        </div>
      ) : viewType === "card" ? (
        <>
          {/* CARD VIEW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <AllProductCard
                key={product._id}
                product={product}
                onUpdate={() => handleProductUpdate(product._id)}
              />
            ))}
          </div>
        </>
      ) : (
        // TABLE VIEW
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {[
                    "Product",
                    "Brand",
                    "Category",
                    "Quantity",
                    "Price",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                          <img
                            src={product.productImage || noImage}
                            alt={product.productName}
                            onError={(e) => (e.target.src = noImage)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {product.productName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            SKU: {product._id.slice(0, 8) || "N/A"}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {product.minimum_selling_quantity ||
                        product.minimumQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary dark:text-amber-500">
                      ${product.price?.toLocaleString("en-IN") || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1.5 inline-flex items-center text-xs font-medium rounded-full ${
                          (product.minimum_selling_quantity ||
                            product.minimumQuantity) > 100
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                      >
                        {(product.minimum_selling_quantity ||
                          product.minimumQuantity) > 100
                          ? "In Stock"
                          : "Low Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleProductUpdate(product._id)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleViewDetails(product._id)}
                          className="text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination - Show for both views */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 mb-6 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setPage(pg)}
              className={`px-4 py-2 rounded ${
                page === pg
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {pg}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
