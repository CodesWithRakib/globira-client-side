import React from "react";
import noImage from "/default.jpg";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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
  } = cart;

  const axiosSecure = useAxios();
  const handleRemove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/carts/${_id}`)
          .then((res) => {
            toast.success(
              `${
                res.data.message
                  ? res.data.message
                  : "Cart removed successfully"
              }`
            );
            const remainingCarts = carts.filter((c) => c._id !== _id);
            setCarts(remainingCarts);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Cart remove failed!");
          });
      }
    });
  };
  return (
    <div className="flex flex-col sm:flex-row gap-5 bg-amber-500 max-w-md p-5 rounded-2xl">
      <img
        src={productImage ? productImage : noImage}
        onError={(e) => (e.target.src = noImage)}
        alt=""
        className="w-full sm:h-80 sm:w-40 object-cover"
      />

      <div className="flex flex-col gap-5">
        <div>
          <p className="font-semibold">{productName}</p>
          <p>{productBrand}</p>
          <p>{category}</p>
        </div>
        <p>
          {description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Harum, temporibus?
        </p>
        <div>
          <p> Quantity:{buyerQuantity}</p>
          <p>Buying Date:{buyingDate}</p>
        </div>
        <button
          onClick={handleRemove}
          className="bg-red-500  px-5 rounded-2xl text-white"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default SingleCart;
