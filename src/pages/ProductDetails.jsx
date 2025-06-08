import React, { use, useState } from "react";
import noImage from "/default.jpg";
import { AuthContext } from "../Auth/AuthProvider";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";

const ProductDetails = () => {
  const [userQuantity, setUserQuantity] = useState(1);
  const { user } = use(AuthContext);
  const axios = useAxios();
  const product = useLoaderData();

  const {
    brandName,
    productName,
    productImage,
    description,
    price,
    minimumQuantity,
    mainQuantity,
  } = product;
  console.log(userQuantity);

  const handleBuy = () => {
    const minimumSellingQuantity = parseInt(minimumQuantity);
    const mainSellingQuantity = parseInt(mainQuantity);
    console.log(minimumSellingQuantity, userQuantity, mainSellingQuantity);
    if (userQuantity < minimumSellingQuantity) {
      toast.error("You can't buy less than minimum quantity!");
    }

    if (userQuantity > mainSellingQuantity) {
      toast.error("You can't buy more than available quantity!");
    }

    const userInfo = {
      email: user?.email,
      name: user?.displayName,
      photoURL: user?.photoURL,
    }

    if (
      userQuantity >= minimumSellingQuantity &&
      userQuantity <= mainSellingQuantity
    ) {
      // toast.success("Product ordered successfully!");

      axios
        .post(`/api/buy-product/${product._id}`, {
          quantity: userQuantity,
          userInfo
        })
        .then((res) => {
          console.log(res);
          toast.success("Product ordered successfully!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-5 ">
        <figure>
          <img src={noImage} alt="" />
        </figure>

        <div className="flex flex-col gap-2 p-5">
          <h1 className="text-3xl font-bold">{productName}</h1>
          <div className="flex gap-5 items-center">
            <p>⭐⭐⭐⭐⭐</p>
            <p>4.5 (based on 254 reviews)</p>
          </div>
          <p className="my-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
            expedita omnis facilis reprehenderit consequuntur vero! Quaerat
            expedita tenetur magni repellat!
            {description}
          </p>

          <div className="pb-5">
            <p className="font-bold text-primary">${price}</p>
            <p>Lorem, ipsum dolor.{mainQuantity}</p>
            <p>Lorem, ipsum dolor. {minimumQuantity}</p>
          </div>

          <button
            onClick={() => window.my_modal_3.showModal()}
            className="w-full bg-primary text-white rounded-2xl"
          >
            Buy Now
          </button>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          {/* <button
            className="btn"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            open modal
          </button> */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="flex flex-col gap-2 ">
                <div className="flex flex-col gap-2 items-center">
                  <h2 className="text-2xl font-medium">User Info</h2>
                  <label className="input validator">
                    <svg
                      className="h-[1em] opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </g>
                    </svg>
                    <input
                      type="text"
                      required
                      defaultValue={user?.displayName}
                      placeholder="Username"
                      title="Only letters, numbers or dash"
                      readOnly
                    />
                  </label>

                  <label className="input validator">
                    <svg
                      className="h-[1em] opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </g>
                    </svg>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      placeholder="mail@site.com"
                      required
                      readOnly
                    />
                  </label>
                </div>

                <div className="flex justify-between gap-2 py-5">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setUserQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="rounded-full bg-primary text-white"
                    >
                      <CircleMinus size={35} />
                    </button>
                    <input
                      type="number"
                      value={userQuantity}
                      min={1}
                      max={100}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setUserQuantity(Math.min(100, Math.max(1, value))); // Clamp between 1 and 5
                        }
                      }}
                      className="w-12 text-center border rounded"
                    />
                    <button
                      onClick={() =>
                        setUserQuantity((prev) => Math.min(100, prev + 1))
                      }
                      className="rounded-full bg-primary text-white"
                    >
                      <CirclePlus size={35} />
                    </button>
                  </div>
                  <button
                    onClick={handleBuy}
                    className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </dialog>

          <div>
            <p>Delivery</p>
            <p>Free Delivery</p>
            <p>Free Delivery</p>
            <p>Free Delivery</p>
            <p>Free Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
