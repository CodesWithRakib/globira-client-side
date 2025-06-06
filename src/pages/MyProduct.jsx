import React, { use } from "react";

import { AuthContext } from "../Auth/AuthProvider";
import MyProductCard from "../components/MyProductCard";
import NoProduct from "../components/NoProduct";
import { useLoaderData, useNavigation } from "react-router";
import Loading from "../components/Loading";

const MyProduct = () => {
  const product = useLoaderData();
  const state = useNavigation();
  console.log(state);
  const { user } = use(AuthContext);
  const userAddedProducts = product?.filter(
    (product) => product?.email === user?.email
  );

  console.log(userAddedProducts);

  if (state.state === "loading") {
    return <Loading></Loading>;
  }

  return (
    <div>
      {userAddedProducts?.length === 0 ? (
        <NoProduct></NoProduct>
      ) : (
        <div className="">
          <div className="flex flex-col gap-2 items-center justify-center py-10">
            <h1 className="text-2xl font-bold dark:text-white">My Products</h1>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-5 p-5 items-center justify-center">
            {userAddedProducts?.map((product) => (
              <MyProductCard
                key={product._id}
                product={product}
              ></MyProductCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProduct;
