import { format } from "date-fns";
import { motion } from "motion/react";
import { Star, ChevronRight, BadgeCheck, Quote } from "lucide-react";
import { useNavigate } from "react-router";

const CustomerReviews = () => {
  const navigate = useNavigate();

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
    <section className="py-12 bg-white dark:bg-gray-900">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Customer <span className="text-blue-600">Reviews</span>
              </h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Hear from our satisfied business partners
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => navigate("/testimonials")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            View all reviews <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Rating Summary */}
        <div className="flex flex-wrap items-center gap-6 mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
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
            Based on {customerReviews.length} verified reviews
          </div>
        </div>
      </motion.div>

      {/* Review Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customerReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all h-full flex flex-col"
          >
            {/* Quote Icon */}
            <div className="mb-4 text-blue-500 dark:text-blue-400">
              <Quote className="w-8 h-8" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? "text-blue-500 fill-blue-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                {review.rating.toFixed(1)}
              </span>
            </div>

            {/* Review Text */}
            <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow leading-relaxed">
              {review.review}
            </p>

            {/* Reviewer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <img
                  src={review.avatarUrl}
                  alt={`${review.name} avatar`}
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 shadow"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {review.name}
                    </h4>
                    {review.verified && (
                      <BadgeCheck className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {review.business}
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                <div>{review.location}</div>
                <div>{format(new Date(review.date), "MMM d, yyyy")}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA for mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-8 sm:hidden"
      >
        <motion.button
          onClick={() => navigate("/testimonials")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Read All Testimonials
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CustomerReviews;
