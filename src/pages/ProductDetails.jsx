import React, { use, useState } from "react";
import noImage from "/default.jpg";
import { AuthContext } from "../Auth/AuthProvider";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import Loading from "../components/Loading";

const ProductDetails = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [userQuantity, setUserQuantity] = useState(1);
  const { user } = use(AuthContext);
  const { id } = useParams();
  const axiosSecure = useAxios();

  const {
    brandName,
    productName,
    category,
    productImage,
    productContent,
    description,
    price,
    minimumQuantity,
    mainQuantity,
    createdAt,
  } = product;

  const handleBuy = () => {
    const minimumSellingQuantity = parseInt(minimumQuantity);
    const mainSellingQuantity = parseInt(mainQuantity);
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
    };

    if (
      userQuantity >= minimumSellingQuantity &&
      userQuantity <= mainSellingQuantity
    ) {
      axiosSecure
        .post(`/api/buy-product/${product._id}`, {
          quantity: userQuantity,
          userInfo,
        })
        .then((res) => {
          console.log(res);
          toast.success("Product ordered successfully!");
        })
        .catch((error) => {
          toast.error(`Error ordering Product: ${error?.message}`);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    axiosSecure.get(`/api/products/${id}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  });
  return loading ? (
    <Loading></Loading>
  ) : (
    <div className="my-10">
      <h1 className="text-3xl font-bold px-5">Product Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <div className=" bg-base-100 flex flex-col gap-5 p-5 ">
          <figure>
            <img
              src={productImage ? productImage : noImage}
              onError={(e) => (e.target.src = noImage)}
              alt=""
              className="rounded-lg"
            />
          </figure>

          <div className="flex flex-col gap-5 p-4">
            <div>
              <p className="text-xl font-medium">Details</p>
              <p className="">{productContent}</p>
            </div>

            <div>
              <p className="text-xl font-medium">Features</p>
              <div className="">
                <p>- Premium quality materials</p>
                <p>- Durable and long-lasting</p>
                <p>- Designed for industrial and wholesale buyers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-4 ">
          <div>
            <h1 className="text-3xl font-bold">{productName}</h1>
            <p>{category.split("-").join(" ").toUpperCase()}</p>
            <p>{brandName}</p>
          </div>
          <div className="">
            <p>User Reviews</p>
            <div className="flex  gap-5">
              <p>⭐⭐⭐⭐⭐</p>
              <p>4.5 (based on 254 reviews)</p>
            </div>
          </div>
          <p className="my-5">{description}</p>

          <div className="pb-5">
            <p className="font-bold text-primary dark:text-amber-700">
              ${price}/unit
            </p>
            <div className="mt-2 font-semibold">
              <p>
                Total Quantity:{" "}
                <span className="text-green-500">{mainQuantity}</span>
              </p>
              <p>
                Minimum Selling Quantity:{" "}
                <span className="text-red-500 ">{minimumQuantity}</span>
              </p>
              <p className="text-red-700 text-xs">
                You Can't buy less than {minimumQuantity}
              </p>
              <p>Product added at : {createdAt} </p>
            </div>
          </div>

          <button
            onClick={() => window.my_modal_3.showModal()}
            className="w-full bg-primary dark:bg-amber-700 text-white rounded-2xl"
          >
            Buy Now
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
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
                  <div className="flex gap-5">
                    <button
                      onClick={() =>
                        setUserQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="rounded-full dark:text-white text-amber-700"
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
                      className="w-12 text-center border rounded font-medium border-amber-700"
                    />
                    <button
                      onClick={() =>
                        setUserQuantity((prev) => Math.min(100, prev + 1))
                      }
                      className="rounded-full  dark:text-white text-amber-700"
                    >
                      <CirclePlus size={35} />
                    </button>
                  </div>
                  <button
                    onClick={handleBuy}
                    className="bg-primary dark:bg-amber-800 hover:bg-secondary text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </dialog>

          <div>
            <p className="text-gray-700 mt-4">
              This high-quality product is designed to meet your needs with
              precision and reliability. Built from durable materials and
              engineered for performance, it's the perfect solution for both
              personal and commercial use. Enjoy long-lasting functionality and
              unmatched value.
            </p>
            <ul className="list-disc pl-5 mt-4 text-gray-600 space-y-1">
              <li>✅ Premium build quality</li>
              <li>✅ Energy efficient and eco-friendly</li>
              <li>✅ 1-year warranty included</li>
              <li>✅ Available in multiple sizes and variants</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
