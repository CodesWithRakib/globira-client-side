import { format } from "date-fns";
import { motion } from "motion/react";
import { Star, ChevronRight, BadgeCheck, Quote } from "lucide-react";

const CustomerReviews = () => {
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-amber-100 dark:bg-amber-900/20 px-4 py-2 rounded-full">
            <BadgeCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              TRUSTED BY BUSINESSES WORLDWIDE
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating)
                        ? "text-amber-500 fill-amber-500"
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
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              {/* Reviewer */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatarUrl}
                    alt={`${review.name} avatar`}
                    className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.business}
                    </p>
                  </div>
                </div>
                {review.verified && (
                  <BadgeCheck className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "text-amber-500 fill-amber-500"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  {review.rating.toFixed(1)}
                </span>
              </div>

              {/* Review Text */}
              <div className="relative mb-6 flex-grow">
                <Quote className="absolute -top-2 left-0 text-gray-200 dark:text-gray-700 w-6 h-6" />
                <p className="text-gray-700 dark:text-gray-300 pl-6 leading-relaxed">
                  {review.review}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 text-sm flex justify-between text-gray-500 dark:text-gray-400">
                <span>{review.location}</span>
                <span>{format(new Date(review.date), "MMM d, yyyy")}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 text-white font-medium rounded-lg transition-colors"
          >
            Read All Testimonials
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
