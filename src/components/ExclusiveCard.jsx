import React from "react";

const ExclusiveCard = () => {
  return (
    <div className="card bg-base-100 image-full w-96 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body items-start">
        <p className="bg-white text-zinc-800 px-4 py-0.5 rounded-full flex items-center font-medium text-xs">
          25% OFF
        </p>

        <h2 className="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>

        <p>Expires on: 12/07/2025</p>
        <div className="card-actions ">
          <button className="btn btn-primary">View Offers</button>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveCard;
