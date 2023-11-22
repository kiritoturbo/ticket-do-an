import { Navigation, Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../index.css";

export const Bannerbottomheader = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className=""
      >
        <SwiperSlide>
          <div>
            <img src="/assets/web1920x960-1692264628089.png" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src="/assets/banner-header-1.webp" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src="/assets/banner-header-2.png" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
