import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const Banner = () => {
  const slideData = [
    {
      id: "slide-1",
      category: "Electronics & Gadgets",
      title: "Top Tech. Big Discounts.",
      subtitle: "Upgrade your gear with cutting-edge devices.",
      buttonText: "Shop Electronics",
      image:
        "https://img.freepik.com/free-photo/electronics-device-digital-gadget-modern-technology_53876-142041.jpg",
    },
    {
      id: "slide-2",
      category: "Home & Kitchen Appliances",
      title: "Appliances That Make Life Easy",
      subtitle: "Discover smart solutions for your home.",
      buttonText: "Browse Appliances",
      image:
        "https://img.freepik.com/free-photo/modern-kitchen-interior_53876-145109.jpg",
    },
    {
      id: "slide-3",
      category: "Fashion & Apparel",
      title: "Style That Speaks",
      subtitle: "Trendy looks at unbeatable prices.",
      buttonText: "Shop Fashion",
      image:
        "https://img.freepik.com/free-photo/fashion-model-posing-street_23-2151037495.jpg",
    },
    {
      id: "slide-4",
      category: "Industrial Machinery & Tools",
      title: "Powering Heavy Duty Work",
      subtitle: "Top-grade tools and machinery at your service.",
      buttonText: "Shop Tools",
      image:
        "https://img.freepik.com/free-photo/industrial-factory-interior_23-2149430863.jpg",
    },
    {
      id: "slide-5",
      category: "Health & Beauty",
      title: "Glow Inside & Out",
      subtitle: "Self-care products that bring real results.",
      buttonText: "Shop Beauty",
      image:
        "https://img.freepik.com/free-photo/woman-using-facial-roller_23-2149271677.jpg",
    },
    {
      id: "slide-6",
      category: "Automotive Parts & Accessories",
      title: "Drive with Confidence",
      subtitle: "Performance parts, accessories & more.",
      buttonText: "Browse Auto Parts",
      image:
        "https://img.freepik.com/free-photo/car-repair-service_1170-1766.jpg",
    },
    {
      id: "slide-7",
      category: "Office Supplies & Stationery",
      title: "Work Smart. Stay Organized.",
      subtitle: "Everything your workspace needs.",
      buttonText: "Shop Supplies",
      image:
        "https://img.freepik.com/free-photo/flat-lay-desk-arrangement-with-copy-space_23-2148471246.jpg",
    },
    {
      id: "slide-8",
      category: "Sports & Outdoors",
      title: "Gear Up For Adventure",
      subtitle: "Equipment for every outdoor activity.",
      buttonText: "Explore Sports Gear",
      image:
        "https://img.freepik.com/free-photo/cyclist-mountain-bike-trail_23-2149334656.jpg",
    },
    {
      id: "slide-9",
      category: "Toys & Games",
      title: "Fun For All Ages",
      subtitle: "Spark joy with our toy collection.",
      buttonText: "Browse Toys",
      image:
        "https://img.freepik.com/free-photo/kids-playing-with-wooden-toy_23-2149307375.jpg",
    },
    {
      id: "slide-10",
      category: "Books & Media",
      title: "Expand Your Mind",
      subtitle: "Best sellers and new releases.",
      buttonText: "Shop Books",
      image:
        "https://img.freepik.com/free-photo/stack-books-with-copy-space_23-2148216460.jpg",
    },
    {
      id: "slide-11",
      category: "Pet Supplies",
      title: "Love Them Like Family",
      subtitle: "Everything for your furry friends.",
      buttonText: "Pet Products",
      image:
        "https://img.freepik.com/free-photo/dog-playing-with-ball_23-2148985224.jpg",
    },
    {
      id: "slide-12",
      category: "Garden & Outdoor",
      title: "Grow Your Paradise",
      subtitle: "Tools and plants for your green space.",
      buttonText: "Shop Garden",
      image:
        "https://img.freepik.com/free-photo/gardener-taking-care-plants_23-2149307382.jpg",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        scrollbar={{ draggable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="flex items-center justify-center px-5 text-center text-white"
              style={{
                minHeight: "calc(100vh - 180px)",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${slide.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="max-w-4xl mx-auto px-4">
                <h3 className="text-amber-400 text-xl md:text-2xl mb-2 md:mb-4 font-medium">
                  {slide.category}
                </h3>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
                <button className="btn bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg font-medium rounded-full transition duration-300 transform hover:scale-105">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
