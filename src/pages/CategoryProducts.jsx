import React, { useEffect } from "react";
import { useParams } from "react-router";
import { FiPackage } from "react-icons/fi";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";
import { formatCategory } from "../Utils/formatCategory";

const CategoryProducts = () => {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const { category } = useParams();
  const axiosSecure = useAxios();

  useTitle(`${formatCategory(category)} Products`);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get(
          `/api/products?category=${category}`
        );
        setProducts(response.data.data);
      } catch (err) {
        toast.error(
          `Error: ${err?.response?.data?.message || "Failed to fetch products"}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, axiosSecure]);

  if (loading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-full mb-6 transition-colors duration-300">
          <FiPackage className="w-12 h-12 text-gray-400 dark:text-gray-300" />
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          No Products Available
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
          We couldn't find any products in the {formatCategory(category)}{" "}
          category.
        </p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 lg:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
          {formatCategory(category)} Products
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          Browse our collection of {formatCategory(category).toLowerCase()}{" "}
          products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default CategoryProducts;
