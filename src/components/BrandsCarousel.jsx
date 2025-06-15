import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "motion/react";

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
    <section className="py-12 bg-gray-50 dark:bg-zinc-900/50 border-t border-b border-gray-200 dark:border-zinc-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-400 dark:to-amber-400 bg-clip-text text-transparent">
            Our Trusted Partners
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
            We collaborate with world-leading brands to bring you premium
            products
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 dark:from-zinc-900/50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 dark:from-zinc-900/50 to-transparent z-10"></div>

          <Marquee pauseOnHover speed={40} gradient={false} className="py-4">
            <div className="flex gap-12 px-4">
              {brands.map((brand) => (
                <motion.div
                  key={brand.id}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="flex-shrink-0 flex flex-col items-center group"
                >
                  <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-zinc-700">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-12 w-auto object-contain grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition duration-300"
                    />
                  </div>
                  <p className="text-sm mt-3 text-gray-600 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {brand.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </Marquee>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-6 py-2.5 text-sm font-medium rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white">
            View All Brand Partners
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsCarousel;
