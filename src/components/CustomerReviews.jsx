const CustomerReviews = () => {
  const customerReviews = [
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
  ];

  return (
    <section className="bg-white dark:bg-zinc-950 py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-500 mb-8 poppins">
        🌟 What Our Customers Say
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {customerReviews.map((review) => (
          <div
            key={review.id}
            className="bg-green-50 dark:bg-zinc-900 rounded-xl p-6 shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.avatarUrl}
                alt={review.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-500 poppins">
                  {review.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {review.location}
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-400 italic">
              “{review.review}”
            </p>
            <div className="mt-4 text-yellow-500">
              {"⭐".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
