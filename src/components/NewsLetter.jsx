import React from "react";

const NewsLetter = () => {
  return (
    <section className="bg-white dark:bg-zinc-950 py-12 px-6 text-center">
      <h2 className="text-xl font-semibold text-zinc-800 dark:text-white mb-4">
        📬 Subscribe to Our Newsletter
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Get exclusive offers, business tips, and new arrivals straight to your
        inbox.
      </p>
      <form className="flex flex-col md:flex-row gap-0 justify-center items-center max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="input rounded-l-2xl rounded-r-none input-bordered w-full md:w-2/3"
        />
        <button
          type="submit"
          className="btn bg-primary rounded-l-none rounded-r-2xl dark:bg-amber-700"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsLetter;
