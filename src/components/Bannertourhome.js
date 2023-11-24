import { Navigation, Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../index.css";

export const Bannertourhome = () => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={5}
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
        className="BannerTourHome"
        breakpoints={{
          // Breakpoints for different screen sizes
          320: {
            slidesPerView: 1, // 1 slide for screens smaller than 320px
          },
          480: {
            slidesPerView: 1, // 2 slides for screens smaller than 480px
          },
          640: {
            slidesPerView: 3, // 3 slides for screens smaller than 640px
          },
          768: {
            slidesPerView: 3, // 4 slides for screens smaller than 768px
          },
          1024: {
            slidesPerView: 3, // 5 slides for screens smaller than 1024px
          },
        }}
      >
        <SwiperSlide>
          <div>
            <div class="MuiBox-root jss1110 h-[100%] rounded-md sm:px-[15px]">
              <div class="jss1052 jss490">
                <h3 class="MuiTypography-root jss1055 MuiTypography-subtitle1 MuiTypography-colorTextSecondary">
                  Săn vé giá rẻ
                </h3>
                <img
                  src="assets/borderTag.4b2fbd2d.svg"
                  alt="tag background"
                  class="jss1056"
                />
                <img
                  src="assets/arrow-half.dccbb122.svg"
                  alt="hafl arrow"
                  class="jss1057"
                />
              </div>
              <div>
                <a
                  href="https://www.agoda.com/vi-vn/vietjetair"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/km21620415285304-1695094874937.webp"
                    class="jss1026 jss1027 w-full rounded-md"
                    alt="top banner"
                  />
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div class="MuiBox-root jss1110 h-[100%] rounded-md sm:px-[15px]">
              <div class="jss1052 jss490">
                <h3 class="MuiTypography-root jss1055 MuiTypography-subtitle1 MuiTypography-colorTextSecondary">
                  Du lịch trọn gói
                </h3>
                <img
                  src="assets/borderTag.4b2fbd2d.svg"
                  alt="tag background"
                  class="jss1056"
                />
                <img
                  src="assets/arrow-half.dccbb122.svg"
                  alt="hafl arrow"
                  class="jss1057"
                />
              </div>
              <div>
                <a
                  href="https://www.agoda.com/vi-vn/vietjetair"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/km11620415285301-1695094881913.webp"
                    class="jss1026 jss1027 w-full rounded-md"
                    alt="top banner"
                  />
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div class="MuiBox-root jss1110 h-[100%] rounded-md sm:px-[15px]">
              <div class="jss1052 jss490">
                <h3 class="MuiTypography-root jss1055 MuiTypography-subtitle1 MuiTypography-colorTextSecondary">
                  Điếm đến hấp dẫn{" "}
                </h3>
                <img
                  src="assets/borderTag.4b2fbd2d.svg"
                  alt="tag background"
                  class="jss1056"
                />
                <img
                  src="assets/arrow-half.dccbb122.svg"
                  alt="hafl arrow"
                  class="jss1057"
                />
              </div>
              <div>
                <a
                  href="https://www.agoda.com/vi-vn/vietjetair"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/quangbinhvi1621704971898-1695095145079.webp"
                    class="jss1026 jss1027 w-full rounded-md"
                    alt="top banner"
                  />
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div class="MuiBox-root jss1110 h-[100%] rounded-md sm:px-[15px]">
              <div class="jss1052 jss490">
                <h3 class="MuiTypography-root jss1055 MuiTypography-subtitle1 MuiTypography-colorTextSecondary">
                  Khách sạn
                </h3>
                <img
                  src="assets/borderTag.4b2fbd2d.svg"
                  alt="tag background"
                  class="jss1056"
                />
                <img
                  src="assets/arrow-half.dccbb122.svg"
                  alt="hafl arrow"
                  class="jss1057"
                />
              </div>
              <div>
                <a
                  href="https://www.agoda.com/vi-vn/vietjetair"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/gialaivi1621704971875-1695095151485.webp"
                    class="jss1026 jss1027 w-full rounded-md"
                    alt="top banner"
                  />
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
