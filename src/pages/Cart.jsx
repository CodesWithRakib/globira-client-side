import React from "react";
import SingleCart from "../components/SingleCart";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import Loading from "../components/Loading";

const Cart = () => {
  const [loading, setLoading] = React.useState(true);
  const [carts, setCarts] = React.useState([]);

  const axiosSecure = useAxios();

  useEffect(() => {
    window.scrollTo(0, 0);
    axiosSecure.get("/api/carts").then((res) => {
      setCarts(res.data.result);
      setLoading(false);
    });
  }, []);
  return loading ? (
    <Loading></Loading>
  ) : (
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
