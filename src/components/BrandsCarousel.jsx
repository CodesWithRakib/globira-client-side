import React from "react";

const brands = [
  { name: "Samsung", logo: "https://via.placeholder.com/120x60?text=Samsung" },
  { name: "LG", logo: "https://via.placeholder.com/120x60?text=LG" },
  { name: "Bosch", logo: "https://via.placeholder.com/120x60?text=Bosch" },
  { name: "Philips", logo: "https://via.placeholder.com/120x60?text=Philips" },
  { name: "HP", logo: "https://via.placeholder.com/120x60?text=HP" },
  { name: "Canon", logo: "https://via.placeholder.com/120x60?text=Canon" },
  // Add more brands if needed
];

const BrandsCarousel = () => {
  return (
    <section className="py-8 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">
        Our Trusted Brands
      </h2>
      <div className="flex items-center justify-center overflow-x-auto space-x-6 px-4">
        {brands.map((brand, index) => (
          <div key={index} className="flex-shrink-0">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandsCarousel;
