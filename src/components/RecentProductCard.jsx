import React from "react";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import noImage from "/default.jpg";

const RecentProductCard = ({ product }) => {
  const {
    _id,
    brandName,
    productName,
    productImage,
    price,
    rating,
    description,
    mainQuantity,
    minimumQuantity,
    sellerName,
    sellerPhotoURL,
    createdAt,
  } = product;
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow hover:shadow-md transition overflow-hidden">
      <img
        src={productImage || noImage}
        onError={(e) => (e.target.src = noImage)}
        alt={productName}
        className="w-full h-[200px] object-cover"
      />

      <div className="p-4 space-y-2 text-zinc-800 dark:text-zinc-100">
        <h2 className="text-lg font-semibold line-clamp-1">{productName}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Brand: <span className="font-medium">{brandName}</span>
        </p>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-bold">${price}</span>
          <Rating
            initialRating={parseFloat(rating)}
            readonly
            emptySymbol={<FaRegStar className="text-yellow-400" />}
            fullSymbol={<FaStar className="text-yellow-500" />}
            fractions={2}
          />
          <span className="text-xs text-gray-400">({rating})</span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>

        <div className="text-xs text-gray-400 dark:text-gray-400">
          <p>Stock: {mainQuantity}</p>
          <p>Min Order: {minimumQuantity}</p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <img
            src={sellerPhotoURL}
            alt={sellerName}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm">{sellerName}</span>
        </div>

        <p className="text-xs text-gray-400">
          Posted {formatDistanceToNow(new Date(createdAt))} ago
        </p>

        <button
          onClick={() => console.log("navigate to details", _id)}
          className="mt-2 w-full bg-[#FF6600] hover:bg-[#e65c00] text-white py-1.5 rounded text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default RecentProductCard;
