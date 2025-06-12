import React from "react";

const Contact = () => {
  return (
    <section className="bg-white dark:bg-zinc-950 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-zinc-800 dark:text-white">
            📞 Get in Touch
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            We'd love to hear from you. Whether you're curious about pricing,
            bulk orders, or anything else — our team is ready to answer all your
            questions.
          </p>
          <ul className="space-y-3 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>📍 Address:</strong> Dinajpur, Bangladesh
            </li>
            <li>
              <strong>📧 Email:</strong> support@globira.com
            </li>
            <li>
              <strong>📞 Phone:</strong> +880-1234-567890
            </li>
            <li>
              <strong>🕘 Hours:</strong> Mon - Fri, 9AM - 6PM (BST)
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <form className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-xl shadow-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full dark:bg-zinc-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full dark:bg-zinc-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Your message..."
              className="textarea textarea-bordered w-full dark:bg-zinc-800 dark:text-white"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
