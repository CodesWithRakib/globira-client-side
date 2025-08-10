import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Home,
  Smartphone,
  Shirt,
  Wrench,
  HeartPulse,
  Car,
  Briefcase,
  Dumbbell,
  Gamepad2,
  BookOpen,
  PawPrint,
  Sprout,
} from "lucide-react";

const ProductCategory = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      name: "Home & Kitchen",
      slug: "home-kitchen-appliances",
      icon: <Home className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 156,
    },
    {
      id: 2,
      name: "Electronics",
      slug: "electronics-gadgets",
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-indigo-500 to-indigo-700",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWxlY3Ryb25pY3N8ZW58MHwwfDB8fHww",
      productCount: 245,
    },
    {
      id: 3,
      name: "Fashion",
      slug: "fashion-apparel",
      icon: <Shirt className="w-6 h-6" />,
      color: "from-purple-500 to-purple-700",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 189,
    },
    {
      id: 4,
      name: "Industrial Tools",
      slug: "industrial-machinery-tools",
      icon: <Wrench className="w-6 h-6" />,
      color: "from-amber-500 to-amber-700",
      image:
        "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 76,
    },
    {
      id: 5,
      name: "Health & Beauty",
      slug: "health-beauty",
      icon: <HeartPulse className="w-6 h-6" />,
      color: "from-pink-500 to-pink-700",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 98,
    },
    {
      id: 6,
      name: "Automotive",
      slug: "automotive-parts-accessories",
      icon: <Car className="w-6 h-6" />,
      color: "from-red-500 to-red-700",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 124,
    },
    {
      id: 7,
      name: "Office Supplies",
      slug: "office-supplies-stationery",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-emerald-500 to-emerald-700",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 87,
    },
    {
      id: 8,
      name: "Sports & Fitness",
      slug: "sports-fitness",
      icon: <Dumbbell className="w-6 h-6" />,
      color: "from-green-500 to-green-700",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 132,
    },
    {
      id: 9,
      name: "Toys & Games",
      slug: "toys-games",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "from-yellow-500 to-yellow-700",
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 95,
    },
    {
      id: 10,
      name: "Books & Media",
      slug: "books-media",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-cyan-500 to-cyan-700",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 203,
    },
    {
      id: 11,
      name: "Pet Supplies",
      slug: "pet-supplies",
      icon: <PawPrint className="w-6 h-6" />,
      color: "from-orange-500 to-orange-700",
      image:
        "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 68,
    },
    {
      id: 12,
      name: "Garden & Outdoor",
      slug: "garden-outdoor",
      icon: <Sprout className="w-6 h-6" />,
      color: "from-lime-500 to-lime-700",
      image:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 114,
    },
  ];

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Explore Our Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Discover curated collections across our diverse range of premium
            products
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              onClick={() => navigate(`/category/${category.slug}`)}
              className="relative cursor-pointer group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Card Background with Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-0"
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  "--tw-gradient-from": `var(--from-color)`,
                  "--tw-gradient-to": `var(--to-color)`,
                }}
              ></div>

              {/* Card Content */}
              <div className="relative z-10 p-6 flex flex-col items-center h-full">
                {/* Icon Container with Gradient Background */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                >
                  {category.icon}
                </div>

                {/* Category Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl w-full h-32">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Category Name */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {category.name}
                </h3>

                {/* Product Count */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {category.productCount} products
                </p>

                {/* Shop Now Link */}
                <div className="mt-auto flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Shop Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() => navigate("/categories")}
            className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-full group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-500 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center text-lg">
              Browse All Categories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCategory;
