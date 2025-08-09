import React, { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import useAxios from "../../hooks/useAxios";
import RecentProductCard from "../../components/RecentProductCard";
import { FaSpinner } from "react-icons/fa";
import Pagination from "../../components/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const axiosSecure = useAxios();
  useTitle("Our Products");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axiosSecure.get(
          `/api/products?sortBy=${sortBy}&page=${currentPage}&limit=12`
        );
        setProducts(res.data.data);
        setTotalPages(Math.ceil(res.data.total / 12));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [axiosSecure, currentPage, sortBy]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Our <span className="text-blue-600">Products</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore our latest collection of premium products
        </p>
      </div>

      {/* Sorting Dropdown */}
      <div className="max-w-7xl mx-auto mb-6 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-blue-300 rounded-md text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name A-Z</option>
        </select>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : products.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <RecentProductCard key={product._id} product={product} />
            ))}
          </div>
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
            No products found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            We couldn't find any products matching your criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
