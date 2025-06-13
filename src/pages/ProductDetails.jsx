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

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(noImage);
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [userQuantity, setUserQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  // const { user } = useContext(AuthContext);
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxios();

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
      setProduct(res.data);
      setLoading(false);
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
          <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-lg overflow-hidden">
            <img
              src={mainImage}
              onError={(e) => (e.target.src = noImage)}
              alt={productName}
              className="w-full h-96 object-contain p-4 bg-gray-50 dark:bg-zinc-900"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {displayImages.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className={`rounded-lg p-2 cursor-pointer border transition-all ${
                  activeThumbnail === index
                    ? "border-primary dark:border-primary ring-2 ring-primary/30"
                    : "border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => handleThumbnailClick(img, index)}
              >
                <img
                  src={img}
                  onError={(e) => (e.target.src = noImage)}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-20 object-contain bg-gray-50 dark:bg-zinc-900 rounded"
                />
              </div>
            ))}
          </div>

          {/* Image Sources */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            <p>Product images from "demo collection"</p>
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="space-y-8">
          {/* Product Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {productName}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              {/* Rating */}
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
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
              <div className="flex items-center text-sm">
                <span className="text-gray-500 mr-1">SKU:</span>
                <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {_id?.slice(0, 8).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Price and Availability */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-primary dark:text-amber-500">
                    ${price}
                  </p>
                  <p className="text-gray-500 text-sm mb-1">per unit</p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    In stock ({mainQuantity} available)
                  </span>
                </div>
              </div>

              <div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Minimum order:
                    </span>
                    <span className="font-medium">{minimumQuantity} units</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Lead time:
                    </span>
                    <span className="font-medium">2-3 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="prose max-w-none dark:prose-invert">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Product Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex">
                  <span className="w-40 text-gray-600 dark:text-gray-400">
                    Brand
                  </span>
                  <span className="font-medium">{brandName}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600 dark:text-gray-400">
                    Category
                  </span>
                  <span className="font-medium capitalize">
                    {category.split("-").join(" ")}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex">
                  <span className="w-40 text-gray-600 dark:text-gray-400">
                    Material
                  </span>
                  <span className="font-medium">
                    High-grade industrial materials
                  </span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600 dark:text-gray-400">
                    Dimensions
                  </span>
                  <span className="font-medium">Standard industry size</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>
              Added on{" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* CTA Button */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-6 border-t border-gray-200 dark:border-gray-700 -mx-4 px-4">
            <button
              onClick={() => window.my_modal_3.showModal()}
              className="w-full bg-primary hover:bg-primary/90 dark:bg-amber-600 dark:hover:bg-amber-700 text-white py-4 rounded-xl font-bold transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Order Now
            </button>
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
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-center">Order Details</h2>

            <div className="space-y-2">
              <input
                className="input input-bordered w-full"
                value={user?.displayName}
                readOnly
              />
              <input
                className="input input-bordered w-full"
                value={user?.email}
                readOnly
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setUserQuantity((prev) => Math.max(1, prev - 1))
                  }
                  className="text-amber-700"
                >
                  <CircleMinus size={30} />
                </button>
                <input
                  type="number"
                  className="w-16 text-center border rounded font-semibold"
                  value={userQuantity}
                  min={1}
                  max={mainQuantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) {
                      setUserQuantity(Math.max(1, Math.min(mainQuantity, val)));
                    }
                  }}
                />
                <button
                  onClick={() =>
                    setUserQuantity((prev) => Math.min(mainQuantity, prev + 1))
                  }
                  className="text-amber-700"
                >
                  <CirclePlus size={30} />
                </button>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="text-xl font-bold">
                  $
                  {(price * userQuantity).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={handleBuy}
              className="w-full bg-primary dark:bg-amber-700 text-white px-4 py-3 rounded-xl font-bold"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetails;
