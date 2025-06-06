import React from "react";

const AllProductsCard = ({ product }) => {
  console.log(product);
  return (
    <div className="max-w-sm rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
      <img
        src="https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
      />
      <div className="flex flex-col justify-between p-4 tracking-wide leading-tight space-y-8">
        <div className="space-y-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-wide">
              Donec lectus leo
            </h2>
            <h4>product and product subtitle</h4>
          </div>
          <p className="text-justify dark:text-gray-800">
            Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
            Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
          </p>

          <div>
            <div className="flex items-center gap-5">
              <p>Brand:</p>
              <h3 className="font-semibold">{"product brand".toUpperCase()}</h3>
            </div>
            <div className="flex items-center gap-5">
              <p>Brand:</p>
              <h3 className="font-semibold">{"product brand".toUpperCase()}</h3>
            </div>
            <div className="flex items-center gap-5">
              <p>Brand:</p>
              <h3 className="font-semibold">{"product brand".toUpperCase()}</h3>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-zinc-900 text-white dark:bg-violet-600 dark:text-gray-50"
      >
        Update
      </button>
    </div>
  );
};

export default AllProductsCard;
