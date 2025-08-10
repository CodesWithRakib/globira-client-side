import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { useNavigate } from "react-router";

const BrandsCarousel = () => {
  const navigate = useNavigate();

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
    <section className="py-12 bg-white dark:bg-gray-900">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Trusted <span className="text-blue-600">Brands</span>
              </h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                We partner with industry leaders worldwide
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => navigate("/partners")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            View all partners <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="h-1 w-20 bg-blue-500 rounded-full" />
      </motion.div>

      {/* Marquee Section */}
      <div className="relative overflow-hidden py-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        {/* Top Row */}
        <Marquee pauseOnHover speed={40} gradient={false} className="py-4">
          <div className="flex gap-8 px-4">
            {brands.slice(0, 6).map((brand) => (
              <motion.div
                key={`top-${brand.id}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="flex-shrink-0 flex flex-col items-center justify-center"
              >
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition duration-300 w-32 h-32 flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-h-16 w-auto object-contain filter dark:invert grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition duration-300"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Marquee>

        {/* Bottom Row (reverse direction) */}
        <Marquee
          pauseOnHover
          speed={35}
          gradient={false}
          direction="right"
          className="py-4"
        >
          <div className="flex gap-8 px-4">
            {brands.slice(6).map((brand) => (
              <motion.div
                key={`bottom-${brand.id}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="flex-shrink-0 flex flex-col items-center justify-center"
              >
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition duration-300 w-32 h-32 flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-h-16 w-auto object-contain filter dark:invert grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition duration-300"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Marquee>

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 text-yellow-400">
          <Star className="w-6 h-6 fill-current" />
        </div>
        <div className="absolute bottom-4 right-4 text-yellow-400">
          <Star className="w-6 h-6 fill-current" />
        </div>
      </div>

      {/* Bottom CTA for mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-8 sm:hidden"
      >
        <motion.button
          onClick={() => navigate("/partners")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View All Partners
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default BrandsCarousel;
