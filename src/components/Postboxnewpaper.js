import { Navigation,Autoplay,Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "../index.css";


export const Postboxnewpaper = ()=> {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 1800,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className='postpaper'
      >
        <SwiperSlide>
            <div class="jss1093">
                <div >
                    <div class="jss1052 jss1098">
                        <h3 class=" jss1055 text-white">Bảo hiểm</h3> 
                        <img src="assets/borderTag.4b2fbd2d.svg" alt="tag background" class="jss1056"/>
                        <img src="assets/arrow-half.dccbb122.svg" alt="hafl arrow" class="jss1057"/>
                    </div>
                </div>
                <a href="https://www.vietjetair.com/vi/pages/bao-hiem-1619494868035" target="_blank" rel="noopener noreferrer">
                    <img src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/skycare380x260vn1689666523556-1695094643503.webp" class="jss1026 jss1094 jss1027" alt="hot service"/>
                </a>
                <div class=" jss1100 jss1099 jss1096 text-left">
                    <p><strong>An tâm trọn vẹn bay cùng Vietjet</strong></p>
                    <ul className='list-des'>
                        <li>Các chương trình bảo hiểm hấp dẫn đến từ các đối tác bảo hiểm uy tín của Vietjet</li>
                        <li>Thủ tục mua và bồi thường đơn giản, nhanh chóng</li>
                    </ul>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div class="jss1093">
                <div >
                    <div class="jss1052 jss1098">
                        <h3 class=" jss1055 text-white">Gửi hàng nhanh</h3> 
                        <img src="assets/borderTag.4b2fbd2d.svg" alt="tag background" class="jss1056"/>
                        <img src="assets/arrow-half.dccbb122.svg" alt="hafl arrow" class="jss1057"/>
                    </div>
                </div>
                <a href="https://www.vietjetair.com/vi/pages/bao-hiem-1619494868035" target="_blank" rel="noopener noreferrer">
                    <img src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/swift2471592284169014-1695094650429.webp" class="jss1026 jss1094 jss1027" alt="hot service"/>
                </a>
                <div class=" jss1100 jss1099 jss1096 text-left">
                    <p><strong>Vận chuyển Bắc - Trung - Nam siêu tốc, siêu tiện lợi</strong></p>
                    <ul className='list-des'>
                        <li>Rút ngắn khoảng cách hàng nghìn km trong thời gian ngắn nhất</li>
                        <li>Đặt đơn, gửi và nhận hàng 24/7</li>
                    </ul>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div class="jss1093">
                <div >
                    <div class="jss1052 jss1098">
                        <h3 class=" jss1055 text-white">Bảo hiểm</h3> 
                        <img src="assets/borderTag.4b2fbd2d.svg" alt="tag background" class="jss1056"/>
                        <img src="assets/arrow-half.dccbb122.svg" alt="hafl arrow" class="jss1057"/>
                    </div>
                </div>
                <a href="https://www.vietjetair.com/vi/pages/bao-hiem-1619494868035" target="_blank" rel="noopener noreferrer">
                    <img src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/skycare380x260vn1689666523556-1695094643503.webp" class="jss1026 jss1094 jss1027" alt="hot service"/>
                </a>
                <div class=" jss1100 jss1099 jss1096 text-left">
                    <p><strong>An tâm trọn vẹn bay cùng Vietjet</strong></p>
                    <ul className='list-des'>
                        <li>Các chương trình bảo hiểm hấp dẫn đến từ các đối tác bảo hiểm uy tín của Vietjet</li>
                        <li>Thủ tục mua và bồi thường đơn giản, nhanh chóng</li>
                    </ul>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div class="jss1093">
                <div >
                    <div class="jss1052 jss1098">
                        <h3 class=" jss1055 text-white">Bay cùng thẻ HDBank Vietjet</h3> 
                        <img src="assets/borderTag.4b2fbd2d.svg" alt="tag background" class="jss1056"/>
                        <img src="assets/arrow-half.dccbb122.svg" alt="hafl arrow" class="jss1057"/>
                    </div>
                </div>
                <a href="https://www.vietjetair.com/vi/pages/bao-hiem-1619494868035" target="_blank" rel="noopener noreferrer">
                    <img src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/bannervj3802601691554683744-1695094655469.webp" class="jss1026 jss1094 jss1027" alt="hot service"/>
                </a>
                <div class=" jss1100 jss1099 jss1096 text-left">
                    <p><strong>Ưu đãi dành cho chủ thẻ mới</strong></p>
                    <ul className='list-des'>
                        <li>Ưu tiên check-in tại sân bay dành cho hạng thẻ Platinum</li>
                        <li>Giảm đến 50% mua sắm, du lịch, ăn uống</li>
                    </ul>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div class="jss1093">
                <div >
                    <div class="jss1052 jss1098">
                        <h3 class=" jss1055 text-white">Bảo hiểm</h3> 
                        <img src="assets/borderTag.4b2fbd2d.svg" alt="tag background" class="jss1056"/>
                        <img src="assets/arrow-half.dccbb122.svg" alt="hafl arrow" class="jss1057"/>
                    </div>
                </div>
                <a href="https://www.vietjetair.com/vi/pages/bao-hiem-1619494868035" target="_blank" rel="noopener noreferrer">
                    <img src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/skycare380x260vn1689666523556-1695094643503.webp" class="jss1026 jss1094 jss1027" alt="hot service"/>
                </a>
                <div class=" jss1100 jss1099 jss1096 text-left">
                    <p><strong>An tâm trọn vẹn bay cùng Vietjet</strong></p>
                    <ul className='list-des'>
                        <li>Các chương trình bảo hiểm hấp dẫn đến từ các đối tác bảo hiểm uy tín của Vietjet</li>
                        <li>Thủ tục mua và bồi thường đơn giản, nhanh chóng</li>
                    </ul>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div class="jss1093">
                <div >
                    <div class="jss1052 jss1098">
                        <h3 class=" jss1055 text-white">Gửi hàng nhanh</h3> 
                        <img src="assets/borderTag.4b2fbd2d.svg" alt="tag background" class="jss1056"/>
                        <img src="assets/arrow-half.dccbb122.svg" alt="hafl arrow" class="jss1057"/>
                    </div>
                </div>
                <a href="https://www.vietjetair.com/vi/pages/bao-hiem-1619494868035" target="_blank" rel="noopener noreferrer">
                    <img src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/swift2471592284169014-1695094650429.webp" class="jss1026 jss1094 jss1027" alt="hot service"/>
                </a>
                <div class=" jss1100 jss1099 jss1096 text-left">
                    <p><strong>Vận chuyển Bắc - Trung - Nam siêu tốc, siêu tiện lợi</strong></p>
                    <ul className='list-des'>
                        <li>Rút ngắn khoảng cách hàng nghìn km trong thời gian ngắn nhất</li>
                        <li>Đặt đơn, gửi và nhận hàng 24/7</li>
                    </ul>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div class="jss1093">
                <div >
                    <div class="jss1052 jss1098">
                        <h3 class=" jss1055 text-white">Bảo hiểm</h3> 
                        <img src="assets/borderTag.4b2fbd2d.svg" alt="tag background" class="jss1056"/>
                        <img src="assets/arrow-half.dccbb122.svg" alt="hafl arrow" class="jss1057"/>
                    </div>
                </div>
                <a href="https://www.vietjetair.com/vi/pages/bao-hiem-1619494868035" target="_blank" rel="noopener noreferrer">
                    <img src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/skycare380x260vn1689666523556-1695094643503.webp" class="jss1026 jss1094 jss1027" alt="hot service"/>
                </a>
                <div class=" jss1100 jss1099 jss1096 text-left">
                    <p><strong>An tâm trọn vẹn bay cùng Vietjet</strong></p>
                    <ul className='list-des'>
                        <li>Các chương trình bảo hiểm hấp dẫn đến từ các đối tác bảo hiểm uy tín của Vietjet</li>
                        <li>Thủ tục mua và bồi thường đơn giản, nhanh chóng</li>
                    </ul>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div class="jss1093">
                <div >
                    <div class="jss1052 jss1098">
                        <h3 class=" jss1055 text-white">Bay cùng thẻ HDBank Vietjet</h3> 
                        <img src="assets/borderTag.4b2fbd2d.svg" alt="tag background" class="jss1056"/>
                        <img src="assets/arrow-half.dccbb122.svg" alt="hafl arrow" class="jss1057"/>
                    </div>
                </div>
                <a href="https://www.vietjetair.com/vi/pages/bao-hiem-1619494868035" target="_blank" rel="noopener noreferrer">
                    <img src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/bannervj3802601691554683744-1695094655469.webp" class="jss1026 jss1094 jss1027" alt="hot service"/>
                </a>
                <div class=" jss1100 jss1099 jss1096 text-left">
                    <p><strong>Ưu đãi dành cho chủ thẻ mới</strong></p>
                    <ul className='list-des'>
                        <li>Ưu tiên check-in tại sân bay dành cho hạng thẻ Platinum</li>
                        <li>Giảm đến 50% mua sắm, du lịch, ăn uống</li>
                    </ul>
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
