import React, { useState, useEffect, useContext } from "react";
import noImage from "/default.jpg";
import { AuthContext } from "../Auth/AuthProvider";
import { CircleMinus, CirclePlus, Star, StarHalf } from "lucide-react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(noImage);
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [userQuantity, setUserQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const { user } = useContext(AuthContext);
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

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.trim()) {
      toast.error("Please write a review");
      return;
    }

    const reviewData = {
      productId: _id,
      userId: user?.uid,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      rating,
      comment: newReview,
      date: new Date().toISOString().split("T")[0],
    };

    // In a real app, you would post this to your API
    toast.success("Review submitted successfully!");
    setReviews([reviewData, ...reviews]);
    setNewReview("");
    setRating(5);
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
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{productName}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={`${
                      star <= 4.5
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  4.5 (24 reviews)
                </span>
              </div>
              <span className="text-sm text-gray-500">
                SKU: {_id?.slice(0, 8)}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary dark:text-amber-500">
                  ${price}
                </p>
                <p className="text-sm text-gray-500">Per unit price</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-medium">
                  In Stock: <span>{mainQuantity}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Min. Order:{" "}
                  <span className="text-red-500">{minimumQuantity}</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Key Specifications</h3>
            <ul className="space-y-2">
              <li className="flex">
                <span className="w-40 text-gray-500">Brand</span>
                <span className="font-medium">{brandName}</span>
              </li>
              <li className="flex">
                <span className="w-40 text-gray-500">Category</span>
                <span className="font-medium">
                  {category.split("-").join(" ")}
                </span>
              </li>
              <li className="flex">
                <span className="w-40 text-gray-500">Material</span>
                <span className="font-medium">
                  High-grade industrial materials
                </span>
              </li>
              <li className="flex">
                <span className="w-40 text-gray-500">Dimensions</span>
                <span className="font-medium">Standard industry size</span>
              </li>
              <li className="flex">
                <span className="w-40 text-gray-500">Added On</span>
                <span className="font-medium">
                  {new Date(createdAt).toLocaleDateString()}
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <button
              onClick={() => window.my_modal_3.showModal()}
              className="w-full bg-primary hover:bg-secondary dark:bg-amber-700 text-white py-3 rounded-xl font-bold transition duration-300"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <div className="tabs">
          <a className="tab tab-bordered tab-active">Description</a>
          <a className="tab tab-bordered">Specifications</a>
          <a className="tab tab-bordered">Reviews ({reviews.length})</a>
        </div>

        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
          <div>
            <h3 className="text-xl font-semibold mb-4">Product Description</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {productContent}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Key Features</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Premium industrial-grade materials for durability</li>
                  <li>Precision engineered for optimal performance</li>
                  <li>Compatible with standard industry equipment</li>
                  <li>Manufactured under strict quality control</li>
                  <li>Long service life with minimal maintenance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Applications</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
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
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Summary */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Overall Rating</h3>
            <div className="flex items-center mb-2">
              <div className="text-4xl font-bold mr-4">4.5</div>
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

            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <span className="w-10 text-sm">{rating} star</span>
                  <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-yellow-400 rounded-full"
                      style={{
                        width: `${
                          rating === 5
                            ? 70
                            : rating === 4
                            ? 20
                            : rating === 3
                            ? 7
                            : rating === 2
                            ? 2
                            : 1
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-8 text-right">
                    {rating === 5
                      ? "70%"
                      : rating === 4
                      ? "20%"
                      : rating === 3
                      ? "7%"
                      : rating === 2
                      ? "2%"
                      : "1%"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {user && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2">Your Rating</label>
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
                      className="textarea textarea-bordered w-full"
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

            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
              >
                <div className="flex items-start">
                  <div className="avatar mr-4">
                    <div className="w-12 h-12 rounded-full">
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
                        <h4 className="font-semibold">{review.user}</h4>
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
