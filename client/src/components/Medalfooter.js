import { Navigation, Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../index.css";

export const Medalfooter = () => {
  return (
    <>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        navigation={false}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="container MedalFooter "
        breakpoints={{
          // Breakpoints for different screen sizes
          320: {
            slidesPerView: 4, // 1 slide for screens smaller than 320px
          },
          480: {
            slidesPerView: 4, // 2 slides for screens smaller than 480px
          },
          640: {
            slidesPerView: 4, // 3 slides for screens smaller than 640px
          },
          768: {
            slidesPerView: 6, // 4 slides for screens smaller than 768px
          },
          1024: {
            slidesPerView: 6, // 5 slides for screens smaller than 1024px
          },
        }}
      >
        <SwiperSlide>
          <div class="MuiBox-Medal">
            <div class="box-image">
              <img
                src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/files/giai6-1592297512599.png"
                class="jss1027"
                alt="price"
              />
            </div>
            <p class="box-text" customcolor="black">
              Hãng hàng không chi phí thấp dẫn đầu Châu Á Thái Bình Dương
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="MuiBox-Medal">
            <div class="box-image">
              <img
                src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/files/giai5-1592297595995.png"
                class="jss1027"
                alt="price"
              />
            </div>
            <p class="box-text" customcolor="black">
              Doanh nghiệp tốt nhất Ngành Hàng không tại Đông Nam Á
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="MuiBox-Medal">
            <div class="box-image">
              <img
                src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/files/giai2-1592297520999.png"
                class="jss1027"
                alt="price"
              />
            </div>
            <p class="box-text" customcolor="black">
              Top các công ty niêm yết tốt nhất theo xếp hạng Forbes
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="MuiBox-Medal">
            <div class="box-image">
              <img
                src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/files/giai3-1592297547966.png"
                class="jss1027"
                alt="price"
              />
            </div>
            <p class="box-text" customcolor="black">
              Thương hiệu tốt nhất Châu Á
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="MuiBox-Medal">
            <div class="box-image">
              <img
                src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/files/giai1-1592297529179.png"
                class="jss1027"
                alt="price"
              />
            </div>
            <p class="box-text" customcolor="black">
              Môi trường làm việc tốt nhất Châu Á
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="MuiBox-Medal">
            <div class="box-image">
              <img
                src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/files/giai4-1592297571379.png"
                class="jss1027"
                alt="price"
              />
            </div>
            <p class="box-text" customcolor="black">
              Doanh nghiệp Phát triển bền vững
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
