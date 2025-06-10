import React from "react";
import { useLoaderData } from "react-router";
import SingleCart from "../components/SingleCart";

const Cart = () => {
  const { result: allCarts } = useLoaderData();
  console.log(allCarts);
  const [carts, setCarts] = React.useState(allCarts);

  return (
    <div className="bg-red-400 py-10">
      <div className="text-center p-10 ">
        <h3 className="text-3xl">Your Shopping Cart </h3>
      </div>
      <div className="flex justify-between  p-5">
        <h4>Cart</h4>
        <p>Clear All</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        {carts.map((cart) => (
          <SingleCart
            key={cart._id}
            cart={cart}
            setCarts={setCarts}
            carts={carts}
          ></SingleCart>
        ))}
      </div>
    </div>
  );
};

export default Cart;
