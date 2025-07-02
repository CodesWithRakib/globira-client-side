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
    },
    {
      id: 2,
      name: "LG",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/LG_symbol.svg/640px-LG_symbol.svg.png",
    },
    {
      id: 3,
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png",
    },
    {
      id: 4,
      name: "Philips",
      logo: "https://1000logos.net/wp-content/uploads/2017/05/Phillips-Logo-2008.png",
    },
    {
      id: 5,
      name: "HP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/640px-HP_logo_2012.svg.png",
    },
    {
      id: 6,
      name: "Canon",
      logo: "https://global.canon/en/corporate/logo/img/logo_01.png",
    },
    {
      id: 7,
      name: "Sony",
      logo: "https://download.logo.wine/logo/Sony/Sony-Logo.wine.png",
    },
    {
      id: 8,
      name: "Dell",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/640px-Dell_logo_2016.svg.png",
    },
    {
      id: 9,
      name: "Lenovo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Lenovo_Global_Corporate_Logo.png/2560px-Lenovo_Global_Corporate_Logo.png",
    },
    {
      id: 10,
      name: "Asus",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/640px-ASUS_Logo.svg.png",
    },
    {
      id: 11,
      name: "Xiaomi",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/640px-Xiaomi_logo_%282021-%29.svg.png",
    },
    {
      id: 12,
      name: "Nikon",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_40djQHDIYBoFXTfMmMOsevlq2PzKA4QzHQ&s",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-amber-100 dark:bg-amber-900/20 px-4 py-2 rounded-full">
            <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Our Trusted Partners
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Official Brand Partners
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-3 text-base">
            We maintain direct partnerships with these industry-leading
            manufacturers.
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300"
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                {/* Brand Logo */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="h-16 w-auto object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Brand Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {brand.name}
                </h3>

                {/* Category */}
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 mb-3">
                  {brand.category}
                </span>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                  {brand.description}
                </p>

                {/* Partner Since */}
                <div className="w-full border-t border-gray-100 dark:border-gray-700 pt-3">
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
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mx-auto px-6 py-3 text-sm font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ViewAllPartners;
