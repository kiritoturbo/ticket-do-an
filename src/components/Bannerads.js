import { Navigation, Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../index.css";

export const Bannerads = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
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
        className=""
      >
        <SwiperSlide>
          <div className="">
            <div class="relative BannerAdsBox">
              <div class="jss1052 jss1051 absolute BannerTitle">
                <h3 class="MuiTypography-root jss1055 MuiTypography-subtitle1 MuiTypography-colorTextSecondary">
                  Tận hưởng chuyến bay
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
              <div className="container">
                <a
                  href="https://www.vietjetair.com/vi/pages/mua-hanh-ly-suat-an-chon-cho-ngoi-va-hon-the-nua-1607076148589/dat-truoc-suat-an---jet-cafe-1606899669939"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/pc1-1695094513048.webp"
                    class="jss1026 jss1050 jss1027"
                    alt="top banner"
                  />
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <div class="relative BannerAdsBox">
              <div class="jss1052 jss1051 absolute BannerTitle">
                <h3 class="MuiTypography-root jss1055 MuiTypography-subtitle1 MuiTypography-colorTextSecondary">
                  HDBank Vietjet Platinum
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
              <div className="container">
                <a
                  href="https://www.vietjetair.com/vi/pages/mua-hanh-ly-suat-an-chon-cho-ngoi-va-hon-the-nua-1607076148589/dat-truoc-suat-an---jet-cafe-1606899669939"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/pc2-1695094522549.webp"
                    class="jss1026 jss1050 jss1027"
                    alt="top banner"
                  />
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <div class="relative BannerAdsBox">
              <div class="jss1052 jss1051 absolute BannerTitle">
                <h3 class="MuiTypography-root jss1055 MuiTypography-subtitle1 MuiTypography-colorTextSecondary">
                  Tận hưởng chuyến bay
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
              <div className="container">
                <a
                  href="https://www.vietjetair.com/vi/pages/mua-hanh-ly-suat-an-chon-cho-ngoi-va-hon-the-nua-1607076148589/dat-truoc-suat-an---jet-cafe-1606899669939"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/pc3-1695094533061.webp"
                    class="jss1026 jss1050 jss1027"
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
