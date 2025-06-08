import React from "react";

import noImage from "/default.jpg";

const RecentProduct = ({ products }) => {
  console.log(products);
  return (
    <div className="text-zinc-400  ">
      <h1 className="text-2xl px-5 font-bold ">
        {"Recently added".toUpperCase()}
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-5 ">
        {products.map((product) => (
          <div key={product._id} className=" bg-zinc-900  rounded-xl  ">
            <img
              className="w-full h-[400px] object-cover rounded-lg"
              src={product.productImage ? product.productImage : noImage}
              onError={(e) => (e.target.src = noImage)}
              alt=""
            />

            <div className="p-3">
              <h1 className="text-lg font-semibold">{product.productName}</h1>
              <div className="flex gap-2 items-center">
                <div>
                  <p>{product.category}</p>
                </div>
                <div>
                  <p>{product.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProduct;
