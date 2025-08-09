import React from "react";
import { format } from "date-fns";
import { motion } from "motion/react";
import { Star, ChevronLeft, BadgeCheck, Quote } from "lucide-react";
import { useNavigate } from "react-router";
import useTitle from "../hooks/useTitle";

const AllTestimonials = () => {
  const navigate = useNavigate();
  useTitle("All Testimonials");

  const customerReviews = [
    {
      id: 1,
      name: "Lina Zhang",
      review:
        "Great value for money. The brands available were top-notch and shipping was fast.",
      rating: 4,
      location: "Beijing, China",
      date: "2025-06-01",
      avatarUrl: "https://i.pravatar.cc/100?img=6",
      verified: true,
      business: "Zhang Trading Co.",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      review:
        "I was able to order wholesale products in bulk with very competitive pricing. Excellent experience.",
      rating: 4.5,
      location: "Chittagong, Bangladesh",
      date: "2025-04-15",
      avatarUrl: "https://i.pravatar.cc/100?img=2",
      verified: true,
      business: "Ahmed Imports",
    },
    {
      id: 3,
      name: "John Smith",
      review:
        "Very smooth B2B buying process, clear MOQ shown on every product. Highly recommended!",
      rating: 5,
      location: "New York, USA",
      date: "2025-05-01",
      avatarUrl: "https://i.pravatar.cc/100?img=3",
      verified: true,
      business: "Smith Electronics",
    },
    {
      id: 4,
      name: "Maria Gonzalez",
      review:
        "Received my industrial tools order on time. Support team was very responsive.",
      rating: 4,
      location: "Madrid, Spain",
      date: "2025-05-05",
      avatarUrl: "https://i.pravatar.cc/100?img=4",
      verified: true,
      business: "Gonzalez Machinery",
    },
    {
      id: 5,
      name: "Imran Khan",
      review:
        "I loved the bulk discount offers. The ordering experience was seamless for my business.",
      rating: 5,
      location: "Karachi, Pakistan",
      date: "2025-05-18",
      avatarUrl: "https://i.pravatar.cc/100?img=5",
      verified: true,
      business: "Khan Wholesale",
    },
    {
      id: 6,
      name: "David Brown",
      review:
        "This platform made it easy to connect with reliable sellers. Perfect for my electronics store.",
      rating: 5,
      location: "Toronto, Canada",
      date: "2025-06-09",
      avatarUrl: "https://i.pravatar.cc/100?img=7",
      verified: true,
      business: "Brown Tech Solutions",
    },
  ];

  const averageRating =
    customerReviews.reduce((acc, review) => acc + review.rating, 0) /
    customerReviews.length;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-blue-100 dark:bg-blue-900/20 px-4 py-2 rounded-full">
            <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              CUSTOMER TESTIMONIALS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Verified Business Reviews
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating)
                        ? "text-blue-500 fill-blue-500"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-800 dark:text-white">
                {averageRating.toFixed(1)}/5
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {customerReviews.length} verified business reviews
            </div>
          </div>
        </motion.div>

        {/* Review Grid - Expanded View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {customerReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              {/* Review Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatarUrl}
                    alt={`${review.name} avatar`}
                    className="w-14 h-14 rounded-full border-2 border-white dark:border-gray-800 shadow"
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.business}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {review.industry}
                    </p>
                  </div>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-blue-500 dark:text-blue-400">
                    <BadgeCheck className="w-5 h-5" />
                    <span className="text-xs">Verified</span>
                  </div>
                )}
              </div>

              {/* Rating and Date */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? "text-blue-500 fill-blue-500"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-medium text-gray-700 dark:text-gray-300">
                    {review.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(review.date), "MMMM d, yyyy")}
                </span>
              </div>

              {/* Review Content */}
              <div className="relative mb-8">
                <Quote className="absolute -top-2 left-0 text-gray-200 dark:text-gray-700 w-8 h-8" />
                <p className="text-gray-700 dark:text-gray-300 pl-8 text-lg leading-relaxed">
                  {review.review}
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{review.location}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mx-auto px-6 py-3 text-sm font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AllTestimonials;
