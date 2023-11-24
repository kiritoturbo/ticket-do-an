import React, { useEffect, useState } from "react";
import "./footer.css";
import { useLocation } from "react-router-dom";
import { Medalfooter } from "./Medalfooter";

function Footer() {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(location.pathname === "/");
  }, [location]);
  return (
    <div
      className="boxFooterEnd px-[15px] "
      style={{ display: isHomePage ? "block" : "none" }}
    >
      <div className="medalBox">
        <img
          src="assets/cloudBG-desktop.4a58264d.webp"
          alt="cloud bg"
          class="jss1247"
        ></img>
        <Medalfooter />
      </div>
      <div className="menuFooterBox container ">
        <div className="itemMenuFooterBox mt-[60px]">
          <div className="contentTitle">
            <img
              src="assets/flight-icon-red.95351c38.svg"
              alt="flight icon red"
            />
            <h5>Để có chuyến bay tốt đẹp</h5>
          </div>
          <div className="menuItemFooter">
            <ul>
              <li>Điều lệ vận chuyển</li>
              <li>Điều kiện vé</li>
              <li>Phiếu yêu cầu hoàn vé</li>
              <li>Phiếu yêu cầu sử dụng tiền bảo lưu</li>
              <li>Thông tin bồi thường</li>
              <li>Phí và lệ phí</li>
              <li>Giấy tờ tùy thân</li>
              <li>Sân bay và nhà ga quốc tế</li>
            </ul>
          </div>
        </div>
        <div className="itemMenuFooterBox mt-[60px]">
          <div className="contentTitle">
            <img
              src="assets/flight-icon-red.95351c38.svg"
              alt="flight icon red"
            />
            <h5>Mua hành lý, suất ăn, chọn chỗ ngồi và hơn thế nữa....</h5>
          </div>
          <div className="menuItemFooter">
            <ul>
              <li>Chọn chỗ ngồi ưu tiên</li>
              <li>Mua trước hành lý</li>
              <li>Đặt trước suất ăn - Jet cafe</li>
              <li>Hàng miễn thuế</li>
              <li>Quà lưu niệm</li>
              <li>Phí và lệ phí</li>
              <li>Giải trí</li>
            </ul>
          </div>
        </div>
        <div className="itemMenuFooterBox mt-[60px]">
          <div className="contentTitle">
            <img
              src="assets/flight-icon-red.95351c38.svg"
              alt="flight icon red"
            />
            <h5>Dịch vụ cao cấp</h5>
          </div>
          <div className="menuItemFooter">
            <ul>
              <li>Hạng vé thương gia - Business</li>
              <li>Hạng vé Skyboss</li>
              <li>Phòng chờ sang trọng</li>
            </ul>
          </div>
          <div className="contentTitle">
            <img
              src="assets/flight-icon-red.95351c38.svg"
              alt="flight icon red"
            />
            <h5>Về Vietjet</h5>
          </div>
          <div className="menuItemFooter">
            <ul>
              <li>Nhà đầu từ</li>
              <li>Cơ hội nghề nghiệp</li>
              <li>Tin tức</li>
              <li>Khuyến mại</li>
              <li>Cẩm nang du lịch</li>
            </ul>
          </div>
        </div>
        <div className="itemMenuFooterBox mt-[60px]">
          <div className="contentTitle">
            <img
              src="assets/flight-icon-red.95351c38.svg"
              alt="flight icon red"
            />
            <h5>Mua vé ở đâu?</h5>
          </div>
          <div className="menuItemFooter">
            <ul>
              <li>Tổng đài bán vé</li>
              <li>Phòng bán vé</li>
              <li>Đại lý bán vé</li>
              <li>GDS/Interline</li>
              <li>Đăng ký khách hàng Doanh nghiệp</li>
              <li>ĐĂng ký làm đại lý online</li>
            </ul>
          </div>
          <div className="contentTitle">
            <img
              src="assets/flight-icon-red.95351c38.svg"
              alt="flight icon red"
            />
            <h5>Thẻ tín dụng HDBank Vietjet</h5>
          </div>
        </div>
        <div className="itemMenuFooterBox mt-[60px] ">
          <div className="contentTitle">
            <img
              src="assets/flight-icon-red.95351c38.svg"
              alt="flight icon red"
            />
            <h5>Đăng ký đại lý</h5>
          </div>
          <div className="contentTitle">
            <img
              src="assets/flight-icon-red.95351c38.svg"
              alt="flight icon red"
            />
            <h5>Câu hỏi thường gặp</h5>
          </div>
          <div className="contentTitle">
            <img
              src="assets/flight-icon-red.95351c38.svg"
              alt="flight icon red"
            />
            <h5>Nhà đầu tư</h5>
          </div>
          <div className="contentTitle">
            <img
              src="assets/flight-icon-red.95351c38.svg"
              alt="flight icon red"
            />
            <h5>Cơ hội nghề nghiệp</h5>
          </div>
          <div className="contentTitle">
            <img
              src="assets/flight-icon-red.95351c38.svg"
              alt="flight icon red"
            />
            <h5>Dịch vụ hàng hóa</h5>
          </div>
          <div className="contentTitle">
            <img
              src="assets/flight-icon-red.95351c38.svg"
              alt="flight icon red"
            />
            <h5>Chính sách về quyền riêng tư</h5>
          </div>
        </div>
      </div>
      <div className="footer-info container flex ">
        <div className="social-footer item-footer-info ">
          <span>Kết nội với Vietjet</span>
          <div className="icon-social flex gap-2 mt-[15px]">
            <a
              href="https://www.facebook.com/vietjetvietnam/"
              target="_blank"
              rel="noopener noreferrer"
              class="jss1176"
            >
              <img src="https://cms-uat.s3.ap-southeast-1.amazonaws.com/facebook-1607147833349.png" />
            </a>
            <a
              href="https://www.instagram.com/vietjet/"
              target="_blank"
              rel="noopener noreferrer"
              class="jss1176"
            >
              <img src="https://cms-uat.s3.ap-southeast-1.amazonaws.com/insta-1607147833353.png" />
            </a>
            <a
              href="https://twitter.com/Vietjet_Global"
              target="_blank"
              rel="noopener noreferrer"
              class="jss1176"
            >
              <img src="https://cms-uat.s3.ap-southeast-1.amazonaws.com/twitter-1607147826657.png" />
            </a>
            <a
              href="https://www.vietjetair.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="jss1176"
            >
              <img src="https://cms-uat.s3.ap-southeast-1.amazonaws.com/line-1607147826652.png" />
            </a>
            <a
              href="https://www.vietjetair.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="jss1176"
            >
              <img src="https://cms-uat.s3.ap-southeast-1.amazonaws.com/wechat-1607147826660.png" />
            </a>
            <a
              href="https://zalo.me/vietjet"
              target="_blank"
              rel="noopener noreferrer"
              class="jss1176"
            >
              <img src="https://cms-uat.s3.ap-southeast-1.amazonaws.com/zalo-1607147826662.png" />
            </a>
            <a
              href="https://www.youtube.com/@VietjetOfficial"
              target="_blank"
              rel="noopener noreferrer"
              class="jss1176"
            >
              <img src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/youtuberound2icon512x512pd38fjru-1682582793720.png" />
            </a>
          </div>
          <p>Cập nhật thông tin chuyến bay Flightrandar</p>
        </div>
        <div className="unesco-footer item-footer-info">
          <div className="flex items-center">
            <img
              src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/huongdan-1634321105674.svg"
              alt=""
            />
            <span className="ml-2">Hướng dẫn đặt chuyến bay</span>
          </div>
          <p className="mt-5 mb-2">Chấp cánh ước mơ với Vietjet</p>
          <img className="w-[60%]" src="assets/unesco.551b23b8.webp" alt="" />
        </div>
        <div className="app-qr-footer item-footer-info">
          <div className="flex items-center">
            <img
              src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/pay-1634321105685.svg"
              alt=""
            />
            <span className="ml-2">Hướng dẫn thanh toán</span>
          </div>
          <p className="mt-5 mb-2">Tải ứng dụng di động Vietjet Air</p>
          <div className="img-qr flex">
            <a
              href="https://apps.apple.com/vn/app/vietjet-air/id867009161"
              target="_blank"
              rel="noopener noreferrer"
              class="jss314"
            >
              <img
                src="https://cms-uat.s3.ap-southeast-1.amazonaws.com/applestore-1607148441670.png"
                alt=""
              />
            </a>
            <a
              className="ml-2"
              href="https://play.google.com/store/apps/details?id=com.vietjetair.vjmobileapp"
              target="_blank"
              rel="noopener noreferrer"
              class="jss314"
            >
              <img
                src="https://cms-uat.s3.ap-southeast-1.amazonaws.com/googleplay-1607148441674.png"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="address-footer item-footer-info">
          <p className="namecompany uppercase">
            Công ty cổ phần hàng không vietjet
          </p>
          <p className="mb-[10px] text-[12px] text-[rgb(52, 73, 94)]">
            302/3 Phố Kim Mã, Phường Ngọc Khánh, Quận Ba Đình, TP. Hà Nội, Việt
            Nam.
          </p>
          <a
            href="http://online.gov.vn/Home/WebDetails/35169?AspxAutoDetectCookieSupport=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="w-[112px]"
              src="assets/dathongbao.407800de.webp"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
