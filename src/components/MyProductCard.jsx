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
import { motion } from "motion/react";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-amber-200 dark:hover:shadow-amber-900"
    >
      {/* Product Image */}
      <div className="relative h-60 w-full overflow-hidden group">
        <motion.img
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
          src={productImage || defaultImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
          alt={productName}
        />
        {/* Stock Status Badge */}
        <motion.span
          whileHover={{ scale: 1.1 }}
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
            minimumQuantity > 100
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {minimumQuantity > 100 ? "In Stock" : "Low Stock"}
        </motion.span>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          {/* Category */}
          <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {formatCategory(category)}
          </span>

          {/* Rating */}
          <div className="flex items-center">
            <Rating
              initialRating={rating}
              readonly
              emptySymbol={
                <FaStar className="text-gray-300 dark:text-gray-600" />
              }
              fullSymbol={<FaStar className="text-amber-400" />}
              fractions={2}
            />
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
              ({rating})
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
          {productName}
        </h2>

        {/* Brand */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Brand: <span className="font-medium">{brandName}</span>
        </p>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {description || "No description available"}
        </p>

        {/* Quantity Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">Main Qty</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {mainQuantity}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">Min Qty</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {minimumQuantity}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold text-amber-600 dark:text-amber-400">
            ${price.toLocaleString("en-US")}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 min-w-[120px]"
          >
            <Link
              to={`/update-product/${_id}`}
              className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-all shadow-md"
            >
              <FaEdit className="text-sm" /> Edit
            </Link>
          </motion.button>

          <motion.button
            onClick={handleDelete}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all shadow-md"
          >
            <MdDelete className="text-sm" /> Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProductCard;
