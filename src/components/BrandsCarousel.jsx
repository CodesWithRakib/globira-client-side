import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";

const BrandsCarousel = () => {
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
    <section className="py-16 bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-amber-100 dark:bg-amber-900/20 px-4 py-2 rounded-full">
            <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Trusted Brand Partners
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Recognized Global Manufacturers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-3 text-base">
            We proudly collaborate with leading brands to deliver reliable
            products for your business.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />

          <Marquee pauseOnHover speed={40} gradient={false} className="py-3">
            <div className="flex gap-10 px-4">
              {brands.map((brand) => (
                <motion.div
                  key={brand.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="flex-shrink-0 flex flex-col items-center"
                >
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition duration-300">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="h-12 w-auto object-contain grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition duration-300"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 font-medium">
                    {brand.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </Marquee>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 mx-auto px-6 py-3 text-sm font-medium rounded-full border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-colors dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-white"
          >
            View All Partners
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsCarousel;
