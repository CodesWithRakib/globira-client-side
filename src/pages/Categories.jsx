import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router";
import ProductCard from "../components/ProductCard";
import { Loader } from "lucide-react";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "electronics-gadgets"
  );
  const [loading, setLoading] = useState(true);
  const { state } = useNavigation();
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
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="flex min-h-screen dark:bg-zinc-950 text-black dark:text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-2/4 sm:w-full max-w-[300px] p-2 md:p-5 border-r border-zinc-200 dark:border-zinc-800 ">
        {/* Search Input */}
        <div className="flex mb-6 w-full">
          <input
            type="search"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-zinc-300 dark:border-zinc-700 rounded-l-xl px-3 py-1 md:py-2 bg-white dark:bg-zinc-900 outline-none"
          />
          <button className="bg-primary dark:bg-amber-700 text-white rounded-r-xl px-2 md:px-4">
            Search
          </button>
        </div>

        {/* Categories */}
        <h2 className="text-xl font-bold mb-3">Categories</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`block w-full text-left px-4 py-2 rounded-xl font-medium text-sm md:text-base transition-all duration-200 ${
                selectedCategory === category.slug
                  ? "bg-orange-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 hover:bg-orange-500 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Products */}
      <main className="w-full p-2 md:p-5 ">
        {state === "loading" ? (
          <div className="flex items-center justify-center h-[300px]">
            <Loader className="w-10 h-10 animate-spin text-orange-600" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-lg font-semibold opacity-70">
              No products found in this category
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Categories;
