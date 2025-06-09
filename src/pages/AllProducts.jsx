import React, { useState } from "react";
import AllProductsCard from "../components/AllProductsCard";
import { useLoaderData, useNavigate } from "react-router";

const AllProducts = () => {
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [viewType, setViewType] = useState("card"); // 'card' or 'table'
  const { data } = useLoaderData();

  // Filter logic
  const filteredProducts = showAvailableOnly
    ? data.filter((product) => product.minimumQuantity > 100)
    : data;

  const navigate = useNavigate();
  const handleProductUpdate = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  return (
    <div className="p-4">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        {/* Filter button */}
        <button
          className="bg-[#ff0000] text-white px-4 py-2 rounded"
          onClick={() => setShowAvailableOnly((prev) => !prev)}
        >
          {showAvailableOnly ? "Show All Products" : "Show Available Products"}
        </button>

        {/* View dropdown */}
        <select
          className="bg-white border-2 text-gray-500 border-gray-400 p-2 rounded"
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>
      </div>

      {/* Products Display */}
      {viewType === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <AllProductsCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
          <h2 className="mb-4 text-2xl font-semibold leading-tight">
            Products
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col className="w-20" />
              </colgroup>
              <thead className="dark:bg-gray-300">
                <tr className="text-left">
                  <th className="p-3">Product Image</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3 ">Price</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                  >
                    <td className="p-3">
                      <img
                        src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                        alt=""
                        className="object-cover object-center w-full rounded-md h-20 dark:bg-gray-500"
                      />
                    </td>
                    <td className="p-3">
                      <p>{product.brandName}</p>
                    </td>
                    <td className="p-3">
                      <p>{product.productName}</p>
                    </td>
                    <td className="p-3">
                      <p>14 Jan 2022</p>
                      <p className="dark:text-gray-600">Friday</p>
                    </td>
                    <td className="p-3">
                      <p>01 Feb 2022</p>
                      <p className="dark:text-gray-600">Tuesday</p>
                    </td>
                    <td className="p-3 ">
                      <p>${product.price}</p>
                    </td>
                    <td
                      onClick={() => handleProductUpdate(product._id)}
                      className="p-3 "
                    >
                      <span className="px-3 py-1 font-semibold rounded-md  bg-zinc-900 text-white dark:bg-violet-600 dark:text-gray-50">
                        <span>Update</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
