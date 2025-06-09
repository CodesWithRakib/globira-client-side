import React from "react";
import ExclusiveCard from "./ExclusiveCard";

const ExclusiveOffers = () => {
  return (
    <div className="p-5">
      <div>
        <div className="flex justify-between gap-5 items-center">
          <h4>Exclusive Offers</h4>
          <p>View All Offers</p>
        </div>
        <p>
          Take advantage of our exclusive offers and get up to 50% off on select
          products.
        </p>
      </div>

      <div className="grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ExclusiveCard></ExclusiveCard>
        <ExclusiveCard></ExclusiveCard>
        <ExclusiveCard></ExclusiveCard>
      </div>
    </div>
  );
};

export default ExclusiveOffers;
