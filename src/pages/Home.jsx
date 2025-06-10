import React from "react";
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

const Home = () => {
  const [loading, setLoading] = React.useState(true);
  const axiosSecure = useAxios();

  const [products, setProducts] = React.useState([]);

  console.log(products);

  useEffect(() => {
    window.scrollTo(0, 0);
    axiosSecure.get(`/api/products?sortBy=newest&limit=10`).then((res) => {
      setProducts(res.data.data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading></Loading>
  ) : (
    <div>
      <Banner></Banner>
      <ProductCategory></ProductCategory>
      <RecentProduct products={products}></RecentProduct>
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
