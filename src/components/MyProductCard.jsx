import React from "react";
import { Link } from "react-router";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import defaultImage from "/default.jpg";
import useAxios from "../hooks/useAxios";

const MyProductCard = ({ product, setProducts, products }) => {
  const {
    brandName,
    productName,
    price,
    mainQuantity,
    minimumQuantity,
    productImage,
    rating,
    category,
  } = product;

  const axiosSecure = useAxios();

  const handleDelete = () => {
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
          .delete(`/api/products/${product._id}`)
          .then((res) => {
            if (res.data.result.deletedCount > 0) {
              toast.success("Product deleted successfully");
              const remainingProducts = products.filter(
                (p) => p._id !== product._id
              );
              setProducts(remainingProducts);
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error(`Error deleting Product!!`);
          });
      }
    });
  };
  return (
    <div
      className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 dark:text-white border border-gray-200 rounded-lg shadow-sm 
    text-zinc-800
    "
    >
      <a href="#">
        <img
          className=" w-full h-60 rounded-t-lg"
          src={product.productImage ? product.productImage : defaultImage}
          onError={(e) => {
            e.target.onerror = null; // prevents looping
            e.target.src = defaultImage;
          }}
          alt="product image"
        />
      </a>

      <div className="flex flex-col justify-between p-4 tracking-wide leading-tight space-y-8">
        <div className="space-y-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-wide">
              {productName}
            </h2>
            <h4>{category}</h4>
          </div>

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
      <div className="flex items-center justify-between p-5">
        <Link
          to={`/update-product/${product._id}`}
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          <FaEdit size={20} />
        </Link>
        <button
          onClick={handleDelete}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default MyProductCard;
