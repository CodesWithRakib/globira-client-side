import { motion } from "motion/react";
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
    <section className="bg-white dark:bg-zinc-950 py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-zinc-800 dark:text-white mb-8 poppins">
        🌟 What Our Customers Say
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {customerReviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="bg-base-100 dark:bg-zinc-900 rounded-xl p-6 shadow-md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.avatarUrl}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-primary dark:text-white">
                  {review.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {review.location}
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic line-clamp-4">
              “{review.review}”
            </p>
            <div className="mt-4 text-yellow-500 flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) =>
                i < review.rating ? (
                  <span key={i}>⭐</span>
                ) : (
                  <span key={i} className="text-gray-300 dark:text-gray-600">
                    ☆
                  </span>
                )
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-2 rounded-full font-semibold hover:scale-105 transition">
          Read More
        </button>
      </div>
    </section>
  );
};

export default CustomerReviews;
