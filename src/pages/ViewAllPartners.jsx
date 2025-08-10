import React from "react";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";
import useTitle from "../hooks/useTitle";

const ViewAllPartners = () => {
  const navigate = useNavigate();
  useTitle("View All Partners");

  const brands = [
    {
      id: 1,
      name: "Samsung",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png",
      category: "Electronics",
      description: "Global leader in consumer electronics and digital media.",
      since: "2018",
    },
    {
      id: 2,
      name: "LG",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/LG_symbol.svg/640px-LG_symbol.svg.png",
      category: "Home Appliances",
      description: "Innovative home appliances and electronics solutions.",
      since: "2019",
    },
    {
      id: 3,
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png",
      category: "Consumer Electronics",
      description: "Revolutionary technology products and services.",
      since: "2017",
    },
    {
      id: 4,
      name: "Philips",
      logo: "https://1000logos.net/wp-content/uploads/2017/05/Phillips-Logo-2008.png",
      category: "Healthcare",
      description: "Health technology company improving people's health.",
      since: "2019",
    },
    {
      id: 5,
      name: "HP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/640px-HP_logo_2012.svg.png",
      category: "Computing",
      description: "Leading provider of computing and printing solutions.",
      since: "2020",
    },
    {
      id: 6,
      name: "Canon",
      logo: "https://global.canon/en/corporate/logo/img/logo_01.png",
      category: "Imaging",
      description: "Imaging and optical products worldwide.",
      since: "2018",
    },
    {
      id: 7,
      name: "Sony",
      logo: "https://download.logo.wine/logo/Sony/Sony-Logo.wine.png",
      category: "Entertainment",
      description: "Global leader in entertainment and technology.",
      since: "2019",
    },
    {
      id: 8,
      name: "Dell",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/640px-Dell_logo_2016.svg.png",
      category: "Computing",
      description: "Solutions and services for all your computing needs.",
      since: "2020",
    },
    {
      id: 9,
      name: "Lenovo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Lenovo_Global_Corporate_Logo.png/2560px-Lenovo_Global_Corporate_Logo.png",
      category: "Computing",
      description: "Global PC leader serving customers in 160+ countries.",
      since: "2021",
    },
    {
      id: 10,
      name: "Asus",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/640px-ASUS_Logo.svg.png",
      category: "Computing",
      description: "Premier manufacturer of motherboards and notebooks.",
      since: "2019",
    },
    {
      id: 11,
      name: "Xiaomi",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/640px-Xiaomi_logo_%282021-%29.svg.png",
      category: "Consumer Electronics",
      description: "Consumer electronics and smart devices.",
      since: "2022",
    },
    {
      id: 12,
      name: "Nikon",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_40djQHDIYBoFXTfMmMOsevlq2PzKA4QzHQ&s",
      category: "Imaging",
      description: "World-renowned for its cameras and optical products.",
      since: "2020",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-6 bg-blue-50 dark:bg-blue-900 px-5 py-2.5 rounded-full shadow-sm">
            <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Our Trusted Partners
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Official Brand Partners
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            We maintain direct partnerships with these industry-leading
            manufacturers.
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 h-full"
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                {/* Brand Logo */}
                <div className="p-5 bg-blue-50 dark:bg-blue-900/30 rounded-xl mb-5">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="h-20 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                {/* Brand Name */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {brand.name}
                </h3>
                {/* Category */}
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 mb-4">
                  {brand.category}
                </span>
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 flex-grow">
                  {brand.description}
                </p>
                {/* Partner Since */}
                <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Partner since {brand.since}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mx-auto px-6 py-3 text-sm font-medium rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewAllPartners;
