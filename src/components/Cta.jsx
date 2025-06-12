import React from "react";

const Cta = () => {
  return (
    <section className="bg-white dark:bg-zinc-950 text-center py-10 px-6 rounded-xl my-10">
      <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-white mb-4">
        Ready to Grow Your Business?
      </h2>
      <p className="text-zinc-700 dark:text-zinc-300 mb-6">
        Join thousands of B2B buyers who trust our platform to source
        high-quality products at the best prices.
      </p>
      <button className="btn border-0 btn-primary dark:bg-amber-700 px-6 py-2 text-white text-lg rounded-lg shadow">
        Start Sourcing Now
      </button>
    </section>
  );
};

export default Cta;
