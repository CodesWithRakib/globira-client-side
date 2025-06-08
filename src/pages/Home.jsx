import React from "react";
import Banner from "../components/Banner";
import ProductCategory from "../components/ProductCategory";
import { useLoaderData } from "react-router";
import RecentProduct from "../components/RecentProduct";

const Home = () => {
  const products = useLoaderData();

  return (
    <div>
      <Banner></Banner>
      <ProductCategory></ProductCategory>
      <RecentProduct products={products}></RecentProduct>
    </div>
  );
};

export default Home;
