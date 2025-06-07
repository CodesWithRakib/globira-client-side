import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Banner = () => {
  const category = [
    {
      id: 1,
      name: "Home and Kitchen",
      image: "https://i.ibb.co/MDFqrqKt/home.png",
    },
    {
      id: 2,
      name: "Electronics and Gadgets",
      image: "https://i.ibb.co/VpwQJ76L/electronics.png",
    },
    {
      id: 3,
      name: "Fashion and Aparel",
      image: "https://i.ibb.co/GyTS4CV/fashion.jpg",
    },
    {
      id: 4,
      name: "Industrial Machinery and Tools",
      image: "https://i.ibb.co/Xkv0BqpD/industrial.png",
    },
    {
      id: 5,
      name: "Health and Beauty",
      image: "https://i.ibb.co/kVqGQZDj/health.jpg",
    },
    {
      id: 6,
      name: "Automotive parts and accessories",
      image: "https://i.ibb.co/YTFZ7pJw/automotive.jpg",
    },
    {
      id: 7,
      name: "Office Supplies and Stationery",
      image: "https://i.ibb.co/bM70HmKZ/office.png",
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
        <SwiperSlide>
          {" "}
          <div
            className="min-h-screen flex flex-col gap-5 justify-center py-5"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="hero">
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <h3 className="mb-2 text-2xl">Todays Discount</h3>
                  <h1 className="mb-5 text-7xl font-bold">
                    Sale Up to <br />
                    70%
                  </h1>

                  <button className="btn bg-[#FF6600] text-white border-0">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            <div className="p-5 ">
              <h2 className="text-2xl font-bold text-white mb-2">
                Discover all category
              </h2>
              <div className="rounded-md items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {category.map((category) => (
                  <div
                    key={category.id}
                    className="flex gap-2 p-4 bg-white text-zinc-950 rounded-md items-center "
                  >
                    <img src={category.image} alt="" className="w-12 h-12" />
                    <p className="w-full md:w-40">{category.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div
            className="min-h-screen flex flex-col gap-5 justify-center py-5"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="hero">
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <h3 className="mb-2 text-2xl">Todays Discount</h3>
                  <h1 className="mb-5 text-7xl font-bold">
                    Sale Up to <br />
                    70%
                  </h1>

                  <button className="btn bg-[#FF6600] text-white border-0">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            <div className="p-5 ">
              <h2 className="text-2xl font-bold text-white mb-2">
                Discover all category
              </h2>
              <div className="rounded-md items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {category.map((category) => (
                  <div
                    key={category.id}
                    className="flex gap-2 p-4 bg-white text-zinc-950 rounded-md items-center "
                  >
                    <img src={category.image} alt="" className="w-12 h-12" />
                    <p className="w-full md:w-40">{category.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div
            className="min-h-screen flex flex-col gap-5 justify-center py-5"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="hero">
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <h3 className="mb-2 text-2xl">Todays Discount</h3>
                  <h1 className="mb-5 text-7xl font-bold">
                    Sale Up to <br />
                    70%
                  </h1>

                  <button className="btn bg-[#FF6600] text-white border-0">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            <div className="p-5 ">
              <h2 className="text-2xl font-bold text-white mb-2">
                Discover all category
              </h2>
              <div className="rounded-md items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {category.map((category) => (
                  <div
                    key={category.id}
                    className="flex gap-2 p-4 bg-white text-zinc-950 rounded-md items-center "
                  >
                    <img src={category.image} alt="" className="w-12 h-12" />
                    <p className="w-full md:w-40">{category.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div
            className="min-h-screen flex flex-col gap-5 justify-center py-5"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="hero">
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <h3 className="mb-2 text-2xl">Todays Discount</h3>
                  <h1 className="mb-5 text-7xl font-bold">
                    Sale Up to <br />
                    70%
                  </h1>

                  <button className="btn bg-[#FF6600] text-white border-0">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            <div className="p-5 ">
              <h2 className="text-2xl font-bold text-white mb-2">
                Discover all category
              </h2>
              <div className="rounded-md items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {category.map((category) => (
                  <div
                    key={category.id}
                    className="flex gap-2 p-4 bg-white text-zinc-950 rounded-md items-center "
                  >
                    <img src={category.image} alt="" className="w-12 h-12" />
                    <p className="w-full md:w-40">{category.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
