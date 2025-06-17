import React, { useState, useEffect } from "react";
import MyProductCard from "../components/MyProductCard";
import NoProduct from "../components/NoProduct";
import Loading from "../components/Loading";
import useAxios from "../hooks/useAxios";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";

const MyProduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(0);

  useTitle(`My Product`);
  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.email) return;

      setLoading(true);
      try {
        const response = await axiosSecure.get(
          `/api/products?email=${user.email}&page=${page}&limit=${limit}`
        );

        setProducts(response.data.data);
        const total = response.data.total || 0;
        setTotalPages(Math.ceil(total / limit));
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user?.email, axiosSecure, page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (loading) return <Loading />;

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
      {products.length === 0 ? (
        <NoProduct />
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6">
            <h1 className="text-3xl font-bold dark:text-white">My Products</h1>
            <button
              onClick={() => navigate("/add-product")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiPlus /> Add New Product
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <MyProductCard
                key={product._id}
                product={product}
                setProducts={setProducts}
                products={products}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                {[...Array(totalPages).keys()].map((i) => (
                  <button
                    key={i + 1}
                    className={`join-item btn ${
                      page === i + 1 ? "btn-active" : ""
                    }`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="join-item btn"
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProduct;
