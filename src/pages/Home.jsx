import React from "react";
import Banner from "../components/Banner";
import ProductCategory from "../components/ProductCategory";
import RecentProduct from "../components/RecentProduct";
import ExclusiveOffers from "../components/ExclusiveOffers";
import CustomerReviews from "../components/CustomerReviews";
import Faq from "../components/Faq";
import BrandsCarousel from "../components/BrandsCarousel";
import WhyBuyFromUs from "../components/WhyBuyFromUs";
import Loading from "../components/Loading";
import Contact from "../components/Contact";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import CtaNewsletter from "../components/CtaNewsletter";

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
        <CtaNewsletter />
        <Contact></Contact>
      </div>
    </>
  );
};

export default Home;
