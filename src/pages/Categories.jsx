import React from "react";
import { useLoaderData, useNavigation } from "react-router";
import ProductCard from "../components/ProductCard";
import { Loader } from "lucide-react";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(
    "electronics-gadgets"
  );
  const { data } = useLoaderData();
  const { state } = useNavigation();
  const [products, setProducts] = React.useState(data);

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );
  console.log(filteredProducts);
  const categories = [
    {
      id: 1,
      name: "Electronics & Gadgets",
      slug: "electronics-gadgets",
    },
    {
      id: 2,
      name: "Home & Kitchen Appliances",
      slug: "home-kitchen-appliances",
    },
    {
      id: 3,
      name: "Fashion & Apparel",
      slug: "fashion-apparel",
    },
    {
      id: 4,
      name: "Industrial Machinery & Tools",
      slug: "industrial-machinery-tools",
    },
    {
      id: 5,
      name: "Health & Beauty",
      slug: "health-beauty",
    },
    {
      id: 6,
      name: "Automotive Parts & Accessories",
      slug: "automotive-parts-accessories",
    },
    {
      id: 7,
      name: "Office Supplies & Stationery",
      slug: "office-supplies-stationery",
    },
  ];
  return (
    <div className="flex gap-5 min-h-screen h-screen   p-5 overflow-y-auto">
      <div className=" w-1/4 max-w-[300px]  p-2 overflow-auto">
        <div className="flex rounded-md  ">
          <input
            type="search"
            className="w-full border-zinc-300 border-1 rounded-l-xl "
          />
          <button className="bg-primary dark:bg-amber-700 dark:text-white rounded-r-xl px-3 ">
            Search
          </button>
        </div>

        <div className="mt-5">
          <h2 className="text-2xl font-bold">Categories</h2>
          {categories.map((category) => (
            <div
              key={category.id}
              className="my-2   px-2 py-2 rounded-2xl bg-orange-600 dark:bg-zinc-950 text-white text-sm sm:text-base md:text-lg"
            >
              <button
                className="text-center"
                onClick={() => setSelectedCategory(category.slug)}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full   p-2 overflow-auto">
        {state === "loading" ? (
          <div className="flex items-center justify-center h-[calc(100vh-441px)]">
            <Loader className="w-20 h-20 animate-spin"></Loader>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 items-center justify-center">
            {filteredProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-441px)]">
            <h1 className="text-2xl font-bold">No products found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
