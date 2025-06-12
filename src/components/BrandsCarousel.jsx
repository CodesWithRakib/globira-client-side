import React from "react";
import Marquee from "react-fast-marquee";

const brands = [
  {
    id: 1,
    name: "Samsung",
    logo: "https://images.unsplash.com/photo-1696041756125-257354c459a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2Ftc3VuZyUyMGxvZ298ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    name: "LG",
    logo: "https://www.lg.com/content/dam/lge/global/our-brand/src/mocks/bs0009/download-detail--logo-02.png",
  },
  {
    id: 3,
    name: "Apple",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6RACuKQ8sJxNXI17b6tLyd4vmhraPT5OYmw&s",
  },
  {
    id: 4,
    name: "Philips",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJONtOn28ythjTMSYpYDFUSeZFDMndtfVI0g&s",
  },
  {
    id: 5,
    name: "HP",
    logo: "https://images.unsplash.com/photo-1654277040981-82984a49c63a?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Canon",
    logo: "https://global.canon/en/corporate/logo/img/logo_01.png",
  },
  // Add more brands if needed
];

const BrandsCarousel = () => {
  return (
    <section className="py-10 bg-white dark:bg-zinc-900 ">
      <h2 className="text-2xl font-bold text-center mb-6 text-zinc-800 dark:text-white">
        Our Trusted Brands
      </h2>
      <Marquee pauseOnHover speed={50} gradient={false}>
        <div className="flex gap-10 px-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex-shrink-0 flex flex-col items-center"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
              />
              <p className="text-sm mt-2 text-zinc-600 font-medium">
                {brand.name}
              </p>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default BrandsCarousel;
