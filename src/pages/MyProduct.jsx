import React, { use } from "react";

import { AuthContext } from "../Auth/AuthProvider";
import MyProductCard from "../components/MyProductCard";
import NoProduct from "../components/NoProduct";
import { useLoaderData, useNavigation } from "react-router";
import Loading from "../components/Loading";
import { useState } from "react";

const MyProduct = () => {
  const { data } = useLoaderData();
  const [products, setProducts] = useState(data);
  const state = useNavigation();

  const { user } = use(AuthContext);
  const userAddedProducts = products?.filter(
    (product) => product?.email === user?.email
  );

  //  const updatedProducts = products.filter(product => product._id !== id);
  // setProducts(updatedProducts);

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
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 items-center justify-center">
            {userAddedProducts?.map((product) => (
              <MyProductCard
                key={product._id}
                product={product}
                setProducts={setProducts}
                products={products}
              ></MyProductCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProduct;
