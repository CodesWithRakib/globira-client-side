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
      color: "text-amber-500",
    },
    {
      id: 2,
      name: "Electronics",
      slug: "electronics-gadgets",
      icon: <Smartphone className="w-6 h-6" />,
      color: "text-blue-500",
    },
    {
      id: 3,
      name: "Fashion",
      slug: "fashion-apparel",
      icon: <Shirt className="w-6 h-6" />,
      color: "text-pink-500",
    },
    {
      id: 4,
      name: "Industrial Tools",
      slug: "industrial-machinery-tools",
      icon: <Wrench className="w-6 h-6" />,
      color: "text-gray-500",
    },
    {
      id: 5,
      name: "Health & Beauty",
      slug: "health-beauty",
      icon: <HeartPulse className="w-6 h-6" />,
      color: "text-red-500",
    },
    {
      id: 6,
      name: "Automotive",
      slug: "automotive-parts-accessories",
      icon: <Car className="w-6 h-6" />,
      color: "text-indigo-500",
    },
    {
      id: 7,
      name: "Office Supplies",
      slug: "office-supplies-stationery",
      icon: <Briefcase className="w-6 h-6" />,
      color: "text-yellow-500",
    },
    {
      id: 8,
      name: "Sports & Fitness",
      slug: "sports-fitness",
      icon: <Dumbbell className="w-6 h-6" />,
      color: "text-green-500",
    },
    {
      id: 9,
      name: "Toys & Games",
      slug: "toys-games",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "text-purple-500",
    },
    {
      id: 10,
      name: "Books & Media",
      slug: "books-media",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-emerald-500",
    },
    {
      id: 11,
      name: "Pet Supplies",
      slug: "pet-supplies",
      icon: <PawPrint className="w-6 h-6" />,
      color: "text-orange-500",
    },
    {
      id: 12,
      name: "Garden & Outdoor",
      slug: "garden-outdoor",
      icon: <Sprout className="w-6 h-6" />,
      color: "text-lime-500",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
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
              className="relative cursor-pointer group bg-white dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center text-center border border-gray-100 dark:border-gray-700 transition-all duration-200"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              {/* Background Color Change */}
              <div className="absolute inset-0 rounded-xl bg-white/80 dark:bg-gray-800/80 group-hover:bg-white/95 dark:group-hover:bg-gray-800/95 transition-all duration-300 -z-20" />

              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 ${
                  category.color
                } group-hover:${category.color.replace(
                  "text",
                  "bg"
                )}/10 transition-colors duration-300`}
              >
                {category.icon}
              </div>
              <p className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200">
                {category.name}
              </p>
              <span className="mt-1 text-xs text-gray-500 dark:text-gray-400 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors duration-200">
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
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
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
      </div>
    </section>
  );
};

export default ProductCategory;
