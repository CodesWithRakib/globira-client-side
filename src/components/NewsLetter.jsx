import React from "react";

const NewsLetter = () => {
  return (
    <div className="p-5 flex gap-5 items-center justify-center dark:bg-zinc-950 dark:text-white ">
      <div className="px-5 py-20 rounded-2xl flex flex-col items-center justify-center gap-5">
        <div className="text-center space-y-1">
          <h3 className="text-3xl font-medium">Stay Inspired</h3>
          <p className="text-lg ">
            Join our newsletter and get 20% off your first purchase when you
            sign up
          </p>
        </div>

        <div className="flex flex-row rounded-lg border-1 dark:border-amber-700">
          <input
            type="text"
            placeholder="example@email.com"
            className="w-3/5  px-8 py-2 rounded-l-lg sm:w-2/3"
          />
          <button
            type="button"
            className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 
            bg-black text-white  dark:bg-amber-700 dark:text-gray-50"
          >
            Subscribe
          </button>
        </div>

        <p className="text-center">
          By subscribing you accept our Privacy Policy and give consent to
          receive updates .
        </p>
      </div>
    </div>
  );
};

export default NewsLetter;
