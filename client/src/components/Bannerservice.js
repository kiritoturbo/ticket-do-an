import { Navigation, Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Booking from "../api/Booking";

export const Bannerservice = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    Booking.get("/banner/posts/show")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        {data &&
          data?.posts.map((item, index) => (
            <SwiperSlide>
              <div className="boxImageBanner">
                <Link to={`/banner/post/${item?._id}`}>
                  <img
                    className="max-w-[585px] max-h-[293px] object-cover"
                    src={item?.image.url}
                    alt={item?.title}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};
