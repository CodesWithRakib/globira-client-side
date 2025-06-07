import React from "react";
import noImage from "/default.jpg";
import { useNavigate } from "react-router";

const AllProductsCard = ({ product }) => {
  const {
    brandName,
    price,
    minimumQuantity,
    mainQuantity,
    description,
    productName,
    rating,
    productImage,
    category,
  } = product;
  const navigate = useNavigate();
  return (
    <div className="max-w-sm rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
      <img
        src={productImage ? productImage : noImage}
        onError={(e) => (e.target.src = noImage)}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-60 dark:bg-gray-500"
      />
      <div className="flex flex-col justify-between p-4 tracking-wide leading-tight space-y-8">
        <div className="space-y-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-wide">
              {productName}
            </h2>
            <h4>{category}</h4>
          </div>
          <p className="text-justify dark:text-gray-800">{description}</p>

          <div>
            <div className="flex items-center gap-5">
              <p>Brand:</p>
              <h3 className="font-semibold">{brandName.toUpperCase()}</h3>
            </div>
            <div className="flex items-center gap-5">
              <p>Main Quantity:</p>
              <h3 className="font-semibold">{mainQuantity}</h3>
            </div>
            <div className="flex items-center gap-5">
              <p>Minimum Quantity:</p>
              <h3 className="font-semibold">{minimumQuantity}</h3>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => navigate(`/update-product/${product._id}`)}
        className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-zinc-900 text-white dark:bg-violet-600 dark:text-gray-50"
      >
        Update
      </button>
    </div>
  );
};

export default AllProductsCard;
