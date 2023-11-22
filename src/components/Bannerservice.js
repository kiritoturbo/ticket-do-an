import { Navigation, Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../index.css";

export const Bannerservice = () => {
  return (
    <>
      <Swiper
        slidesPerView={2}
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
        className="container"
        breakpoints={{
          // Breakpoints for different screen sizes
          320: {
            slidesPerView: 1, // 1 slide for screens smaller than 320px
          },
          480: {
            slidesPerView: 2, // 2 slides for screens smaller than 480px
          },
          640: {
            slidesPerView: 2, // 3 slides for screens smaller than 640px
          },
          768: {
            slidesPerView: 2, // 4 slides for screens smaller than 768px
          },
          1024: {
            slidesPerView: 2, // 5 slides for screens smaller than 1024px
          },
        }}
      >
        <SwiperSlide>
          <div className="boxImageBanner">
            <a href="!#">
              <img src="assets/banner1.webp" alt="" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="boxImageBanner">
            <a href="!#">
              <img src="assets/banner3.webp" alt="" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="boxImageBanner">
            <a href="!#">
              <img src="assets/banner2.webp" alt="" />
            </a>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="boxImageBanner">
            <a href="!#">
              <img src="assets/banner4.webp" alt="" />
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
