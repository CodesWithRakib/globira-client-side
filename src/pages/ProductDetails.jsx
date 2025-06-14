import React, { useState, useEffect } from "react";
import noImage from "/default.jpg";
import {
  BadgeCheck,
  CircleMinus,
  CirclePlus,
  Layers3,
  Star,
  PencilLine,
  StarHalf,
} from "lucide-react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import {
  FaCheckCircle,
  FaHeart,
  FaRegHeart,
  FaTimesCircle,
} from "react-icons/fa";

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(noImage);
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [userQuantity, setUserQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxios();

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };
  const {
    brandName,
    productName,
    category = "",
    productImage,

    productContent,
    description,
    price,
    minimumQuantity = 1,
    mainQuantity = 1,
    createdAt,
    _id,
  } = product;

  // Sample placeholder images if no product images are available
  const placeholderImages = [
    productImage,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
  ];

  const displayImages = placeholderImages;

  const handleThumbnailClick = (img, index) => {
    setMainImage(img);
    setActiveThumbnail(index);
  };

  useEffect(() => {
    axiosSecure.get(`/api/products/${id}`).then((res) => {
      if (!res.data) {
        toast.error("Product not found");
        return;
      }

      if (res.data.productImage) {
        setMainImage(res.data.productImage);
        setProduct(res.data);
        setLoading(false);
      }
    });

    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get(`/api/reviews/${id}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();

    const mockReviews = [
      {
        id: 1,
        user: "Industrial Buyer 1",
        rating: 5,
        comment:
          "Excellent product quality and fast delivery. Will order again!",
        date: "2025-05-15",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 2,
        user: "Manufacturing Co.",
        rating: 4,
        comment: "Good value for money. Met our production needs perfectly.",
        date: "2023-09-28",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: 3,
        user: "Factory Solutions",
        rating: 4.5,
        comment:
          "Reliable supplier with consistent quality. Recommended for bulk orders.",
        date: "2023-08-10",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
      },
    ];
    setReviews(mockReviews);
  }, [id, axiosSecure]);

  const handleBuy = () => {
    const minQty = parseInt(minimumQuantity);
    const maxQty = parseInt(mainQuantity);

    if (userQuantity < minQty) {
      return toast.error(`You can't buy less than ${minQty} items!`);
    }

    if (userQuantity > maxQty) {
      return toast.error(`You can't buy more than ${maxQty} items!`);
    }

    const userInfo = {
      email: user?.email,
      name: user?.displayName,
      photoURL: user?.photoURL,
    };

    axiosSecure
      .post(`/api/buy-product/${_id}`, {
        quantity: userQuantity,
        userInfo,
      })
      .then(() => {
        toast.success("Product ordered successfully!");
      })
      .catch((error) => {
        toast.error(`Error ordering Product: ${error?.message}`);
        console.error(error);
      });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user || !rating || !newReview) return;

    const reviewData = {
      userId: user.uid,
      user: user.displayName,
      image: user.photoURL,
      rating,
      comment: newReview,
      productId: product._id, // or your dynamic product ID
      date: new Date().toISOString(),
    };
    console.log(reviewData);

    try {
      await axiosSecure
        .post(`/api/reviews/${product._id}`, reviewData)
        .then((res) => {
          setReviews((prevReviews) => [...prevReviews, res.data]);
          setNewReview("");
          toast.success("Review submitted successfully!");
        })
        .catch((error) => {
          console.log(error.response.data.message);
          toast.error(
            `Error submitting review: ${error?.response.data.message}`
          );
        });
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <span>Home</span>
        <span>/</span>
        <span>{category.split("-").join(" ")}</span>
        <span>/</span>
        <span className="text-primary">{productName}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800">
            <img
              src={mainImage}
              onError={(e) => (e.target.src = productImage || noImage)}
              alt={productName}
              className="w-full h-96 object-contain p-4 bg-gray-50 dark:bg-zinc-900"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-3">
            {displayImages.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  activeThumbnail === index
                    ? "border-primary dark:border-amber-500 ring-4 ring-primary/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
                onClick={() => handleThumbnailClick(img, index)}
              >
                <img
                  src={img}
                  onError={(e) => (e.target.src = noImage)}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-20 object-contain bg-gray-50 dark:bg-zinc-900"
                />
              </div>
            ))}
          </div>

          {/* Image Sources */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
            <p>Product images from "demo collection"</p>
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="space-y-6">
          {/* Product Header */}
          <div className="pb-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {productName}
              </h1>
              <button
                onClick={toggleWishlist}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isInWishlist ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-500" />
                )}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              {/* Rating */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                <div className="flex items-center mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= 4.5
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 fill-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  4.5 <span className="text-gray-500">(24 reviews)</span>
                </span>
              </div>

              {/* SKU */}
              <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                <span className="text-gray-500 mr-1">SKU:</span>
                <span className="font-mono">
                  {_id?.slice(0, 8).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Price and Availability */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-xl shadow-sm border border-blue-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-primary dark:text-amber-500">
                    ${price.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {mainQuantity > 0 ? (
                    <span className="flex items-center gap-1 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-200">
                      <FaCheckCircle className="text-green-500" />
                      In stock ({mainQuantity} available)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full dark:bg-red-900 dark:text-red-200">
                      <FaTimesCircle className="text-red-500" />
                      Out of stock
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline mr-1 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Lead time:
                    </span>
                    <span className="font-medium">2-3 business days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline mr-1 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Minimum order:
                    </span>
                    <span className="font-medium">{minimumQuantity} units</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="prose max-w-none dark:prose-invert">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Product Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="w-40 text-gray-600 dark:text-gray-400 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Brand
                  </span>
                  <span className="font-medium">{brandName}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-40 text-gray-600 dark:text-gray-400 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Category
                  </span>
                  <span className="font-medium capitalize">
                    {category.split("-").join(" ")}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="w-40 text-gray-600 dark:text-gray-400 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Material
                  </span>
                  <span className="font-medium">
                    High-grade industrial materials
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-40 text-gray-600 dark:text-gray-400 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-8h1V5h-1v2zm2 4h1V9h-1v2zm-4-4h1V5h-1v2zm4 4h1v-2h-1v2zm-8 0h1v-2H7v2zm4 4h1v-2h-1v2zm-4 0h1v-2H7v2zm4-4h1V9h-1v2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Dimensions
                  </span>
                  <span className="font-medium">Standard industry size</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Added on{" "}
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          {/* CTA Button */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-6 border-t border-gray-200 dark:border-gray-700 -mx-4 px-4">
            <div className="flex flex-col gap-3">
              {/* Minimum order notice */}
              {minimumQuantity > 1 && (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Minimum order: {minimumQuantity} units
                </div>
              )}

              {/* Order button */}
              <button
                onClick={() => window.my_modal_3.showModal()}
                className={`w-full py-4 rounded-xl font-bold transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2
        ${
          mainQuantity > 0
            ? "bg-primary hover:bg-primary/90 dark:bg-amber-600 dark:hover:bg-amber-700 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
        }`}
                disabled={mainQuantity <= 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                {mainQuantity > 0 ? "Proceed to Order" : "Out of Stock"}
              </button>

              {/* Quick action buttons */}
              <div className="flex gap-2">
                <button className="flex-1 btn btn-outline border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Save
                </button>
                <button className="flex-1 btn btn-outline border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  Enquire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          <button className="tab tab-bordered tab-active text-blue-600 font-medium transition-all duration-300">
            Description
          </button>
          <button className="tab tab-bordered text-gray-600 hover:text-blue-600 transition-all duration-300">
            Specifications
          </button>
          <button className="tab tab-bordered text-gray-600 hover:text-blue-600 transition-all duration-300">
            Reviews <span className="ml-1">({reviews.length})</span>
          </button>
        </div>

        <div className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              <BadgeCheck className="inline w-6 h-6 text-blue-500 mr-2" />
              Product Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {productContent}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Key Features */}
              <div>
                <h4 className="flex items-center gap-2 text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                  <Layers3 className="w-5 h-5" />
                  Key Features
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Premium industrial-grade materials for durability</li>
                  <li>Precision engineered for optimal performance</li>
                  <li>Compatible with standard industry equipment</li>
                  <li>Manufactured under strict quality control</li>
                  <li>Long service life with minimal maintenance</li>
                </ul>
              </div>

              {/* Applications */}
              <div>
                <h4 className="flex items-center gap-2 text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                  <Star className="w-5 h-5" />
                  Applications
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Industrial manufacturing processes</li>
                  <li>Factory production lines</li>
                  <li>Heavy machinery components</li>
                  <li>Equipment maintenance and repair</li>
                  <li>Large-scale construction projects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Summary */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Overall Rating
            </h3>
            <div className="flex items-center mb-4">
              <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mr-4">
                4.5
              </span>
              <div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={`${
                        star <= 4.5
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Based on 24 reviews
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const percentages = { 5: 70, 4: 20, 3: 7, 2: 2, 1: 1 };
                return (
                  <div key={rating} className="flex items-center">
                    <span className="w-10 text-sm font-medium text-gray-600">
                      {rating}★
                    </span>
                    <div className="flex-1 h-2 mx-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div
                        className="h-2 bg-yellow-400 rounded-full"
                        style={{ width: `${percentages[rating]}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-8 text-right">
                      {percentages[rating]}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Write Review Form */}
            {user && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <PencilLine className="w-5 h-5 text-blue-600" />
                  Write a Review
                </h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      Your Rating
                    </label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            size={24}
                            className={`${
                              star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <textarea
                      className="textarea textarea-bordered w-full resize-none"
                      placeholder="Share your experience with this product..."
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      rows="3"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                </form>
              </div>
            )}

            {/* Render Reviews */}
            {reviews?.map((review) => (
              <div
                key={review._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
              >
                <div className="flex items-start">
                  <div className="avatar mr-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={review.image}
                        alt={review.user}
                        onError={(e) => {
                          e.target.src =
                            "https://randomuser.me/api/portraits/lego/1.jpg";
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {review.user}
                        </h4>
                        <div className="flex items-center mt-1">
                          <div className="flex mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={`${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-md p-0 overflow-hidden">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-primary to-blue-600 dark:from-amber-700 dark:to-amber-800 p-4 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Order Confirmation</h2>
              <form method="dialog">
                <button className="btn btn-sm btn-circle bg-white/20 hover:bg-white/30 border-none text-white">
                  ✕
                </button>
              </form>
            </div>
            <p className="text-sm opacity-90 mt-1">Review your order details</p>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Customer Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary dark:text-amber-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                Customer Information
              </h3>
              <div className="space-y-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-500 dark:text-gray-400">
                      Full Name
                    </span>
                  </label>
                  <input
                    className="input input-bordered w-full bg-gray-50 dark:bg-gray-800"
                    value={user?.displayName || "Not provided"}
                    readOnly
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-500 dark:text-gray-400">
                      Email
                    </span>
                  </label>
                  <input
                    className="input input-bordered w-full bg-gray-50 dark:bg-gray-800"
                    value={user?.email || "Not provided"}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary dark:text-amber-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Order Summary
              </h3>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 dark:text-gray-300">
                    Product:
                  </span>
                  <span className="font-medium">{productName}</span>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 dark:text-gray-300">
                    Unit Price:
                  </span>
                  <span className="font-medium">
                    ${price.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Quantity:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setUserQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="btn btn-xs btn-circle btn-ghost text-gray-600 hover:text-primary dark:hover:text-amber-600"
                      disabled={userQuantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-12 text-center border rounded font-medium py-1 bg-white dark:bg-gray-900"
                      value={userQuantity}
                      min={1}
                      max={mainQuantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val)) {
                          setUserQuantity(
                            Math.max(1, Math.min(mainQuantity, val))
                          );
                        }
                      }}
                    />
                    <button
                      onClick={() =>
                        setUserQuantity((prev) =>
                          Math.min(mainQuantity, prev + 1)
                        )
                      }
                      className="btn btn-xs btn-circle btn-ghost text-gray-600 hover:text-primary dark:hover:text-amber-600"
                      disabled={userQuantity >= mainQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-primary/10 dark:bg-amber-900/30 p-4 rounded-lg border border-primary/20 dark:border-amber-900/50">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Total Amount:
                </span>
                <span className="text-xl font-bold text-primary dark:text-amber-600">
                  $
                  {(price * userQuantity).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-action">
              <form method="dialog" className="w-full space-y-3">
                <button
                  onClick={handleBuy}
                  className="btn btn-primary dark:bg-amber-700 border-0 w-full py-3 text-lg font-bold"
                  disabled={mainQuantity <= 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Confirm Order
                </button>
                <button className="btn btn-ghost  w-full">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetails;
