import { format } from "date-fns";
import { motion } from "motion/react";
import { FaStar, FaRegStar } from "react-icons/fa";

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
    },
    {
      id: 2,
      name: "Sara Ahmed",
      review:
        "I was able to order wholesale products in bulk with very competitive pricing. Excellent experience.",
      rating: 4,
      location: "Chittagong, Bangladesh",
      date: "2025-04-15",
      avatarUrl: "https://i.pravatar.cc/100?img=2",
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
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-[#010313]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-400 dark:to-amber-400 bg-clip-text text-transparent mb-3">
            Customer Testimonials
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Hear what businesses around the world say about their experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-zinc-950 rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 dark:border-zinc-800 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatarUrl}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-zinc-800 shadow-sm"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.location}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {format(new Date(review.date), "MMM d, yyyy")}
                </span>
              </div>

              <div className="mb-4 flex gap-1 text-amber-500">
                {Array.from({ length: 5 }, (_, i) =>
                  i < review.rating ? (
                    <FaStar key={i} className="w-4 h-4" />
                  ) : (
                    <FaRegStar
                      key={i}
                      className="w-4 h-4 text-gray-300 dark:text-gray-600"
                    />
                  )
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-4 relative">
                <span className="absolute -top-4 left-0 text-4xl text-gray-200 dark:text-zinc-700">
                  "
                </span>
                {review.review}
              </p>

              <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Verified Purchase • {review.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-500 dark:to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
            <span className="relative z-10">Read More Testimonials</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-amber-700 dark:from-blue-600 dark:to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
