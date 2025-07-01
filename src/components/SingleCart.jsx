import React from "react";
import noImage from "/default.jpg";
import useAxios from "../hooks/useAxios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FiTrash2,
  FiCalendar,
  FiShoppingBag,
  FiDollarSign,
} from "react-icons/fi";
import { formatCategory } from "../Utils/formatCategory";

const SingleCart = ({ cart, setCarts, carts }) => {
  const {
    _id,
    productName,
    productBrand,
    productImage,
    buyingDate,
    category,
    description,
    buyerQuantity,
    unitPrice,
  } = cart;

  const axiosSecure = useAxios();

  const handleRemove = () => {
    Swal.fire({
      title: "Remove this item?",
      text: "This product will be removed from your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      background: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#000",
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/carts/${_id}`)
          .then((res) => {
            toast.success(res.data.message || "Item removed successfully");
            setCarts(carts.filter((c) => c._id !== _id));
          })
          .catch((err) => {
            console.error("Remove error:", err);
            toast.error("Failed to remove item");
          });
      }
    });
  };

  const formattedDate = new Date(buyingDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const totalPrice = (unitPrice * buyerQuantity).toLocaleString("en-IN", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const unitPriceFormatted = unitPrice.toLocaleString("en-IN", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <article
      aria-label={`Cart item: ${productName}`}
      className="relative flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-shadow hover:shadow-md"
    >
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
        <img
          src={productImage || noImage}
          onError={(e) => (e.target.src = noImage)}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2 py-1 bg-white dark:bg-gray-900 text-xs font-medium rounded-full shadow-sm select-none">
          {formatCategory(category)}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Brand & Name */}
        <header className="mb-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide select-text">
            {productBrand}
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 select-text">
            {productName}
          </h3>
        </header>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 select-text">
          {description}
        </p>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FiShoppingBag aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs">Quantity</p>
              <p className="font-medium">{buyerQuantity}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FiCalendar aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs">Added</p>
              <time
                dateTime={new Date(buyingDate).toISOString()}
                className="font-medium"
              >
                {formattedDate}
              </time>
            </div>
          </div>
        </div>

        {/* Price & Remove Button */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1 text-gray-900 dark:text-white font-bold text-lg">
            <FiDollarSign aria-hidden="true" />
            <span>{totalPrice}</span>
            {buyerQuantity > 1 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-normal">
                ({unitPriceFormatted} each)
              </span>
            )}
          </div>

          <button
            onClick={handleRemove}
            type="button"
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            aria-label={`Remove ${productName} from cart`}
          >
            <FiTrash2 className="w-4 h-4" aria-hidden="true" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default SingleCart;
