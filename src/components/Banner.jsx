// Banner.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideData = [
    {
      id: "slide-1",
      category: "Electronics & Gadgets",
      title: "Innovative Technology, Unbeatable Prices",
      subtitle:
        "Discover cutting-edge electronics and gadgets that transform your daily life with exclusive discounts.",
      buttonText: "Explore Now",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWxlY3Ryb25pY3N8ZW58MHwwfDB8fHww",
      path: "/category/electronics-gadgets",
    },
    {
      id: "slide-2",
      category: "Home & Kitchen Appliances",
      title: "Smart Solutions for Modern Living",
      subtitle:
        "Transform your home with innovative appliances designed for efficiency, style, and convenience.",
      buttonText: "Discover Collection",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      path: "/category/home-kitchen-appliances",
    },
    {
      id: "slide-3",
      category: "Fashion & Apparel",
      title: "Elevate Your Style, Define Your Presence",
      subtitle:
        "Curated fashion collections that blend contemporary trends with timeless elegance for every occasion.",
      buttonText: "Shop Collection",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      path: "/category/fashion-apparel",
    },
    {
      id: "slide-4",
      category: "Industrial Machinery & Tools",
      title: "Professional-Grade Equipment for Demanding Tasks",
      subtitle:
        "Engineered for precision and durability, our tools and machinery deliver exceptional performance in any environment.",
      buttonText: "View Equipment",
      image:
        "https://images.unsplash.com/photo-1600715502630-c9300abe78a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEluZHVzdHJpYWwlMjBNYWNoaW5lcnl8ZW58MHwwfDB8fHww",
      path: "/category/industrial-machinery-tools",
    },
    {
      id: "slide-5",
      category: "Health & Beauty",
      title: "Radiant Wellness, Inside and Out",
      subtitle:
        "Premium formulations backed by science to enhance your natural beauty and promote holistic wellbeing.",
      buttonText: "Shop Essentials",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      path: "/category/health-beauty",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-white/50 hover:bg-white/70 transition-all duration-300"></div>
    ),
    appendDots: (dots) => (
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        <ul className="flex space-x-2"> {dots} </ul>
      </div>
    ),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="relative overflow-hidden bg-gray-900">
      <div className="slider-container h-[70vh] md:h-[75vh] max-h-[800px] w-full">
        <Slider {...settings} className="h-full">
          {slideData.map((slide, index) => (
            <div key={slide.id} className="h-full">
              <div className="relative h-full w-full overflow-hidden">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${slide.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: currentSlide === index ? "blur(0px)" : "blur(4px)",
                    transform: `scale(${currentSlide === index ? 1 : 1.05})`,
                    zIndex: 0,
                  }}
                />
                {/* Content with Blur Background */}
                <div className="absolute inset-0 flex items-center justify-center px-5 z-10">
                  <div className="backdrop-blur-lg bg-black/30 rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto shadow-2xl border border-white/10">
                    <div className="text-center text-white">
                      {/* Category badge */}
                      <div className="inline-block px-4 py-1 mb-4 rounded-full backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-white/20 transition-all duration-500 transform opacity-0 animate-fadeInUp">
                        <h3 className="text-blue-100 text-sm md:text-base font-medium uppercase tracking-wide">
                          {slide.category}
                        </h3>
                      </div>

                      {/* Title */}
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-white drop-shadow-lg transition-all duration-700 transform opacity-0 animate-fadeInUp delay-100">
                        {slide.title}
                      </h1>

                      {/* Subtitle */}
                      <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-blue-50 transition-all duration-700 transform opacity-0 animate-fadeInUp delay-200">
                        {slide.subtitle}
                      </p>

                      {/* Button */}
                      <div className="transition-all duration-700 transform opacity-0 animate-fadeInUp delay-300">
                        <button
                          onClick={() => navigate(slide.path)}
                          className="group relative inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-xl overflow-hidden"
                          aria-label={`Shop ${slide.category}`}
                        >
                          <span className="relative z-10 flex items-center">
                            {slide.buttonText}
                            <svg
                              className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </span>
                          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full z-20">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-6000 ease-linear"
          style={{
            width: "0%",
            animation: "progressBar 6s linear infinite",
          }}
        ></div>
      </div>

      <style jsx global>{`
        @keyframes progressBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .slick-dots li.slick-active div {
          background-color: white !important;
          width: 1.25rem !important;
          border-radius: 9999px !important;
        }
        .slick-arrow {
          z-index: 20 !important;
        }
        .slick-prev:before,
        .slick-next:before {
          display: none;
        }
        .slick-list,
        .slick-track,
        .slick-slide,
        .slick-slide > div {
          height: 100% !important;
        }
      `}</style>
    </section>
  );
};

// Custom Next Arrow
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/30 text-white hover:bg-black/50 transition-all duration-300 z-20 shadow-lg`}
      style={{ ...style }}
      onClick={onClick}
    >
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
};

// Custom Previous Arrow
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/30 text-white hover:bg-black/50 transition-all duration-300 z-20 shadow-lg`}
      style={{ ...style }}
      onClick={onClick}
    >
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
};

export default Banner;
