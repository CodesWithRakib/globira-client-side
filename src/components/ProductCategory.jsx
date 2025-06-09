import React from "react";
import { useNavigate } from "react-router";

const ProductCategory = () => {
  const navigate = useNavigate();
  const category = [
    {
      id: 1,
      name: "Home and Kitchen",
      image: "https://i.ibb.co/MDFqrqKt/home.png",
      slug: "home-kitchen",
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
      slug: "industrial-machinery",
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
      slug: "automotive-parts",
    },
    {
      id: 7,
      name: "Office Supplies and Stationery",
      image: "https://i.ibb.co/bM70HmKZ/office.png",
      slug: "office-supplies",
    },
  ];
  return (
    <div className="p-5 ">
      <h2 className="text-2xl font-bold text-zinc-950 mb-2">
        Discover all category
      </h2>
      <div className="rounded-md items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {category.map((category) => (
          <div
            onClick={() => navigate(`/category/${category.slug}`)}
            key={category.id}
            className="flex gap-2 p-4 bg-white text-zinc-950 rounded-md items-center "
          >
            <img src={category.image} alt="" className="w-12 h-12" />
            <p className="w-full md:w-40">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
