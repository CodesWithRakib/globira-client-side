import React, { useEffect, useState } from "react";
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
} from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "electronics-gadgets"
  );
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const axiosSecure = useAxios();

  const categories = [
    {
      id: 1,
      name: "Electronics & Gadgets",
      slug: "electronics-gadgets",
      icon: "📱",
    },
    {
      id: 2,
      name: "Home & Kitchen",
      slug: "home-kitchen-appliances",
      icon: "🏠",
    },
    { id: 3, name: "Fashion & Apparel", slug: "fashion-apparel", icon: "👕" },
    {
      id: 4,
      name: "Industrial Tools",
      slug: "industrial-machinery-tools",
      icon: "⚙️",
    },
    { id: 5, name: "Health & Beauty", slug: "health-beauty", icon: "💄" },
    {
      id: 6,
      name: "Automotive",
      slug: "automotive-parts-accessories",
      icon: "🚗",
    },
    {
      id: 7,
      name: "Office Supplies",
      slug: "office-supplies-stationery",
      icon: "📎",
    },
  ];

  useTitle(`Categories`);

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
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.category === selectedCategory &&
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = async (slug) => {
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
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 relative">
      {/* Mobile filter overlay */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-y-0 right-0 z-40 w-full max-w-xs overflow-y-auto bg-white dark:bg-zinc-800 shadow-xl"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-zinc-700">
                <h2 className="text-lg font-medium">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <FiX className="h-6 w-6" aria-hidden="true" />
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border-0 bg-gray-100 dark:bg-zinc-700 py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary dark:focus:ring-amber-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="mt-6 px-4 pb-6">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
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
                      className={`flex w-full items-center rounded-lg px-3 py-2 text-sm ${
                        selectedCategory === category.slug
                          ? "bg-primary/10 text-primary dark:bg-amber-600/20 dark:text-amber-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                      }`}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-gray-200 dark:border-zinc-700 pt-12 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Our Products</h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="inline-flex items-center lg:hidden gap-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <FiFilter className="h-5 w-5" />
            Filters
          </motion.button>
        </div>

        <div className="pt-6 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop filters - Sticky sidebar */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 h-[calc(100vh-9rem)] overflow-y-auto pr-2">
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
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-lg border-0 bg-gray-100 dark:bg-zinc-700 py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary dark:focus:ring-amber-500"
                      whileFocus={{
                        boxShadow: "0 0 0 2px rgba(249, 115, 22, 0.5)",
                        backgroundColor: "rgba(243, 244, 246, 1)",
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="border-b border-gray-200 dark:border-zinc-700 pb-6">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Categories
                  </h3>
                  <div className="mt-2 space-y-1">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCategoryClick(category.slug)}
                        className={`flex w-full items-center rounded-lg px-3 py-2 text-sm ${
                          selectedCategory === category.slug
                            ? "bg-primary/10 text-primary dark:bg-amber-600/20 dark:text-amber-400 font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                        }`}
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

            {/* Product grid */}
            <div className="flex-1">
              {/* Category title */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-6"
              >
                <h2 className="text-xl font-semibold">
                  {categories.find((c) => c.slug === selectedCategory)?.name ||
                    "All Products"}
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "item" : "items"}
                </span>
              </motion.div>

              {categoryLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <div className="h-48 bg-gray-200 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
                      <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse w-1/2"></div>
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
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2,
                    }}
                    className="bg-gray-100 dark:bg-zinc-700 rounded-full p-4 mb-4"
                  >
                    <FiFrown className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </motion.div>
                  <h3 className="text-lg font-medium mb-2">
                    {searchTerm ? "No matching products" : "No products found"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-4">
                    {searchTerm
                      ? `We couldn't find any products matching "${searchTerm}"`
                      : `There are currently no products in this category`}
                  </p>
                  {searchTerm && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSearchTerm("")}
                      className="px-4 py-2 bg-primary dark:bg-amber-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-amber-700 transition-colors text-sm font-medium"
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
    </div>
  );
};

export default Categories;
