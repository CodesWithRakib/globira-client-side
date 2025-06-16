import React, { useEffect, useState } from "react";
import RecentProductCard from "./RecentProductCard";
import { FiPackage } from "react-icons/fi";
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";
import ErrorPage from "../pages/ErrorPage";

const RecentProduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const axiosSecure = useAxios();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get(
          `/api/products?sortBy=newest&page=1&limit=9`
        );
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Something went wrong while loading products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axiosSecure]);
  if (loading) return <Loading></Loading>;
  if (error) return <ErrorPage message={error}></ErrorPage>;
  return (
    <div className="text-zinc-800 dark:text-zinc-100 py-10 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl md:text-3xl font-bold px-5 mb-6 text-center">
        RECENTLY ADDED
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5">
          {products.map((product) => (
            <RecentProductCard
              key={product._id}
              product={product}
            ></RecentProductCard>
          ))}
        </div>
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
      )}
    </div>
  );
};

export default RecentProduct;
