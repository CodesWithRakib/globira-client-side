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
      color: "text-blue-500",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 156,
    },
    {
      id: 2,
      name: "Electronics",
      slug: "electronics-gadgets",
      icon: <Smartphone className="w-6 h-6" />,
      color: "text-blue-600",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e623c3c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 245,
    },
    {
      id: 3,
      name: "Fashion",
      slug: "fashion-apparel",
      icon: <Shirt className="w-6 h-6" />,
      color: "text-blue-700",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 189,
    },
    {
      id: 4,
      name: "Industrial Tools",
      slug: "industrial-machinery-tools",
      icon: <Wrench className="w-6 h-6" />,
      color: "text-blue-800",
      image:
        "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 76,
    },
    {
      id: 5,
      name: "Health & Beauty",
      slug: "health-beauty",
      icon: <HeartPulse className="w-6 h-6" />,
      color: "text-blue-900",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 98,
    },
    {
      id: 6,
      name: "Automotive",
      slug: "automotive-parts-accessories",
      icon: <Car className="w-6 h-6" />,
      color: "text-blue-500",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 124,
    },
    {
      id: 7,
      name: "Office Supplies",
      slug: "office-supplies-stationery",
      icon: <Briefcase className="w-6 h-6" />,
      color: "text-blue-600",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 87,
    },
    {
      id: 8,
      name: "Sports & Fitness",
      slug: "sports-fitness",
      icon: <Dumbbell className="w-6 h-6" />,
      color: "text-blue-700",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 132,
    },
    {
      id: 9,
      name: "Toys & Games",
      slug: "toys-games",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "text-blue-800",
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 95,
    },
    {
      id: 10,
      name: "Books & Media",
      slug: "books-media",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-blue-900",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 203,
    },
    {
      id: 11,
      name: "Pet Supplies",
      slug: "pet-supplies",
      icon: <PawPrint className="w-6 h-6" />,
      color: "text-blue-500",
      image:
        "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 68,
    },
    {
      id: 12,
      name: "Garden & Outdoor",
      slug: "garden-outdoor",
      icon: <Sprout className="w-6 h-6" />,
      color: "text-blue-600",
      image:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      productCount: 114,
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Shop By Categories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Discover products across all our carefully curated categories
        </motion.p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{
              y: -4,
            }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            onClick={() => navigate(`/category/${category.slug}`)}
            className="relative cursor-pointer group bg-white dark:bg-gray-800 p-5 rounded-xl flex flex-col items-center text-center border border-gray-100 dark:border-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

            {/* Icon Container */}
            <div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4 ${category.color} group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors duration-300`}
            >
              {category.icon}
            </div>

            {/* Category Image */}
            <div className="relative mb-3 overflow-hidden rounded-lg w-full h-20">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Category Name */}
            <p className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {category.name}
            </p>

            {/* Product Count */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {category.productCount} products
            </p>

            {/* Shop Now Link */}
            <span className="mt-1 text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors duration-200">
              Shop Now →
            </span>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mt-12"
      >
        <button
          onClick={() => navigate("/categories")}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Browse All Categories
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
};

export default ProductCategory;
