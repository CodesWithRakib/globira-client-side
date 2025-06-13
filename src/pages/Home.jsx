import React, { useState, Head } from "react";
import Banner from "../components/Banner";
import ProductCategory from "../components/ProductCategory";
import RecentProduct from "../components/RecentProduct";
import ExclusiveOffers from "../components/ExclusiveOffers";
import NewsLetter from "../components/NewsLetter";
import CustomerReviews from "../components/CustomerReviews";
import Faq from "../components/Faq";
import BrandsCarousel from "../components/BrandsCarousel";
import WhyBuyFromUs from "../components/WhyBuyFromUs";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import Cta from "../components/Cta";
import Contact from "../components/Contact";
import GoogleMap from "../components/GoogleMap";
import ErrorPage from "./ErrorPage";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const axiosSecure = useAxios();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get(
          `/api/products?sortBy=newest&limit=10`
        );
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Something went wrong while loading products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axiosSecure]);

  if (loading) return <Loading />;
  if (error)
    return <ErrorPage message="Something went wrong while loading products." />;

  return (
    <>
      <div className="bg-white dark:bg-zinc-950">
        <Banner></Banner>
        <ProductCategory></ProductCategory>
        <ExclusiveOffers></ExclusiveOffers>
        <RecentProduct products={products}></RecentProduct>
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
