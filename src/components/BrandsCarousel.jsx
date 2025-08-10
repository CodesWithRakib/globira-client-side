import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Star, Award } from "lucide-react";
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
    <section className="py-20relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100 dark:bg-blue-900/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-100 dark:bg-indigo-900/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4  relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                  <Award className="w-4 h-4 mr-2" />
                  PREMIUM PARTNERS
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Trusted by{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Global Brands
                </span>
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                We partner with industry leaders worldwide to bring you the best
                products
              </p>
            </div>

            <motion.button
              onClick={() => navigate("/partners")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-full group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-500 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center">
                View All Partners
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.button>
          </div>

          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
        </motion.div>

        {/* Marquee Section */}
        <div className="relative overflow-hidden py-8 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
          {/* Decorative Stars */}
          <div className="absolute top-6 left-6 text-yellow-400">
            <Star className="w-6 h-6 fill-current animate-pulse" />
          </div>
          <div className="absolute bottom-6 right-6 text-yellow-400">
            <Star className="w-6 h-6 fill-current animate-pulse" />
          </div>

          {/* Top Row */}
          <Marquee pauseOnHover speed={40} gradient={false} className="py-4">
            <div className="flex gap-12 px-4">
              {brands.slice(0, 6).map((brand) => (
                <motion.div
                  key={`top-${brand.id}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="flex-shrink-0 flex flex-col items-center justify-center"
                >
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 w-40 h-40 flex items-center justify-center group">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-h-20 w-auto object-contain filter dark:invert grayscale hover:grayscale-0 opacity-70 group-hover:opacity-100 transition duration-500"
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
            <div className="flex gap-12 px-4">
              {brands.slice(6).map((brand) => (
                <motion.div
                  key={`bottom-${brand.id}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="flex-shrink-0 flex flex-col items-center justify-center"
                >
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 w-40 h-40 flex items-center justify-center group">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-h-20 w-auto object-contain filter dark:invert grayscale hover:grayscale-0 opacity-70 group-hover:opacity-100 transition duration-500"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Marquee>
        </div>

        {/* Bottom CTA for mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:hidden"
        >
          <motion.button
            onClick={() => navigate("/partners")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-full group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center">
              View All Partners
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsCarousel;
