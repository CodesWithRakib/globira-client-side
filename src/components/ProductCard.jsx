import React from "react";
import noImage from "/default.jpg";

const ProductCard = ({ product }) => {
  const {
    productName,
    productImage,
    price,
    category,
    description,
    minimumQuantity,
    rating,
  } = product;
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-600">
      <img
        src={productImage ? productImage : noImage}
        onError={(e) => (e.target.src = noImage)}
        alt=""
      />
      <div>
        <div>
          <h3 className="font-semibold "> {productName}</h3>
          <h4 className="text-gray-500">{category}</h4>
        </div>
        <div className="mt-2">
          <p>{description}</p>
          <p>{minimumQuantity}</p>
          <div className="flex gap-5 justify-between items-center">
            <p>Price: {price}</p>
            <p>Rating: {rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
