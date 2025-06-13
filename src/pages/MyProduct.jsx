import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import MyProductCard from "../components/MyProductCard";
import NoProduct from "../components/NoProduct";
import Loading from "../components/Loading";
import useAxios from "../hooks/useAxios";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router";

const MyProduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(
          `/api/products?email=${user?.email}`
        );
        setProducts(response.data.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchProducts();
    }
  }, [user?.email, axiosSecure]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center p-4 max-w-md">
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      {products?.length === 0 ? (
        <NoProduct />
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6">
            <h1 className="text-3xl font-bold dark:text-white">My Products</h1>
            <button
              onClick={() => navigate("/add-product")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiPlus /> Add New Product
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product) => (
              <MyProductCard
                key={product._id}
                product={product}
                setProducts={setProducts}
                products={products}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProduct;
