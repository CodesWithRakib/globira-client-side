import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
  ];

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
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
              }}
            >
              <div>
                <h3 className="text-orange-400 text-xl mb-2">
                  {slide.category}
                </h3>
                <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="mb-6">{slide.subtitle}</p>
                <button className="btn bg-[#FF6600] text-white">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;
