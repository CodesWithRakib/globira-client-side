import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

const ProductCategory = () => {
  const navigate = useNavigate();
  const category = [
    {
      id: 1,
      name: "Home and Kitchen",
      image: "https://i.ibb.co/MDFqrqKt/home.png",
      slug: "home-kitchen-appliances",
    },
    {
      id: 2,
      name: "Electronics and Gadgets",
      image: "https://i.ibb.co/VpwQJ76L/electronics.png",
      slug: "electronics-gadgets",
    },
    {
      id: 3,
      name: "Fashion and Aparel",
      image: "https://i.ibb.co/GyTS4CV/fashion.jpg",
      slug: "fashion-apparel",
    },
    {
      id: 4,
      name: "Industrial Machinery and Tools",
      image: "https://i.ibb.co/Xkv0BqpD/industrial.png",
      slug: "industrial-machinery-tools",
    },
    {
      id: 5,
      name: "Health and Beauty",
      image: "https://i.ibb.co/kVqGQZDj/health.jpg",
      slug: "health-beauty",
    },
    {
      id: 6,
      name: "Automotive parts and accessories",
      image: "https://i.ibb.co/YTFZ7pJw/automotive.jpg",
      slug: "automotive-parts-accessories",
    },
    {
      id: 7,
      name: "Office Supplies and Stationery",
      image: "https://i.ibb.co/bM70HmKZ/office.png",
      slug: "office-supplies-stationery",
    },
  ];
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-[#010313]">
      <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-6 text-center">
        🛍️ Discover All Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {category.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            onClick={() => navigate(`/category/${category.slug}`)}
            className="cursor-pointer group bg-white dark:bg-zinc-950 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden mb-3">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-[#FF6600] transition">
              {category.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
