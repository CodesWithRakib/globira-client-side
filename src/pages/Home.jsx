import React from "react";
import Banner from "../components/Banner";
import ProductCategory from "../components/ProductCategory";
import { useLoaderData } from "react-router";
import RecentProduct from "../components/RecentProduct";
import ExclusiveOffers from "../components/ExclusiveOffers";
import NewsLetter from "../components/NewsLetter";
import CustomerReviews from "../components/CustomerReviews";
import Faq from "../components/Faq";
import BrandsCarousel from "../components/BrandsCarousel";
import WhyBuyFromUs from "../components/WhyBuyFromUs";

const Home = () => {
  const { data } = useLoaderData();

  return (
    <div>
      <Banner></Banner>
      <ProductCategory></ProductCategory>
      <RecentProduct products={data}></RecentProduct>
      <ExclusiveOffers></ExclusiveOffers>
      <BrandsCarousel></BrandsCarousel>
      <WhyBuyFromUs></WhyBuyFromUs>
      <CustomerReviews></CustomerReviews>
      <Faq></Faq>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default Home;
