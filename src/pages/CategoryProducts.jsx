import React from "react";
import { useParams } from "react-router";
import ProductCard from "../components/ProductCard";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { FiPackage } from "react-icons/fi";
import useTitle from "../hooks/useTitle";

const CategoryProducts = () => {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const { category } = useParams();

  const axiosSecure = useAxios();

  useTitle(`${category}`);
  useEffect(() => {
    axiosSecure
      .get(`/api/products?category=${category}`)
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(`Error: ${err?.response?.data?.message}`);
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Loading></Loading>
  ) : products.length > 0 ? (
    <>
      <div className="text-zinc-800 dark:text-zinc-100 py-10 px-5">
        <h1 className="text-2xl md:text-3xl font-bold px-5 mb-6 text-center">
          {category
            .split("-")
            .join(" ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      </div>
    </>
  ) : (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-full mb-6">
        <FiPackage className="w-10 h-10 text-gray-400 dark:text-gray-300" />
      </div>

      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
        No products found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
        It seems there's nothing here yet.
      </p>
    </div>
  );
};

export default CategoryProducts;
