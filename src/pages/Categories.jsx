import React, { useEffect, useState, useMemo, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import SkeletonLoading from "../components/SkeletonLoading";
import useTitle from "../hooks/useTitle";
import {
  FiSearch,
  FiChevronRight,
  FiFrown,
  FiFilter,
  FiX,
  FiPackage,
  FiHome,
  FiShoppingBag,
  FiSettings,
  FiHeart,
  FiFileText,
} from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
import { debounce } from "lodash";
import { FaCar } from "react-icons/fa";

const Categories = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState(
    "electronics-gadgets"
  );
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const axiosSecure = useAxios();

  const colors = {
    primary: {
      50: "bg-blue-50",
      100: "bg-blue-100",
      500: "bg-blue-600",
      600: "bg-blue-700",
      700: "bg-blue-800",
      900: "bg-blue-900",
    },
    neutral: {
      50: "bg-gray-50",
      100: "bg-gray-100",
      200: "bg-gray-200",
      300: "bg-gray-300",
      400: "bg-gray-400",
      500: "bg-gray-500",
      600: "bg-gray-600",
      700: "bg-gray-700",
      800: "bg-gray-800",
      900: "bg-gray-900",
    },
    accent: {
      500: "bg-indigo-600",
      600: "bg-indigo-700",
    },
  };

  // Professional categories with proper icons
  const categories = [
    {
      id: 1,
      name: "Electronics & Gadgets",
      slug: "electronics-gadgets",
      icon: <FiPackage className="h-5 w-5" />,
    },
    {
      id: 2,
      name: "Home & Kitchen",
      slug: "home-kitchen-appliances",
      icon: <FiHome className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "Fashion & Apparel",
      slug: "fashion-apparel",
      icon: <FiShoppingBag className="h-5 w-5" />,
    },
    {
      id: 4,
      name: "Industrial Tools",
      slug: "industrial-machinery-tools",
      icon: <FiSettings className="h-5 w-5" />,
    },
    {
      id: 5,
      name: "Health & Beauty",
      slug: "health-beauty",
      icon: <FiHeart className="h-5 w-5" />,
    },
    {
      id: 6,
      name: "Automotive",
      slug: "automotive-parts-accessories",
      icon: <FaCar className="h-5 w-5" />,
    },
    {
      id: 7,
      name: "Office Supplies",
      slug: "office-supplies-stationery",
      icon: <FiFileText className="h-5 w-5" />,
    },
  ];

  useTitle("Categories | Globira");

  // Fetch products on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get(`/api/products`);
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [axiosSecure]);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 300),
    []
  );

  // Filter products based on selected category and search term
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.category === selectedCategory &&
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, selectedCategory, searchTerm]);

  // Handle category change
  const handleCategoryClick = useCallback(
    async (slug) => {
      setSelectedCategory(slug);
      setSearchTerm("");
      setCategoryLoading(true);
      try {
        const res = await axiosSecure.get(`/api/products?category=${slug}`);
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setCategoryLoading(false);
      }
    },
    [axiosSecure]
  );

  // Handle search input change with debouncing
  const handleSearchChange = useCallback(
    (e) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile filter overlay */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-y-0 right-0 z-40 w-full max-w-xs overflow-y-auto bg-white dark:bg-gray-800 shadow-xl"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              <div className="px-4 mt-4">
                <label htmlFor="mobile-search" className="sr-only">
                  Search products
                </label>
                <div className="relative">
                  <input
                    id="mobile-search"
                    type="search"
                    placeholder="Search product..."
                    onChange={handleSearchChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2.5 pl-4 pr-10 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="mt-6 px-4 pb-6">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Categories
                </h3>
                <div className="mt-2 space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleCategoryClick(category.slug);
                        setMobileFiltersOpen(false);
                      }}
                      className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm ${
                        selectedCategory === category.slug
                          ? `${colors.primary[100]} dark:${colors.primary[900]} text-blue-900 dark:text-blue-100 font-medium`
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      aria-current={
                        selectedCategory === category.slug ? "page" : undefined
                      }
                    >
                      <span className="mr-3">{category.icon}</span>
                      {category.name}
                      {selectedCategory === category.slug && (
                        <FiChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex items-baseline justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Product Categories
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="inline-flex items-center lg:hidden gap-x-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setMobileFiltersOpen(true)}
              aria-label="Open filters"
            >
              <FiFilter className="h-5 w-5" />
              Filters
            </motion.button>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop filters - Sticky sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 h-[calc(100vh-9rem)] overflow-y-auto pr-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                {/* Search */}
                <div className="mb-6">
                  <label htmlFor="desktop-search" className="sr-only">
                    Search products
                  </label>
                  <div className="relative">
                    <motion.input
                      id="desktop-search"
                      type="search"
                      placeholder="Search product..."
                      onChange={handleSearchChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2.5 pl-4 pr-10 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      whileFocus={{
                        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="pb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCategoryClick(category.slug)}
                        className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm ${
                          selectedCategory === category.slug
                            ? `${colors.primary[100]} dark:${colors.primary[900]} text-blue-900 dark:text-blue-100 font-medium`
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        aria-current={
                          selectedCategory === category.slug
                            ? "page"
                            : undefined
                        }
                      >
                        <span className="mr-3">{category.icon}</span>
                        {category.name}
                        {selectedCategory === category.slug && (
                          <FiChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            {/* Category title */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 mb-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {categories.find((c) => c.slug === selectedCategory)?.name ||
                    "All Products"}
                </h2>
                <span className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "item" : "items"}
                </span>
              </div>
            </motion.div>

            {categoryLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
                  >
                    <div className="space-y-3">
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.05 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                  }}
                  className={`${colors.accent[500]} rounded-full p-5 mb-6 shadow-lg`}
                >
                  <FiFrown className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {searchTerm ? "No matching products" : "No products found"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-6">
                  {searchTerm
                    ? `We couldn't find any products matching "${searchTerm}"`
                    : `There are currently no products in this category`}
                </p>
                {searchTerm && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchTerm("")}
                    className={`px-6 py-3 ${colors.accent[500]} hover:${colors.accent[600]} text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    Clear search
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Categories);
