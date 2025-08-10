// Banner.jsx
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
        "https://images.unsplash.com/photo-1498049794561-7780e623c3c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      path: "/category/electronics-gadgets",
    },
    {
      id: "slide-2",
      category: "Home & Kitchen Appliances",
      title: "Appliances That Make Life Easy",
      subtitle: "Discover smart solutions for your home.",
      buttonText: "Browse Appliances",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      path: "/category/home-kitchen-appliances",
    },
    {
      id: "slide-3",
      category: "Fashion & Apparel",
      title: "Style That Speaks",
      subtitle: "Trendy looks at unbeatable prices.",
      buttonText: "Shop Fashion",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      path: "/category/fashion-apparel",
    },
    {
      id: "slide-4",
      category: "Industrial Machinery & Tools",
      title: "Powering Heavy Duty Work",
      subtitle: "Top-grade tools and machinery at your service.",
      buttonText: "Shop Tools",
      image:
        "https://images.unsplash.com/photo-1581093196277-9f03a43a7749?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      path: "/category/industrial-machinery-tools",
    },
    {
      id: "slide-5",
      category: "Health & Beauty",
      title: "Glow Inside & Out",
      subtitle: "Self-care products that bring real results.",
      buttonText: "Shop Beauty",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      path: "/category/health-beauty",
    },
  ];

  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
          bulletClass:
            "swiper-pagination-bullet !bg-blue-400 dark:!bg-blue-500",
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        className="h-[70vh] max-h-[700px]"
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="flex items-center justify-center px-5 text-center text-white h-full"
              style={{
                backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.7)), url('${slide.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <div className="inline-block px-4 py-1 bg-blue-600/80 backdrop-blur-sm rounded-full mb-4">
                    <h3 className="text-blue-100 text-sm md:text-base font-medium uppercase tracking-wide">
                      {slide.category}
                    </h3>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight text-white drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-blue-100">
                    {slide.subtitle}
                  </p>
                  <button
                    onClick={() => navigate(slide.path)}
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 text-lg font-medium rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
                    aria-label={`Shop ${slide.category}`}
                  >
                    {slide.buttonText}
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
