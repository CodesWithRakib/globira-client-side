import React from "react";
import { FaEdit, FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import defaultImage from "/default.jpg";
import useAxios from "../hooks/useAxios";
import Rating from "react-rating";
import { Link } from "react-router";
import { formatCategory } from "../Utils/formatCategory";

const MyProductCard = ({ product, setProducts, products }) => {
  const {
    _id,
    brandName,
    productName,
    price,
    mainQuantity,
    minimumQuantity,
    productImage,
    rating = 0,
    category,
    description,
  } = product;

  const axiosSecure = useAxios();

  const handleDelete = () => {
    Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: localStorage.getItem("theme") === "dark" ? "#1a202c" : "#fff",
      color: localStorage.getItem("theme") === "dark" ? "#fff" : "#1a202c",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/products/${_id}`)
          .then((res) => {
            if (res.data.result.deletedCount > 0) {
              toast.success("Product deleted successfully");
              const remainingProducts = products.filter((p) => p._id !== _id);
              setProducts(remainingProducts);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Failed to delete product");
          });
      }
    });
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          src={productImage || defaultImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
          alt={productName}
        />
        {/* Stock Status Badge */}
        <span
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
            minimumQuantity > 100
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {minimumQuantity > 100 ? "In Stock" : "Low Stock"}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Category */}
        <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          {formatCategory(category)}
        </span>

        {/* Product Name */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
          {productName}
        </h2>

        {/* Brand */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Brand: <span className="font-medium">{brandName}</span>
        </p>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {description || "No description available"}
        </p>

        {/* Quantity Info */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Main Qty:
            </p>
            <p className="font-medium">{mainQuantity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Min Qty:</p>
            <p className="font-medium">{minimumQuantity}</p>
          </div>
        </div>

        {/* Price and Rating */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            ${price}
          </div>
          <div className="flex items-center">
            <Rating
              initialRating={rating}
              readonly
              emptySymbol={
                <FaStar className="text-gray-300 dark:text-gray-600" />
              }
              fullSymbol={<FaStar className="text-yellow-400" />}
              fractions={2}
            />
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
              ({rating})
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3">
          <Link
            to={`/update-product/${_id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
          >
            <FaEdit /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
          >
            <MdDelete /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProductCard;
