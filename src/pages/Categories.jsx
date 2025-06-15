import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import SkeletonLoading from "../components/SkeletonLoading";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "electronics-gadgets"
  );
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const axiosSecure = useAxios();

  const categories = [
    { id: 1, name: "Electronics & Gadgets", slug: "electronics-gadgets" },
    {
      id: 2,
      name: "Home & Kitchen Appliances",
      slug: "home-kitchen-appliances",
    },
    { id: 3, name: "Fashion & Apparel", slug: "fashion-apparel" },
    {
      id: 4,
      name: "Industrial Machinery & Tools",
      slug: "industrial-machinery-tools",
    },
    { id: 5, name: "Health & Beauty", slug: "health-beauty" },
    {
      id: 6,
      name: "Automotive Parts & Accessories",
      slug: "automotive-parts-accessories",
    },
    {
      id: 7,
      name: "Office Supplies & Stationery",
      slug: "office-supplies-stationery",
    },
  ];

  useEffect(() => {
    axiosSecure.get(`/api/products`).then((res) => {
      setProducts(res.data.data);
      setLoading(false);
    });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.category === selectedCategory &&
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (slug) => {
    setSelectedCategory(slug);
    setSearchTerm("");
    setCategoryLoading(true);
    axiosSecure.get(`/api/products?category=${slug}`).then((res) => {
      setProducts(res.data.data);
      setCategoryLoading(false);
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="flex flex-col sm:flex-row min-h-screen dark:bg-zinc-950 text-black dark:text-white">
      {/* Sidebar - remains unchanged from your improved version */}
      {/* Sidebar */}
      <aside className="w-full sm:w-auto min-w-[250px] max-w-[300px] p-4 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-full sticky top-0 overflow-y-auto">
        {/* Search Input */}
        <div className="mb-6">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <div className="flex shadow-sm rounded-xl overflow-hidden">
            <input
              id="product-search"
              type="search"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-0 px-4 py-2 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-primary dark:focus:ring-amber-500 outline-none"
              aria-label="Search products"
            />
            <button
              className="bg-primary dark:bg-amber-600 text-white px-4 py-2 hover:bg-orange-600 dark:hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              aria-label="Submit search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories */}
        <section aria-labelledby="categories-heading">
          <h2
            id="categories-heading"
            className="text-lg font-bold mb-3 text-zinc-800 dark:text-zinc-100"
          >
            Categories
          </h2>
          <nav className="space-y-2" aria-label="Product categories">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                aria-current={
                  selectedCategory === category.slug ? "page" : undefined
                }
                className={`w-full text-left px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center ${
                  selectedCategory === category.slug
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                    : "bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {category.icon && (
                  <span className="mr-2 text-lg">{category.icon}</span>
                )}
                <span>{category.name}</span>
                {selectedCategory === category.slug && (
                  <span className="ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </nav>
        </section>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Products Section */}
        {categoryLoading ? (
          <div className="p-4 md:p-6">
            <SkeletonLoading count={8} />
          </div>
        ) : (
          <main className="p-4 md:p-6">
            {/* Category Title */}
            {selectedCategory && (
              <h1 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-zinc-100 capitalize">
                {categories.find((c) => c.slug === selectedCategory)?.name ||
                  "Products"}
              </h1>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-zinc-400 dark:text-zinc-600 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  No products found
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
                  {searchTerm
                    ? `No products match your search for "${searchTerm}"`
                    : selectedCategory
                    ? `No products available in this category`
                    : "No products available"}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 px-4 py-2 bg-primary dark:bg-amber-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-amber-700 transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
};

export default Categories;
