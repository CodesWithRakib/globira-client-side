import React from "react";
import { useNavigate } from "react-router";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Banner = () => {
  const navigate = useNavigate();

  const slideData = [
    {
      id: "slide-1",
      category: "Electronics & Gadgets",
      title: "Top Tech. Big Discounts.",
      subtitle: "Upgrade your gear with cutting-edge devices.",
      buttonText: "Shop Electronics",
      image:
        "https://img.freepik.com/free-photo/electronics-device-digital-gadget-modern-technology_53876-142041.jpg",
      path: "/category/electronics-gadgets", // Matching your category slug
    },
    {
      id: "slide-2",
      category: "Home & Kitchen Appliances",
      title: "Appliances That Make Life Easy",
      subtitle: "Discover smart solutions for your home.",
      buttonText: "Browse Appliances",
      image:
        "https://img.freepik.com/free-photo/modern-kitchen-interior_53876-145109.jpg",
      path: "/category/home-kitchen-appliances",
    },
    {
      id: "slide-3",
      category: "Fashion & Apparel",
      title: "Style That Speaks",
      subtitle: "Trendy looks at unbeatable prices.",
      buttonText: "Shop Fashion",
      image:
        "https://img.freepik.com/free-photo/fashion-model-posing-street_23-2151037495.jpg",
      path: "/category/fashion-apparel",
    },
    {
      id: "slide-4",
      category: "Industrial Machinery & Tools",
      title: "Powering Heavy Duty Work",
      subtitle: "Top-grade tools and machinery at your service.",
      buttonText: "Shop Tools",
      image:
        "https://img.freepik.com/free-photo/industrial-factory-interior_23-2149430863.jpg",
      path: "/category/industrial-machinery-tools",
    },
    {
      id: "slide-5",
      category: "Health & Beauty",
      title: "Glow Inside & Out",
      subtitle: "Self-care products that bring real results.",
      buttonText: "Shop Beauty",
      image:
        "https://img.freepik.com/free-photo/woman-using-facial-roller_23-2149271677.jpg",
      path: "/category/health-beauty",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
          bulletClass: "swiper-pagination-bullet !bg-amber-400",
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        style={{
          height: "70vh",
          maxHeight: "700px",
        }}
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="flex items-center justify-center px-5 text-center text-white h-full"
              style={{
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
                <button
                  onClick={() => navigate(slide.path)}
                  className="btn bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg font-medium rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                  aria-label={`Shop ${slide.category}`}
                >
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
