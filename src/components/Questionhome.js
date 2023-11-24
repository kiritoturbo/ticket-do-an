import { Navigation, Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../index.css";

export const Questionhome = () => {
  return (
    <>
      <div class="jss1123 container">
        <div class="jss1052 jss1126">
          <h3 class="jss1055 text-white">Câu hỏi thường gặp</h3>
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
          className="QuestionHome"
          breakpoints={{
            // Breakpoints for different screen sizes
            320: {
              slidesPerView: 3, // 1 slide for screens smaller than 320px
            },
            480: {
              slidesPerView: 3, // 2 slides for screens smaller than 480px
            },
            640: {
              slidesPerView: 5, // 3 slides for screens smaller than 640px
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
            <div class="">
              <a
                href="https://www.vietjetair.com/vi/faq/đat-cho-mua-ve-1610076913454"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/vibooking-1662643022630.svg"
                  class="jss1026 jss1125 jss1027"
                  alt="help"
                />
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="">
              <a
                href="https://www.vietjetair.com/vi/faq/đat-cho-mua-ve-1610076913454"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/viseat-1662643028918.svg"
                  class="jss1026 jss1125 jss1027"
                  alt="help"
                />
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="">
              <a
                href="https://www.vietjetair.com/vi/FAQ/hanh-ly-1599453547698"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/vibaggage-1662643022627.svg"
                  class="jss1026 jss1125 jss1027"
                  alt="help"
                />
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="">
              <a
                href="https://www.vietjetair.com/vi/FAQ/thu-tuc-chuyen-bay-1619722384700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/vicheckin-1662643022633.svg"
                  class="jss1026 jss1125 jss1027"
                  alt="help"
                />
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="">
              <a
                href="https://www.vietjetair.com/vi/faq/đat-cho-mua-ve-1610076913454"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/noichuyen-1679894016134.svg"
                  class="jss1026 jss1125 jss1027"
                  alt="help"
                />
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="">
              <a
                href="https://www.vietjetair.com/vi/faq/đat-cho-mua-ve-1610076913454"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/vimeal-1662643028915.svg"
                  class="jss1026 jss1125 jss1027"
                  alt="help"
                />
              </a>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};
