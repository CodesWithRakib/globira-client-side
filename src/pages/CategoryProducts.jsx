import React from "react";
import { useLoaderData, useParams } from "react-router";
import ProductCard from "../components/ProductCard";

const CategoryProducts = () => {
  const { data } = useLoaderData();
  const { category } = useParams();
  console.log(category);
  return (
    <div className="py-10 px-5">
      <h1 className="text-2xl font-bold mb-5">
        {category.toUpperCase().split("-").join(" ")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
