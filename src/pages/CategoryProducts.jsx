import React from "react";
import { useParams } from "react-router";
import ProductCard from "../components/ProductCard";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import Loading from "../components/Loading";

const CategoryProducts = () => {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const { category } = useParams();
  console.log(category);

  const axiosSecure = useAxios();

  useEffect(() => {
    window.scrollTo(0, 0);
    axiosSecure.get(`/api/products?category=${category}`).then((res) => {
      setProducts(res.data.data);
      setLoading(false);
    });
  });
  return loading ? (
    <Loading></Loading>
  ) : (
    <div className="py-10 px-5">
      <h1 className="text-2xl font-bold mb-5">
        {category.toUpperCase().split("-").join(" ")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
