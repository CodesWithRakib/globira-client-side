import React, { useState } from "react";
import Banner from "../components/Banner";
import ProductCategory from "../components/ProductCategory";
import RecentProduct from "../components/RecentProduct";
import ExclusiveOffers from "../components/ExclusiveOffers";
import NewsLetter from "../components/NewsLetter";
import CustomerReviews from "../components/CustomerReviews";
import Faq from "../components/Faq";
import BrandsCarousel from "../components/BrandsCarousel";
import WhyBuyFromUs from "../components/WhyBuyFromUs";
import Loading from "../components/Loading";
import Cta from "../components/Cta";
import Contact from "../components/Contact";
import GoogleMap from "../components/GoogleMap";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

const Home = () => {
  const { user, loading } = useAuth();

  useTitle(`Home`);

  if (loading) return <Loading />;

  return (
    <>
      <div className="bg-white dark:bg-zinc-950">
        <Banner></Banner>
        <ProductCategory></ProductCategory>
        <ExclusiveOffers></ExclusiveOffers>
        {user && <RecentProduct></RecentProduct>}
        <WhyBuyFromUs></WhyBuyFromUs>
        <BrandsCarousel></BrandsCarousel>
        <CustomerReviews></CustomerReviews>
        <Faq></Faq>
        <Cta></Cta>
        <NewsLetter></NewsLetter>
        <Contact></Contact>
        <GoogleMap></GoogleMap>
      </div>
    </>
  );
};

export default Home;
