// import Swiper core and required modules
import { Navigation, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../App.css";

export const Swiperbanner = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={5}
        navigation
        breakpoints={{
          // Breakpoints for different screen sizes
          320: {
            slidesPerView: 2, // 1 slide for screens smaller than 320px
          },
          480: {
            slidesPerView: 2, // 2 slides for screens smaller than 480px
          },
          640: {
            slidesPerView: 3, // 3 slides for screens smaller than 640px
          },
          768: {
            slidesPerView: 4, // 4 slides for screens smaller than 768px
          },
          1024: {
            slidesPerView: 5, // 5 slides for screens smaller than 1024px
          },
        }}
      >
        <SwiperSlide>
          <div className="grid grid-rows-1">
            <h6 className="text-4 font-semibold text-center text-[#EC2029]">
              <span className="text-[#000]">Từ</span> Tp. Hồ Chí Minh
            </h6>
            <div className="relative">
              <img
                src="https://vja-ui.useleadr.com/wp-content/themes/vietjetair/assets/images/bg-fare.svg"
                alt="ảnh nền"
                className="w-30 mx-auto my-0"
              />
              <div className="absolute top-[40%] left-[50%] flex flex-col translate-x-[-50%] translate-y-[-50%] text-center">
                <p className="text-[#ec2029]  my-0 mx-[25px] font-medium">
                  Chỉ từ
                </p>
                <p className="text-[#ec2029]  my-0 mx-5 text-xl font-[jambonoMedium] font-normal">
                  900,000
                </p>
                <p className="italic my-0 mx-9">VND</p>
              </div>
            </div>
            <h6 className="text-center text-4 font-bold text-[#ec2029]">
              <span className="text-[#000]">Đến</span> Melbourne
            </h6>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-rows-1">
            <h6 className="text-4 font-semibold text-center text-[#EC2029]">
              <span className="text-[#000]">Từ</span> Tp. Hồ Chí Minh
            </h6>
            <div className="relative">
              <img
                src="https://vja-ui.useleadr.com/wp-content/themes/vietjetair/assets/images/bg-fare.svg"
                className="w-30 mx-auto my-0"
                alt="ảnh nền"
              />
              <div className="absolute top-[40%] left-[50%] flex flex-col translate-x-[-50%] translate-y-[-50%] text-center">
                <p className="text-[#ec2029]  my-0 mx-[25px] font-medium">
                  Chỉ từ
                </p>
                <p className="text-[#ec2029]  my-0 mx-5 text-xl font-[jambonoMedium] font-normal">
                  900,000
                </p>
                <p className="italic my-0 mx-9">VND</p>
              </div>
            </div>
            <h6 className="text-center text-4 font-bold text-[#ec2029]">
              <span className="text-[#000]">Đến</span> Melbourne
            </h6>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-rows-1">
            <h6 className="text-4 font-semibold text-center text-[#EC2029]">
              <span className="text-[#000]">Từ</span> Tp. Hồ Chí Minh
            </h6>
            <div className="relative">
              <img
                src="https://vja-ui.useleadr.com/wp-content/themes/vietjetair/assets/images/bg-fare.svg"
                className="w-30 mx-auto my-0"
              />
              <div className="absolute top-[40%] left-[50%] flex flex-col translate-x-[-50%] translate-y-[-50%] text-center">
                <p className="text-[#ec2029]  my-0 mx-[25px] font-medium">
                  Chỉ từ
                </p>
                <p className="text-[#ec2029]  my-0 mx-5 text-xl font-[jambonoMedium] font-normal">
                  900,000
                </p>
                <p className="italic my-0 mx-9">VND</p>
              </div>
            </div>
            <h6 className="text-center text-4 font-bold text-[#ec2029]">
              <span className="text-[#000]">Đến</span> Melbourne
            </h6>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-rows-1">
            <h6 className="text-4 font-semibold text-center text-[#EC2029]">
              <span className="text-[#000]">Từ</span> Tp. Hồ Chí Minh
            </h6>
            <div className="relative">
              <img
                src="https://vja-ui.useleadr.com/wp-content/themes/vietjetair/assets/images/bg-fare.svg"
                className="w-30 mx-auto my-0"
              />
              <div className="absolute top-[40%] left-[50%] flex flex-col translate-x-[-50%] translate-y-[-50%] text-center">
                <p className="text-[#ec2029]  my-0 mx-[25px] font-medium">
                  Chỉ từ
                </p>
                <p className="text-[#ec2029]  my-0 mx-5 text-xl font-[jambonoMedium] font-normal">
                  900,000
                </p>
                <p className="italic my-0 mx-9">VND</p>
              </div>
            </div>
            <h6 className="text-center text-4 font-bold text-[#ec2029]">
              <span className="text-[#000]">Đến</span> Melbourne
            </h6>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-rows-1">
            <h6 className="text-4 font-semibold text-center text-[#EC2029]">
              <span className="text-[#000]">Từ</span> Tp. Hồ Chí Minh
            </h6>
            <div className="relative">
              <img
                src="https://vja-ui.useleadr.com/wp-content/themes/vietjetair/assets/images/bg-fare.svg"
                className="w-30 mx-auto my-0"
              />
              <div className="absolute top-[40%] left-[50%] flex flex-col translate-x-[-50%] translate-y-[-50%] text-center">
                <p className="text-[#ec2029]  my-0 mx-[25px] font-medium">
                  Chỉ từ
                </p>
                <p className="text-[#ec2029]  my-0 mx-5 text-xl font-[jambonoMedium] font-normal">
                  900,000
                </p>
                <p className="italic my-0 mx-9">VND</p>
              </div>
            </div>
            <h6 className="text-center text-4 font-bold text-[#ec2029]">
              <span className="text-[#000]">Đến</span> Melbourne
            </h6>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-rows-1">
            <h6 className="text-4 font-semibold text-center text-[#EC2029]">
              <span className="text-[#000]">Từ</span> Tp. Hồ Chí Minh
            </h6>
            <div className="relative">
              <img
                src="https://vja-ui.useleadr.com/wp-content/themes/vietjetair/assets/images/bg-fare.svg"
                className="w-30 mx-auto my-0"
              />
              <div className="absolute top-[40%] left-[50%] flex flex-col translate-x-[-50%] translate-y-[-50%] text-center">
                <p className="text-[#ec2029]  my-0 mx-[25px] font-medium">
                  Chỉ từ
                </p>
                <p className="text-[#ec2029]  my-0 mx-5 text-xl font-[jambonoMedium] font-normal">
                  900,000
                </p>
                <p className="italic my-0 mx-9">VND</p>
              </div>
            </div>
            <h6 className="text-center text-4 font-bold text-[#ec2029]">
              <span className="text-[#000]">Đến</span> Melbourne
            </h6>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-rows-1">
            <h6 className="text-4 font-semibold text-center text-[#EC2029]">
              <span className="text-[#000]">Từ</span> Tp. Hồ Chí Minh
            </h6>
            <div className="relative">
              <img
                src="https://vja-ui.useleadr.com/wp-content/themes/vietjetair/assets/images/bg-fare.svg"
                className="w-30 mx-auto my-0"
              />
              <div className="absolute top-[40%] left-[50%] flex flex-col translate-x-[-50%] translate-y-[-50%] text-center">
                <p className="text-[#ec2029]  my-0 mx-[25px] font-medium">
                  Chỉ từ
                </p>
                <p className="text-[#ec2029]  my-0 mx-5 text-xl font-[jambonoMedium] font-normal">
                  900,000
                </p>
                <p className="italic my-0 mx-9">VND</p>
              </div>
            </div>
            <h6 className="text-center text-4 font-bold text-[#ec2029]">
              <span className="text-[#000]">Đến</span> Melbourne
            </h6>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-rows-1">
            <h6 className="text-4 font-semibold text-center text-[#EC2029]">
              <span className="text-[#000]">Từ</span> Tp. Hồ Chí Minh
            </h6>
            <div className="relative">
              <img
                src="https://vja-ui.useleadr.com/wp-content/themes/vietjetair/assets/images/bg-fare.svg"
                className="w-30 mx-auto my-0"
              />
              <div className="absolute top-[40%] left-[50%] flex flex-col translate-x-[-50%] translate-y-[-50%] text-center">
                <p className="text-[#ec2029]  my-0 mx-[25px] font-medium">
                  Chỉ từ
                </p>
                <p className="text-[#ec2029]  my-0 mx-5 text-xl font-[jambonoMedium] font-normal">
                  900,000
                </p>
                <p className="italic my-0 mx-9">VND</p>
              </div>
            </div>
            <h6 className="text-center text-4 font-bold text-[#ec2029]">
              <span className="text-[#000]">Đến</span> Melbourne
            </h6>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
