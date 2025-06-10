import React from "react";
import noImage from "/default.jpg";
import { useNavigate } from "react-router";

const AllProductCard = ({ product }) => {
  const {
    productName,
    brandName,
    productImage,
    price,
    category,
    description,
    minimumQuantity,
    rating,
  } = product;

  const navigate = useNavigate();
  return (
    <div className="dark:bg-zinc-950 dark:text-white rounded-lg shadow-md w-full ">
      <img
        src={productImage ? productImage : noImage}
        onError={(e) => (e.target.src = noImage)}
        alt=""
        className="object-cover object-center w-full rounded-t-lg h-60 dark:bg-gray-500"
      />
      <div className="p-5">
        <div>
          <h3 className="font-semibold text-xl "> {productName}</h3>
          <h4 className="text-sm">{brandName}</h4>
          <h4 className="text-sm">
            {category.split("-").join(" ").toUpperCase()}
          </h4>
        </div>
        <p className="mt-2 text-justify">{description}</p>
        <div className="mt-2">
          <div>
            <p>Minimum Quantity for buy: {minimumQuantity}</p>
          </div>
          <div className="flex gap-5 justify-between items-center py-2">
            <p>Price: ${price}</p>
            <p>Rating: {rating}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(`/update-product/${product._id}`)}
        className="bg-primary dark:bg-amber-700 text-white px-4 py-2 rounded w-full"
      >
        Update
      </button>
    </div>
  );
};

export default AllProductCard;
